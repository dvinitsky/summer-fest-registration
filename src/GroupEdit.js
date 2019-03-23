import React, { Component } from 'react';
import Error from './Error';

class GroupEdit extends Component {
  render() {
    const { campers, location } = this.props;

    if (location && location.state && location.state.group) {
      const group = location.state.group

      const campersInThisGroup = campers.filter(camper => camper.group_id === group.id);

      return (
        <form className="group-edit" method="post">
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
                      <a href={`/camperEdit?id=${camper.id}`}>Edit</a>
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

          <input className="do-not-show" value={group.id} name="id" />

          <button type="submit">Save</button>

          <a id="edit" href={`/camperAdd?group_id=${group.id}`}>Add a Camper</a>

          <button type="button" onClick={showDeleteModal}>Delete</button>

          <div id="delete-group-modal">
            <h1>Are you sure you want to delete {group.group_name} and all its campers?
          </h1>
            <button type="button" onClick={cancelDelete}>No</button>
            <button type="button" onClick={() => deleteGroup(group.id)}>Yes</button>
          </div>
        </form>
      );
    }
    return <Error />
  }
}

export default GroupEdit;

const cancelDelete = () => {

};
const deleteGroup = () => {

};
const showDeleteModal = () => {

};
