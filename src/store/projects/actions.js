import {
  GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_DETAIL,
  ADD_NEW_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  GET_PROJECT_DETAIL_FAIL,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_ATTORNEY_DETAIL,
  GET_ATTORNEYDETAIL_SUCCESS,
  GET_ATTORNEYDETAIL_FAIL,
} from "./actionTypes"

export const getAttorneyByid = user => {
  // console.log(user, "actions")
  return {
    type: GET_ATTORNEY_DETAIL,
    payload: { user },
  }
}
//update Attorney Details
export const getAttorneyDetail = () => {
  return {
    type: GET_ATTORNEY_DETAIL,
  }
}
export const getAttorneyDetailSuccess = AttorneyDetail => ({
  type: GET_ATTORNEYDETAIL_SUCCESS,
  payload: AttorneyDetail,
})
export const getAttorneyDetailFail = error => ({
  type: GET_ATTORNEYDETAIL_FAIL,
  payload: error,
})

export const getProjects = () => ({
  type: GET_PROJECTS,
})

export const getProjectsSuccess = projects => ({
  type: GET_PROJECTS_SUCCESS,
  payload: projects,
})

export const addNewProject = project => ({
  type: ADD_NEW_PROJECT,
  payload: project,
})

export const addProjectSuccess = project => ({
  type: ADD_PROJECT_SUCCESS,
  payload: project,
})

export const addProjectFail = error => ({
  type: ADD_PROJECT_FAIL,
  payload: error,
})

export const updateProject = project => ({
  type: UPDATE_PROJECT,
  payload: project,
})

export const updateProjectSuccess = project => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: project,
})

export const updateProjectFail = error => ({
  type: UPDATE_PROJECT_FAIL,
  payload: error,
})

export const deleteProject = project => ({
  type: DELETE_PROJECT,
  payload: project,
})

export const deleteProjectSuccess = project => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: project,
})

export const deleteProjectFail = error => ({
  type: DELETE_PROJECT_FAIL,
  payload: error,
})

export const getProjectsFail = error => ({
  type: GET_PROJECTS_FAIL,
  payload: error,
})

export const getProjectDetail = projectId => ({
  type: GET_PROJECT_DETAIL,
  projectId,
})

export const getProjectDetailSuccess = projectDetails => ({
  type: GET_PROJECT_DETAIL_SUCCESS,
  payload: projectDetails,
})

export const getProjectDetailFail = error => ({
  type: GET_PROJECT_DETAIL_FAIL,
  payload: error,
})
