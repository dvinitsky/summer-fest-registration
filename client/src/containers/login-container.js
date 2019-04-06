import { connect } from 'react-redux';
import Login from '../components/Login';
import { setActiveGroup } from '../actions/app.js';

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  {
    setActiveGroup
  }
)(Login);