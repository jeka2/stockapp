import Home from './pages/Home';
import Stock from './pages/Stock';
import Session from './pages/Session';
import './App.css';

import Navbar from './components/Navbar';
import { Route, Switch, Redirect } from 'react-router-dom';

import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/stock/:symbol" component={Stock} />
          <Route exact path="/session" component={Session} />
        </Switch>
      </div>
    )
  }
}
