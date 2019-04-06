import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../components/Login';
import { Signup } from '../components/Signup';
import { UserAdd } from '../components/UserAdd';
import { Admin } from '../components/Admin';
import { Users } from '../components/Users';
import { GroupAdd } from '../components/GroupAdd';
import { GroupEdit } from '../components/GroupEdit';
import { CamperAdd } from '../components/CamperAdd';
import { CamperEdit } from '../components/CamperEdit';

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
