import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NavBar from "./components/navBar.jsx";
import App from "./App";
import Day from "./components/day.jsx";
import Month from "./components/month.jsx";
import Login from "./components/login/login";
import AddEvent from "./components/addEvent";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Switch>
        <Route exact path="/week">
          <NavBar />
          <App />
        </Route>
        <Route exact path="/day">
          <NavBar />
          <Day />
        </Route>
        <Route exact path="/month">
          <NavBar />
          <Month />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/newEvent">
          <AddEvent />
        </Route>
      </Switch>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
