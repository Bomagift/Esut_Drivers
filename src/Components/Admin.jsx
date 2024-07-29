import React, { useState, useEffect } from 'react';

function Admin({ user }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/applications`);
      const data = await response.json();
      setApplications(data);
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/applications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    if (response.ok) {
      setApplications(applications.map(app => app._id === id ? data : app));
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <h3>Admin Panel</h3>
      <ul>
        {applications.map(app => (
          <li key={app._id}>
            <span>{app.name} ({app.email}) - {app.status}</span>
            <button onClick={() => handleStatusChange(app._id, 'approved')}>Approve</button>
            <button onClick={() => handleStatusChange(app._id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
