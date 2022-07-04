import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN,UPDATE_PROFILE } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess,profileSuccess } from "./actions"
import { putProfileUpdate } from "../../../helpers/backend_helper"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper"
import { postLogin } from "../../../helpers/backend_helper"
const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, {
      email: user.email,
      password: user.password,
    })
    if (response?.success) {
      console.log(response, "response")
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
      history.push("/contacts-grid")
    } else {
      yield put(apiError(response?.msg))
    }
    console.log(response, "response")
    // /history.push("/contacts-grid")
    //localStorage.setItem("authUser", JSON.stringify(response))
    //yield put(loginSuccess(response))

    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(
    //     fireBaseBackend.loginUser,
    //     user.email,
    //     user.password
    //   )
    //   yield put(loginSuccess(response))
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
    //   const response = yield call(postJwtLogin, {
    //     email: user.email,
    //     password: user.password,
    //   })
    //   localStorage.setItem("authUser", JSON.stringify(response))
    //   yield put(loginSuccess(response))
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
    //   const response = yield call(postLogin, {
    //     email: user.email,
    //     password: user.password,
    //   })
    //   localStorage.setItem("authUser", JSON.stringify(response))
    //   yield put(loginSuccess(response))
    // }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const fireBaseBackend = getFirebaseBackend()
    //   const response = yield call(fireBaseBackend.socialLoginUser, data, type)
    //   localStorage.setItem("authUser", JSON.stringify(response))
    //   yield put(loginSuccess(response))
    // } else {
    //   const response = yield call(postSocialLogin, data)
    //   localStorage.setItem("authUser", JSON.stringify(response))
    //   yield put(loginSuccess(response))
    // }
    // history.push("/contacts-grid")
  } catch (error) {
    yield put(apiError(error))
  }
}
function* updateProfile({ payload: { user } }) {
  console.log(user,"user")
  try {
      const response = yield call(putProfileUpdate,user)
      console.log(response,"put response");
      yield put(profileSuccess(response))
     
  } catch (error) {
    console.log(error,'err');
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(UPDATE_PROFILE, updateProfile)
}

export default authSaga
