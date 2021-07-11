import React from 'react';
import Home from './components/Home.js';
import RegistrationForm from './components/RegistrationForm.js';
import LoginForm from './components/LoginForm.js';
import Test from './components/Test.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login Form</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/home">test Home</Link>
            </li>
            <li>
              <Link to="/test">test</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/test">
           <Test /> 
          </Route>
          <Route path="/home">
           <Home /> 
          </Route>
          <Route path="/register">
            <RegistrationForm /> 
          </Route>
          <Route path="/">
            <LoginForm /> 
          </Route>
        
          
        </Switch>
      </div>
    </Router>
  );
}

/* function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
 */
