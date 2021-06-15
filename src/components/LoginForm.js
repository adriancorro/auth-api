import React, { useState, useEffect } from "react";
import AlertMessage from "./AlertMessage.js";
import useProvideAuth from "./Home.js";
import UserContext from './UserContext';
import Home from './Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const userMock = {
  name: 'Alejandro',
  email: 'alejandro@example.com',
 };

function LoginForm() {
  const [userLoginError, setUserLoginError] = useState(false);
  const [user, setUser] = useState([]);

  let history = useHistory();
/*   useHistory(); El gancho useHistory nos ayuda a acceder al objeto de historial, que
   se usa para navegar programáticamente a otras rutas usando métodos de empujar y reemplazar
  history.replace("/home"); */

   
  const enviarDatos = event => {
    event.preventDefault();
      let email = event.target.elements.email.value
      let password = event.target.elements.password.value
      fetch('user/sign-in', {
        method: 'POST',
        body: JSON.stringify({email: email, password: password}),
        headers: {
            'Content-Type': 'application/json'
        }
    }   ) 
        .then(res => {
          if (!res) {
            throw new Error(`HTTP error ! status : ${res.ok}`);
          } else {
            return res.json();
          }
        })
        .then(data => {
          if(!data.error){
             console.log(data)
            /*  useHistory
            El useHistorygancho le da acceso a la historyinstancia que puede usar para navegar. */
            setUser(data)
            console.log(data)

            setTimeout(() => {
              {   }
            }, 2000);

            setTimeout(() => {
              history.replace("/home");

            }, 3000);
           
            
          }else{
            setUserLoginError(data.error)
            console.log(data.error)
          }
        })
        .catch(e => console.log(e));
  };
    return(
        <div className="container ">
         <form  onSubmit={enviarDatos} className="col-6 border shadow-lg p-3 mb-5 bg-body rounded" >
            <div className="mb-6">
               <p className="text-center fs-3"> Login </p>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input    name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input name="password" type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 ">
              
               {userLoginError &&  <AlertMessage  messageAlert={userLoginError}  />  }  
              <a> Don't have an account? </a> 
          
                <a href="/register" className="" > sign up</a> 
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <UserContext.Provider value={user}>
                  <Home />
            </UserContext.Provider> 
         </form>
         </div>

    )
}

export default LoginForm;