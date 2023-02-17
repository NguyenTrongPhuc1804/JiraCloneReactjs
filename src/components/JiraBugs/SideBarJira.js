import { Layout, Menu, Item } from "antd";
import { SearchOutlined, PlusOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormCreateTask from "./Forms/FormCreateTask";
import { GET_USER_ASSIGN_TASK_SAGA } from "../../redux/constants/CyberBug/UserJira";

export default function SideBarJiara() {
  const dispatch = useDispatch();
  const [state, setState] = useState(true);
  const { Sider } = Layout;
  const handleCollap = () => {
    setState(!state);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const onclickSider = (e) => {
    if (e.key === "create") {
      dispatch({
        type: "OPEN_FORM_EDIT",
        title: "Create task",
        ComponentForm: <FormCreateTask />,
      });
    }
  };
  const items = [
    getItem("Create task", "create", <PlusOutlined />),
    getItem("Search", "search", <SearchOutlined />),
  ];
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        style={{ paddingTop: "30%" }}
        breakpoint="xxl"
        collapsedWidth="0"
        // collapsed={state}
      >
        {/* <div
          className="text-white pl-4 pr-2 "
          onClick={() => {
            setState(!state);
          }}
          style={{ top: 0, right: 0, fontSize: 30, cursor: "pointer" }}
        >
          <MenuOutlined />
        </div> */}
        <Menu
          onClick={onclickSider}
          theme="dark"
          defaultSelectedKeys={["create"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </Layout>
  );

  {
    /* <Sider
        collapsed={state}
        onCollapse={() => {
          alert("Asd");
        }}
      >
        <div
          className="text-white pl-4 pr-2 "
          onClick={() => {
            setState(!state);
          }}
          style={{ top: 0, right: 0, fontSize: 30, cursor: "pointer" }}
        >
          <MenuOutlined />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider> */
  }
}

{
  /* <Sider collapsed={state}>
        <div
          className="text-white pl-4 pr-2 "
          onClick={() => {
            setState(!state);
          }}
          style={{ top: 0, right: 0, fontSize: 30, cursor: "pointer" }}
        >
          <MenuOutlined />
        </div>
        <div className="logo" />
        <Menu
          style={{ fontSize: 17 }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          <Item
            key="1"
            onClick={() => {
              dispatch({
                type: "OPEN_FORM_EDIT",
                title: "Create task",
                ComponentForm: <FormCreateTask />,
              });
            }}
          >
            <PlusOutlined />
            <span>
              <strong>Create task</strong>
            </span>
          </Item>
          <Item key="2">
            <SearchOutlined />
            <span>
              <strong>Search</strong>
            </span>
          </Item>
        </Menu>
      </Sider> */
}
