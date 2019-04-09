//IMPORT MODULES
import React, { Component } from 'react';

//IMPORT COMPONENTS
import RequestForm from './RequestForm'
import Confirmation from '../Presentational/Confirmation'

class RequestContainer extends Component {  

  state = {
    responseSuccess: null,
    requestRecord: {}
  }

  //function passed as props. RequestForm component will lift state through it. This solution could be replaced with redux and actions.
  saveApiResponse = (response) => {

    const {assistance_request} = response.echo
    const {requestRecord} = this.state

    let email = assistance_request.contact.email
    let type = assistance_request.service_type
    let emailRecord = this.state.requestRecord[email]
    let updatedEmailRecord =  emailRecord ? [...emailRecord, type] : [type]
    
    this.setState({  
      responseSuccess: response,
      //requestRecord stores successful requests mapping emails and their requests to prevent double requests. This info should be persisted in backend.
      requestRecord: Object.assign({}, requestRecord, { [email]: updatedEmailRecord })
    })
  }

  cleanResponse = () => this.setState({responseSuccess: null})

  render() {

    const { serviceTypes } = this.props
    const { responseSuccess, requestRecord } = this.state

    return (
      //if request is successful, display Confirmation component. Otherwise, keep form.
      <div>
          { this.state.responseSuccess 
              ? <Confirmation 
                  confirmationMsg={responseSuccess}
                  //pass clearResponse function. Acts like a toggle.
                  cleanResponse={this.cleanResponse}/>
            
              : <RequestForm 
                  serviceTypes={serviceTypes} 
                  requestRecord={requestRecord}
                  saveApiResponse={this.saveApiResponse}/>
            }
      </div>
    );
  }
}

export default RequestContainer;
