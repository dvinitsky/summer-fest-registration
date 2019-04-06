export function deleteGroup(id) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id })
  };

  return fetch('/groupDelete', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else throw new Error();
    })
    .then(data => {
      return {
        shouldRedirect: true
      };
    })
    .catch(error => {
      return {
        error
      };
    })
};

export function editGroup(id, group_name, leader_name) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, group_name, leader_name })
  };

  return fetch('/groupEdit', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else throw new Error();
    })
    .then(data => {
      return {
        shouldRedirect: true
      };
    })
    .catch(error => {
      return {
        error
      };
    })
};

export function addGroup(group_name, leader_name, id) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group_name, leader_name, id })
  };

  return fetch('/groupAdd', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else throw new Error();
    })
    .then(data => data)
    .catch(error => {
      return {
        error
      };
    });
}