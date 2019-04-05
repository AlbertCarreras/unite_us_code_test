import React from 'react';

const Confirmation = props => {

  const { confirmationMsg, cleanResponse } = props
  const { echo, message } = confirmationMsg
    
    return (
      <div className="form-container flex-column">   
        <div className="server-error">{message}</div>
        <div className="confirmation-note">
          <div><b>Your Request</b></div>
          <div>Name: {echo.assistance_request.contact.first_name} {echo.assistance_request.contact.last_name}</div>
          <div>Email: {echo.assistance_request.contact.email}</div>
          <div>Service: {echo.assistance_request.service_type}</div>
          <div>Description: {echo.assistance_request.description}</div>
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
