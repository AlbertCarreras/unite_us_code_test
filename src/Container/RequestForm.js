import React, { Component } from 'react';

//IMPORT ADAPTERS
import { APIRequest } from '../Adapters/ApiRequest'
import library from '../Adapters/Library'

//IMPORT COMPONENT
import SelectOption from '../Presentational/SelectOption'

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
      return serviceTypes.map( item => <SelectOption key={item.id} data={item.display_name} />)
    }
  }

  validateRecords = () => {
    const { requestRecord } = this.props
    const { email, serviceRequest } = this.state

    return Object.keys(requestRecord).length > 0 && requestRecord[email] && requestRecord[email].includes(serviceRequest)
    ? this.setState({ serverError: {  
                          code: undefined, 
                          message: {message: "This user has already submitted a service request of this type."} } 
    })
    : this.handleSubmit()
  }

  validateFields = () => {
    const { firstName, lastName, email, serviceRequest, bodyRequest, checkboxTerms } = this.state

    const { allowSubmission, validationError } = library.validateFields({
      firstName, 
      lastName, 
      email, 
      serviceRequest, 
      bodyRequest, 
      checkboxTerms})

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

    const {firstName, lastName, email, serviceRequest, bodyRequest} = this.state

    let data = {firstName, lastName, email, serviceRequest, bodyRequest}

    let response = await APIRequest("assistance-requests", data)
    
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
                aria-label="lastName-input"
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
