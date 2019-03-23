import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Admin extends React.Component {
  render() {
    const { groups } = this.props;

    return (
      <div>
        <div className="admin-logged-message">
          Logged in as Admin
        </div>

        <table name="camperId">
          <tbody>
            <tr className="table-header-row">
              <th className="header-place"></th>
              <th className="header-place">Group Name</th>
              <th className="header-place">Leader</th>
              <th className="header-name"># of Campers</th>
            </tr>

            {groups.map(group => {
              return (
                <tr key={group.id} className="table-row">
                  <td className="table-edit">
                    <Link
                      to={{
                        pathname: "/groupEdit",
                        state: { group }
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="table-name">
                    {group.group_name}
                  </td>
                  <td className="table-score">
                    {group.leader_name}
                  </td>
                  <td className="table-score">
                    {group.size}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h4 className="add-delete-link">
          <Link
            to={"/groupAdd"}
          >
            Add a Group
          </Link>
        </h4>
      </div>
    );
  }
};

export default Admin;