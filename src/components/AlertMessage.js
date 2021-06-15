import React from "react";



const AlertMessage = (props)  =>{
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
       <strong>Holy guacamole!</strong> {props.messageAlert}.
      </div>
    )
  }

  export default AlertMessage;