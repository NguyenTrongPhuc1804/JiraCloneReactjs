import React, { useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Input } from "antd";
import { useFormik, withFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { actionSignin } from "../../../redux/action/CyberBugAction/CyberBugAction";
function LoginCyberBug(props) {
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY",
      history,
    });
  }, []);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: (value) => {
      dispatch(actionSignin(value.name, value.password));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Require")
        .min(5, "min 5 character")
        .max(32, "max 32 charecter")
        .email("email invalid"),
      password: Yup.string().required("Require").max(10, "10 character"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column ">
      <h3 className="text-center mb-4">Login Jira Project</h3>
      <Input
        // autoComplete="off"
        onChange={formik.handleChange}
        id="name"
        name="name"
        size="large"
        className="mb-3 "
        type="text"
        value={formik.values.name}
        prefix={<UserOutlined />}
      />
      {formik.errors.name && formik.touched.name && (
        <p className="text-danger">{formik.errors.name}</p>
      )}
      <Input
        name="password"
        onChange={formik.handleChange}
        id="password"
        size="large"
        className=""
        type="password"
        value={formik.values.password}
        prefix={<LockOutlined />}
      />
      {formik.errors.password && formik.touched.password && (
        <p className="text-danger">{formik.errors.password}</p>
      )}
      <div className="d-flex justify-content-between">
        <Button
          htmlType="submit"
          className="mt-3 text-white"
          style={{ background: "#7286D3" }}
          size="large"
          onClick={() => {}}
        >
          Login
        </Button>
        <NavLink to="/signUp">
          <Button
            htmlType="button"
            className="mt-3 text-white"
            style={{ background: "#7286D3" }}
            size="large"
            onClick={() => {}}
          >
            Sign up
          </Button>
        </NavLink>
      </div>

      <div className="social  d-flex justify-content-center mt-3 ">
        <Button
          style={{ fontSize: 20, background: "#3578E5" }}
          className="font-weight-bold mr-3 text-white"
          size="large"
          shape="circle"
        >
          f
        </Button>
        <Button
          style={{ fontSize: 20, background: "#3578E5" }}
          className="font-weight-bold text-white "
          size="large"
          shape="circle"
          icon={<TwitterOutlined />}
        ></Button>
      </div>
    </form>
  );
}

export default LoginCyberBug;
