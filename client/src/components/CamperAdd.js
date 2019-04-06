import React from 'react';
import Error from './Error';
import { Redirect } from 'react-router-dom';
import { addCamper } from '../services/camper-service';

class CamperAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clearance: sessionStorage.getItem('clearance'),
      camper: {
        first_name: null,
        last_name: null,
        gender: null,
        birthday: null,
        grade_completed: null,
        allergies: null,
        parent_email: null,
        emergency_name: null,
        emergency_number: null,
        roommate: null,
        notes: null,
        registration: null,
        signed_status: null,
        room: null,
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState.camper[e.target.name] = e.target.value;
    this.setState(newState);
  }

  addCamper(...args) {
    const response = addCamper(args);
    if (response.error) {
      document.getElementById('error').style.display = 'block';
    } else {
      this.setState({
        shouldRedirect: true,
        group: data.group,
        campersInGroup: data.campers
      });
    }

  }

  render() {
    const { activeGroup } = this.props;

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

    return (!activeGroup || !activeGroup.group_id) ?
      <Error />
      : (
        <>
          <div className="container">
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
            <input type="date" onChange={this.handleChange} className="camper-input" defaultValue={camper.birthday} name="birthday" />
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

            <button onClick={() => this.addCamper(
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
              this.state.camper.room,
              activeGroup.group_size
            )} type="button">Save</button>
          </div>
        </>
      );
  }
}

export default CamperAdd;