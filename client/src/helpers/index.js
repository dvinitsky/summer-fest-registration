export function setActiveGroupId(group_id) {
  sessionStorage.setItem('group_id', group_id);
}
export function getActiveGroupId() {
  return sessionStorage.getItem('group_id');
}

export function setActiveUserClearance(clearance) {
  sessionStorage.setItem('clearance', clearance);
}
export function getActiveUserClearance() {
  return sessionStorage.getItem('clearance');
}

export function setActiveUserName(username) {
  sessionStorage.setItem('username', username);
}
export function getActiveUserName() {
  return sessionStorage.getItem('username');
}

export function setActiveCamperId(camper_id) {
  sessionStorage.setItem('camper_id', camper_id);
}
export function getActiveCamperId() {
  return sessionStorage.getItem('camper_id');
}