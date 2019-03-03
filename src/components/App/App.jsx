import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from '../Login';
import SignUp from '../SignUp';
import Profile from '../Profile';
import PrivateRoute from '../PrivateRoute';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-content">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <PrivateRoute path="/profile" component={Profile}/>
          </Switch>
        </div>
      </div>
    );
  }
}
