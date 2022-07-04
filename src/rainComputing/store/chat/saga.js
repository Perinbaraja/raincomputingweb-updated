import { takeEvery, put, call } from "redux-saga/effects"
import { GET_ALL_CHATS, CREATE_CHATROOM, GET_MESSAGES } from "./actionTypes"
import {
  getAllChats,
  createChatRoom,
  getMessages,
} from "helpers/backend_helper"
import {
  getAllChatsFail,
  getAllChatsSuccess,
  createChatRoomSuccess,
  createChatRoomFail,
  getMessagesFail,
  getMessagesSuccess,
} from "./actions"

function* onGetAllChats({ payload: userID }) {
  try {
    const response = yield call(getAllChats, { userID })

    if (response.success) {
      yield put(getAllChatsSuccess(response.chats))
    } else {
      yield put(getAllChatsFail(response.msg))
    }
  } catch (error) {
    yield put(getAllChatsFail(error))
  }
}
function* onCreateChatRoom({ payload: members }) {
  try {
    const response = yield call(createChatRoom, { members })

    if (response.success) {
      yield put(createChatRoomSuccess(response.room))
    } else {
      yield put(createChatRoomFail(response.msg))
    }
  } catch (error) {
    yield put(createChatRoomFail(error))
  }
}

function* onGetMessages({ payload: chatRoomId }) {
  try {
    const response = yield call(getMessages, { chatRoomId })
    if (response.success) {
      yield put(getMessagesSuccess(response.messages))
    } else {
      yield put(getMessagesFail(response.msg))
    }
  } catch (error) {
    yield put(getMessagesFail(response.msg))
  }
}

function* rcChatSaga() {
  yield takeEvery(GET_ALL_CHATS, onGetAllChats)
  yield takeEvery(CREATE_CHATROOM, onCreateChatRoom)
  yield takeEvery(GET_MESSAGES, onGetMessages)
}

export default rcChatSaga
