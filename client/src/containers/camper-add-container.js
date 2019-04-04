import { connect } from 'react-redux';
import CamperAdd from '../components/CamperAdd';
import {  } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    activeGroup: state.app.activeGroup
  };
}

export default connect(
  mapStateToProps,
  {
    
  }
)(CamperAdd);