import React, { Component } from 'react';
import RequestForm from './RequestForm'

class RequestContainer extends Component {  

  render() {
    return (
      <div>
        <RequestForm 
          serviceTypes={this.props.serviceTypes} 
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          />
      </div>
    );
  }
}

export default RequestContainer;
