import { SET_DATA } from "../constants";

export const setData = (data) => {
  return {
    type: SET_DATA,
    data
  };
}