/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
// import $ from 'jquery';
import "jquery-ui/themes/base/core.css";
import "jquery-ui/themes/base/theme.css";
import "jquery-ui/themes/base/slider.css";
import "jquery-ui/ui/core";
import "jquery-ui/ui/widgets/slider";
// import Card from '../container/element/card/shop-product';
import MediaQuery from "react-responsive";
import firebase from "../Firebase";
import bannerImg from "../AbotUs/AboutUs-images/Banner_MyProfile.png";
// import { get } from "lodash";
//import bannerImg from "../abotUs/AboutUs-images/Banner_MyProfile.png";
import "../../style copy.css";
class SratchCard extends React.Component {
  state = {
    product: this.props.product,
    cate: this.props.product,
    count: 0,
    user: [],
    orders: [],
    wallet: "",
    name: "",
    number: "",
    email: "",
    sratchAmount: [],
  };

  async componentDidMount() {
    let userId = localStorage.getItem("UserName");
    firebase
      .database()
      .ref("Users")
      .orderByChild("UserName")
      .equalTo(userId)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          // document.getElementById('#datatable').empty();
          var content = [];
          let sratchCard, userData;
          let amount = [];
          snapshot.forEach((snap) => {
            userData = snap.val();
            // let TransactionName = ""
            snap.child("ScratchCard").forEach(function (data1) {
              sratchCard = data1.val();
              content.push(sratchCard);
              if (sratchCard.Claimed === "Yes")
                amount.push(parseInt(sratchCard.Amount));
            });
          });
          content.reverse();
          this.setState({
            user: content,
            wallet: userData.WalletInsta,
            name: userData.Name,
            number: userData.Number,
            email: userData.Email,
            sratchAmount: amount,
          });
        }
      });
  }

  render() {
    // const range = e => {
    //     e.preventDefault();
    //     const value = "100";
    //     const max   = "100";
    //     const min   = "10";
    //     this.setState({
    //         product: Object.values(this.state.cate).filter(item1 => {
    //             return item1.price >= min && item1.price <= max
    //         })
    //     })
    // }

    const { user, name, number, email, sratchAmount } = this.state;
    return (
      <Fragment>
        {/* <div className="about-container">
          <img src={bannerImg} alt="img" width="100%"></img>
          {/* <div className="banner_title">Rewards</div> 
        </div> */}
        <section className="MyProfile products-wrapper p-top-40 p-bottom-110">
          <div className="container">
            <div className="row">
              {/* <div className="col-lg-3 col-md-3 order-0 order-md-0">
                <div
                  className="sidebar text-center"
                  style={{
                    background: "#FBFBFC",
                    padding: "5%",
                    height: "100%",
                  }}
                >
                  <img
                    src="../assets/img/logo.png"
                    width="87px"
                    height="87px"
                    className="img-responsive"
                    alt=""
                  ></img>
                  <h5 className="m-2"> {name} </h5>
                  <p className="m-0">{number}</p>
                  <p className="m-0 mb-5">{email}</p>

                  <MediaQuery minDeviceWidth={1224}>
                    <NavLink className="dropdown-item text-left" to="/profile">
                      <span style={{ margin: "auto" }}>
                        <img
                          src="./assets/img/ic_orders.png"
                          width="15px"
                          height="15px"
                          alt=""
                        />{" "}
                      </span>
                      &nbsp; Orders
                    </NavLink>
                    <NavLink className="dropdown-item text-left" to="/Mf-Cash">
                      <span style={{ margin: "auto" }}>
                        <img
                          src="./assets/img/subscribe.png"
                          width="15px"
                          height="15px"
                          alt=""
                        />{" "}
                      </span>
                      &nbsp;MF Cash
                    </NavLink>
                    <NavLink className="dropdown-item text-left" to="/MyCash">
                      <span style={{ margin: "auto" }}>
                        <img
                          src="./assets/img/ic_feedback.png"
                          width="15px"
                          height="15px"
                          alt=""
                        />{" "}
                      </span>
                      &nbsp; My Cash
                    </NavLink>
                    <NavLink
                      className="dropdown-item text-left"
                      style={{ background: "#FFEFED" }}
                      to="/SratchCard"
                    >
                      <span style={{ margin: "auto" }}>
                        <img
                          src="./assets/img/coin.png"
                          width="15px"
                          height="15px"
                          alt=""
                        />{" "}
                      </span>
                      &nbsp; Scratch Card
                    </NavLink>
                    <NavLink className="dropdown-item text-left" to="/">
                      <span style={{ margin: "auto" }}>
                        <img
                          src="./assets/img/ic_logout.png"
                          width="15px"
                          height="15px"
                          alt=""
                        />{" "}
                      </span>
                      &nbsp; Logout{" "}
                    </NavLink>
                  </MediaQuery>
                </div>
                {/*<!-- ends: .sidebar 
              </div> */}
              {/*<!-- ends: .col-lg-3 -->*/}

              <div
                className="col-lg-14 col-md-14 order-1 order-md-1 "
                style={{ marginTop: "-5%" }}
              >
                <div className="sidebar-right">
                  <div
                    className="col-12 text-left pt-2 "
                    style={{ backgroundColor: "red" }}
                  >
                    <div
                      className="card  mt-2 border-0 p-0 full-length"
                      style={{ backgroundColor: "red" }}
                    >
                      <div className="cardbody">
                        <div className="row">
                          <div className="col-4">
                            <h6
                              className="text-left "
                              style={{
                                marginTop: "40%",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "calc(0.6em + 0.8vw)",
                              }}
                            >
                              Total Cashback Won
                            </h6>
                            {console.log(sratchAmount)}
                            <h3
                              className="text-left "
                              style={{
                                fontWeight: 800,
                                color: "white",
                                fontSize: "calc(1em + 1vw)",
                              }}
                            >
                              ₹&nbsp;{" "}
                              {parseFloat(
                                sratchAmount.reduce((a, b) => a + b, 0)
                              ).toFixed(2)}
                            </h3>
                            <p
                              className="text-left "
                              style={{
                                marginTop: "-20px",
                                color: "white",
                                fontSize: "calc(0.3em + 0.8vw)",
                              }}
                            >
                              Last updates 0 Mins ago
                            </p>
                          </div>
                          <div className="col-6">
                            <img src="../assets/img/reward.png" alt=""></img>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="card border-0 "
                        style={{ width: "110%", borderRadius: "20px 20px 0 0" }}
                      >
                        <div className="cardbody">
                          <div className="card m-2 border-0">
                            <div className="cardbody p-2">
                              <div className="row" style={{ marginTop: "4%" }}>
                                {user.map((item, id) => {
                                  return item.Claimed === "No" ? (
                                    <div
                                      className="col-6"
                                      style={{ marginTop: "2%" }}
                                    >
                                      {" "}
                                      <img
                                        src="../assets/img/scratchcard_1.png"
                                        alt="img"
                                        style={{ float: "left" }}
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className="col-6"
                                      style={{
                                        position: "relative",
                                        textAlign: "center",
                                      }}
                                    >
                                      <img
                                        src="../assets/img/scratchcard_2@2x.png"
                                        alt="img"
                                      />
                                      <h5
                                        className="text-center"
                                        style={{
                                          position: "absolute",
                                          top: "50%",
                                          left: "50%",
                                          transform: "translate(-50%, -50%)",
                                          fontSize: "calc(0.8em + 0.8vw)",
                                        }}
                                      >
                                        You Won <br />₹{item.Amount}
                                      </h5>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*  
                                            <div className="product-grid" >
                                                {
                                                    user && user.length && user.map((order, index) => {
                                                        return(
                                                            <div key={index} >
                                                                <div className="row past-orders-grid" style={{marginTop:"5%",background:"#FBFBFC"}}>
                                                                    <div className="col-md-12">
                                                                        <div className="row" style={{padding:"2%"}}>
                                                                            <div class="OrderDetailsFoodItem no-box"> */}
                    {/* <div class="OrderDetailsFoodRightImage mt-1 mr-4">
                                                                                    <img src={order.ChefImage} />
                                                                                </div> */}
                    {/* <div class="OrderDetailsFoodDetails full-width" style={{float: "left"}}> */}
                    {/* <div className="row full-width border-bottom pb-3"> */}
                    {/* <span class="FoodItemName full-width">
                                                                                            <span className="pull-left text-left " style={{color:"black"}}>{order.TransactionName} discount for </span>
                                                                                            {order.TransactionType==="Cr"?
                                                                                            <span className="pull-right text-right" style={{color:"green"}}>₹{parseFloat(order.Amount).toFixed(2)}</span>:
                                                                                            <span className="pull-right text-right" style={{color:"red"}}>₹{parseFloat(order.Amount).toFixed(2)}</span>

                                                                                            }
                                                                                            </span>
                                                                                            <span class="FoodItemName full-width">
                                                                                            <span className="pull-left text-left" style={{color:"black"}}> Order Id &nbsp; : &nbsp;{order.TransactionId} </span>
                                                                                            <span className="pull-right text-right" style={{color:"black"}}> {get(order, 'Date', '')} </span>
                                                                                        </span> */}
                    {/* <span class="FoodItemDetails full-width text-left">Chicken , basumati rice, curds, oil(sunflower), ghee, spices .</span>
                                                                                        <span class="FoodItemPrice full-width text-left">₹{get(order, 'Total', '')}</span> */}
                    {/* </div>     */}
                    {/* <div className="row full-width mt-3">
                                                                                        <div className="col-lg-4 col-md-4 text-left p-0">
                                                                                            <span class="FoodItemPrice"><b>Total Paid:</b> ₹{get(order, 'Total', '')}</span>
                                                                                        </div>
                                                                                        <div className="col-lg-8 col-md-4 p-0">
                                                                                            <Link
                                                                                                to={{
                                                                                                pathname: "/detailsOrder",
                                                                                                state: { order: order },
                                                                                                }}
                                                                                                className="OrderDetailsAddButton pull-right mr-2" 
                                                                                            >
                                                                                                <i className="fa fa-info mr-1"></i> Details
                                                                                            </Link>
                                                                                            <button class="OrderDetailsAddButton pull-right mr-2"><i className="fa fa-headphones mr-1"></i>Help</button>
                                                                                        </div>
                                                                                    </div> */}
                    {/* </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> */}

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
                    {/* </div>
                                                        )
                                                    })
                                                } */}

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

                    {/* </div> */}
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
export default connect(mapStateToProps)(SratchCard);
