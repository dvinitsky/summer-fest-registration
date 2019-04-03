import initialState from './initialState';
import {SET_DATA} from '../constants';

export default function app(state = initialState.app, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}