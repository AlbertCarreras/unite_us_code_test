import React, { Component, Fragment } from 'react';

import RequestContainer from './RequestContainer'

class FormApp extends Component {

  state = {
    serviceTypes:[],
    error: null
  }

  componentDidMount() {
    fetch("http://localhost:49567/api/service-types")
      .then(resp => resp.json())
      .then(resp => this.setState({
        serviceTypes: resp.data
      }))
      .catch( e => this.setState({
        error: e
      }))
  }

  render() {
    return (
          <Fragment>
          { !this.state.error
            ? this.state.serviceTypes.length > 0 
              ? <RequestContainer 
                      serviceTypes={this.state.serviceTypes} />
              : null
            : <div className="form-container server-error">Apologies. The Service Request Form is not available. <br/><br/>Our team is working to solve it. </div>
          }
          </Fragment>

    );
  }
}

export default FormApp;
