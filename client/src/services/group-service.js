export function deleteGroup(id) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id })
  };

  fetch('/groupDelete', options)
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

  fetch('/groupEdit', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else throw new Error();
    })
    .then(data => {
      return {
        redirectUrl: '/admin'
      };
    })
    .catch(error => {
      return {
        error
      };
    })
};