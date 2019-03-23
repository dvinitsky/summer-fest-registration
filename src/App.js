import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import GroupEdit from './GroupEdit';
import GroupAdd from './GroupAdd';
import Header from './Header';

const groups = [
  {
    id: 1,
    group_name: 'group a'
  },
  {
    id: 2,
    group_name: 'group b'
  }
];
const group = groups[0];

const campers = [
  {
    id: 1,
    first_name: 'camper a'
  },
  {
    id: 2,
    first_name: 'camper b'
  }
]

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path='/admin'
            render={props => <Admin {...props} groups={groups} />}
          />
          <Route
            path='/groupEdit'
            render={props => <GroupEdit {...props} campers={campers} group={group} />}
          />
          <Route
            path='/groupAdd'
            render={props => <GroupAdd {...props} />}
          />
        </Switch>
      </div>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
