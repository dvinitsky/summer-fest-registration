import React from 'react';
import Error from './Error';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { deleteCamper, editCamper } from '../services/camper-service';

class CamperEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clearance: sessionStorage.getItem('clearance')
    };

    this.handleChange = this.handleChange.bind(this);
  }
  cancelDelete() {
    document.getElementById('delete-camper-modal').style.display = 'none';
    document.getElementById('camper-deleted-error').style.display = 'none';
  }
  showDeleteModal() {
    document.getElementById('delete-camper-modal').style.display = 'block';
  }

  deleteCamper(id, group_id, groupSize) {
    const response = deleteCamper(id, group_id, groupSize);
    if (response.error) {
      document.getElementById('error').style.display = 'block';
    } else {
      this.setState({
        shouldRedirect: response.shouldRedirect
      });
    }
  }
  editCamper(...args) {
    const response = editCamper(args);
    if (response.error) {
      document.getElementById('error').style.display = 'block';
    } else {
      this.setState({
        shouldRedirect: response.shouldRedirect
      });
      this.props.setActiveGroup(this.props.group)
    }
  }
  handleChange(e) {
    const newState = { ...this.state }
    newState.camper[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {
    const { group, camper } = this.props;

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit'
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

    return (!group || !camper) ?
      <Error />
      : (
        <>
          <Header />
          <div className="camper-edit">
            <h3>
              First Name:
          </h3>
            <input onChange={this.handleChange} className="camper-input" defaultValue={camper.first_name} name="first_name" />
            <br />
            <h3>
              Last Name:
          </h3>
            <input onChange={this.handleChange} className="camper-input" defaultValue={camper.last_name} name="last_name" />
            <br />
            <h3>
              Gender:
          </h3>
            <select onChange={this.handleChange} className="camper-input" defaultValue={camper.gender} name="gender">
              <option value="null">{null}</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <h3>
              Birthday:
          </h3>
            <input onChange={this.handleChange} className="camper-input" defaultValue={camper.birthday} name="birthday" />
            <br />
            <h3>
              Grade just completed:
          </h3>
            <select onChange={this.handleChange} className="camper-input" defaultValue={camper.grade_completed} name="grade_completed" >
              <option value="null">{null}</option>
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
            <input onChange={this.handleChange} className="camper-input" defaultValue={camper.allergies} name="allergies" />
            <br />
            <h3>
              Parent or Guardian Email:
          </h3>
            <input type="email" onChange={this.handleChange} className="camper-input" defaultValue={camper.parent_email} name="parent_email" />
            <br />
            <h3>
              Emergency Contact Name:
          </h3>
            <input onChange={this.handleChange} className="camper-input" defaultValue={camper.emergency_name} name="emergency_name" />
            <br />
            <h3>
              Emergency Contact Number:
          </h3>
            <input type="tel" onChange={this.handleChange} className="camper-input" defaultValue={camper.emergency_number} name="emergency_number" />
            <br />
            <h3>
              Roommate:
          </h3>
            <input onChange={this.handleChange} className="camper-input" defaultValue={camper.roommate} name="roommate" />
            <br />
            <h3>
              Notes:
          </h3>
            <textarea onChange={this.handleChange} className="camper-input" defaultValue={camper.notes} name="notes" />
            <br />
            <h3>
              Online or Paper Registration:
          </h3>
            <select onChange={this.handleChange} className="camper-input" defaultValue={camper.registration} name="registration">
              <option value="null">{null}</option>
              <option value="Online">Online</option>
              <option value="Paper">Paper</option>
            </select>
            <br />
            <h3>
              Waiver Signed Status:
          </h3>
            <select onChange={this.handleChange} className="camper-input" defaultValue={camper.signed_status} name="signed_status">
              <option value="null">{null}</option>
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
                <input onChange={this.handleChange} className="camper-input" defaultValue={camper.room} name="room" />
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
              <h1>Are you sure you want to delete {camper.first_name} {camper.last_name}?
            </h1>
              <button type="button" onClick={this.cancelDelete}>No</button>
              <button type="button" onClick={() => { this.deleteCamper(camper.id, camper.group_id, group.size) }}>Yes</button>
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
}

export default CamperEdit;