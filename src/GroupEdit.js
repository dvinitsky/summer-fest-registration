import React, { Component } from 'react';
import Error from './Error';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class GroupEdit extends Component {
  constructor(props) {
    super(props);

    let group = {};
    const { location } = this.props;
    if (location && location.state && location.state.group) {
      group = location.state.group;
    }

    this.state = {
      group
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
          redirectUrl: '/groupEdit',
          group: data.group
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

    console.log(id, group_name, leader_name)

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

    const { campers, location } = this.props;

    if (location && location.state && location.state.group) {
      const group = location.state.group

      const campersArray = location.state.campers || campers;

      let campersInThisGroup = [];
      if (campersArray) {
        campersInThisGroup = campersArray.filter(camper => camper.group_id === group.id);
      }
      return (
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
                    <td className="table-name">
                      {camper.first_name}
                    </td>
                    <td className="table-score">
                      {camper.last_name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button onClick={() => this.editGroup(this.state.group.id, this.state.group.group_name, this.state.group.leader_name)} type="submit">Save</button>

          <Link
            to={{
              pathname: "/camperAdd",
              state: { group_id: group.id }
            }}
          >
            Add a Camper
          </Link>

          <button type="button" onClick={this.showDeleteModal}>Delete</button>

          <div id="delete-group-modal">
            <h1>Are you sure you want to delete {group.group_name} and all its campers?
          </h1>
            <button type="button" onClick={this.cancelDelete}>No</button>
            <button type="button" onClick={() => this.deleteGroup(group.id)}>Yes</button>
          </div>
        </div>
      );
    }
    return <Error />
  }
}

export default GroupEdit;
