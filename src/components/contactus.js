import React, { Fragment } from "react";
import firebase from "./Firebase";
import SimpleReactValidator from "simple-react-validator";

class GeneralRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
    };
    this.validator = new SimpleReactValidator();
  }

  setStateFromInput = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

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

      if (data.email === "") {
        alert("Enter Email");
        return;
      }

      if (data.message === "") {
        alert("Enter Message");
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
        .child("ContactUs")
        .push();
      ref.child("PushId").set(ref.getKey());
      ref.child("Name").set(self.state.name);
      ref.child("Email").set(self.state.email);
      ref.child("Message").set(self.state.message);
      ref.child("Date").set(today);

      self.setState({
        name: "",
        email: "",
        message: "",
      });
      alert(
        "Hey,We have received your request we will get back to you shortly."
      );

      document.getElementById("create-course-form").reset();
    }

    return (
      <Fragment>
        <div className="card">
          {/* <div className="list-inline-wrapper p-top-80 p-bottom-50">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="icon-list--three d-flex list--inline">
                            <li className="d-flex align-items-center">
                                <div className="icon"><span><i className="la la-headphones"></i></span></div>
                                <div className="contents">
                                    <h6>8333 01 8333</h6>
                                    <span className="sub-text">Mon-Fri 9am - 5pm</span>
                                </div>
                            </li>
                            <li className="d-flex align-items-center">
                                <div className="icon"><span><i className="la la-envelope"></i></span></div>
                                <div className="contents">
                                    <h6>info@mothersfood.in</h6>
                                    <span className="sub-text">Free enquiry</span>
                                </div>
                            </li>
                            <li className="d-flex align-items-center">
                                <div className="icon"><span><i className="la la-map-marker"></i></span></div>
                                <div className="contents">
                                    <h6>Mothers kitchens &amp; Catering Services Pvt Ltd</h6>
                                    <span className="sub-text">#A-49,Street-3,Prakashnagar,<br/>Begumpet,Hyderabad 500 003</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> */}

          <section className="list-inline-wrapper p-top-80 p-bottom-50">
            <div className="container">
              <div className="row mt-5 mb-3" style={{ border: "none" }}>
                <div className="col-lg-6 ">
                  <div className="form-wrapper">
                    <div className="m-bottom-10">
                      <div className="divider divider-simple text-left">
                        <h3>
                          <b>Get In Touch</b>
                        </h3>
                      </div>
                    </div>
                    <p className="m-bottom-30"></p>
                    <form id="create-course-form">
                      <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.setStateFromInput}
                        className="form-control form-outline mb-4"
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        value={this.state.email}
                        onChange={this.setStateFromInput}
                        name="email"
                        className="form-control form-outline mb-4"
                        placeholder="Email"
                      />
                      <textarea
                        value={this.state.message}
                        onChange={this.setStateFromInput}
                        className="form-control form-outline mb-4"
                        name="message"
                        placeholder="Message"
                      />
                    </form>
                    <button
                      type="submit"
                      onClick={submit}
                      className="btn btn-danger m-right-25 mb-2"
                      style={{ background: "#E41C39", border: "#E41C39" }}
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <div className="col-lg-6 " style={{ margin: "auto" }}>
                  <ul className="icon-list--three">
                    <li className="icon-list2 d-flex mb-4">
                      <div
                        className="icon"
                        style={{
                          marginTop: "5%",
                          marginRight: "2%",
                          fontSize: "25px",
                          color: "red",
                        }}
                      >
                        <i className="fa fa-headphones color-danger"></i>
                      </div>
                      <div className="contents text-left">
                        <h6 className="text-left">+91 8333 01 8333 </h6>
                        <span className="sub-text text-left">
                          Give a miss call to this number and get a call with in
                          2hrs
                        </span>
                      </div>
                    </li>
                    <li className="icon-list2 d-flex  mb-4">
                      <div
                        className="icon"
                        style={{
                          marginTop: "5%",
                          marginRight: "2%",
                          fontSize: "25px",
                          color: "red",
                        }}
                      >
                        <i className="fa fa-envelope color-danger"></i>
                      </div>
                      <div className="contents text-left">
                        <h6 className="text-left">info@mothersfood.in</h6>
                        <span className="sub-text text-left">Write to Us</span>
                      </div>
                    </li>
                    <li className="icon-list2 d-flex  mb-4">
                      <div
                        className="icon"
                        style={{
                          marginTop: "5%",
                          marginRight: "2%",
                          fontSize: "25px",
                          color: "red",
                        }}
                      >
                        <i className="fa fa-map-marker color-danger"></i>
                      </div>
                      <div className="contents text-left">
                        <h6 className="text-left">Corporate Office</h6>
                        <span className="sub-text text-left">
                          Mothers kitchens &amp; Catering Services Pvt Ltd
                          <br />
                          #A-49, Street-3, Prakashnagar, <br />
                          Begumpet, Hyderabad 500 003
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default GeneralRules;
