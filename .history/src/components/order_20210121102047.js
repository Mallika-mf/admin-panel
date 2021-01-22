/* eslint-disable no-useless-escape */
/* eslint-disable array-callback-return */
import React, { Fragment } from "react";
import NavbarListing from "./navBar/navbarListing";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import $ from "jquery";
// import "jquery-ui/themes/base/core.css";
// import "jquery-ui/themes/base/theme.css";
// import "jquery-ui/themes/base/slider.css";
// import "jquery-ui/ui/core";
// import "jquery-ui/ui/widgets/slider";
// import "../style copy.css";
// import Card from "../container/element/card/shop-product";
// import MediaQuery from "react-responsive";
// import { Line } from "react-chartjs-2";
import firebase from "./Firebase";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { tsConstructorType } from "@babel/types";
import { AppContext } from "../components/home/context/app.provider";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// import Geocode from "react-geocode";
import { get } from "lodash";
// import CategoriesCarousel from "./common/CategoriesCarousel";
// import CardItem from "./common/CardItem";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 4,
    paritialVisibilityGutter: 10,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 10,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    paritialVisibilityGutter: 10,
  },
};

const SingleVendor = ({ product, available }) => {
  console.log(product);
  var cuisinesitems = [];
  if (product.Cuisines) {
    Object.keys(product.Cuisines).forEach(function (key, index) {
      if (index < 3) {
        cuisinesitems.push(
          <li>
            {index > 0 ? <i className="fa fa-circle"></i> : ""}
            <span>{product.Cuisines[key].Name}</span>
          </li>
        );
      }
    });
  }
  let profileImage = product.PP ? product.PP : "../assets/img/chef.png";
  if (
    profileImage ===
    "https://firebasestorage.googleapis.com/v0/b/mothersfood-a1de8.appspot.com/o/CloudKitchen%2F1599912088639-add.png?alt=media&token=60561b4b-af5d-489c-bbc8-28e8de47851f"
  ) {
    profileImage = "../assets/img/chef.png";
  }
  return (
    <>
      <div
        className="ChefCard"
        style={
          available ? { border: "none" } : { border: "none", opacity: "0.7" }
        }
      >
        {/* <NavLink to={"orderdetails"} className="ChefCardLink" > */}
        <div
          className="card-img-top img-responsive"
          style={{
            height: "200px",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            // class="card-img-top img-responsive"
            src={profileImage}
            alt="Cardimage"
            style={{
              objectFit: "contain",
              maxHeight: "70vh",
              maxwidth: "150%",
            }}
          />
          {/* <span className="label-promoted">Promoted</span> */}
          <span className="label-ratings">
            <i className="fa fa-star"></i>
            {product.Ratings !== undefined
              ? Math.trunc(product.Ratings * 10) / 10
              : "5"}
          </span>
        </div>
        {/* </NavLink> */}
        <div class="ChefCardBody">
          <h4
            class="card-title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5%",
            }}
          >
            {product.Name}
          </h4>
          {/* <p style={{marginBottom:"0px !important"}}>{product.KitchenName}</p> */}
          {/* <p style={{marginBottom:"0px !important", textAlign: "left"}}></p> */}
          {/* <p style={{marginBottom:"0px !important", textAlign: "right"}}>{product.CostTwo}</p> */}
          <ul>{cuisinesitems}</ul>
          <div className="row mb-4">
            <div className="col-6">
              <i className="fa fa-clock-o"></i>
              {product.DeliveryTime
                ? product.DeliveryTime + " mins"
                : "40 mins"}
            </div>
            <div className="col-6">
              <i className="fa fa-inr" aria-hidden="true"></i>
              {product.CostTwo ? product.CostTwo + " For Two" : "250 For Two"}
            </div>
          </div>
          <div className="row available_offer mb-4 d-none">
            <div className="col-12">
              <span className="offer_section pr-0">
                <span className="offer_tag open">Offer</span>
                <span className="offer_value">65% off</span>
                <span className="seprator"></span>
              </span>
              <span className="coupon_code_section pl-0">
                <span className="coupon_code">Use Coupon OSAHAN50</span>
              </span>
            </div>
          </div>
          {product.Veg === "Yes" ? (
            <img className="VegIcon" src="../assets/img/veg.png" alt="veg" />
          ) : (
            <img className="VegIcon" src="../assets/img/nonveg.png" alt="veg" />
          )}
          {/* <p class="card-text">{product.Name}</p> */}
          {available ? (
            <NavLink
              style={{ color: "white" }}
              to={{
                pathname: "orderdetails/" + product.UserId,
                state: { product: product },
              }}
              className="ChefCardProfileButton"
            >
              View Items
            </NavLink>
          ) : (
            <button disabled className="ChefCardProfileButton">
              View Items
            </button>
          )}
          <br />
        </div>
      </div>
    </>
  );
};

