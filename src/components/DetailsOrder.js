/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, Link, Redirect } from "react-router-dom";
import "jquery-ui/themes/base/core.css";
import "jquery-ui/themes/base/theme.css";
import "jquery-ui/themes/base/slider.css";
import "jquery-ui/ui/core";
import "jquery-ui/ui/widgets/slider";
import MediaQuery from "react-responsive";
import { AppContext } from "../components/home/context/app.provider";
import { Cart } from "../components/Store/action/cartActions";
import firebase from "./Firebase";
import { MinusCircle, PlusCircle } from "@styled-icons/boxicons-regular";
import { get, cloneDeep } from "lodash";
import { Modal } from "antd";
import { message } from "antd";
import * as R from "ramda";
import "../components/styles/center.css";
import bannerImg from "./AbotUs/AboutUs-images/about-banner.png";
import "./DetailsOrder.css";
// setup the step content
const step1Content = <h1>Step 1 Content</h1>;
const step2Content = <h1>Step 2 Content</h1>;
const step3Content = <h1>Step 3 Content</h1>;

const { uniqWith, eqProps } = R;
const RenderCartItem = ({ cartItem }) => {
  return (
    <div className="row" style={{ display: "flex", alignItems: "center" }}>
      {/* <div className="col-3">
      <img
        src="../assets/img/chef.png"
        style={{ margin: "auto" }}
        className="img-responsive"
      />
    </div> */}
      <div
        className="col-4"
        style={{ paddingRight: "0px", paddingLeft: "5px" }}
      >
        {get(cartItem, "Name", "Product Name")}
      </div>
      <div
        className="col-3"
        style={{ paddingRight: "0px", paddingLeft: "3px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "#FFEFED",
            color: "#EA6767",
            border: "solid 1px #EA6767",
            margin: "auto",
            padding: "0px",
          }}
        >
          <button
            //onClick={this.handleDecreaseQuantity}
            style={{
              color: "#EA6767",
              border: "none",
              margin: "auto",
              outline: "0 !important",
            }}
          >
            <MinusCircle size={18} />
          </button>
          <p style={{ marginBottom: "0px" }}> {get(cartItem, "Qty", "3")} </p>
          <button
            //onClick={() => this.handleIncreaseQuantity(item)}
            style={{
              color: "#EA6767",
              border: "none",
              margin: "auto",
              outline: "0 !important",
            }}
          >
            <PlusCircle size={18} />
          </button>
        </div>
      </div>
      <div className="col-2">{get(cartItem, "Total", "3500$")}</div>
    </div>
  );
};

const RenderCart = () => {
  return (
    <div className="col-lg-3 col-md-4 order-2 order-md-2">
      <div className="widget-wrapper">
        <div className="widget-default">
          <div className="widget-header">
            <h6 className="widget-title">Cart</h6>
          </div>
          <div className="widget-content">
            <RenderCartItem />
          </div>
        </div>
      </div>
    </div>
  );
};

class ShopProduct extends React.Component {
  static contextType = AppContext;
  foodItems = [];
  filter = [];
  state = {
    product: { data: {}, loading: true },
    userCart: [],
    filteredFoodItems: [],
    filter: { cusines: [], search: "", sort: "" },
    count: 0,
    showPlusMinus: false,
    showClearCartModal: false,
  };

  componentDidMount() {
    // let chef = this.props.match.params["chef"];
    // this.loadVendors(chef);
    // this.loadUserCart();
  }

