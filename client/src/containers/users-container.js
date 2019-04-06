import { connect } from 'react-redux';
import Users from '../components/Users';
import { } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    users: state.app.users,
    activeUserClearance: sessionStorage.get('clearance'),
    activeUserUserName: sessionStorage.get('username')
  };
}

export default connect(
  mapStateToProps,
  {
  }
)(Users);