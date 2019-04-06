export function login(username, password) {
  console.log('in login service')
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

  return fetch('/login', options)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('data fetched')
      if (data.error) {
        throw new Error(data.error);
      }
      return {
        redirectUrl: data.redirectUrl,
        group: data.group,
        user: data.user,
      };
    })
    .catch(error => {
      return {
        error
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
        return { 
          user: data.user
         };
      }
    })
    .catch(error => {
      return error;
    });
}

export function toggleAdminRights(user_id) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id
    })
  };

  fetch('/toggleAdmin', options)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      return ({
        users: data.users
      });
    })
    .catch(error => {
      return {
        error
      };
    });
}