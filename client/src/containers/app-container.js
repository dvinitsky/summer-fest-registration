import { connect } from 'react-redux';
import App from '../components/App';
import {setData} from '../actions/app.js';

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  {
    setData,
  }
)(App);