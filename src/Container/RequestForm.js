import React, { Component } from 'react';

class RequestForm extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    serviceRequest: undefined,
    bodyRequest: "",
    checkboxTerms: false,
    serverError: null,
    validationError: {}
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

  validateFields = () => {
    var allowSubmission = true;
    var validationError = {}
    if (this.state.firstName === "") {
      allowSubmission = false;
      validationError["firstName"] = "First Name cannot be blank."
    }

    if (this.state.lastName === "") {
      allowSubmission = false;
      validationError["lastName"] = "Last Name cannot be blank."
    }
    
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      allowSubmission = false;
      validationError["email"] = "Invalid email address format."
    }
    
    if ((this.state.serviceRequest === undefined)) {
      allowSubmission = false;
      validationError["service"] = "A service type must be selected."
    }
    
    if ((this.state.bodyRequest === "")) {
      allowSubmission = false;
      validationError["description"] = "A description must be provided."
    }

    if (!(this.state.checkboxTerms)) {
      allowSubmission = false;
      validationError["checkbox"] = "You must accept to terms and conditions."
    }

    return allowSubmission
    ? this.handleSubmit()
    : this.setState({validationError: validationError})
  }

  displayValidationError = (field) => {
    const { validationError } = this.state

    if (validationError !== {} && validationError[field]) {
      return <div className="field-notes">{validationError[field]}</div>
    }
    return <div className="field-notes">required</div>
  }

  handleChange = (event) => {
    const {target} = event
    const {name, value} = target
    name === "checkboxTerms" 
    ? this.setState({
      checkboxTerms: !this.state.checkboxTerms
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
    
    let valid = {success: await response.ok, errorCode: await response.status}

    if (valid.success) {
        this.props.saveApiResponse(await response.json())
    } 
    else {
        this.setState({  
          validationError: {},
          serverError: {  code: valid.errorCode, 
                          message: await response.json() } 
        })
      }
  }

  displayServerError = () => {
    const error = this.state.serverError 
    return error
      ? <div 
        className="server-error">{error.message.message}
        </div>
      : null
  }
  
  render() {

    const divStyleError = {
      border: '1px solid red',
      color: 'red'
    };

    return (
      <div> 
        <div className="form-container flex-column">
        {this.displayServerError()}  
        <div>New Assistance Request</div>
          
          <div className="flex-column form-group">
              <input 
                type="text"
                name="firstName"
                style={this.state.validationError['firstName'] ? divStyleError : null} 
                placeholder="First Name"
                onChange={ this.handleChange }
                value={this.state.firstName} />
                {this.displayValidationError("firstName")}
          </div>

          <div className="flex-column form-group">
              <input 
                type="text" 
                name="lastName"
                style={this.state.validationError['lastName'] ? divStyleError : null} 
                placeholder="Last Name"
                onChange={ this.handleChange }
                value={this.state.lastName} />
              {this.displayValidationError("lastName")}
            </div>

            <div className="flex-column form-group">
              <input 
                type="email" 
                name="email"
                style={this.state.validationError['email'] ? divStyleError : null} 
                placeholder="Email Address"
                onChange={ this.handleChange }
                value={this.state.email} />
              {this.displayValidationError("email")}
            </div>

            <div className="flex-column form-group">
              <select
                name="serviceRequest"
                style={this.state.validationError['service'] ? divStyleError : null} 
                onChange={ this.handleChange }
                value={this.state.serviceRequest}>
                  <option value="">Select Service Type</option>
                  {this.buildServiceOptionList()}
              </select>
              {this.displayValidationError("service")}
            </div>
          
            <div className="flex-column form-group">
              <textarea 
                name="bodyRequest"
                style={this.state.validationError['description'] ? divStyleError : null} 
                placeholder="Provide information about your request"
                maxLength="600"
                rows="10" 
                cols="20"
                onChange={ this.handleChange }
                value={this.state.bodyRequest}>
              </textarea>
              {this.displayValidationError("description")}
            </div>

          <div className="checkbox">
            <input 
              type="checkbox"
              name="checkboxTerms"  
              id="checkboxTerms"
              onChange={ this.handleChange }
              checked={ this.state.checkboxTerms }/>
            <label
              style={this.state.validationError['checkbox'] ? divStyleError : null} 
              htmlFor="checkboxTerms">I hereby accept the terms of service for THE NETWORK and the privacy policy.</label>
          </div>

          <input 
            className="button"
            type="button" 
            value="Get Assistance" 
            onClick={this.validateFields}/>
        </div>
      </div>
    );
  }
}

export default RequestForm;
