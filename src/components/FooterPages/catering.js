import React, { Fragment } from "react";

import NavBarListing from "../navBar/navbarListing";
import NavBarlisting2 from "../navBar/Navbarlisting2";

const catering = () => {
  var isLoggedin = localStorage.getItem("isLogging");
  return (
    <Fragment>
      {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}
      <div className=" col-10 offset-1 mb-3">
        <h1
          className="text-left"
          style={{ fontSize: "40px", fontWeight: "bold", color: "red" }}
        >
          Catering
        </h1>
        <div className="text-left" style={{ fontSize: "20px" }}>
          In India every celebration is synonymous to good food.Our country is
          famous for its family bonding which mostly happens over food since a
          family that eats together stays together.Caterers or Halwais as they
          are traditionally known as have a very long lasting and old connection
          to our country.Intially every lane would have its own Halwai who would
          be called to celebrate even the smallest of functions like a guest
          visiting one’s house.But now with the increasing urbanization and
          movement to the cities the same is not possible.But what happens if we
          bring you the same food in a smaller quantity by your favourite
          caterer at the comfort of your home?
          <div className="mt-3 text-left">
            {" "}
            MothersFood is India’s first company to bring on board various
            catering services around you on our app.This not only provides
            amazing business and repeat customers to the caterer but is also
            very hassle free for the customer.You donot have to worry about
            cooking even the most basic raita because it all comes as a
            package.Cooked with the choicest of ingredients and in the most
            Hygiene conditions the food is surely going to make a way to your
            guest’s heart.
          </div>
          <div className="mt-3 text-left">
            The catering services are required to prepare food everyday.Our
            services not only bring them new customers to taste but also
            generate amazing profits.To register and get onboard as our catering
            partner fill the requirements.
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default catering;
