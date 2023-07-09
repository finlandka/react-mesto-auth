import React from "react";
import { LoggedInContext } from "../contexts/LoggedInContext.js";
import { Link } from "react-router-dom";

function Header({ location, onSignOut, email }) {
  const loggedIn = React.useContext(LoggedInContext);

  const [isAccount, setIsAccount] = React.useState(false);

  function handleClick() {
    setIsAccount(isAccount ? false : true);
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      {location.pathname === "/sign-in" && !loggedIn ? (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      ) : location.pathname === "/sign-up" && !loggedIn ? (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      ) : (
        <>
          <div className={isAccount ? 'header__account_close' : 'header__burger'} onClick={handleClick}></div>
          <div className={`header__account ${isAccount ? 'header__account_opened' : ''}`}>
            <span className="header__email">{email}</span>
            <span
              className="header__link"
              style={{ color: "#a9a9a9" }}
              onClick={onSignOut}
            >
              Выйти
            </span>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
