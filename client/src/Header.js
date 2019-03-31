import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      clearance: sessionStorage.getItem('clearance')
    };
  }
  render() {
    const groups = this.props.groups;

    return (
      <div className="jumbotron text-center">
        <div className="container">
          <h1>Registration</h1>

          <p>
            <Link
              to={{
                pathname: "/",
                state: { groups }
              }}
            >
              Click here to go home
          </Link>
          </p>

          <p>
            <Link
              to={{
                pathname: "/signup"
              }}
            >
              Click here to sign up
          </Link>
          </p>

          {this.state.clearance === 'admin' && (
          <div className="admin-logged-message">
            Logged in as Admin
          </div>
          )}
          {this.state.clearance === 'leader' && (
          <div className="admin-logged-message">
            Logged in as Group Leader
          </div>
          )}

        </div>
      </div>
    );
  }
}

export default Header;