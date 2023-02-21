import { Button, Drawer, Modal } from "antd";
import { useState } from "react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ModalJira() {
  const { isModalOpen, ComponentContentModal, callbackSubmit, title } =
    useSelector((state) => state.ModalJiraReducer);
  const dispatch = useDispatch();
  const showModal = () => {
    dispatch({
      type: "OPEN_MODAL",
    });
  };
  const handleOk = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
  };
  const handleCancel = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
  };
  return (
    <>
      <Drawer
        centered
        // width={300}
        title={title}
        onClose={handleCancel}
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[
          <Button
            className="mr-3"
            key="submit"
            type="primary"
            onClick={callbackSubmit}
          >
            Submit
          </Button>,
          <Button key="button" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        {ComponentContentModal}
      </Drawer>
    </>
  );
}
