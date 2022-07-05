import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER, USER_REGISTER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper"
import { postRegister } from "../../../helpers/backend_helper"
// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  console.log("register")
  try {
    console.log("post call")
    const response = yield call(postRegister, user)
    yield put(registerUserSuccessful(response))
  } catch (error) {
    yield put(registerUserFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
