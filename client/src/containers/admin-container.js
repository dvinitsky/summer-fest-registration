import { connect } from 'react-redux';
import Admin from '../components/Admin';

function mapStateToProps(state) {
  return {
    groups: state.app.groups
  };
}

export default connect(
  mapStateToProps,
  {
  }
)(Admin);