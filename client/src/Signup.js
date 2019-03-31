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

  login(username, password) {
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
        status: 'leader'
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
          error: error.message
        });
      });
  }

  render() {
    // if (this.state.shouldRedirect) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/admin'
    //       }}
    //     />
    //   );
    // }

    return (
      <div>
        <h4>
          Signup
        </h4>
        <div>Username:</div>
        <input name="username" onChange={this.handleChange}></input>
        <div>Password:</div>
        <input name="password" onChange={this.handleChange}></input>
        <button onClick={() => this.login(this.state.username, this.state.password)}>Submit</button>

        {this.state.error && <div>{this.state.error}</div>}

        {this.state.incomplete && (
          <div>You must have both a username and password.</div>
        )}
      </div>
    );
  }
}

export default Signup;