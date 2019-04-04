import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clearance: sessionStorage.getItem('clearance'),
      users: this.props.users || []
    };
  }

  toggleAdminRights(user_id) {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id
      })
    };

    fetch('/toggleAdmin', options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        this.setState({
          users: data.users
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  render() {
    if (this.state.clearance !== 'admin') {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      );
    }

    let isSuperAdmin = false;
    if (sessionStorage.getItem('username') === "tonyducklow" || sessionStorage.getItem('username') === "daniel.vinitsky") {
      isSuperAdmin = true;
    }

    return (
      <table name="users">
        <tbody>
          <tr className="table-header-row">
            <th className="header-place"></th>
            <th className="header-place">User Name</th>
            {isSuperAdmin && <th className="header-place">a</th>}
          </tr>

          {this.state.users.map(user => {
            return (
              <tr key={user.id} className="table-row">
                <td className="table-edit">
                  <Link
                    to={{
                      pathname: "/userEdit",
                      state: { user }
                    }}
                  >
                    Edit
                </Link>
                </td>
                <td className="table-name">
                  {user.username}
                </td>
                <button className="table-name" onClick={() => this.toggleAdminRights(user.id)}>
                  Toggle Admin Rights
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Users;