/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import { Row, Col, Container } from "react-bootstrap";
import CardItem from "../common/CardItem1";
import { MDBAnimation, MDBView, MDBCol } from "mdbreact";
import OwlCarousel from "react-owl-carousel3";
import TextLoop from "react-text-loop";
import Link from "react-router";
import firebase from "../Firebase";

import NavBarListing from "../navBar/navbarListing";
import NavBarlisting2 from "../navBar/Navbarlisting2";
import { Button } from "react-bootstrap";

class Catering extends React.Component {
  constructor(props, context) {
    super(props, context);
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    this.state = {
      showAddressModal: false,
      product: this.props.product,
      cate: this.props.product,
      count: 0,
      name: "",
      cities: [],
      lat: "",
      lng: "",
      cityName: "",
      address: "",
      addressError: "",
      pushid: "",
      radius: "",
      userCart: [],
      userAddresses: [],
      subTotal: 0,
      taxes: "0",
      total: 0,
      location: { city: "", query: "", lat: "", lng: "" },
      searchedPlaceAPIData: "",
      userAddressSelected: "",
      date: date,
    };
  }

  displayRazorpay = async () => {
    var d = new Date();
let ed=d.setMonth(d.getMonth() - 3);
console.log(d.toLocaleDateString());
    let userId = localStorage.getItem("UserName");
    let userNumber = localStorage.getItem("phoneNumber");
    let userName = localStorage.getItem("Name");
    const orderNo = Date.now();
    const today = (window.axios.defaults.headers = {
      "Content-Type": "application/json",
    });
    window.axios
      .post("https://liveyumfoods.xyz/ordersmothers.php?amount=" + 100)
      .then(function (response) {
        // console.log(response.data);
        $("#loading").hide();
        $("#loadingweb").hide();
        $("#loadingmob").hide();
        var options = {
          key: "rzp_live_hixZG1ClXcmfK5", // Enter the Key ID generated from the Dashboard
          amount: 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
          currency: "INR",
          name: "Mothers Food",
          description: "",
          image: "../assets/img/logo.png",
          order_id: response.data, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
          handler: function (response) {
            try {
              var ref = app.database().ref().child("Catering").push();
              ref.child("PushId").set(ref.getKey());
              ref.child("Name").set(Name);
              ref.child("Phone no").set(phoneNumber);
              ref.child("Amount").set(String(amount));
              ref.child("Date").set(this.state.date);
              ref.child("Expiry").set();
              ref.child("Plan").set();
              ref.child("UserId").set(String(userId));
            } catch (error) {
              console.log(error);
              message.error("something error happen");
            }
            alert("Submitted Successfully!");
          },
          //   "prefill": {
          //       "name": data.name,
          //       "email": data.email,
          //       "contact": data.number
          //   },
          notes: {
            address: "Begumpet, Hyderabad",
          },
          theme: {
            color: "#295A274",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      });
  };
  render() {
    var isLoggedin = localStorage.getItem("isLogging");
    const options = {
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 4,
        },
        1200: {
          items: 4,
        },
      },

      lazyLoad: true,
      pagination: false.toString(),
      loop: true,
      dots: false,
      autoPlay: 2000,
      nav: true,
      navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>",
      ],
    };

