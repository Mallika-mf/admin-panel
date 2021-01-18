/* eslint-disable no-unused-vars */
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel3";
import TopSearch from "./home/TopSearch";
import ProductBox from "./home/ProductBox";
import CardItem from "./common/CardItem";
import SectionHeading from "./common/SectionHeading";
import FontAwesome from "./common/FontAwesome";

class Index extends React.Component {
  render() {
    return (
      <>
        <TopSearch />
        <section className="section pt-5 pb-5 bg-white homepage-add-section">
          <Container>
            <Row>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/pro1.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/2.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/pro3.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
              <Col md={3} xs={6}>
                <ProductBox
                  image="img/pro4.jpg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section pt-5 pb-5 products-section">
          <Container>
            <SectionHeading
              heading="Popular Home-Chefs"
              subHeading="Top  Home-cafes in MothersFood based on trends"
            />
            <Row>
              <Col md={12}>
                <OwlCarousel
                  nav
                  loop
                  {...options}
                  className="owl-carousel-four owl-theme"
                >
                  <div className="item">
                    <CardItem
                      title="Reeta Bhardwaj (Hyderabad)"
                      subTitle="South Indian • Pure veg"
                      imageAlt="Product"
                      image="./assets/img/chefs/Kusum Dwivedi.jpg"
                      imageClass="img-fluid item-img"
                      linkUrl="detail"
                      offerText="35% off | Use Coupon "
                      time="20–25 min"
                      // price="$250 FOR TWO"
                      showPromoted={true}
                      promotedVariant="dark"
                      favIcoIconColor="text-danger"
                      rating="4.5 (300+)"
                    />
                  </div>
                  <div className="item">
                    <CardItem
                      title="Reeta Bharadwaj (Hyderabad)"
                      subTitle="North Indian • Pure veg"
                      imageAlt="Product"
                      image="./assets/img/chefs/Reeta Bharadwaj.jpg"
                      imageClass="img-fluid item-img"
                      linkUrl="detail"
                      offerText="65% off | Use Coupon"
                      time="15–25 min"
                      // price="$100 FOR TWO"
                      showPromoted={true}
                      promotedVariant="dark"
                      favIcoIconColor="text-danger"
                      rating="3.9 (300+)"
                    />
                  </div>
                  <div className="item">
                    <CardItem
                      title="Simi(Hyderabad)"
                      subTitle="North Indian • Pure veg"
                      imageAlt="Product"
                      image="./assets/img/chefs/Simi.jpg"
                      imageClass="img-fluid item-img"
                      linkUrl="detail"
                      offerText="65% off | Use Coupon"
                      time="20–25 min"
                      // price="$500 FOR TWO"
                      showPromoted={true}
                      promotedVariant="danger"
                      favIcoIconColor="text-dark"
                      rating="4.2 (300+)"
                    />
                  </div>
                  <div className="item">
                    <CardItem
                      title="Pallavi Mohan Shahi"
                      subTitle="North Indian • Pure veg"
                      imageAlt="Product"
                      image="./assets/img/chefs/Pallavi Mohan Shahi2.jpg"
                      imageClass="img-fluid item-img"
                      linkUrl="detail"
                      offerText="65% off | Use Coupon"
                      time="20–25 min"
                      // price="$250 FOR TWO"
                      showPromoted={true}
                      promotedVariant="dark"
                      favIcoIconColor="text-danger"
                      rating="4.1 (300+)"
                    />
                  </div>
                </OwlCarousel>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pt-5 pb-5 products-section">
          <Container>
            <SectionHeading
              heading="Popular Vendor's"
              subHeading="Top  Vendor's in MothersFood based on trends"
            />
            <Row>
              <Col md={12}>
                <OwlCarousel
                  nav
                  loop
                  {...options}
                  className="owl-carousel-four owl-theme"
                >
                  <div className="item">
                    <CardItem
                      title="World Famous"
                      subTitle="North Indian • American • Pure veg"
                      imageAlt="Product"
                      image="img/list/1.png"
                      imageClass="img-fluid item-img"
                      linkUrl="#"
                      offerText="65% off | Use Coupon OSAHAN50"
                      time="20–25 min"
                      price="$250 FOR TWO"
                      showPromoted={true}
                      promotedVariant="dark"
                      favIcoIconColor="text-danger"
                      rating="3.1 (300+)"
                    />
                  </div>
                  <div className="item">
                    <CardItem
                      title="Bite Me Sandwiches"
                      subTitle="North Indian • American • Pure veg"
                      imageAlt="Product"
                      image="img/list/3.png"
                      imageClass="img-fluid item-img"
                      linkUrl="#"
                      offerText="65% off | Use Coupon OSAHAN50"
                      time="15–25 min"
                      price="$100 FOR TWO"
                      showPromoted={true}
                      promotedVariant="dark"
                      favIcoIconColor="text-danger"
                      rating="4.1 (300+)"
                    />
                  </div>
                  <div className="item">
                    <CardItem
                      title="The osahan Restaurant"
                      subTitle="North Indian • American • Pure veg"
                      imageAlt="Product"
                      image="img/list/6.png"
                      imageClass="img-fluid item-img"
                      linkUrl="#"
                      offerText="65% off | Use Coupon OSAHAN50"
                      time="20–25 min"
                      price="$500 FOR TWO"
                      showPromoted={true}
                      promotedVariant="danger"
                      favIcoIconColor="text-dark"
                      rating="4.2 (300+)"
                    />
                  </div>
                  <div className="item">
                    <CardItem
                      title="Polo Lounge"
                      subTitle="North Indian • American • Pure veg"
                      imageAlt="Product"
                      image="img/list/9.png"
                      imageClass="img-fluid item-img"
                      linkUrl="#"
                      offerText="65% off | Use Coupon OSAHAN50"
                      time="20–25 min"
                      price="$250 FOR TWO"
                      showPromoted={true}
                      promotedVariant="dark"
                      favIcoIconColor="text-danger"
                      rating="4.1 (300+)"
                    />
                  </div>
                </OwlCarousel>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
          <Container>
            <SectionHeading
              heading="Become a Member"
              subHeading="Be a part of MothersFood"
            />
            {/* <Row>
              <Col sm={12} className="text-center">
                <Link to="register" className="btn btn-success btn-lg">
                  Create an Account <FontAwesome icon="chevron-circle-right" />
                </Link>
              </Col>
            </Row> */}
            <section className="become-member-area">
              <div className="icon-boxes">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="card">
                        <div className="card-body text-center">
                          <div className="icon-box-fourteen text-center">
                            <div className="row">
                              <div className="col-lg-3 col-md-4 col-sm-12">
                                <img
                                  src="/img/chef.png"
                                  height="100px"
                                  className="img-responsive"
                                  alt="mothersfood"
                                />
                              </div>
                              <div className="col-lg-9 col-md-8 col-sm-12">
                                <h6 className="color-dark m-top-5 m-bottom-0 p-bottom-0 block-title">
                                  Become a Partner
                                </h6>
                                <p className="m-top-0 p-top-0 block-info-text">
                                  Partner with MothersFood for shared benefits{" "}
                                </p>
                                <a
                                  href="/partnerwithus#registerwithus"
                                  className="btn btn-info btn-icon icon-right btn-danger "
                                  style={{ borderRadius: "50px" }}
                                >
                                  For a Partner
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="card">
                        <div className="card-body text-center">
                          <div className="icon-box-fourteen text-center">
                            <div className="row">
                              <div className="col-lg-3 col-md-4 col-sm-12">
                                <img
                                  src="/img/partnericon.png"
                                  height="100px"
                                  className="img-responsive"
                                  alt="mothersfood"
                                />
                              </div>
                              <div className="col-lg-9 col-md-8 col-sm-12">
                                <h6 className="color-dark m-top-5 m-bottom-0 p-bottom-0 block-title">
                                  Become a Delivery Partner
                                </h6>
                                <p className="m-top-0 p-top-0 block-info-text">
                                  Be a hunger savior, join as a delivery partner
                                </p>
                                <a
                                  href="/ridewithus"
                                  className="btn btn-info btn-icon icon-right  btn-danger"
                                  style={{ borderRadius: "50px" }}
                                >
                                  For Delivery
                                </a>
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
          </Container>
        </section>
      </>
    );
  }
}

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

export default Index;
