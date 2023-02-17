import { call, put, takeLatest } from "redux-saga/effects";
import { PriorityService } from "../../../services/PriorityService";
import {
  GET_PRIORIRY,
  GET_PRIORIRY_SAGA,
} from "../../constants/CyberBug/PriorityContants";

function* getPrioriry(action) {
  try {
    const { data, status } = yield call(() => PriorityService.getPrioriry());
    yield put({
      type: GET_PRIORIRY,
      priority: data.content,
    });
  } catch (err) {
    console.log("Err", err.response.data);
  }
}
export function* watchGetPriority() {
  yield takeLatest(GET_PRIORIRY_SAGA, getPrioriry);
}
