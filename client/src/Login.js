import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  login(username, password) {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      })
    };

    fetch('/login', options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        this.setState({
          shouldRedirect: true,
          redirectUrl: data.redirectUrl,
          group: data.group || null
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  render() {
    const shouldRedirect = this.props.shouldRedirect || this.state.shouldRedirect;

    if (shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirectUrl,
            state: {
              group: this.state.group
            }
          }}
        />
      );
    }

    return (
      <div>
        <div>Username:</div>
        <input name="username" onChange={this.handleChange}></input>
        <div>Password:</div>
        <input name="password" onChange={this.handleChange}></input>
        <button onClick={() => this.login(this.state.username, this.state.password)}>Log In</button>

        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}

export default Login;