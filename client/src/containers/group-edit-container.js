import { connect } from 'react-redux';
import GroupEdit from '../components/GroupEdit';

function mapStateToProps(state) {
  return {
    groups: state.app.groups,
    campers: state.app.campers,
    activeGroup: state.app.activeGroup
  };
}

export default connect(
  mapStateToProps,
  {
  }
)(GroupEdit);