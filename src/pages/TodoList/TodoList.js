import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
export default function TodoList() {
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

    let promise = Axios({
      url: "https://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: {
        taskName: state.value.taskName,
      },
    });
    promise.then((result) => {
      console.log(result);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thêm task thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      getTaskList();
    });
    promise.catch((err) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Task đã tồn tại",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err.response.data);
    });
  };
  const getTaskList = () => {
    let promise = Axios({
      url: "https://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((result) => {
      setState({ ...state, taskList: result.data });
    });
    promise.catch((err) => {
      console.log(err);
    });
  };
  const renderTaskToDo = () => {
    return state.taskList
      .filter((item) => !item.status)
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
                compleTask(item.taskName);
              }}
              className="complete"
            >
              <i className="far fa-check-circle" />
              <i className="fas fa-check-circle" />
            </button>
          </div>
        </li>
      ));
  };
  const renderTaskToDoDone = () => {
    return state.taskList
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
    let promise = Axios({
      url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    })
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Reject task : ${taskName}`,
          showConfirmButton: false,
          timer: 1500,
        });
        getTaskList();
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Reject thất bại`,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err.response.data);
      });
  };
  const deleTask = (taskName) => {
    let promise = Axios({
      url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    })
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Xóa task thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        getTaskList();
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Xóa task thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err.response.data);
      });
  };
  const compleTask = (taskName) => {
    let promise = Axios({
      url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    })
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Hoàn thành task : ${taskName}`,
          showConfirmButton: false,
          timer: 1500,
        });
        getTaskList();
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Có lỗi xảy ra`,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err.response.data);
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
