import { connect } from 'react-redux';
import GroupEdit from '../GroupEdit';

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

export default connect(
  mapStateToProps,
  {
  }
)(GroupEdit);