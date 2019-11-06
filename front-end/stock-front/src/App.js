import Home from './pages/Home';
import Stock from './pages/Stock';
import Session from './pages/Session';
import './App.css';
import cookie from 'react-cookies';

import Flash from './components/Flash';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
let qs = require('qs');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      flashMessage: null,
      flashType: null
    }
    this.setFlash = this.setFlash.bind(this);
  }

  setFlash(flashMessage, type) {
    let that = this;
    setTimeout(removeFlash, 2000);
    this.setState({ flashMessage, flashType: type })

    function removeFlash() {
      that.setState({ flashMessage: null, flashType: null });
    }
  }

  componentWillMount() {
    const token = cookie.load('token');
    if (token) { // check on whether there's an active token for a user
      axios.get(`https://localhost:44338/api/users/token/${token}`, qs.stringify({ token }))
        .then(res => {
          console.log(res)
        })
    }
    else { // the user will need to login/sign up
      console.log('blah')
    }
  }


  render() {
    return (
      <div className="App">
        <Navbar />
        <Flash type={this.state.flashType} message={this.state.flashMessage} />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/stock/:symbol" component={Stock} />
          <Route
            exact path="/session"
            render={(props) => < Session {...props} setFlash={this.setFlash} />} />
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