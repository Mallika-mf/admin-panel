/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
// import Header from "../header/faqheader";
import NavBarListing from "./navBar/navbarListing";
import NavBarlisting2 from "./navBar/Navbarlisting2";
import "../style copy.css";

const noAction = (e) => e.preventDefault();
const Project = () => {
  var isLoggedin = localStorage.getItem("isLogging");
  return (
    <Fragment>
      {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}
      <div className="card">
        {/* <Header pageTitle="Help &amp; Support" /> */}
        <section className="sectionbg p-top-100 p-bottom-110">
          <div className="accordion-styles accordion--one">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mb-4">
                        <div className="divider divider-simple helpsupport">
                          <h3 className="text-left">
                            <b>FAQ's : Home-Chef</b>
                          </h3>
                        </div>
                      </div>
                    </div>
                    {/*<!-- ends: .col-lg-12 -->*/}
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div
                        className="accordion accordion_one"
                        id="accordion_one"
                      >
                        <div className="accordion-single">
                          <div
                            className="accordion-heading"
                            style={{ color: "black", marginBottom: "5%" }}
                            id=""
                          >
                            <h6 className="mb-0 text-left">
                              <NavLink
                                style={{ color: "black" }}
                                to="#"
                                className="text-left"
                                data-toggle="collapse"
                                data-target="#c1"
                                aria-expanded="True"
                                aria-controls="c1"
                              >
                                How to register with MothersFood as a home-chef?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c1"
                            className="collapse show"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                We’re glad to see your interest in being a part
                                of our family. You can register as a home-chef
                                with us through our website registration link:
                                https://mothersfood.in/register.html
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c2"
                                aria-expanded="True"
                                aria-controls="collapseTwo"
                              >
                                What happens after I register as a home-chef
                                with MothersFood?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c2"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                ●You’ll receive a call from our representative
                                to share more details about MothersFood and take
                                the appointment for Taste Audit.
                                <br />
                                ●Our team will arrive at your destination to
                                perform the Taste Audit through professional
                                chefs.
                                <br />
                                ●If you get through the test, our marketing team
                                will immediately process the next steps
                                according to the package that you choose.
                                <br />
                                ●That’s it. Log in to the app and start taking
                                the orders.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c3"
                                aria-expanded="True"
                                aria-controls="collapseThree"
                              >
                                What is the Taste Audit?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c3"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                Taste Audit is a test on your dishes to ensure
                                the hygiene, ingredients, cooking process, and
                                taste. We perform this test to make sure the
                                customers are receiving what they seek.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c4"
                                aria-expanded="True"
                                aria-controls="collapseFour"
                              >
                                Can restaurants be a partner with MothersFood?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c4"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                No. Restaurants are not allowed to partner with
                                us as we’re dedicated to collaborating with
                                home-chefs.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c5"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                How can I contact support?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c5"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                In case of any concerns, queries, complaints,
                                and feedback, you can write an email to
                                info@mothersfood.in. We’ll respond to you within
                                24 hours.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c6"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                How long is the package valid for?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c6"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                The package amount you choose is a one-time
                                setup fee. Once you’re registered with a package
                                that’ll be valid for a lifetime with a minimal
                                monthly subscription fee.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c7"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                Can I move from one package to another in
                                between the subscription duration?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c7"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                Yes. You can simply pay the excess amount of the
                                package that you chose and upgrade to a better
                                package of your choice.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c8"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                How do I access the app?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c8"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                You can download the MothersFood Chef app from
                                Playstore or App store. Once you receive the
                                confirmation of your profile created in the
                                backend, you can log in through your phone
                                number.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c9"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                Is there any limit to the number of food items
                                that I can enter in the app?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c9"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                No. You can add all the dishes that you’re good
                                at.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c10"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                What if my preferred dish is not available in
                                the list.
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c10"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                You can simply choose the ‘Other’ option and
                                enter the name manually. We’ll approve it for
                                you.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c11"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                How many orders can I take in a day?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c11"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                There’s no cap on your service. You can take any
                                number of orders that you can manage
                                effortlessly.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c12"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                Is there any minimum number of orders that I
                                need to serve in a week or month?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c12"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                No. We didn’t opt for any minimum number of
                                orders to support part-time home-chefs who’re
                                willing to earn in their free time.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c13"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                What if I’m unable to fulfill the order in the
                                given time?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c13"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                We always encourage you to be preplanned for
                                your orders to reduce the hassle. But in any
                                circumstances, if you’re unable to fulfill the
                                order in a given time, we’ll evaluate the
                                situation with the customer and take the proper
                                action accordingly.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c14"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                Can I change my address if I relocate?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c14"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                Yes. You can simply raise a relocation request
                                to info@mothersfood.in, and if we’re active in
                                that location, your relocation request will be
                                accepted.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c15"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                Can I change my phone number?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c15"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                Yes. You can write an email to
                                info@mothersfood.in and request for a phone
                                number change.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c16"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                Can I refer anyone else to join as a MothersFood
                                home-chef?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c16"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                Of course. We always welcome new members to our
                                family. And as an appreciation to your referral,
                                we’ll credit 10% of their chosen package to your
                                MFood Coins balance.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c17"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                What are MFood Coins?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c17"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                MFood coins is a virtual cash wallet that you
                                can upload the money to. You can also earn the
                                coins through referrals and by being the best
                                chef in your locality, etc. Each MFood coin
                                values 1 Rupee, and you can use this balance to
                                withdraw the money to your account later or
                                purchase groceries from MFood Store.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c18"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                How can I receive the invoice for my earnings?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c18"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                We’ll send you the invoice to your email every
                                month, where you can validate your earnings,
                                taxes, and other expenditure. Otherwise, you can
                                always get in touch with the support team to
                                request an invoice.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c19"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                How does Bulk order / Catering service request
                                work?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c19"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                MothersFood will receive the Bulk order or
                                catering requests for you. Then we’ll get in
                                touch with you, based on your interest we’ll
                                pass on the order to you.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c20"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                What about the delivery services?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c20"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                We’ve got it covered. Our delivery partner comes
                                to your house, picks up the parcel, and delivers
                                it to the customers. In case you want to deliver
                                it on your own, you can opt-out of the delivery
                                services.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c21"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                Who provides the packaging material?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c21"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_one"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                We’ll provide you with all the required
                                packaging material. At first, you’ll receive
                                complimentary packaging material with your
                                chosen package. Later, you’ll have to purchase
                                packaging material from us.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mb-5">
                        <div className="divider divider-simple">
                          <h3 className="text-left">
                            <b>FAQ's : Customer</b>
                          </h3>
                        </div>
                      </div>
                    </div>
                    {/*<!-- ends: .col-lg-12 -->*/}
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div
                        className="accordion accordion_two"
                        id="accordion_two"
                      >
                        <div className="accordion-single">
                          <div className="accordion-heading" id="headingOne">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="text-left"
                                data-toggle="collapse"
                                data-target="#c22"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                What is MothersFood?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c22"
                            className="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordion_two"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                MothersFood is a food delivery service for
                                home-made food. Our food is prepared by women at
                                home under proper health and hygiene conditions.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="headingTwo">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c23"
                                aria-expanded="True"
                                aria-controls="collapseTwo"
                              >
                                How to order food through MothersFood?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c23"
                            className="collapse"
                            aria-labelledby="headingTwo"
                            data-parent="#accordion_two"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                You can simply log in to the app, enter your
                                location, and find the home-chefs near you. Then
                                explore the yummy dishes and place the order for
                                home-food.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="headingThree">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c24"
                                aria-expanded="True"
                                aria-controls="collapseThree"
                              >
                                How can I launch feedback?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c24"
                            className="collapse"
                            aria-labelledby="headingThree"
                            data-parent="#accordion_two"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                You can write us an email at
                                info@mothersfood.in.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="headingFour">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c25"
                                aria-expanded="True"
                                aria-controls="collapseFour"
                              >
                                How can I cancel the order?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c25"
                            className="collapse"
                            aria-labelledby="headingFour"
                            data-parent="#accordion_two"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                We encourage you to not to cancel the order as
                                the home-chef, and delivery agents will spend
                                their valuable time on the order. But in any
                                case, if you have to do so, please contact our
                                customer support to raise a dispute.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c26"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                How does the refund process work?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c26"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_two"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                If the food you receive is not in an edible
                                situation, we’ll evaluate the situation with you
                                and the chef as well and process part or full
                                repayment of the food item accordingly.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c27"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                How much do you charge for delivery?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c27"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_two"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                If you order for less than 200 rs, you’ll have
                                to pay 50rs delivery charges. For the orders
                                with 200+, you need to pay 25rs delivery
                                charges. Also, this might change as per your
                                city and location. So please check the order
                                page for accurate information.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c28"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                How to rate the service?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c28"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_two"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                Once the order is completed, you can go to your
                                order page from the profile, and you’ll see an
                                option to rate the service. You can click and
                                share your feedback.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c29"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                Can I get a lunch/dinner delivery service daily
                                from the same person?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c29"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_two"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                Yes. You can raise a request to our customer
                                support at info@mothersfood.in, and we’ll pass
                                the request to the concerned home-chef. If they
                                agree, we’ll provide the service for you.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-single">
                          <div className="accordion-heading" id="">
                            <h6 className="mb-0 text-left">
                              <NavLink
                                to="#"
                                className="collapsed text-left"
                                data-toggle="collapse"
                                data-target="#c30"
                                aria-expanded="True"
                                aria-controls="collapseFive"
                              >
                                Can I raise a Bulk order request or catering
                                service request?
                              </NavLink>
                            </h6>
                          </div>
                          <div
                            id="c30"
                            className="collapse"
                            aria-labelledby=""
                            data-parent="#accordion_two"
                          >
                            <div className="accordion-contents">
                              <p className="text-left">
                                Yes. You can raise a request to our customer
                                support at info@mothersfood.in, and we’ll pass
                                the request to the concerned home-chef. If they
                                agree, we’ll provide the service for you.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/*<!-- ends: .section-padding -->*/}
    </Fragment>
  );
};

export default Project;
