import { connect } from 'react-redux';
import CamperAdd from '../components/CamperAdd';
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
)(CamperAdd);