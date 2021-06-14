import React, {useState} from 'react';

function RegistrationForm(props) {
  return(
    <div className="container ">
        
    <form  action="http://localhost:4000/user/sign-up" method="post"  className="col-6 border shadow-lg p-3 mb-5 bg-body rounded" >
       <div className="mb-6">
          <p className="text-center fs-3"> Register </p>
       </div>
       <div className="mb-3">
           <label className="form-label">Name</label>
           <input  name="name" className="form-control"   id="fname" name="fname" />
       </div>
       <div className="mb-3">
           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
           <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
           <div name="email"  id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
       </div>
       <div className="mb-3">
           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
           <input name="password" type="password" className="form-control" id="exampleInputPassword1"/>
       </div>
       <div className="mb-3 ">
         <a> Already have an account? </a> 
           <a href="/" className="" >Login</a> 
       </div>
       <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
    )
}


export default RegistrationForm;