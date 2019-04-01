import React from 'react';
import Error from './Error';
import { Redirect } from 'react-router-dom';
import Header from './Header';

class CamperEdit extends React.Component {
  constructor(props) {
    super(props);

    let group = {};
    let camper = {};

    const { location } = this.props;
    if (location && location.state && location.state.group && location.state.camper) {
      group = location.state.group;
      camper = location.state.camper;
    }

    this.state = {
      group,
      camper,
      clearance: sessionStorage.getItem('clearance')
    };

    this.handleChange = this.handleChange.bind(this);
  }
  cancelDelete() {
    document.getElementById('delete-camper-modal').style.display = 'none';
    document.getElementById('camper-deleted-error').style.display = 'none';
  }

  deleteCamper(id, size, group_id) {
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
  showDeleteModal() {
    document.getElementById('delete-camper-modal').style.display = 'block';
  }
  editCamper(
    id,
    first_name,
    last_name,
    gender,
    birthday,
    grade_completed,
    allergies,
    parent_email,
    emergency_name,
    emergency_number,
    roommate,
    notes,
    registration,
    signed_status,
    room
  ) {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        first_name,
        last_name,
        gender,
        birthday,
        grade_completed,
        allergies,
        parent_email,
        emergency_name,
        emergency_number,
        roommate,
        notes,
        registration,
        signed_status,
        room
      })
    };

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
    const newState = { ...this.state }
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

    if (this.state.clearance !== 'admin' && this.state.clearance !== 'leader') {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      );
    }

    if (this.state.group && this.state.camper) {
      return (
        <>
        <Header />
        <div className="camper-edit">
          <h3>
            First Name:
          </h3>
          <input onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.first_name} name="first_name" />
          <br />
          <h3>
            Last Name:
          </h3>
          <input onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.last_name} name="last_name" />
          <br />
          <h3>
            Gender:
          </h3>
          <select onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.gender} name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <br />
          <h3>
            Birthday:
          </h3>
          <input type="date" onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.birthday} name="birthday" />
          <br />
          <h3>
            Grade just completed:
          </h3>
          <select onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.grade_completed} name="grade_completed" >
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <br />
          <h3>
            Food Allergies:
          </h3>
          <input onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.allergies} name="allergies" />
          <br />
          <h3>
            Parent or Guardian Email:
          </h3>
          <input type="email" onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.parent_email} name="parent_email" />
          <br />
          <h3>
            Emergency Contact Name:
          </h3>
          <input onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.emergency_name} name="emergency_name" />
          <br />
          <h3>
            Emergency Contact Number:
          </h3>
          <input type="tel" onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.emergency_number} name="emergency_number" />
          <br />
          <h3>
            Roommate:
          </h3>
          <input onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.roommate} name="roommate" />
          <br />
          <h3>
            Notes:
          </h3>
          <textarea onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.notes} name="notes" />
          <br />
          <h3>
            Online or Paper Registration:
          </h3>
          <select onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.registration} name="registration">
            <option value="Online">Online</option>
            <option value="Paper">Paper</option>
          </select>
          <br />
          <h3>
            Waiver Signed Status:
          </h3>
          <select onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.signed_status} name="signed_status">
            <option value="Not Sent">Not Sent</option>
            <option value="Emailed">Emailed</option>
            <option value="Signed">Signed</option>
          </select>
          <br />
          {this.state.clearance === 'admin' && (
            <>
              <h3>
                Room Assignment:
              </h3>
              <input onChange={this.handleChange} className="camper-input" defaultValue={this.state.camper.room} name="room" />
            </>
          )}
          <br />
          <br />

          <button type="button" onClick={() => this.editCamper(
            this.state.camper.id,
            this.state.camper.first_name,
            this.state.camper.last_name,
            this.state.camper.gender,
            this.state.camper.birthday,
            this.state.camper.grade_completed,
            this.state.camper.allergies,
            this.state.camper.parent_email,
            this.state.camper.emergency_name,
            this.state.camper.emergency_number,
            this.state.camper.roommate,
            this.state.camper.notes,
            this.state.camper.registration,
            this.state.camper.signed_status,
            this.state.camper.room
          )}>Save</button>

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
        </div>
        </>
      );
    }
    return <Error />;
  }
}

export default CamperEdit;