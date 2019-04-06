import React from 'react';
import { Redirect } from 'react-router-dom';
import { signup } from '../services/user-service';
import { setActiveGroupId, getHighestGroupId } from '../helpers';

class Signup extends React.Component {
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

  signup(username, password) {
    signup(username, password, this.props.nextGroupId).then(response => {
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
        sessionStorage.setItem('clearance', response.user.status);
        sessionStorage.setItem('username', response.user.username);
        this.setState({
          shouldRedirect: true
        });
        setActiveGroupId(response.group.id);
      }
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
          <button onClick={() => this.signup(this.state.username, this.state.password)}>Submit</button>

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