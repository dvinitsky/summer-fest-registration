import { connect } from 'react-redux';
import Users from '../components/Users';
import { } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    users: state.app.users,
    activeUser: stat.app.activeUser
  };
}

export default connect(
  mapStateToProps,
  {
  }
)(Users);