import React, { useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import PropTypes from "prop-types"

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [notiSelectedRoomID, setNotiSelectedRoomID] = useState("1")
  const user = JSON.parse(localStorage.getItem("authUser"))
  const socket = user
    ? io("https://rainapi.azurewebsites.net/", {
        query: { id: user.userID },
      })
    : null

  const handleNotifications = currentRoomId => {
    const filteredNoti = notifications.filter(
      n => n.chatRoomId !== currentRoomId
    )
    setNotifications(filteredNoti)
  }
  useEffect(() => {
    const filteredNoti = notifications.filter(
      n => n.notiSelectedRoomID !== notiSelectedRoomID
    )
    setNotifications(filteredNoti)
  }, [notiSelectedRoomID])
  return (
    <SocketContext.Provider
      value={{ socket, notifications, setNotifications, handleNotifications }}
    >
      {children}
    </SocketContext.Provider>
  )
}

SocketProvider.propTypes = {
  children: PropTypes.any,
}
