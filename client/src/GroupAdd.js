import React from 'react';
import { Redirect } from 'react-router-dom';

class GroupAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextId: '',
      group: {}
    };
    this.addGroup = this.addGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState.group[e.target.name] = e.target.value;
    this.setState(newState);
  }

  addGroup(group_name, leader_name) {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ group_name, leader_name, id: this.props.nextGroupId })
    };

    fetch('/groupAdd', options)
      .then(response => {
        if (response.ok) {
          this.props.incrementNextGroupId();
          return response.json();
        }
        else throw new Error();
      })
      .then(data => {
        this.setState({
          shouldRedirect: true,
          group: data.group
        });
      })
      .catch(error => {
        document.getElementById('error').style.display = 'block';
      });
  }

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit',
            state: {
              group: this.state.group,
              noCampers: {}
            }
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