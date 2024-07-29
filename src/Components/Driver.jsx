import { useState } from 'react';
import '../index.css'; 

const Driver = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [license, setLicense] = useState('');
  const [documents, setDocuments] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !license || !documents) {
      setMessage('Please fill in all fields and upload a document.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('license', license);
    formData.append('documents', documents);

    try {
      const response = await fetch('http://localhost:5173/api/drivers/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Registration successful!');
    
        setName('');
        setEmail('');
        setLicense('');
        setDocuments(null);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="driver-registration">
      <h1>Driver Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="license">License Number:</label>
        <input
          type="text"
          id="license"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          required
        />

        <label htmlFor="documents">Upload License:</label>
        <input
          type="file"
          id="documents"
          onChange={(e) => setDocuments(e.target.files[0])}
          accept=".jpg, .jpeg, .png, .pdf"
          required
        />

        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Driver;

