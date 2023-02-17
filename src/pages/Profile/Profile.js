import React from "react";
import { Redirect } from "react-router-dom";

export default function Profile() {
  if (localStorage.getItem("userLogin")) {
    return <div>Profile</div>;
  } else {
    alert("vui long dang nhap de tiep tuc");
    return <Redirect to="/login"></Redirect>;
  }
}
