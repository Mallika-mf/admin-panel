/* eslint-disable no-unused-vars */
import React from "react";
// import { Link } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import Select2 from "react-select2-wrapper";
import Icofont from "react-icofont";
import OwlCarousel from "react-owl-carousel3";
import ProductBox from "./ProductBox";
import CategoriesCarousel from "../common/CategoriesCarousel";
import LocationBox from "./locationbox";
import { AppContext } from "./context/appContext";
import { openDrawer } from "./features/drawer";
import { withRouter } from "react-router-dom";
// import "./style.css";

class TopSearch extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  shopAction = () => {
    if (this.context.appState.cityname) {
      this.updateLocation();
    } else {
      openDrawer();
      return false;
    }
  };

  updateLocation = () => {
    this.props.history.push({
      pathname: `/listing`,
      search: `?cityName=${localStorage.getItem("cityname")}`,
    });
  };
  render() {
    return (
      <>
        <section
          className="pt-5 pb-5 homepage-search-block position-relative "
          style={{
            backgroundImage: "URL('img/background.jpg')",
          }}
        >
          <div className="banner-overlay background">
            <Container>
              <Row className="d-flex">
                <Col md={8}>
                  <div className="homepage-search-title">
                    <h1
                      className="mb-2 font-weight-normal"
                      style={{
                        //color: "darkRed",
                        fontSize: "80px",
                        fontWeight: "bolder",
                        textAlign: "justify",
                        marginTop: "-2%",
                        marginBottom: "5%",
                      }}
                    >
                      <span
                        className="font-weight-bolder text-black"
                        style={{ color: "white", fontFamily: "Comic Sans MS" }}
                      >
                        Hungry?
                      </span>{" "}
                    </h1>
                    <h5
                      className="mb-5 text-secondary font-weight-normal text-black"
                      style={{
                        textAlign: "justify",
                      }}
                    >
                      <span
                        className=" text-black"
                        style={{ color: "white", fontWeight: "600" }}
                      >
                        Order food from favourite Home Chef's and Local
                        Kitchen's Near you!
                      </span>
                    </h5>
                  </div>
                  <div className="homepage-search-form">
                    <Form className="form-noborder">
                      <div
                        className="form-row"
                        style={{ marginBottom: "40px" }}
                      >
                        {/* <Form.Group className="col-lg-3 col-md-3 col-sm-12">
                          <div className="location-dropdown">
                            <Icofont icon="location-arrow" />
                            <Select2
                              className="custom-select"
                              data={[
                                { text: "Home Kitchen", id: 1 },
                                { text: "Local Food", id: 2 },
                                // { text: "Lunch", id: 2 },
                                // { text: "Dinner", id: 3 },
                                // { text: "Cafés", id: 4 },
                                // { text: "Delivery", id: 5 },
                              ]}
                              options={{
                                placeholder: "Quick Searches",
                              }}
                            />
                          </div>
                        </Form.Group> */}
                        <LocationBox updateLocation={this.updateLocation} />

                        {/* <Form.Group className="col-lg-7 col-md-7 col-sm-12">
                        <Form.Control
                          type="text"
                          placeholder="Enter your delivery location"
                          size="lg"
                        />
                        <Link
                          className="locate-me"
                          to="#"
                          style={{ borderRadius: "50px", marginTop: "-4px" }}
                        >
                          <Icofont icon="ui-pointer" /> Locate Me
                        </Link>
                      </Form.Group>
                      <Form.Group className="col-lg-2 col-md-2 col-sm-12">
                        <Link
                          to="#"
                          className="btn btn-danger btn-block btn-lg btn-round"
                        >
                          Search
                        </Link>
                      </Form.Group> */}
                      </div>
                    </Form>
                  </div>
                  {/* <h6 className="mt-4 text-shadow font-weight-normal">
                    <span
                      className=" text-black"
                      style={{ color: "white", fontWeight: "600" }}
                    >
                      E.g. Beverages, Pizzas, Chinese, Bakery, Indian...
                    </span>
                  </h6> */}
                  <CategoriesCarousel />
                </Col>
                <Col md={4}>
                  <div className="osahan-slider pl-4 pt-3">
                    <OwlCarousel
                      nav
                      loop
                      {...options2}
                      className="homepage-ad owl-theme"
                    >
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Bengaluru Masala Dosa.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Chatpata Chole Bhature.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Crazy Custoomized Cakes.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Delhi ka Parota.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Delhi ki Rajma Chawal.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Freshly Baked Burgers.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Healthy HomeMade Pickles.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Hyderabadi Biryani.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Hyderabadi Paya.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Italian Pizza.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/kashmiri Dal Makhni.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Kolkata ke Rasgulle.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Mumbai ki VadaPav.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Mysore Bonda.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Noida Bandi wale Momos.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Pune ki Bhel Puri.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                      <div className="item">
                        <ProductBox
                          image="img/Top Sliders/Punjabi Kadi Chawal.jpg"
                          imageClass="img-fluid rounded"
                          imageAlt="carousel"
                          linkUrl="#"
                        />
                      </div>
                    </OwlCarousel>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </>
    );
  }
}

const options2 = {
  responsive: {
    0: {
      items: 2,
    },
    764: {
      items: 2,
    },
    765: {
      items: 1,
    },
    1200: {
      items: 1,
    },
  },
  lazyLoad: true,
  loop: true,
  autoplay: true,
  autoplaySpeed: 1000,
  dots: false,
  autoplayTimeout: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
  autoplayHoverPause: true,
};

export default withRouter(TopSearch);
