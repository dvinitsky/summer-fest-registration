import { connect } from 'react-redux';
import CamperAdd from '../components/CamperAdd';
import {  } from '../actions/app.js';

function mapStateToProps(state) {
  return {
    activeGroup: state.app.activeGroup,
    activeUser: state.app.activeUser
  };
}

export default connect(
  mapStateToProps,
  {
    
  }
)(CamperAdd);