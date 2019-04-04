import React, { Component } from 'react';
import Error from './Error';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { deleteGroup, editGroup } from '../services/group-service';
import { setActiveCamper } from '../actions/app';

class GroupEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  showDeleteModal() {
    document.getElementById('delete-group-modal').style.display = 'block';
  };
  deleteGroup(id) {
    const response = deleteGroup(id);
    if (response.error) {
      document.getElementById('error').style.display = 'block';
    } else {
      this.setState({
        shouldRedirect: response.shouldRedirect
      });
    }
  }
  editGroup(id, group_name, leader_name) {
    const response = editGroup(id, group_name, leader_name);
    if (response.error) {
      document.getElementById('error').style.display = 'block';
    } else {
      this.setState({
        shouldRedirect: response.shouldRedirect
      });
    }
  };

  render() {
    const { campers, activeGroup } = this.props;

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: './admin'
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

    if (!activeGroup) {
      return <Error />
    }
    const campersInThisGroup = campers.filter(camper => camper.group_id === activeGroup.id);
    return (
      <>
        <div className="group-edit">
          <h3>
            Group Name:
        </h3>
          <input onChange={this.handleChange} defaultValue={activeGroup.group_name} name="group_name" />
          <br />
          Leader Name:
        <input onChange={this.handleChange} defaultValue={activeGroup.leader_name} name="leader_name" />
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
                {this.state.clearance === 'admin' && (
                  <th className="header-name">Room Assignment</th>
                )}
              </tr>

              {campersInThisGroup.map(camper => {
                return (
                  <tr key={camper.id} className="table-row">
                    <td className="table-edit">
                      <Link
                        to={{
                          pathname: "/camperEdit"
                        }}
                        onClick={() => setActiveCamper(camper)}
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
                    {this.state.clearance === 'admin' && (
                      <td>
                        {camper.room}
                      </td>
                    )}
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
              state: { group_id: group.id, group_size: group.size }
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
}

export default GroupEdit;
