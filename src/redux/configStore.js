import { applyMiddleware, combineReducers, createStore } from "redux";
import TodoListReducer from "./reducer/TodoListReducer";
import LoadingReducer from "./reducer/LoadingReducer";
import reduxThunk from "redux-thunk";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import ModalReducer from "./reducer/ModalReducer";
import HistoryReducer from "./reducer/HistoryRecucer";
import UserLoginReducer from "./reducer/UserLoginReducer";
import ProjectCategoryReducer from "./reducer/ProjectCategoryReducer";
import ProjectJiraBugReducer from "./reducer/ProjectJiraBugReducer";
import ModalJiraReducer from "./reducer/ModalJiraReducer";
import EditProjectReducer from "./reducer/EditProjectReducer";
import { JiraTaskReducer } from "./reducer/JiraTaskReducer";
import { PriorityReducer } from "./reducer/PriorityReducer";
import { StatusTaskReducer } from "./reducer/StatusTaskReducer";
import { TaskReducer } from "./reducer/TaskReducer";
const rootReducer = combineReducers({
  TodoListReducer,
  LoadingReducer,
  ModalReducer,
  HistoryReducer,
  UserLoginReducer,
  ProjectCategoryReducer,
  ProjectJiraBugReducer,
  ModalJiraReducer,
  EditProjectReducer,
  JiraTaskReducer,
  PriorityReducer,
  StatusTaskReducer,
  TaskReducer,
});
const middleSaga = createMiddleWareSaga();

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleSaga));
middleSaga.run(rootSaga);
export default store;
