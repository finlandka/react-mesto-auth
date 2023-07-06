import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorization } from "../utils/Auth.js";

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { password, email } = formValue;

    if (!email || !password) {
      return;
    }

    authorization(password, email)
      .then((data) => {
        if (data.token) {
          setFormValue({ password: "", email: "" });
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="form">
      <h2 className="form__title">Вход</h2>
      <form className="login" onSubmit={handleSubmit}>
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          className="form__input"
          type="password"
          placeholder="Пароль"
          name="password"
          onChange={handleChange}
          required
        />
        <button className="form__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
