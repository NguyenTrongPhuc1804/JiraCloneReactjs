import { call, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugService";
import { STATUS_CODE } from "../../../util/constants/settingSytem";
import {
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_SAGA,
} from "../../constants/CyberBug/CyberBugContants";

function* getAllCategory(action) {
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getAllProjectcategory()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_CATEGORY,
        data: data.content,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}

export function* watchGetAllCategory() {
  yield takeLatest(GET_ALL_CATEGORY_SAGA, getAllCategory);
}
