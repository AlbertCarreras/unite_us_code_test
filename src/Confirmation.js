import React, { Component } from 'react';

class Confirmation extends Component {
  
  render() {
    const { confirmationMsg } = this.props
    const { echo, message } = confirmationMsg

    return (
      <div >   
        <h1>{message}</h1>
        <div>Your Request:</div>
        <div>Name: {echo.assistance_request.contact.first_name} {echo.assistance_request.contact.last_name}</div>
        <div>Email: {echo.assistance_request.contact.email}</div>
        <div>Service: {echo.assistance_request.service_type}</div>
        <div>Description: {echo.assistance_request.description}</div>
        <input 
            className="button"
            type="button" 
            value="Submit New Response" 
            onClick={() => this.props.submitNewRequest(null)}/>
      </div>
    );
  }
}

export default Confirmation;
