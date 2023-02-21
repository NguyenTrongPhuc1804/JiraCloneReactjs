import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { Select, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CREAT_NEW_TASK_SAGA,
  GET_ALL_PROJECT_TASK,
  GET_ALL_PROJECT_TASK_SAGA,
  GET_TASK_TYPE_SAGA,
} from "../../../redux/constants/CyberBug/JiraBugTaskContants";
import { GET_PRIORIRY_SAGA } from "../../../redux/constants/CyberBug/PriorityContants";
import {
  GET_STATUS,
  GET_STATUS_SAGA,
} from "../../../redux/constants/CyberBug/StatusTaskContants";
import { GET_USER_ASSIGN_TASK_SAGA } from "../../../redux/constants/CyberBug/UserJira";
import { openCustomNotificationWithIcon } from "../../../util/Notification/notificationJira";

export default function FormCreateTask() {
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const handleTimeTracking = (e) => {
    let { value, name } = e.target;
    setTimeTracking({ ...timeTracking, [name]: value });
    formik.setFieldValue([name], value);
  };

  // ---selected antd

  // binding data
  const { arrProject } = useSelector((state) => state.ProjectJiraBugReducer);
  const { taskType } = useSelector((state) => state.JiraTaskReducer);
  const { priority } = useSelector((state) => state.PriorityReducer);
  const { listUS } = useSelector((state) => state.UserLoginReducer);
  const { status } = useSelector((state) => state.StatusTaskReducer);
  const { arrUserAssign } = useSelector((state) => state.UserLoginReducer);
  const { projectDetail } = useSelector((state) => state.EditProjectReducer);
  console.log("pro", arrUserAssign.length);
  //hook
  // console.log("tasjk", arrProject);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_TASK_SAGA,
    });
    dispatch({
      type: GET_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_PRIORIRY_SAGA,
    });
    dispatch({
      type: "GET_USER_SAGA_SEARCH",
      userList: "",
    });
    dispatch({
      type: GET_STATUS_SAGA,
    });
    dispatch({
      type: "CREATE_NEW_TASK_1",
      handleSubmit: formik.handleSubmit,
    });
  }, []);
  // formik
  const optionUser = arrUserAssign?.map((item, index) => ({
    value: item.userId,
    label: item.name,
  }));
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      listUserAsign: [0],
      taskName: "",
      description: "",
      statusId: status[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[arrProject.length - 1]?.id,
      typeId: taskType[0]?.id,
      priorityId: priority[0]?.priorityId,
    },
    onSubmit: (value) => {
      arrUserAssign.length === 0
        ? openCustomNotificationWithIcon(
            "error",
            "Vui lòng thêm 1 user vào dự án để tạo task",
            "",
            "topRight"
          )
        : dispatch({
            type: CREAT_NEW_TASK_SAGA,
            newTask: value,
          });
    },
  });
  // console.log("arr", arrProject[arrProject.length - 1]?.id);
  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          onChange={(e) => {
            console.log("num", e.target.value);
            dispatch({
              type: GET_USER_ASSIGN_TASK_SAGA,
              projectId: Number(e.target.value),
            });
            formik.setFieldValue("projectId", e.target.value);
          }}
          name="projectId"
          id="projectId"
          className="form-control"
          // defaultValue={"1"}
        >
          {arrProject?.map((item, index) => (
            <option key={item.id} selected value={item.id}>
              {item.projectName}
            </option>
          ))}
          {/* <option selected value="1">
            project A
          </option>
          <option selected value="2">
            project B
          </option> */}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <p>Task name</p>
            <input
              type="text"
              className="form-control"
              name="taskName"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-md-12 col-lg-6">
            <p>Status</p>
            <select
              className="form-control"
              name="statusId"
              id=""
              onChange={formik.handleChange}
            >
              {status?.map((item, index) => (
                <option key={index} value={item.statusId}>
                  {item.statusName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <p>Priority</p>
            <select
              defaultValue={"1"}
              className="form-control"
              name="priorityId"
              id=""
              onChange={formik.handleChange}
            >
              {priority?.map((item, index) => (
                <option key={item.priorityId} selected value={item.priorityId}>
                  {item.priority}
                </option>
              ))}
              {/* <option selected value="1">
                Hight
              </option>
              <option selected value="2"></option> */}
            </select>
          </div>
          <div className="col-md-12 col-lg-6">
            <p>Type Task</p>

            <select
              // defaultValue={"1"}
              name="typeId"
              className="form-control"
              id=""
              onChange={formik.handleChange}
            >
              {taskType?.map((item, index) => (
                <option key={item.id} selected value={item.id}>
                  {item.taskType}
                </option>
              ))}
              {/* <option value="1">New task</option>
              <option value="2"> Hello task</option> */}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <p> Assigness</p>
            <Select
              optionFilterProp="label"
              mode="multiple"
              size="middle"
              placeholder="Please select"
              // defaultValue={["a10", "c12"]}
              onChange={(value) => {
                formik.setFieldValue("listUserAsign", value);
                // console.log("valye", value);
              }}
              style={{
                width: "100%",
              }}
              options={optionUser}
            />
            <div className="form-group " style={{ marginTop: "20px" }}>
              <p>Original Estimate</p>
              <input
                min="0"
                defaultValue={0}
                className="form-control"
                name="originalEstimate"
                type="number"
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <p>Time tracking</p>
            <Slider
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingRemaining) +
                Number(timeTracking.timeTrackingSpent)
              }
              defaultValue={30}
              //   tooltip={{
              //     open: true,
              //   }}
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h estimated
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <p>Time spent</p>
                <input
                  onChange={handleTimeTracking}
                  defaultValue={"0"}
                  type="number"
                  className="form-control"
                  min="0"
                  name="timeTrackingSpent"
                />
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  onChange={handleTimeTracking}
                  defaultValue={"0"}
                  type="number"
                  className="form-control"
                  min="0"
                  name="timeTrackingRemaining"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          value={formik.values.description}
          // initialValue={formik.values.categoryId}
          name="description"
          id="description"
          onEditorChange={(content, edittor) => {
            formik.setFieldValue("description", content);
          }}
          apiKey="your-api-key"
          init={{
            height: 230,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      {/* <button type="submit">submit</button> */}
    </form>
  );
}
