import { connect } from 'react-redux';
import Login from '../components/Login';
import { setActiveGroup, setActiveUser } from '../actions/app.js';

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  {
    setActiveGroup,
    setActiveUser
  }
)(Login);