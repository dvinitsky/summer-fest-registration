import { connect } from 'react-redux';
import UserAdd from '../components/UserAdd';

function mapStateToProps(state) {
  return {
    groups: state.app.groups
  };
}

export default connect(
  mapStateToProps,
  {
  }
)(UserAdd);