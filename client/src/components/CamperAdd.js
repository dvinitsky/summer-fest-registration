import React from "react";
import Error from "./Error";
import { Redirect } from "react-router-dom";
import { addCamper } from "../services/camper-service";
import { getActiveGroupId, getActiveUserClearance } from "../helpers";
import "./CamperForm.css";
import ImageViewer from "react-simple-image-viewer";

class CamperAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      showFileTypeError: false,
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
        signed_status: "Not Sent",
        signed_by: null,
        room: null,
        adult_leader: null,
        student_leadership_track: null,
        camp_attending: null,
        covid_image_type: null,
        covid_image: null,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    fetch("/allData")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw new Error();
      })
      .then((data) => {
        this.setState({ data });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  handleChange(e) {
    const newState = { ...this.state };
    newState.camper[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleImageUpload(e) {
    if (e.target.files[0].type !== "image/jpeg") {
      this.setState({ showFileTypeError: true });
      return;
    } else {
      this.setState({ showFileTypeError: false });
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newState = { ...this.state };
      newState.camper.covid_image = reader.result;
      this.setState(newState);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  addCamper(...args) {
    addCamper(...args).then((response) => {
      if (response.error) {
        this.setState({
          error: true,
        });
      } else {
        this.setState({
          shouldRedirect: true,
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
            pathname: "/groupEdit",
          }}
        />
      );
    }

    if (!activeUserClearance) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }

    return !activeGroupId ? (
      <Error />
    ) : (
      <>
        <div className="camper-form">
          <h3>First Name:</h3>
          <input
            onChange={this.handleChange}
            className="camper-input"
            name="first_name"
          />
          <br />
          <h3>Last Name:</h3>
          <input
            onChange={this.handleChange}
            className="camper-input"
            name="last_name"
          />
          <br />
          <h3>Gender:</h3>
          <select
            onChange={this.handleChange}
            className="camper-input"
            name="gender"
          >
            <option value="null">{null}</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <br />
          <h3>Birthday:</h3>
          <input
            onChange={this.handleChange}
            className="camper-input"
            name="birthday"
          />
          <br />
          <h3>Grade just completed:</h3>
          <select
            onChange={this.handleChange}
            className="camper-input"
            name="grade_completed"
          >
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
          <h3>Food Allergies:</h3>
          <input
            onChange={this.handleChange}
            className="camper-input"
            name="allergies"
          />
          <br />
          <h3>Parent or Guardian Email:</h3>
          <input
            type="email"
            onChange={this.handleChange}
            className="camper-input"
            name="parent_email"
          />
          <br />
          <h3>Emergency Contact Name:</h3>
          <input
            onChange={this.handleChange}
            className="camper-input"
            name="emergency_name"
          />
          <br />
          <h3>Emergency Contact Number:</h3>
          <input
            type="tel"
            onChange={this.handleChange}
            className="camper-input"
            name="emergency_number"
          />
          <br />
          <h3>Roommate:</h3>
          <input
            onChange={this.handleChange}
            className="camper-input"
            name="roommate"
          />
          <br />
          <h3>Notes:</h3>
          <textarea
            onChange={this.handleChange}
            className="camper-input"
            name="notes"
          />
          <br />
          <h3>Online or Paper Registration:</h3>
          <select
            onChange={this.handleChange}
            className="camper-input"
            name="registration"
          >
            <option value="null">{null}</option>
            <option value="Online">Online</option>
            <option value="Paper">Paper</option>
          </select>
          <br />
          <h3>Waiver Signed Status:</h3>
          <select
            onChange={this.handleChange}
            className="camper-input"
            name="signed_status"
          >
            <option value="Not Sent">Not Sent</option>
            <option value="Emailed">Emailed</option>
            <option value="Signed">Signed</option>
          </select>
          <br />
          {activeUserClearance === "admin" && (
            <>
              <h3>Room Assignment:</h3>
              <input
                onChange={this.handleChange}
                className="camper-input"
                name="room"
              />
              <br />
            </>
          )}
          <h3>Is this person an adult leader?</h3>
          <select
            onChange={this.handleChange}
            className="camper-input"
            name="adult_leader"
          >
            <option value="null">{null}</option>
            <option value="Yes">Yes</option>
          </select>
          <br />
          <h3>Student Leadership Track?</h3>
          <select
            onChange={this.handleChange}
            className="camper-input"
            name="student_leadership_track"
          >
            <option value="null">{null}</option>
            <option value="Yes">Yes</option>
          </select>
          <br />
          <h3>Camp Attending</h3>
          <select
            onChange={this.handleChange}
            className="camper-input"
            name="camp_attending"
          >
            <option value="null">{null}</option>
            <option value="Middle School Camp">Middle School Camp</option>
            <option value="High School Camp">High School Camp</option>
          </select>
          <br />
          <h3>COVID Image Type</h3>
          <select
            onChange={this.handleChange}
            className="camper-input"
            name="covid_image_type"
          >
            <option value="null">{null}</option>
            <option value="Negative Test">Negative Test</option>
            <option value="Proof of Vaccine">Proof of Vaccine</option>
          </select>
          <br />
          <h3>COVID Image</h3>
          <input
            onChange={this.handleImageUpload}
            type="file"
            id="covid_file"
            name="covid_file"
            accept="image/jpeg"
          />
          {this.state.showFileTypeError && (
            <p className="camper-input-error">
              Only JPG image files are supported
            </p>
          )}
          <img
            src={this.state.camper.covid_image}
            onClick={() => this.setState({ isViewerOpen: true })}
            width="300px"
          />
          {this.state.isViewerOpen && (
            <ImageViewer
              src={[this.state.camper.covid_image]}
              currentIndex={0}
              onClose={() => this.setState({ isViewerOpen: false })}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            />
          )}

          <button
            className="save-camper-button"
            onClick={() =>
              this.addCamper(
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
                this.state.camper.signed_by,
                this.state.camper.room,
                this.state.camper.adult_leader,
                this.state.camper.student_leadership_track,
                this.state.camper.camp_attending,
                this.state.camper.covid_image_type,
                this.state.camper.covid_image
              )
            }
            type="button"
          >
            Save
          </button>
        </div>
        {this.state.error && <div>There's been an error</div>}
      </>
    );
  }
}

export default CamperAdd;
