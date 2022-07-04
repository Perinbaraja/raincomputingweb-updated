import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_ATTORNEYS,
  GET_ALL_ATTORNEYS,
  GET_ALL_ATTORNEYS_SUCCESS,
  GET_ALL_ATTORNEYS_FAIL,
  GET_ATTORNEYSCOUNT,
  GET_ATTORNEYSCOUNT_SUCCESS,
  GET_ATTORNEYSCOUNT_FAIL,
} from "./actionTypes"

export const getUsers = () => ({
  type: GET_USERS,
})

export const getAttorneys = () => ({
  type: GET_ATTORNEYS,
})

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
})

export const addNewUser = user => ({
  type: ADD_NEW_USER,
  payload: user,
})

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user,
})

export const addUserFail = error => ({
  type: ADD_USER_FAIL,
  payload: error,
})

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
})

export const getUserProfileSuccess = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
})

export const getUserProfileFail = error => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
})

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
})

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
})

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})

export const getAllAttorneys = (page, limit, searchText) => ({
  type: GET_ALL_ATTORNEYS,
  payload: page,
  limit,
  searchText,
})
export const getAllAttorneysSuccess = attorneys => ({
  type: GET_ALL_ATTORNEYS_SUCCESS,
  payload: attorneys,
})
export const getAllAttorneysFail = error => ({
  type: GET_ALL_ATTORNEYS_FAIL,
  payload: error,
})

export const getAttorneysCount = searchText => ({
  type: GET_ATTORNEYSCOUNT,
  payload: searchText,
})
export const getAttorneysCountSuccess = attorneys => ({
  type: GET_ATTORNEYSCOUNT_SUCCESS,
  payload: attorneys,
})
export const getAttorneysCountFail = error => ({
  type: GET_ATTORNEYSCOUNT_FAIL,
  payload: error,
})
