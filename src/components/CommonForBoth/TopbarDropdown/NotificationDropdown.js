import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"

//i18n
import { withTranslation } from "react-i18next"
import { useSocket } from "SocketProvider"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const { notifications } = useSocket()

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          {notifications.length > 0 && (
            <span className="badge bg-danger rounded-pill">
              {notifications.length}
            </span>
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="#" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            <div className="d-flex">
              <div>
                <span>
                  <i className="bx bx-caret-down" />
                </span>
              </div>
              <Link to="contacts-grid" className="">
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {props.t("Your Case is Under Process")}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">{props.t("Recent Attorney Details")}</p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />{" "}
                      {props.t("3 min ago")}{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <Link to="Chat" className="">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">New Message</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">{props.t("") + "."}</p>
                    <p className="mb-0">
                      <i className="bx bx-message-alt-detail" />
                      {props.t("New Mail")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="contacts-grid">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-success rounded-circle font-size-16">
                    <i className="bx bx-badge-check" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {props.t("Recent Attorney Profile")}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">{props.t("Case Details")}</p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />{" "}
                      {props.t("3 min ago")}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="Chat">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">New Message</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">{props.t("") + "."}</p>
                    <p className="mb-0">
                      <i className="bx bx-message-alt-detail" />
                      {props.t("Case Procss 50% Completed")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              <span key="t-view-more">{props.t("View More..")}</span>
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
