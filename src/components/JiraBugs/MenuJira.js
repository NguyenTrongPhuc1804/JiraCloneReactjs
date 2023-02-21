import { Col, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../redux/constants/LoadingConts";
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/constants/settingSytem";
import { history } from "../../util/history";
import { openCustomNotificationWithIcon } from "../../util/Notification/notificationJira";
import { UsergroupAddOutlined } from "@ant-design/icons";
export default function MenuJira() {
  const inFoUser = JSON.parse(localStorage.getItem(USER_LOGIN));
  const dispatch = useDispatch();
  const handleLogout = () => {
    history.push("/");
    localStorage.setItem(USER_LOGIN, "");
    localStorage.setItem(ACCESS_TOKEN, "");
    openCustomNotificationWithIcon("success", "Logout success", "", "topRight");
  };
  return (
    <div className="menu">
      <Row>
        <Col xl={24} lg={4}>
          <div style={{ fontSize: "18px" }} className="account">
            <div className="avatar">
              <img
                style={{ width: 55, height: 55 }}
                src={inFoUser.avatar}
                alt="123"
              />
            </div>
            <div className="account-info ">
              <p>Chào: {inFoUser.name}</p>
              <p style={{ fontSize: "15px" }}>{inFoUser.email}</p>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </div>
          </div>
        </Col>
        <Col xl={24} lg={20}>
          <div className="control">
            <Row>
              {/* <Col xl={24} lg={8}>
                <div className="">
                  <i
                    style={{ fontSize: "20px" }}
                    className="fa fa-credit-card mr-2"
                  />
                  <NavLink
                    className="text-dark"
                    activeClassName="active font-weight-bold text-primary"
                    to="/jiraTemplate"
                  >
                    Project Board
                  </NavLink>
                </div>
              </Col> */}
              <Col style={{ width: "100%" }} xl={24} lg={8}>
                <div className="w-100">
                  <i
                    style={{ fontSize: "20px" }}
                    className="fa-solid fa-people-roof mr-2"
                  ></i>
                  <NavLink
                    className="text-dark"
                    activeClassName="active font-weight-bold text-primary"
                    to="/managerProject"
                  >
                    Manager Project
                  </NavLink>
                </div>
              </Col>
              <Col style={{ width: "100%" }} xl={24} lg={8}>
                <div className="w-100">
                  <i style={{ fontSize: "20px" }} className="fa fa-cog mr-2" />
                  <NavLink
                    className="text-dark"
                    activeClassName="active font-weight-bold text-primary"
                    to="/createProject"
                  >
                    Create project
                  </NavLink>
                </div>
              </Col>
              <Col style={{ width: "100%" }} xl={24} lg={8}>
                <div className="">
                  <i
                    style={{ fontSize: "20px" }}
                    className="fa-sharp fa-solid fa-users mr-2"
                  ></i>
                  <NavLink
                    className="text-dark"
                    activeClassName="active font-weight-bold text-primary"
                    to="/userManagement"
                  >
                    User Management
                  </NavLink>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

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
