import { Col, Row } from "antd";
import React from "react";
import { Route } from "react-router-dom";
import ContentJira from "../../components/JiraBugs/Main/ContentJira";
import HeaderJira from "../../components/JiraBugs/Main/HeaderJira";
import InfoJira from "../../components/JiraBugs/Main/InfoJira";
import MenuJira from "../../components/JiraBugs/MenuJira";
import InfoModal from "../../components/JiraBugs/Modal/InfoModal";
import SearchModal from "../../components/JiraBugs/Modal/SearchModal";
import SideBarJiara from "../../components/JiraBugs/SideBarJira";
import SideBar from "../../components/JiraBugs/SideBarJira";
import "../../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
function HomeJiraTemplate(props) {
  let { Component, ...resRoute } = props;
  return (
    <Route
      {...resRoute}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SideBarJiara />
              <Row>
                <Col xl={5} lg={24} sm={24}>
                  <MenuJira />
                </Col>

                <Col xl={19} lg={24} sm={24}>
                  <div className="main">
                    <Component {...propsRoute} />
                  </div>
                </Col>
              </Row>
            </div>
            {/* modal search */}
            <SearchModal />
            {/* info modal */}
            <InfoModal />
          </>
        );
      }}
    />
  );
}

export default HomeJiraTemplate;
