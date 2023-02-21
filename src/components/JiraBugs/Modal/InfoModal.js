import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HtmlParser from "react-html-parser";
import { GET_PRIORIRY_SAGA } from "../../../redux/constants/CyberBug/PriorityContants";
import { GET_STATUS_SAGA } from "../../../redux/constants/CyberBug/StatusTaskContants";
import { number } from "yup";
import {
  ADD_COMMENT_TASK_SAGA,
  DELETE_COMMENT_SAGA,
  DELETE_TASK_SAGA,
  EDIT_TASK_API,
  GET_TASK_DETAIL_SAGA,
  GET_TASK_TYPE_SAGA,
  REMOVE_ASSIGNESS,
  UPDATE_ASSIGNESS,
  UPDATE_COMMENT_SAGA,
  UPDATE_STATUS_SAGA,
  UPDATE_TASK,
} from "../../../redux/constants/CyberBug/JiraBugTaskContants";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Select } from "antd";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { logDOM } from "@testing-library/react";
import { USER_LOGIN } from "../../../util/constants/settingSytem";
import { calcLength } from "framer-motion";

export default function InfoModal() {
  const { avatar } = JSON.parse(localStorage.getItem(USER_LOGIN));

  const dispatch = useDispatch();
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { status } = useSelector((state) => state.StatusTaskReducer);
  const { priority } = useSelector((state) => state.PriorityReducer);
  const { taskType } = useSelector((state) => state.JiraTaskReducer);
  const { projectDetail } = useSelector((state) => state.EditProjectReducer);

  // hook
  const [estimate, setEstimate] = useState(taskDetailModal.originalEstimate);
  const [visible, setVisible] = useState(false);
  const [contentComment, setCommentContent] = useState("");
  const [updateComment, setUpdateComment] = useState(false);
  const [idComment, setIdComment] = useState(0);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);

  useEffect(() => {
    dispatch({
      type: GET_STATUS_SAGA,
    });
    dispatch({
      type: GET_PRIORIRY_SAGA,
    });
    dispatch({
      type: GET_TASK_TYPE_SAGA,
    });
  }, []);

  // console.log("asasd", taskType);
  // console.log("taskDetailModal", taskDetailModal);
  // console.log("project", projectDetail);
  // handle event time tracking
  const renderTimeTracking = () => {
    let { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);
    return (
      <div className="">
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={timeTrackingSpent}
                aria-valuemin={timeTrackingRemaining}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">
                {taskDetailModal.timeTrackingSpent}h logged
              </p>
              <p className="estimate-time">
                {taskDetailModal.timeTrackingRemaining}h estimated
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              name="timeTrackingSpent"
              onChange={handleChangeUpdateTask}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              name="timeTrackingRemaining"
              onChange={handleChangeUpdateTask}
            />
          </div>
        </div>
      </div>
    );
  };
  const renderAllComment = () =>
    taskDetailModal.lstComment.map((comment, index) => (
      <div key={index} className="display-comment" style={{ display: "flex" }}>
        <div className="avatar">
          <img src={comment.avatar} alt="!23" />
        </div>
        <div className="d-flex justify-content-between w-100 align-items-center ">
          <div>
            <p style={{ marginBottom: 5 }}>
              <strong>{comment.name}</strong> <span>a month ago</span>
            </p>
            <p style={{ marginBottom: 5 }}>
              {HtmlParser(comment.commentContent)}
            </p>
          </div>
          <div>
            <Button
              onClick={() => {
                setCommentContent(comment.commentContent);
                setUpdateComment(!updateComment);
                setIdComment(comment.id);
              }}
              className="mr-3"
              type="primary"
              shape="round"
            >
              Edit
            </Button>

            <Button
              onClick={() => {
                console.log("!23");
                dispatch({
                  type: DELETE_COMMENT_SAGA,
                  taskId: taskDetailModal.taskId,
                  idComment: comment.id,
                });
                // dispatch({
                //   type: DELETE_COMMENT_SAGA,
                //   taskId: taskDetailModal.taskId,
                //   idComment: comment.idComment,
                // });
              }}
              shape="round"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    ));

  const handleDeleteTask = () => {
    dispatch({
      type: DELETE_TASK_SAGA,
      projectId: projectDetail.id,
      taskId: taskDetailModal.taskId,
    });
  };
  // event update
  const handleChangeUpdateTask = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: EDIT_TASK_API,
      actionType: UPDATE_TASK,
      name,
      value,
    });
    // dispatch({
    //   type: UPDATE_TASK,
    //   name,
    //   value,
    // });
  };

  const optionUs = projectDetail.members
    ?.filter((mem) => {
      let index = taskDetailModal.assigness?.findIndex(
        (us) => us.id == mem.userId
      );
      // console.log("index", index);
      if (index !== -1) {
        return false;
      }
      return true;
    })
    .map((mem, index) => ({
      value: mem.userId,
      label: mem.name,
    }));
  // console.log("123", optionUs);
  const editComment = () => {
    dispatch({
      type: UPDATE_COMMENT_SAGA,
      taskId: taskDetailModal.taskId,
      commentUpdate: {
        id: idComment,
        contentComment: contentComment,
      },
    });
    setUpdateComment(!updateComment);
  };
  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                value={taskDetailModal.typeId}
                name="typeId"
                id="typeId"
                onChange={handleChangeUpdateTask}
              >
                {taskType.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.taskType}
                  </option>
                ))}
              </select>
              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <button
                onClick={handleDeleteTask}
                className=" close "
                data-dismiss="modal"
                aria-label="Close"
              >
                <i
                  className="fa fa-trash-alt "

                  // style={{ cursor: "pointer" }}
                />
              </button>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <span className="issue">
                    This is an issue of type:{" "}
                    {taskDetailModal.taskTypeDetail.taskType}.
                  </span>
                  <div className="description">
                    <p>Description</p>
                    {visible ? (
                      <div className="">
                        <Editor
                          initialValue={taskDetailModal.description}
                          name="description"
                          id="description"
                          onEditorChange={(content, edit) => {
                            setContent(content);
                          }}
                          apiKey="your-api-key"
                          init={{
                            height: 500,
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
                        <Button
                          onClick={() => {
                            setVisible(false);
                            dispatch({
                              type: "UPDATE_TASK",
                              name: "description",
                              value: content,
                            });
                          }}
                          className="m-2"
                          size="lagre"
                          type="primary"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setVisible(false);
                            setHistoryContent(taskDetailModal.description);
                          }}
                          className="m-2"
                          size="lagre"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setVisible(!visible);
                        }}
                      >
                        {HtmlParser(taskDetailModal.description)}
                      </div>
                    )}
                    {}
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  {/* <div className="title">
                    <div className="title-item">
                      <h3>
                        BUG <i className="fa fa-bug" />
                      </h3>
                      <p>
                        A bug is a problem which impairs or prevents the
                        function of a product.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        STORY <i className="fa fa-book-reader" />
                      </h3>
                      <p>
                        A user story is the smallest unit of work that needs to
                        be done.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        TASK <i className="fa fa-tasks" />
                      </h3>
                      <p>A task represents work that needs to be done</p>
                    </div>
                  </div> */}
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img src={avatar} alt="!23" />
                      </div>
                      <div className="input-comment">
                        {/* <input
                          value={contentComment}
                          name="contentComment"
                          onChange={(e) => {
                            // console.log("value", e.target.value);
                            setCommentContent(e.target.value);
                          }}
                          type="text"
                          placeholder="Add a comment ..."
                        /> */}
                        <Editor
                          // initialValue={contentComment}
                          value={contentComment}
                          name="commentContent"
                          id="commentContent"
                          onEditorChange={(content, edit) => {
                            setCommentContent(content);
                          }}
                          apiKey="your-api-key"
                          init={{
                            height: 200,
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
                        {/* <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p> */}
                        {contentComment.trim() !== "" ? (
                          <div className="mt-3">
                            <button
                              onClick={() => {
                                updateComment
                                  ? editComment()
                                  : dispatch({
                                      type: ADD_COMMENT_TASK_SAGA,
                                      dataComment: {
                                        taskId: taskDetailModal.taskId,
                                        contentComment: contentComment,
                                      },
                                    });
                                setCommentContent("");
                              }}
                              className="btn btn-primary mr-3"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setCommentContent("");
                              }}
                              className="btn "
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <strong>All Comment</strong>

                    <div className="lastest-comment">
                      <div
                        className="comment-item"
                        id="customScroll"
                        style={{ height: 250 }}
                      >
                        {renderAllComment()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      onChange={handleChangeUpdateTask}
                      value={taskDetailModal.statusId}
                      className="custom-select"
                    >
                      {status.map((item, index) => (
                        <option key={index} value={item.statusId}>
                          {item.statusName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {taskDetailModal.assigness.map((item, index) => (
                        <div
                          key={index}
                          style={{ display: "flex" }}
                          className="item p-2 mt-1"
                        >
                          <div className="avatar">
                            <img src={item.avatar} alt="!23" />
                          </div>
                          <p className="name ml-1">
                            {item.name}
                            <i
                              onClick={() => {
                                dispatch({
                                  type: EDIT_TASK_API,
                                  actionType: REMOVE_ASSIGNESS,
                                  userId: item.id,
                                });
                                // dispatch({
                                //   type: REMOVE_ASSIGNESS,
                                //   userId: item.id,
                                // });
                              }}
                              className="fa fa-times"
                              style={{ marginLeft: 5, cursor: "pointer" }}
                            />
                          </p>
                        </div>
                      ))}
                      <Select
                        value={"+ Add more user"}
                        style={{ width: "100%", margin: "10px" }}
                        options={optionUs}
                        onSelect={(value) => {
                          let userSelect = projectDetail.members.find(
                            (us) => us.userId === value
                          );
                          userSelect = { ...userSelect, id: userSelect.userId };
                          dispatch({
                            type: EDIT_TASK_API,
                            actionType: UPDATE_ASSIGNESS,
                            userSelect,
                          });
                          // dispatch({
                          //   type: UPDATE_ASSIGNESS,
                          //   userSelect: userSelect,
                          // });
                        }}
                      />
                      {/* <div style={{ display: "flex", alignItems: "center" }}>
                        <i className="fa fa-plus" style={{ marginRight: 5 }} />
                        <span>Add more</span>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="reporter">
                    <h6>REPORTER</h6>
                    <div style={{ display: "flex" }} className="item">
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (1).jfif")}
                          alt="!23"
                        />
                      </div>
                      <p className="name">
                        Pickle Rick
                        <i className="fa fa-times" style={{ marginLeft: 5 }} />
                      </p>
                    </div>
                  </div> */}
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      onChange={handleChangeUpdateTask}
                      value={taskDetailModal.priorityId}
                      className="form-control"
                    >
                      {priority.map((item, index) => (
                        <option key={index} value={item.priorityId}>
                          {item.priority}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      name="originalEstimate"
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setEstimate(value);
                        dispatch({
                          type: EDIT_TASK_API,
                          actionType: UPDATE_TASK,
                          name,
                          value,
                        });
                      }}
                      type="text"
                      value={taskDetailModal.originalEstimate}
                      className="estimate-hours"
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
