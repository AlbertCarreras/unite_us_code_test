import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar'
import ErrorBoundary from './ErrorBoundary'
import FormApp from './FormApp'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="flex-column App-body">
          <NavBar />
            <ErrorBoundary>
              <FormApp />
            </ErrorBoundary>
        </header>
      </div>
    );
  }
}

export default App;
