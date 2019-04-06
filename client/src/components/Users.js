import React from 'react';
import { Redirect } from 'react-router-dom';
import { toggleAdminRights } from '../services/user-service';
import { getActiveUserClearance, getActiveUserName, getHighestGroupId } from '../helpers';

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
          users: response.users
        });
      }
    });
  }

  render() {
    let users;
    if (!this.state.data.users) {
      return null;
    }
    else {
      users = this.state.data.users;
    }

    const activeUserClearance = getActiveUserClearance();
    const activeUserUserName = getActiveUserName();

    if (activeUserClearance !== 'admin') {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      );
    }

    let isSuperAdmin = false;
    if (activeUserUserName === "tonyducklow" || activeUserUserName === "daniel.vinitsky") {
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

            {users.map(user => {
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