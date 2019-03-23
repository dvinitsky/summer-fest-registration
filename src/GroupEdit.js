import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class GroupEdit extends Component {
  render() {
    const {campers, group } = this.props;
    const campersInThisGroup = campers.filter(camper => camper.group_id === group.id);

    return (
      <form class="group-edit" method="post">
        <h3>
          Group Name:
        </h3>
        <input value={group.group_name} name="group_name" />
        <br /> 
        Leader Name:
        <input value={group.leader_name} name="leader_name" />
        <br />
        Campers:
    
        <table name="camperId">
          <tr class="table-header-row">
            <th class="header-place"></th>
            <th class="header-place">First Name</th>
            <th class="header-name">Last Name</th>
          </tr>

          {campersInThisGroup.map(camper => {
            return (
              <tr key={camper.id} class="table-row">
                <td class="table-edit">
                  <a href='/camperEdit?id=<%- camper.id %>'>Edit</a>
                </td>
                <td class="table-name">
                  {camper.first_name}
                </td>
                <td class="table-score">
                  {camper.last_name}
                 </td>
              </tr>
            );
          })}
        </table>

        <input class="do-not-show" value="<%- group.id %>" name="id" />

        <button type="submit">Save</button>

        <a id="edit" href="/camperAdd?group_id=<%- group.id %>">Add a Camper</a>

        <button type="button" onclick="showDeleteModal()">Delete</button>

        <div id="delete-group-modal">
          <h1>Are you sure you want to delete {group.group_name} and all its campers?
          </h1>
          <button type="button" onclick="cancelDelete()">No</button>
          <button type="button" onclick="deleteGroup(group.id)">Yes</button>
        </div>
      </form>
    );
  }
}

export default GroupEdit;
