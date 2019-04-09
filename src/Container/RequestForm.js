//IMPORT MODULES
import React, { Component } from 'react';

//IMPORT ADAPTERS
import { APIRequest } from '../Adapters/ApiRequest'
import library from '../Adapters/Library'
import DivStyleLibrary from '../Styling/DivStyleLibrary'

//IMPORT COMPONENT
import ApiMessageError from '../Presentational/ApiMessageError'
import ValidationMessageError from '../Presentational/ValidationMessageError'
import ServiceOptionsSelect from '../Presentational/ServiceOptionsSelect'

class RequestForm extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    serviceRequest: undefined,
    bodyRequest: "",
    checkboxTerms: false,
    msgError: null,
    validationError: {},
    disabledBtn: false
  }

  //VALIDATION LOGIC
  //validates new requests against requestRecord which stores successful requests. If no previous equal request, it submits new one.
  validateRecords = () => {
    const { requestRecord } = this.props
    const { email, serviceRequest } = this.state

    return Object.keys( requestRecord).length > 0 
                        && requestRecord[email] 
                        && requestRecord[email].includes(serviceRequest)
      ? this.setState({ msgError: {  
                            code: undefined, 
                            message: {message: "This user has already submitted a service request of this type."} }})
      : this.handleSubmit()
  }

  //validate form fields: checks if they are blank, checked or have proper format.
  validateFields = () => {
    const { firstName, lastName, email, serviceRequest, bodyRequest, checkboxTerms } = this.state

    //submits fields to helper function in library which returns true/false and validation error
    const { allowSubmission, validationError } = library.validateFields({
      firstName, 
      lastName, 
      email, 
      serviceRequest, 
      bodyRequest, 
      checkboxTerms})

    //if fields are correct, then validate records before submission. If not, set validation error in state to be displayed.
    return allowSubmission
    ? this.validateRecords()
    : this.setState({validationError: validationError})
  }

  //HANDLING LOGIC
  //(dis)ables submit button 
  toggleBtn = () => this.setState({disabledBtn: !this.state.disabledBtn})

  //keeps fields controlled
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

  //Submits requests after validations and handles successful responses and errors. Uses saveApiResponse function passed from parent RequestContainer to lift state (successful response).
  handleSubmit = async () => {

    const {firstName, lastName, email, serviceRequest, bodyRequest} = this.state
    const { saveApiResponse} = this.props

    let data = {firstName, lastName, email, serviceRequest, bodyRequest}

    //uses APIRequest helper function to fetch API.
    let response = await APIRequest("assistance-requests", data)
    
    let valid = {success: await response.ok, errorCode: await response.status}

    if (valid.success) {
        saveApiResponse(await response.json())
    } 
    else {
        this.toggleBtn();
        this.setState({  
          validationError: {},
          msgError: {  code: valid.errorCode, 
                      message: await response.json() } 
        });
      }
  }

  render() {

    const {validationError, firstName, lastName, email, serviceRequest, bodyRequest, checkboxTerms } = this.state
    const { serviceTypes } = this.props

    return (
      <div> 
        <div className="form-container flex-column">
        <ApiMessageError msgError={this.state.msgError}/>
        <div>New Assistance Request</div>
          
          <div className="flex-column form-group">
              <input 
                type="text"
                name="firstName"
                style={ validationError['firstName'] ? DivStyleLibrary.error : null } 
                placeholder="First Name"
                onChange={ this.handleChange }
                value={ firstName } />

                <ValidationMessageError 
                  validationError={validationError}
                  fieldName="firstName"/>
          </div>

          <div className="flex-column form-group">
              <input 
                type="text" 
                name="lastName"
                aria-label="lastName-input"
                style={ validationError['lastName'] ? DivStyleLibrary.error : null } 
                placeholder="Last Name"
                onChange={ this.handleChange }
                value={ lastName } />

                <ValidationMessageError 
                  validationError={validationError}
                  fieldName="lastName"/>
                </div>

            <div className="flex-column form-group">
              <input 
                type="email" 
                name="email"
                style={ validationError['email'] ? DivStyleLibrary.error : null } 
                placeholder="Email Address"
                onChange={ this.handleChange }
                value={ email } />
                
                <ValidationMessageError 
                  validationError={validationError}
                  fieldName="email"/>
            </div>

            <div className="flex-column form-group">
              <select
                name="serviceRequest"
                style={ validationError['service'] ? DivStyleLibrary.error : null } 
                onChange={ this.handleChange }
                value={ serviceRequest }>
                  <option value="">Select Service Type</option>
                  <ServiceOptionsSelect serviceTypes={serviceTypes} />
              </select>

              <ValidationMessageError 
                  validationError={validationError}
                  fieldName="service"/>
            </div>
          
            <div className="flex-column form-group">
              <textarea 
                name="bodyRequest"
                style={ validationError['description'] ? DivStyleLibrary.error : null } 
                placeholder="Provide information about your request"
                maxLength="600"
                rows="10" 
                cols="20"
                onChange={ this.handleChange }
                value={ bodyRequest }>
              </textarea>
              <ValidationMessageError 
                  validationError={validationError}
                  fieldName="description"/>
            </div>

          <div className="checkbox">
            <input 
              type="checkbox"
              name="checkboxTerms"  
              id="checkboxTerms"
              onChange={ this.handleChange }
              checked={ checkboxTerms }/>
            <label
              style={ this.state.validationError['checkbox'] ? DivStyleLibrary.error : null } 
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
