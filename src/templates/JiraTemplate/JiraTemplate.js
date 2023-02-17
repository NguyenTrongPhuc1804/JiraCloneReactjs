import React from "react";
import { Route } from "react-router-dom";
function JiraTemplate(props) {
  let { Component, ...resRoute } = props;
  return (
    <Route
      {...resRoute}
      render={(propsRoute) => {
        return (
          <>
            <p>asdasdasd</p>
          </>
        );
      }}
    />
  );
}

export default JiraTemplate;
