import { GET_PRIORIRY } from "../constants/CyberBug/PriorityContants";

const initialState = {
  priority: [],
};

export const PriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRIORIRY:
      return { ...state, priority: action.priority };

    default:
      return state;
  }
};
