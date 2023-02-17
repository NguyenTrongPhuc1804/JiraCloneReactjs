import axios from "axios";
import { ACCESS_TOKEN, DOMAIN_CYBER } from "../util/constants/settingSytem";
import { baseServices } from "./baseServices";
export const cyberbugsService = {
  // sihnIn user
  signinCyberBugs: (userLogin) => {
    return axios({
      url: `${DOMAIN_CYBER}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
  getAllProjectcategory: () =>
    axios({
      url: `${DOMAIN_CYBER}/ProjectCategory`,
      method: "GET",
    }),
  // createProject: (newProject) =>
  //   axios({
  //     url: `${DOMAIN_CYBER}/Project/createProject`,
  //     method: "POST",
  //     data: newProject,
  //   }),
  createProjectAuthen: (newProject) =>
    axios({
      url: `${DOMAIN_CYBER}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    }),
  getAllProject: () => baseServices.get(`Project/getAllProject`),
  // axios({
  //   url: `${DOMAIN_CYBER}/Project/getAllProject`,
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  //   },
  // }),
  editProject: (editProject) =>
    axios({
      url: `${DOMAIN_CYBER}/Project/updateProject?projectId=${editProject.id}`,
      method: "PUT",
      data: editProject,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    }),
  deleteProject: (projectId) =>
    baseServices.delete(`Project/deleteProject?projectId=${projectId}`),
  signUpUser: (infoUser) => baseServices.post("Users/signup", infoUser),
};
