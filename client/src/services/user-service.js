export function login(username, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  return fetch("/login", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return {
        redirectUrl: data.redirectUrl,
        group: data.group,
        user: data.user,
      };
    })
    .catch((error) => {
      return {
        error,
      };
    });
}

export function signup(username, password) {
  if (!username || !password) {
    return { incomplete: true };
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  return fetch("/signup", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      } else {
        return {
          user: data.user,
          group: data.group,
        };
      }
    })
    .catch((error) => {
      return error;
    });
}

export function makeAdmin(user_id) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
    }),
  };

  return fetch("/makeAdmin", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return {
        users: data.users,
      };
    })
    .catch((error) => {
      return {
        error,
      };
    });
}

export function userAdd(username, password, status, group_name) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      status,
      group_name,
    }),
  };

  return fetch("/userAdd", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return {
        shouldRedirect: true,
      };
    })
    .catch((error) => {
      return {
        error,
      };
    });
}

export function userDelete(user_id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
    }),
  };

  return fetch("/userDelete", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return {
        users: data.users,
      };
    })
    .catch((error) => {
      return {
        error,
      };
    });
}
