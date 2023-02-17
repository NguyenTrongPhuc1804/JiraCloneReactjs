import { GET_ALL_PROJECT } from "../constants/CyberBug/CyberBugContants";
import { GET_ALL_PROJECT_TASK } from "../constants/CyberBug/JiraBugTaskContants";

const initialState = {
  listProject: [],
  arrProject: [],
};

const ProjectJiraBugReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT: {
      return { ...state, listProject: action.listProject };
    }
    case GET_ALL_PROJECT_TASK: {
      return { ...state, arrProject: action.arrProject };
    }
    default:
      return { ...state };
  }
};
export default ProjectJiraBugReducer;
