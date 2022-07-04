import React, { useCallback, useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import io from "socket.io-client"

import { isEmpty, map } from "lodash"
import moment from "moment"
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import classnames from "classnames"

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import images from "assets/images"
import {
  addMessage as onAddMessage,
  getChats as onGetChats,
  getContacts as onGetContacts,
  getGroups as onGetGroups,
  getMessages as onGetMessages,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

//
import { getAttorneyByid as onGetAttorneyDetails } from "store/projects/actions"
import { useLocation, withRouter } from "react-router-dom"
import { post } from "helpers/api_helper"
import { GET_PRIVATECHAT } from "helpers/url_helper"
import { GET_ALLUSER } from "helpers/url_helper"

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

const Chat = props => {
  const dispatch = useDispatch()

  let query = useQuery()
  const user = JSON.parse(localStorage.getItem("authUser"))

  const [socket, setSocket] = useState(() => {
    return io("https://rainapi.azurewebsites.net", {
      query: { id: user.userID },
    })
  })

  const [messageList, setMessageList] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")

  const { groups, contacts, messages, project, state } = useSelector(state => ({
    project: state.projects.attorney.msg,

    // chats: state.chat.chats,
    groups: state.chat.groups,
    contacts: state.chat.contacts,
    messages: state.chat.messages,
    state: state,
  }))
  // console.log("perinbaraja", state)
  const [messageBox, setMessageBox] = useState(null)

  const [currentRoomId, setCurrentRoomId] = useState(1)

  const [menu1, setMenu1] = useState(false)
  const [search_Menu, setsearch_Menu] = useState(false)
  const [settings_Menu, setsettings_Menu] = useState(false)
  const [other_Menu, setother_Menu] = useState(false)
  const [activeTab, setactiveTab] = useState("1")
  const [Chat_Box_Username, setChat_Box_Username] = useState("Steven Franklin")
  // eslint-disable-next-line no-unused-vars
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online")
  const [curMessage, setcurMessage] = useState("")
  const [username, setusername] = useState("")

  const [ioMessages, setIoMessages] = useState([])
  const [allUser, setAllUser] = useState([])
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    dispatch(onGetChats())
    dispatch(onGetGroups())
    dispatch(onGetContacts())
    dispatch(onGetMessages(currentRoomId))
  }, [onGetChats, onGetGroups, onGetContacts, onGetMessages, currentRoomId])

  useEffect(() => {
    if (!isEmpty(ioMessages)) scrollToBottom()
  }, [ioMessages])

  useEffect(() => {
    // console.log(username, "username")
    // const socket = io.connect("http://localhost:5100")

    dispatch(onGetAttorneyDetails({ objectId: query.get("uid") }))
    // console.log("project", project)

    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      setusername(obj.username)
    }
  }, [])

  const handleAddMessage = () => {
    console.log("receiver : ", selectedUser._id)
    console.log("sender : ", user.userID)

    if (curMessage) {
      // const obj = JSON.parse(localStorage.getItem("authUser"))

      const msgData = {
        receiver: selectedUser._id,

        message: curMessage,
        sender: user.userID,
        createdAt: new Date(Date.now()),
      }
      socket.emit("send_message", msgData)
      setIoMessages([...ioMessages, msgData])
      setcurMessage("")
    }
  }
  console.log("messagedata", ioMessages)
  // console.log("selecteduser", selectedUser)

  useEffect(() => {
    if (socket == null) return

    socket.off("receive_message").on("receive_message", props => {
      console.log("receiver props", props)
      console.log("selectedUser._id", selectedUser._id)
      if (props.sender === selectedUser._id) {
        console.log("sending message")

        setIoMessages([...ioMessages, props])
      }

      // console.log("ioMessages in", ioMessages)
    })
  }, [socket, handleAddMessage])

  //

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu)
  }

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu)
  }

  const toggleOther = () => {
    setother_Menu(!other_Menu)
  }

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  //Use For Chat Box
  const userChatOpen = (_id, username, status, roomId) => {
    setChat_Box_Username(username)
    setCurrentRoomId(roomId)
    dispatch(onGetMessages(roomId))
  }

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000
    }
  }

  const onKeyPress = e => {
    const { key, value } = e
    if (key === "Enter") {
      handleAddMessage(value)
    }
  }

  //serach recent user
  const searchUsers = () => {
    var input, filter, ul, li, a, i, txtValue
    input = document.getElementById("search-user")
    filter = input.value.toUpperCase()
    ul = document.getElementById("recent-list")
    li = ul.getElementsByTagName("li")
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0]
      txtValue = a.textContent || a.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = ""
      } else {
        li[i].style.display = "none"
      }
    }
  }

  useEffect(() => {
    const payload = {
      sender: user.userID,
      receiver: selectedUser._id,
    }
    console.log("payload", payload)
    const getPrivateChat = async () => {
      const res = await post(GET_PRIVATECHAT, payload)
      const { messages } = res

      setIoMessages(messages)
    }

    getPrivateChat()
  }, [selectedUser])

  useEffect(() => {
    const payload = { userID: user.userID }

    const getAllUser = async () => {
      const res = await post(GET_ALLUSER, payload)
      const { users } = res
      if (users) {
        setAllUser(users)
        setSelectedUser(users[0])
      }
    }
    getAllUser()
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Rain | Rain - Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Rain" breadcrumbItem="Chat" />

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar me-lg-4">
                  <div className="">
                    <div className="py-4 border-bottom">
                      <div className="d-flex">
                        <div className="align-self-center me-3">
                          <img
                            src={images.avatar2}
                            className="avatar-xs rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="font-size-15 mt-0 mb-1">{username}</h5>
                          <p className="text-muted mb-0">
                            <i className="mdi mdi-circle text-success align-middle me-1" />
                            Active
                          </p>
                        </div>

                        <Dropdown
                          isOpen={menu1}
                          toggle={() => setMenu1(!menu1)}
                          className="float-end ms-2"
                        >
                          <DropdownToggle tag="i" className="text-muted">
                            <i className="mdi mdi-dots-horizontal font-size-18"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem href="#">Action</DropdownItem>
                            <DropdownItem href="#">Another action</DropdownItem>
                            <DropdownItem href="#">Something else</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="search-box chat-search-box py-4">
                      <div className="position-relative">
                        <Input
                          onKeyUp={searchUsers}
                          id="search-user"
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>

                    <div className="chat-leftsidebar-nav ">
                      <Nav pills justified>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggleTab("1")
                            }}
                          >
                            <i className="bx bx-chat font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block ">Chat</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggleTab("2")
                            }}
                          >
                            <i className="bx bx-group font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Groups</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "3",
                            })}
                            onClick={() => {
                              toggleTab("3")
                            }}
                          >
                            <i className="bx bx-book-content font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Contacts</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab} className="py-4 ">
                        <TabPane tabId="1">
                          <div>
                            <h5 className="font-size-14 mb-3">Recent</h5>
                            <ul
                              className="list-unstyled chat-list"
                              id="recent-list"
                            >
                              {/* <PerfectScrollbar style={{ height: "410px" }}>
                                {map(chats, chat => (
                                  <li
                                    key={chat.id + chat.status}
                                    className={
                                      currentRoomId === chat.roomId
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        userChatOpen(
                                          chat.id,
                                          chat.name,
                                          chat.status,
                                          chat.roomId
                                        )
                                      }}
                                    >
                                      <div className="d-flex">
                                        <div className="align-self-center me-3">
                                          <i
                                            className={
                                              chat.status === "online"
                                                ? "mdi mdi-circle text-success font-size-10"
                                                : chat.status === "intermediate"
                                                ? "mdi mdi-circle text-warning font-size-10"
                                                : "mdi mdi-circle font-size-10"
                                            }
                                          />
                                        </div>
                                        <div className="align-self-center me-3">
                                          <img
                                            src={images[chat.image]}
                                            className="rounded-circle avatar-xs"
                                            alt=""
                                          />
                                        </div>

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {chat.name}
                                          </h5>
                                          <p className="text-truncate mb-0">
                                            {chat.description}
                                          </p>
                                        </div>
                                        <div className="font-size-11">
                                          {chat.time}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar> */}
                            </ul>
                          </div>
                        </TabPane>

                        <TabPane tabId="2">
                          <h5 className="font-size-14 mb-3">Group</h5>
                          <ul className="list-unstyled chat-list">
                            <PerfectScrollbar style={{ height: "410px" }}>
                              {groups &&
                                groups.map(group => (
                                  <li key={"test" + group.image}>
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        userChatOpen(
                                          group.id,
                                          group.name,
                                          group.status,
                                          Math.floor(Math.random() * 100)
                                        )
                                      }}
                                    >
                                      <div className="d-flex align-items-center">
                                        <div className="avatar-xs me-3">
                                          <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                            {group.image}
                                          </span>
                                        </div>

                                        <div className="flex-grow-1">
                                          <h5 className="font-size-14 mb-0">
                                            {group.name}
                                          </h5>
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                            </PerfectScrollbar>
                          </ul>
                        </TabPane>

                        <TabPane tabId="3">
                          <h5 className="font-size-14 mb-3">Contact</h5>

                          <PerfectScrollbar style={{ height: "410px" }}>
                            {allUser &&
                              allUser.map((users, i) => (
                                <ul key={i} className="list-unstyled chat-list">
                                  <li>
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        console.log(users)
                                        setSelectedUser(users)
                                      }}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <h5 className="font-size-14 mb-0">
                                          {users.firstname} {users.lastname}
                                        </h5>
                                        <i className="font-size-24 bx bx-plus-circle" />
                                      </div>
                                    </Link>
                                  </li>
                                </ul>
                              ))}
                          </PerfectScrollbar>

                          {/* <PerfectScrollbar style={{ height: "410px" }}>
                              {contacts &&
                                contacts.map(contact => (
                                  <div
                                    key={"test_" + contact.category}
                                    className={
                                      contact.category === "A" ? "" : "mt-4"
                                    }
                                  >
                                    <div className="avatar-xs mb-3">
                                      <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                        {contact.category}
                                      </span>
                                    </div>

                                    <ul className="list-unstyled chat-list">
                                      {contact.child.map(array => (
                                        <li key={"test" + array.id}>
                                          <Link
                                            to="#"
                                            onClick={() => {
                                              userChatOpen(
                                                array.id,
                                                array.name,
                                                array.status,
                                                Math.floor(Math.random() * 100)
                                              )
                                            }}
                                          >
                                            <h5 className="font-size-14 mb-0">
                                              {array.name}
                                            </h5>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                            </PerfectScrollbar> */}
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </div>
                <div className="w-100 user-chat">
                  <Card>
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            {/* {project?.firstname} {project?.lastname}{" "}
                            {project?.initial} */}
                            {selectedUser.firstname} {selectedUser.lastname}
                          </h5>

                          <p className="text-muted mb-0">
                            <i
                              className={
                                Chat_Box_User_Status === "online"
                                  ? "mdi mdi-circle text-success align-middle me-1"
                                  : Chat_Box_User_Status === "intermediate"
                                  ? "mdi mdi-circle text-warning align-middle me-1"
                                  : "mdi mdi-circle align-middle me-1"
                              }
                            />
                            {Chat_Box_User_Status}
                          </p>
                        </Col>
                        <Col md="8" xs="3">
                          <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={search_Menu}
                                toggle={toggleSearch}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-search-alt-2" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-md">
                                  <Form className="p-3">
                                    <FormGroup className="m-0">
                                      <InputGroup>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search ..."
                                          aria-label="Recipient's username"
                                        />
                                        {/* <InputGroupAddon addonType="append"> */}
                                        <Button color="primary" type="submit">
                                          <i className="mdi mdi-magnify" />
                                        </Button>
                                        {/* </InputGroupAddon> */}
                                      </InputGroup>
                                    </FormGroup>
                                  </Form>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item  d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={settings_Menu}
                                toggle={toggleSettings}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-cog" />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem href="#">
                                    View Profile
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    Clear chat
                                  </DropdownItem>
                                  <DropdownItem href="#">Muted</DropdownItem>
                                  <DropdownItem href="#">Delete</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item">
                              <Dropdown
                                isOpen={other_Menu}
                                toggle={toggleOther}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-dots-horizontal-rounded" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem href="#">Action</DropdownItem>
                                  <DropdownItem href="#">
                                    Another Action
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    Something else
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>

                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <PerfectScrollbar
                            style={{ height: "310px" }}
                            containerRef={ref => setMessageBox(ref)}
                          >
                            <li>
                              <div className="chat-day-title">
                                <span className="title">Today</span>
                              </div>
                            </li>

                            {ioMessages &&
                              ioMessages.map((message, i) => (
                                <li
                                  key={"test_k" + i}
                                  style={{
                                    textAlign:
                                      message.sender == user.userID
                                        ? "right"
                                        : "",
                                  }}
                                >
                                  <div className="conversation-list">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        href="#"
                                        className="btn nav-btn"
                                        tag="i"
                                      >
                                        <i className="bx bx-dots-vertical-rounded" />
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem href="#">
                                          Copy
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Save
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Forward
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Delete
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {message.sender == user.userID
                                          ? username
                                          : selectedUser.firstname +
                                            " " +
                                            selectedUser.lastname}
                                      </div>
                                      <p>{message.message}</p>
                                      <p className="chat-time mb-0">
                                        <i className="bx bx-time-five align-middle me-1" />
                                        {moment(message.createdAt).format(
                                          "DD-MM-YY hh:mm"
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <Row>
                          <Col>
                            <div className="position-relative">
                              <input
                                type="text"
                                value={curMessage}
                                onKeyPress={onKeyPress}
                                onChange={e => setcurMessage(e.target.value)}
                                className="form-control chat-input"
                                placeholder="Enter Message..."
                              />
                              <div className="chat-input-links">
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-emoticon-happy-outline"
                                        id="Emojitooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Emojitooltip"
                                      >
                                        Emojis
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-image-outline"
                                        id="Imagetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Imagetooltip"
                                      >
                                        Images
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-document-outline"
                                        id="Filetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Filetooltip"
                                      >
                                        Add Files
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col className="col-auto">
                            <Button
                              type="button"
                              color="primary"
                              // onClick={() =>
                              //   addMessage(currentRoomId, username)
                              // }
                              onClick={() => handleAddMessage()}
                              on
                              className="btn btn-primary btn-rounded chat-send w-md "
                            >
                              <span className="d-none d-sm-inline-block me-2">
                                Send
                              </span>{" "}
                              <i className="mdi mdi-send" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Chat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
  project: PropTypes.object,
  receiver: PropTypes.string,
  sender: PropTypes.string,
}

export default Chat
