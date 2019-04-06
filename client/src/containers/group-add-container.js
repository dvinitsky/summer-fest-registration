import { connect } from 'react-redux';
import GroupAdd from '../components/GroupAdd';
import { incrementNextGroupId, setActiveGroup } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    nextGroupId: state.app.nextGroupId,
    activeUser : state.app.activeUser
  };
}

export default connect(
  mapStateToProps,
  {
    incrementNextGroupId,
    setActiveGroup
  }
)(GroupAdd);