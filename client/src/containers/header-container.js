import { connect } from 'react-redux';
import Header from '../components/Header';
import { setActiveGroup } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    currentUser: state.app.currentUser,
    groups: state.app.groups,
  };
}

export default connect(
  mapStateToProps,
  {
    setActiveGroup
  }
)(Header);