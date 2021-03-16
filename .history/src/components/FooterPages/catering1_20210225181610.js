import React, { Fragment } from "react";
import styled from 'styled-components'
import { MDBAnimation } from "mdbreact";
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import TextLoop from "react-text-loop";
import NavBarListing from "../navBar/navbarListing";
import NavBarlisting2 from "../navBar/Navbarlisting2";
// import ProductBox from "../home/ProductionBox1";
import CardItem from "../common/CardItem1";
import { Row, Col, Container, Button } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel3";
import "antd/lib/message/style/index.css";
import "antd/dist/antd.css";
import { message } from "antd";

import firebase from "../Firebase";

// const Box = styled.div`
// max-width: 70vw;
// 	padding: 30px;
// 	margin-top: 4%;
// 	position: relative;
// 	top: 50%;
// 	font-size: 30px;
// 	line-height: 1.5;
// 	transform: translateY(-50%);
// 	perspective: 400px;
// `
const Catering = () => {

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

  const displayRazorpayBasic = async () => {
    let userId = localStorage.getItem("UserName");
    let userNumber = localStorage.getItem("phoneNumber");
    let userName = localStorage.getItem("Name");
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 3);
    var today1 = new Date();
    var dd = String(today1.getDate()).padStart(2, '0');
    var mm = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today1.getFullYear();

    today1 = yyyy + '-' + mm + '-' + dd;
    var time = new Date();
    var n = time.getTime()

    var dd1 = String(time.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    var mm1 = String(monthNames[time.getMonth()]).padStart(2, '0'); //January is 0!
    var yyyy1 = time.getFullYear();
    var hh = time.getHours()
    var minute = time.getMinutes()

    time = dd1 + ', ' + mm1 + ' ' + yyyy1 + ' ' + hh + ':' + minute;

    let isLoggedIn = localStorage.getItem("isLogging");
    // console.log(isLoggedIn)
    if (!isLoggedIn || isLoggedIn === "false") {
      // this.setState({ show: true });
       message.warning('Please Login First To add Food Items To your cart!');
      return;
    }

    const today = (window.axios.defaults.headers = {
      "Content-Type": "application/json",
    });
    window.axios
      .post("https://liveyumfoods.xyz/ordersmothers.php?amount=" + parseFloat(4999 * 100).toFixed(0))
      .then(function (response) {
        // console.log(response.data);

        var options = {
          key: "rzp_live_hixZG1ClXcmfK5", // Enter the Key ID generated from the Dashboard
          amount: parseFloat(4999 * 100).toFixed(0), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
          currency: "INR",
          name: "Mothers Food",
          description: "",
          image: "../assets/img/logo.png",
          order_id: response.data, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
          handler: function (response) {
            try {
              let ref = firebase.database().ref().child("Catering").push();
              ref.child("PushId").set(ref.getKey());
              ref.child("Name").set(userName);
              ref.child("Phone no").set(userNumber);
              ref.child("Amount").set(String(parseFloat(4999).toFixed(2)));
              ref.child("Date").set(today1)
              ref.child("DateTime").set(time);
              ref.child("TransactionId").set("" + n);
              ref.child("Expiry").set(expiryDate.toLocaleDateString());
              ref.child("PlanType").set("Basic");
              ref.child("UserId").set(String(userId));
              ref.child("Payment").set("ONLINE");

              ref
                .child("RazorpayId")
                .set(response.razorpay_payment_id);
              firebase
                .database()
                .ref("Users")
                .child(userId)
                .once("value", function (snapshot) {
                  if (snapshot.exists()) {
                    ref
                      .child("Flat")
                      .set(snapshot.val().Flat);
                    ref
                      .child("LocationCoordinates")
                      .set(snapshot.val().Coord);
                    ref
                      .child("Address")
                      .set(snapshot.val().Address);
                  }
                })

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
        var rzp1 = new window.Razorpay(options, (error, order) => {
          if (error) {
            console.log(error);
          } else {
            console.log(order);
          }
        });
        rzp1.open();
      });
  };

  const displayRazorpayAdvanced = async () => {
    let userId = localStorage.getItem("UserName");
    let userNumber = localStorage.getItem("phoneNumber");
    let userName = localStorage.getItem("Name");
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    var today1 = new Date();
    var dd = String(today1.getDate()).padStart(2, '0');
    var mm = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today1.getFullYear();

    today1 = yyyy + '-' + mm + '-' + dd;
    var time = new Date();
    var n = time.getTime()

    var dd1 = String(time.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    var mm1 = String(monthNames[time.getMonth()]).padStart(2, '0'); //January is 0!
    var yyyy1 = time.getFullYear();
    var hh = time.getHours()
    var minute = time.getMinutes()

    time = dd1 + ', ' + mm1 + ' ' + yyyy1 + ' ' + hh + ':' + minute;
    const today = (window.axios.defaults.headers = {
      "Content-Type": "application/json",
    });
    window.axios
      .post("https://liveyumfoods.xyz/ordersmothers.php?amount=" + parseFloat(6999 * 100).toFixed(0))
      .then(function (response) {
        // console.log(response.data);

        var options = {
          key: "rzp_live_hixZG1ClXcmfK5", // Enter the Key ID generated from the Dashboard
          amount: parseFloat(6999 * 100).toFixed(0), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
          currency: "INR",
          name: "Mothers Food",
          description: "",
          image: "../assets/img/logo.png",
          order_id: response.data, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
          handler: function (response) {
            try {
              let ref = firebase.database().ref().child("Catering").push();
              ref.child("PushId").set(ref.getKey());
              ref.child("Name").set(userName);
              ref.child("Phone no").set(userNumber);
              ref.child("Amount").set(String(parseFloat(6999).toFixed(2)));
              ref.child("Date").set(today1)
              ref.child("DateTime").set(time);
              ref.child("TransactionId").set("" + n);
              ref.child("Expiry").set(expiryDate.toLocaleDateString());
              ref.child("PlanType").set("Advanced");
              ref.child("UserId").set(String(userId));
              ref.child("Payment").set("ONLINE");

              ref
                .child("RazorpayId")
                .set(response.razorpay_payment_id);
              firebase
                .database()
                .ref("Users")
                .child(userId)
                .once("value", function (snapshot) {
                  if (snapshot.exists()) {
                    ref
                      .child("Flat")
                      .set(snapshot.val().Flat);
                    ref
                      .child("LocationCoordinates")
                      .set(snapshot.val().Coord);
                    ref
                      .child("Address")
                      .set(snapshot.val().Address);
                  }
                })

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
        var rzp1 = new window.Razorpay(options, (error, order) => {
          if (error) {
            console.log(error);
          } else {
            console.log(order);
          }
        });
        rzp1.open();
      });
  };

  const displayRazorpayPremium = async () => {
    let userId = localStorage.getItem("UserName");
    let userNumber = localStorage.getItem("phoneNumber");
    let userName = localStorage.getItem("Name");
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 12);
    console.log(expiryDate.toLocaleDateString())
    var today1 = new Date();
    var dd = String(today1.getDate()).padStart(2, '0');
    var mm = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today1.getFullYear();

    today1 = yyyy + '-' + mm + '-' + dd;
    var time = new Date();
    var n = time.getTime()

    var dd1 = String(time.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    var mm1 = String(monthNames[time.getMonth()]).padStart(2, '0'); //January is 0!
    var yyyy1 = time.getFullYear();
    var hh = time.getHours()
    var minute = time.getMinutes()

    time = dd1 + ', ' + mm1 + ' ' + yyyy1 + ' ' + hh + ':' + minute;
    const today = (window.axios.defaults.headers = {
      "Content-Type": "application/json",
    });
    window.axios
      .post("https://liveyumfoods.xyz/ordersmothers.php?amount=" + parseFloat(9999 * 100).toFixed(0))
      .then(function (response) {
        // console.log(response.data);

        var options = {
          key: "rzp_live_hixZG1ClXcmfK5", // Enter the Key ID generated from the Dashboard
          amount: parseFloat(9999 * 100).toFixed(0), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
          currency: "INR",
          name: "Mothers Food",
          description: "",
          image: "../assets/img/logo.png",
          order_id: response.data, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
          handler: function (response) {
            try {
              let ref = firebase.database().ref().child("Catering").push();
              ref.child("PushId").set(ref.getKey());
              ref.child("Name").set(userName);
              ref.child("Phone no").set(userNumber);
              ref.child("Amount").set(String(parseFloat(9999).toFixed(2)));
              ref.child("Date").set(today1)
              ref.child("DateTime").set(time);
              ref.child("TransactionId").set("" + n);
              ref.child("Expiry").set(expiryDate.toLocaleDateString());
              ref.child("PlanType").set("Premium");
              ref.child("UserId").set(String(userId));
              ref.child("Payment").set("ONLINE");

              ref
                .child("RazorpayId")
                .set(response.razorpay_payment_id);
              firebase
                .database()
                .ref("Users")
                .child(userId)
                .once("value", function (snapshot) {
                  if (snapshot.exists()) {
                    ref
                      .child("Flat")
                      .set(snapshot.val().Flat);
                    ref
                      .child("LocationCoordinates")
                      .set(snapshot.val().Coord);
                    ref
                      .child("Address")
                      .set(snapshot.val().Address);
                  }
                })

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
        var rzp1 = new window.Razorpay(options, (error, order) => {
          if (error) {
            console.log(error);
          } else {
            console.log(order);
          }
        });
        rzp1.open();
      });
  };

  const displayRazorpayPremiumPro = async () => {
    let userId = localStorage.getItem("UserName");
    let userNumber = localStorage.getItem("phoneNumber");
    let userName = localStorage.getItem("Name");
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 36);
    console.log(expiryDate.toLocaleDateString())

    var today1 = new Date();
    var dd = String(today1.getDate()).padStart(2, '0');
    var mm = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today1.getFullYear();

    today1 = yyyy + '-' + mm + '-' + dd;
    var time = new Date();
    var n = time.getTime()

    var dd1 = String(time.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    var mm1 = String(monthNames[time.getMonth()]).padStart(2, '0'); //January is 0!
    var yyyy1 = time.getFullYear();
    var hh = time.getHours()
    var minute = time.getMinutes()

    time = dd1 + ', ' + mm1 + ' ' + yyyy1 + ' ' + hh + ':' + minute;
    const today = (window.axios.defaults.headers = {
      "Content-Type": "application/json",
    });
    window.axios
      .post("https://liveyumfoods.xyz/ordersmothers.php?amount=" + parseFloat(24999 * 100).toFixed(0))
      .then(function (response) {
        // console.log(response.data);

        var options = {
          key: "rzp_live_hixZG1ClXcmfK5", // Enter the Key ID generated from the Dashboard
          amount: parseFloat(24999 * 100).toFixed(0), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
          currency: "INR",
          name: "Mothers Food",
          description: "",
          image: "../assets/img/logo.png",
          order_id: response.data, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
          handler: function (response) {
            try {
              let ref = firebase.database().ref().child("Catering").push();
              ref.child("PushId").set(ref.getKey());
              ref.child("Name").set(userName);
              ref.child("Phone no").set(userNumber);
              ref.child("Amount").set(String(parseFloat(24999).toFixed(2)));
              ref.child("Date").set(today1)
              ref.child("DateTime").set(time);
              ref.child("TransactionId").set("" + n);
              ref.child("Expiry").set(expiryDate.toLocaleDateString());
              ref.child("PlanType").set("Premium+");
              ref.child("UserId").set(String(userId));
              ref.child("Payment").set("ONLINE");

              ref
                .child("RazorpayId")
                .set(response.razorpay_payment_id);
              firebase
                .database()
                .ref("Users")
                .child(userId)
                .once("value", function (snapshot) {
                  if (snapshot.exists()) {
                    ref
                      .child("Flat")
                      .set(snapshot.val().Flat);
                    ref
                      .child("LocationCoordinates")
                      .set(snapshot.val().Coord);
                    ref
                      .child("Address")
                      .set(snapshot.val().Address);
                  }
                })

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
        var rzp1 = new window.Razorpay(options, (error, order) => {
          if (error) {
            console.log(error);
          } else {
            console.log(order);
          }
        });
        rzp1.open();
      });
  };

  return (
    <Fragment>
      {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}

      <div className='' style={{ backgroundImage: `url('../assets/img/catering.jpg')`, backgroundSize: "cover", marginRight: "-130px", textShadow: ".1em .1em rgba(0, 0, 0, 0.2)" }}>
        {/* <svg  style={{width:"100%", height:"100%" }}>
  <circle cx="60" cy="60" r="90" fill="yellow" /><h1>
Sorry, your browser does not support inline SVG.</h1>
</svg>
            <svg className="Path_10" viewBox="13371.5 7882 1708.824 838.631">
                <path id="Path_10" d="M 13400.56640625 6945.46826171875 C 13400.56640625 6945.46826171875 13635.7109375 7379.34033203125 14053.9765625 7423.0400390625 C 14299.9150390625 7448.73486328125 14334.765625 7478.29052734375 14342.53125 7513.9072265625 C 14347.8681640625 7538.380859375 14352.74609375 7575.451171875 14352.74609375 7575.451171875 C 14352.74609375 7575.451171875 14363.2958984375 7700.51904296875 14439.6416015625 7717.83740234375 C 14399.41015625 7705.35205078125 14524.779296875 7770.5810546875 14740.6806640625 7608.2421875 C 15285.8828125 7198.30029296875 14730.2763671875 6882 14730.2763671875 6882 L 13371.5 6893.30615234375 L 13400.56640625 6945.46826171875 Z"></path>
            </svg>
            <div id="Component_1__1"  className="Component_1___1">
                <svg className="Path_9" viewBox="13386 6882 1532.324 806.019">
                    <path id="Path_9" d="M 13400 6943 C 13400 6943 13626 7360 14028 7402 C 14264.3740234375 7426.69580078125 14297.8701171875 7455.10205078125 14305.3330078125 7489.33349609375 C 14310.462890625 7512.85546875 14315.1513671875 7548.484375 14315.1513671875 7548.484375 C 14315.1513671875 7548.484375 14325.2900390625 7668.6884765625 14398.6669921875 7685.33349609375 C 14360 7673.33349609375 14480.494140625 7736.02587890625 14688 7580 C 15212 7186 14678 6882 14678 6882 L 13386 6892 L 13400 6943 Z"></path>
                </svg>
            </div> */}
        {/* <div className="intro-four bgimage" > */}
        <div className="intro-four--contents content_above">
          <div className="container">
            <div className="row">
              <div className="col-8 slider_left_section">
                {/* <h1 className="display-3">Healthy, Hygienic, &amp; Home Food.</h1>
                                <p className="sub-title">Order food from the home-chefs near you.</p> */}
                <MDBAnimation type="fadeInRights" >
                  <MDBContainer >
                    <MDBCard
                      className="card-body"
                      style={{
                        width: "60rem",
                        background: "transparent",
                        border: "none",
                      }}
                    >
                      <MDBCardTitle
                        className="animated fadeInRights"
                        style={{
                          textAlign: "justify",
                          // fontWeight: "bold",
                          marginTop: "0%",
                          fontSize: "60px",
                          fontFamily: `'Flamenco'cursive`,
                          color: " white",
                          // textShadow: ".1em .1em rgba(0, 0, 0, 0.2)"
                        }}
                      >
                        Catering Service
                </MDBCardTitle>
                      <MDBCardText
                        className="animated flipInX  "

                        style={{ fontSize: "40px", fontHeight: "10px", fontFamily: `'Flamenco'cursive`, textAlign: "justify", color: "white" }}
                      >
                        <TextLoop interval={5000} noWrap={true} fade={true} mask={true}>
                          <div
                            style={{
                              fontSize: "40px",

                              fontFamily: `'Flamenco'cursive`,
                              textAlign: "justify"
                            }}
                          >
                            <span
                              style={{
                                fontSize: "17px",
                                fontFamily: `'Flamenco'cursive`,
                                textAlign: "justify",
                              }}
                            >
                              A major part of hospitality industry catering brings
                        <br />
                        together service and tasty food under one umbrella
                      </span>
                          </div>
                          <div
                            style={{
                              fontSize: "15px",
                              fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                              textAlign: "justify"
                            }}
                          >

                            <span
                              style={{
                                fontSize: "15px",
                                fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                                textAlign: "justify",
                              }}
                            >
                              {" "}
                      Caterers play a very important role in any event be it a
                      small
                      <br />
                      get together or a wedding
                    </span>
                          </div>
                          <div
                            style={{
                              fontSize: "15px",
                              fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                              textAlign: "justify"
                            }}
                          >
                            <span
                              style={{
                                fontSize: "15px",
                                fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                                textAlign: "justify",
                              }}
                            >
                              Catering services not only bring on table lip smacking
                              innovative
                      <br />
                      dishes but also play an important role with the <br />{" "}
                      presetation and serving of dishes
                    </span>
                          </div>
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
                <div className="widget-wrapper">
                  <div className="search-widget">

                  </div>
                </div>
              </div>
              <div className="col-4 homepage-banner-section" style={{ marginTop: "6%", width: "1000px" }}>
                <div className="item">
                  {/* <img
                          src="../assets/img/xd/biryani.png"
                          alt="img"
                          // style={{maxWidth:"100%",height:"300px",width:"300px"}}
                        /> */}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* </div> */}
        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0d1a26" fill-opacity="1" d="M0,192L40,181.3C80,171,160,149,240,128C320,107,400,85,480,96C560,107,640,149,720,176C800,203,880,213,960,197.3C1040,181,1120,139,1200,122.7C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          <p>hie</p>
        </svg>
      </div>
      <div>
        <section className="section pt-5 pb-3 products-section" style={{ backgroundColor: "#0d1a26" }}>
          <Container style={{ marginTop: "-10%" }}>
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
      </div>
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
              <div className="table-responsive text-nowrap">
                <table className="datatables-demo table table-striped table-bordered" id="datatable">
                  <thead>
                    <tr>
                      <th scope="col">Plans</th>
                      <th scope="col"> Basic </th>
                      <th scope="col"> Advanced	</th>
                      <th scope="col"> Premium	</th>
                      <th scope="col"> Premium +</th>


                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Validity</td>
                      <td>3 Months</td>
                      <td>6 Months</td>
                      <td>1 Year</td>
                      <td>3 year</td>

                    </tr>
                    <tr>
                      <td>{""}</td>
                      <td>₹4,999</td>
                      <td>₹6,999</td>
                      <td>₹9,999</td>
                      <td>₹24,999</td>

                    </tr>
                    <tr>
                      <td></td>
                      <td>

                        <Button type="submit" onClick={displayRazorpayBasic}
                        className="btn-danger  btn--rounded"
                      // onClick={this.displayRazorpay}
                      >
                        Pay Now
                  </Button>
                  </td>
                      <td>  <Button type="submit" onClick={displayRazorpayAdvanced}
                        className="btn-danger  btn--rounded"
                      // onClick={this.displayRazorpay}
                      >
                        Pay Now
                  </Button></td>
                      <td>  <Button type="submit" onClick={displayRazorpayPremium}
                        className="btn-danger  btn--rounded"
                      // onClick={this.displayRazorpay}
                      >
                        Pay Now
                  </Button></td>
                      <td>  <Button type="submit" onClick={displayRazorpayPremiumPro}
                        className="btn-danger  btn--rounded"
                      // onClick={this.displayRazorpay}
                      >
                        Pay Now
                  </Button></td>

                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="col-md-2 float-right">
                <Button type="submit" onClick={displayRazorpayBasic}
                  className="btn-danger btn-block float-right btn--rounded"
                // onClick={this.displayRazorpay}
                >
                  Pay
                  </Button>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>

    </Fragment>

  )

}
export default Catering;
