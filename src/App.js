import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar'
import RequestForm from './RequestForm'

class App extends Component {

  state = {
    serviceTypes:[]
  }

  componentDidMount() {
    fetch("http://localhost:49567/api/service-types")
      .then(resp => resp.json())
      .then(resp => this.setState({
        serviceTypes: resp.data
      }))
  }

  render() {
    console.log(this.state.serviceTypes)
    return (
      <div className="App">
        <header className="App-body">
          <NavBar />
          { this.state.serviceTypes.length > 0 
            ? <RequestForm 
            serviceTypes={this.state.serviceTypes} /> 
            : null
          }
        </header>
      </div>
    );
  }
}

export default App;
