import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.jpg";
import "./navBar.css";

class navBar extends React.Component {
  render() {
    return (
      <div className="navBar">
        <img src={logo} alt="logo" />
        <ul className="time-range">
          <li>
            <NavLink to="/day" activeClassName="is-active">
              1 DAY
            </NavLink>
          </li>
          <li>
            <NavLink to="/week" activeClassName="is-active">
              7 DAYS
            </NavLink>
          </li>
          <li>
            <NavLink to="/month" activeClassName="is-active">
              30 DAYS
            </NavLink>
          </li>
        </ul>
        <a href="/newEvent">
          <button className="add">Add event</button>
        </a>
      </div>
    );
  }
}

export default navBar;
