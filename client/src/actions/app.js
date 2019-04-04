import { SET_DATA, SET_ACTIVE_GROUP, SET_ACTIVE_CAMPER, SET_NEXT_GROUP_ID } from "../constants";

export const setData = (groups, campers, users) => {
  return {
    type: SET_DATA,
    groups,
    campers,
    users
  };
}
export const setActiveGroup = (activeGroup) => {
  return {
    type: SET_ACTIVE_GROUP,
    activeGroup
  };
}
export const setActiveCamper = (activeCamper) => {
  return {
    type: SET_ACTIVE_CAMPER,
    activeCamper
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