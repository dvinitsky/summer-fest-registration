import { connect } from 'react-redux';
import Admin from '../components/Admin';
import { setActiveGroup } from '../actions/app';

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

export default connect(
  mapStateToProps,
  {
    setActiveGroup,
  }
)(Admin);