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
};
