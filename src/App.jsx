import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Application from '../src/Components/Application'
import Driver from '../src/Components/Driver';
import Admin from '../src/Components/Admin';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Driver/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/logins" element={<Login/>} />
            </Routes>
    </Router>
  );
}

export default App;
