import { connect } from 'react-redux';
import GroupAdd from '../components/GroupAdd';
import { setData, setNextGroupId, incrementNextGroupId } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    nextGroupId: state.app.nextGroupId,
  };
}

export default connect(
  mapStateToProps,
  {
    incrementNextGroupId,
    setNextGroupId,
  }
)(GroupAdd);