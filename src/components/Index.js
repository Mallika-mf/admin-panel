/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel3";
import TopSearch from "./home/TopSearch";
import Script from "react-load-script";
import Geocode from "react-geocode";
import ProductBox from "./home/ProductBox";
import CardItem from "./common/CardItem";
import SectionHeading from "./common/SectionHeading";
import { message } from "antd";
import firebase from "./Firebase";
import { get } from "lodash";
import FontAwesome from "./common/FontAwesome";
Geocode.setApiKey("AIzaSyCPhxfpptoIc1yca5U8mXIigIajoERQCdE");
Geocode.setLanguage("en");

const APIKEY = "AIzaSyCPhxfpptoIc1yca5U8mXIigIajoERQCdE";
const googleUrl = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&libraries=places`;
var autocomplete;

const Index = (props) => {
  const [error, setError] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [allCities, setFetchlocation] = useState({ cities: [], loading: true });
  const [userlocation, setLocation] = useState({
    city: "",
    query: "",
    lat: "",
    lng: "",
  });

  React.useEffect(() => {
    let isUnmount = false;

    firebase
      .database()
      .ref("Masters")
      .child("City")
      .once(
        "value",
        (snapshot) => {
          if (snapshot.exists()) {
            if (!isUnmount) {
              setFetchlocation({
                cities: Object.values(snapshot.val()),
                loading: false,
              });
            }
            return false;
          }
        },
        () => {}
      );
    if (!isUnmount) {
      setFetchlocation({ cities: [], loading: false });
    }

    // if(!isUnmount){
    //     // fetchAllLocation();

    // }

    return () => {
      isUnmount = true;
    };
  }, []);

  const handleScriptLoad = () => {
    const options = {
      types: [],
      componentRestrictions: { country: "in" },
    };

    autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    autocomplete.setFields(["address_components", "formatted_address"]);
    autocomplete.addListener("place_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    setError("");
    const addressObject = autocomplete.getPlace();
    const address = addressObject.address_components;
    if (address) {
      localStorage.setItem("formattedAddress", addressObject.formatted_address);
      setLocation({
        city: address[0]["long_name"],
        query: addressObject.formatted_address,
        lat: "",
        lng: "",
      });
    }
  };

  // const fetchAllLocation = ()=>{
  //     firebase.database().ref('Masters').child('City').once('value',(snapshot)=>{
  //         if(snapshot.exists()){
  //             setFetchlocation({cities:Object.values(snapshot.val()), loading: false});
  //             return false;
  //         }
  //     },()=>{

  //     })
  //     setFetchlocation({cities:[], loading:false});
  // }

  const getCoordinates = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    localStorage.setItem("lat", position.coords.latitude);
    localStorage.setItem("lng", position.coords.longitude);
    Geocode.fromLatLng(
      get(position, "coords.latitude"),
      get(position, "coords.longitude")
    )
      .then((response) => {
        localStorage.setItem(
          "formattedAddress",
          response.results[0].formatted_address
        );
        setLocation({
          city: response.results[0].address_components[0]["long_name"],
          query: response.results[0].formatted_address,
        });

        let cityInfo = "";
        for (let city of allCities.cities) {
          if (response.results[0].formatted_address.includes(city.Name)) {
            cityInfo = city;
            localStorage.setItem("cityname", city.Name);
            localStorage.setItem("pushid", city.PushId);
            localStorage.setItem("radius", city.Radius);
            // setAppLocation(cityInfo);
            setError("");
            if (props.updateLocation) {
              props.updateLocation();
            }
          } else {
            setError("not serviceable in this area");
            //message.error('Not serviceable in this area');
          }
        }
        if (!cityInfo || cityInfo === "") {
          //setError("not serviceable in this area");
          message.error("Not serviceable in this area");
        }
        // const address = response.results[0].formatted_address;
        // setAddress(address);
      })
      .catch((error) => console.log("Geocode ERROR", error));
  };

  const getLocation = (event) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    }
  };

  const changeLocation = async (event) => {
    event.preventDefault();
    if (allCities.loading) {
      setError("Error While Fetching Cities");
      return false;
    }
    let cityInfo = "";
    for (let city of allCities.cities) {
      if (userlocation.query.includes("Secunderabad")) {
        localStorage.setItem("cityname", "Hyderabad");
        localStorage.setItem("pushid", "-M7Rt3hrXVXrmglMhgMb");
        localStorage.setItem("radius", "4");
        cityInfo = allCities.cities.find(
          (city) => city.PushId === "-M7Rt3hrXVXrmglMhgMb"
        );
        // setAppLocation(cityInfo);
        await Geocode.fromAddress(userlocation.query)
          .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
          })
          .catch((error) => console.log("Geocode ERROR", error));
        if (props.updateLocation) {
          props.updateLocation();
        }
      } else if (
        userlocation.query.includes("Delhi") ||
        userlocation.query.includes("Gurugram") ||
        userlocation.query.includes("New Delhi") ||
        userlocation.query.includes("Noida") ||
        userlocation.query.includes("Ghaziabad") ||
        userlocation.query.includes("Faridabad") ||
        userlocation.query.includes("gurgaon")
      ) {
        localStorage.setItem("cityname", "Delhi");
        localStorage.setItem("pushid", "-M9w7qfvWoy4sRUCqcGQ");
        localStorage.setItem("radius", "5");
        cityInfo = allCities.cities.find(
          (city) => city.PushId === "-M9w7qfvWoy4sRUCqcGQ"
        );
        // setAppLocation(cityInfo);
        await Geocode.fromAddress(userlocation.query)
          .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
          })
          .catch((error) => console.log("Geocode ERROR", error));
        if (props.updateLocation) {
          props.updateLocation();
        }
      } else if (userlocation.query.includes(city.Name)) {
        cityInfo = city;
        localStorage.setItem("cityname", city.Name);
        localStorage.setItem("pushid", city.PushId);
        localStorage.setItem("radius", city.Radius);
        // setAppLocation(cityInfo);
        console.log(cityInfo);
        setError("");
        await Geocode.fromAddress(userlocation.query)
          .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
          })
          .catch((error) => console.log("Geocode ERROR", error));
        if (props.updateLocation) {
          props.updateLocation();
        }
        return false;
      }
    }

    if (!cityInfo) {
      //setError("not serviceable in this area");
      message.error("Not serviceable in this area");
    }
    return false;
  };

  return (
    <>
      <Script url={googleUrl} onLoad={handleScriptLoad} />
      <TopSearch />
      <section className="section pt-5 pb-5 bg-white homepage-add-section">
        <Container>
          <Row
            style={{
              marginLeft: "20%",
              marginTop: "-2%",
              marginBottom: "-2%",
            }}
          >
            <Col md={2} xs={6}>
              <ProductBox
                image="./assets/img/Coupons/Coupon (1).jpeg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="/offers"
              />
            </Col>
            {/* <Col md={2} xs={6}>
                <ProductBox
                  image="./assets/img/Coupons/Coupon (2).jpeg"
                  imageClass="img-fluid rounded"
                  imageAlt="product"
                  linkUrl="#"
                />
              </Col> */}
            <Col md={2} xs={6}>
              <ProductBox
                image="./assets/img/Coupons/Coupon (3).jpeg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="/offers"
              />
            </Col>
            <Col md={2} xs={6}>
              <ProductBox
                image="./assets/img/Coupons/Coupon (4).jpeg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="/offers"
              />
            </Col>
            <Col md={2} xs={6}>
              <ProductBox
                image="./assets/img/Coupons/Coupon (5).jpeg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="/offers"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section pt-5 pb-5 products-section">
        <Container style={{ marginTop: "-2%" }}>
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
                    title="Kusum Dwivedi(Hyderabad)"
                    subTitle="Lunch • Dinner • Breakfast"
                    imageAlt="Product"
                    image="./assets/img/chefs/Kusum Dwivedi.jpg"
                    imageClass="img-fluid item-img"
                    //linkUrl="/listing"
                    // offerText="35% off | Use Coupon "
                    time="11AM to 10PM "
                    onClick={getLocation}
                    // price="$250 FOR TWO"
                    // showPromoted={true}
                    // promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="5.0"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="Reeta Bharadwaj (Hyderabad)"
                    subTitle="Lunch • Dinner • Breakfast"
                    imageAlt="Product"
                    image="./assets/img/chefs/Reeta Bharadwaj.jpg"
                    imageClass="img-fluid item-img"
                    linkUrl="#"
                    // offerText="65% off | Use Coupon"
                    time="11AM to 10PM"
                    // price="$100 FOR TWO"
                    // showPromoted={true}
                    // promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="5.0"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="Simi(Hyderabad)"
                    subTitle="Lunch • Dinner • Breakfast"
                    imageAlt="Product"
                    image="./assets/img/chefs/Simi.jpg"
                    imageClass="img-fluid item-img"
                    linkUrl="#"
                    // offerText="65% off | Use Coupon"
                    time="11AM to 10PM"
                    // price="$500 FOR TWO"
                    // showPromoted={true}
                    // promotedVariant="danger"
                    favIcoIconColor="text-danger"
                    rating="5.0"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="Pallavi Mohan Shahi"
                    subTitle="Lunch • Dinner • Breakfast"
                    imageAlt="Product"
                    image="./assets/img/chefs/Pallavi Mohan Shahi2.jpg"
                    imageClass="img-fluid item-img"
                    linkUrl="#"
                    // offerText="65% off | Use Coupon"
                    time="11AM to 10PM"
                    // price="$250 FOR TWO"
                    // showPromoted={true}
                    // promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="5.0"
                  />
                </div>
              </OwlCarousel>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section pt-5 pb-5 products-section">
        <Container style={{ marginTop: "-5%" }}>
          <SectionHeading
            heading="Popular kitchen's"
            subHeading="Top  Kitchen's in MothersFood based on trends"
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
                    title="Al Saba (Hyderabad)"
                    subTitle="South Indian • Non veg • Veg"
                    imageAlt="Product"
                    image="./assets/img/vendors/Al Saba_Hyderabad.jpg"
                    imageClass="img-fluid item-img"
                    //linkUrl="#"
                    // offerText="65% off | Use Coupon OSAHAN50"
                    time="11AM to 12PM"
                    // price="$250 FOR TWO"
                    // showPromoted={true}
                    // promotedVariant="danger"
                    favIcoIconColor="text-danger"
                    rating="5.0"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="Grill 5 Kitchen (Hyderabad)"
                    subTitle="South Indian • Non veg • Veg"
                    imageAlt="Product"
                    image="./assets/img/vendors/Grill 5 Kitchen_Hyderabad.jpg"
                    imageClass="img-fluid item-img"
                    //linkUrl="#"
                    // offerText="65% off | Use Coupon OSAHAN50"
                    time="11AM to 12PM"
                    // price="$100 FOR TWO"
                    // showPromoted={true}
                    // promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="5.0"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="MomoS Junction (Gurugaon)"
                    subTitle="North Indian • Non veg • Veg"
                    imageAlt="Product"
                    image="./assets/img/vendors/MomoS Junction_Gurugaon.jpg"
                    imageClass="img-fluid item-img"
                    //linkUrl="#"
                    // offerText="65% off | Use Coupon OSAHAN50"
                    time="11AM to 12PM"
                    // price="$500 FOR TWO"
                    // showPromoted={true}
                    // promotedVariant="danger"
                    favIcoIconColor="text-danger"
                    rating="5.0"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="Prince ki Choice (Gurugram)"
                    subTitle="North Indian • Non veg • Veg"
                    imageAlt="Product"
                    image="./assets/img/vendors/Prince ki Choice_Gurugoan.jpg"
                    imageClass="img-fluid item-img"
                    //linkUrl="#"
                    // offerText="65% off | Use Coupon OSAHAN50"
                    time="11AM to 12PM"
                    // price="$250 FOR TWO"
                    // showPromoted={true}
                    // promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="5.0"
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
};

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
