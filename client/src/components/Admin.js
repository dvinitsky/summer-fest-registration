import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { setActiveGroupId, getActiveUserClearance } from '../helpers';
import { getCsvFile } from '../helpers/download-helper';
import './Admin.css';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = { data: {} }
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
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

  handleDownloadClick() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(getCsvFile({...this.state.data, isAdmin:true})));
    element.setAttribute('download', 'registration-data.csv');
    element.style.display = 'none';
    if (typeof element.download != "undefined") {
      //browser has support - process the download
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
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
        <div className="admin">
          <table name="camperId">
            <tbody>
              <tr className="table-header-row">
                <th className="header-place"></th>
                <th className="header-place">Group Name</th>
                <th className="header-place">Leader</th>
              </tr>

              {groups.map(group => {
                if (group.id !== 1) {
                  return (
                    <tr key={group.id} className="table-row">
                      <td className="table-edit">
                        <Link
                          to={{
                            pathname: "/groupEdit",
                          }}
                          onClick={() => {
                            setActiveGroupId(group.id)
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
                    </tr>
                  );
                }
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

          <h4 className="add-delete-link">
            <button onClick={this.handleDownloadClick}>Download All Data</button>
          </h4>
        </div>
      </>
    );
  }
};

export default Admin;