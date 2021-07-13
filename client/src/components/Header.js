import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import useClickedOutside from "../hooks/useClickedOutside";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const { ref, isClickedOutside } = useClickedOutside(true);
  const [menu, setMenu] = useState(false);
  const [navMenu, setNavMenu] = useState(false);

  const handleMenuToggle = () => {
    setMenu(!menu);
  };
  const handleNavMenuToggle = () => {
    setNavMenu(!navMenu);
  };
  useEffect(() => {
    if (isClickedOutside) {
      setMenu(false);
    }
  }, [isClickedOutside]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    setIsAuthenticated(false);
    history.push("/");
  };

  const authButtons = isAuthenticated ? (
    <div className="buttons">
      <button className="button is-link is-hidden-mobile" onClick={logout}>
        Logout
      </button>
    </div>
  ) : (
    <div className="buttons">
      <Link className="button is-primary is-hidden-mobile" to="/signup">
        <strong>Sign up</strong>
      </Link>
      <Link className="button is-link is-hidden-mobile" to="/login">
        Log in
      </Link>
    </div>
  );
  const menuItems = isAuthenticated ? (
    <>
      <div className="navbar-item is-hidden-tablet" onClick={logout}>
        Logout
      </div>
      <Link
        className="navbar-item is-hidden-tablet"
        to="/settings"
        onClick={handleMenuToggle}
      >
        Settings
      </Link>
    </>
  ) : (
    <>
      <Link className="navbar-item is-hidden-tablet" to="/signup">
        <strong>Sign up</strong>
      </Link>
      <Link className="navbar-item is-hidden-tablet" to="/login">
        Log in
      </Link>
    </>
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
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={handleNavMenuToggle}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${navMenu ? "is-active" : ""}`}>
          <div className="navbar-end">
            <div className="navbar-item">{authButtons}</div>
            {isAuthenticated && (
              <>
                <div
                  className={`navbar-item has-dropdown is-hidden-mobile ${
                    menu ? "is-active" : ""
                  }`}
                  ref={ref}
                >
                  <a className="navbar-link" onClick={handleMenuToggle}>
                    <figure className="image  is-32x32">
                      <img
                        className="is-rounded"
                        //src="https://picsum.photos/200"
                        src="https://static-cdn.jtvnw.net/jtv_user_pictures/1834c04a-6ebf-4f4b-bb9e-e0301f775e88-profile_image-70x70.png"
                        // width="28"
                        // height="28"
                        alt="Bulma"
                        style={{ maxHeight: "none" }}
                      />
                    </figure>
                  </a>
                  <div className="navbar-dropdown">
                    <Link
                      className="navbar-item"
                      to="/settings"
                      onClick={handleMenuToggle}
                    >
                      Settings
                    </Link>
                  </div>
                </div>
              </>
            )}
            {menuItems}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
