import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"

//scss

import "../../pages/Contacts/landing.scss"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"
import computer from "assets/images/computer.png"
import rainlogo from "assets/images/RainCom_Logo.webp"
import logo from "assets/images/rain-drop.png"
import { reset } from "redux-form"
const Register = props => {
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      firstname: Yup.string().required("Please Enter Your firstname"),
      lastname: Yup.string().required("Please Enter Your lastname"),
      password: Yup.string().required("Please Enter Your Password"),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //   "Must Contain 8 Characters, One Uppercase,Lowercase,Number,Special Character"
      // ),
    }),
    onSubmit: (values, onSubmitProps) => {
      console.log("onsubmit", values, onSubmitProps)
      //dispatch(registerUser({ ...values, aflag: true }))
      dispatch(registerUser({ ...values, aflag: true }))
      onSubmitProps.setSubmitting(false) //Vidhya
      onSubmitProps.resetForm()
    },
  })

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))
  // console.log("u", user)
  // console.log("re", registrationError)
  // handleValidSubmit
  // const handleValidSubmit = values => {
  //   dispatch(registerUser(values))
  // }

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | Raincomputing</title>
      </MetaTags>
      <div className="d-none d-lg-block ps-lg-5 ms-lg-5">
        <img src={rainlogo} height="50" />
      </div>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="d-flex  ">
        <div className="container d-none d-lg-block  ps-lg-5 ms-lg-5 mt-5 ">
          <div className="d-none d-lg-block   my-5 pt-sm-5 ms-lg-5  ">
            <div className="justify-content-center">
              <img src={computer} height="350" />
            </div>
            <p className="fs-5 pt-5 ps-5 ">
              Manage all communication in one place
            </p>
          </div>
        </div>
        <div className="account-pages my-5 pt-sm-5 me-lg-5 mt-1 ">
          <Container className="cont1">
            <Row className="justify-content-center">
              <Col md={8} lg={7} xl={10}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary"> Register</h5>
                          <p>Get your rain account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <Form
                        className="form-horizontal"
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                          onSubmit.reset()
                          //e. reset()
                        }}
                      >
                        {user && (
                          <Alert
                            className="fw-bolder text-center"
                            color={user.success ? "success" : "danger"}
                          >
                            {user.msg}
                          </Alert>
                        )}

                        {registrationError && registrationError ? (
                          <Alert color="danger">{registrationError}</Alert>
                        ) : null}

                        <div className="mb-3">
                          <Label className="form-label">Firstname</Label>
                          <Input
                            name="firstname"
                            type="text"
                            placeholder="Enter first name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.firstname || ""}
                            invalid={
                              validation.touched.firstname &&
                              validation.errors.firstname
                                ? true
                                : false
                            }
                          />
                          {validation.touched.firstname &&
                          validation.errors.firstname ? (
                            <FormFeedback type="invalid">
                              {validation.errors.firstname}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Lastname</Label>
                          <Input
                            name="lastname"
                            type="text"
                            placeholder="Enter last name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lastname || ""}
                            invalid={
                              validation.touched.lastname &&
                              validation.errors.lastname
                                ? true
                                : false
                            }
                          />
                          {validation.touched.lastname &&
                          validation.errors.lastname ? (
                            <FormFeedback type="invalid">
                              {validation.errors.lastname}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Password</Label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-primary btn-block "
                            type="submit"
                          >
                            Register
                          </button>
                        </div>

                        <div className=" mt-3 text-center">
                          <p>
                            Already have an account ?{" "}
                            <Link
                              to="/login"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Login
                            </Link>{" "}
                          </p>
                        </div>

                        <div className="mt-4 text-center">
                          <p className="mb-0">
                            By registering you agree to the raincomputing{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
  reset()
}

export default Register
