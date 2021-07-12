import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import useClickedOutside from "../hooks/useClickedOutside";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const { ref, isClickedOutside } = useClickedOutside(true);
  const [menu, setMenu] = useState(false);

  const handleMenuToggle = () => {
    setMenu(!menu);
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

        <div className="navbar-menu is-active">
          <div className="navbar-end">
            <div className="navbar-item">{authButtons}</div>
            {isAuthenticated && (
              <div
                className={`navbar-item has-dropdown ${
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
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
