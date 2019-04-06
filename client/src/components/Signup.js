import React from 'react';
import { Redirect } from 'react-router-dom';
import { addUser } from '../services/user-service';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  addUser(username, password) {
    const response = addUser(username, password, this.props.nextGroupId);
    this.props.incrementNextGroupId();

    if (response.error) {
      this.setState({
        error: response.error.message
      });
    } else if (response.incomplete) {
      this.setState({
        incomplete: true
      });
    } else {
      sessionStorage.setItem('clearance', 'leader')
      this.setState({
        shouldRedirect: true
      });
      this.props.setActiveGroup(data.group);
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

    return (
      <>
        <div>
          <h4>
            Signup
        </h4>
          <div>Username:</div>
          <input name="username" onChange={this.handleChange}></input>
          <div>Password:</div>
          <input name="password" onChange={this.handleChange}></input>
          <button onClick={() => this.addUser(this.state.username, this.state.password)}>Submit</button>

          {this.state.error && <div>{this.state.error}</div>}

          {this.state.incomplete && (
            <div>You must have both a username and password.</div>
          )}
        </div>
      </>
    );
  }
}

export default Signup;