import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const groups = this.props.groups;

    return (
      <div className="jumbotron text-center">
        <div className="container">
          <h1>Registration</h1>

          <Link
            to={{
              pathname: "/admin",
              state: { groups }
            }}
          >
            Click here to go home
          </Link>

          <Link
            to={{
              pathname: "/signup"
            }}
          >
            Click here to sign up
          </Link>




        </div>
      </div>
    );
  }
}

export default Header;