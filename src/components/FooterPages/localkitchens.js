import React from "react";
import NavBarListing from "../navBar/navbarListing";
import NavBarlisting2 from "../navBar/Navbarlisting2";

const localkitchens = () => {
  var isLoggedin = localStorage.getItem("isLogging");
  return (
    <>
      {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}
      <div>it works</div>
    </>
  );
};

export default localkitchens;
