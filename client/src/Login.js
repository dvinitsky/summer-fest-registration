import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.logout) {
      sessionStorage.clear();
    }
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

        sessionStorage.setItem('clearance', data.clearance)
        sessionStorage.setItem('group_id', data.group.id)
        this.setState({
          shouldRedirect: true,
          redirectUrl: data.redirectUrl,
          group: data.group || null,
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  toggleShowPassword() {
    const element = document.getElementById("password-input");
    if (element.type === "password") {
      element.type = "text";
    } else {
      element.type = "password";
    }
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
        <Header />
        <h4>Login</h4>
        <div>Username:</div>
        <input name="username" onChange={this.handleChange} />
        <div>Password:</div>
        <input id="password-input" name="password" type="password" onChange={this.handleChange} />
        <div>
          <input type="checkbox" onClick={this.toggleShowPassword} />
          Show Password
        </div>
        <button onClick={() => this.login(this.state.username, this.state.password)}>Log In</button>

        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}

export default Login;