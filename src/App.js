import React from 'react';
import Home from './components/Home.js';
import RegistrationForm from './components/RegistrationForm.js';
import LoginForm from './components/LoginForm.js';
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
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
           {/*  <About /> */}
           <Home /> 
          </Route>
          <Route path="/register">
            {/* <Users /> */}
            <RegistrationForm /> 
          </Route>
          <Route path="/">
            {/* <Home /> */}
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
