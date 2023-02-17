import { USER_SIGININ_SAGA } from "../../constants/CyberBug/CyberBugContants";

export const actionSignin = (email, password, navigate) => {
  return {
    type: USER_SIGININ_SAGA,
    userLogin: {
      email: email,
      password: password,
    },
    navigate,
  };
};
