import React from "react";

const initialState = {
  title: "",
  isModalOpen: false,
  ComponentContentModal: <p>hello modal</p>,
  register: false,
  callbackSubmit: () => {},
  userInfo: {
    userId: 0,
    email: "string",
    name: "string",
    phoneNumber: "string",
  },
};

const ModalJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL": {
      return { ...state, isModalOpen: true };
    }
    case "CLOSE_MODAL": {
      return { ...state, isModalOpen: false, register: false };
    }
    case "OPEN_FORM_EDIT": {
      return {
        ...state,
        isModalOpen: true,
        ComponentContentModal: action.ComponentForm,
        title: action.title,
        register: action.register,
        userInfo: action.userInfo,
      };
    }
    case "SUBMIT_FORM_EDIT_MODAL": {
      state.callbackSubmit = action.funtionSubmit;
      // state.isModalOpen = false;

      return { ...state };
    }
    case "CREATE_NEW_TASK_1": {
      return {
        ...state,
        callbackSubmit: action.handleSubmit,
        // isModalOpen: false,
      };
    }
    case "CREAT_NEW_USER_MANAGEMENT": {
      return {
        ...state,
        callbackSubmit: action.handleSubmit,
        // isModalOpen: false,
      };
    }
    case "EDIT_USER_INFO": {
      return {
        ...state,
        callbackSubmit: action.handleSubmit,
        // isModalOpen: false,
      };
    }
    default:
      return { ...state };
  }
};
export default ModalJiraReducer;
