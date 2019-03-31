import React from 'react';
import { Link } from 'react-router-dom';

class Users extends React.Component {
  render() {
    const users = this.props.users || [];

    return (
      <table name="users">
        <tbody>
          <tr className="table-header-row">
            <th className="header-place"></th>
            <th className="header-place">User Name</th>
          </tr>

          {users.map(user => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Users;