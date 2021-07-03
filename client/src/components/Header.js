import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    history.push("/");
  };
  const authButtons = isAuthenticated ? (
    <div className="buttons">
      <button className="button is-link" onClick={logout}>
        Logout
      </button>
    </div>
  ) : (
    <div className="buttons">
      <Link className="button is-primary" to="/signup">
        <strong>Sign up</strong>
      </Link>
      <Link className="button is-link" to="/login">
        Log in
      </Link>
    </div>
  );
  return (
    <div>
      <nav
        className="navbar is-link"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <span className="icon">
              <i className="fas fa-code"></i>
            </span>
            <span>Live Coders</span>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start"></div>

          <div className="navbar-end">
            <div className="navbar-item">{authButtons}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
