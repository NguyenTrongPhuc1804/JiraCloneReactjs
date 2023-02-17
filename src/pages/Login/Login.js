import React, { useState } from "react";
import { Prompt } from "react-router-dom";

export default function Login(props) {
  let [login, setLogin] = useState({
    userName: "",
    passWord: "",
  });
  const handleLogin = (e) => {
    let { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (login.userName === "admin" && login.passWord === "admin123") {
      props.history.goBack();
      localStorage.setItem("userLogin", JSON.stringify(login));
    } else {
      alert("Login fail");
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit} className="container">
      <h3 className="display-4">Login</h3>
      <div className="form-group">
        <p>Username</p>
        <input
          name="userName"
          className="form-control"
          onChange={handleLogin}
          type="text"
        />
      </div>
      <div className="form-group">
        <p>Password</p>
        <input
          name="passWord"
          className="form-control"
          onChange={handleLogin}
          type="text"
        />
      </div>
      <div className="form-group">
        <button
          onClick={() => {
            console.log(login);
          }}
          className="btn btn-success"
        >
          Login
        </button>
      </div>
      <Prompt
        when={false}
        message={(location) => {
          return "yousure out";
        }}
      ></Prompt>
    </form>
  );
}
