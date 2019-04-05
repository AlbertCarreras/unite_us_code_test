import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar'
import RequestForm from './RequestForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-body">
          <NavBar />
          <RequestForm />
        </header>
      </div>
    );
  }
}

export default App;
