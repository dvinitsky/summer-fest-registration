export function getCsvFile({ users, groups, campers }) {
  return convertArrayOfObjectsToCSV(users) +
    convertArrayOfObjectsToCSV(groups) +
    convertArrayOfObjectsToCSV(campers);
}

function convertArrayOfObjectsToCSV(data) {
  if (data && data.length > 0) {

    let keys = Object.keys(data[0]);
    keys = keys.filter(key => key !== 'password');

    let result = '';
    result += keys.join(',');
    result += '\n';

    data.forEach(function (item) {
      let counter = 0;
      keys.forEach(function (key) {
        if (counter > 0) {
          result += ',';
        }

        result += item[key];
        counter++;
      });
      result += '\n';
    });
    return result;
  }
}