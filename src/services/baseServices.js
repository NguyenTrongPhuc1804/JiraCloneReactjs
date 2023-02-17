import axios from "axios";
import { ACCESS_TOKEN, DOMAIN_CYBER } from "../util/constants/settingSytem";

export const baseServices = {
  put: (url, modal) =>
    axios({
      url: `${DOMAIN_CYBER}/${url}`,
      method: "PUT",
      data: modal,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }),
  post: (url, modal) =>
    axios({
      url: `${DOMAIN_CYBER}/${url}`,
      method: "POST",
      data: modal,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }),
  get: (url) =>
    axios({
      url: `${DOMAIN_CYBER}/${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }),
  delete: (url, modal) =>
    axios({
      url: `${DOMAIN_CYBER}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }),
};
