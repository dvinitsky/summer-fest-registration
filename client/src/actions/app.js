import { SET_DATA, SET_NEXT_GROUP_ID, INCREMENT_NEXT_GROUP_ID } from "../constants";

export const setData = (groups, campers, users) => {
  return {
    type: SET_DATA,
    groups,
    campers,
    users
  };
}
export const incrementNextGroupId = () => {
  return {
    type: INCREMENT_NEXT_GROUP_ID,
  }
}
export const setNextGroupId = (nextGroupId) => {
  return {
    type: SET_NEXT_GROUP_ID,
    nextGroupId
  }
}