import React from "react";
import { LoggedInContext } from "../contexts/LoggedInContext.js";
import { Link, useLocation, Routes, Route } from "react-router-dom";

function Header({ onSignOut, email }) {
  const loggedIn = React.useContext(LoggedInContext);

  const [isAccount, setIsAccount] = React.useState(false);
  const location = useLocation();

  function handleClick() {
    setIsAccount(isAccount ? false : true);
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route
          path="/sign-in"
          element={
            location.pathname === "/sign-in" && !loggedIn ? (
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            ) : (
              ""
            )
          }
        />
        <Route
          path="sign-up"
          element={
            location.pathname === "/sign-up" && !loggedIn ? (
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            ) : (
              ""
            )
          }
        />
        <Route
          path="/"
          element={
            loggedIn && (
              <>
                <div
                  className={
                    isAccount ? "header__account_close" : "header__burger"
                  }
                  onClick={handleClick}
                ></div>
                <div
                  className={`header__account ${
                    isAccount ? "header__account_opened" : ""
                  }`}
                >
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
            )
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
