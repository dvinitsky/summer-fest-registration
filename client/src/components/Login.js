import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../services/user-service';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (this.props.shouldLogout) {
      this.props.logout;
    }
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  login(username, password) {
    login(username, password).then(response => {
      console.log('response gotten')
      if (response.error) {
        this.setState({
          error: response.error.message
        });
      } else {
        this.props.setActiveUser(response.user);
        this.setState({
          redirectUrl: response.redirectUrl,
          group: response.group || null
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
    const { setActiveGroup } = this.props;

    if (this.state.redirectUrl) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirectUrl
          }}
          onClick={() => setActiveGroup(this.state.group)}
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