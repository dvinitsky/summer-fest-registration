import { connect } from 'react-redux';
import Admin from '../components/Admin';
import { setData, setNextGroupId } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    groups: state.app.groups
  };
}

export default connect(
  mapStateToProps,
  {
    setNextGroupId,
    setData,
  }
)(Admin);