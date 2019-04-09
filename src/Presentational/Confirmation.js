//IMPORT MODULES
import React from 'react';

const Confirmation = ({ confirmationMsg, cleanResponse }) => {

  const { echo, message } = confirmationMsg
  const request = echo.assistance_request
    
    return (
      <div className="form-container flex-column">   
        <div className="server-error">{message}</div>
        <div className="confirmation-note">
          <div><b>Your Request</b></div>
          <div>Name: {request.contact.first_name} {request.contact.last_name}</div>
          <div>Email: {request.contact.email}</div>
          <div>Service: {request.service_type}</div>
          <div>Description: {request.description}</div>
        </div>
        <input 
            className="button"
            type="button" 
            value="Submit New Request" 
            onClick={() => cleanResponse()}/>
      </div>
    );
}

export default Confirmation;
