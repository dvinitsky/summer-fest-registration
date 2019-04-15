import React from 'react';
import { Link } from 'react-router-dom';
import { getActiveUserClearance, getActiveUserName } from '../helpers';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
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

  logout() {
    sessionStorage.clear();
    this.setState({});
  }

  render() {
    const activeUserClearance = getActiveUserClearance();
    const activeUserName = getActiveUserName();

    return (
      <div className="header">
        <div className="container">
          <h1>Summer Festival Camp Registration</h1>
          {activeUserClearance === 'admin' && (
            <>
              <div className="logged-in-as">
                Logged in as {activeUserName}
              </div>
              <Link
                to={{
                  pathname: "/admin"
                }}
                className="header-link"
              >
                View Admin Page
              </Link>
            </>
          )}
          {activeUserClearance === 'leader' && (
            <>
              <div className="logged-in-as">
                Logged in as {activeUserName}
              </div>
              <Link
                to={{
                  pathname: "/groupEdit"
                }}
                className="header-link"
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
              className="header-link"
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