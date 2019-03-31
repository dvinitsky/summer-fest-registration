import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const groups = this.props.groups;

    return (
      <div className="jumbotron text-center">
        <div className="container">
          <h1>Registration</h1>

          <p>
            <Link
              to={{
                pathname: "/admin",
                state: { groups }
              }}
            >
              Click here to go home
            </Link>
          </p>

          <div className="camper-signup-button">
            <a href="/signup">
              Click here to register a camper!
            </a>
          </div>

          

        </div>
      </div>
    );
  }
}

export default Header;