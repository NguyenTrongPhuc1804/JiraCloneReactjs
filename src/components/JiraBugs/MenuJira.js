import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuJira() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/download.jfif")} alt="123" />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card mr-2" />
          <NavLink
            className="text-dark"
            activeClassName="active font-weight-bold text-primary"
            to="/jiraTemplate"
          >
            Project Board
          </NavLink>
        </div>
        <div>
          <i className="fa-solid fa-people-roof mr-2"></i>
          <NavLink
            className="text-dark"
            activeClassName="active font-weight-bold text-primary"
            to="/managerProject"
          >
            Manager Project
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-2" />
          <NavLink
            className="text-dark"
            activeClassName="active font-weight-bold text-primary"
            to="/createProject"
          >
            Project Settings
          </NavLink>
        </div>
      </div>
      {/* <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div> */}
    </div>
  );
}
