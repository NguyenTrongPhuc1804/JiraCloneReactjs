import { Button } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { EDIT_USER_INFO_SAGA } from "../../../redux/constants/CyberBug/UserJira";

function FormEditInfoUser() {
  const { userInfo } = useSelector((state) => state.ModalJiraReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: userInfo.userId,
      email: userInfo.email,
      passWord: "",
      name: userInfo.name,
      phoneNumber: userInfo.phoneNumber,
    },
    // validationSchema: Yup.object({
    //   name: Yup.string().required("Require").min(4, "min 4 character"),
    //   passWord: Yup.string()
    //     .required("Require")
    //     .max(32, "max 32 character")
    //     .min(4, "min 4 character"),
    //   email: Yup.string()
    //     .required("Require")
    //     .max(32, "max 32 character")
    //     .min(4, "min 4 character")
    //     .email("email invalid"),
    //   phoneNumber: Yup.number().required("Require"),
    // }),
    onSubmit: (value) => {
      console.log(value);
      dispatch({
        type: EDIT_USER_INFO_SAGA,
        infoUserEdit: value,
      });
      //   if (register) {
      //     dispatch({
      //       type: SIGN_UP_USER_SAGA,
      //       infoUser: value,
      //     });
      //     history.push("/userManagement");
      //   } else {
      //     history.push("/");
      //   }
    },
  });
  useEffect(() => {
    dispatch({
      type: "EDIT_USER_INFO",
      handleSubmit: formik.handleSubmit,
    });
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="mb-3">Edit info user </h1>
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
          type="text"
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
      <div className="d-flex justify-content-between">
        {/* <Button
          htmlType="submit"
          size="large"
          className="mt-3 text-white"
          style={{ background: "#7286D3" }}
          onClick={() => {}}
        >
          submit
        </Button> */}
      </div>
    </form>
  );
}

export default FormEditInfoUser;
