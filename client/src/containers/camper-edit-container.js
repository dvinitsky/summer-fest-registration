import { connect } from 'react-redux';
import CamperEdit from '../components/CamperEdit';
import { setData, setNextGroupId } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    groups: state.app.groups,
    campers: state.app.campers
  };
}

export default connect(
  mapStateToProps,
  {
    setNextGroupId,
    setData,
  }
)(CamperEdit);