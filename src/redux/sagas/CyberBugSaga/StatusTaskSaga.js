import { call, put, takeLatest } from "redux-saga/effects";
import { StatusService } from "../../../services/StatusService";
import {
  GET_STATUS,
  GET_STATUS_SAGA,
} from "../../constants/CyberBug/StatusTaskContants";

function* getStatus(action) {
  try {
    const { data, status } = yield call(() => StatusService.getStatus());
    yield put({
      type: GET_STATUS,
      status: data.content,
    });
  } catch (err) {
    console.log("err", err.response.data);
  }
}
export function* watchGetStatus() {
  yield takeLatest(GET_STATUS_SAGA, getStatus);
}
