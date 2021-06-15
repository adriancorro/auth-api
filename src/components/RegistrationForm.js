import React, {useState} from 'react';
import AlertMessage from "./AlertMessage.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

function RegistrationForm(props) {

  const [userLoginError, setUserLoginError] = useState(false);
  const [userLogin, setUserLogin] = useState(false);


  let history = useHistory();

  const enviarDatos = event => {
    event.preventDefault();
      let name = event.target.elements.name.value
      let email = event.target.elements.email.value
      let password = event.target.elements.password.value

      fetch('user/sign-up', {
        method: 'POST',
        body: JSON.stringify({email: email, password: password, name: name}),
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
             setUserLogin(data.isAuthenticated)
             setTimeout(() => {
              history.replace("/");
             }, 6000);
            
          }else{
            setUserLoginError(data.error)
            console.log(data.error)
          }
        })
        .catch(e => console.log(e));
  };



  return(
    <div className="container ">
        
    <form onSubmit={enviarDatos}  className="col-6 border shadow-lg p-3 mb-5 bg-body rounded" >
       <div className="mb-6">
          <p className="text-center fs-3"> Register </p>
        
       </div>
       <div className="mb-3">
           <label className="form-label">Name</label>
           <input  name="name" className="form-control"   id="fname"  />
       </div>
       <div className="mb-3">
           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
           <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
           <div   id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
       </div>
       <div className="mb-3">
           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
           <input name="password" type="password" className="form-control" id="exampleInputPassword1"/>
       </div>
       <div className="mb-3 ">
         {userLoginError &&  <AlertMessage  messageAlert={userLoginError}  />  }  
         <a> Already have an account? </a> 
         { userLogin && <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Holy guacamole!</strong> This is a success alert—check. Please now log in with your new user!
                        </div>
         }
           <a href="/" className="" >Login</a> 
       </div>
       <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
    )
}


export default RegistrationForm;