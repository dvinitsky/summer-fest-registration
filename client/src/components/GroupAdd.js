import React from 'react';
import { Redirect } from 'react-router-dom';
import { addGroup } from '../services/group-service';

class GroupAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {
        group_name: null,
        leader_name: null
      },
      clearance: sessionStorage.getItem('clearance')
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState.group[e.target.name] = e.target.value;
    this.setState(newState);
  }

  addGroup(group_name, leader_name) {
    const response = addGroup(group_name, leader_name, this.props.nextGroupId);
    this.props.incrementNextGroupId();
    if (response.error) {
      document.getElementById('error').style.display = 'block';
    } else {
      this.setState({
        shouldRedirect: true,
        group: response.group
      })
    }
  }

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit',
            state: {
              group: this.state.group
            }
          }}
        />
      );
    }

    if (this.state.clearance !== 'admin') {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      );
    }

    return (
      <div className="container" method="post">
        <h3>
          Group Name:
        </h3>
        <input onChange={this.handleChange} className="group-add-input" name="group_name" />

        <div>
          <br />
          Leader Name:
          <input onChange={this.handleChange} className="group-add-input" name="leader_name" />
        </div>

        <button type="button" onClick={() => this.addGroup(this.state.group.group_name, this.state.group.leader_name)}>Save</button>

        <div id="error">
          There's been an error. Please try again.
          </div>
      </div>
    );
  }
}

export default GroupAdd;