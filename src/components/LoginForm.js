import React, { useContext, createContext, useState, useEffect } from "react";
import AlertMessage from "./AlertMessage.js";
import UserContext from './UserContext';
import Home_main_user from './Home_main_user';
import fetchAutPost from '../functions/fetchAutPost.js'; 
  
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
  const [authorizationStatus, setAuthorizationStatus] = useState({isAuthenticated:false});  
  const [userLoginStatusError, setUserLoginStatusError] = useState(false);   
  let token 
  let user


  
  const statusLogin = {
    statusLoginUser: localStorage.getItem('User'),
   }

   token = localStorage.getItem('Token')
   user = localStorage.getItem('User')
   console.log(token)
   
  useEffect(() => {
    const requestInfoAuthorization = async ()  => {
      let requestAut = await  fetchAutPost(token)
      console.log(requestAut)
       if(requestAut.isAuthenticated == false){
        localStorage.removeItem('IsAuthenticated');
        localStorage.removeItem('Token'); 
        localStorage.removeItem('User'); 
      }
    } 
    requestInfoAuthorization()
  },[token]);
   

  const EnviarDatos =  event =>   {
    event.preventDefault();
      let email = event.target.elements.email.value
      let password = event.target.elements.password.value
      async function MyLog() {
       // setUserLoginStatus(await fetchGetStatusDataPromise(email, password)) 
    let userLoginToken = await fetchGetStatusDataPromise(email, password) 
        if ( userLoginToken.length > 30 ){
          localStorage.setItem('User', email)
          user = localStorage.getItem('User')
           /*  Al cambiar el valor a este useState (userLoginStatusError)  en realidad
           cambiamos el estado y luego estamos renderizando */
          setUserLoginStatusError("ready") 
        }else{
          setUserLoginStatusError(userLoginToken)
        }
      } 
      
      // forma 2  promise
     //  fetchGetStatusDataPromise(email, password)

    /*   Una forma más fácil de convertir cualquier cosa que parezca una promesa a su valor real podría ser:
      await asegura que las promesas se resuelvan, pero también pasa por las no promesas sin problemas. */

    /*   async function myLog(val) {
        console.log(await val);
      }  */
      MyLog()

    }

    return(
      !token ?  
        (<div className="container ">
         <form  onSubmit={EnviarDatos} className="col-6 border shadow-lg p-3 mb-5 bg-body rounded" >
            <div className="mb-6">
               <p className="text-center fs-3"> Login</p>
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
         <Home_main_user /> 
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
      resolve(data.jwtToken)
      if(data.jwtToken.length > 30){
        localStorage.setItem('Token', data.jwtToken)
      }
      console.log(`1 Status dataStatus.isAuthenticated: ${data.jwtToken}`)
    }else{
      
      resolve(data.error)
      localStorage.setItem('Token', [])
      console.log("7777777777777777777777777777777777777777777777777777")
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