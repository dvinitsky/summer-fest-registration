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
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState.group[e.target.name] = e.target.value;
    this.setState(newState);
  }

  addGroup(group_name, leader_name) {
    addGroup(group_name, leader_name, this.props.nextGroupId).then(response => {
      this.props.incrementNextGroupId();
      if (response.error) {
        this.setState({ error: true });
      } else {
        this.props.setActiveGroup(response.group);
        this.setState({
          shouldRedirect: true,
        })
      }
    });
  }

  render() {
    const { activeUserClearance } = this.props;

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit'
          }}
        />
      );
    }

    if (activeUserClearance !== 'admin') {
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

        {this.state.error && (
          <div id="error">
            There's been an error. Please try again.
          </div>
        )}
      </div>
    );
  }
}

export default GroupAdd;