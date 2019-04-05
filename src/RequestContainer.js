import React, { Component } from 'react';
import RequestForm from './RequestForm'
import Confirmation from './Confirmation'

class RequestContainer extends Component {  

  state = {
    response: null,
  }

  saveApiResponse = (response) => {
      this.setState({  response: response })
  }

  render() {
    return (
      <div>
          { !this.state.response ?
              <RequestForm 
                serviceTypes={this.props.serviceTypes} 
                saveApiResponse={this.saveApiResponse}
                />
            : <Confirmation 
                confirmationMsg={this.state.response}
                submitNewRequest={this.saveApiResponse}
            />}
      </div>
    );
  }
}

export default RequestContainer;
