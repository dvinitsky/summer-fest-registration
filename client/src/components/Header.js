import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { activeUser } = this.props;

    return (
      <div className="jumbotron text-center">
        <div className="container">
          <h1>Registration</h1>

          <p>
            <Link
              to={{
                pathname: "/",
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

          {activeUser.status === 'admin' && (
            <>
              <div className="admin-logged-message">
                Logged in as Admin
            </div>
              <Link
                to={{
                  pathname: "/admin"
                }}
              >
                View Admin Page
              </Link>
            </>
          )}
          {activeUser.status === 'leader' && (
            <>
              <div className="admin-logged-message">
                Logged in as Group Leader
              </div>
              <Link
                to={{
                  pathname: "/groupEdit"
                }}
              >
                View my group
              </Link>
            </>
          )}
          {activeUser && (
            <Link
              to={{
                pathname: "/",
              }}
              onClick={this.props.logout}
            >
              Log Out
            </Link>
          )}

        </div>
      </div>
    );
  }
}

export default Header;