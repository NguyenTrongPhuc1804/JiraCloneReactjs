const initialState = {
  listEditProject: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "hello111",
    categoryId: "<p>ajskdbkjasd</p>",
  },
  projectDetail: {},
};

const EditProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_PROJECT": {
      return { ...state, listEditProject: action.projectEditModal };
    }
    case "GET_PROJECT_DETAIL": {
      return { ...state, projectDetail: action.listPjDetail };
    }

    default:
      return { ...state };
  }
};
export default EditProjectReducer;
