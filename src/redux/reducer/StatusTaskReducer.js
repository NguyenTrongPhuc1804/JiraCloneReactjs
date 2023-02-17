import { GET_STATUS } from "../constants/CyberBug/StatusTaskContants";

const initialState = {
  status: [],
};

export const StatusTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUS:
      return { ...state, status: action.status };

    default:
      return state;
  }
};
