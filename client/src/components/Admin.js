import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { setActiveGroupId, getActiveUserClearance, getHighestGroupId } from '../helpers';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = { data: {} }
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

  render() {
    let groups;
    if (!this.state.data.groups) {
      return null;
    }
    else {
      groups = this.state.data.groups;
    }
    const activeUserClearance = getActiveUserClearance();

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
                        onClick={() => setActiveGroupId(group.id)}
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