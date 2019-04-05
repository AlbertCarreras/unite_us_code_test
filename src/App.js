import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar'
import RequestContainer from './RequestContainer'

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
    return (
      <div className="App">
        <header className="flex-column App-body">
          <NavBar />
          { this.state.serviceTypes.length > 0 
            ? <RequestContainer 
                serviceTypes={this.state.serviceTypes} />
            : null
          }
        </header>
      </div>
    );
  }
}

export default App;
