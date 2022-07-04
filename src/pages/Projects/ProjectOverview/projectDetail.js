import React from "react"
import PropTypes from "prop-types"
import { map, get, attempt } from "lodash"
import { Card, CardBody, Col, Row, Label } from "reactstrap"
import img1 from "../../../assets/images/img1m.png"

import { attImages } from "../../../helpers/mockData"

const ProjectDetail = ({ project }) => {
  const imgIndex = Math.floor(Math.random() * 8)
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <img
            src={project.img ? project.img : attImages[imgIndex].url}
            alt=""
            className="avatar-md rounded-circle me-4"
          />
          {/* src={user.img ? user.img : attImages[imgIndex].url} */}
          <div className="flex-grow-1 overflow-hidden">
            <h5 className="text-truncate font-size-16">
              {project.firstname} {project.lastname}
            </h5>
            <p className="text-muted font-size-14">{project.firm}</p>
            <p className="text-muted font-size-14">{project.type}</p>
          </div>
        </div>

        <div>
          {" "}
          <h5 className="font-size-16 mt-4">Biography :</h5>
          <p className="text-muted">{project.bio}</p>
        </div>
        <div>
          {" "}
          <h5 className="font-size-16 mt-4">Education :</h5>
          <p className="text-muted">
            {" "}
            <i className="mdi mdi-chevron-right text-primary me-1" />
            {project.l1}
          </p>
          <p className="text-muted">
            {" "}
            <i className="mdi mdi-chevron-right text-primary me-1" />
            {project.l2}
          </p>
          {/* <p className="text-muted">
            {" "}
            <i className="mdi mdi-chevron-right text-primary me-1" />
            {project.l3}
          </p> */}
          {/* <p className="text-muted">
            {" "}
            <i className="mdi mdi-chevron-right text-primary me-1" />
            {project.l4}
          </p> */}
        </div>

        <h5 className="font-size-16 mt-4">Attorney Address :</h5>
        <p> </p>
        <p className="text-muted ">
          {project.address1}, {project.address2}{" "}
        </p>
        <p className="text-muted ">{project.city}</p>
        <p className="text-muted ">{project.country}</p>
        <p className="text-muted ">{project.phone}</p>

        {/* {get(project, "projectDetails.description")} */}

        <div className="text-muted mt-4">
          {project.projectDetails &&
            map(project.projectDetails.points, (point, index) => (
              <p key={index}>
                <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                {point}
              </p>
            ))}
        </div>

        <Row className="task-dates">
          <Col sm="4" xs="6">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar me-1 text-primary" /> Start Date
              </h5>
              <p className="text-muted mb-0">{project.startDate}</p>
            </div>
          </Col>

          <Col sm="4" xs="6">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar-check me-1 text-primary" /> Due
                Date
              </h5>
              <p className="text-muted mb-0">{project.dueDate}</p>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

ProjectDetail.propTypes = {
  project: PropTypes.object,
}

export default ProjectDetail
