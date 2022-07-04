import { takeEvery, put, call, all, fork } from "redux-saga/effects"

// Login Redux States
import { GET_DEMO_DATA } from "./actionTypes"
import { getDemoDataSuccess, getDemoDataFail } from "./actions"

import { getDemoData } from "../../helpers/fakebackend_helper"

function* fetchDemoData() {
  try {
    const response = yield call(getDemoData)
    yield put(getDemoDataSuccess(response))
  } catch (error) {
    yield put(getDemoDataFail(error))
  }
}

export function* watchFetchDemoData() {
  yield takeEvery(GET_DEMO_DATA, fetchDemoData)
}

function* demoSaga() {
  yield all([fork(watchFetchDemoData)])
}

export default demoSaga
