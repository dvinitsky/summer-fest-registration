import React from 'react';
import { Redirect } from 'react-router-dom';
import { toggleAdminRights } from '../services/user-service';
import { getActiveUserClearance, getActiveUserName } from '../helpers';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
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

  toggleAdminRights(user_id) {
    toggleAdminRights(user_id).then(response => {
      if (response.error) {
        this.setState({
          error: true
        });
      } else {
        this.setState({
          data: {
            users: response.users
          }
        });
      }
    });
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

            {users.map(user => {
              if (user.username !== activeUserName) {
                return (
                  <tr key={user.id} className="table-row">
                    <td className="table-name">
                      {user.username}
                    </td>
                    <td className="table-name">
                      {groups.find(group => {
                        return group.id === user.group_id
                      }).group_name}
                    </td>
                    <td className="table-name">
                      {user.status}
                    </td>
                    <td>
                      <button className="table-name" onClick={() => this.toggleAdminRights(user.id)}>
                        Toggle Admin Rights
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        {this.state.error && <div>There's been an error. Please refresh and try again.</div>}
      </>
    );
  }
}

export default Users;