import React from 'react';
import Error from './Error';
import { Redirect } from 'react-router-dom';

class CamperEdit extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  cancelDelete = () => {
    document.getElementById('delete-camper-modal').style.display = 'none';
    document.getElementById('camper-deleted-error').style.display = 'none';
  };

  deleteCamper = (id, size, group_id) => {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, size, group_id })
    };

    fetch('/camperDelete', options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else throw new Error();
      })
      .then(data => {
        this.setState({
          deleteSuccessful: true,
          campers: data.campers
        });
      })
      .catch(error => {
        document.getElementById('camper-deleted-error').style.display = 'block';
      })
  };
  showDeleteModal = () => {
    document.getElementById('delete-camper-modal').style.display = 'block';
  };

  render() {
    const { location } = this.props;

    if (this.state.deleteSuccessful) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit',
            state: {
              group: location.state.group,
              campers : this.state.campers
            }
          }}
        />
      );
    }

    if (location && location.state && location.state.group && location.state.camper) {
      const group = location.state.group;
      const camper = location.state.camper;

      return (
        <form className="camper-edit" method="post">
          <h3>
            First Name:
          </h3>
          <input className="camper-input" defaultValue={camper.first_name} name="first_name" />
          <br />
          <h3>
            Last Name:
          </h3>
          <input className="camper-input" defaultValue={camper.last_name} name="last_name" />
          <br />
          <br />

          <button type="submit">Save</button>

          <br />
          <br />

          <button type="button" onClick={this.showDeleteModal}>Delete</button>

          <div id="delete-camper-modal">
            <h1>Are you sure you want to delete {camper.first_name} {camper.last_name}?
            </h1>
            <button type="button" onClick={this.cancelDelete}>No</button>
            <button type="button" onClick={() => { this.deleteCamper(camper.id, camper.group_id, group.size) }}>Yes</button>
          </div>
          <div id="camper-deleted">
            Camper Deleted.
          </div>
          <div id="camper-deleted-error">
            There's been an error. Please try again.
          </div>

          <input className="do-not-show" name="id" defaultValue={camper.id} />
        </form>
      );
    }
    return <Error />;
  }
}

export default CamperEdit;