import React, { Component } from 'react';
import Error from './Error';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { deleteGroup, editGroup } from '../services/group-service';
import { getActiveGroupId, getActiveUserClearance, setActiveCamperId, getHighestGroupId } from '../helpers';

class GroupEdit extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
    this.handleChange = this.handleChange.bind(this);
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
    deleteGroup(id).then(response => {
      if (response.error) {
        this.setState({ error: true });
      } else {
        this.setState({
          shouldRedirect: response.shouldRedirect
        });
      }
    });
  }
  editGroup(id, group_name, leader_name) {
    editGroup(id, group_name, leader_name).then(response => {
      if (response.error) {
        this.setState({ error: true });
      } else {
        this.setState({
          shouldRedirect: response.shouldRedirect
        });
      }
    });
  };

  render() {
    let groups, campers;
    if (!this.state.data.groups || !this.state.data.campers) {
      return null;
    }
    else {
      groups = this.state.data.groups;
      campers = this.state.data.campers;
    }

    const activeGroupId = getActiveGroupId();
    const activeUserClearance = getActiveUserClearance();

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: './admin'
          }}
        />
      );
    }

    if (!activeUserClearance) {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      );
    }

    if (!activeGroupId) {
      return <Error />
    }
    const campersInThisGroup = campers.filter(camper => String(camper.group_id) === activeGroupId);
    const activeGroup = groups.find(group => String(group.id) === activeGroupId);
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
                {activeUserClearance === 'admin' && (
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
                        onClick={() => setActiveCamperId(camper.id)}
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
                    {activeUserClearance === 'admin' && (
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
            Add a Camper
          </Link>

          {activeUserClearance === 'admin' && (
            <button type="button" onClick={() => this.setShowDeleteModal(true)}>Delete</button>
          )}

          {this.state.showDeleteModal && (
            <div id="delete-group-modal">
              <h1>Are you sure you want to delete {activeGroup.group_name} and all its campers?
              </h1>
              <button type="button" onClick={() => this.setShowDeleteModal(false)}>No</button>
              <button type="button" onClick={() => this.deleteGroup(activeGroupId)}>Yes</button>
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
