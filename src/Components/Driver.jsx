import { useState } from 'react';
import '../index.css'; 



const Driver = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [license, setLicense] = useState('');
  const [document, setDocument] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !license || !document) {
      setMessage('Please fill out all fields and upload a document.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('license', license);
    formData.append('document', document);

    try {
      const response = await fetch('http://localhost:5000/api/driver/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Application submitted successfully!');
        setName('');
        setEmail('');
        setLicense('');
        setDocument(null);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="driver-registration">
      <h1>Driver Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
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
        <label htmlFor="document">Upload License:</label>
        <input
          type="file"
          id="document"
          onChange={(e) => setDocument(e.target.files[0])}
          required
        />
        <button type="submit">Submit</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Driver;
