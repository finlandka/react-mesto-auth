import React from "react";

function Login({ onLogin }) {
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
    onLogin(password, email);
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
