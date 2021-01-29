/* eslint-disable no-unused-vars */
import React from "react";
import OrderCard from "../common/OrderCard";
import { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import $ from "jquery";
import "jquery-ui/themes/base/core.css";
import "jquery-ui/themes/base/theme.css";
import "jquery-ui/themes/base/slider.css";
import "jquery-ui/ui/core";
import "jquery-ui/ui/widgets/slider";
// import Card from '../container/element/card/shop-product';
// import MediaQuery from 'react-responsive'
import firebase from "../Firebase";
import { get } from "lodash";
import bannerImg from "../AbotUs/AboutUs-images/Banner_MyProfile.png";

class Orders extends React.Component {
  state = {
    product: this.props.product,
    cate: this.props.product,
    count: 0,
    user: {},
    orders: [],
  };

  async componentDidMount() {
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

    let userId = localStorage.getItem("UserName");
    const user = await firebase
      .database()
      .ref("Users")
      .orderByChild("UserName")
      .equalTo(userId)
      .once("value");

    if (user.exists()) {
      console.log("user Profile", user.val()[userId]);
      this.setState({ user: user.val()[userId] });
    }

    const orders = await firebase
      .database()
      .ref("Orders")
      .orderByChild("UserId")
      .equalTo(userId)
      .once("value");

    if (orders.exists()) {
      console.log("orders", Object.values(orders.val()));
      this.setState({ orders: Object.values(orders.val()) });
    }
  }
  render() {
    const range = (e) => {
      e.preventDefault();
      const value = "100";
      const max = "100";
      const min = "10";
      this.setState({
        product: Object.values(this.state.cate).filter((item1) => {
          return item1.price >= min && item1.price <= max;
        }),
      });
    };
    const { user, orders } = this.state;
    return (
      <>
        <div className="col-lg-9 col-md-9 order-1 order-md-1">
          <div className="sidebar-right">
            <div className="col-12 text-left pt-2 pb-3">
              <h3 className="text-left mt-2 center">Past Orders</h3>

              <div className="product-grid">
                {orders &&
                  orders.length &&
                  orders.reverse().map((order, index) => {
                    console.log("orders", order);
                    return (
                      <div>
                        <div
                          className="row past-orders-grid col-md-8"
                          style={{
                            marginTop: "5%",
                            background: "white",
                          }}
                        >
                          <div className="col-md-12">
                            <div className="row" style={{ padding: "2%" }}>
                              <div class="OrderDetailsFoodItem no-box">
                                <div class="OrderDetailsFoodRightImage mt-1 mr-2">
                                  <img src={order.ChefImage} alt="" />
                                </div>
                                <div
                                  class="OrderDetailsFoodDetails full-width"
                                  style={{ float: "left" }}
                                >
                                  <div className="row full-width border-bottom pb-3">
                                    <span class="FoodItemName full-width">
                                      <span className="pull-left text-left ">
                                        {order.ChefName} ( Order Id:
                                        {order.OrderNo} )
                                      </span>
                                      <span className="pull-left text-left">
                                        Delivery on{" "}
                                        {get(order, "OrderDateTime", "")}{" "}
                                        <i className="fa fa-check-circle"></i>
                                      </span>
                                    </span>
                                    {/* <span class="FoodItemDetails full-width text-left">
                                      Chicken , basumati rice, curds,
                                      oil(sunflower), ghee, spices .
                                    </span> */}
                                    <span class="FoodItemPrice full-width text-left">
                                      ₹{get(order, "Total", "")}
                                    </span>
                                  </div>
                                  <div className="row full-width mt-3">
                                    <div className="col-lg-4 col-md-4 text-left p-0">
                                      <span class="FoodItemPrice">
                                        <b>Total Paid:</b> ₹
                                        {get(order, "Total", "")}
                                      </span>
                                    </div>
                                    <div className="col-lg-8 col-md-4 ">
                                      <Link
                                        to={{
                                          pathname: "/detailsOrder",
                                          state: { order: order },
                                        }}
                                        className="OrderDetailsAddButton pull-right mr-3 btn-success"
                                      >
                                        <i className="fa fa-info"></i>
                                        Details
                                      </Link>
                                      <button class="OrderDetailsAddButton pull-right mr-3 btn-danger">
                                        <i className="fa fa-headphones mr-1"></i>
                                        Help
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/*<div className="row past-orders-grid" style={{marginTop:"5%",background:"#FBFBFC"}}>
                                                                <div className="col-md-12" style={{borderBottom:"1px solid #e4e8ed"}}>
                                                                    <div className="row" style={{padding:"4%"}}>
                                                                        <div className="col-lg-2 col-md-2 col-sm-2">
                                                                            {order.ChefName}<br/>
                                                                            Order Id:{order.OrderNo}<br/>
                                                                            <p style={{marginTop:"5%"}}><span  style={{margin:"5%",background:"#EDF5F0",color:"#58B560",padding:"3%",border:"solid 1px #58B560",margin:"auto",borderRadius:"5px"}}> In Progress</span></p>
                                                                        </div>
                                                                        <div className="col-lg-7 col-md-4 col-sm-6 text-center">
                                                                            {get(order, 'OrderDateTime', '')}
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-6 col-sm-6">
                                                                            <p>₹ {get(order, 'Total', '')}<br/>
                                                                                </p>
                                                                        {/* <button className="btn"  style={{background:"#FFFFFF",color:"#E41C39",border:"solid 1px #E41C39",margin:"auto"}} >Details</button> */}
                        {/*<Link
                                                                            to={{
                                                                            pathname: "/detailsOrder",
                                                                            state: { order: order },
                                                                            }}
                                                                            className="ChefCardProfileButton"
                                                                            style={{ marginTop: '60px'}}
                                                                        >
                                                                            Details
                                                                        </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                      </div>
                    );
                  })}

                {/* <div className="row" style={{marginTop:"5%",background:"#FBFBFC"}}>
                                                    <div className="col-md-12" style={{borderBottom:"1px solid #e4e8ed"}}>
                                                        <div className="row" style={{padding:"4%"}}>
                                                            <div className="col-lg-2 col-md-2 col-sm-2">
                                                                Chef Name<br/>
                                                                Order Id:#1234<br/>
                                                                <p style={{marginTop:"5%"}}><span  style={{margin:"5%",background:"#EDF5F0",color:"#58B560",padding:"3%",border:"solid 1px #58B560",margin:"auto",borderRadius:"5px"}}  >Delivered</span></p>
                                                            </div>
                                                            <div className="col-lg-7 col-md-4 col-sm-6 text-center">
                                                                28,April 2020 | 10.50 PM
                                                            </div>
                                                            <div className="col-lg-3 col-md-6 col-sm-6">
                                                                <p>₹ 199.00<br/>
                                                                    10 Items</p>
                                                            <button className="btn"  style={{background:"#FFEFED",color:"#EA6767",border:"solid 1px #EA6767",margin:"auto"}} >Details</button>
                                                        
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="p-4 bg-white shadow-sm">
          <h4 className="font-weight-bold mt-0 mb-4">Past Orders</h4>
          <OrderCard
            image={order.ChefImage}
            imageAlt=""
            orderNumber={order.OrderNo}
            orderDate="Mon, Nov 12, 6:26 PM"
            deliveredDate={get(order, 'OrderDateTime', '')}
            orderTitle={order.ChefName}
            address="730 S Mendenhall Rd, Memphis, TN 38117, USA"
            orderProducts="Veg Masala Roll x 1, Veg Burger x 1, Veg Penne Pasta in Red Sauce x 1"
            orderTotal= ₹{get(order, 'Total', '')}
            helpLink="#"
            detailLink="/detail"
          /> 
           <OrderCard
            image="/img/4.jpg"
            imageAlt=""
            orderNumber="25102589748"
            orderDate="Mon, Nov 12, 6:26 PM"
            deliveredDate="Mon, Nov 12, 7:18 PM"
            orderTitle="Jimmy's Famous American Tavern"
            address="730 S Mendenhall Rd, Memphis, TN 38117, USA"
            orderProducts="Veg Masala Roll x 1, Veg Burger x 1, Veg Penne Pasta in Red Sauce x 1"
            orderTotal="$300"
            helpLink="#"
            detailLink="/detail"
          /> */}
        {/* <OrderCard
            image="/img/5.jpg"
            imageAlt=""
            orderNumber="25102589748"
            orderDate="Mon, Nov 12, 6:26 PM"
            deliveredDate="Mon, Nov 12, 7:18 PM"
            orderTitle="The Famous Restaurant"
            address="730 S Mendenhall Rd, Memphis, TN 38117, USA"
            orderProducts="Veg Masala Roll x 1, Veg Burger x 1, Veg Penne Pasta in Red Sauce x 1"
            orderTotal="$300"
            helpLink="#"
            detailLink="/detail"
          /> */}
      </>
    );
  }
}
export default Orders;
