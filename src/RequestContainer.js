import React, { Component } from 'react';
import RequestForm from './RequestForm'
import Confirmation from './Confirmation'

class RequestContainer extends Component {  

  state = {
    response: null,
    error: {},
  }

  saveApiResponse = (valid, response) => {
    if (valid.error) {
      this.setState({ response: response })
    } 
    else {
      this.setState({  error: { code: valid.code, 
                                msg: response } })
    }
  }

  submitNewRequest = () => {
    this.setState({  response: null })
  }

  render() {
    console.log(this.state.response, "/", this.state.error)
    return (
      <div>
          { !this.state.response ?
              <RequestForm 
                serviceTypes={this.props.serviceTypes} 
                saveApiResponse={this.saveApiResponse}
                />
            : <Confirmation 
                confirmationMsg={this.state.response}
                submitNewRequest={this.submitNewRequest}
            />}
      </div>
    );
  }
}

export default RequestContainer;