    return (
      <Fragment>
        {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}
        <div
          className=" pb-0 col-md-12 col-lg-12 col-sm-12 card"
          style={{
            background: "lightgrey",
            width: "100%",
            height: "300px",
          }}
        >
          <MDBAnimation type="bounce">
            <MDBContainer style={{ marginLeft: "20%" }}>
              <MDBCard
                className="card-body"
                style={{
                  width: "60rem",
                  background: "transparent",
                  border: "none",
                }}
              >
                <MDBCardTitle
                  className="animated fadeIn infinite my-4"
                  style={{
                    fontWeight: "bold",
                    marginTop: "7%",
                    fontSize: "60px",
                    fontFamily: "Lemonada",
                    color: "red",
                  }}
                >
                  Catering Service
                </MDBCardTitle>
                <MDBCardText
                  className="animated fadeInLeftBig infinite my-4"
                 
                  style={{ fontSize: "30px", fontFamily: "Lemonada" }}
                >
                  <TextLoop interval={3000} noWrap={true} mask={true}>
                    <div
                      style={{
                        fontSize: "15px",
                        fontFamily: "Lemonada",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontFamily: "Lemonada",
                          textAlign: "center",
                        }}
                      >
                        A major part of hospitality industry catering brings
                        <br />
                        together service and tasty food under one umbrella
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "15px",
                        fontFamily: "Lemonada",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      Caterers play a very important role in any event be it a
                      small
                      <br />
                      get together or a wedding
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontFamily: "Lemonada",
                        textAlign: "center",
                      }}
                    >
                      Catering services not only bring on table lip smacking
                      innovative
                      <br />
                      dishes but also play an important role with the <br />{" "}
                      presetation and serving of dishes
                    </span>
                  </TextLoop>
                  {/* <TextLoop interval={3000}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontFamily: "Lemonada",
                      textAlign: "justify",
                    }}
                  >
                    {" "}
                    <span>
                      Some quick example text to build on the panel title and
                      makeup the bulk of the panel's content
                    </span>
                  </div>
                  <div></div>
                  <div></div>
                </TextLoop> */}
                </MDBCardText>

                {/* <div className="flex-row" style={{ fontSize: "20px" }}>
                <a href="/contactus">Contact Us</a>
              </div> */}
              </MDBCard>
            </MDBContainer>
          </MDBAnimation>
        </div>
        <section className="section pt-5 pb-3 products-section">
          <Container style={{ marginTop: "-2%" }}>
            <Row>
              <Col md={12}>
                <div className="post-header">
                  <h3
                    style={{
                      textAlign: "justify",
                      color: "red",
                      marginBottom: "3%",
                    }}
                  >
                    <b>Given facilities:</b>
                  </h3>
                </div>

                <OwlCarousel
                  nav
                  loop
                  {...options}
                  className="owl-carousel-four owl-theme "
                >
                  <div className="item">
                    <CardItem
                      title="Example1"
                      subTitle="Some quick example text to build on the panel title and make up
                    the bulk of the panel's content."
                    />
                  </div>

                  <div className="item">
                    <CardItem
                      title="Example2"
                      subTitle="Some quick example text to build on the panel title and make up
                    the bulk of the panel's content. "
                    />
                  </div>
                  <div className="item">
                    <CardItem
                      title="Example3"
                      subTitle="Some quick example text to build on the panel title and make up
                    the bulk of the panel's content."
                    />
                  </div>
                  <div className="item">
                    <CardItem
                      title="Example4"
                      subTitle="Some quick example text to build on the panel title and make up
                    the bulk of the panel's content."
                    />
                  </div>
                  <div className="item">
                    <CardItem
                      title="Example5"
                      subTitle="Some quick example text to build on the panel title and make up
                    the bulk of the panel's content."
                    />
                  </div>
                </OwlCarousel>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pt-5 pb-2 products-section card">
          <Container style={{ marginTop: "-3%" }}>
            <Row>
              <Col md={12}>
                <div className="post-header">
                  <h3
                    style={{
                      textAlign: "justify",
                      color: "red",
                      marginBottom: "3%",
                    }}
                  >
                    <b>Why should you join us:</b>
                  </h3>
                </div>
                <div className="post-body">
                  <div className="m-bottom-40">
                    <ul className="bullet--list2" style={{ fontSize: "15px" }}>
                      <li
                        style={{ textAlign: "justify", fontSize: "15px" }}
                        className="bullet_list"
                      >
                        Constant orders even in off season.
                      </li>
                      <li
                        style={{ textAlign: "justify", fontSize: "15px" }}
                        className="bullet_list"
                      >
                        Loyal Customer Base as well as influx of New Customers.
                      </li>
                      <li
                        style={{ textAlign: "justify", fontSize: "15px" }}
                        className="bullet_list"
                      >
                        Ablity to cater to small events as well as big parties.
                      </li>
                      <li
                        style={{ textAlign: "justify", fontSize: "15px" }}
                        className="bullet_list"
                      >
                        Economic stablity in all seasons.
                      </li>
                      <li
                        style={{ textAlign: "justify", fontSize: "15px" }}
                        className="bullet_list"
                      >
                        Mouth to Mouth Publicity.
                      </li>
                      <li
                        style={{ textAlign: "justify", fontSize: "15px" }}
                        className="bullet_list"
                      >
                        Chances to get orders offline for other bigger events of
                        the customer.
                      </li>
                    </ul>
                    {/*<!-- ends: .bullet--list2 -->*/}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pt-5 pb-5 products-section ">
          <Container style={{ marginTop: "-3%" }}>
            <Row>
              <Col md={12}>
                <div className="post-header">
                  <h3
                    style={{
                      textAlign: "justify",
                      color: "red",
                      marginBottom: "3%",
                    }}
                  >
                    <b>Plans:</b>
                  </h3>
                </div>
                <input type="text" placeholder="sk" />
                <div className="col-md-2 float-right">
                  <Button
                    className="btn-danger btn-block float-right btn--rounded"
                    onClick={this.displayRazorpay}
                  >
                    Pay
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Fragment>
    );
  }
}

export default Catering;
