import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import firebase from "./Firebase";
import { HashLink as Link } from "react-router-hash-link";
import SimpleReactValidator from "simple-react-validator";
import MediaQuery from "react-responsive";
class GeneralRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      gender: "",
      mobilenumber: "",
      type: "",
      city: "",
      state: "",
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

  // aadharupload = e =>{

  //      if(e.target.files[0] == 0){
  //         alert("Add Aadhar Image");
  //         return;
  //     }

  //     const ref = firebase.storage().ref("/DSC/");
  //     const file = e.target.files[0];
  //     const name = e.target.files[0] + Date();
  //     const metadata = {
  //     contentType: file.type
  //     };
  //     const task = ref.child(name).put(file, metadata);
  //     task
  //     .then(snapshot => snapshot.ref.getDownloadURL())
  //     .then((url) => {
  //         var obj={};
  //         obj["aadharcard"] = url
  //         this.setState(obj);
  //         var temp = 1;
  //         obj={};
  //         obj["temp"] = temp
  //         this.setState(obj)
  //     })
  //     .catch(console.error);

  // }

  render() {
    // eslint-disable-next-line no-unused-vars
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

      if (data.mobilenumber === "") {
        alert("Enter Mobile Number");
        return;
      }

      if (data.mobilenumber.length < 10) {
        alert("Enter Proper Mobile Number");
        return;
      }

      if (data.type === "") {
        alert("Select Type");
        return;
      }

      if (data.city === "") {
        alert("Enter City");
        return;
      }

      //   if(data.state == ""){
      //       alert("Select State");
      //       return;
      //   }

      var now = new Date();
      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);
      var today = now.getFullYear() + "-" + month + "-" + day;
      const ref = firebase
        .database()
        .ref()
        .child("Referrals")
        .child("Delivery")
        .push();
      ref.child("PushId").set(ref.getKey());
      ref.child("Name").set(self.state.name);
      ref.child("Gender").set(self.state.gender);
      ref.child("Age").set(self.state.age);
      ref.child("MobileNumber").set(self.state.mobilenumber);
      ref.child("City").set(self.state.city);
      ref.child("Type").set(self.state.type);
      ref.child("Created").set(today);

      data.name = "";
      data.gender = "";
      data.age = "";
      data.mobilenumber = "";
      data.city = "";
      data.state = "";
      data.type = "";

      document.getElementById("create-course-form").reset();

      alert(
        "Hurray! We’ve received your application for delivery partner with MothersFood. You’ll soon receive a call from our team to share further details."
      );

      // window.location.reload(false);
    }

    return (
      <Fragment>
        <div className="card">
          <MediaQuery minDeviceWidth={1224}>
            <div
              className="intro-four bgimage"
              style={{ minHeight: "25.33333rem" }}
            >
              <div
                className="bg_image_holder_ride"
                style={{ marginLeft: "-20%", marginTop: "-10%" }}
              >
                <img src="./assets/img/drivewithus.png" alt="" />
              </div>
              <div className="intro-four--contents content_above">
                <div className="container">
                  <div className="row">
                    <div className=" col-lg-7">
                      <h1
                        className="display-3 text-left"
                        style={{ marginTop: "5%", fontWeight: 400 }}
                      >
                        Drive With Us
                      </h1>
                      <p className="text-left" style={{ fontSize: "15px" }}>
                        As much as the chef partners are essential to cook the
                        delicious food, driver-partners are vital to delivering
                        that food to the destination right on time.
                      </p>

                      <div className="row">
                        <div className="col-md-12 text-left">
                          <Link
                            to="/ridewithus#registerwithus"
                            className="btn btn-danger"
                            style={{
                              background: "#E41C39",
                              border: "#E41C39",
                              color: "white",
                              marginTop: "2%",
                            }}
                          >
                            Register with us &nbsp;&nbsp;
                            <span className="la la-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="features-area p-top-20 p-bottom-20">
              <div className="icon-boxes card">
                <div className="container">
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-12 col-md-12 col-sm-6"
                      style={{ marginTop: "10px" }}
                    >
                      <h3 className="text-left" style={{ color: "#E41C39" }}>
                        <b>Why partner with us?</b>
                      </h3>
                      <div className=" icon-box-fourteen text-left">
                        <p className="m-top-0 p-top-0 text-left">
                          As much as the chef partners are essential to cook the
                          delicious food, driver-partners are vital to
                          delivering that food to the destination right on time.{" "}
                        </p>
                        <ul className="bullet--list2">
                          <li className="bullet_list">
                            Serving the steaming hot food at your doorstep
                          </li>
                          <li className="bullet_list text-left">
                            Ensuring the customer not to worry about eating food
                            from their favorite place.
                          </li>
                          <li className="bullet_list text-left">
                            Satisfying their tummy monster with goodie good food
                          </li>
                        </ul>
                        If you like to roam around your beloved city while
                        satisfying the taste buds of the customers from
                        excellent home chefs and deliver the food on-time no
                        matter what, we’re in need of you. Your act of serving
                        people will be noticed and appreciated. To give you a
                        little push towards your dreams, to let you pay the fee
                        of your college, to provide you with the ability to take
                        care of your family, MothersFood has come up with as
                        many benefits as possible, while you enjoy taking a ride
                        in the city and delivery the finger-licking food to the
                        customers.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-bg p-top-50 p-bottom-80">
              <div className="card-style-nine">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 offset-lg-2 section-title text-center">
                      <h3 className="" style={{ color: "#E41C39" }}>
                        <b>Rider Benefits?</b>
                      </h3>
                      <p className="">
                        Read through and find the benefits of being an M-Food
                        Delivery partner
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/ride1.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6>
                            <NavLink to="/">
                              <b>Awards &amp; Rewards</b>
                            </NavLink>
                          </h6>
                          <p className="text-left">
                            Customer satisfaction is what we aim for-good food
                            with good delivery services. Ride with us and earn
                            amazing awards and rewards according to your
                            delivery ratings.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/ride2.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6>
                            <NavLink to="/">
                              <b>Your life is at our protection</b>
                            </NavLink>
                          </h6>
                          <p className="text-left">
                            Emergency and unpredictable situations are
                            unavoidable. MothersFood provides insurance for all
                            our delivery partners to support their families in
                            hard times.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/ride3.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6>
                            <NavLink to="/">
                              <b>We are a family</b>
                            </NavLink>
                          </h6>
                          <p className="text-left">
                            Everyone who gets on board, becomes a part of the
                            MothersFood family. MothersFood kit- t-shirt, cap,
                            bag is a small gesture from our side to show that
                            you are family.
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
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-12 col-md-12 col-sm-6"
                      style={{ margin: "auto" }}
                    >
                      <div className=" icon-box-fourteen ">
                        <p className="m-top-0 p-top-0 text-left">
                          Sounds exciting? Don’t wait anymore. Register with us
                          now and start your exciting journey with MothersFood.
                          Well, we believe that our happiness lies in yours,
                          which makes us go any mile to keep you happy and
                          sound.
                          <br />
                          What do you need to have to become an M-Food Driver
                          partner? Nothing more than a Two-wheeler with a valid
                          driving license and a smart to be aware of your
                          assignments. That’s it. You can get on board with no
                          other possessions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-bg " style={{ background: "#ffffff" }}>
              <div className="card-style-nine">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="card" style={{ border: "none" }}>
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/incentives.png"
                            height="200px"
                            className="img-responsive"
                            alt=""
                          ></img>
                          <h4 style={{ color: "#E41C39" }}>
                            <NavLink to="/">
                              <b>Attractive Incentives</b>
                            </NavLink>
                          </h4>
                          <p style={{ textAlign: "justify" }}>
                            Reached your delivery limit successfully? Pushed
                            yourself to serve more people? Arrived before the
                            expected time? Then you should surely be rewarded.
                            M-Food’s attractive incentive program will
                            appreciate every milestone to keep you right on
                            track.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="card" style={{ border: "none" }}>
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/performance.png"
                            height="200px"
                            className="img-responsive"
                            alt=""
                          />
                          <h4 style={{ color: "#E41C39" }}>
                            <NavLink to="/">
                              <b>Performance Rewards</b>
                            </NavLink>
                          </h4>
                          <p style={{ textAlign: "justify" }}>
                            There’s nothing that matters to you more than your
                            job? MothersFood considers several factors like
                            average delivery time, no. Of order completed in a
                            month, previous month performance, and a lot more
                            things and announces the tremendous performing
                            Driver-partners as Best performers. Wait, we’re not
                            done yet. The best performer will be rewarded
                            rightly
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

            <section className="features-area ">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6"
                      style={{ marginTop: "-5%" }}
                    >
                      <h3 className="text-left" style={{ color: "#E41C39" }}>
                        <b>M-Food Star Rider</b>
                      </h3>
                      <div className=" icon-box-fourteen text-center">
                        <p
                          className="m-top-0 p-top-0"
                          style={{ textAlign: "justify" }}
                        >
                          If our customers love your service, so do we. The more
                          the positive ratings you get, the closer you move
                          towards being awesome. Based on the ratings and
                          reviews by our customers, we’ll announce one of the
                          delivery partners as M-Food Star ride and award them
                          with super-cool gifts or brand vouchers like Flipkart,
                          Amazon, Myntra, etc
                        </p>
                      </div>
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}

                    <div
                      className="col-lg-6 col-md-6 col-sm-6"
                      style={{ marginTop: "-5%" }}
                    >
                      <div className="icon-box-fourteen text-center">
                        <img
                          src="../assets/img/driver.png"
                          width="300px"
                          className="img-responsive"
                          alt=""
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
          </MediaQuery>
        </div>
        <div className="card">
          <MediaQuery maxDeviceWidth={480} minDeviceWidth={300}>
            <div
              className="intro-four bgimage"
              style={{ minHeight: "25.33333rem" }}
            >
              {/* <div
              className="bg_image_holder_ride"
              style={{ marginLeft: "-20%", marginTop: "-10%" }}
            >
              <img src="./assets/img/drivewithus.png" alt="" />
            </div> */}
              <div className="intro-four--contents content_above">
                <div className="container">
                  <div className="row">
                    <div className=" col-lg-7">
                      <h1
                        className="display-3 text-left"
                        style={{ marginTop: "-3%", fontWeight: 400 }}
                      >
                        Drive With Us
                      </h1>
                      <p className="text-left" style={{ fontSize: "15px" }}>
                        As much as the chef partners are essential to cook the
                        delicious food, driver-partners are vital to delivering
                        that food to the destination right on time.
                      </p>

                      <div className="row">
                        <div className="col-md-12 text-left">
                          <Link
                            to="/ridewithus#registerwithus"
                            className="btn btn-danger"
                            style={{
                              background: "#E41C39",
                              border: "#E41C39",
                              color: "white",
                              marginTop: "2%",
                            }}
                          >
                            Register with us &nbsp;&nbsp;
                            <span className="la la-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="features-area p-top-20 p-bottom-20">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-12 col-md-12 col-sm-6"
                      style={{ margin: "auto" }}
                    >
                      <h3 className="text-left" style={{ color: "#E41C39" }}>
                        <b>Why partner with us?</b>
                      </h3>
                      <div className=" icon-box-fourteen text-left">
                        <p className="m-top-0 p-top-0 text-left">
                          As much as the chef partners are essential to cook the
                          delicious food, driver-partners are vital to
                          delivering that food to the destination right on time.{" "}
                        </p>
                        <ul className="bullet--list2">
                          <li className="bullet_list">
                            Serving the steaming hot food at your doorstep
                          </li>
                          <li className="bullet_list text-left">
                            Ensuring the customer not to worry about eating food
                            from their favorite place.
                          </li>
                          <li className="bullet_list text-left">
                            Satisfying their tummy monster with goodie good food
                          </li>
                        </ul>
                        If you like to roam around your beloved city while
                        satisfying the taste buds of the customers from
                        excellent home chefs and deliver the food on-time no
                        matter what, we’re in need of you. Your act of serving
                        people will be noticed and appreciated. To give you a
                        little push towards your dreams, to let you pay the fee
                        of your college, to provide you with the ability to take
                        care of your family, MothersFood has come up with as
                        many benefits as possible, while you enjoy taking a ride
                        in the city and delivery the finger-licking food to the
                        customers.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-bg p-top-50 p-bottom-80">
              <div className="card-style-nine">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 offset-lg-2 section-title text-center">
                      <h3 className="" style={{ color: "#E41C39" }}>
                        <b>Rider Benefits?</b>
                      </h3>
                      <p className="">
                        Read through and find the benefits of being an M-Food
                        Delivery partner
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/ride1.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6>
                            <NavLink to="/">
                              <b>Awards &amp; Rewards</b>
                            </NavLink>
                          </h6>
                          <p className="text-left">
                            Customer satisfaction is what we aim for-good food
                            with good delivery services. Ride with us and earn
                            amazing awards and rewards according to your
                            delivery ratings.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/ride2.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6>
                            <NavLink to="/">
                              <b>Your life is at our protection</b>
                            </NavLink>
                          </h6>
                          <p className="text-left">
                            Emergency and unpredictable situations are
                            unavoidable. MothersFood provides insurance for all
                            our delivery partners to support their families in
                            hard times.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="card">
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/ride3.png"
                            width="80px"
                            height="80px"
                            className="img-responsive"
                            alt=""
                          />
                          <h6>
                            <NavLink to="/">
                              <b>We are a family</b>
                            </NavLink>
                          </h6>
                          <p className="text-left">
                            Everyone who gets on board, becomes a part of the
                            MothersFood family. MothersFood kit- t-shirt, cap,
                            bag is a small gesture from our side to show that
                            you are family.
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
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-12 col-md-12 col-sm-6"
                      style={{ margin: "auto" }}
                    >
                      <div className=" icon-box-fourteen ">
                        <p className="m-top-0 p-top-0 text-left">
                          Sounds exciting? Don’t wait anymore. Register with us
                          now and start your exciting journey with MothersFood.
                          Well, we believe that our happiness lies in yours,
                          which makes us go any mile to keep you happy and
                          sound.
                          <br />
                          What do you need to have to become an M-Food Driver
                          partner? Nothing more than a Two-wheeler with a valid
                          driving license and a smart to be aware of your
                          assignments. That’s it. You can get on board with no
                          other possessions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-bg " style={{ background: "#ffffff" }}>
              <div className="card-style-nine">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="card" style={{ border: "none" }}>
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/incentives.png"
                            height="200px"
                            className="img-responsive"
                            alt=""
                          ></img>
                          <h4 style={{ color: "#E41C39" }}>
                            <NavLink to="/">
                              <b>Attractive Incentives</b>
                            </NavLink>
                          </h4>
                          <p style={{ textAlign: "justify" }}>
                            Reached your delivery limit successfully? Pushed
                            yourself to serve more people? Arrived before the
                            expected time? Then you should surely be rewarded.
                            M-Food’s attractive incentive program will
                            appreciate every milestone to keep you right on
                            track.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="card" style={{ border: "none" }}>
                        <div class="card-body text-center">
                          <img
                            src="../assets/img/performance.png"
                            height="200px"
                            className="img-responsive"
                            alt=""
                          />
                          <h4 style={{ color: "#E41C39" }}>
                            <NavLink to="/">
                              <b>Performance Rewards</b>
                            </NavLink>
                          </h4>
                          <p style={{ textAlign: "justify" }}>
                            There’s nothing that matters to you more than your
                            job? MothersFood considers several factors like
                            average delivery time, no. Of order completed in a
                            month, previous month performance, and a lot more
                            things and announces the tremendous performing
                            Driver-partners as Best performers. Wait, we’re not
                            done yet. The best performer will be rewarded
                            rightly
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

            <section className="features-area ">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row" style={{ margin: "auto" }}>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6"
                      style={{ marginTop: "-5%" }}
                    >
                      <h3 className="text-left" style={{ color: "#E41C39" }}>
                        <b>M-Food Star Rider</b>
                      </h3>
                      <div className=" icon-box-fourteen text-center">
                        <p
                          className="m-top-0 p-top-0"
                          style={{ textAlign: "justify" }}
                        >
                          If our customers love your service, so do we. The more
                          the positive ratings you get, the closer you move
                          towards being awesome. Based on the ratings and
                          reviews by our customers, we’ll announce one of the
                          delivery partners as M-Food Star ride and award them
                          with super-cool gifts or brand vouchers like Flipkart,
                          Amazon, Myntra, etc
                        </p>
                      </div>
                      {/*<!-- ends: .icon-box -->*/}
                    </div>
                    {/*<!-- ends: .col-lg-3 -->*/}

                    <div
                      className="col-lg-6 col-md-6 col-sm-6"
                      style={{ marginTop: "-5%" }}
                    >
                      <div className="icon-box-fourteen text-center">
                        <img
                          src="../assets/img/driver.png"
                          width="300px"
                          className="img-responsive"
                          alt=""
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
          </MediaQuery>
        </div>

        <section
          className="section-bg p-top-30 p-bottom-50"
          id="registerwithus"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="border-bottom p-bottom-25 m-bottom-40 text-left">
                  Ride With Us
                </h4>
                <form id="create-course-form">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group text-left">
                        <label>
                          Full Name
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={this.setStateFromInput}
                          className="form-control"
                          placeholder="Full Name"
                        />
                      </div>
                      {/* ends: .form-group */}
                    </div>
                    <div className="col-md-4">
                      <div className="form-group text-left">
                        <label>
                          Age
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="number"
                          name="age"
                          onChange={this.setStateFromInput}
                          className="form-control"
                          placeholder="Age"
                        />
                      </div>
                      {/* ends: .form-group */}
                    </div>
                    <div className="col-md-4">
                      <div className="form-group text-left">
                        <label>
                          Gender
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <div className="select-basic">
                          <select
                            id="state"
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
                    <div className="col-md-6">
                      <div className="form-group text-left">
                        <label>
                          Mobile Number
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="mobilenumber"
                          onChange={this.setStateFromInput}
                          className="form-control"
                          placeholder="Mobile Number"
                        />
                      </div>
                      {/* ends: .form-group */}
                    </div>
                    <div className="col-md-6">
                      <div className="form-group text-left">
                        <label>
                          Type of Vehicle
                          <span className="sup" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                        <div className="select-basic">
                          <select
                            id="type"
                            name="type"
                            class="form-control"
                            onChange={this.setStateFromInput}
                          >
                            <option value="SELECT VEHICLE">
                              SELECT VEHICLE
                            </option>
                            <option value="Bike">Bike</option>
                            <option value="BiCycle">BiCycle</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row p-top-15">
                    <div className="col-md-6 p-top-15">
                      <div className="form-group text-left">
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
