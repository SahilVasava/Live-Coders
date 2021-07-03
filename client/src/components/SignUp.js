import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { setIsAuthenticated } = useContext(AuthContext);

  const handleFormReset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const signUp = async (e) => {
    try {
      e.preventDefault();
      console.log(`${username} ${email} ${password}`);
      if (username && email && password) {
        const { data } = await axios.post(
          "http://localhost:4000/auth/register",
          {
            username,
            email,
            password,
          }
        );
        handleFormReset();
        console.log(data);
        const jwt = data.data.token;
        if (jwt) {
          localStorage.setItem("token", jwt);
          setIsAuthenticated(true);
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
            <form className="box" onSubmit={signUp}>
              <h3 className="title is-3">Sign Up</h3>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  ></input>
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
              </div>
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
                  <button className="button is-success">Sign Up</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
