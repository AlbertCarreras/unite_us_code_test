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
    validationError: {},
    disabledBtn: false
  }

  buildServiceOptionList = () => {
    const { serviceTypes } = this.props

    if (serviceTypes.length > 0) {
      return serviceTypes.map( item => {
        const {id, display_name} = item

        return <option 
                  key={id} 
                  value={display_name}>{display_name}
                  </option>
      })
    }
  }

  validateRecords = () => {
    const { requestRecord } = this.props
    const { email, serviceRequest } = this.state

    return Object.keys(requestRecord).length > 0 && requestRecord[email].includes(serviceRequest)
    ? this.setState({ serverError: {  
                          code: undefined, 
                          message: {message: "This user has already submitted a service request of this type."} } 
    })
    : this.handleSubmit()
  }

  validateFields = () => {
    var allowSubmission = true;
    var validationError = {}
    const {firstName, lastName, email, serviceRequest, bodyRequest, checkboxTerms} = this.state

    if (firstName === "") {
      allowSubmission = false;
      validationError["firstName"] = "First Name cannot be blank."
    }

    if (lastName === "") {
      allowSubmission = false;
      validationError["lastName"] = "Last Name cannot be blank."
    }
    
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      allowSubmission = false;
      validationError["email"] = "Invalid email address format."
    }
    
    if ((serviceRequest === undefined)) {
      allowSubmission = false;
      validationError["service"] = "A service type must be selected."
    }
    
    if ((bodyRequest === "")) {
      allowSubmission = false;
      validationError["description"] = "A description must be provided."
    }

    if (!(checkboxTerms)) {
      allowSubmission = false;
      validationError["checkbox"] = "You must accept to terms and conditions."
    }

    return allowSubmission
    ? this.validateRecords()
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

    if (this.state.disabledBtn) this.toggleBtn() 

    name === "checkboxTerms" 
    ? this.setState({
      checkboxTerms: !this.state.checkboxTerms
      })
    : this.setState({
        [name]: value,
      });
  }

  toggleBtn = () => this.setState({disabledBtn: !this.state.disabledBtn})

  handleSubmit = async () => {

    const POST = 'POST'

    const HEADERS = { 
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }

    const {firstName, lastName, email, serviceRequest, bodyRequest} = this.state

    const body = JSON.stringify(
      {
        "assistance_request": {
          "contact": {
            "first_name": firstName,
            "last_name": lastName,
            "email": email
          },
          "service_type": serviceRequest,
          "description": bodyRequest
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
        this.toggleBtn();
        this.setState({  
          validationError: {},
          serverError: {  code: valid.errorCode, 
                          message: await response.json() } 
        });
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
    const {validationError, firstName, lastName, email, serviceRequest, bodyRequest, checkboxTerms } = this.state

    const divStyleError = {
      border: '1px solid red',
      color: 'red'
    };

    return (
      <div> 
        <div className="form-container flex-column">
        { this.displayServerError() }  
        <div>New Assistance Request</div>
          
          <div className="flex-column form-group">
              <input 
                type="text"
                name="firstName"
                style={ validationError['firstName'] ? divStyleError : null } 
                placeholder="First Name"
                onChange={ this.handleChange }
                value={ firstName } />
                { this.displayValidationError("firstName") }
          </div>

          <div className="flex-column form-group">
              <input 
                type="text" 
                name="lastName"
                style={ validationError['lastName'] ? divStyleError : null } 
                placeholder="Last Name"
                onChange={ this.handleChange }
                value={ lastName } />
              { this.displayValidationError("lastName") }
            </div>

            <div className="flex-column form-group">
              <input 
                type="email" 
                name="email"
                style={ validationError['email'] ? divStyleError : null } 
                placeholder="Email Address"
                onChange={ this.handleChange }
                value={ email } />
              { this.displayValidationError("email") }
            </div>

            <div className="flex-column form-group">
              <select
                name="serviceRequest"
                style={ validationError['service'] ? divStyleError : null } 
                onChange={ this.handleChange }
                value={ serviceRequest }>
                  <option value="">Select Service Type</option>
                  { this.buildServiceOptionList() }
              </select>
              { this.displayValidationError("service") }
            </div>
          
            <div className="flex-column form-group">
              <textarea 
                name="bodyRequest"
                style={ validationError['description'] ? divStyleError : null } 
                placeholder="Provide information about your request"
                maxLength="600"
                rows="10" 
                cols="20"
                onChange={ this.handleChange }
                value={ bodyRequest }>
              </textarea>
              { this.displayValidationError("description") }
            </div>

          <div className="checkbox">
            <input 
              type="checkbox"
              name="checkboxTerms"  
              id="checkboxTerms"
              onChange={ this.handleChange }
              checked={ checkboxTerms }/>
            <label
              style={ this.state.validationError['checkbox'] ? divStyleError : null } 
              htmlFor="checkboxTerms">I hereby accept the terms of service for THE NETWORK and the privacy policy.</label>
          </div>

          <input 
            className="button"
            disabled={this.state.disabledBtn}
            type="button" 
            value="Get Assistance" 
            onClick={ () => { this.toggleBtn(); 
                              this.validateFields(); }}/>
        </div>
      </div>
    );
  }
}

export default RequestForm;
