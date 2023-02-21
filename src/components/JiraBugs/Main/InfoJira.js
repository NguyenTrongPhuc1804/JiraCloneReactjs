import { Button } from "antd";
import React from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask";
export default function InfoJira(props) {
  const dispatch = useDispatch();
  const renderAvatar = () =>
    props.members?.map((item, index) => (
      <div key={index} className="avatar">
        <img src={item.avatar} alt="123" />
      </div>
    ));
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <Button
          onClick={() => {
            dispatch({
              type: "OPEN_FORM_EDIT",
              title: "Create task",
              ComponentForm: <FormCreateTask />,
            });
          }}
          style={{ outline: "none" }}
          type="primary"
          icon={<PlusCircleFilled />}
          size="large"
        >
          Create task
        </Button>
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        {renderAvatar()}
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}
