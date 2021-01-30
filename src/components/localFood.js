/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Dropdown,
  Accordion,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import Icofont from "react-icofont";
import PageTitle from "./common/PageTitle";
import CardItem from "./common/CardItemLocal";
import CategoriesCarousel from "./common/CategoriesCarousel1";
import backgroundImage from "../vid/local chef1.png";
import firebase from "./Firebase";
import { AppContext } from "./home/context/appContext";
import { get } from "lodash";
import NavBarListing from "./navBar/navbarListing";
import NavBarlisting2 from "./navBar/Navbarlisting2";
// import $ from "jquery";

class List extends React.Component {
  static contextType = AppContext;
  previousContext;
  constructor() {
    super();
    this.limit = 9;
    this.filter = [];
    this.allProducts = [];
  }

  state = {
    product: { items: [], loading: false },
    product1: { items: [], loading: false },
    cusines: { items: [], loading: false },
    banners: { items: [], bannerloading: false },
    filter: { cusines: [], search: "", sort: "" },
    availableChefs: [],
    nonAvailableChefs: [],
    count: 0,
    page: 1,
    pages: 0,
    vegItems: false,
    nonvegItems: false,
    biryaniItems: false,
  };
  componentDidMount() {
    // $(document).ready(() => {
    //   //Range slider light
    //   $("#slider-range1").slider({
    //     range: true,
    //     min: 0,
    //     max: 500,
    //     values: [0, 500],
    //     slide: function (event, ui) {
    //       $("#amount1").val("₹​" + ui.values[0] + " - ₹​" + ui.values[1]);
    //     },
    //   });

    //   $("#amount1").val(
    //     "₹​" +
    //       $("#slider-range1").slider("values", 0) +
    //       " - ₹​" +
    //       $("#slider-range1").slider("values", 1)
    //   );
    // });

    this.loadVendors();
    this.loadCusines();
    // this.loadBanners();
    this.previousContext = this.context;
  }
  deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  getRadiusBetweenTwoLocations = async (vendor) => {
    let vendorLatLng = vendor.Location.split(",").map(Number);
    //console.log('vendorLatLng', vendorLatLng[0], vendorLatLng[1])
    let lat1 = vendorLatLng[0];
    let lon1 = vendorLatLng[1];
    // let radiusDiff = 0;

    let lat2 = localStorage.getItem("lat");
    let lon2 = localStorage.getItem("lng");

    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    // console.log(d)
    return d;
    // await Geocode.fromAddress(localStorage.getItem("formattedAddress"))
    //   .then((response) => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     //console.log(lat, lng);
    //     var p1 = new window.google.maps.LatLng(lat, lng);
    //     var p2 = new window.google.maps.LatLng(vendorLat, vendorLng);
    //     radiusDiff = (
    //       window.google.maps.geometry.spherical.computeDistanceBetween(p1, p2) /
    //       1000
    //     ).toFixed(0);
    //     //console.log('radiusDiff', radiusDiff);
    //   })
    //   .catch((error) => console.log("Geocode ERROR", error));
    // return radiusDiff;
  };

