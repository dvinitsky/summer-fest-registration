import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    const { setActiveGroup, groups, activeUser } = this.props;

    if (!activeUser || activeUser.status !== 'admin') {
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
        <div>
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
                        }}
                        onClick={() => setActiveGroup(group)}
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

          <h4 className="add-delete-link">
            <Link
              to={"/userAdd"}
            >
              Add a User
          </Link>
          </h4>

          <h4 className="add-delete-link">
            <Link
              to={"/users"}
            >
              View All Users
          </Link>
          </h4>
        </div>
      </>
    );
  }
};

export default Admin;