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
    const { currentUser } = this.props;

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

          {this.state.clearance === 'admin' && (
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
          {this.state.clearance === 'leader' && (
            <>
              <div className="admin-logged-message">
                Logged in as Group Leader
              </div>
              <Link
                to={{
                  pathname: "/groupEdit"
                }}
                onClick={() => this.props.setActiveGroup(groups.find(group => group.id === currentUser.group_id))}
              >
                View my group
              </Link>
            </>
          )}
          {this.state.clearance && (
            <Link
              to={{
                pathname: "/",
                state: { logout: true }
              }}
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