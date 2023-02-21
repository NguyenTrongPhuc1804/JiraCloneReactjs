import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugService";
import { history } from "../../../util/history";
import {
  ACCESS_TOKEN,
  STATUS_CODE,
  USER_LOGIN,
} from "../../../util/constants/settingSytem";
import {
  SIGN_UP_USER_SAGA,
  USER_SIGININ_SAGA,
} from "../../constants/CyberBug/CyberBugContants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConts";
import { openCustomNotificationWithIcon } from "../../../util/Notification/notificationJira";
import { GET_USER_SAGA_SEARCH } from "../../constants/CyberBug/UserJira";
// signin saga
function* signin(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    yield delay(700);
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
      yield put({
        type: USER_LOGIN,
        userLogin: data.content,
      });
      history.push("/managerProject");
      yield delay(500);

      openCustomNotificationWithIcon(
        "success",
        `Login success`,
        "",
        "topRight"
      );
    }
  } catch (err) {
    console.log(err.response.data.message);
    openCustomNotificationWithIcon(
      "warning",
      `${err.response.data.message}`,
      "",
      "topRight"
    );
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theodoikSignin() {
  yield takeLatest(USER_SIGININ_SAGA, signin);
}
// signUp saga
function* signUp(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    yield delay(600);
    const { data, status } = yield call(() =>
      cyberbugsService.signUpUser(action.infoUser)
    );
    console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      openCustomNotificationWithIcon(
        "success",
        "register success",
        "",
        "topRight"
      );
      yield put({
        type: GET_USER_SAGA_SEARCH,
        userList: "gmail",
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* watchSignUpSaga() {
  yield takeLatest(SIGN_UP_USER_SAGA, signUp);
}
