import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <div className="jumbotron text-center">
        <div className="container">
          <h1>Registration</h1>

          <p>
            <a href='/'>Click here to go home.</a>
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