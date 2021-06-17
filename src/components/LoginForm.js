import React, { useContext, createContext, useState, useEffect } from "react";
import AlertMessage from "./AlertMessage.js";
import CatchStateContext from "./Home.js";
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

  function LoginForm() {
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [userLoginStatusError, setUserLoginStatusError] = useState(false);

  const { statusLoginUser2 } = useContext(UserContext);
   

  let history = useHistory();
/*   useHistory(); El gancho useHistory nos ayuda a acceder al objeto de historial, que
   se usa para navegar programáticamente a otras rutas usando métodos de empujar y reemplazar
  history.replace("/home"); */

  const statusLogin = {
    statusLoginUser: userLoginStatus,
   }


  const EnviarDatos =  event =>   {
    event.preventDefault();
      let email = event.target.elements.email.value
      let password = event.target.elements.password.value
     
      // forma 1 async

      async function myLog() {
       // setUserLoginStatus(await fetchGetStatusDataPromise(email, password)) 
    let statusAuthenticated = await fetchGetStatusDataPromise(email, password) 

    console.log(statusAuthenticated)
        if ( statusAuthenticated == true ){
          setUserLoginStatus(email)
          setUserLoginStatusError(false)
        }else{
          setUserLoginStatus(false)
          setUserLoginStatusError(statusAuthenticated)
        }

      } 
      
      // forma 2  promise
     //  fetchGetStatusDataPromise(email, password)

    /*   Una forma más fácil de convertir cualquier cosa que parezca una promesa a su valor real podría ser:
      await asegura que las promesas se resuelvan, pero también pasa por las no promesas sin problemas. */

    /*   async function myLog(val) {
        console.log(await val);
      }  */
      myLog()   
    
    }


    return(
      !userLoginStatus ? 
        (<div className="container ">
         <form  onSubmit={EnviarDatos} className="col-6 border shadow-lg p-3 mb-5 bg-body rounded" >
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
               {userLoginStatusError &&  <AlertMessage  messageAlert={userLoginStatusError}  />  }  
              <a> Don't have an account? </a> 
                <a href="/register" className="" > sign up  </a> 
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
         </form>
         </div>)

         : 

       <UserContext.Provider value={statusLogin}>
         <Home />
      </UserContext.Provider>  
    )
}


// The following fetch are for testing and practicing async / await / synchronous

// Way 1
const FetchGetStatusDataAsync = async (email, password) => {
      
      try {
          const response = await fetch('user/sign-in', {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          console.log(message)
          throw new Error(message);
        }

        
        const dataStatus = await response.json();
        console.log(`Status dataStatus.isAuthenticated: ${dataStatus.isAuthenticated}`)

       
    } catch(e) {
      console.log(e); // 30
    }


}

// Way 2
const fetchGetStatusDataPromise = (email, password)  => new Promise(function(resolve, reject) {
 
let a 
  fetch('user/sign-in', {
    method: 'POST',
    body: JSON.stringify({email: email, password: password}),
    headers: {
        'Content-Type': 'application/json'
    }
}) 
  .then(res => {
    if (!res) {
      throw new Error(`HTTP error ! status : ${res.ok}`);
    } else {
      return res.json();
    }
  })
  .then(data => {
    if(!data.error){
      /*  useHistory
      El useHistorygancho le da acceso a la historyinstancia que puede usar para navegar. */
      resolve( data.isAuthenticated)
      console.log(`Status dataStatus.isAuthenticated: ${data.isAuthenticated}`)
    }else{
      console.log(data.isAuthenticated)
      resolve(data.error)
    }
  })
  .catch(e => console.log(e));   
})

// Way 3
const fetchGetStatus = (email, password)  => {
    fetch('user/sign-in', {
      method: 'POST',
      body: JSON.stringify({email: email, password: password}),
      headers: {
          'Content-Type': 'application/json'
      }
    }) 
    .then(res => {
      if (!res) {
        throw new Error(`HTTP error ! status : ${res.ok}`);
      } else {
        return res.json();
      }
    })
    .then(data => {
      if(!data.error){
        /*  useHistory
        El useHistorygancho le da acceso a la historyinstancia que puede usar para navegar. */
       
        setTimeout(() => {
          //  history.replace("/home");
        }, 3000);
        

      
      }else{
        console.log(data.error)
      }
    })
    .catch(e => console.log(e));  

}

export default LoginForm;