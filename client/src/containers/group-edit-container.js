import { connect } from 'react-redux';
import GroupEdit from '../components/GroupEdit';
import { setData, setNextGroupId } from '../actions/app.js';

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  {
    setNextGroupId,
    setData,
  }
)(GroupEdit);