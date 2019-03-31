import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import GroupEdit from './GroupEdit';
import GroupAdd from './GroupAdd';
import Header from './Header';
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
    console.log('setting clearance!')
    console.log(clearance)
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
    const isAdmin = this.state.clearance === 'admin';
    const isLeader = this.state.clearance === 'leader';

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
            render={props => <Signup {...props} incrementNextGroupId={this.incrementNextGroupId} nextGroupId={this.state.nextGroupId} setClearance={this.setClearance} />}
          />
        </Switch>

        {/* {isAdmin && ( */}
          <Switch>
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
          </Switch>
        {/* )} */}

        {/* {(isLeader || isAdmin) && ( */}
          <Switch>
            <Route
              path='/groupEdit'
              render={props => <GroupEdit {...props} campers={this.state.campers} />}
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
        {/* )} */}
      </div>
    );
  }
}

export default App;
