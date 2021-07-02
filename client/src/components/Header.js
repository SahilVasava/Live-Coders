import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to="/signup">
                  <strong>Sign up</strong>
                </Link>
                <Link className="button is-link" to="/login">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
