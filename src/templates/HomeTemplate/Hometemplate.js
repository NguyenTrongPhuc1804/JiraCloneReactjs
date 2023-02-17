import React from "react";
import { Route } from "react-router-dom";
import Header from "../../components/Home/Header/Header";

function Hometemplate(props) {
  let { Component, ...resRoute } = props;

  return (
    <Route
      {...resRoute}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
}

export default Hometemplate;
