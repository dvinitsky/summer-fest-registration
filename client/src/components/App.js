import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import UserAdd from './UserAdd';
import Admin from './Admin';
import Users from './Users';
import GroupAdd from './GroupAdd';
import GroupEdit from './GroupEdit';
import CamperAdd from './CamperAdd';
import CamperEdit from './CamperEdit';
import Header from './Header';
import { getActiveUserClearance } from '../helpers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeUserClearance: getActiveUserClearance()
    };

    this.refreshActiveUserClearance = this.refreshActiveUserClearance.bind(this);
  }

  refreshActiveUserClearance() {
    this.setState({
      activeUserClearance: getActiveUserClearance()
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path='/'
            render={props => {
              return (
                <>
                  <Header activeUserClearance={this.state.activeUserClearance} />
                  <Login {...props} />
                </>
              );
            }}
          />
          <Route
            path='/signup'
            render={props => {
              return (
                <>
                  <Header activeUserClearance={this.state.activeUserClearance} />
                  <Signup {...props} refreshActiveUserClearance={this.refreshActiveUserClearance} />
                </>
              );
            }}
          />
          <Route
            path='/userAdd'
            render={props => {
              return (
                <>
                  <Header />
                  <UserAdd {...props} />
                </>
              );
            }}
          />
          <Route
            path='/admin'
            render={props => {
              return (
                <>
                  <Header />
                  <Admin {...props} />
                </>
              );
            }}
          />
          <Route
            path='/users'
            render={props => {
              return (
                <>
                  <Header />
                  <Users {...props} />
                </>
              );
            }}
          />
          <Route
            path='/groupAdd'
            render={props => {
              return (
                <>
                  <Header />
                  <GroupAdd {...props} />
                </>
              );
            }}
          />
          <Route
            path='/groupEdit'
            render={props => {
              return (
                <>
                  <Header activeUserClearance={this.state.activeUserClearance} />
                  <GroupEdit {...props} />
                </>
              );
            }}
          />
          <Route
            path='/camperAdd'
            render={props => {
              return (
                <>
                  <Header />
                  <CamperAdd {...props} />
                </>
              );
            }}
          />
          <Route
            path='/camperEdit'
            render={props => {
              return (
                <>
                  <Header />
                  <CamperEdit {...props} />
                </>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
