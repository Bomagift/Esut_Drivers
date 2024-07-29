import  { useState } from 'react';
import '../index.css'; 

const mockApplications = [
  { id: 1, name: 'John Doe', email: 'john@example.com', license: 'ABC123', status: 'pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', license: 'XYZ789', status: 'pending' },

];

const Admin = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [message, setMessage] = useState('');

  const handleAction = (id, action) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: action } : app
    ));
    setMessage(`Application ${action} successfully!`);
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
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.license}</td>
              <td>{app.status}</td>
              <td>
                {app.status === 'pending' && (
                  <>
                    <button className="approve" onClick={() => handleAction(app.id, 'approved')}>Approve</button>
                    <button className="reject" onClick={() => handleAction(app.id, 'rejected')}>Reject</button>
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
