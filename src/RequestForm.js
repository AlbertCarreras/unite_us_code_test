import React, { Component } from 'react';

let map = {}

class RequestForm extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    serviceRequest: undefined,
    bodyRequest: "",
    checkboxTerms: false
  }

  displayMessage = (input) => {
    switch(map[input]) {
      case "firstName":
        return "This field cannot be blank."
      default:
        return "required"
    }
  }


  handleChange = (event) => {
    const {target} = event
    const {name, value} = target

    name === "checkboxTerms" 
    ? this.setState({
        [name]: !value,
      })
    : this.setState({
        [name]: value,
      });
  }

  handleSubmit = async () => {

    const POST = 'POST'

    const HEADERS = { 
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }

    let body = JSON.stringify(
      {
        "assistance_request": {
          "contact": {
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "email": this.state.email
          },
          "service_type": this.state.serviceRequest,
          "description": this.state.bodyRequest
        }
      }      
    )

    let response = await fetch("http://localhost:49567/api/assistance-requests", {
      method: POST,
      headers: HEADERS,
      body: body
      })
    
    let valid = {error: await response.ok, code: await response.status}

    this.props.saveApiResponse(valid, await response.json() )
  }

  buildServiceOptionList = () => {
    const { serviceTypes } = this.props
    if (serviceTypes.length > 0) {
      return serviceTypes.map( item => {
        return <option 
                  key={item.id} 
                  value={item.display_name}>{item.display_name}
                  </option>
      })
    }
  }
  
  render() {
    return (
      <div >   
        <div>New Assistance Request</div>
        <div className="form">
              
          <input 
            type="text" 
            placeholder="First Name"
            name="firstName"
            onChange={ this.handleChange }
            value={this.state.firstName} />

          <input 
            type="text" 
            placeholder="Last Name"
            name="lastName"
            onChange={ this.handleChange }
            value={this.state.lastName} />

          <input 
            type="email" 
            placeholder="Email Address"
            name="email"
            onChange={ this.handleChange }
            value={this.state.email} />
            
          <select
            name="serviceRequest"
            onChange={ this.handleChange }
            value={this.state.serviceRequest}>
              <option value="">Select Service Type</option>
              {this.buildServiceOptionList()}
          </select>
          
          <textarea 
            placeholder="Provide information about your request"
            rows="5" 
            cols="20"
            name="bodyRequest"
            onChange={ this.handleChange }
            value={this.state.bodyRequest}>
          </textarea>

          <input 
            type="checkbox" 
            name="checkboxTerms" 
            id="checkboxTerms"
            onChange={ this.handleChange }
            value={this.state.checkboxTerms}/>
          <label
            htmlFor="checkboxTerms">I hereby accept the terms of service for THE NETWORK and the privacy policy.</label>

          <input 
            className="button"
            type="button" 
            value="Get Assistance" 
            onClick={this.handleSubmit}/>
          </div>
      </div>
    );
  }
}

export default RequestForm;
