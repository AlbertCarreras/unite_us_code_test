import React, { Component } from 'react';
import './css/App.css';

import NavBar from './Presentational/NavBar'
import FormApp from './Container/FormApp'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="flex-column App-body">
          <NavBar />
          <FormApp />
        </header>
      </div>
    );
  }
}

export default App;
