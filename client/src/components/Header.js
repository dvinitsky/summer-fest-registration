import React from 'react';
import { Link } from 'react-router-dom';
import { getActiveUserClearance } from '../helpers';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  logout() {
    sessionStorage.clear();
  }

  render() {
    const activeUserClearance = getActiveUserClearance();

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

          {activeUserClearance === 'admin' && (
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
          {activeUserClearance === 'leader' && (
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
          {activeUserClearance && (
            <Link
              to={{
                pathname: "/",
              }}
              onClick={this.logout}
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