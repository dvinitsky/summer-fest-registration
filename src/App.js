import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import GroupEdit from './GroupEdit';
import GroupAdd from './GroupAdd';
import Header from './Header';
import CamperEdit from './CamperEdit';
import CamperAdd from './CamperAdd';

class App extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      campers: [],
    }
  }

  componentWillMount() {
    fetch('/groupsAndCampers')
      .then(response => response.json())
      .then(data => {
        this.setState({
          groups: data.groups || [],
          campers: data.campers || [],
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path='/admin'
            render={props => <Admin {...props} groups={this.state.groups}
              />}
          />
          <Route
            path='/groupAdd'
            render={props => <GroupAdd {...props} />}
          />
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
      </div>
    );
  }
}

export default App;