  loadVendors = async () => {
    //const cityId = this.context.appState.cityinfo.PushId;
    const cityId = localStorage.getItem("pushid");
    this.setState({ product: { ...this.state.product, loading: true } });
    this.setState({ product1: { ...this.state.product, loading: true } });

    if (!cityId) {
      this.setState({ product: { item: [], loading: false } });
      this.setState({ product1: { item: [], loading: false } });

      return false;
    }
    let availableChefs = [];
    let nonAvailableChefs = [];
    this.allProducts = [];
    try {
      const vendors = await firebase
        .database()
        .ref()
        .child("LocalFood")
        .child(cityId)
        .orderByChild("City")
        .equalTo(cityId)
        .once("value");

      if (vendors.exists()) {
        let records = Object.values(vendors.val());
        let currentRedius = localStorage.getItem("radius");
        var today = new Date();
        var CurrentTime = today.getHours() + ":" + today.getMinutes();
        var regExp = /(\d{1,2}):(\d{1,2}):(\d{1,2})/;

        for (let vendor of records) {
          // console.log('CurrentTime check', parseInt(vendor.Open.replace(regExp, "$1$2$3")) <=  parseInt(CurrentTime.replace(regExp, "$1$2$3")) && parseInt(vendor.Close.replace(regExp, "$1$2$3")) >= parseInt(CurrentTime.replace(regExp, "$1$2$3")))
          if (vendor.Location !== "") {
            if (
              (await this.getRadiusBetweenTwoLocations(vendor)) <
                currentRedius &&
              vendor.AStatus === "Active" &&
              vendor.Status === "Active" &&
              parseInt(vendor.Open.replace(regExp, "$1$2$3")) <=
                parseInt(CurrentTime.replace(regExp, "$1$2$3")) &&
              parseInt(vendor.Close.replace(regExp, "$1$2$3")) >=
                parseInt(CurrentTime.replace(regExp, "$1$2$3"))
            ) {
              availableChefs.push(vendor);
              //   console.log('availableChefs', availableChefs);
            } else if (
              vendor.AStatus === "Active" &&
              (await this.getRadiusBetweenTwoLocations(vendor)) < currentRedius
            ) {
              nonAvailableChefs.push(vendor);
              //   console.log('notavailable', nonAvailableChefs);
            } else {
              continue;
            }
          }
        }
        // console.log('availableChefs', availableChefs);
        // console.log('nonAvailableChefs', nonAvailableChefs);
        this.setState({ availableChefs: availableChefs });
        this.setState({ nonAvailableChefs: nonAvailableChefs });
        this.setState({
          product: {
            items: availableChefs.concat(nonAvailableChefs),
            loading: false,
          },
        });
        this.setState({
          product1: {
            items: availableChefs.concat(nonAvailableChefs),
            loading: false,
          },
        });

        this.setState({
          pages:
            this.limit < records.length
              ? Math.ceil(records.length / this.limit)
              : 1,
        });
        this.allProducts = records;
      } else {
        this.setState({ availableChefs: availableChefs });
        this.setState({ nonAvailableChefs: nonAvailableChefs });
        this.setState({
          product: {
            items: availableChefs.concat(nonAvailableChefs),
            loading: false,
          },
        });
        this.setState({
          product1: {
            items: availableChefs.concat(nonAvailableChefs),
            loading: false,
          },
        });
      }
    } catch (e) {
      this.setState({ availableChefs: availableChefs });
      this.setState({ nonAvailableChefs: nonAvailableChefs });
      this.setState({
        product: {
          items: availableChefs.concat(nonAvailableChefs),
          loading: false,
        },
      });
      this.setState({
        product1: {
          items: availableChefs.concat(nonAvailableChefs),
          loading: false,
        },
      });
      console.log(e);
    }
  };
  paginate = (page) => {
    let offset = (page - 1) * this.limit;
    return get(this.state, "product.items", []).slice(
      offset,
      offset + this.limit
    );
    //return get(this.state, 'nonAvailableChefs', []).slice(offset, offset + this.limit);
  };

