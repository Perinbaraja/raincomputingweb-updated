import {
  GET_ALL_CHATS,
  GET_ALL_CHATS_FAIL,
  GET_ALL_CHATS_SUCCESS,
  GET_GROUPS,
  GET_GROUPS_FAIL,
  GET_GROUPS_SUCCESS,
  GET_CONTACTS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_MESSAGES,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_SUCCESS,
  POST_ADD_MESSAGE,
  POST_ADD_MESSAGE_FAIL,
  POST_ADD_MESSAGE_SUCCESS,
  CREATE_CHATROOM,
  CREATE_CHATROOM_FAIL,
  CREATE_CHATROOM_SUCCESS,
} from "./actionTypes"

export const getAllChats = userID => ({
  type: GET_ALL_CHATS,
  payload: userID,
})

export const getAllChatsSuccess = chats => ({
  type: GET_ALL_CHATS_SUCCESS,
  payload: chats,
})

export const getAllChatsFail = error => ({
  type: GET_ALL_CHATS_FAIL,
  payload: error,
})

export const createChatRoom = members => ({
  type: CREATE_CHATROOM,
  payload: members,
})

export const createChatRoomSuccess = chatRoom => ({
  type: CREATE_CHATROOM_SUCCESS,
  payload: chatRoom,
})

export const createChatRoomFail = error => ({
  type: CREATE_CHATROOM_FAIL,
  payload: error,
})

export const getGroups = () => ({
  type: GET_GROUPS,
})

export const getGroupsSuccess = groups => ({
  type: GET_GROUPS_SUCCESS,
  payload: groups,
})

export const getGroupsFail = error => ({
  type: GET_GROUPS_FAIL,
  payload: error,
})

export const getContacts = () => ({
  type: GET_CONTACTS,
})

export const getContactsSuccess = contacts => ({
  type: GET_CONTACTS_SUCCESS,
  payload: contacts,
})

export const getContactsFail = error => ({
  type: GET_CONTACTS_FAIL,
  payload: error,
})

export const getMessages = chatRoomId => ({
  type: GET_MESSAGES,
  payload: chatRoomId,
})

export const getMessagesSuccess = messages => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
})

export const getMessagesFail = error => ({
  type: GET_MESSAGES_FAIL,
  payload: error,
})

export const addMessage = message => ({
  type: POST_ADD_MESSAGE,
  message,
})

export const addMessageSuccess = message => ({
  type: POST_ADD_MESSAGE_SUCCESS,
  payload: message,
})

export const addMessageFail = error => ({
  type: POST_ADD_MESSAGE_FAIL,
  payload: error,
})
