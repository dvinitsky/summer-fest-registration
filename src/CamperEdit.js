import React from 'react';
import Error from './Error';

class CamperEdit extends React.Component {
  render() {
    const { location } = this.props;

    if (location && location.state && location.state.group && location.state.camper) {
      const group = location.state.group;
      const camper = location.state.camper;

      return (
        <form class="camper-edit" method="post">
          <h3>
            First Name:
      </h3>
          <input class="camper-input" value={camper.first_name} name="first_name" />
          <br />
          <h3>
            Last Name:
      </h3>
          <input class="camper-input" value={camper.last_name} name="last_name" />
          <br />
          <br />

          <button type="submit">Save</button>

          <br />
          <br />

          <button type="button" onclick={showDeleteModal}>Delete</button>

          <div id="delete-camper-modal">
            <h1>Are you sure you want to delete {camper.first_name} {camper.last_name}?
        </h1>
            <button type="button" onclick={cancelDelete}>No</button>
            <button type="button"
              onclick={() => { deleteCamper(camper.id, camper.group_id, group.size) }}>Yes</button>
          </div>

          <input class="do-not-show" name="id" value="<%- camper.id %>" />
        </form>
      );
    }
    return <Error />;
  }
}

export default CamperEdit;

const cancelDelete = () => {
  document.getElementById('delete-camper-modal').style.display = 'none';
};
const deleteCamper = (id, size, group_id) => {
  window.location.assign(`/camperDelete?id=${id}&size=${size}&group_id=${group_id}`);
};
const showDeleteModal = () => {
  document.getElementById('delete-camper-modal').style.display = 'block';
};