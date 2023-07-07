import React from "react";
import { LoggedInContext } from "../contexts/LoggedInContext.js";
import { Link } from "react-router-dom";

function Header({ location, handleOut, email }) {
  const loggedIn = React.useContext(LoggedInContext);

  return (
    <header className="header">
      <div className="header__logo"></div>
      {location.pathname === "/sign-in" && !loggedIn ? (
        <Link to="/sign-up" className="header__link">
          Зарегистрироваться
        </Link>
      ) : location.pathname === "/sign-up" && !loggedIn ? (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      ) : (
        <div>
          <span className="header__email">{email}</span>
          <span
            className="header__link"
            style={{ color: "#a9a9a9" }}
            onClick={handleOut}
          >
            Выйти
          </span>
        </div>
      )}
    </header>
  );
}

export default Header;
