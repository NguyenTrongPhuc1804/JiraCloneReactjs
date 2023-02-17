import axios from "axios";
import { DOMAIN } from "../util/constants/settingSytem";

export class TodoListService {
  constructor() {}
  getTaskListAPI = () => {
    return axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: "GET",
    });
  };
  addTaskAPI = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/AddTask`,
      method: "POST",
      data: {
        taskName: taskName,
      },
    });
  };
  deleTaskAPI = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
  };
  doneTask = (taskName) =>
    axios({
      url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });

  rejectTask = (taskName) =>
    axios({
      url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
}
export const todoListService = new TodoListService();
