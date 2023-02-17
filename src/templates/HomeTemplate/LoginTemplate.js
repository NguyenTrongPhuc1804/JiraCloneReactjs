import { Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Route } from "react-router-dom";

function LoginTemplate(props) {
  let { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Row>
              <Col
                lg={{
                  span: 12,
                  // offset: 2,
                }}
                xs={0}
                // collapsible="false"
                style={{
                  width: "100%",
                  height: "100vh",
                  backgroundImage: `url(https://picsum.photos/1000)`,
                  backgroundSize: "cover",
                }}
              ></Col>
              <Col
                style={{ height: "100vh" }}
                lg={{
                  span: 12,
                  // offset: 2,
                }}
                xs={24}
                className="d-flex align-items-center justify-content-center "
              >
                <Component {...propsRoute} />
              </Col>
            </Row>
          </>
        );
      }}
    />
  );
}

export default LoginTemplate;
