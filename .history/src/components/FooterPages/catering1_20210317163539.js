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
// import { Auto } from "@styled-icons/crypto";
// import FadeIn from 'react-fade-in';

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
       message.warning('Please Login First To Purchase the plan!');
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
    let isLoggedIn = localStorage.getItem("isLogging");
    // console.log(isLoggedIn)
    if (!isLoggedIn || isLoggedIn === "false") {
      // this.setState({ show: true });
       message.warning('Please Login First To Purchase the plan!');
      return;
    }
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
    let isLoggedIn = localStorage.getItem("isLogging");
    // console.log(isLoggedIn)
    if (!isLoggedIn || isLoggedIn === "false") {
      // this.setState({ show: true });
       message.warning('Please Login First To Purchase the plan!');
      return;
    }
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
    let isLoggedIn = localStorage.getItem("isLogging");
    // console.log(isLoggedIn)
    if (!isLoggedIn || isLoggedIn === "false") {
      // this.setState({ show: true });
       message.warning('Please Login First To Purchase the plan!');
      return;
    }
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

      <div className='' style={{ backgroundImage: `url('../assets/img/pic2.jpg')`, backgroundSize: "cover",height:"500px", textShadow: ".1em .1em rgba(0, 0, 0, 0.2)" }}>
        <div className="intro-four--contents content_above">
          <div className="container">
            <div className="row">
              <div className="col-6 slider_left_section">
                <MDBAnimation type="fadeInRights" >
                  <MDBContainer >
                    <MDBCard class Name="card-body" style={{width: "60rem", background: "transparent",border: "none",}}>
                      <MDBCardTitle className="animated fadeInRights" style={{ textAlign: "justify", marginTop: "12%", fontSize: "70px", fontFamily: `'Flamenco'cursive`, color: "#DF013A",}}>
                        Catering Service
                    </MDBCardTitle>
                      <MDBCardText
                        className="animated flipInX  "

                        style={{ fontSize: "40px", fontHeight: "10px", fontFamily: `'Flamenco'cursive`, textAlign: "justify", color: "#ffffff" }}
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
   
                      </MDBCardText>

                   
                    </MDBCard>
                  </MDBContainer>
                </MDBAnimation>
                <div className="widget-wrapper">
                  <div className="search-widget">

                  </div>
                </div>
              </div>
              <div className="col-6 homepage-banner-section" style={{ marginTop: "6%", width: "1000px" }}>
                <div className="item">
                  {/* <img
                          src="../assets/img/xd/biryani.png"
                          alt="img"
                          style={{height:"300px",width:"100%"}}
                        /> */}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      


      <div className="why-should-you-join " style={{backgroundColor:'#fffff',}}>
         <div className="container">
            <div className="row py-5">
               <div className="col-4 left-content mt-5 pt-5 animate__animated animate__fadeInLeft">
                  <img src="../assets/img/unnamed.png"/>
               </div>

               <div className="col-8 right-content">
               <div className="heading mb-5 ms-4">
                  <h1 style={{textAlign: "justify",color: "#C70039",}}><b>Why <span style={{color:"#FF0040",}}>should you join </span>us :</b></h1>
                  <hr></hr>
              </div>
                  <ul>
                    <li className="animate__animated animate__fadeInRight bullet_list" style={{textAlign:"justify",}}>Catering is a seasonal business.We bring in clients in all seasons for your benefits</li>
                    <li className="animate__animated animate__fadeInRight bullet_list" style={{textAlign:"justify",}}>By catering for smaller parties prospective clients give you more business.</li>
                    <li className="animate__animated animate__fadeInRight bullet_list" style={{textAlign:"justify",}}>Food is a word of mouth business and hence some lip smacking food to a targeted audience always help to generate more revenue</li>
                    <li className="animate__animated animate__fadeInRight bullet_list" style={{textAlign:"justify",}}>Having an automated process helps to keep a track for past orders and re-target them with new offers from caterers side</li>
                    <li className="animate__animated animate__fadeInRight bullet_list" style={{textAlign:"justify",}}>In this era of technology an online presence with great customer reviews help build a trust among customers and makes you a step ahead then your competitors.</li>
                    <li className="animate__animated animate__fadeInRight bullet_list" style={{textAlign:"justify",}}>Chances to get orders offline for other bigger events of the customer.</li>
                  </ul>
                    
               </div>
            </div>
         </div>
      </div>


      <section className="section pt-5 pb-5 products-section"style={{ backgroundColor:"#F2F2F2" }}>
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
                  <b style={{fontSize:"40px",color: "#C70039",}}>Plans :</b>
                </h3>
              </div>
              <OwlCarousel
                  nav
                  loop
                  {...options}
                  className="owl-carousel-four owl-theme "
                >
                  <div className="item animate__animated animate__fadeInUpBig" id="price-card1">
                    <CardItem
                    image="../assets/img/Basic.png"
                    onClickedPlans = {displayRazorpayBasic}

                    //   title="Example1"
                    //   subTitle="Some quick example text to build on the panel title and make up
                    // the bulk of the panel's content."
                    />
                  </div>

                  <div className="item animate__animated animate__fadeInDownBig" id="price-card2">
                    <CardItem
                     image="../assets/img/Advanced.png"
                     onClickedPlans = {displayRazorpayAdvanced}

                    //   title="Example2"
                    //   subTitle="Some quick example text to build on the panel title and make up
                    // the bulk of the panel's content. "
                    />
                  </div>
                  <div className="item animate__animated animate__fadeInUpBig" id="price-card3">
                    <CardItem
                      image="../assets/img/Premium.png"
                      onClickedPlans = {displayRazorpayPremium}

                    //   title="Example3"
                    //   subTitle="Some quick example text to build on the panel title and make up
                    // the bulk of the panel's content."
                    />
                  </div>
                  <div className="item animate__animated animate__fadeInDownBig" id="price-card4">
                    <CardItem
                    image="../assets/img/PremiumPro.png"
                    onClickedPlans = {displayRazorpayPremiumPro}
                    //   title="Example4"
                    //   subTitle="Some quick example text to build on the panel title and make up
                    // the bulk of the panel's content."
                    />
                  </div>
                  {/* <div className="item">
                    <CardItem
                     image="../assets/img/PremiumPro.png"

                    //   title="Example5"
                    //   subTitle="Some quick example text to build on the panel title and make up
                    // the bulk of the panel's content."
                    />
                  </div> */}
                </OwlCarousel>
              {/* <div className="table-responsive text-nowrap">
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
              </div> */}
              
            </Col>
          </Row>
        </Container>
      </section>

      

    </Fragment>

  )

}
export default Catering;
