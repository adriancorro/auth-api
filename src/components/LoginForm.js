import React, { useState, useEffect } from "react";

function LoginForm() {

        const [data, setData] = useState(null);
            
        useEffect(() => {
          fetch("/welcome")
            .then(res => {
              if (!res) {
                throw new Error(`HTTP error ! status : ${res.ok}`);
              } else {
                return res.json();
              }
            })
            .then(data => {
              setData(data)
            })
            .catch(e => console.log(e));
          /*    -con [] el efecto solo se ejecutará cuando el componente se monte, y no en cada rerenderizado
                -con  [selectorProfile] Solo se vuelve a ejecutar si selectorProfile cambia 
                - si no se coloca nada: se ejecuta después del primer renderizado y después de cada actualización
            */
        }, []);


    return(
        <div className="container ">
         {console.log(data)}
         <form action="/user/sign-in" method="POST" className="col-6 border shadow-lg p-3 mb-5 bg-body rounded" >
            <div className="mb-6">
               <p className="text-center fs-3"> Login </p>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input  name="email" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input name="password" type="text" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 ">
              <a> Don't have an account? </a> 
                <a href="/register" className="" > sign up</a> 
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
         </form>
         </div>

    )
}
export default LoginForm;