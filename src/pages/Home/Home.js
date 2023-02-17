import React from "react";
import { useSelector } from "react-redux";
export default function Home() {
  const userLogin = useSelector((state) => state.UserLoginReducer.userLogin);
  console.log(userLogin);
  return (
    <div>
      <img src={userLogin?.avatar} alt="" />
      <br />
      <p>name :{userLogin?.name}</p>
    </div>
  );
}
