import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { UserContext } from "../contexts/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleFormReset = () => {
    setEmail("");
    setPassword("");
  };

  const login = async (e) => {
    try {
      e.preventDefault();
      console.log(`${email} ${password}`);
      if (email && password) {
        const {
          data: {
            data: { user, token },
          },
        } = await axios.post("http://localhost:4000/auth/login", {
          email,
          password,
        });
        handleFormReset();
        console.log(user);
        console.log(token);
        //const { token, exp } = token;
        if (token && user) {
          localStorage.setItem("token", token.token);
          localStorage.setItem("token_exp", token.exp);
          setIsAuthenticated(true);
          setUser(user);
          history.push("/");
        }
      }
    } catch (error) {
      handleFormReset();
      console.log(error);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form className="box" onSubmit={login}>
              <h3 className="title is-3">Login</h3>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-success">Login</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
