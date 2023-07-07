const BASE_URL = "https://auth.nomoreparties.co";

function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((result) => {
      try {
        if (result.status === 200) {
          return result.json();
        }
      } catch (e) {
        return e;
      }
    })
    .catch((err) => console.log(err));
}

function authorization(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
}

function getToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then((result) => result.json())
    .catch((err) => console.log(err));
}

export { register, authorization, getToken };
