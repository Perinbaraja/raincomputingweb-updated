import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { map } from "lodash"
import Pagination from "../../components/pagination/Pagination"

//images
import rainlogo from "assets/images/RainCom_Logo.webp"


//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card
import CardContact from "./card-contact"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  getAllAttorneys,
  getAttorneysCount,
} from "../../store/contacts/actions"

const ContactsGrid = props => {
  const [searchText, setSearchText] = useState("")

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  // const [totalPage, setTotalPage] = useState([])

  const dispatch = useDispatch()

  const { attorneys, loading, attorneysCount,state } = useSelector(state => ({
    attorneys: state.contacts.attorneys,
    loading: state.contacts.loading,
    attorneysCount: state.contacts.attorneysCount,
    state:state
  }))
// console.log(state,'state eswar')
  useEffect(() => {
    dispatch(getAllAttorneys(page, limit, searchText))
  }, [page, limit, searchText])
  // console.log("attorneys", attorneys)

  useEffect(() => {
    setPage(1)
    dispatch(getAttorneysCount(searchText))
  }, [searchText])
  // console.log("attorneys", attorneysCount)
  // useEffect(() => {
  //   if (attorneysCount > 0) {
  //     const totalPages = Math.floor(attorneysCount / limit) + 1
  //     let a = new Array(totalPages)
  //     for (let i = 0; i < totalPages; ++i) a[i] = i + 1
  //     setTotalPage(a)
  //   } else {
  //     setTotalPage([])
  //   }
  // }, [attorneysCount])
  // console.log("Total", totalPage)

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Raincomputing | Homepage</title>
        </MetaTags>
        {/*  */}

        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="Contacts" breadcrumbItem="User Grid" /> */}

          {loading ? (
            <Row>
              <Col xs="12">
                <div className="text-center my-3">
                  <Link to="#" className="text-success">
                    <i className="bx bx-hourglass bx-spin me-2" />
                    Load more
                  </Link>
                </div>
              </Col>
            </Row>
          ) : (
            <>
              <div className="mb-2">
                <form className="app-search  ">
                  <div className="position-relative">
                    <input
                      type="text-success"
                      className="form-control "
                      placeholder="Search for Attorney..."
                      onChange={e => setSearchText(e.target.value)}
                    />
                    <span className="bx bx-search-alt" />
                  </div>
                </form>
              </div>

              <Row>
                {map(attorneys, (user, key) => (
                  <CardContact user={user} key={"_user_" + key} />
                ))}
              </Row>
              <div>
                <Pagination
                  className="pagination-bar"
                  currentPage={page}
                  totalCount={attorneysCount}
                  pageSize={limit}
                  onPageChange={p => setPage(p)}
                />
              </div>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ContactsGrid)
