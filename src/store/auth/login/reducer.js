import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  UPDATE_PROFILE,
  USER_PROFILE_SUCCESS
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  authUser:{},
  updateUser:{},
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        authUser:action.payload,
        loading: false,
      }
      break
      case USER_PROFILE_SUCCESS:
        state = {
          ...state,
          authUser:action.payload,
          loading: false,
        }
      break;
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
      case UPDATE_PROFILE:
      state = { ...state };
      break;
     
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
