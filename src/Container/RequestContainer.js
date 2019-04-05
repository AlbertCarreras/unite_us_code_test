import React, { Component } from 'react';
import RequestForm from './RequestForm'
import Confirmation from '../Presentational/Confirmation'

class RequestContainer extends Component {  

  state = {
    response: null,
    requestRecord: {}
  }

  saveApiResponse = (response) => {

    const {assistance_request} = response.echo
    const {requestRecord} = this.state

    let email = assistance_request.contact.email
    let type = assistance_request.service_type
    let emailRecord = this.state.requestRecord[email]
    let updatedEmailRecord =  emailRecord ? [...emailRecord, type] : [type]
    
    this.setState({  
        response: response,
        requestRecord: Object.assign({}, requestRecord, { [email]: updatedEmailRecord })
    })
  }

  cleanResponse = () => this.setState({response: null})

  render() {

    const { serviceTypes } = this.props
    const { response, requestRecord } = this.state

    return (
      <div>
          { !this.state.response ?
              <RequestForm 
                serviceTypes={serviceTypes} 
                requestRecord={requestRecord}
                saveApiResponse={this.saveApiResponse}
                />
            : <Confirmation 
                confirmationMsg={response}
                cleanResponse={this.cleanResponse}
            />}
      </div>
    );
  }
}

export default RequestContainer;
