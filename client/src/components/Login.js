import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../services/user-service';
import { setActiveGroupId, setActiveUserClearance, setActiveUserName } from '../helpers';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    document.getElementById('password-input').onkeydown = (event) => {
      if (event.key === 'Enter') {
        this.login();
      }
    }
    document.getElementById('username-input').onkeydown = (event) => {
      if (event.key === 'Enter') {
        this.login();
      }
    }

    fetch('/allData')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else throw new Error();
      })
      .then(data => {
        this.setState({ data });
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  login() {
    login(this.state.username, this.state.password).then(response => {
      if (response.error) {
        this.setState({
          error: response.error.message
        });
      } else {
        setActiveUserClearance(response.user.status);
        setActiveUserName(response.user.username);
        setActiveGroupId((response.group && response.group.id) || 0);
        this.setState({
          redirectUrl: response.redirectUrl
        });
      }
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
    if (this.state.redirectUrl) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirectUrl
          }}
        />
      );
    }

    return (
      <div>
        <h4>Login</h4>
        <div>Username:</div>
        <input id="username-input" name="username" onChange={this.handleChange} />
        <div>Password:</div>
        <input id="password-input" name="password" type="password" onChange={this.handleChange} />
        <div>
          <input type="checkbox" onClick={this.toggleShowPassword} />
          Show Password
        </div>
        <button onClick={this.login}>Log In</button>

        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}

export default Login;