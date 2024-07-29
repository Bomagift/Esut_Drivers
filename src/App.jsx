import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../src/Components/Login'
import Driver from '../src/Components/Driver';
import Admin from '../src/Components/Admin';

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <button onClick={() => window.location.href = '/'}>Home</button>
            <button onClick={() => window.location.href = '/driver'}>Driver</button>
            <button onClick={() => window.location.href = '/admin'}>Admin</button>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/driver" component={Driver} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
