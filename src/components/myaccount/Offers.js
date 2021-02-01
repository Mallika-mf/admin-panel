/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PageTitle from "../common/PageTitle";
import firebase from "../Firebase";
import CouponCard from "../common/CouponCard";
import bannerImg from "../AbotUs/AboutUs-images/Banner_MyProfile.png";

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

  return (
    <>
      <h1
        className="breadcrumb-osahan pt-5 pb-5 bg-light position-relative text-center"
        style={{ marginBottom: "-5%", marginTop: "-2%" }}
      >
        {" "}
        Offers
      </h1>
      <section className="section  pb-3">
        <Container>
          <Row>
            <Col md={12}>
              <h4 className="font-weight-bold mt-0 mb-3">Available Coupons</h4>
            </Col>
            {offer.map((item, index) => {
              return (
                <Col md={4} key={index}>
                  <CouponCard
                    title={`Get ₹${item.Discount} OFF on your first Mothersfood  eat order`}
                    logoImage="img/offer.png"
                    subTitle={`Use code ${item.Name} & get ₹${item.Discount} off on your  order value above ₹${item.MinAmount} on Website and Mobile site. Maximum discount: ₹${item.MaxAmount}`}
                    copyBtnText="COPY CODE"
                    couponCode={`${item.Name}`}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Offerpage;
