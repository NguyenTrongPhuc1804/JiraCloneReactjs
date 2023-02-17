import React from "react";

export default function pageNotFound(props) {
  return (
    <div>
      khong tim thay url nay:
      <a href=""> {props.match.url}</a>
    </div>
  );
}
