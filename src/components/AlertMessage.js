import React from "react";



const AlertMessage = (props)  =>{
    return (
      props.messageAlert == "ready" ?  

      <div className="alert alert-success alert-dismissible fade show" role="alert">
       <strong>Holy guacamole!</strong> {props.messageAlert}.
      </div>

      :

      <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Holy guacamole!</strong> {props.messageAlert}.
     </div>
      
    )
  }

  export default AlertMessage;