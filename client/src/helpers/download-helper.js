export function getCsvFile({ users, groups, campers, isAdmin }) {
  return convertArrayOfObjectsToCSV(users, isAdmin) +
    convertArrayOfObjectsToCSV(groups, isAdmin) +
    convertArrayOfObjectsToCSV(campers, isAdmin);
}

function convertArrayOfObjectsToCSV(data, isAdmin) {
  if (data && data.length > 0) {

    let keys = Object.keys(data[0]);
    keys = keys.filter(key => key !== 'password');
    
    if(!isAdmin) {
      keys = keys.filter(key => key !== 'room');
    }

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