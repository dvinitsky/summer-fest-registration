import React from 'react';
import { Link } from 'react-router-dom';
import { getActiveUserName } from '../helpers/index';
import './Home.css';

class Home extends React.Component {
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
    const activeUserName = getActiveUserName();

    if (activeUserName) {
      return null;
    }

    return (
      <div className="home">
        <Link
          to={{
            pathname: "/login"
          }}
          className="home-link"
        >
          Click here to log in.
          </Link>
        <Link
          to={{
            pathname: "/signup"
          }}
          className="home-link"
        >
          New user? Click here.
          </Link>
      </div>
    );
  }
}

export default Home;