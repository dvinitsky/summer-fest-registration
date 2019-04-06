import { connect } from 'react-redux';
import UserAdd from '../components/UserAdd';
import { } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    groups: state.app.groups,
    activeUser: state.app.activeUser
  };
}

export default connect(
  mapStateToProps,
  {

  }
)(UserAdd);