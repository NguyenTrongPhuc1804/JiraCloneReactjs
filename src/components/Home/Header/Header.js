import React from "react";
import { Link, NavLink } from "react-router-dom";
export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/todoList">
                  TodoList
                </NavLink>
                <NavLink className="dropdown-item" to="/todoListRFC">
                  TodoListRFC
                </NavLink>
                <NavLink className="dropdown-item" to="/todoListRedux">
                  TodoListRedux
                </NavLink>
                <NavLink className="dropdown-item" to="/todoSaga">
                  TodoListReduxSaga
                </NavLink>
                <NavLink className="dropdown-item" to="/demoModalHOC">
                  demoModalHOC
                </NavLink>
                <NavLink className="dropdown-item" to="/jiraTemplate">
                  Jira
                </NavLink>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
