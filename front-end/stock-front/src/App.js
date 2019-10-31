import React from 'react';
import Home from './pages/Home';
import Stock from './pages/Stock';
import './App.css';

import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/stock/:symbol" component={Stock} />
      </Switch>
    </div>
  );
}

export default App;
