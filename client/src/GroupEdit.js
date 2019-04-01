import React, { Component } from 'react';
import Error from './Error';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Header from './Header';

class GroupEdit extends Component {
  constructor(props) {
    super(props);

    let group = {};
    const { location } = this.props;
    if (location && location.state && location.state.group) {
      group = location.state.group;
    }

    if (location && location.state && location.state.group_id) {
      group = this.props.groups.find(group => {
        return String(group.id) === location.state.group_id;
      })
    }

    this.state = {
      group,
      clearance: sessionStorage.getItem('clearance')
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const newState = { ...this.state }
    newState.group[e.target.name] = e.target.value;
    this.setState(newState);
  }
  cancelDelete() {
    document.getElementById('delete-group-modal').style.display = 'none';
  };
  deleteGroup(id) {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id })
    };

    fetch('/groupDelete', options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else throw new Error();
      })
      .then(data => {
        this.setState({
          redirectUrl: '/admin',
          groups: data.groups
        });
      })
      .catch(error => {
        document.getElementById('error').style.display = 'block';
      })
  };
  showDeleteModal() {
    document.getElementById('delete-group-modal').style.display = 'block';
  };
  editGroup(id, group_name, leader_name) {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, group_name, leader_name })
    };

    fetch('/groupEdit', options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else throw new Error();
      })
      .then(data => {
        this.setState({
          redirectUrl: '/admin',
          groups: data.groups
        });
      })
      .catch(error => {
        document.getElementById('error').style.display = 'block';
      })
  };

  render() {
    if (this.state.redirectUrl) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirectUrl,
            state: {
              groups: this.state.groups,
              group: this.state.group
            }
          }}
        />
      );
    }

    if (this.state.clearance !== 'admin' && this.state.clearance !== 'leader') {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      );
    }

    const { campers, location } = this.props;

    if (this.state.group) {
      const group = this.state.group;

      const campersArray = location.state.campers || campers;

      let campersInThisGroup = [];
      if (campersArray) {
        campersInThisGroup = campersArray.filter(camper => camper.group_id === group.id);
      }
      return (
        <>
          <Header />
          <div className="group-edit">
            <h3>
              Group Name:
        </h3>
            <input onChange={this.handleChange} defaultValue={group.group_name} name="group_name" />
            <br />
            Leader Name:
        <input onChange={this.handleChange} defaultValue={group.leader_name} name="leader_name" />
            <br />
            Campers:

        <table name="camperId">
              <tbody>
                <tr className="table-header-row">
                  <th className="header-place"></th>
                  <th className="header-place">First Name</th>
                  <th className="header-name">Last Name</th>
                  <th className="header-name">Gender</th>
                  <th className="header-name">Birthday</th>
                  <th className="header-name">Grade just completed</th>
                  <th className="header-name">Food Alergies</th>
                  <th className="header-name">Parent or Guardian Email</th>
                  <th className="header-name">Emergency Contact Name</th>
                  <th className="header-name">Emergency Contact Number</th>
                  <th className="header-name">Roommate</th>
                  <th className="header-name">Notes</th>
                  <th className="header-name">Online or Paper Registration</th>
                  <th className="header-name">Waiver Signed Status</th>
                </tr>

                {campersInThisGroup.map(camper => {
                  return (
                    <tr key={camper.id} className="table-row">
                      <td className="table-edit">
                        <Link
                          to={{
                            pathname: "/camperEdit",
                            state: { group, camper }
                          }}
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        {camper.first_name}
                      </td>
                      <td>
                        {camper.last_name}
                      </td>
                      <td>
                        {camper.gender}
                      </td>
                      <td>
                        {camper.birthday}
                      </td>
                      <td>
                        {camper.grade_completed}
                      </td>
                      <td>
                        {camper.allergies}
                      </td>
                      <td>
                        {camper.parent_email}
                      </td>
                      <td>
                        {camper.emergency_name}
                      </td>
                      <td>
                        {camper.emergency_number}
                      </td>
                      <td>
                        {camper.roommate}
                      </td>
                      <td>
                        {camper.notes}
                      </td>
                      <td>
                        {camper.registration}
                      </td>
                      <td>
                        {camper.signed_status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button onClick={() => this.editGroup(
              this.state.group.id,
              this.state.group.group_name,
              this.state.group.leader_name
            )} type="submit">Save</button>

            <Link
              to={{
                pathname: "/camperAdd",
                state: { group_id: group.id }
              }}
            >
              Add a Camper
          </Link>

            {this.state.clearance === 'admin' && (
              <button type="button" onClick={this.showDeleteModal}>Delete</button>
            )}

            <div id="delete-group-modal">
              <h1>Are you sure you want to delete {group.group_name} and all its campers?
              </h1>
              <button type="button" onClick={this.cancelDelete}>No</button>
              <button type="button" onClick={() => this.deleteGroup(group.id)}>Yes</button>
            </div>

            <div id="error">
              There's been an error. Please try again.
          </div>
          </div>
        </>
      );
    }
    return <Error />
  }
}

export default GroupEdit;
