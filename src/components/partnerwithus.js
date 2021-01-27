/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
// import { NavLink } from "react-router-dom";
import firebase from "./Firebase";
import { HashLink as Link } from "react-router-hash-link";
// import Header from "../layout/header/slider-header-2";
// import Footer from "../layout/footer/footer-dark-3";
// import Split from "../container/split/section-split";
// import Team from "../container/element/carousel/team-carousel-one";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import MediaQuery from "react-responsive";
import NavBarListing from "./navBar/navbarListing";
import NavBarlisting2 from "./navBar/Navbarlisting2";

class GeneralRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      gender: "",
      emailid: "",
      mobilenumber: "",
      address: "",
      city: "",
      state: "",
      dishes: "",
      website: "",
      youtube: "",
      gst: "",
      fssai: "",
      cities: [],
    };
    this.validator = new SimpleReactValidator();
  }

  setStateFromInput = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  componentDidMount() {
    const TenderRef = firebase.database().ref("Masters").child("City");
    TenderRef.once("value", (snapshot) => {
      let cities = snapshot.val();
      let newState = [];
      for (let city in cities) {
        newState.push({
          Name: cities[city].Name,
        });
      }

      this.setState({
        cities: newState,
      });
    });
  }

  render() {
    var style = {};
    const self = this;

    function submit() {
      let data = self.state;

      if (data.name === "") {
        alert("Enter Name");
        return;
      }

      if (data.age === "") {
        alert("Enter Age");
        return;
      }

      if (data.gender === "") {
        alert("Select Gender");
        return;
      }

      if (data.gender === "SELECT GENDER") {
        alert("Select Gender");
        return;
      }

      if (data.emailid === "") {
        alert("Enter Email ID");
        return;
      }

      if (data.mobilenumber === "") {
        alert("Enter Mobile Number");
        return;
      }

      if (data.mobilenumber.length < 10) {
        alert("Enter Proper Mobile Number");
        return;
      }

      if (data.address === "") {
        alert("Enter Address");
        return;
      }

      if (data.city === "") {
        alert("Select City");
        return;
      }

      if (data.city === "SELECT CITY") {
        alert("Select City");
        return;
      }

      if (data.dishes === "") {
        alert("Enter Special Dishes");
        return;
      }

      if (data.fssai === "") {
        alert("Select FSSAI");
        return;
      }

      if (data.gst === "") {
        alert("Select GST");
        return;
      }

      var now = new Date();
      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);
      var today = now.getFullYear() + "-" + month + "-" + day;
      const ref = firebase
        .database()
        .ref()
        .child("Referrals")
        .child("Partner")
        .push();
      ref.child("PushId").set(ref.getKey());
      ref.child("Name").set(self.state.name);
      ref.child("Email").set(self.state.emailid);
      ref.child("MobileNumber").set(self.state.mobilenumber);
      ref.child("Gender").set(self.state.gender);
      ref.child("Age").set(self.state.age);
      ref.child("Address").set(self.state.address);
      ref.child("Locality").set("");
      ref.child("City").set(self.state.city);
      ref.child("State").set("");
      ref.child("Dishes").set(self.state.dishes);
      ref.child("Fb").set(self.state.website);
      ref.child("Youtube").set(self.state.youtube);
      ref.child("Fssai").set(self.state.fssai);
      ref.child("Gst").set(self.state.gst);
      ref.child("Created").set(today);

      var cname = self.state.name;
      var mno = self.state.mobilenumber;

      axios
        .post(
          "https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles=" +
            mno +
            "&sms=Congratulations, " +
            cname +
            ",%0aThanks for showing interest towards MothersFood as a Home Chef. Please download the app and book the slot now for taste audit. https://bit.ly/mfhc %0a- Team MothersFood&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type="
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      alert(
        "Hey Foodie! We have received your request you will soon receive a call from one of our food experts."
      );

      data.name = "";
      data.emailid = "";
      data.mobilenumber = "";
      data.gender = "";
      data.age = "";
      data.address = "";
      data.city = "";
      data.dishes = "";
      data.website = "";
      data.youtube = "";
      data.fssai = "";
      data.gst = "";

      document.getElementById("create-course-form").reset();

      // window.location.reload(false);
    }
    var isLoggedin = localStorage.getItem("isLogging");
    return (
      <Fragment>
        {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}
        <MediaQuery minDeviceWidth={1224}>
          <div
            className="intro-four bgimage"
            style={{ minHeight: "30.33333rem" }}
          >
            <div
              className="bg_image_holder_ride"
              style={{ backgroundColor: "#edf3f5" }}
            >
              <img
                src="./assets/img/partnerwithusNew.png"
                style={{
                  minHeight: "30.33333rem",
                  Width: "500px",
                  maxWidth: "100%",
                  height: "450px",
                  marginLeft: "40%",
                }}
                alt=""
              />
            </div>

            <div className="intro-four--contents content_above">
              <div className="container">
                <div className="row ">
                  <div className="col-lg-7">
                    <h1
                      className="display-4 text-left"
                      style={{ fontWeight: 500, marginTop: "-30%" }}
                    >
                      Partner With Us
                    </h1>
                    <p className="text-left">
                      Empowering women with the wonderful cooking skills to
                      spread their talent and earn money{" "}
                    </p>
                    <div className="row text-left">
                      <div className="col-md-12 text-left">
                        <Link
                          to="/partnerwithus#registerwithus"
                          className="btn btn-danger "
                          style={{
                            background: "#E41C39",
                            border: "#E41C39",
                            color: "white",
                            marginTop: "2%",
                          }}
                        >
                          Register With Us &nbsp;&nbsp;
                          <span className="la la-arrow-right"></span>
                        </Link>
                        <br />
                        {/* <Link to="/payonline" className="btn btn-danger"  style={{background:"#E41C39",border:"#E41C39",color:"white",marginTop:"2%"}}>Pay Online   &nbsp;&nbsp;<span className="la la-arrow-right"></span></Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- ends: .intro-four-contents -->*/}
          <div className="card">
            <section className="features-area  p-top-20 p-bottom-20">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ marginTop: "10px" }}>
                    <div
                      className="col-lg-12 col-md-12 col-sm-6"
                      style={{ margin: "auto", fontSize: "15px" }}
                    >
                      <h3 style={{ color: "#E41C39" }} className="text-left">
                        <b>Why partner with us?</b>
                      </h3>
                      <div className=" icon-box-fourteen text-left">
                        <p
                          className="m-top-0 p-top-0 text-left"
                          style={{ fontSize: "15px" }}
                        >
                          Either choose to sit at home and cry for attention, or
                          get on board to rock your kitchen and be successful,
                          being awesome is your own choice.
                        </p>
                        <ul className="bullet--list2">
                          <li className="bullet_list text-left">
                            What’s something that you can cook like no one else
                            can?
                          </li>
                          <li className="bullet_list text-left">
                            What are your splendid dishes that your family wars
                            for a bigger piece?
                          </li>
                          <li className="bullet_list text-left">
                            {" "}
                            What is that one famous dish of yours that everyone
                            in the party awaits?
                          </li>
                        </ul>
                        If you happened to have an answer to the above
                        questions, we’re out looking for you. MothersFood is
                        designed to empower the home chefs, especially women
                        whose impressive dishes are limited to home till now.
                        Who doesn’t wanna get recognized for something they’re
                        really good at? I hope everyone, but there’s always some
                        reason to hold you back. But remember, nothing works
                        unless you start to do it.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-bg p-top-50 p-bottom-80">
              <div className="card-style-nine">
                <div className="container">
                  <div className="row" style={{ marginTop: "10px" }}>
                    <div className="col-lg-8 offset-lg-2 section-title text-center">
                      <h3 style={{ color: "#E41C39" }}>
                        <b>Why MothersFood?</b>
                      </h3>
                      <p>
                        But why us? Let us take the pleasure to brag about our
                        excellent features that didn’t exist in the market to
                        date.
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/partnericon1.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6 style={{ fontSize: "20px" }}>
                            <b>Only The Best</b>
                          </h6>
                          <p className="text-left" style={{ fontSize: "15px" }}>
                            You don’t have to have a complete menu to work with
                            us. If you can make only one dish that everyone
                            loves, you’re welcome on board.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/partnericon2.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6 style={{ fontSize: "20px" }}>
                            <b>Delivery</b>
                          </h6>
                          <p
                            className="text-left"
                            style={{ wordSpacing: "-0.2px", fontSize: "15px" }}
                          >
                            We’re here to share your burden. You just cook and
                            relax, our delivery partners make sure to take it to
                            the right place at the right time.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/partnericon3.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6 style={{ fontSize: "20px" }}>
                            <b>License</b>
                          </h6>
                          <p
                            className="text-left"
                            style={{ wordSpacing: "-0.2px", fontSize: "15px" }}
                          >
                            Don’t worry about the licenses, registrations or
                            permissions anymore. As per your state laws, we’ll
                            stack everything required to start you off.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*<!-- ends: .card-style-nine -->*/}
            </section>

            <section className="features-area  p-top-20 p-bottom-20">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ marginTop: "10px" }}>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6"
                      style={{ margin: "auto" }}
                    >
                      <h3 style={{ color: "#E41C39" }} className="text-left">
                        <b>M-Food Star Chef Recognition</b>
                      </h3>
                      <div className=" icon-box-fourteen text-center">
                        <p
                          className="m-top-0 p-top-0"
                          style={{ textAlign: "justify", fontSize: "15px" }}
                        >
                          We believe in recognizing the talents that are
                          impeccable at their job. To bring it to reality, we’ve
                          come up with “M-Food Star Chef Recognition” to keep
                          your competitive spirit motivated. Once in a month,
                          we’ll evaluate your performance based on the customer
                          ratings, your efficiency to finish an order smoothly,
                          and several other factors and announce our best
                          chef-partner as “M-Food Star Chef” of that specific
                          month. <br />
                          This will help you improve your rating as the best
                          chef in your area and more likely to be recognized by
                          more people. So, as John Wooden says, make each day
                          your masterpiece
                        </p>
                      </div>
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}

                    <div
                      className="col-lg-6 col-md-6 col-sm-6"
                      style={{ margin: "auto" }}
                    >
                      {/* <div className="icon-box-fourteen text-center">
                        <img
                          src="../assets/img/chefs/Pallavi Mohan Shahi3.jpg"
                          width="300px"
                          className="img-responsive"
                          alt="mf"
                        ></img>
                      </div> */}
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}
                  </div>
                </div>
              </div>
              {/*<!-- ends: .icon-boxes -->*/}
            </section>

            <section className="features-area  p-top-20 p-bottom-20">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-12 col-md-12 col-sm-6"
                      style={{ margin: "auto" }}
                    >
                      <h3 style={{ color: "#E41C39" }} className="text-left">
                        <b>Bulk Orders</b>
                      </h3>
                      <div className=" icon-box-fourteen ">
                        <p
                          className="m-top-0 p-top-0 text-left"
                          style={{ fontSize: "15px" }}
                        >
                          People usually don’t want to take a chance in parties
                          or larger gatherings and tend to order from the places
                          that they already tasted and liked it much. Makes
                          sense. Right? If you get a customer of that kind,
                          we’ll be happy to be a part of your growth. <br />
                          Under the same subscription fee, we’ll forward you the
                          bulk order leads that ranks your talent.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="features-area  p-top-40 p-bottom-40">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 text-center"
                      style={{ margin: "auto" }}
                    >
                      <img
                        src="../assets/img/giftvouchers.png"
                        width="150px"
                        className="img-responsive"
                        alt="mf"
                      ></img>
                      <h3 style={{ color: "#E41C39" }}>
                        <b>Gifts &amp; Vouchers</b>
                      </h3>
                      <div className=" icon-box-fourteen text-justify">
                        <p
                          className="m-top-0 p-top-0 text-left"
                          style={{ fontSize: "15px" }}
                        >
                          Our customers will get to rate the taste once the
                          order is completed. The chef-partners who strive to
                          satisfy the taste-buds of our customers, we’ve got
                          something for you too. Every month we’ll evaluate the
                          taste ratings and announce one chef-partner with a
                          High-taste rating as the winner. The winner will
                          receive many exciting prizes like Microwave oven, Mini
                          Refrigerators, Cutlery set, and a lot more worth of
                          5,000 to 10,000. Sounds exciting. Right?
                        </p>
                      </div>
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}

                    <div
                      className="col-lg-6 col-md-6 col-sm-6 text-center"
                      style={{ margin: "auto" }}
                    >
                      <img
                        src="../assets/img/grocerydeals.png"
                        width="150px"
                        className="img-responsive"
                        alt="mf"
                      ></img>
                      <h3 style={{ color: "#E41C39" }}>
                        <b>Grocery Deals</b>
                      </h3>
                      <div className=" icon-box-fourteen text-justify">
                        <p
                          className="m-top-0 p-top-0 text-left"
                          style={{ fontSize: "15px" }}
                        >
                          We want to make everything that we can do keep our
                          chef-partners happy b. In the process, we came up with
                          an M-food Grocery store, where you can buy all the
                          required groceries to save more than usual. How is it
                          different from buying from local markets or other
                          supermarkets around? We’ve established connections
                          with brands directly to get groceries for the best
                          possible deals. So, all the wholesale or retail
                          charges are grounded, and you can take the complete
                          benefit of it.
                        </p>
                      </div>
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}
                  </div>
                </div>
              </div>
              {/*<!-- ends: .icon-boxes -->*/}
            </section>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={480} minDeviceWidth={300}>
          <div
            className="intro-four bgimage"
            style={{ minHeight: "30.33333rem" }}
          >
            {/* <div
              className="bg_image_holder_ride"
              style={{ backgroundColor: "#edf3f5" }}
            >
              <img
                src="./assets/img/partnerwithusNew.png"
                style={{
                  minHeight: "30.33333rem",
                  Width: "500px",
                  maxWidth: "100%",
                  height: "450px",
                  marginLeft: "40%",
                }}
                alt=""
              />
            </div> */}

            <div className="intro-four--contents content_above">
              <div className="container">
                <div className="row ">
                  <div className="col-lg-7">
                    <h1
                      className="display-4 text-left"
                      style={{
                        fontWeight: 500,
                        marginTop: "-10%",
                        backgroundColor: "#edf3f5",
                      }}
                    >
                      Partner With Us
                    </h1>
                    <p className="text-left">
                      Empowering women with the wonderful cooking skills to
                      spread their talent and earn money{" "}
                    </p>
                    <div className="row text-left">
                      <div className="col-md-12 text-left">
                        <Link
                          to="/partnerwithus#registerwithus"
                          className="btn btn-danger "
                          style={{
                            background: "#E41C39",
                            border: "#E41C39",
                            color: "white",
                            marginTop: "2%",
                          }}
                        >
                          Register With Us &nbsp;&nbsp;
                          <span className="la la-arrow-right"></span>
                        </Link>
                        <br />
                        {/* <Link to="/payonline" className="btn btn-danger"  style={{background:"#E41C39",border:"#E41C39",color:"white",marginTop:"2%"}}>Pay Online   &nbsp;&nbsp;<span className="la la-arrow-right"></span></Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- ends: .intro-four-contents -->*/}
          <div className="card">
            <section className="features-area  p-top-20 p-bottom-20">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ marginTop: "-30%" }}>
                    <div
                      className="col-lg-12 col-md-12 col-sm-6"
                      style={{ marginTop: "30%", fontSize: "10px" }}
                    >
                      <h3 style={{ color: "#E41C39" }} className="text-left">
                        <b>Why partner with us?</b>
                      </h3>
                      <div className=" icon-box-fourteen text-left">
                        <p
                          className="m-top-0 p-top-0 text-left"
                          style={{ fontSize: "15px" }}
                        >
                          Either choose to sit at home and cry for attention, or
                          get on board to rock your kitchen and be successful,
                          being awesome is your own choice.
                        </p>
                        <ul className="bullet--list2">
                          <li className="bullet_list text-left">
                            What’s something that you can cook like no one else
                            can?
                          </li>
                          <li className="bullet_list text-left">
                            What are your splendid dishes that your family wars
                            for a bigger piece?
                          </li>
                          <li className="bullet_list text-left">
                            {" "}
                            What is that one famous dish of yours that everyone
                            in the party awaits?
                          </li>
                        </ul>
                        If you happened to have an answer to the above
                        questions, we’re out looking for you. MothersFood is
                        designed to empower the home chefs, especially women
                        whose impressive dishes are limited to home till now.
                        Who doesn’t wanna get recognized for something they’re
                        really good at? I hope everyone, but there’s always some
                        reason to hold you back. But remember, nothing works
                        unless you start to do it.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-bg p-top-50 p-bottom-80">
              <div className="card-style-nine">
                <div className="container">
                  <div className="row" style={{ marginTop: "10px" }}>
                    <div className="col-lg-8 offset-lg-2 section-title text-center">
                      <h3 style={{ color: "#E41C39" }}>
                        <b>Why MothersFood?</b>
                      </h3>
                      <p>
                        But why us? Let us take the pleasure to brag about our
                        excellent features that didn’t exist in the market to
                        date.
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/partnericon1.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6 style={{ fontSize: "20px" }}>
                            <b>Only The Best</b>
                          </h6>
                          <p className="text-left" style={{ fontSize: "15px" }}>
                            You don’t have to have a complete menu to work with
                            us. If you can make only one dish that everyone
                            loves, you’re welcome on board.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/partnericon2.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6 style={{ fontSize: "20px" }}>
                            <b>Delivery</b>
                          </h6>
                          <p
                            className="text-left"
                            style={{ wordSpacing: "-0.2px", fontSize: "15px" }}
                          >
                            We’re here to share your burden. You just cook and
                            relax, our delivery partners make sure to take it to
                            the right place at the right time.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/partnericon3.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6 style={{ fontSize: "20px" }}>
                            <b>License</b>
                          </h6>
                          <p
                            className="text-left"
                            style={{ wordSpacing: "-0.2px", fontSize: "15px" }}
                          >
                            Don’t worry about the licenses, registrations or
                            permissions anymore. As per your state laws, we’ll
                            stack everything required to start you off.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*<!-- ends: .card-style-nine -->*/}
            </section>

            <section className="features-area  p-top-20 p-bottom-20">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ marginTop: "10px" }}>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6"
                      style={{ margin: "auto" }}
                    >
                      <h3 style={{ color: "#E41C39" }} className="text-left">
                        <b>M-Food Star Chef Recognition</b>
                      </h3>
                      <div className=" icon-box-fourteen text-center">
                        <p
                          className="m-top-0 p-top-0"
                          style={{ textAlign: "justify", fontSize: "15px" }}
                        >
                          We believe in recognizing the talents that are
                          impeccable at their job. To bring it to reality, we’ve
                          come up with “M-Food Star Chef Recognition” to keep
                          your competitive spirit motivated. Once in a month,
                          we’ll evaluate your performance based on the customer
                          ratings, your efficiency to finish an order smoothly,
                          and several other factors and announce our best
                          chef-partner as “M-Food Star Chef” of that specific
                          month. <br />
                          This will help you improve your rating as the best
                          chef in your area and more likely to be recognized by
                          more people. So, as John Wooden says, make each day
                          your masterpiece
                        </p>
                      </div>
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}

                    <div
                      className="col-lg-6 col-md-6 col-sm-6"
                      style={{ margin: "auto" }}
                    >
                      <div className="icon-box-fourteen text-center">
                        <img
                          src="../assets/img/chefs/Pallavi Mohan Shahi3.jpg"
                          width="300px"
                          className="img-responsive"
                          alt="mf"
                        ></img>
                      </div>
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}
                  </div>
                </div>
              </div>
              {/*<!-- ends: .icon-boxes -->*/}
            </section>

            <section className="features-area  p-top-20 p-bottom-20">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-12 col-md-12 col-sm-6"
                      style={{ margin: "auto" }}
                    >
                      <h3 style={{ color: "#E41C39" }} className="text-left">
                        <b>Bulk Orders</b>
                      </h3>
                      <div className=" icon-box-fourteen ">
                        <p
                          className="m-top-0 p-top-0 text-left"
                          style={{ fontSize: "15px" }}
                        >
                          People usually don’t want to take a chance in parties
                          or larger gatherings and tend to order from the places
                          that they already tasted and liked it much. Makes
                          sense. Right? If you get a customer of that kind,
                          we’ll be happy to be a part of your growth. <br />
                          Under the same subscription fee, we’ll forward you the
                          bulk order leads that ranks your talent.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="features-area  p-top-40 p-bottom-40">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 text-center"
                      style={{ margin: "auto" }}
                    >
                      <img
                        src="../assets/img/giftvouchers.png"
                        width="150px"
                        className="img-responsive"
                        alt="mf"
                      ></img>
                      <h3 style={{ color: "#E41C39" }}>
                        <b>Gifts &amp; Vouchers</b>
                      </h3>
                      <div className=" icon-box-fourteen text-justify">
                        <p
                          className="m-top-0 p-top-0 text-left"
                          style={{ fontSize: "15px" }}
                        >
                          Our customers will get to rate the taste once the
                          order is completed. The chef-partners who strive to
                          satisfy the taste-buds of our customers, we’ve got
                          something for you too. Every month we’ll evaluate the
                          taste ratings and announce one chef-partner with a
                          High-taste rating as the winner. The winner will
                          receive many exciting prizes like Microwave oven, Mini
                          Refrigerators, Cutlery set, and a lot more worth of
                          5,000 to 10,000. Sounds exciting. Right?
                        </p>
                      </div>
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}

                    <div
                      className="col-lg-6 col-md-6 col-sm-6 text-center"
                      style={{ margin: "auto" }}
                    >
                      <img
                        src="../assets/img/grocerydeals.png"
                        width="150px"
                        className="img-responsive"
                        alt="mf"
                      ></img>
                      <h3 style={{ color: "#E41C39" }}>
                        <b>Grocery Deals</b>
                      </h3>
                      <div className=" icon-box-fourteen text-justify">
                        <p
                          className="m-top-0 p-top-0 text-left"
                          style={{ fontSize: "15px" }}
                        >
                          We want to make everything that we can do keep our
                          chef-partners happy b. In the process, we came up with
                          an M-food Grocery store, where you can buy all the
                          required groceries to save more than usual. How is it
                          different from buying from local markets or other
                          supermarkets around? We’ve established connections
                          with brands directly to get groceries for the best
                          possible deals. So, all the wholesale or retail
                          charges are grounded, and you can take the complete
                          benefit of it.
                        </p>
                      </div>
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}
                  </div>
                </div>
              </div>
              {/*<!-- ends: .icon-boxes -->*/}
            </section>
          </div>
        </MediaQuery>

        <section
          className="section-bg p-top-30 p-bottom-50"
          id="registerwithus"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="border-bottom p-bottom-25 m-bottom-40 text-left">
                  Partner With Us
                </h4>
                <form id="create-course-form">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group  text-left">
                        <label>
                          Full Name
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          onChange={this.setStateFromInput}
                          placeholder="Full Name"
                        />
                      </div>
                      {/* ends: .form-group */}
                    </div>
                    <div className="col-md-4">
                      <div className="form-group  text-left">
                        <label>
                          Age
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="number"
                          name="age"
                          className="form-control"
                          onChange={this.setStateFromInput}
                          placeholder="Age"
                        />
                      </div>
                      {/* ends: .form-group */}
                    </div>
                    <div className="col-md-4">
                      <div className="form-group  text-left">
                        <label>
                          Gender
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <div className="select-basic">
                          <select
                            name="gender"
                            class="form-control"
                            onChange={this.setStateFromInput}
                          >
                            <option value="SELECT GENDER">SELECT GENDER</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row p-top-15">
                    <div className="col-md-4">
                      <div className="form-group  text-left">
                        <label>
                          Email Address
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="email"
                          name="emailid"
                          className="form-control"
                          onChange={this.setStateFromInput}
                          placeholder="Email"
                        />
                      </div>
                      {/* ends: .form-group */}
                    </div>
                    <div className="col-md-4">
                      <div className="form-group  text-left">
                        <label>
                          Mobile Number
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="mobilenumber"
                          className="form-control"
                          onChange={this.setStateFromInput}
                          placeholder="Mobile Number"
                        />
                      </div>
                      {/* ends: .form-group */}
                    </div>
                  </div>

                  <div className="row p-top-15">
                    <div className="col-md-12">
                      <div className="form-group  text-left">
                        <label>
                          Full Address
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          onChange={this.setStateFromInput}
                          placeholder="Address"
                        />
                      </div>
                      {/* ends: .form-group */}
                    </div>
                    <div className="col-md-12 p-top-15">
                      <div className="form-group  text-left">
                        <label>
                          City
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <select
                          name="city"
                          class="form-control"
                          onChange={this.setStateFromInput}
                        >
                          <option value="SELECT CITY">SELECT CITY</option>
                          {this.state.cities.map((city) => {
                            return (
                              <option value={city.Name}>{city.Name}</option>
                            );
                          })}
                          ;
                        </select>
                      </div>
                      {/* ends: .form-group */}
                    </div>
                  </div>

                  <div className="form-group p-top-15 text-left">
                    <label>
                      Specialised Dishes
                      <span className="sup" style={{ color: "red" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="dishes"
                      onChange={this.setStateFromInput}
                      className="form-control"
                      placeholder="Specialed Dishes"
                    />
                  </div>
                  {/* ends: .form-group */}

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group  text-left">
                        <label>
                          FSSAI Available
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <div className="select-basic">
                          <select
                            name="fssai"
                            class="form-control"
                            onChange={this.setStateFromInput}
                          >
                            <option value="SELECT ">SELECT </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      {/* ends: .form-group */}
                    </div>
                    <div className="col-md-4">
                      <div className="form-group  text-left">
                        <label>
                          GST Available
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <div className="select-basic">
                          <select
                            name="gst"
                            class="form-control"
                            onChange={this.setStateFromInput}
                          >
                            <option value="SELECT ">SELECT </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      {/* ends: .form-group */}
                    </div>
                  </div>

                  <div className="form-group p-top-15 text-left">
                    <label>Website/Facebook/Instagram</label>
                    <input
                      type="text"
                      name="website"
                      onChange={this.setStateFromInput}
                      className="form-control"
                      placeholder="Website/Facebook/Instagram Links"
                    />
                  </div>
                  {/* ends: .form-group */}

                  <div className="form-group p-top-5 text-left">
                    <label>
                      Youtube Channel{" "}
                      <span className="optional">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="youtube"
                      onChange={this.setStateFromInput}
                      className="form-control"
                      placeholder="Youtube Channel Link"
                    />
                  </div>
                  {/* ends: .form-group */}
                </form>

                <div className="btns m-top-50 text-left">
                  <button
                    type="submit"
                    onClick={submit}
                    className="btn btn-danger m-right-25"
                    style={{ background: "#E41C39", border: "#E41C39" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            {/* end: .row */}
          </div>
        </section>
      </Fragment>
    );
  }
}

export default GeneralRules;
