import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_USERS,
  GET_USER_PROFILE,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_ATTORNEYS,
  GET_ALL_ATTORNEYS,
  GET_ATTORNEYSCOUNT,
} from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
  getAttorneys,
  getAllAttorneysSuccess,
  getAllAttorneysFail,
  getAttorneysCountSuccess,
  getAttorneysCountFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getUsers,
  getUserProfile,
  addNewUser,
  updateUser,
  deleteUser,
} from "../../helpers/fakebackend_helper"

import {
  getAttorneysData,
  postRegister,
  postLogin,
  getAllAttorneys,
  postUpdate,
  getAttorneysCount,

} from "../../helpers/backend_helper"

function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess(response))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user)
    yield put(updateUserSuccess(response))
  } catch (error) {
    yield put(updateUserFail(error))
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(response))
  } catch (error) {
    yield put(deleteUserFail(error))
  }
}

function* onAddNewUser({ payload: user }) {
  try {
    const response = yield call(addNewUser, user)

    yield put(addUserSuccess(response))
  } catch (error) {
    yield put(addUserFail(error))
  }
}

function* onGetAttorneys() {
  try {
    const response = yield call(getAttorneysData)
    yield put(getUsersSuccess(response))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* onGetAllAttorneys({ payload: page, limit, searchText }) {
  try {
    const response = yield call(getAllAttorneys, { page, limit, searchText })
    if (response.success) {
      yield put(getAllAttorneysSuccess(response.attorneys))
    } else {
      yield put(getAllAttorneysFail(response))
    }
  } catch (error) {
    yield put(getAllAttorneysFail(error))
  }
}

function* onGetAttorneysCount({ payload: searchText }) {
  try {
    const response = yield call(getAttorneysCount, { searchText })
    if (response.success) {
      yield put(getAttorneysCountSuccess(response.count))
    } else {
      yield put(getAttorneysCountFail(response))
    }
  } catch (error) {
    yield put(getAttorneysCountFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
  yield takeEvery(GET_ATTORNEYS, onGetAttorneys)
  yield takeEvery(GET_ALL_ATTORNEYS, onGetAllAttorneys)
  yield takeEvery(GET_ATTORNEYSCOUNT, onGetAttorneysCount)
}

export default contactsSaga
