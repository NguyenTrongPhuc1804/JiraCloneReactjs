import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TASK_API,
  CHECK_TASK_API,
  DELETE_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_API,
  REJECT_TASK_API,
} from "../../redux/constants/TodoConstants";
export default function BaiTapToDoSaga() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.TodoListReducer.taskList);
  let [state, setState] = useState({
    taskList: [],
    value: {
      taskName: "",
    },
    err: {
      taskName: "",
    },
  });
  const handelChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    let newValue = { ...state.value, [name]: value };
    let newErr = { ...state.err };
    setState({ ...state, value: newValue });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_TASK_API,
      taskName: state.value.taskName,
    });
  };
  const getTaskList = () => {
    dispatch({
      type: GET_TASKLIST_API,
    });
  };
  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => (
        <motion.li key={index}>
          <span>{item.taskName}</span>
          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                deleTask(item.taskName);
              }}
              className="remove"
            >
              <i className="fa fa-trash-alt" />
            </button>
            <button
              type="button"
              onClick={() => {
                compleTask(item.taskName);
              }}
              className="complete"
            >
              <i className="far fa-check-circle" />
              <i className="fas fa-check-circle" />
            </button>
          </div>
        </motion.li>
      ));
  };
  const renderTaskToDoDone = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => (
        <li key={index}>
          <span>{item.taskName}</span>
          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                deleTask(item.taskName);
              }}
              className="remove"
            >
              <i className="fa fa-trash-alt" />
            </button>
            <button
              type="button"
              onClick={() => {
                rejTask(item.taskName);
              }}
              className="complete"
            >
              <i className="far fa-undo" />
              <i className="fas fa-undo" />
            </button>
          </div>
        </li>
      ));
  };
  const rejTask = (taskName) => {
    dispatch({
      type: REJECT_TASK_API,
      taskName: taskName,
    });
  };
  const deleTask = (taskName) => {
    dispatch({
      type: DELETE_TASK_API,
      taskName,
    });
  };
  const compleTask = (taskName) => {
    dispatch({
      type: CHECK_TASK_API,
      taskName,
    });
  };
  useEffect(() => {
    getTaskList();
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          getTaskList();
        }}
      >
        Get task list
      </button>
      <form onSubmit={handelSubmit} className="card">
        <button
          className="btn btn-success"
          type="button"
          onClick={() => {
            dispatch({
              type: "getTaskApplication",
            });
          }}
        >
          Dispatch redux saga
        </button>
        <div className="card__header">
          <img src={require("./bg.png")} />
        </div>
        {/* <h2>hello!</h2> */}
        <div className="card__body">
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p>September 9,2020</p>
            </div>
            <div className="card__add">
              <input
                name="taskName"
                onChange={handelChange}
                id="newTask"
                type="text"
                placeholder="Enter an activity..."
              />
              <button type="submit" onClick={handelSubmit} id="addItem">
                <i className="fa fa-plus" />
              </button>
            </div>
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                {renderTaskToDoDone()}

                {/* <li>
                  <span>Ăn sáng</span>
                  <div className="buttons">
                    <button className="remove">
                      <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete">
                      <i className="far fa-check-circle" />
                      <i className="fas fa-check-circle" />
                    </button>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
