import React from 'react';
import { Redirect } from 'react-router-dom';

class UserAdd extends React.Component {
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

  login(username, password, status) {
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
        status
      })
    };

    fetch('/userAdd', options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        this.setState({
          shouldRedirect: true
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/admin'
          }}
        />
      );
    }

    return (
      <div>
        <h4>
          Add a User:
        </h4>
        <div>Username:</div>
        <input name="username" onChange={this.handleChange}></input>
        <div>Password:</div>
        <input name="password" onChange={this.handleChange}></input>
        <div>Admin or Leader?</div>
        <input type="radio" name="status" value="Admin" onChange={this.handleChange}></input>
        <div>Admin</div>
        <input type="radio" name="status" value="Leader" onChange={this.handleChange}></input>
        <div>Leader</div>
        <button onClick={() => this.login(this.state.username, this.state.password, this.state.status)}>Add</button>

        {this.state.error && (
          <div>There's been an error. Please try again.</div>
        )}
        {this.state.incomplete && (
          <div>User must have both a username and password.</div>
        )}
      </div>
    );
  }
}

export default UserAdd;