//IMPORT MODULES
import React, { Component, Fragment } from 'react';

//IMPORT ADAPTERS
import { APIRequest } from '../Adapters/ApiRequest'

//IMPORT COMPONENTS
import RequestContainer from './RequestContainer'
import ErrorDown from '../Presentational/ErrorDown'

class FormApp extends Component {

  //_isMounted logic prevents memory leak message displayed during testing.
  _isMounted = false;

  state = {
    serviceTypes:[],
    error: false
  }

  stateUpdater(type, response) {
      return { [type]: response };
  }

  componentDidMount() {
    this._isMounted = true;

    //Component calls api after mounting to get service types list.
    APIRequest("service_type")
      .then(resp => {
        if (this._isMounted) {
          this.setState(this.stateUpdater("serviceTypes", resp.data))
        }})
      //catches if error from API not running  
      .catch( e => {
        if (this._isMounted) {
          this.setState(this.stateUpdater("error", e.message))
      }})
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { serviceTypes } = this.state
    return (
          <Fragment>
          { this.state.error
            ? <ErrorDown component="Service Request Form"/>
            : this.state.serviceTypes.length > 0 
              ? <RequestContainer 
                      serviceTypes={serviceTypes} />
              : null
          }
          </Fragment>

    );
  }
}

export default FormApp;
