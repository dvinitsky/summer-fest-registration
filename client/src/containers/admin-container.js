import { connect } from 'react-redux';
import Admin from '../components/Admin';
import { setActiveGroup } from '../actions/app';

function mapStateToProps(state) {
  return {
    groups: state.app.groups,
    activeUserClearance: sessionStorage.get('clearance')
  };
}

export default connect(
  mapStateToProps,
  {
    setActiveGroup,
  }
)(Admin);