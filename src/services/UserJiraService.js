import { baseServices } from "./baseServices";

export const UserJiraService = {
  getUser: (userName) => baseServices.get(`Users/getUser?keyword=${userName}`),
  assignUser: (data) => baseServices.post(`Project/assignUserProject`, data),
  removeUserFromProject: (userProject) =>
    baseServices.post(`Project/removeUserFromProject`, userProject),
  getProjectDetail: (projectId) =>
    baseServices.get(`Project/getProjectDetail?id=${projectId}`),
  searchAssignUserTask: (idProject) =>
    baseServices.get(`Users/getUserByProjectId?idProject=${idProject}`),
};
