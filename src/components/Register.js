/* eslint-disable no-unused-vars */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import firebase from "./Firebase";
// import MediaQuery from "react-responsive";
// import { connect } from "react-redux";
import Moment from "moment";
import Loader from "react-loader-spinner";
// import { get } from "lodash";
import backgroundImage from "../vid/signup.jpeg";
//import { Loader } from "styled-icons/boxicons-regular";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      name: "",
      emailId: "",
      password: "",
      otp: "",
      showRegister: false,
      otpLoader: false,
      registerLoader: false,
      isLoggedin: false,
      mobileNumber: "",
    };
  }
  handleRegisterSubmit = async (e) => {
    e.preventDefault();
    this.setState({ registerLoader: true });
    const { name, emailId, password } = this.state;
    try {
      const userUniqueId = await firebase
        .database()
        .ref("UniqueId")
        .once("value");
      const lastUniqueId = userUniqueId.val();
      let userName = "";
      if (lastUniqueId > 0 && lastUniqueId < 10) {
        userName += "MF000000000" + lastUniqueId;
      } else if (lastUniqueId >= 10 && lastUniqueId < 100) {
        userName += "MF00000000" + lastUniqueId;
      } else if (lastUniqueId >= 100 && lastUniqueId < 1000) {
        userName += "MF0000000" + lastUniqueId;
      } else if (lastUniqueId >= 1000 && lastUniqueId < 10000) {
        userName += "MF000000" + lastUniqueId;
      } else if (lastUniqueId >= 10000 && lastUniqueId < 100000) {
        userName += "MF00000" + lastUniqueId;
      } else if (lastUniqueId >= 100000 && lastUniqueId < 1000000) {
        userName += "MF0000" + lastUniqueId;
      } else if (lastUniqueId >= 1000000 && lastUniqueId < 10000000) {
        userName += "MF000" + lastUniqueId;
      } else if (lastUniqueId >= 10000000 && lastUniqueId < 100000000) {
        userName += "MF00" + lastUniqueId;
      } else if (lastUniqueId >= 100000000 && lastUniqueId < 1000000000) {
        userName += "MF0" + lastUniqueId;
      } else {
        userName += lastUniqueId;
      }
      const date2 = Moment(new Date()).format("YYYY-MM-DD");
      var firebaseref = firebase
        .database()
        .ref()
        .child("Users")
        .child(userName);
      firebaseref.child("UserName").set(userName);
      firebaseref.child("Email").set(emailId);
      firebaseref.child("JoiningDate").set(date2);
      firebaseref.child("Name").set(name);
      firebaseref.child("Number").set(localStorage.getItem("phoneNumber"));
      firebaseref.child("Password").set(password);
      firebaseref.child("Referral").set("");
      firebaseref.child("Role").set("User");
      firebaseref.child("Status").set("Active");
      firebaseref.child("Wallet").set(0);
      console.log(userName);
      localStorage.setItem("isLogging", true);

      // this.setState({ menuOpen: false });
      this.setState({ registerLoader: false });
      this.props.history.push({
        pathname: `/homefood`,
      });
      //    firebase.database().ref('Users').push({
      //     Email: emailId,
      //     JoiningDate: new Date().toString(),
      //     Name: name,
      //     Number: localStorage.getItem('phoneNumber'),
      //     Referral: '',
      //     Role: 'User',
      //     Status: 'Active',
      //     UserName: `MF${Math.floor(Math.random() * 1000000000)}`
      //    }).then(() => console.log('user saved successfully')).catch((e) => console.log('error when saved user', e))
    } catch (e) {}
  };
  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const {
      showRegister,
      showOtpForm,
      loginLoader,
      otpLoader,
      registerLoader,
      menuOpen,
      showDropDown,
    } = this.state;
    const phoneNumber = localStorage.getItem("phoneNumber");
    const isLoggedin = localStorage.getItem("isLogging");
    const userName = localStorage.getItem("Name");
    //var imgurl = window.location.origin + "/assets/img/";
    return (
      <Container fluid className="bg-white">
        <Row>
          <Col md={4} lg={6} className="d-none d-md-flex ">
            <div
              className="bg_image_holder_ride"
              style={{ backgroundColor: "#edf3f5", marginTop: "-5%" }}
            >
              <img src={backgroundImage} width="100%" alt="" />
            </div>
          </Col>
          <Col md={8} lg={6}>
            <div className="login d-flex align-items-center py-5">
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <h3 className="login-heading mb-4">New Buddy!</h3>
                    <Form onSubmit={this.handleRegisterSubmit}>
                      <div className="form-label-group mb-4">
                        <Form.Control
                          type="text"
                          name="name"
                          id="inputName"
                          //placeholder="Name"
                          onChange={this.handleInputChange}
                        />
                        <Form.Label htmlFor="inputName">Name</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="email"
                          id="inputEmail"
                          name="emailId"
                          // placeholder="Email address"
                          onChange={this.handleInputChange}
                        />
                        <Form.Label htmlFor="inputEmail">
                          Email address
                        </Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="number"
                          name="number"
                          id="inputNumber"
                          value={phoneNumber}
                          onChange={this.handleInputChange}
                        />
                        <Form.Label htmlFor="inputNumber">
                          Mobile Number
                        </Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="password"
                          name="password"
                          id="inputPassword"
                          //placeholder="Password"
                          onChange={this.handleInputChange}
                        />
                        <Form.Label htmlFor="inputPassword">
                          Password
                        </Form.Label>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        {registerLoader ? (
                          <div style={{ marginTop: "7px" }}>
                            <Loader
                              type="Circles"
                              color="#FFF"
                              height={25}
                              width={100}
                            />
                          </div>
                        ) : (
                          "Sign Up"
                        )}
                      </button>

                      <div className="text-center pt-3">
                        Already have an account?{" "}
                        <Link className="font-weight-bold" to="/login">
                          Sign In
                        </Link>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Register);
