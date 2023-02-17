import { baseServices } from "./baseServices";

export const PriorityService = {
  getPrioriry: () => baseServices.get(`Priority/getAll`),
};
