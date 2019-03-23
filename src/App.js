import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import GroupEdit from './GroupEdit';
import GroupAdd from './GroupAdd';
import Header from './Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      campers: [],
    }
    this.setActiveGroup = this.setActiveGroup.bind(this);
    this.setActiveCamper = this.setActiveCamper.bind(this);
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

  setActiveGroup(activeGroupId) {
    this.setState({
      activeGroupId
    });
  }
  setActiveCamper(activeCamperId) {
    this.setState({
      activeCamperId
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
            render={props =>
              <Admin
                {...props}
                groups={this.state.groups}
              />}
          />
          <Route
            path='/groupEdit'
            render={props => <GroupEdit {...props} campers={this.state.campers} group={this.state.activeGroupId} />}
          />
          <Route
            path='/groupAdd'
            render={props => <GroupAdd {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
