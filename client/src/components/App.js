import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Admin from '../containers/admin-container';
import GroupEdit from '../containers/group-edit-container';
import GroupAdd from '../containers/group-add-container';
import CamperEdit from '../containers/camper-edit-container';
import CamperAdd from '../containers/camper-add-container';
import Header from '../containers/header-container';
import Login from '../containers/login-container';
import UserAdd from '../containers/user-add-container';
import Users from '../containers/users-container';
import Signup from '../containers/signup-container';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path='/'
            render={props => <Login {...props} />}
          />
          <Route
            path='/signup'
            render={props => <Signup {...props} />}
          />
          <Route
            path='/userAdd'
            render={props => <UserAdd {...props} />}
          />
          <Route
            path='/admin'
            render={props => <Admin {...props} />}
          />
          <Route
            path='/users'
            render={props => <Users {...props} />}
          />
          <Route
            path='/groupAdd'
            render={props => <GroupAdd {...props} />}
          />
          <Route
            path='/groupEdit'
            render={props => <GroupEdit {...props} />}
          />
          <Route
            path='/camperAdd'
            render={props => <CamperAdd {...props} />}
          />
          <Route
            path='/camperEdit'
            render={props => <CamperEdit {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
