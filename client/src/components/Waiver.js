import React from 'react';
import queryString from 'query-string';
import { submitWaiver } from '../services/camper-service';

class Waiver extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    const waiverId = queryString.parse(this.props.location.search).id;
    console.log(waiverId)
    this.setState({ waiverId });
  }

  submit() {
    submitWaiver(this.state.waiverId)
      .then(response => {
        if (response.ok) {
          this.setState({ success: true });
        }
      }).catch(error => {
        this.setState({ error });
      });
  }

  render() {
    if (this.state.error) {
      return <div>Sorry, there's been an error. Please refresh and try again.</div>;
    }
    if (this.state.success) {
      return <div>Thank you!</div>;
    }
    return (
      <div>
        <h2>Summer Festival Camp Waiver </h2>
        <h3>** IN CASE OF EMERGENCY **</h3>
        <p>
          I understand that every effort will be made to contact emergency contact.If they cannot be reached, I hereby give Summer Festival Camp the permission to act in my behalf in seeking emergency treatment for me in the event that such treatment is deemed necessary by Summer Festival Camp.I give my permission to those administering emergency treatment to do so, using those measures deemed necessary.I absolve Summer Festival Camp from liability in acting on my behalf in this regard so long as Summer Festival Camp is not grossly negligent.
        </p>
        <h3>** PROMOTIONAL MATERIAL RELEASE ** </h3>
        <p>
          I give Summer Festival Camp permission to use photography and video taken at the Summer Festival to be used in promotional material.
        </p>
        <h3>** RELEASE OF LIABILITY **</h3>
        <p>
          On behalf of the above registered camper, their family, heirs, assigns, representatives and estate, I expressly acknowledge that my voluntary participation in the Summer Festival Camp involves known and unanticipated risks which could result in injury, disability, death, and / or property damage, and I agree to assume all of the risks of this activity.In consideration of participating in Summer Festival camp, I hereby voluntarily release, indemnify and hold harmless the Summer Festival Camp volunteers, its sponsor Summer Festival Camp and its staff, directors, volunteers, participants or agents(“Releasees”) from any and all claims, losses, or causes of action connected with this activity.This release does not apply to claims arising from intentional conduct.I agree to indemnify and hold Releasees harmless for all costs to enforce this agreement.I represent that I have adequate insurance to cover any injury or loss I may suffer or cause while participating in this activity, or agree to bear such costs myself.By signing this Release, I acknowledge that I may be found by a court of law to have waived my right to maintain a lawsuit against Releasees for any claim for negligence.I have read and understood this document, had the opportunity to consult with legal counsel, and agree to be bound by its terms.
        </p>
        <h3>
          Parent / Guardian Signature <input/>
        </h3>
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default Waiver;