  render() {
    let prd = get(this.props, "location.state.order", {});
    let userCart = Object.values(get(prd, "Cart", []));
    return (
      <Fragment>
        <MediaQuery minDeviceWidth={1224}>
          <section
            className="OrderDetails breadcrumb_area breadcrumb1"
            style={{ background: "url('" + bannerImg + "')" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <img
                    src={prd.ChefImage ? prd.ChefImage : "/assets/img/chef.png"}
                    className="img-responsive"
                    alt="PP"
                    style={{
                      width: "170px",
                      height: "170px",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-6 text-center">
                      <h3 className="text-white">{prd.ChefName}</h3>
                      <h6 className="text-white">{prd.Address}</h6>

                      <span>
                        {/* {this.renderCuisines(prd)} */}
                        <br />
                        {/* {prd.Address} */}
                        <br />
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    {/* <div
                                            className="col-md-3 text-center"
                                            style={{ borderRight: "1px solid grey" }}
                                        >
                                            <h6 className="text-white">
                                                Flat
                                                <br /> {prd.Flat}
                                            </h6>
                                        </div> */}

                    <div
                      className="col-md-3 text-center"
                      style={{ borderRight: "1px solid grey" }}
                    >
                      <h6 className="text-white">
                        Total <br /> ₹{prd.Total}
                      </h6>
                    </div>
                    <div
                      className="col-md-3 text-center"
                      style={{ borderRight: "1px solid grey" }}
                    >
                      <h6 className="text-white">
                        Payment
                        <br /> {prd.Payment}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <section
            className="breadcrumb_area breadcrumb1"
            style={{ background: "#FFF7F7" }}
          >
            <div className="DetailsContainer">
              <div className="DetailsContainerRow">
                <div className="DetailsContainerRowImage">
                  <img
                    src={prd.PP ? prd.PP : "/assets/img/chef.png"}
                    className="img-responsive"
                    alt="mothersfood"
                  />
                </div>

                <div className="DetailsContainerRowMain">
                  <h3>{prd.Name}</h3>
                  <span>{/* {this.renderCuisines(prd)} */}</span>
                  <span className="intersection">{prd.Address}</span>
                </div>
              </div>
            </div>
          </section>
        </MediaQuery>

        <section className="products-wrapper p-top-60 p-bottom-110">
          <div className="container">
            <div className="row">
              {/* <div className="col-lg-3 col-md-4 order-0 order-md-0">
                <div className="sidebar">
                  <div className="d-none d-lg-block">
                    <div className="widget-wrapper">
                      <div className="search-widget">
                        <form action="#">
                          <div className="input-group">
                            <input
                              type="text"
                              className="fc--rounded"
                              placeholder="Search" onChange={this.searchText}
                            />
                            <button type="submit">
                              <i className="la la-search"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="widget-wrapper">
                    <div className="widget-default">
                      <div className="widget-header">
                        <h6 className="widget-title">Cuisines</h6>
                      </div>
                      <div className="widget-content">
                        <div className="category-widget">
                          <ul>
                            {cusines.map(item => {
                              return (
                                <li className="arrow-list4">
                                  <NavLink
                                    to="#"
                                    onClick={e => {
                                      return this.filterCategory(item, e);
                                    }}
                                  >
                                    {item.Name}
                                  </NavLink>
                                </li>
                              );
                            })}


                          </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> */}

              <div className="col-lg-8 col-md-6 order-1 order-md-1 OrderDetailsFoodItems">
                <h1> Order Items</h1>

                <div className="OrderDetailsFoodGrid">
                  {userCart.map((item, index) => {
                    console.log(userCart);
                    return (
                      <div className="OrderDetailsFoodItem">
                        <div>
                          <img
                            src={item.Image}
                            alt="food"
                            style={{
                              maxHeight: "100%",
                              height: "85px",
                              width: "auto",
                              borderRadius: "15%",
                              position: "relative",
                              padding: "10%",
                            }}
                          />
                        </div>
                        <div className="OrderDetailsFoodDetails">
                          <span className="FoodItemName">{item.Name}</span>
                          <span className="FoodItemDetails">
                            {item.Details}
                          </span>
                          <span className="FoodItemPrice">
                            Rs. {item.Price}
                          </span>
                        </div>
                        <div className="OrderDetailsFoodRight">
                          <div className="OrderDetailsFoodRightImage">
                            <img
                              src={
                                item.Type === "Veg"
                                  ? "../assets/img/veg.png"
                                  : "../assets/img/nonveg.png"
                              }
                              alt="mothersfood"
                            />
                          </div>
                          <div>
                            {
                              //   item.quantity > 0 ?
                              //     <div className="OrderDetailsAddButton">
                              //       <button
                              //         onClick={() => this.handleDecreaseQuantity(item)}
                              //       >
                              //         -
                              //         </button>
                              //       <p style={{ marginBottom: '0px' }}> {item.quantity} </p>
                              //       <button
                              //         onClick={() => this.handleIncreaseQuantity(item)}
                              //       >
                              //         </button>
                              //     </div>
                              //     :
                              //     <button
                              //       className="OrderDetailsAddButton"
                              //       onClick={() => this.handleAddToCart(item)}
                              //     >
                              //       ADD
                              //     </button>
                            }
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <br />
                  <br />

                  {/* <StepProgressBar
                                        startingStep={0}
                                        // onSubmit={}
                                        steps={[
                                            {
                                            label: 'Step 1',
                                            subtitle: '10%',
                                            name: 'step 1',
                                            content: step1Content
                                            },
                                            {
                                            label: 'Step 2',
                                            subtitle: '50%',
                                            name: 'step 2',
                                            content: step2Content,
                                            // validator: step2Validator
                                            },
                                            {
                                            label: 'Step 3',
                                            subtitle: '100%',
                                            name: 'step 3',
                                            content: step3Content,
                                            // validator: step3Validator
                                            }
                                        ]}
                                        />; */}

                  {prd.Status === "1" ? (
                    <div class="steps">
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Order Confirmed</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
                                           <button class="next-btn">Next</button>
                                         </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">Order Approved</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
      <button class="next-btn">Next</button>
    </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">Waiting For Pickup</div>
                          {/* <div class="subheader">The content is a little bigger!</div> */}
                        </div>
                        {/* <div class="step-content two">
                                           <button class="next-btn">Next</button>
                                         </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">PickedUp</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
                                           <button className="close-btn">Close</button>
                                         </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">Delivered</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
                                           <button className="close-btn">Close</button>
                                         </div> */}
                      </div>
                    </div>
                  ) : null}

                  {prd.Status === "2" ? (
                    <div class="steps">
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Order Confirmed</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
                                           <button class="next-btn">Next</button>
                                         </div> */}
                      </div>
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Order Approved</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
      <button class="next-btn">Next</button>
    </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">Waiting For Pickup</div>
                          {/* <div class="subheader">The content is a little bigger!</div> */}
                        </div>
                        {/* <div class="step-content two">
                                           <button class="next-btn">Next</button>
                                         </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">PickedUp</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
                                           <button className="close-btn">Close</button>
                                         </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">Delivered</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
                                           <button className="close-btn">Close</button>
                                         </div> */}
                      </div>
                    </div>
                  ) : null}

                  {prd.Status === "3" ? (
                    <div class="steps">
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Order Confirmed</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
                                           <button class="next-btn">Next</button>
                                         </div> */}
                      </div>
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Order Approved</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
      <button class="next-btn">Next</button>
    </div> */}
                      </div>
                      <div className="step minimized ">
                        <div className="step-header">
                          <div className="header">Waiting For Pickup</div>
                          {/* <div class="subheader">The content is a little bigger!</div> */}
                        </div>
                        {/* <div class="step-content two">
                                           <button class="next-btn">Next</button>
                                         </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">PickedUp</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
                                           <button className="close-btn">Close</button>
                                         </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">Delivered</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
                                           <button className="close-btn">Close</button>
                                         </div> */}
                      </div>
                    </div>
                  ) : null}

                  {prd.Status === "4" ? (
                    <div class="steps">
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Order Confirmed</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
                                           <button class="next-btn">Next</button>
                                         </div> */}
                      </div>
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Order Approved</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
      <button class="next-btn">Next</button>
    </div> */}
                      </div>
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Waiting For Pickup</div>
                          {/* <div class="subheader">The content is a little bigger!</div> */}
                        </div>
                        {/* <div class="step-content two">
                                           <button class="next-btn">Next</button>
                                         </div> */}
                      </div>
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">PickedUp</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
                                           <button className="close-btn">Close</button>
                                         </div> */}
                      </div>
                      <div className="step ">
                        <div className="step-header">
                          <div className="header">Delivered</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
                                           <button className="close-btn">Close</button>
                                         </div> */}
                      </div>
                    </div>
                  ) : null}

                  {/* {
                                       prd.Status === "5" ?
                                       <ProgressBar
                                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                        percent={100}
                                        >
                                        <Step transition="scale">
                                            {({ accomplished, index }) => (
                                            <div
                                                className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                            >
                                                 1<br/><br/>
                                            </div>
                                            )}
                                        </Step>
                                        <Step transition="scale">
                                            {({ accomplished, index }) => (
                                            <div
                                                className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                            >
                                                 2<br/><br/>
                                            Waiting for pickup
                                            </div>
                                            )}
                                        </Step>
                                        <Step transition="scale">
                                            {({ accomplished, index }) => (
                                            <div
                                                className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                            >
                                                 3<br/><br/>
                                            </div>
                                            )}
                                        </Step>
                                        <Step transition="scale">
                                            {({ accomplished, index }) => (
                                            <div
                                                className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                            >
                                                 4<br/><br/>
                                            </div>
                                            )}
                                        </Step>
                                        <Step transition="scale">
                                            {({ accomplished, index }) => (
                                            <div
                                                className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                            >
                                                 5<br/><br/>
                                            </div>
                                            )}
                                        </Step>
                                    </ProgressBar>
                                    : null
                                   } */}
                  {prd.Status === "5" ? (
                    <div class="steps">
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Order Confirmed</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
      <button class="next-btn">Next</button>
    </div> */}
                      </div>
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Order Approved</div>
                          {/* <div class="subheader">Hopefully this looks cool</div> */}
                        </div>
                        {/* <div class="step-content one">
      <button class="next-btn">Next</button>
    </div> */}
                      </div>
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Waiting For Pickup</div>
                          {/* <div class="subheader">The content is a little bigger!</div> */}
                        </div>
                        {/* <div class="step-content two">
      <button class="next-btn">Next</button>
    </div> */}
                      </div>
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">PickedUp</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
      <button className="close-btn">Close</button>
    </div> */}
                      </div>
                      <div className="step minimized">
                        <div className="step-header">
                          <div className="header">Delivered</div>
                          {/* <div class="subheader">Last but not the least!</div> */}
                        </div>

                        {/* <div className="step-content three">
      <button className="close-btn">Close</button>
    </div> */}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <br />
              <div className="col-lg-4 col-md-4 order-2 order-md-2 OrderDetailsCart cart-page">
                <div className="theme-box-shadow product-grid cart-detail-block">
                  <div className="">
                    <h3 className="text-left">Order Details</h3>
                  </div>
                  <div className="OrderDetailsCartMain">
                    <div className="row" style={{ paddingTop: "5%" }}>
                      <div className="col-md-12">
                        <div class="card">
                          <div
                            class="card-body"
                            style={{ background: "#FBFBFC" }}
                          >
                            <div className="row" style={{ marginTop: "15px" }}>
                              <div className="col-md-8 text-left">
                                SubTotal:
                              </div>
                              <div
                                className="col-md-4 text-right"
                                style={{ margin: "auto" }}
                              >
                                ₹{" "}
                                {prd.Subtotal
                                  ? parseFloat(prd.Subtotal).toFixed(2)
                                  : ""}
                              </div>
                            </div>
                            <div className="row" style={{ marginTop: "15px" }}>
                              <div className="col-md-8 text-left">
                                Delivery Charges:
                              </div>
                              <div
                                className="col-md-4 text-right"
                                style={{ margin: "auto" }}
                              >
                                ₹ {parseFloat(prd.DeliveryCharges).toFixed(2)}
                              </div>
                            </div>
                            <div className="row" style={{ marginTop: "15px" }}>
                              <div className="col-md-8 text-left">
                                Packing Charges:
                              </div>
                              <div
                                className="col-md-4 text-right"
                                style={{ margin: "auto" }}
                              >
                                ₹ {parseFloat(prd.Packing).toFixed(2)}
                              </div>
                            </div>
                            <div className="row" style={{ marginTop: "15px" }}>
                              <div className="col-md-8 text-left">
                                Taxes & charges:
                              </div>
                              <div
                                className="col-md-4 text-right"
                                style={{ margin: "auto" }}
                              >
                                ₹ {parseFloat(prd.Taxes).toFixed(2)}
                              </div>
                            </div>
                            <div className="row" style={{ marginTop: "15px" }}>
                              <div className="col-md-8 text-left">
                                Total Bill:
                                <br />
                                Taxes &amp; Charges Included
                              </div>
                              <div
                                className="col-md-4 text-right"
                                style={{ margin: "auto" }}
                              >
                                ₹{" "}
                                {prd.Total
                                  ? parseFloat(prd.Subtotal).toFixed(2)
                                  : 0.0}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* {get(userCart, 'length', 0) > 0 ?
                    userCart.map((cartItem, index) => {
                      return (
                        <div className="OrderDetailsCartItem" key={index}>
                          <div className="CartItemLeft">
                            {cartItem.Type === "Veg" ? (
                              <img
                                src="../assets/img/veg.png"

                                alt="Veg"
                              />
                            ) : (
                                <img
                                  src="../assets/img/nonveg.png"

                                  alt="veg"
                                />
                              )}
                            <span className="CartItemName">{get(cartItem, 'Name', 'Product Name')}</span>
                          </div>
                          <div className="CartControls" >
                            <button
                              onClick={() => this.handleDecreaseQuantity(cartItem)}
                              style={{ color: 'grey' }}
                            >

                              -
                                </button>
                            <span style={{ marginBottom: '0px' }}> {get(cartItem, 'Qty', '3')} </span>
                            <button
                              onClick={() => this.handleIncreasecartItemQuantity(cartItem)}
                            >
                                </button>
                          </div>
                          <div className="CartItemPrice">Rs {get(cartItem, 'Total', '3500$')}</div>


                        </div>

                      )
                    })

                    : 'Cart Empty'

                  }
                  <Link
                    to={{
                      pathname: "/cart",
                      //state: { cartItem: cartItem },
                    }}
                    className="ChefCardProfileButton"
                    style={{width: '100%', marginTop: '120px'}}
                  >
                    Proceed To Cart
                  </Link> */}
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

const mapDispatchToProps = (dispatch) => ({
  setCart: (cartItem) => dispatch(Cart(cartItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopProduct);
