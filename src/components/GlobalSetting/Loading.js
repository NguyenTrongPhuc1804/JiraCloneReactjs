import React from "react";
import styleLoading from "./style.module.css";
import { useSelector } from "react-redux";
export default function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <img src={require("../../assets/loading.gif")} alt="" />
      </div>
    );
  } else {
    return "";
  }
}
