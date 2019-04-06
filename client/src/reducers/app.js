import initialState from './initialState';
import {SET_DATA, INCREMENT_NEXT_GROUP_ID, SET_NEXT_GROUP_ID} from '../constants';

export default function app(state = initialState.app, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        groups: action.groups || [],
        campers: action.campers || [],
        users: action.users || [],
      };
    case INCREMENT_NEXT_GROUP_ID:
      return {
        ...state,
        nextGroupId: state.nextGroupId + 1
      };
    case SET_NEXT_GROUP_ID:
      return {
        ...state,
        nextGroupId: action.nextGroupId || 0
      };
    default:
      return state;
  }
}