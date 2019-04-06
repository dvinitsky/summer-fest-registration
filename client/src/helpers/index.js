export function getHighestGroupId(groups) {
  const ids = [];
  groups.forEach(group => {
    ids.push(group.id);
  })
  return Math.max(...ids);
}

export function setActiveGroupId(group_id) {
  sessionStorage.setItem('group_id', group_id);
}
export function getActiveGroupId() {
  sessionStorage.getItem('group_id');
}

export function setActiveUserClearance(clearance) {
  sessionStorage.getItem('clearance', clearance);
}
export function getActiveUserClearance() {
  sessionStorage.getItem('clearance');
}

export function setActiveUserName(username) {
  sessionStorage.getItem('username', username);
}
export function getActiveUserName() {
  sessionStorage.getItem('username');
}

export function setActiveCamperId(camper_id) {
  sessionStorage.setItem('camper_id', camper_id);
}
export function getActiveCamperId() {
  sessionStorage.setItem('camper_id');
}