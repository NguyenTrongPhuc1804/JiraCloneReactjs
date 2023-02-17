import React from "react";
import { useDispatch } from "react-redux";
import LoginHOC from "../LoginHOC/LoginHOC";
import RegisterHOC from "../Register/RegisterHOC";
function DemoHOCModal() {
  const dispatch = useDispatch();
  return (
    <div className="text-center ">
      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <LoginHOC></LoginHOC>,
          });
        }}
        type="button"
        className="btn btn-success btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        dang nhap
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <RegisterHOC />,
          });
        }}
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        dang ki
      </button>
    </div>
  );
}

export default DemoHOCModal;
