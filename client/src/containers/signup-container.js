import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { incrementNextGroupId } from '../actions/app';

function mapStateToProps(state) {
  return {
    nextGroupId: state.app.nextGroupId
  };
}

export default connect(
  mapStateToProps,
  {
    incrementNextGroupId
  }
)(Signup);