class ShopProduct extends React.Component {
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
    cusines: { items: [], loading: false },
    banners: { items: [], bannerloading: false },
    filter: { cusines: [], search: "", sort: "" },
    availableChefs: [],
    nonAvailableChefs: [],
    count: 0,
    page: 1,
    pages: 0,
  };

  componentDidMount() {
    $(document).ready(() => {
      //Range slider light
      $("#slider-range1").slider({
        range: true,
        min: 0,
        max: 500,
        values: [0, 500],
        slide: function (event, ui) {
          $("#amount1").val("₹​" + ui.values[0] + " - ₹​" + ui.values[1]);
        },
      });

      $("#amount1").val(
        "₹​" +
          $("#slider-range1").slider("values", 0) +
          " - ₹​" +
          $("#slider-range1").slider("values", 1)
      );
    });

    this.loadVendors();
    this.loadCusines();
    this.loadBanners();
    this.previousContext = this.context;
  }

  sortProducts = (filterProducts) => {
    switch (this.state.filter.sort) {
      //   case "heigh":
      //     this.setState({
      //       product: sort.sort(function(a, b) {
      //         var textA = a.price;
      //         var textB = b.price;
      //         if (textA < textB) return 1;
      //         if (textA > textB) return -1;
      //         return 0;
      //       })
      //     });
      //     break;
      //   case "low":
      //     this.setState({
      //       product: sort.sort(function(a, b) {
      //         var textA = a.price;
      //         var textB = b.price;
      //         if (textA < textB) return -1;
      //         if (textA > textB) return 1;
      //         return 0;
      //       })
      //     });
      //     break;
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
  applyFilterChefs = () => {
    setTimeout(() => {
      let filteredCuisinesChefs = this.state.filter.cusines;
      console.log(filteredCuisinesChefs);
      let filteredProducts = [];
      console.log(filteredProducts);
      let activeChef = [];
      this.allProducts.map((products, index) => {
        if (products.Status === "Active") {
          activeChef.push(products);
        }
      });
      console.log(activeChef);
      if (filteredCuisinesChefs.length > 0) {
        //  this.allProducts.filter((products) => {
        //    if(products.Status==="Active"){
        //  console.log(products.Status)
        filteredProducts = activeChef.filter((product) => {
          let productCuisines = product.FoodType
            ? Object.keys(product.FoodType)
            : [];
          console.log(productCuisines);
          let allowedCuisines = productCuisines.filter(function (cusine) {
            return filteredCuisinesChefs.indexOf(cusine) !== -1;
          });

          return allowedCuisines.length > 0 ? true : false;

          //   });
          // }
        });
      }
      filteredProducts = this.sortProducts(filteredProducts);
      console.log(filteredProducts);
      if (filteredProducts.length === 0) {
        window.location.reload();
      }
      this.setState({ product: { items: filteredProducts, loading: false } });
      this.setState({
        pages:
          this.limit < filteredProducts.length
            ? Math.ceil(filteredProducts.length / this.limit)
            : 1,
      });
      this.setState({ page: 1 });
    }, 2);
  };
  applyFilter = () => {
    setTimeout(() => {
      let filteredCuisines = this.state.filter.cusines;
      console.log(filteredCuisines);
      let filteredProducts = this.allProducts;
      console.log(filteredProducts);
      let activeChef = [];
      this.allProducts.map((products) => {
        if (products.Status === "Active") {
          activeChef.push(products);
        }
      });
      console.log(activeChef);
      if (filteredCuisines.length > 0) {
        //  this.allProducts.filter((products) => {
        //    if(products.Status==="Active"){
        //  console.log(products.Status)
        filteredProducts = activeChef.filter((product) => {
          let productCuisines = product.FoodType
            ? Object.keys(product.FoodType)
            : [];
          console.log(productCuisines);
          let allowedCuisines = productCuisines.filter(function (cusine) {
            return filteredCuisines.indexOf(cusine) !== -1;
          });

          return allowedCuisines.length > 0 ? true : false;
          //   });
          // }
        });
      }
      let searchText = this.state.filter.search.trim().toLowerCase();
      if (searchText.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          let chefname = product.Name ? product.Name : "";

          return chefname.toLowerCase().indexOf(searchText) >= 0;
        });
      }

      filteredProducts = this.sortProducts(filteredProducts);
      console.log(filteredProducts);
      this.setState({ product: { items: filteredProducts, loading: false } });
      this.setState({
        pages:
          this.limit < filteredProducts.length
            ? Math.ceil(filteredProducts.length / this.limit)
            : 1,
      });
      this.setState({ page: 1 });
    }, 2);
  };

  searchText = (e) => {
    var text = e.target.value;

    this.setState({ filter: { ...this.state.filter, search: text } });
    this.applyFilter();
  };

  sort = (e) => {
    let sortValue = e.target.value;
    this.setState({ filter: { ...this.state.filter, sort: sortValue } });
    this.applyFilter();
  };

  filterCategory = (item, e) => {
    const activeClass = "Active";

    if (!e.target.parentElement.classList.contains(activeClass)) {
      e.target.parentElement.classList.add(activeClass);
      this.filter.push(item.PushId);
    } else {
      e.target.parentElement.classList.remove(activeClass);
      let index = this.filter.indexOf(item.PushId);
      this.filter.splice(index, 1);
    }

    this.setState({ filter: { ...this.state.filter, cusines: this.filter } });
    this.applyFilterChefs();
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

  loadBanners = async () => {
    this.setState({ banners: { items: [], bannerloading: true } });
    try {
      const banners = await firebase
        .database()
        .ref("AppContent")
        .child("HomePage")
        .once("value");

      if (banners.exists()) {
        // let records = Object.values(banners.val());
        let records = [];
        Object.keys(banners.val().Banner).forEach((banner) =>
          records.push(banners.val().Banner[banner])
        );
        this.setState({ banners: { items: records, bannerloading: false } });
      } else {
        this.setState({ banners: { items: [], bannerloading: true } });
      }
    } catch (e) {
      this.setState({ banners: { items: [], bannerloading: true } });
    }
  };

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
    console.log(d);
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

    if (!cityId) {
      this.setState({ product: { item: [], loading: false } });
      return false;
    }
    let availableChefs = [];
    let nonAvailableChefs = [];
    this.allProducts = [];
    try {
      const vendors = await firebase
        .database()
        .ref(cityId)
        .orderByChild("City")
        .equalTo(cityId)
        .once("value");

      if (vendors.exists()) {
        let records = Object.values(vendors.val());
        let currentRedius = localStorage.getItem("radius");
        var today = new Date();
        var CurrentTime = today.getHours() + ":" + today.getMinutes();
        var regExp = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;

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
              console.log("availableChefs", availableChefs);
            } else if (
              vendor.AStatus === "Active" &&
              (await this.getRadiusBetweenTwoLocations(vendor)) < currentRedius
            ) {
              nonAvailableChefs.push(vendor);
              console.log("notavailable", nonAvailableChefs);
            } else {
              continue;
            }
          }
        }
        console.log("availableChefs", availableChefs);
        console.log("nonAvailableChefs", nonAvailableChefs);
        this.setState({ availableChefs: availableChefs });
        this.setState({ nonAvailableChefs: nonAvailableChefs });
        this.setState({
          product: {
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

  next = () => {
    this.setState((prev) => {
      return { page: ++prev.page };
    });
  };

  prev = () => {
    this.setState((prev) => {
      return { page: --prev.page };
    });
  };

  getOffset(page) {
    let offset = (page - 1) * this.limit;
    let end = offset + this.limit - 1;
    let maxLimit =
      end > get(this.state, "product.items.length", 0)
        ? get(this.state, "product.items.length", 0)
        : end;

    return (
      <>
        <p>
          Showing <span>{++offset}</span> - <span>{maxLimit + 1}</span> results
        </p>
      </>
    );
  }

  chefDistance(vendor) {
    let vendorLatLng = vendor.Location.split(",").map(Number);
    let lat1 = vendorLatLng[0];
    let lon1 = vendorLatLng[1];

    let lat2 = localStorage.getItem("lat");
    let lon2 = localStorage.getItem("lng");
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }
  }

  componentDidUpdate() {
    // if (this.previousContext.appState !== this.context.appState) {
    //   this.loadVendors();
    //   this.previousContext = this.context;
    // }
  }

  render() {
    // this.loadVendors();
    // // sorting here
    // const sort = [];
    // Object.values(this.state.product).map(item => {
    //     return sort.push(item)
    // })
    // const sorting = (e) => {
    //     switch (e.target.value) {
    //         case 'heigh':
    //         this.setState({
    //             product: sort.sort(function(a, b) {
    //                 var textA = a.price;
    //                 var textB = b.price;
    //                 if (textA < textB) return 1;
    //                 if (textA > textB) return -1;
    //                 return 0;
    //             })
    //         })
    //         break;
    //         case "low" :
    //             this.setState({
    //                 product: sort.sort(function(a, b) {
    //                     var textA = a.price;
    //                     var textB = b.price;
    //                     if (textA < textB) return -1;
    //                     if (textA > textB) return 1;
    //                     return 0;
    //                 })
    //             })
    //             break;
    //             case 'a-z':
    //             this.setState({
    //                 product: sort.sort(function(a, b) {
    //                     var textA = a.title;
    //                     var textB = b.title;
    //                     if (textA < textB) return -1;
    //                     if (textA > textB) return 1;
    //                     return 0;
    //                 })
    //             });
    //             break;
    //             case 'z-a':
    //             this.setState({
    //                 product: sort.sort(function(a, b) {
    //                     var textA = a.title;
    //                     var textB = b.title;
    //                     if (textA < textB) return 1;
    //                     if (textA > textB) return -1;
    //                     return 0;
    //                 })
    //             });
    //             break;
    //         default :
    //         this.setState({
    //             product: this.state.cate
    //         });
    //     }
    // }
    // // filter by category
    // const category = e => {
    //     e.preventDefault();
    //     const filter = Object.values(this.state.cate).filter(item => {
    //         return item.category === e.target.innerHTML
    //     })
    //     if(e.target.innerHTML !== "All") {
    //         this.setState({
    //             product : filter
    //         })
    //     } else {
    //         this.setState({
    //             product : this.state.cate
    //         })
    //     }
    // }
    // const catItem = [];
    // Object.values(this.state.cate).map( value => {
    //     return catItem.push(value.category)
    // })
    // const catItemFilter = new Set(catItem);
    // // filter by category end
    // filter by price range
    // const range = (e) => {
    //   e.preventDefault();
    //   const value = "100";
    //   const max = "100";
    //   const min = "10";
    //   this.setState({
    //     product: Object.values(this.state.cate).filter((item1) => {
    //       return item1.price >= min && item1.price <= max;
    //     }),
    //   });
    // };
    // // filter by price range end
    // filter by search
    // const search = e => {
    //     e.preventDefault();
    //     const value = e.target.value.toLowerCase();
    //     this.setState({
    //         product: Object.values(this.state.cate).filter(function (item) {
    //             return item.title.toLowerCase().startsWith(value) || item.content.toLowerCase().startsWith(value) ?
    //                 item : ''
    //         })
    //     })
    // }
    // pagination start
    // const blog  = this.state.product;
    // const project = Object.values(blog).slice(this.state.count*9, this.state.count*9+9);
    // const length = Object.values(blog).length;
    // const item_length = Math.ceil(length / 9);
    // const item = () => {
    //     return (
    //         Object.values(blog).map((value, key) => {
    //             return (
    //                 key <= item_length-1 &&
    //                 <li key={ key } className={`page-item click ${key === 0 && "active"}`}><NavLink className="page-link" to="#">{key + 1}</NavLink></li>
    //             )
    //         })
    //     )
    // }
    // setTimeout(() => {
    //     const li = document.querySelectorAll('.page-item');
    //     const click = document.querySelectorAll('.click');
    //     click.forEach((value, key) => {
    //         value.addEventListener('click', () => {
    //             $(window).scrollTop(0);
    //             li.forEach((li_item, li_key) => {
    //                 li_item.classList.remove('active');
    //             })
    //             value.classList.add('active');
    //             this.setState({
    //                 count : key
    //             })
    //         })
    //     })
    //     var next = document.querySelector('.next');
    //     var prev = document.querySelector('.prev');
    //     next.addEventListener('click', () => {
    //         document.querySelector('.page-item.active').nextElementSibling.click();
    //     })
    //     prev.addEventListener('click', () => {
    //         document.querySelector('.page-item.active').previousElementSibling.click();
    //     })
    // }, 500);
    // pagination
    const { items, bannerloading } = this.state.banners;
    const { loading } = this.state.product;
    const { availableChefs } = this.state;

    // console.log('page', this.state.page)
    // console.log('chefs', this.state)
    return (
      <Fragment>
        <NavbarListing pageTitle="Shop Products" />
        {/* <img src={process.env.PUBLIC_URL + 'assets/img/img-banner.jpg'} /> */}

        {/* <MediaQuery minDeviceWidth={1224}> */}
        <section className="breadcrumb_area breadcrumb1">
          <div className="container">
            <div className="row">
              {bannerloading ? (
                <div style={{ marginLeft: "45%" }}>
                  <Loader
                    type="Circles"
                    color="#dc3545"
                    height={100}
                    width={100}
                  />
                </div>
              ) : (
                <CarouselSection>
                  <Carousel
                    ssr
                    additionalTransfrom={0}
                    arrows
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={true}
                    infinite
                    itemClass=""
                    renderDotsOutside={false}
                    responsive={responsive}
                    //deviceType={deviceType}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                  >
                    {items &&
                      items.length &&
                      items.map((banner, index) => {
                        return (
                          // <div className="col-md-3" key={index}>
                          <img
                            src={banner}
                            alt=""
                            className="img-responsive"
                            style={{
                              maxWidth: "255px",
                              height: "170px",
                              // objectFit: "cover",
                              borderRadius: "12px",
                            }}
                          />
                          // </div>
                        );
                      })}
                  </Carousel>
                </CarouselSection>
              )}
              {/* <div className="col-md-4">
                  <img
                    src="../assets/img/baner.png"
                    className="img-responsive"
                  />
                </div> */}

              {/* <div className="col-md-4">
                  <img
                    src="../assets/img/banner2.png"
                    className="img-responsive"
                  />
                </div>

                <div className="col-md-4">
                  <img
                    src="../assets/img/banner3.png"
                    className="img-responsive"
                  />
                </div> */}
            </div>
          </div>
        </section>
        {/* </MediaQuery> */}
        {/* <MediaQuery maxDeviceWidth={1224}>
          <section className="breadcrumb_area breadcrumb1">
            <div
              className="container"
              style={{
                display: "flex",
                overflowX: "scroll",
                width: "100%",
                padding: " 5px 0",
                marginRight: "10px"
              }}
            >
              <img
                src="../assets/img/baner.png"
                style={{
                  flexShrink: "0",
                  width: "300px",
                  height: "200px",
                  borderRadius: "10px",
                  marginLeft: "10px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center"
                }}
              />

              <img
                src="../assets/img/banner2.png"
                style={{
                  flexShrink: "0",
                  width: "300px",
                  height: "200px",
                  borderRadius: "10px",
                  marginLeft: "10px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center"
                }}
              />

              <img
                src="../assets/img/banner3.png"
                style={{
                  flexShrink: "0",
                  width: "300px",
                  height: "200px",
                  borderRadius: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center"
                }}
              />
            </div>
          </section>
        </MediaQuery> */}

        <section className="products-wrapper p-top-60 p-bottom-110">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 order-1 order-md-0">
                <div className="sidebar">
                  {/* <!-- search widget --> */}
                  <div className="d-none d-lg-block">
                    <div className="widget-wrapper">
                      <div className="search-widget">
                        <form action="#">
                          <div className="input-group">
                            <input
                              type="text"
                              className="fc--rounded"
                              placeholder="Search"
                              onChange={this.searchText}
                            />
                            <button type="submit">
                              <i className="la la-search"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* <!-- ends: .widget-wrapper --> */}
                  </div>
                  {/* <!-- category widget --> */}
                  <div className="widget-wrapper">
                    <div className="widget-default">
                      <div className="widget-header">
                        <h4 className="widget-title text-left">Filter By</h4>
                      </div>
                      <div className="widget-content">
                        <div className="category-widget">
                          <h6 className="widget-title text-left mb-4">
                            Food Type{" "}
                          </h6>
                          {/* <i className="fa fa-arrow-down pull-right mt-2"></i> */}
                          <ul>
                            {this.state.cusines.items.map((item, index) => {
                              if (
                                item.Name !== "Brunch" &&
                                item.Name !== "Supper"
                              ) {
                                return (
                                  <li
                                    key={index}
                                    className="arrow-list text-left"
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- ends: .widget-wrapper --> */}
                  {/* <!-- price filter widget --> */}
                  {/* <div className="widget-wrapper">
                    <div className="widget-default">
                      <div className="widget-header">
                        <h6 className="widget-title">Filter By Price</h6>
                      </div>
                      <div className="widget-content">
                        <div className="price-filter">
                          <div className="range-slider text-center">
                            <div
                              id="slider-range1"
                              className="slider-range m-auto"
                            ></div>
                            <p>
                              <button
                                type="submit"
                                onClick={range}
                                className="btn filter-btn btn--rounded btn-secondary"
                              >
                                Filter
                              </button>
                              <input
                                type="text"
                                id="amount1"
                                className="amounts"
                                value="&#8377;100"
                                readOnly
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/*<!-- ends: .widget-wrapper -->*/}
                </div>
                {/*<!-- ends: .sidebar -->*/}
              </div>
              {/*<!-- ends: .col-lg-3 -->*/}

              <div className="col-lg-9 col-md-8 order-0 order-md-1">
                <div className="d-lg-none">
                  {/*<!-- search widget -->*/}
                  <div className="widget-wrapper">
                    <div className="search-widget">
                      <form action="#">
                        <div className="input-group">
                          <input
                            type="text"
                            className="fc--rounded"
                            placeholder="Search"
                          />
                          <button type="submit">
                            <i className="la la-search"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/*<!-- ends: .widget-wrapper -->*/}
                </div>
                <div className="product-sort d-flex justify-content-between align-items-center">
                  <div className="sort d-flex align-items-center">
                    <span className="m-right-15">Sort By: </span>
                    <div className="form-group">
                      <div className="select-basic">
                        <select
                          className="form-control fc--rounded"
                          onChange={this.sort}
                        >
                          <option>Default Sorting</option>
                          <option value="heigh">Price : High to Low</option>
                          <option value="low">Price : Low to High</option>
                          <option value="a-z">Sort by Name : A-Z</option>
                          <option value="z-a">Sort by Name : Z-A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="total-pages text-right">
                    {this.getOffset(this.state.page)}
                  </div>
                </div>
                {/*<!-- ends: .product-sort -->*/}

                <div className="product-grid">
                  <div
                    className="row"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {loading ? (
                      <div style={{ marginLeft: "42%", marginTop: "60px" }}>
                        <Loader
                          type="Circles"
                          color="#dc3545"
                          height={100}
                          width={100}
                        />
                      </div>
                    ) : (
                      this.paginate(this.state.page).map((item, index) => {
                        if (
                          availableChefs.find(
                            (chef) => chef.UserId === item.UserId
                          )
                        ) {
                          return (
                            <SingleVendor
                              product={item}
                              key={index}
                              available={true}
                            />
                          );
                        } else {
                          return (
                            <SingleVendor
                              product={item}
                              key={index}
                              available={false}
                            />
                          );
                        }
                      })

                      // this.paginateAvailableChefs(this.state.page).map((item) => {
                      //   return <SingleVendor product={item} />;
                      // })
                    )}
                  </div>
                </div>

                <div className="product-grid">
                  {/* <Card shop_product={project} /> */}
                  <div className="project-pagination m-top-30">
                    <div className="pagination-area">
                      <nav aria-label="Page navigation pagination-left">
                        <ul className="pagination justify-content-center">
                          {this.state.page > 1 ? (
                            <li className="page-item prev">
                              <NavLink
                                className="page-link"
                                to="#"
                                onClick={this.prev}
                              >
                                Previous
                              </NavLink>
                            </li>
                          ) : null}
                          {this.state.page < this.state.pages ? (
                            <li className="page-item next">
                              <NavLink
                                className="page-link"
                                to="#"
                                onClick={this.next}
                              >
                                Next
                              </NavLink>
                            </li>
                          ) : null}
                        </ul>
                      </nav>
                    </div>
                    {/*<!-- ends: .pagination-wrapper -->*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart,
  };
};
export default connect(mapStateToProps)(ShopProduct);

export const CarouselSection = styled.div`
  .react-multi-carousel-list {
    .react-multiple-carousel__arrow {
      opacity: 0;
      visibility: hidden;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      transition: background-color 0.2s ease;
      outline: 0 !important;
      position: absolute;
      &::before {
        color: rgb(234, 103, 103);
      }

      &:hover {
        background-color: rgb(234, 103, 103);
        &::before {
          color: #ffffff;
        }
      }
    }

    &:hover {
      .react-multiple-carousel__arrow {
        opacity: 1;
        visibility: visible;
      }
    }

    .react-multiple-carousel__arrow--left {
      left: 30px;
    }

    .react-multiple-carousel__arrow--right {
      right: 30px;
    }
  }
`;
