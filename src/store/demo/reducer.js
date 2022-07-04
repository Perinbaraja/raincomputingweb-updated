import { GET_DEMO_DATA_SUCCESS, GET_DEMO_DATA_FAIL } from "./actionTypes"

const INIT_STATE = {
  demoData: [],
}

const Demo = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DEMO_DATA_SUCCESS:
      return {
        ...state,
        demoData: action.payload,
      }

    case GET_DEMO_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default Demo
