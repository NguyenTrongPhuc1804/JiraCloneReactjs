import { USER_LOGIN } from "../../util/constants/settingSytem";
import { US_LOGIN } from "../constants/CyberBug/CyberBugContants";
import { GET_USER_ASSIGN_TASK } from "../constants/CyberBug/UserJira";
let inFoUser = {};
if (localStorage.getItem(USER_LOGIN)) {
  inFoUser = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: inFoUser,
  listUS: [],
  arrUserAssign: [],
};

const UserLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case US_LOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case "GET_USER_SEARCH": {
      return { ...state, listUS: action.listUser };
    }
    case GET_USER_ASSIGN_TASK: {
      return { ...state, arrUserAssign: action.arrUserTask };
    }

    default:
      return { ...state };
  }
};

export default UserLoginReducer;
