import { connect } from 'react-redux';
import Header from '../components/Header';
import { setActiveGroup, logout } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    activeUserClearance: sessionStorage.get('clearance')
  };
}

export default connect(
  mapStateToProps,
  {
    setActiveGroup,
    logout
  }
)(Header);