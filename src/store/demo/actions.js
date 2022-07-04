import {
  GET_DEMO_DATA,
  GET_DEMO_DATA_SUCCESS,
  GET_DEMO_DATA_FAIL,
} from "./actionTypes"

export const getDemoData = () => ({
  type: GET_DEMO_DATA,
})

export const getDemoDataSuccess = data => ({
  type: GET_DEMO_DATA_SUCCESS,
  payload: data,
})

export const getDemoDataFail = error => ({
  type: GET_DEMO_DATA_FAIL,
  payload: error,
})
