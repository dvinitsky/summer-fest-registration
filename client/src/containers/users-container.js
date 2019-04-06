import { connect } from 'react-redux';
import Users from '../components/Users';
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
)(Users);