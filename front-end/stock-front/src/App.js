import Home from './pages/Home';
import Stock from './pages/Stock';
import Session from './pages/Session';
import './App.css';
import cookie from 'react-cookies';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
let qs = require('qs');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    }
  }

  componentWillMount() {
    const token = cookie.load('token');
    if (!token) {
      axios.get('https://localhost:44338/api/users/token/blah', qs.stringify({ token }))
        .then(res => {
          console.log(res)
        })
    }
  }


  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/stock/:symbol" component={Stock} />
          <Route exact path="/session" component={Session} />
        </Switch>
      </div>
    )
  }
}

const ProtectedRoute = ({ component: Component, ...etc }) => (
  <Route {...etc} render={(props) => (
    false ? <Component {...props} />
      : <Redirect to="/session" />
  )} />
)