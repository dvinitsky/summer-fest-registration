import React from 'react';
import { Redirect } from 'react-router-dom';
import { userAdd } from '../services/user-service';
import { getActiveUserClearance } from '../helpers';

class UserAdd extends React.Component {
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

  userAdd(username, password, status, group_name) {
    if (!username || !password) {
      this.setState({ incomplete: true });
      return;
    }
    userAdd(username, password, status, group_name).then(response => {
      if (response.error) {
        this.setState({ error: true });
      } else {
        this.setState({
          shouldRedirect: true
        })
      }
    });
  }

  render() {
    let groups;
    if (!this.state.data.groups) {
      return null;
    }
    else {
      groups = this.state.data.groups;
    }

    const activeUserClearance = getActiveUserClearance();

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/admin'
          }}
        />
      );
    }

    if (activeUserClearance !== 'admin') {
      return (
        <Redirect
          to={{
            pathname: '/'
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
        <input type="radio" name="status" value="admin" onChange={this.handleChange}></input>
        <div>Admin</div>
        <input type="radio" name="status" value="leader" onChange={this.handleChange}></input>
        <div>Leader</div>
        <button onClick={() => this.userAdd(this.state.username, this.state.password, this.state.status, this.setState.group_name)}>Add</button>

        {this.state.status === 'leader' && (
          <>
            <div>Group:</div>
            <select name="group_name" onChange={this.handleChange}>
              {groups.map(group => {
                return <option key={group.id} value={group.group_name}>{group.group_name}</option>
              })}
            </select>
          </>
        )}

        {this.state.error && <div>There's been an error. Please refresh and try again.</div>}
        {this.state.incomplete && (
          <div>User must have both a username and password.</div>
        )}
      </div>
    );
  }
}

export default UserAdd;