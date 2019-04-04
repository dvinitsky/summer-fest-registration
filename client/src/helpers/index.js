export function getHighestGroupId(groups) {
  const ids = [];
  groups.forEach(group => {
    ids.push(group.id);
  })
  return Math.max(...ids);
}
