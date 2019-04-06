import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../services/user-service';
import { setActiveGroupId, setActiveUserClearance, setActiveUserName, getHighestGroupId } from '../helpers';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
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

  login(username, password) {
    login(username, password).then(response => {
      if (response.error) {
        this.setState({
          error: response.error.message
        });
      } else {
        setActiveUserClearance(response.user.status);
        setActiveUserName(response.user.username);
        setActiveGroupId(response.group.id);
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
      console.log('redirecting')
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