import { all } from "redux-saga/effects";
import { theodoikSignin, watchSignUpSaga } from "./CyberBugSaga/CyberBusSaga";
import {
  theodoiActionAddTask,
  theodoiActionTodo,
  theodoiCheckTask,
  theodoiDeleTask,
  theodoiRejectTask,
} from "./TodoListSaga";
import { watchGetAllCategory } from "./CyberBugSaga/ProjectCategorySaga";
import {
  watchCreateProject,
  watchDeleteProject,
  watchEditProject,
  watchGetAllProJect,
} from "./CyberBugSaga/CreateProjectSaga";
import {
  watchAssignUser,
  watchDeleteUser,
  watchEditUser,
  watchGetprojectDetail,
  watchGetUserAssignTask,
  watchGetUserSearch,
  watchRemoveUSerProject,
} from "./CyberBugSaga/UserCyberSaga";
import {
  watchAddComment,
  watchCreateTask,
  watchDeleteComment,
  watchDeleteTask,
  watchEditTaskApi,
  watchGetAllProjectTask,
  watchGetTaskDetail,
  watchGetTaskType,
  watchUpdateComment,
  watchUpdateStatusTask,
} from "./CyberBugSaga/CreateTaskSaga";
import { watchGetPriority } from "./CyberBugSaga/PrioritySaga";
import { watchGetStatus } from "./CyberBugSaga/StatusTaskSaga";

export function* rootSaga() {
  yield all([
    theodoiActionTodo(),
    theodoiActionAddTask(),
    theodoiDeleTask(),
    theodoiCheckTask(),
    theodoiRejectTask(),

    // -----Jira BUg
    theodoikSignin(),
    watchGetAllCategory(),
    watchCreateProject(),
    watchGetAllProJect(),
    watchEditProject(),
    watchDeleteProject(),
    watchGetUserSearch(),
    watchAssignUser(),
    watchRemoveUSerProject(),
    watchGetprojectDetail(),
    // task Jira
    watchGetAllProjectTask(),
    watchGetTaskType(),
    watchCreateTask(),
    // priority
    watchGetPriority(),
    // get status
    watchGetUserAssignTask(),
    watchGetStatus(),
    // get task detail
    watchGetTaskDetail(),
    // update status task
    watchUpdateStatusTask(),
    // signUp user
    watchSignUpSaga(),
    // eidt task api
    watchEditTaskApi(),
    watchDeleteTask(),
    watchAddComment(),
    watchDeleteComment(),
    watchUpdateComment(),
    watchDeleteUser(),
    watchEditUser(),
  ]);
}
