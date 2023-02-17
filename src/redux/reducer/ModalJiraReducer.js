import React from "react";

const initialState = {
  title: "",
  isModalOpen: false,
  ComponentContentModal: <p>hello modal</p>,
  callbackSubmit: () => {},
};

const ModalJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL": {
      return { ...state, isModalOpen: true };
    }
    case "CLOSE_MODAL": {
      return { ...state, isModalOpen: false };
    }
    case "OPEN_FORM_EDIT": {
      return {
        ...state,
        isModalOpen: true,
        ComponentContentModal: action.ComponentForm,
        title: action.title,
      };
    }
    case "SUBMIT_FORM_EDIT_MODAL": {
      state.callbackSubmit = action.funtionSubmit;
      return { ...state };
    }
    case "CREATE_NEW_TASK_1": {
      return { ...state, callbackSubmit: action.handleSubmit };
    }
    default:
      return { ...state };
  }
};
export default ModalJiraReducer;
