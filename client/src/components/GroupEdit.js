import React, { Component } from 'react';
import Error from './Error';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { deleteGroup, editGroup } from '../services/group-service';

class GroupEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const newState = { ...this.state }
    newState.group[e.target.name] = e.target.value;
    this.setState(newState);
  }
  setShowDeleteModal(shouldShow) {
    this.setState({
      showDeleteModal: shouldShow
    })
  };
  deleteGroup(id) {
    const response = deleteGroup(id);
    if (response.error) {
      this.setState({ error: true });
    } else {
      this.setState({
        shouldRedirect: response.shouldRedirect
      });
    }
  }
  editGroup(id, group_name, leader_name) {
    const response = editGroup(id, group_name, leader_name);
    if (response.error) {
      this.setState({ error: true });
    } else {
      this.setState({
        shouldRedirect: response.shouldRedirect
      });
    }
  };

  render() {
    const { campers, activeGroup, activeUser } = this.props;

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: './admin'
          }}
        />
      );
    }

    if (!activeUser) {
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
                {activeUser.status === 'admin' && (
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
                        onClick={() => this.props.setActiveCamper(camper)}
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
                    {activeUser.status === 'admin' && (
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
              pathname: "/camperAdd"
            }}>
          </Link>

          {activeUser.status === 'admin' && (
            <button type="button" onClick={() => this.setShowDeleteModal(true)}>Delete</button>
          )}

          {this.state.showDeleteModal && (
            <div id="delete-group-modal">
              <h1>Are you sure you want to delete {activeGroup.group_name} and all its campers?
              </h1>
              <button type="button" onClick={() => this.setShowDeleteModal(false)}>No</button>
              <button type="button" onClick={() => this.deleteGroup(activeGroup.id)}>Yes</button>
            </div>
          )}

          {this.state.error && (
            <div id="error">
              There's been an error. Please try again.
            </div>
          )}
        </div>
      </>
    );
  }
}

export default GroupEdit;
