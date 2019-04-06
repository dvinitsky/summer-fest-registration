import { connect } from 'react-redux';
import Login from '../components/Login';
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
)(Login);