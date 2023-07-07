import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className="form">
      <h2 className="form__title">Регистрация</h2>
      <form className="register" onSubmit={handleSubmit}>
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          className="form__input"
          type="password"
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <button className="form__button" type="submit">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="form__link" title="Войти">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
