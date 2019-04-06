export function login(username, password) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password
    })
  };

  fetch('/login', options)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }

      sessionStorage.setItem('clearance', data.clearance)
      sessionStorage.setItem('group_id', data.group.id)
      sessionStorage.setItem('username', data.username)
      return {
        redirectUrl: data.redirectUrl,
        group: data.group || null,
      };
    })
    .catch(error => {
      return {
        error: error.message
      };
    });
}

export function addUser(username, password, nextGroupId) {
  if (!username || !password) {
    return { incomplete: true };
  }
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      nextGroupId
    })
  };

  fetch('/signup', options)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      } else {
        return { data };
      }
    })
    .catch(error => {
      return error;
    });
}