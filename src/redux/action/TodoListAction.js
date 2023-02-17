import { GET_TASK_API, SET_TASK_API } from "../constants/TodoConstants";
import Axios from "axios";
import Swal from "sweetalert2";
export const getTaskListAPI = () => {
  return async (dispatch) => {
    try {
      let res = await Axios({
        url: "https://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });
      console.log("res", res);
      dispatch({
        type: SET_TASK_API,
        taskList: res.data,
      });
    } catch (err) {
      console.log(err.response.data.Message);
    }
  };
};

export const addTaskAPI = (taskName) => {
  return async (dispatch) => {
    try {
      let promise = await Axios({
        url: "https://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "POST",
        data: {
          taskName: taskName,
        },
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thêm task thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getTaskListAPI());
    } catch (err) {
      console.log("err", err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${err.response.data}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
export const rejTaskAPI = (taskName) => {
  return (dispatch) => {
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
        dispatch(getTaskListAPI());
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err.response.data}`,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err.response.data);
      });
  };
};
export const deleTaskAPI = (taskName) => {
  return (dispatch) => {
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
        dispatch(getTaskListAPI());
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err.response.data}`,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err.response.data);
      });
  };
};
export const compleTaskAPI = (taskName) => {
  return (dispatch) => {
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
        dispatch(getTaskListAPI());
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err.response.data}`,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err.response.data);
      });
  };
};
