import  { useState , useEffect } from 'react';
import '../index.css'; 

const Admin = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/applications');
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          setMessage('Failed to fetch applications');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchApplications();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: action }),
      });

      if (response.ok) {
        setApplications(applications.map(app =>
          app._id === id ? { ...app, status: action } : app
        ));
        setMessage(`Application ${action} successfully!`);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {message && <p className="message">{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>License Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.license}</td>
              <td>{app.status}</td>
              <td>
                {app.status === 'pending' && (
                  <>
                    <button className="approve" onClick={() => handleAction(app._id, 'approved')}>Approve</button>
                    <button className="reject" onClick={() => handleAction(app._id, 'rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
