import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Admin from '../containers/admin-container';
import GroupEdit from '../containers/group-edit-container';
import GroupAdd from './GroupAdd';
import CamperEdit from './CamperEdit';
import CamperAdd from './CamperAdd';
import Login from './Login';
import UserAdd from './UserAdd';
import Users from './Users';
import Signup from './Signup';

class App extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      campers: [],
      nextGroupId: 0,
      clearance: sessionStorage.getItem('clearance')
    };
    this.incrementNextGroupId = this.incrementNextGroupId.bind(this);
    this.setClearance = this.setClearance.bind(this);
  }

  componentWillMount() {
    fetch('/allData')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else throw new Error();
      })
      .then(data => {
        this.setState({
          groups: data.groups || [],
          campers: data.campers || [],
          users: data.users || [],
          nextGroupId: this.getHighestGroupId(data.groups) + 1
        });

        console.log(data)
        this.props.setData(data.groups, data.campers, data.users);
      })
      .catch(error => {
        console.log(error);
      });
  }

  incrementNextGroupId() {
    this.setState({
      nextGroupId: this.state.nextGroupId + 1
    });
  }
  setClearance(clearance) {
    this.setState({
      clearance
    });
  }

  getHighestGroupId(groups) {
    const ids = [];
    groups.forEach(group => {
      ids.push(group.id);
    })
    return Math.max(...ids);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path='/'
            render={props => <Login {...props} setClearance={this.setClearance} />}
          />
          <Route
            path='/signup'
            render={props => <Signup {...props} incrementNextGroupId={this.incrementNextGroupId} nextGroupId={this.state.nextGroupId} setClearance={this.setClearance} />}
          />
          <Route
            path='/userAdd'
            render={props => <UserAdd {...props} groups={this.state.groups} incrementNextGroupId={this.incrementNextGroupId} nextGroupId={this.state.nextGroupId} />}
          />
          <Route
            path='/admin'
            render={props => <Admin {...props} groups={this.state.groups} />}
          />
          <Route
            path='/users'
            render={props => <Users {...props} users={this.state.users} />}
          />
          <Route
            path='/groupAdd'
            render={props => <GroupAdd {...props} incrementNextGroupId={this.incrementNextGroupId} nextGroupId={this.state.nextGroupId} />}
          />
          <Route
            path='/groupEdit'
            render={props => <GroupEdit {...props} />}
          />
          <Route
            path='/camperAdd'
            render={props => <CamperAdd {...props} groups={this.state.groups} />}
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
