import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States

import { profileSuccess, profileError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeProfile,
  postJwtProfile,
} from "../../../helpers/fakebackend_helper"

 

const fireBaseBackend = getFirebaseBackend()


export function* watchProfile() {
 
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
