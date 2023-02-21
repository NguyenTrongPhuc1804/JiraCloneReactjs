import { Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import React from "react";

import { SIGN_UP_USER_SAGA } from "../../../redux/constants/CyberBug/CyberBugContants";
import { history } from "../../../util/history";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  EDIT_USER_INFO,
  EDIT_USER_INFO_SAGA,
} from "../../../redux/constants/CyberBug/UserJira";
function SignUpJira() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Require").min(4, "min 4 character"),
      passWord: Yup.string()
        .required("Require")
        .max(32, "max 32 character")
        .min(4, "min 4 character"),
      email: Yup.string()
        .required("Require")
        .max(32, "max 32 character")
        .min(4, "min 4 character")
        .email("email invalid"),
      phoneNumber: Yup.number().required("Require"),
    }),
    onSubmit: (value) => {
      if (register) {
        dispatch({
          type: SIGN_UP_USER_SAGA,
          infoUser: value,
        });
        history.push("/userManagement");
      } else {
        dispatch({
          type: SIGN_UP_USER_SAGA,
          infoUser: value,
        });
        history.push("/");
      }
    },
  });

  useEffect(() => {
    if (register) {
      dispatch({
        type: "CREAT_NEW_USER_MANAGEMENT",
        handleSubmit: formik.handleSubmit,
      });
    }
  }, []);
  const { register } = useSelector((state) => state.ModalJiraReducer);
  // const { editUser } = useSelector((state) => state.ModalJiraReducer);
  // const { userId } = useSelector((state) => state.ModalJiraReducer);

  // console.log("resg", userId);
  // console.log("edit", editUser);
  return (
    <form onSubmit={formik.handleSubmit}>
      {register ? (
        <h1 className="mb-3">Create user </h1>
      ) : (
        <h1 className="mb-3">Sign up account </h1>
      )}
      <div className="form-group">
        <p>Email</p>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          className="form-control"
          name="email"
          id="email"
          type="text"
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-danger">{formik.errors.email}</p>
        )}
      </div>
      <div className="form-group">
        <p>Password</p>
        <input
          value={formik.values.passWord}
          onChange={formik.handleChange}
          className="form-control"
          name="passWord"
          type="password"
          id="passWord"
        />
        <p>
          {formik.errors.passWord && formik.touched.passWord && (
            <p className="text-danger">{formik.errors.passWord}</p>
          )}
        </p>
      </div>
      <div className="form-group">
        <p>Name</p>
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          className="form-control"
          name="name"
          type="text"
          id="name"
        />
        <p>
          {formik.errors.name && formik.touched.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </p>
      </div>
      <div className="form-group">
        <p>Phone number</p>
        <input
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          className="form-control"
          name="phoneNumber"
          type="text"
          id="phoneNumber"
        />
        <p>
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <p className="text-danger">{formik.errors.phoneNumber}</p>
          )}
        </p>
      </div>
      {register ? (
        ""
      ) : (
        <div className="d-flex justify-content-between">
          <Button
            htmlType="submit"
            size="large"
            className="mt-3 text-white"
            style={{ background: "#7286D3" }}
            onClick={() => {
              // dispatch({
              //   type: "CREAT_NEW_USER_MANAGEMENT",
              //   register: false,
              // });
            }}
          >
            Register
          </Button>
          <Button
            htmlType="button"
            size="large"
            className="mt-3 ml-5 text-white"
            style={{ background: "#7286D3" }}
            onClick={() => {
              history.goBack();
            }}
          >
            Go back
          </Button>
        </div>
      )}
    </form>
  );
}

export default SignUpJira;
{
  /* dispatch({
          type: "CREAT_NEW_USER_MANAGEMENT",
          handleSubmit: formik.handleSubmit,
        }) */
}
