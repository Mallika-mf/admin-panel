import React from "react";
import "./AboutUs.css";
import Content from "./Content";
import NavBarListing from "../navBar/navbarListing";
import NavBarlisting2 from "../navBar/Navbarlisting2";
// import HowItWorks from './HowItWorks';
import OurApp from "./OurApp";
import Partnership from "./PartnerShipWithUs";

function AboutUs() {
  var isLoggedin = localStorage.getItem("isLogging");
  return (
    <>
      <div>
        <div className="card">
          {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}
          {/* <Header /> */}
          <Content />
          {/* <HowItWorks /> */}
          <OurApp />
          <Partnership style={{ marginTop: "5%" }} />

          <div className="choose">
            <div className=" col-lg-24 content">
              <h3 style={{ color: "white" }}>
                Choose From Over 3,000 Home Chefs
              </h3>
              <p style={{ color: "white" }}>
                {" "}
                MothersFood is a homemade food delivery app. Delivering numerous
                cuisines and dishes made by home chefs in their hygienic
                kitchens.
              </p>
            </div>
            {/* <div className = "btn">
                    <button className = "btn3">View All Chefs</button>
                </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
