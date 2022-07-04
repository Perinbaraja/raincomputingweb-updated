import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Pagination,
  UncontrolledTooltip,
} from "reactstrap"
import images from "assets/images"
import { isEmpty, size, map } from "lodash"
import { attImages } from "../../helpers/mockData"

const CardContact = props => {
  const imgIndex = Math.floor(Math.random() * 8)
  const { user } = props

  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card className="text-center">
          <Link to={`/projects-overview?uid=${user._id}`}>
            <CardBody>
              <div>
                <div>
                  <img
                    className="avatar-xl1"
                    src={user.img ? user.img : attImages[imgIndex].url}
                    alt=""
                  />
                </div>
                <div className="mt-3">
                  <h5 className="font-size-16 mb-1 text-dark">
                    {user.firstname} {user.lastname} {user.initial}
                  </h5>
                </div>
                <p className="font-size-10 text-muted">{user.firm}</p>
                <p className="text-muted">{user.type}</p>
              </div>
            </CardBody>
          </Link>

          <CardFooter className="bg-transparent border-top">
            <div className="contact-links d-flex font-size-20">
              <div className="flex-fill">
                <Link to={`/rc-chat?uid=${user._id}`} id={"message" + user._id}>
                  <i className="bx bx-message-square-dots" />
                  <UncontrolledTooltip
                    placement="bottom"
                    target={"message" + user._id}
                  >
                    Chat
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div className="flex-fill">
                <Link to="#" id={"project" + user._id}>
                  <i className="bx bx-pie-chart-alt" />
                  <UncontrolledTooltip
                    placement="bottom"
                    target={"project" + user._id}
                  >
                    Schedule
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div className="flex-fill">
                <Link
                  to={`/projects-overview?uid=${user._id}`}
                  id={"profile" + user._id}
                >
                  <i className="bx bx-user-circle" />
                </Link>
                <UncontrolledTooltip
                  placement="bottom"
                  target={"profile" + user._id}
                >
                  Profile
                </UncontrolledTooltip>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardContact.propTypes = {
  user: PropTypes.object,
}

export default CardContact
