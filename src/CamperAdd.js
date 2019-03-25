import React from 'react';
import Error from './Error';
import { Redirect } from 'react-router-dom';

class CamperAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campersInGroup: [],
      group: {},
      camper: {}
    };
    this.addCamper = this.addCamper.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newState = { ...this.state }
    newState.camper[e.target.name] = e.target.value;
    this.setState(newState);
  }

  addCamper(first_name, last_name) {
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, group_id: this.props.location.state.group_id })
    };

    fetch('/camperAdd', options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else throw new Error();
      })
      .then(data => {
        this.setState({
          shouldRedirect: true,
          group: data.group,
          campersInGroup: data.campers
        });
      })
      .catch(error => {
        document.getElementById('error').style.display = 'block';
      });
  }

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit',
            state: {
              group: this.state.group,
              campers: this.state.campersInGroup
            }
          }}
        />
      );
    }

    const { groups, location } = this.props;

    if (location && location.state && location.state.group_id) {
      const group_id = location.state.group_id;

      return (
        <div className="container">
          <h3>
            First Name:
        </h3>
          <input onChange={this.handleChange} name="first_name" />
          <h3>
            Last Name:
        </h3>
          <input onChange={this.handleChange} name="last_name" />

          {groups.map(group => {
            if (group.id === group_id) {
              return <input key={group.id} className="do-not-show" defaultValue={group.size} name="size" />;
            } return null;
          })}
          <button onClick={() => this.addCamper(this.state.camper.first_name, this.state.camper.last_name)} type="button">Save</button>
        </div>
      );
    }
    return <Error />;
  }
}

export default CamperAdd;