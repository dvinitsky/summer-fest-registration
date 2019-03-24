import React from 'react';
import Error from './Error';
import { Redirect } from 'react-router-dom';

class CamperEdit extends React.Component {
  constructor(props) {
    super(props);

    let group = {};
    let camper = {};

    const {location} = this.props;
    if (location && location.state && location.state.group && location.state.camper) {
      group = location.state.group;
      camper = location.state.camper;
    }

    this.state = {
      group,
      camper
    };

    this.handleChange = this.handleChange.bind(this);
  }
  cancelDelete () {
    document.getElementById('delete-camper-modal').style.display = 'none';
    document.getElementById('camper-deleted-error').style.display = 'none';
  }

  deleteCamper (id, size, group_id) {
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
          shouldRedirect: true,
          campers: data.campers
        });
      })
      .catch(error => {
        document.getElementById('error').style.display = 'block';
      })
  }
  showDeleteModal () {
    document.getElementById('delete-camper-modal').style.display = 'block';
  }
  editCamper (id, first_name, last_name) {
    console.log(id, first_name, last_name)
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, first_name, last_name })
    };

    console.log(options)

    fetch('/camperEdit', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else throw new Error();
    })
    .then(data => {
      this.setState({
        shouldRedirect: true,
        campers: data.campers
      });
    })
    .catch(error => {
      document.getElementById('error').style.display = 'block';
    });
  }
  handleChange(e) {
    const newState = {...this.state}
    newState.camper[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {
    const { location } = this.props;

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit',
            state: {
              group: location.state.group,
              campers: this.state.campers
            }
          }}
        />
      );
    }

    if (this.state.group && this.state.camper) {
      return (
        <div className="camper-edit">
          <h3>
            First Name:
          </h3>
          <input onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.first_name} name="first_name" />
          <br />
          <h3>
            Last Name:
          </h3>
          <input onChange={this.handleChange}  className="camper-input" defaultValue={this.state.camper.last_name} name="last_name" />
          <br />
          <br />

          <button type="button" onClick={() => this.editCamper(this.state.camper.id, this.state.camper.first_name, this.state.camper.last_name)}>Save</button>

          <br />
          <br />

          <button type="button" onClick={this.showDeleteModal}>Delete</button>

          <div id="delete-camper-modal">
            <h1>Are you sure you want to delete {this.state.camper.first_name} {this.state.camper.last_name}?
            </h1>
            <button type="button" onClick={this.cancelDelete}>No</button>
            <button type="button" onClick={() => { this.deleteCamper(this.state.camper.id, this.state.camper.group_id, this.state.group.size) }}>Yes</button>
          </div>
          <div id="camper-deleted">
            Camper Deleted.
          </div>
          <div id="error">
            There's been an error. Please try again.
          </div>

          <input className="do-not-show" name="id" defaultValue={this.state.camper.id} />
        </div>
      );
    }
    return <Error />;
  }
}

export default CamperEdit;