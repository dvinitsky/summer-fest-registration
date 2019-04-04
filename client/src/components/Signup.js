import React from 'react';
import { Redirect } from 'react-router-dom';

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

  add(username, password) {
    if (!username || !password) {
      this.setState({ incomplete: true });
      return;
    }
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        nextGroupId: this.props.nextGroupId
      })
    };

    fetch('/signup', options)
      .then(response => {
        this.props.incrementNextGroupId();
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        sessionStorage.setItem('clearance', data.clearance)
        this.setState({
          shouldRedirect: true,
          group: data.group,
          clearance: data.clearance
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
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
          <button onClick={() => this.add(this.state.username, this.state.password)}>Submit</button>

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