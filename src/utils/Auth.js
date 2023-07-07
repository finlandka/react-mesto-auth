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
      return result.json();
    })
    .catch((err) => {
      return err;
    });
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
    .catch((err) => {
      console.log(err);
      return err;
    });
}

function getToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => result.json())
    .catch((err) => console.log(err));
}

export { register, authorization, getToken };
