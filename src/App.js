import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar'
import FormApp from './FormApp'

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
