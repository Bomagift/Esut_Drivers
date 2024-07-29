import React, { useState } from 'react';

function Driver() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    license: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      license: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('license', formData.license);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/applications`, {
      method: 'POST',
      body: formDataToSend,
    });
    const data = await response.json();
    if (response.ok) {
      alert('Application submitted successfully');
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Driver Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>License:</label>
          <input type="file" name="license" onChange={handleFileChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Driver;
