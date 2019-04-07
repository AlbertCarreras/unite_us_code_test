import React, { Component, Fragment } from 'react';

//IMPORT ADAPTERS
import { APIRequest } from '../Adapters/ApiRequest'

//IMPORT COMPONENTS
import RequestContainer from './RequestContainer'

class FormApp extends Component {

  _isMounted = false;

  state = {
    serviceTypes:[],
    error: null
  }

  stateUpdater(type, response) {
      return { [type]: response.data };
  }

  componentDidMount() {
    this._isMounted = true;

    APIRequest("service_type").then(resp => {
      if (this._isMounted) {
        this.setState(this.stateUpdater("serviceTypes", resp))
      }})
      .catch( e => {
        if (this._isMounted) {
          this.setState(this.stateUpdater("error", e))
      }})
  }

  componentWillUnmount() {
    this._isMounted = false;
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
