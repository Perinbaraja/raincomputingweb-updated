import {
  GET_GROUPS_SUCCESS,
  GET_ALL_CHATS_SUCCESS,
  GET_GROUPS_FAIL,
  GET_ALL_CHATS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  POST_ADD_MESSAGE_SUCCESS,
  POST_ADD_MESSAGE_FAIL,
  CREATE_CHATROOM_SUCCESS,
  CREATE_CHATROOM_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  chats: [],
  groups: [],
  contacts: [],
  messages: [],
  error: {},
  chatRoom: {},
}

const RcChat = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
        chatRoom: action.payload[0],
      }

    case GET_ALL_CHATS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      }

    case GET_GROUPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
      }

    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      }

    case GET_MESSAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case POST_ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }

    case POST_ADD_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case CREATE_CHATROOM_SUCCESS:
      return {
        ...state,
        chatRoom: action.payload,
      }

    case CREATE_CHATROOM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default RcChat
