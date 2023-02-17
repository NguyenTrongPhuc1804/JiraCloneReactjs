import axios from "axios";
import {
  take,
  fork,
  takeEvery,
  delay,
  takeLatest,
  call,
  put,
} from "redux-saga/effects";
import {
  TodoListService,
  todoListService,
} from "../../services/TodoListService";
import { STATUS_CODE } from "../../util/constants/settingSytem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConts";
import {
  ADD_TASK_API,
  CHECK_TASK_API,
  DELETE_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_API,
  REJECT_TASK_API,
  SET_TASK_API,
} from "../constants/TodoConstants";
// Phuc viet chuc nang getTask 1/15/2023
//Action lay tu API
function* getTaskList(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    let { data, status } = yield call(todoListService.getTaskListAPI);
    yield delay(700);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("err");
    }
  } catch (err) {
    console.log("err", err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theodoiActionTodo() {
  yield takeLatest(GET_TASKLIST_API, getTaskList);
}

// Phuc viet chuc nang addTask 1/15/2023
//Action lay tu API
function* addTask(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() =>
      todoListService.addTaskAPI(taskName)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log("Err", err);
  }
}

export function* theodoiActionAddTask() {
  yield takeLatest(ADD_TASK_API, addTask);
}
// Phuc viet chuc nang deleteTask 1/15/2023
//Action lay tu API

function* deleTask(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() =>
      todoListService.deleTaskAPI(taskName)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}

export function* theodoiDeleTask() {
  yield takeLatest(DELETE_TASK_API, deleTask);
}

// Phuc viet chuc nang checkTask 1/15/2023
//Action lay tu API
function* checkTask(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() =>
      todoListService.doneTask(taskName)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}
export function* theodoiCheckTask() {
  yield takeLatest(CHECK_TASK_API, checkTask);
}

// Phuc viet chuc nang rejectTask 1/15/2023
//Action lay tu API

function* rejectTask(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() =>
      todoListService.rejectTask(taskName)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}
export function* theodoiRejectTask() {
  yield takeLatest(REJECT_TASK_API, rejectTask);
}
