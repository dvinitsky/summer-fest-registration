import React from 'react';
import Error from './Error';
import { Redirect } from 'react-router-dom';
import { addCamper } from '../services/camper-service';
import { getActiveGroupId, getActiveUserClearance } from '../helpers';

class CamperAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
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
    newState.camper[e.target.name] = e.target.value;
    this.setState(newState);
  }

  addCamper(...args) {
    addCamper(...args).then(response => {
      if (response.error) {
        this.setState({
          error: true
        });
      } else {
        this.setState({
          shouldRedirect: true
        });
      }
    });
  }

  render() {
    const activeGroupId = getActiveGroupId();
    const activeUserClearance = getActiveUserClearance();

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit'
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

    return (!activeGroupId) ?
      <Error />
      : (
        <>
          <div className="container">
            <h3>
              First Name:
          </h3>
            <input onChange={this.handleChange} className="camper-input" name="first_name" />
            <br />
            <h3>
              Last Name:
          </h3>
            <input onChange={this.handleChange} className="camper-input" name="last_name" />
            <br />
            <h3>
              Gender:
          </h3>
            <select onChange={this.handleChange} className="camper-input" name="gender">
              <option value="null">{null}</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <h3>
              Birthday:
          </h3>
            <input onChange={this.handleChange} className="camper-input" name="birthday" />
            <br />
            <h3>
              Grade just completed:
          </h3>
            <select onChange={this.handleChange} className="camper-input" name="grade_completed" >
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
            <input onChange={this.handleChange} className="camper-input" name="allergies" />
            <br />
            <h3>
              Parent or Guardian Email:
          </h3>
            <input type="email" onChange={this.handleChange} className="camper-input" name="parent_email" />
            <br />
            <h3>
              Emergency Contact Name:
          </h3>
            <input onChange={this.handleChange} className="camper-input" name="emergency_name" />
            <br />
            <h3>
              Emergency Contact Number:
          </h3>
            <input type="tel" onChange={this.handleChange} className="camper-input" name="emergency_number" />
            <br />
            <h3>
              Roommate:
          </h3>
            <input onChange={this.handleChange} className="camper-input" name="roommate" />
            <br />
            <h3>
              Notes:
          </h3>
            <textarea onChange={this.handleChange} className="camper-input" name="notes" />
            <br />
            <h3>
              Online or Paper Registration:
          </h3>
            <select onChange={this.handleChange} className="camper-input" name="registration">
              <option value="null">{null}</option>
              <option value="Online">Online</option>
              <option value="Paper">Paper</option>
            </select>
            <br />
            <h3>
              Waiver Signed Status:
          </h3>
            <select onChange={this.handleChange} className="camper-input" name="signed_status">
              <option value="null">{null}</option>
              <option value="Not Sent">Not Sent</option>
              <option value="Emailed">Emailed</option>
              <option value="Signed">Signed</option>
            </select>
            <br />
            {activeUserClearance === 'admin' && (
              <>
                <h3>
                  Room Assignment:
              </h3>
                <input onChange={this.handleChange} className="camper-input" name="room" />
              </>
            )}

            <button onClick={() => this.addCamper(
              activeGroupId,
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
            )} type="button">Save</button>
          </div>
          {this.state.error && (
            <div>There's been an error</div>
          )}
        </>
      );
  }
}

export default CamperAdd;