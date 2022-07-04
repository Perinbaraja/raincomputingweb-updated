import React from "react"
import { Container, Row, Col } from "reactstrap"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
// import TwitterLogin from "react-twitter-auth"
import { GoogleLogin } from "react-google-login"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container>
          <Row>
            <div className="col-md-3 col-sm-10">
              <ul className="list-unstyled ">
                <h3>About</h3>
                <li className="mt-3 ">About Us</li>
                <li className="mt-3 ">How it works</li>
                <li className="mt-3 ">Security</li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              <ul className="list-unstyled ">
                <h3>Solution</h3>
                <li className="mt-3 ">Enterprise</li>
                <li className="mt-3 ">Private Label</li>
                <li className="mt-3 ">Management</li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              <ul className="list-unstyled  ">
                <h3>Contact</h3>
                <li className="mt-3 ">Contact Us </li>
                <li className="mt-3">Careers</li>
                <li className="mt-3 ">Security</li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6 ">
              <ul className="list-unstyled  ">
                <h3>Follow Us</h3>
                <li className="mt-3 ">
                  <i className="mdi mdi-facebook" />
                  Facebook{" "}
                </li>
                {/* <li><i className="mdi mdi-twitter"/>Twitter</li> */}
                <li className="mt-3 ">
                  {" "}
                  <i className="mdi mdi-google" />
                  Google
                </li>
              </ul>
            </div>

            <Col md={6}>{new Date().getFullYear()} © RainComputing.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Develop by RainComputing
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
