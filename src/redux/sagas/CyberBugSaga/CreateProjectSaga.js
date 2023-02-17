import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugService";
import { history } from "../../../util/history";
import {
  ACCESS_TOKEN,
  STATUS_CODE,
  USER_LOGIN,
} from "../../../util/constants/settingSytem";
import {
  GET_ALL_PROJECT_SAGA,
  GET_ALL_PROJECT,
  USER_SIGININ_SAGA,
  CREATE_PROJECT_SAGA,
  EDIT_PROJECT_SAGA,
} from "../../constants/CyberBug/CyberBugContants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConts";
import { openCustomNotificationWithIcon } from "../../../util/Notification/notificationJira";
import { GET_USER_ASSIGN_TASK_SAGA } from "../../constants/CyberBug/UserJira";

function* createProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    yield delay(700);
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthen(action.data)
    );
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data.message);
    }
    history.push("/managerProject");
  } catch (err) {
    console.log(err.response.data.message);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchCreateProject() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProject);
}

//Phuc write getAllProjectSaga
function* getAllProject(action) {
  try {
    const { data, status } = yield call(() => {
      return cyberbugsService.getAllProject();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        listProject: data.content,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}
export function* watchGetAllProJect() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProject);
}

// ---------------Phuc write edit project saga -----------
function* editProject(action) {
  yield put({
    type: "CLOSE_MODAL",
  });
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(700);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.editProject(action.data)
    );
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
      openCustomNotificationWithIcon(
        "success",
        "edit project successfully!",
        "",
        "bottomLeft"
      );
    }
  } catch (err) {
    console.log("err", err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchEditProject() {
  yield takeLatest(EDIT_PROJECT_SAGA, editProject);
}
// -------------delete project saga -----------
function* deleteProject(action) {
  yield put({
    type: "CLOSE_MODAL",
  });
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    yield delay(700);
    const { data, status } = yield call(() =>
      cyberbugsService.deleteProject(action.data)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
      openCustomNotificationWithIcon(
        "success",
        "delete project successfully!",
        "",
        "bottomLeft"
      );
    }
  } catch (err) {
    console.log("err", err);
    openCustomNotificationWithIcon(
      "error",
      "delete project fail",
      "",
      "bottomLeft"
    );
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchDeleteProject() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProject);
}
