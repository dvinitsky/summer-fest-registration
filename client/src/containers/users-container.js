import { connect } from 'react-redux';
import Users from '../components/Users';
import { setData, setNextGroupId } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    users: state.app.users
  };
}

export default connect(
  mapStateToProps,
  {
    setNextGroupId,
    setData,
  }
)(Users);