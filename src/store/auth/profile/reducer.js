import { PROFILE_ERROR, PROFILE_SUCCESS,  RESET_PROFILE_FLAG } from "./actionTypes";

const initialState = {
  error: "",
  success: "",
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    
    
    case PROFILE_ERROR:
      state = { ...state, error: action.payload };
      break;
    case RESET_PROFILE_FLAG:
      state = { ...state, success: null };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
