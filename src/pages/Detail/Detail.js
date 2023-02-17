import React from "react";

export default function Detail(props) {
  return (
    <div>
      Tham so id: {props.match.params.id}
      <p>path hien tai: {props.match.path}</p>
    </div>
  );
}
