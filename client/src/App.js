import axios from "axios";
import { useCallback, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";
import Settings from "./components/Settings";
import SignUp from "./components/SignUp";
import Stream from "./components/Stream";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/settings" component={Settings} exact />
          <Route path="/stream/:username" component={Stream} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
