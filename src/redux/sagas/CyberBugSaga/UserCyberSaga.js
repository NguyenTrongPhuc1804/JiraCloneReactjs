import axios from "axios";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { baseServices } from "../../../services/baseServices";
import { UserJiraService } from "../../../services/UserJiraService";
import {
  ACCESS_TOKEN,
  DOMAIN_CYBER,
  STATUS_CODE,
} from "../../../util/constants/settingSytem";
import { history } from "../../../util/history";
import { openCustomNotificationWithIcon } from "../../../util/Notification/notificationJira";
import { GET_ALL_PROJECT_SAGA } from "../../constants/CyberBug/CyberBugContants";
import {
  DELETE_USER_JIRA,
  EDIT_USER_INFO,
  EDIT_USER_INFO_SAGA,
  GET_USER_ASSIGN_TASK,
  GET_USER_ASSIGN_TASK_SAGA,
  GET_USER_SAGA_SEARCH,
} from "../../constants/CyberBug/UserJira";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConts";
// -----------getUser manager project--------------
function* getUser(action) {
  try {
    const { data, status } = yield call(() => {
      return UserJiraService.getUser(action.userList);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_USER_SEARCH",
        listUser: data.content,
      });
    }
  } catch (err) {
    console.log("err", err.response.data);
  }
}
export function* watchGetUserSearch() {
  yield takeLatest(GET_USER_SAGA_SEARCH, getUser);
}
// --------------assignUser manager project-----------

function* assignUser(action) {
  try {
    const { data, status } = yield call(() =>
      UserJiraService.assignUser(action.userProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
    }
  } catch (err) {
    console.log("err", err.response.data);
    openCustomNotificationWithIcon(
      "error",
      `${err.response.data.message}`,
      "",
      "topRight"
    );
  }
}
export function* watchAssignUser() {
  yield takeLatest("ASSIGN_USER_PROJECT_SAGA", assignUser);
}
// ---------------- remove User from project-----------

function* removeUserProject(action) {
  try {
    const { data, status } = yield call(() => {
      return UserJiraService.removeUserFromProject(action.userProject);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
    }
  } catch (err) {
    console.log("err", err.response.data);
    openCustomNotificationWithIcon(
      "error",
      `${err.response.data.message}`,
      "",
      "topRight"
    );
  }
}

export function* watchRemoveUSerProject() {
  yield takeLatest("REMOVE_USER_PROJECT_SAGA", removeUserProject);
}

// ----------getProject detail-----------
function* getProjectDetail(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(600);
  try {
    const { data, status } = yield call(() => {
      return UserJiraService.getProjectDetail(action.projectId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL",
        listPjDetail: data.content,
      });
      yield put({
        type: HIDE_LOADING,
      });
    }
  } catch (err) {
    console.log("err", err);
    console.log("404 not found!");
    // history.push("/managerProject");
  }
}

export function* watchGetprojectDetail() {
  yield takeLatest("GET_PROJECT_DETAIL_SAGA", getProjectDetail);
}
// get search user assign task
function* getUSerAssignTask(action) {
  try {
    const { data, status } = yield call(() =>
      UserJiraService.searchAssignUserTask(action.projectId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_ASSIGN_TASK,
        arrUserTask: data.content,
      });
    }
  } catch (err) {
    console.log("err1", err);
    console.log("err", err.response.data);
    if (err.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_ASSIGN_TASK,
        arrUserTask: [],
      });
    }
  }
}

export function* watchGetUserAssignTask() {
  yield takeLatest(GET_USER_ASSIGN_TASK_SAGA, getUSerAssignTask);
}
// delete User
function* deleteUser(action) {
  try {
    const { data, status } = yield call(() =>
      UserJiraService.deleteUser(action.userId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_SAGA_SEARCH,
        userList: "gmail",
      });
      openCustomNotificationWithIcon(
        "success",
        "Delete user success",
        "",
        "topRight"
      );
    }
  } catch (err) {
    console.log("err1", err);
    console.log("err", err.response.data);
  }
}

export function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_JIRA, deleteUser);
}
// edit user
function* editUser(action) {
  console.log("Asdw", action);
  try {
    const { data, status } = yield call(() =>
      UserJiraService.editUser(action.infoUserEdit)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_SAGA_SEARCH,
        userList: "gmail",
      });
      openCustomNotificationWithIcon(
        "success",
        "Edit user success",
        "",
        "topRight"
      );
    }
  } catch (err) {
    console.log("err1", err);
    console.log("err", err.response.data);
  }
}

export function* watchEditUser() {
  yield takeLatest(EDIT_USER_INFO_SAGA, editUser);
}
