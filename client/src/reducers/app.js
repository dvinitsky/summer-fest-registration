import initialState from './initialState';
import {SET_DATA, SET_ACTIVE_GROUP, SET_ACTIVE_CAMPER} from '../constants';

export default function app(state = initialState.app, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        groups: action.groups || [],
        campers: action.campers || [],
        users: action.users || [],
      };
    case SET_ACTIVE_GROUP:
      return {
        ...state,
        activeGroup: action.activeGroup || {}
      };
    case SET_ACTIVE_CAMPER:
      return {
        ...state,
        activeCamper: action.activeCamper || {}
      };
    default:
      return state;
  }
}