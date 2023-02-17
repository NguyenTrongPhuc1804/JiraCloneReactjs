import { call, put, select, takeLatest } from "redux-saga/effects";
import { JiraTaskService } from "../../../services/JiraTaskService";
import { STATUS_CODE } from "../../../util/constants/settingSytem";
import {
  CREAT_NEW_TASK_SAGA,
  EDIT_TASK_API,
  GET_ALL_PROJECT_TASK,
  GET_ALL_PROJECT_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  GET_TASK_TYPE,
  GET_TASK_TYPE_SAGA,
  REMOVE_ASSIGNESS,
  UPDATE_ASSIGNESS,
  UPDATE_STATUS_SAGA,
  UPDATE_TASK,
} from "../../constants/CyberBug/JiraBugTaskContants";
import { GET_USER_ASSIGN_TASK_SAGA } from "../../constants/CyberBug/UserJira";

function* getAllProjectTask(action) {
  try {
    const { data, status } = yield call(() =>
      JiraTaskService.getAllProjectTask()
    );
    yield put({
      type: GET_ALL_PROJECT_TASK,
      arrProject: data.content,
    });
    yield put({
      type: GET_USER_ASSIGN_TASK_SAGA,
      projectId: data.content[data.content.length - 1].id,
    });
  } catch (err) {
    console.log("err", err.response.data);
  }
}

export function* watchGetAllProjectTask() {
  yield takeLatest(GET_ALL_PROJECT_TASK_SAGA, getAllProjectTask);
}
// get task type
function* getTaskType(action) {
  try {
    const { data, status } = yield call(() => JiraTaskService.getTaskType());

    yield put({
      type: GET_TASK_TYPE,
      taskType: data.content,
    });
  } catch (err) {
    console.log("err", err.response.data);
  }
}
export function* watchGetTaskType() {
  yield takeLatest(GET_TASK_TYPE_SAGA, getTaskType);
}

// create task
function* createTask(action) {
  try {
    const { data, status } = yield call(() =>
      JiraTaskService.createTask(action.newTask)
    );
    if (status == STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId: action.newTask.projectId,
      });
    }
    console.log("task", action);
  } catch (err) {
    console.log("err", err.response.data);
  }
}
export function* watchCreateTask() {
  yield takeLatest(CREAT_NEW_TASK_SAGA, createTask);
}
// get taskDetail

function* getTaskDetail(action) {
  try {
    const { data, status } = yield call(() =>
      JiraTaskService.getTaskDetail(action.idTask)
    );

    if (status == STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL,
        taskDetailModal: data.content,
      });
    }
  } catch (err) {
    console.log("err", err.response.data);
  }
}
export function* watchGetTaskDetail() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}
// update status task
function* updateStatusTask(action) {
  console.log("ac", action);
  try {
    const { data, status } = yield call(() =>
      JiraTaskService.updateStatusTask(action.data)
    );

    if (status == STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId: action.projectId,
      });
    }
  } catch (err) {
    console.log("err", err.response.data);
  }
}
export function* watchUpdateStatusTask() {
  yield takeLatest(UPDATE_STATUS_SAGA, updateStatusTask);
}

function* EditTaskApi(action) {
  switch (action.actionType) {
    case UPDATE_TASK: {
      const { name, value } = action;
      yield put({
        type: UPDATE_TASK,
        name,
        value,
      });
      break;
    }
    case UPDATE_ASSIGNESS:
      {
        const { userSelect } = action;
        yield put({
          type: UPDATE_ASSIGNESS,
          userSelect,
        });
      }
      break;
    case REMOVE_ASSIGNESS:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_ASSIGNESS,
          userId,
        });
      }
      break;

    default:
      break;
  }
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  const listUserAsign = taskDetailModal.assigness.map((item) => item.id);
  const taskDetailModalUpdate = {
    ...taskDetailModal,
    listUserAsign,
  };
  console.log("task", taskDetailModalUpdate);

  try {
    const { data, status } = yield call(() =>
      JiraTaskService.editTaskDetail(taskDetailModalUpdate)
    );
    if (status == STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        idTask: taskDetailModalUpdate.taskId,
      });
      yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId: taskDetailModalUpdate.projectId,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* watchEditTaskApi() {
  yield takeLatest(EDIT_TASK_API, EditTaskApi);
}
