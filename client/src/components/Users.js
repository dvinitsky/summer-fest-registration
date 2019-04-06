import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { toggleAdminRights } from '../services/user-service';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clearance: sessionStorage.getItem('clearance'),
      users: this.props.users || []
    };
  }

  toggleAdminRights(user_id) {
    const response = toggleAdminRights(user_id);
    if (response.error) {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        users: data.users
      });
    }
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
      <>
        <table name="users">
          <tbody>
            <tr className="table-header-row">
              {/* <th className="header-place"></th> */}
              <th className="header-place">User Name</th>
              {isSuperAdmin && <th className="header-place"></th>}
            </tr>

            {this.state.users.map(user => {
              return (
                <tr key={user.id} className="table-row">
                  {/* <td className="table-edit">
                    <Link
                      to={{
                        pathname: "/userEdit",
                        state: { user }
                      }}
                    >
                      Edit
                </Link>
                  </td> */}
                  <td className="table-name">
                    {user.username}
                  </td>
                  {isSuperAdmin && (
                    <td>
                      <button className="table-name" onClick={() => this.toggleAdminRights(user.id)}>
                        Toggle Admin Rights
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.error && <div>There's been an error. Please refresh and try again.</div>}
      </>
    );
  }
}

export default Users;