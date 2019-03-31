import React from 'react';
import { Redirect } from 'react-router-dom';

class UserAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      clearance: sessionStorage.getItem('clearance')
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  add(username, password, status, group_name) {
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
        status,
        group_name
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
    const { groups } = this.props;

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/admin'
          }}
        />
      );
    }

    if (this.state.clearance !== 'admin') {
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
        <button onClick={() => this.add(this.state.username, this.state.password, this.state.status, this.setState.group_name)}>Add</button>

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

        {this.state.error && <div>{this.state.error}</div>}
        {this.state.incomplete && (
          <div>User must have both a username and password.</div>
        )}
      </div>
    );
  }
}

export default UserAdd;