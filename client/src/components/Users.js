import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeAdmin } from '../services/user-service';
import { getActiveUserClearance, getActiveUserName } from '../helpers';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
    this.getGroupName = this.getGroupName.bind(this);
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

  makeAdmin(user_id) {
    makeAdmin(user_id).then(response => {
      if (response.error) {
        this.setState({
          error: true
        });
      } else {
        this.setState({
          data: {
            ...this.state.data,
            users: response.users
          }
        });
      }
    });
  }

  getGroupName (groups, user) {
    const group = groups.find(group => {
      return group.id === user.group_id
    });
    return group && group.group_name;
  }

  render() {
    let users, groups;
    if (!this.state.data.users || !this.state.data.groups) {
      return null;
    }
    else {
      users = this.state.data.users;
      groups = this.state.data.groups;
    }

    const activeUserClearance = getActiveUserClearance();
    const activeUserName = getActiveUserName();

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
      <>
        <table name="users">
          <tbody>
            <tr className="table-header-row">
              <th className="header-place">User Name</th>
              <th className="header-place">Group Name</th>
              <th className="header-place">Status</th>
              <th className="header-place"></th>
            </tr>

            {users.map(user => user.username !== activeUserName && (
              <tr key={user.id} className="table-row">
                <td className="table-name">
                  {user.username}
                </td>
                <td className="table-name">
                  {this.getGroupName(groups, user)}
                </td>
                <td className="table-name">
                  {user.status}
                </td>
                <td>
                  {user.status === 'leader' && (
                    <button className="table-name" onClick={() => this.makeAdmin(user.id)}>
                      MAKE ADMIN (cannot be undone)
                  </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.error && <div>There's been an error. Please refresh and try again.</div>}
      </>
    );
  }
}

export default Users;