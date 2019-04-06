import { connect } from 'react-redux';
import GroupEdit from '../components/GroupEdit';
import { setActiveCamper } from '../actions/app';

function mapStateToProps(state) {
  return {
    groups: state.app.groups,
    campers: state.app.campers,
    activeGroup: state.app.activeGroup,
    activeUser: state.app.activeUser
  };
}

export default connect(
  mapStateToProps,
  {
    setActiveCamper
  }
)(GroupEdit);