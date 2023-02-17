import {
  GET_TASK_TYPE,
  GET_TASK_TYPE_SAGA,
} from "../constants/CyberBug/JiraBugTaskContants";

const initialState = {
  taskType: [],
};

export const JiraTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_TYPE:
      return { ...state, taskType: action.taskType };

    default:
      return state;
  }
};
