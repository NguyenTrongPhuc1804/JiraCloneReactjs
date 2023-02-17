import { baseServices } from "./baseServices";

export const StatusService = {
  getStatus: () => baseServices.get(`Status/getAll`),
};
