import { connect } from 'react-redux';
import CamperEdit from '../components/CamperEdit';

function mapStateToProps(state) {
  return {
    groups: state.app.groups,
    campers: state.app.campers
  };
}

export default connect(
  mapStateToProps,
  {
  }
)(CamperEdit);