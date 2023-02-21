import { AutoComplete, Button, Input, Select, Space, Table } from "antd";
import Search from "antd/es/transfer/search";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FormEditInfoUser from "../../../components/JiraBugs/Forms/FormEditInfoUser";
import {
  DELETE_USER_JIRA,
  GET_USER_SAGA_SEARCH,
} from "../../../redux/constants/CyberBug/UserJira";
import SignUpJira from "../SignUpJira/SignUpJira";

function UserManagenet() {
  const { Search } = Input;
  const [nameSeatch, setNameSearch] = useState("");
  const dispatch = useDispatch();
  const { listUS } = useSelector((state) => state.UserLoginReducer);
  //   console.log("list", listUS);
  const arrUser = listUS.map((user, index) => ({ value: user.name }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 200,
      render: (text, record) => {
        return (
          <div className="">
            <Button
              onClick={() => {
                dispatch({
                  type: "OPEN_FORM_EDIT",
                  title: "Edit info user",
                  ComponentForm: <FormEditInfoUser />,
                  userInfo: record,
                });
              }}
              type="primary"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                dispatch({
                  type: DELETE_USER_JIRA,
                  userId: record.userId,
                });
              }}
              className="ml-2"
              type="primary"
              danger
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch({
      type: GET_USER_SAGA_SEARCH,
      userList: "gmail",
    });
  }, []);
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-6">
          <p>Search user from email</p>
          <Space direction="vertical">
            <Search
              enterButton
              //   style={{
              //     width: 300,
              //   }}
              // onChang={onChange}
              // onSelect={onSelect}
              onSearch={(value) => {
                dispatch({
                  type: GET_USER_SAGA_SEARCH,
                  userList: value,
                });
              }}
              placeholder="Search user from email user"
            />
          </Space>
        </div>
        <div className="col-6 ">
          <p>Create new account</p>
          <Button
            onClick={() => {
              dispatch({
                type: "OPEN_FORM_EDIT",
                title: "Create new user",
                ComponentForm: <SignUpJira />,
                register: true,
              });
            }}
            type="primary"
          >
            Create user
          </Button>
        </div>
      </div>

      <Table
        className="mt-2"
        columns={columns}
        dataSource={listUS}
        rowKey="userId"
        scroll={{ x: 600, y: 550 }}
        style={{ width: "1000px" }}
      />
    </div>
  );
}

export default UserManagenet;
