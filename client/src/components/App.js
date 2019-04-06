import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Admin from '../containers/admin-container';
import GroupEdit from '../containers/group-edit-container';
import GroupAdd from '../containers/GroupAdd';
import CamperEdit from '../containers/CamperEdit';
import CamperAdd from '../containers/CamperAdd';
import Header from '../containers/header-container';
import Login from './Login';
import UserAdd from './UserAdd';
import Users from './Users';
import Signup from './Signup';
import { getHighestGroupId } from '../helpers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clearance: sessionStorage.getItem('clearance')
    };
    this.setClearance = this.setClearance.bind(this);
  }

  componentWillMount() {
    console.log('goign to fetch fresh data');
    fetch('/allData')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else throw new Error();
      })
      .then(data => {
        this.props.setNextGroupId(getHighestGroupId(data.groups) + 1);
        this.props.setData(data.groups, data.campers, data.users);
      })
      .catch(error => {
        console.log(error);
      });
  }

  setClearance(clearance) {
    this.setState({
      clearance
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path='/'
            render={props => <Login {...props} setClearance={this.setClearance} />}
          />
          <Route
            path='/signup'
            render={props => <Signup {...props} setClearance={this.setClearance} />}
          />
          <Route
            path='/userAdd'
            render={props => <UserAdd {...props} groups={this.state.groups} />}
          />
          <Route
            path='/admin'
            render={props => <Admin {...props} />}
          />
          <Route
            path='/users'
            render={props => <Users {...props} users={this.state.users} />}
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
