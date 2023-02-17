import { GET_ALL_CATEGORY } from "../constants/CyberBug/CyberBugContants";

const initialState = {
  arrProjectCategory: [],
};

const ProjectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY: {
      state.arrProjectCategory = action.data;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default ProjectCategoryReducer;
