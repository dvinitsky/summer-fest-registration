import React from 'react';
import { Redirect } from 'react-router-dom';
import { signup } from '../services/user-service';
import { setActiveGroupId, setActiveUserName, setActiveUserClearance } from '../helpers';
import './Signup.css';

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
    signup(username, password).then(response => {
      if (response.error) {
        this.setState({
          error: response.error.message
        });
      } else if (response.incomplete) {
        this.setState({
          incomplete: true
        });
      } else {
        setActiveGroupId(response.group.id);
        setActiveUserClearance(response.user.status);
        setActiveUserName(response.user.username);
        this.setState({
          shouldRedirect: true
        });
      }
    });
  }

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit'
          }}
        />
      );
    }

    return (
      <>
        <div className="signup">
          <h3 className="signup-text signup-header">
            Signup
         </h3>
          <div className="signup-text">Username:</div>
          <input name="username" onChange={this.handleChange}></input>
          <div className="signup-text">Password:</div>
          <input name="password" onChange={this.handleChange}></input>
          <button className="signup-button" onClick={() => this.signup(this.state.username, this.state.password)}>Submit</button>

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
