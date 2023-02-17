import {
  Button,
  Space,
  Table,
  Tag,
  message,
  Popconfirm,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PROJECT_SAGA } from "../../../redux/constants/CyberBug/CyberBugContants";
import FormGlobal from "../../../components/JiraBugs/Forms/FormEdit";
import FormEdit from "../../../components/JiraBugs/Forms/FormEdit";
import { NavLink } from "react-router-dom";
export default function ManagerProject() {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  // ------debound search
  const searchRef = useRef(null);
  const [nameSearch, setNameSearch] = useState("");
  // redux
  const listProduct = useSelector(
    (state) => state.ProjectJiraBugReducer.listProject
  );
  const { listUS } = useSelector((state) => state.UserLoginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  // ----------Popconform------

  // -------------editor timymce
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return <NavLink to={`/jiraTemplate/${record.id}`}>{text}</NavLink>;
      },
      sorter: (a, b) => {
        if (
          a.projectName.trim().toLowerCase() <
          b.projectName.trim().toLowerCase()
        ) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        let jsxContent = ReactHtmlParser(text);
        return <div>{jsxContent}</div>;
      },
      colSpan: 1,
    },
    {
      title: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="magenta">{text.creator?.name}</Tag>;
      },
      sorter: (a, b) => {
        if (
          a.projectName?.trim().toLowerCase() <
          b.projectName?.trim().toLowerCase()
        ) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Members",
      key: "members",
      render: (text, record, index) => (
        <div className="">
          {record.members?.slice(0, 3).map((item, index) => (
            <Popover
              key={index}
              title="members"
              placement="top"
              content={() => (
                <table style={{ width: "400px" }}>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>avatar</th>
                      <th>name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.members?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.userId}</td>
                        <td>
                          {/* <Avatar ></Avatar> */}
                          <img
                            src={item.avatar}
                            width="45"
                            height="45"
                            style={{ borderRadius: "50%" }}
                            alt={index}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <button
                            onClick={() => {
                              dispatch({
                                type: "REMOVE_USER_PROJECT_SAGA",
                                userProject: {
                                  projectId: record.id,
                                  userId: item.userId,
                                },
                              });
                            }}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            >
              <span key={index} className="">
                <Avatar src={item.avatar} />
              </span>
            </Popover>
          ))}
          {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
          <Popover
            content={() => (
              <AutoComplete
                onChange={(text) => {
                  setNameSearch(text);
                }}
                value={nameSearch}
                optionFilterProp="label"
                onSelect={(value, option) => {
                  setNameSearch(option.label);
                  console.log(option);
                  dispatch({
                    type: "ASSIGN_USER_PROJECT_SAGA",
                    userProject: {
                      projectId: record.id,
                      userId: option.value,
                    },
                  });
                }}
                options={listUS?.map((item, index) => ({
                  value: item.userId.toString(),
                  label: item.name,
                }))}
                onSearch={(value) => {
                  searchRef.current = setTimeout(() => {
                    dispatch({
                      type: "GET_USER_SAGA_SEARCH",
                      userList: value,
                    });
                  }, 500);
                }}
                style={{
                  width: 200,
                }}
              />
            )}
            title="Add members"
            trigger="click"
          >
            <Button>+</Button>
          </Popover>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              dispatch({
                type: "OPEN_FORM_EDIT",
                ComponentForm: <FormEdit />,
                title: "Edit Project",
              });
              dispatch({
                type: "EDIT_PROJECT",
                projectEditModal: record,
              });
            }}
            type="primary"
            size="large"
          >
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => {
              dispatch({
                type: "DELETE_PROJECT_SAGA",
                data: record.id,
              });
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary" size="large">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="mt-5 container " style={{ width: "100vw" }}>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={listProduct}
        onChange={handleChange}
        scroll={{ x: 1000, y: 550 }}
      />
    </div>
  );
}
