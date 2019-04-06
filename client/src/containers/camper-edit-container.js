import { connect } from 'react-redux';
import CamperEdit from '../components/CamperEdit';
import { setActiveGroup } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    group: state.app.activeGroup,
    camper: state.app.activeCamper,
    activeUser: state.app.activeUser
  };
}

export default connect(
  mapStateToProps,
  {
    setActiveGroup
  }
)(CamperEdit);