  paginateAvailableChefs = (page) => {
    let offset = (page - 1) * this.limit;
    // return get(this.state, 'product.items', []).slice(offset, offset + this.limit);
    return get(this.state, "availableChefs", []).slice(
      offset,
      offset + this.limit
    );
  };
  sortProducts = (filterProducts) => {
    // console.log(filterProducts);
    switch (this.state.filter.sort) {
      case "default":
        return filterProducts;

      case "heigh":
        return filterProducts.sort(function (a, b) {
          var textA = parseInt(a.CostTwo);
          var textB = parseInt(b.CostTwo);
          if (textA < textB) return 1;
          if (textA > textB) return -1;
          return 0;
        });

      case "low":
        return filterProducts.sort(function (a, b) {
          var textA = parseInt(a.CostTwo);
          var textB = parseInt(b.CostTwo);
          if (textA < textB) return -1;
          if (textA > textB) return 1;
          return 0;
        });

      case "a-z":
        return filterProducts.sort(function (a, b) {
          var textA = a.Name;
          var textB = b.Name;
          if (textA < textB) return -1;
          if (textA > textB) return 1;
          return 0;
        });

      case "z-a":
        return filterProducts.sort(function (a, b) {
          var textA = a.Name;
          var textB = b.Name;
          if (textA < textB) return 1;
          if (textA > textB) return -1;
          return 0;
        });

      default:
        return filterProducts;
    }
  };
  applyFilter = () => {
    setTimeout(() => {
      if (this.state.filter.cusines.length === 0) {
        this.setState({ product: { items: this.state.product1.items } });
      } else {
        let filteredCuisines = this.state.filter.cusines;
        // console.log(filteredCuisines)
        let filteredProducts = this.allProducts;
        // console.log(this.allProducts);
        let activeChef = [];
        this.allProducts.map((products) => {
          if (products.Status === "Active") {
            activeChef.push(products);
          }
        });
        // console.log(activeChef)
        if (filteredCuisines.length > 0) {
          //  this.allProducts.filter((products) => {
          //    if(products.Status==="Active"){
          //  console.log(products.Status)
          filteredProducts = activeChef.filter((product) => {
            let productCuisines = product.FoodType
              ? Object.keys(product.FoodType)
              : [];
            // console.log(productCuisines)
            let allowedCuisines = productCuisines.filter(function (cusine) {
              return filteredCuisines.indexOf(cusine) !== -1;
            });
            // console.log(filteredCuisines)

            return allowedCuisines.length > 0 ? true : false;
            //   });
            // }
          });
        }
        // let searchText = this.state.filter.search.trim().toLowerCase();
        // if (searchText.length > 0) {
        //   filteredProducts = filteredProducts.filter((product) => {
        //     let chefname = product.Name ? product.Name : "";

        //     return chefname.toLowerCase().indexOf(searchText) >= 0;
        //   });
        // }

        filteredProducts = this.sortProducts(filteredProducts);
        // console.log(filteredProducts);
        this.setState({ product: { items: filteredProducts, loading: false } });
        this.setState({
          page:
            this.limit < filteredProducts.length
              ? Math.ceil(filteredProducts.length / this.limit)
              : 1,
        });
        this.setState({ page: 1 });
      }
    }, 2);
  };

