import axios from "axios";
import { useCallback, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthContext } from "./contexts/authContext";

const App = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const checkAuthenticated = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const { data } = await axios({
          method: "POST",
          url: "http://localhost:4000/auth/verify",
          headers: { token },
        });
        console.log(data);
        setIsAuthenticated(data.success);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [setIsAuthenticated]);

  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
