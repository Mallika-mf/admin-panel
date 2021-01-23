/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PageTitle from "./common/PageTitle";
import firebase from "./Firebase";
import CouponCard from "./common/CouponCard";
import NavBarListing from "./navBar/navbarListing";
import NavBarlisting2 from "./navBar/Navbarlisting2";
import BankOffers from "./common/BankOffers";
// import Header from "./common/Header";

const Offerpage = () => {
  // eslint-disable-next-line no-unused-vars
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref()
      .child("Promocode")
      .child("User")
      .on("value", function (snapshot) {
        if (snapshot.exists()) {
          const content = [];
          snapshot.forEach((snap) => {
            console.log(snap.val());
            let val = snap.val();
            content.push(val);
          });
          console.log(content);
          setOffer(content);
        }
      });
  }, []);
  var isLoggedin = localStorage.getItem("isLogging");

  return (
    <>
      {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}
      <PageTitle
        title="Offers for you"
        subTitle="Explore top deals and offers exclusively for you!"
      />
      <section className="section pt-5 pb-5">
        <Container>
          <Row>
            <Col md={12}>
              <h4 className="font-weight-bold mt-0 mb-3">Available Coupons</h4>
            </Col>
            {offer.map((item, index) => {
              return (
                <Col md={4} key={index}>
                  <CouponCard
                    title={`Get ${item.Discount}% OFF on your first Mothersfood  eat order`}
                    logoImage="img/offer.png"
                    subTitle={`Use code ${item.Name} & get ${item.Discount}% off on your  order value above ₹${item.MinAmount} on Website and Mobile site. Maximum discount: ₹${item.MaxAmount}`}
                    copyBtnText="COPY CODE"
                    couponCode={`${item.Name}`}
                  />
                </Col>
              );
            })}

            {/* <Col md={4}>
              <CouponCard
                title="Get 50% OFF on your first osahan eat order"
                logoImage="img/bank/2.png"
                subTitle="Use code EAT730 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $600"
                copyBtnText="COPY CODE"
                couponCode="EAT730"
              />
            </Col>
            <Col md={4}>
              <CouponCard
                title="Get 50% OFF on your first osahan eat order"
                logoImage="img/bank/3.png"
                subTitle="Use code SAHAN50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200"
                copyBtnText="COPY CODE"
                couponCode="SAHAN50"
              />
            </Col>
            <Col md={4}>
              <CouponCard
                title="Get 50% OFF on your first osahan eat order"
                logoImage="img/bank/4.png"
                subTitle="Use code GURDEEP50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $600"
                copyBtnText="COPY CODE"
                couponCode="GURDEEP50"
              />
            </Col>
            <Col md={4}>
              <CouponCard
                title="Get 50% OFF on your first osahan eat order"
                logoImage="img/bank/5.png"
                subTitle="Use code OSAHANEAT50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200"
                copyBtnText="COPY CODE"
                couponCode="OSAHANEAT50"
              />
            </Col>
            <Col md={4}>
              <CouponCard
                title="Get 50% OFF on your first osahan eat order"
                logoImage="img/bank/6.png"
                subTitle="Use code OSAHANEAT50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200"
                copyBtnText="COPY CODE"
                couponCode="OSAHANEAT50"
              />
            </Col>
          </Row>
          <Row className="pt-5">
            <Col xs={12}>
              <h4 className="font-weight-bold mt-0 mb-3">Bank Offers</h4>
            </Col>
            <Col md={6}>
              <BankOffers
                title="Get flat $.30 cashback using Amazon Pay"
                logoImage="img/bank/7.png"
                imageclassName="card-img"
                subTitle="Get flat $.30 cashback on orders above $.99 for 10 orders. No code required."
              />
            </Col>
            <Col md={6}>
              <BankOffers
                title="Get flat $.30 cashback using Osahan Pay"
                logoImage="img/bank/8.png"
                imageclassName="card-img"
                subTitle="Get flat $.30 cashback on orders above $.99 for 10 orders. No code required."
              />
            </Col> */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Offerpage;