  sort = (e) => {
    let sortValue = e.target.value;
    this.setState({ filter: { ...this.state.filter, sort: sortValue } });
    this.applyFilter();
  };
  filterCategory = (item, e) => {
    const activeClass = "active";

    if (!e.target.parentElement.classList.contains(activeClass)) {
      e.target.parentElement.classList.add(activeClass);
      this.filter.push(item.PushId);
    } else {
      e.target.parentElement.classList.remove(activeClass);
      let index = this.filter.indexOf(item.PushId);
      // if(index!==0){
      this.filter.splice(index, 1);
      // console.log(index)
      // }else{
      //   this.setState({product:{items:this.state.product1.items}})
      // console.log(this.state.product1.items)
      // }
    }
    // console.log({ ...this.state.filter, cusines: this.filter })
    this.setState({ filter: { ...this.state.filter, cusines: this.filter } });
    this.applyFilter();
  };
  loadCusines = async () => {
    this.setState({ cusines: { items: [], loading: true } });
    try {
      const vendors = await firebase
        .database()
        .ref("Masters")
        .child("FoodType")
        .once("value");

      if (vendors.exists()) {
        let records = Object.values(vendors.val());
        this.setState({ cusines: { items: records, loading: false } });
      } else {
        this.setState({ cusines: { items: [], loading: true } });
      }
    } catch (e) {
      this.setState({ cusines: { items: [], loading: true } });
    }
  };
  onChangeVeg = (event) => {
    let vegitemShow = [];
    this.setState({ vegItems: event.target.checked });
    this.state.product.items.map((item, index) => {
      // console.log(event.target.checked)
      if (item.Veg === "Yes") {
        vegitemShow.push(item);
      }
    });
    if (event.target.checked === true) {
      // this.setState({nonvegItems:false})

      this.setState({ product: { items: vegitemShow } });
    } else {
      this.setState({ product: { items: this.state.product1.items } });
    }
  };
  onChangeNonVeg = (event) => {
    let vegitemShow = [];
    this.setState({ nonvegItems: event.target.checked });
    this.state.product.items.map((item, index) => {
      if (item.Veg === "No") {
        vegitemShow.push(item);
      }
    });
    if (event.target.checked === true) {
      // this.setState({vegItems:false})
      this.setState({ product: { items: vegitemShow } });
    } else {
      this.setState({ product: { items: this.state.product1.items } });
    }
  };
  onChangeBiryani = (event) => {
    let vegitemShow = [];
    this.setState({ biryaniItems: event.target.checked });
    this.state.product.items.map((item, index) => {
      if (item.Biryani === "Yes") {
        vegitemShow.push(item);
      }
    });
    if (event.target.checked === true) {
      // this.setState({vegItems:false})
      this.setState({ product: { items: vegitemShow } });
    } else {
      this.setState({ product: { items: this.state.product1.items } });
    }
  };
  render() {
    var isLoggedin = localStorage.getItem("isLogging");
    const { availableChefs } = this.state;
    if (this.state.product.loading) {
      return (
        <Col md={12} className="text-center load-more">
          <Button variant="primary" type="button" disabled="">
            <Spinner animation="grow" size="sm" className="mr-1" />
            Loading...
          </Button>
        </Col>
      );
    }
    return (
      <>
        {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}
        <img
          src={backgroundImage}
          width="100%"
          style={{ marginBottom: "-3%" }}
          alt=""
        />
        <section className="section pt-5 pb-5 products-listing">
          <Container>
            <Row className="d-none-m">
              <Col md={12}>
                {/* <Dropdown className="float-right">

								  <Dropdown.Toggle variant="outline-info">
								    Sort by: <span className="text-theme">Distance</span> &nbsp;&nbsp;
								  </Dropdown.Toggle>
								  <Dropdown.Menu className='dropdown-menu-right shadow-sm border-0'>
								    <Dropdown.Item href="#/distance">Distance</Dropdown.Item>
								    <Dropdown.Item href="#/no-of-coupons">No Of Offers</Dropdown.Item>
								    <Dropdown.Item href="#/rating">Rating</Dropdown.Item>
								  </Dropdown.Menu>
								</Dropdown> */}
                <div
                  className="product-sort d-flex justify-content-between align-items-center float-right"
                  style={{ marginBottom: "2%" }}
                >
                  <div
                    className="sort d-flex align-items-center"
                    variant="outline-info"
                  >
                    <span className="m-right-15 ">Sort By: </span>
                    <div
                      className="form-group"
                      style={{ maxWidth: "100%", width: "200px" }}
                    >
                      <div className="select-basic">
                        <select
                          className="form-control fc--rounded"
                          onChange={this.sort}
                        >
                          <option value="default">Default Sorting</option>
                          <option value="heigh">Price : High to Low</option>
                          <option value="low">Price : Low to High</option>
                          <option value="a-z">Sort by Name : A-Z</option>
                          <option value="z-a">Sort by Name : Z-A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <h4 className="font-weight-bold mt-0 mb-3">OFFERS <small className="h6 mb-0 ml-2">299 restaurants
								 </small>
								</h4> */}
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <div className="filters shadow-sm rounded bg-white mb-4">
                  <div className="filters-header border-bottom pl-4 pr-4 pt-3 pb-3">
                    <h5 className="m-0">
                      <Icofont icon="filter" />
                      Filter By
                    </h5>
                  </div>
                  <div className="filters-body">
                    <Accordion defaultActiveKey="0">
                      {/* <div className="filters-card border-bottom p-4">
                        <div className="filters-card-header" id="headingOne">
                          <h6 className="mb-0">
                            <Accordion.Toggle
                              as={Button}
                              size="block"
                              variant="link"
                              className="text-left d-flex align-items-center p-0"
                              eventKey="0"
                            >
                              Location{" "}
                              <Icofont icon="arrow-down" className="ml-auto" />
                            </Accordion.Toggle>
                          </h6>
                        </div>
                        <Accordion.Collapse eventKey="0">
                          <div className="filters-card-body card-shop-filters">
                            <Form.Check
                              custom
                              type="checkbox"
                              defaultChecked={true}
                              id="custom-cb1"
                              label={
                                <React.Fragment>
                                  Ludhiana Junction{" "}
                                  <small className="text-black-50">230</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb2"
                              label={
                                <React.Fragment>
                                  Model Town{" "}
                                  <small className="text-black-50">95</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb3"
                              label={
                                <React.Fragment>
                                  Civil Lines{" "}
                                  <small className="text-black-50">35</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb4"
                              label={
                                <React.Fragment>
                                  Dugri{" "}
                                  <small className="text-black-50">46</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb5"
                              label={
                                <React.Fragment>
                                  PAU{" "}
                                  <small className="text-black-50">20</small>
                                </React.Fragment>
                              }
                            />
                            <div className="mt-2">
                              <Link to="#" className="link">
                                See all
                              </Link>
                            </div>
                          </div>
                        </Accordion.Collapse>
                      </div> */}
                      <div className="filters-card border-bottom p-4">
                        <div className="filters-card-header" id="headingTwo">
                          <h6 className="mb-0">
                            <Accordion.Toggle
                              as={Button}
                              size="block"
                              variant="link"
                              className="text-left d-flex align-items-center p-0"
                              eventKey="1"
                            >
                              All Cuisines{" "}
                              <Icofont icon="arrow-down" className="ml-auto" />
                            </Accordion.Toggle>
                          </h6>
                        </div>

                        <Accordion.Collapse eventKey="1">
                          <div className="filters-card-body card-shop-filters">
                            {/* <form className="filters-search mb-3">
                              <Form.Group>
                                <Icofont icon="search" />
                                <Form.Control
                                  type="text"
                                  placeholder="Start typing to search..."
                                />
                              </Form.Group>
                            </form> */}
                            <Form.Check
                              custom
                              type="checkbox"
                              checked={this.state.vegItems}
                              disabled={this.state.nonvegItems === true}
                              onChange={this.onChangeVeg}
                              id="custom-cb6"
                              label={
                                <React.Fragment>
                                  Veg{" "}
                                  {this.state.vegItems === true ? (
                                    <small className="text-black-50">
                                      {this.state.product.items.length}
                                    </small>
                                  ) : (
                                    <small className="text-black-50"></small>
                                  )}
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb7"
                              disabled={this.state.vegItems === true}
                              checked={this.state.nonvegItems}
                              onChange={this.onChangeNonVeg}
                              label={
                                <React.Fragment>
                                  Non/Veg{" "}
                                  {this.state.nonvegItems === true ? (
                                    <small className="text-black-50">
                                      {this.state.product.items.length}
                                    </small>
                                  ) : (
                                    <small className="text-black-50"></small>
                                  )}
                                </React.Fragment>
                              }
                            />
                            {/* <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb8"
                              disabled={this.state.biryaniItems === true}
                              checked={this.state.biryaniItems}
                              onChange={this.onChangeBiryani}
                              label={
                                <React.Fragment>
                                  Biryani{" "}
                                  {this.state.biryaniItems === true ? (
                                    <small className="text-black-50">
                                      {this.state.product.items.length}
                                    </small>
                                  ) : (
                                    <small className="text-black-50"></small>
                                  )}
                                </React.Fragment>
                              }
                            /> */}

                            {/* <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb8"
                              label={
                                <React.Fragment>
                                  Healthy{" "}
                                  <small className="text-black-50">130</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb9"
                              label={
                                <React.Fragment>
                                  Vegetarian{" "}
                                  <small className="text-black-50">120</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb10"
                              label={
                                <React.Fragment>
                                  Chinese{" "}
                                  <small className="text-black-50">111</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb11"
                              label={
                                <React.Fragment>
                                  Hamburgers{" "}
                                  <small className="text-black-50">95</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb12"
                              label={
                                <React.Fragment>
                                  Dessert{" "}
                                  <small className="text-black-50">50</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb13"
                              label={
                                <React.Fragment>
                                  Chicken{" "}
                                  <small className="text-black-50">32</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb14"
                              label={
                                <React.Fragment>
                                  Indian{" "}
                                  <small className="text-black-50">156</small>
                                </React.Fragment>
                              }
                            /> */}
                            {/* <div className="mt-2">
                              <Link to="#" className="link">
                                See all
                              </Link>
                            </div> */}
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="filters-card border-bottom p-4">
                        <div className="filters-card-header" id="headingOne">
                          <h6 className="mb-0">
                            <Accordion.Toggle
                              as={Button}
                              size="block"
                              variant="link"
                              className="text-left d-flex align-items-center p-0"
                              eventKey="2"
                            >
                              Food Types{" "}
                              <Icofont icon="arrow-down" className="ml-auto" />
                            </Accordion.Toggle>
                          </h6>
                        </div>

                        <Accordion.Collapse eventKey="2">
                          <div className="filters-card-body card-shop-filters">
                            {/* {this.state.cusines.items.map((item) => {
                               if(item.Name!=="Brunch"&&item.Name!=="Supper"){
                              return (
>>>>>>> Stashed changes
                            <Form.Check
                              custom
                              type="checkbox"
                              // defaultChecked={false}
                              id="custom-cb15"
                              onChange={(e) => {
                                return this.filterCategory(item, e);
                              }}
                              label={
                                <React.Fragment>
                                  {item.Name}{" "}
                                  <small className="text-black-50">156</small>
                                </React.Fragment>
                              }

                            />
                            );
                          }
                    })} */}
                            <ul>
                              {this.state.cusines.items.map((item, index) => {
                                if (
                                  item.Name !== "Brunch" &&
                                  item.Name !== "Supper"
                                ) {
                                  return (
                                    <li
                                      className="arrow-list text-left"
                                      key={index}
                                    >
                                      <input
                                        type="checkbox"
                                        onChange={(e) => {
                                          return this.filterCategory(item, e);
                                        }}
                                        className="mr-2  "
                                      />
                                      {item.Name}
                                    </li>
                                  );
                                }
                              })}
                            </ul>

                            {/* <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb16"
                              label={
                                <React.Fragment>
                                  Coupons{" "}
                                  <small className="text-black-50">120</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb17"
                              label={
                                <React.Fragment>
                                  Open Now [1:31am]{" "}
                                  <small className="text-black-50">85</small>
                                </React.Fragment>
                              }
                            /> */}
                          </div>
                        </Accordion.Collapse>
                      </div>
                      {/* <div className="filters-card border-bottom p-4">
                        <div className="filters-card-header" id="headingOne">
                          <h6 className="mb-0">
                            <Accordion.Toggle
                              as={Button}
                              size="block"
                              variant="link"
                              className="text-left d-flex align-items-center p-0"
                              eventKey="3"
                            >
                              Delivery time{" "}
                              <Icofont icon="arrow-down" className="ml-auto" />
                            </Accordion.Toggle>
                          </h6>
                        </div>
                        <Accordion.Collapse eventKey="3">
                          <div className="filters-card-body card-shop-filters">
                            <Form.Check
                              custom
                              type="checkbox"
                              defaultChecked={true}
                              id="custom-cb18"
                              label="Any Time"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb19"
                              label="25 min"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb20"
                              label="30 min"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb21"
                              label="40 min"
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb22"
                              label="45 min"
                            />
                            <div className="mt-2">
                              <Link to="#" className="link">
                                See all
                              </Link>
                            </div>
                          </div> 
                        </Accordion.Collapse>
                      </div>*/}
                      {/* <div className="filters-card border-bottom p-4">
                        <div className="filters-card-header" id="headingOne">
                          <h6 className="mb-0">
                            <Accordion.Toggle
                              as={Button}
                              size="block"
                              variant="link"
                              className="text-left d-flex align-items-center p-0"
                              eventKey="4"
                            >
                              Category{" "}
                              <Icofont icon="arrow-down" className="ml-auto" />
                            </Accordion.Toggle>
                          </h6>
                        </div>
                        <Accordion.Collapse eventKey="4">
                          <div className="filters-card-body card-shop-filters">
                            <Form.Check
                              custom
                              type="checkbox"
                              defaultChecked={true}
                              id="custom-cb23"
                              label={
                                <React.Fragment>
                                  Delivery{" "}
                                  <small className="text-black-50">156</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb24"
                              label={
                                <React.Fragment>
                                  Dine-out{" "}
                                  <small className="text-black-50">120</small>
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb25"
                              label={
                                <React.Fragment>
                                  Cafés
                                  <small className="text-black-50">85</small>
                                </React.Fragment>
                              }
                            />
                          </div>
                        </Accordion.Collapse>
                      </div> */}
                    </Accordion>
                  </div>
                </div>
                {/* <div className="filters pt-2">
                  <div className="filters-body rounded shadow-sm bg-white">
                    <div className="filters-card p-4">
                      <div>
                        <div className="filters-card-body card-shop-filters pt-0">
                          <Form.Check
                            custom
                            type="radio"
                            name="partner"
                            defaultChecked={true}
                            id="custom-cb26"
                            label="Gold Partner"
                          />
                          <Form.Check
                            custom
                            type="radio"
                            name="partner"
                            id="custom-cb27"
                            label="Order Food Online"
                          />
                          <Form.Check
                            custom
                            type="radio"
                            name="partner"
                            id="custom-cb28"
                            label="Osahan Eat"
                          />
                          <hr />
                          <small className="text-success">
                            Use code OSAHAN50 to get 50% OFF (up to $30) on
                            first 5 orders. T&Cs apply.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </Col>
              <Col md={9}>
                <CategoriesCarousel />
                <Row>
                  {this.state.product.items.map((item, index) => {
                    //   console.log(item)
                    var cuisinesitems = [];
                    if (item.Cuisines) {
                      Object.keys(item.Cuisines).forEach(function (key, index) {
                        if (index < 3) {
                          cuisinesitems.push(
                            <b key={index}>
                              &nbsp;{index > 0 ? "•" : ""}&nbsp;
                              {item.Cuisines[key].Name}
                            </b>
                          );
                        }
                      });
                    }
                    if (
                      availableChefs.find((chef) => chef.UserId === item.UserId)
                    ) {
                      let profileImage = item.PP
                        ? item.PP
                        : "../assets/img/chef.png";
                      if (
                        profileImage ===
                        "https://firebasestorage.googleapis.com/v0/b/mothersfood-a1de8.appspot.com/o/CloudKitchen%2F1599912088639-add.png?alt=media&token=60561b4b-af5d-489c-bbc8-28e8de47851f"
                      ) {
                        profileImage = "../assets/img/chef.png";
                      }
                      return (
                        <Col md={4} sm={6} className="mb-4 pb-2" key={index}>
                          <CardItem
                            title={item.KitchenName}
                            subTitle={cuisinesitems}
                            imageAlt="Product"
                            image={profileImage}
                            imageClass="img-fluid item-img"
                            linkUrl={"detail/" + item.UserId}
                            offerText="65% off | Use Coupon OSAHAN50"
                            time={
                              item.DeliveryTime
                                ? item.DeliveryTime + " mins"
                                : "40 mins"
                            }
                            price={
                              item.CostTwo
                                ? item.CostTwo + " For Two"
                                : "250 For Two"
                            }
                            // showPromoted={true}
                            // promotedVariant="dark"
                            favIcoIconColor={
                              item.Veg === "Yes" ? "text-green" : "text-danger"
                            }
                            rating={
                              item.Ratings !== undefined
                                ? Math.trunc(item.Ratings * 10) / 10
                                : "5"
                            }
                            available={false}
                            product={item}
                            id={"detail/" + item.UserId}
                          />
                        </Col>
                      );
                    } else {
                      let profileImage = item.PP
                        ? item.PP
                        : "../assets/img/chef.png";
                      if (
                        profileImage ===
                        "https://firebasestorage.googleapis.com/v0/b/mothersfood-a1de8.appspot.com/o/CloudKitchen%2F1599912088639-add.png?alt=media&token=60561b4b-af5d-489c-bbc8-28e8de47851f"
                      ) {
                        profileImage = "../assets/img/chef.png";
                      }
                      return (
                        <Col
                          md={4}
                          sm={6}
                          className="mb-4 pb-2"
                          style={{ border: "none", opacity: "0.5" }}
                          key={index}
                        >
                          <CardItem
                            title={item.KitchenName}
                            subTitle={cuisinesitems}
                            imageAlt="Product"
                            image={profileImage}
                            imageClass="img-fluid item-img"
                            linkUrl={"detail/" + item.UserId}
                            offerText="65% off | Use Coupon OSAHAN50"
                            time={
                              item.DeliveryTime
                                ? item.DeliveryTime + " mins"
                                : "40 mins"
                            }
                            price={
                              item.CostTwo
                                ? item.CostTwo + " For Two"
                                : "250 For Two"
                            }
                            // showPromoted={true}
                            // promotedVariant="dark"
                            favIcoIconColor={
                              item.Veg === "Yes" ? "text-green" : "text-danger"
                            }
                            rating={
                              item.Ratings !== undefined
                                ? Math.trunc(item.Ratings * 10) / 10
                                : "5"
                            }
                            product={item}
                            id={"detail/" + item.UserId}
                            available={true}
                          />
                        </Col>
                      );
                    }
                  })}
                  {/* <Col md={4} sm={6} className="mb-4 pb-2">

			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/2.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/3.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/4.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/5.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/6.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/7.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/8.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/9.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col> */}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default List;
