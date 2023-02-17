import React, { Component } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
export default class Todolist extends Component {
  state = {
    taskList: [],
    value: {
      taskName: "",
    },
    err: {
      taskName: "",
    },
  };

  getTaskList = (e) => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      //Nếu gọi api lấy về kết quả thành công
      //=> set lại state của component
      this.setState({
        taskList: result.data,
      });
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };

  renderTaskToDo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                onClick={() => {
                  this.deleTask(item.taskName);
                }}
                type="button"
                className="remove"
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                onClick={() => {
                  this.compleTask(item.taskName);
                }}
                className="complete"
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  renderTaskToDoDone = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                onClick={() => {
                  this.deleTask(item.taskName);
                }}
                type="button"
                className="remove"
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                onClick={() => {
                  this.rejTask(item.taskName);
                }}
                className="complete"
              >
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };
  rejTask = (taskName) => {
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
        this.getTaskList();
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
  compleTask = (taskName) => {
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
        this.getTaskList();
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
  deleTask = (taskName) => {
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
        this.getTaskList();
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
  handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    let newValue = { ...this.state.value, [name]: value };
    let newErr = { ...this.state.err };
    this.setState({ ...this.state, value: newValue });
  };
  addTask = (e) => {
    e.preventDefault();
    let promise = Axios({
      url: "https://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: {
        taskName: this.state.value.taskName,
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
      this.getTaskList();
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
  componentDidMount() {
    this.getTaskList();
  }
  render() {
    return (
      <form onSubmit={this.addTask}>
        <button onClick={this.getTaskList}>Get task list</button>
        <div className="card">
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
                  onChange={this.handleChange}
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                />
                <button onClick={this.addTask} id="addItem">
                  <i className="fa fa-plus" />
                </button>
              </div>
              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskToDoDone()}

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
        </div>
      </form>
    );
  }
}
