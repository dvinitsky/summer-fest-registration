import { SET_DATA, SET_ACTIVE_GROUP, SET_ACTIVE_CAMPER } from "../constants";

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