import { baseServices } from "./baseServices";

export const JiraTaskService = {
  getAllProjectTask: () => baseServices.get("Project/getAllProject"),
  getTaskType: () => baseServices.get(`TaskType/getAll`),
  createTask: (newTask) => baseServices.post(`Project/createTask`, newTask),
  getTaskDetail: (idTask) =>
    baseServices.get(`Project/getTaskDetail?taskId=${idTask}`),
  updateStatusTask: (statusId) =>
    baseServices.put(`Project/updateStatus`, statusId),
  editTaskDetail: (taskUpdateApi) =>
    baseServices.post(`Project/updateTask`, taskUpdateApi),
  deleteTask: (taskId) =>
    baseServices.delete(`Project/removeTask?taskId=${taskId}`),
  addComment: (dataComment) =>
    baseServices.post("Comment/insertComment", dataComment),
  deleteComment: (idComment) =>
    baseServices.delete(`Comment/deleteComment?idComment=${idComment}`),
  updateComment: (id, commentContent) =>
    baseServices.put(
      `Comment/updateComment?id=${id}&contentComment=${commentContent}`
    ),
};
