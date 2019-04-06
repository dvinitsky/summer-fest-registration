import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { setActiveGroup, incrementNextGroupId, setActiveUser } from '../actions/app';

function mapStateToProps(state) {
  return {
    nextGroupId: state.app.nextGroupId
  };
}

export default connect(
  mapStateToProps,
  {
    incrementNextGroupId,
    setActiveGroup,
    setActiveUser
  }
)(Signup);