import '../index.css';

const Application = ({ applications, onStatusChange }) => (
  <div className="application-list">
    <h2>Application List</h2>
    {applications.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>License</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td><a href={`http://localhost:5173/${app.license}`} target="_blank" rel="noopener noreferrer">View License</a></td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => onStatusChange(app._id, 'approved')}>Approve</button>
                <button onClick={() => onStatusChange(app._id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No applications available.</p>
    )}
  </div>
);

export default Application;
