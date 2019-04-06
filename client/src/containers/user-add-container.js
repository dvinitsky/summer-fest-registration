import { connect } from 'react-redux';
import UserAdd from '../components/UserAdd';
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
)(UserAdd);