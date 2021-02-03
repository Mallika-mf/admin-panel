/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
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
import { get } from "lodash";
import bannerImg from "../AbotUs/AboutUs-images/Banner_MyProfile.png";
import "../../style copy.css";

class MyCash extends React.Component {
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
  };

  async componentDidMount() {
    // $(document).ready(() => {
    //     //Range slider light
    //     $("#slider-range1").slider({
    //             range: true,
    //             min: 0,
    //             max: 500,
    //             values: [0, 500],
    //             slide: function (event, ui) {
    //                 $("#amount1").val("₹​" + ui.values[0] + " - ₹​" + ui.values[1]);
    //             }
    //         });

    //     $("#amount1").val("₹​" + $("#slider-range1").slider("values", 0) +
    //             " - ₹​" + $("#slider-range1").slider("values", 1));
    // });

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
          let transactionData, userData;

          snapshot.forEach((snap) => {
            userData = snap.val();
            // let TransactionName = ""
            snap.child("TransactionsInsta").forEach(function (data1) {
              transactionData = data1.val();
              content.push(transactionData);
            });
          });
          content.reverse();
          this.setState({
            user: content,
            wallet: userData.WalletInsta,
            name: userData.Name,
            number: userData.Number,
            email: userData.Email,
          });
        }
      });

    //   const orders = await firebase
    //   .database()
    //   .ref("Orders")
    //   .orderByChild("UserId")
    //   .equalTo(userId)
    //   .once("value");

    //   if (orders.exists()) {
    //       console.log('orders', Object.values(orders.val()));
    //       this.setState({orders: Object.values(orders.val())});
    //   }
  }

  render() {
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
    const { user, wallet, name, number, email } = this.state;
    return (
      <Fragment>
        <section className="MyProfile products-wrapper p-top-60 p-bottom-110">
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
                    <NavLink
                      className="dropdown-item text-left"
                      style={{ background: "#FFEFED" }}
                      to="/MyCash"
                    >
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
                
              </div> */}
              {/*<!-- ends: .col-lg-3 -->*/}

              <div
                className="col-lg-12 col-md-12 order-1 order-md-1"
                style={{ width: "1000px" }}
              >
                <div className="sidebar-right">
                  <div
                    className="col-12 text-left pt-0 pb-3 card"
                    style={{ marginTop: "-7%" }}
                  >
                    <h3
                      className="text-center mt-2"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      MY CASH
                    </h3>
                    <div className="  mt-2 border-0 ">
                      <div className="cardbody">
                        <img src="../assets/img/incentives.png" alt=""></img>
                      </div>
                    </div>

                    {wallet !== undefined ? (
                      <div className="mt-4">
                        <span>
                          <h5>
                            Balance:{" "}
                            <span style={{ color: "green" }}>
                              ₹{parseFloat(wallet).toFixed(2)}
                            </span>
                          </h5>
                        </span>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <span>
                          <h5>
                            Balance:{" "}
                            <span style={{ color: "green" }}>₹0.00</span>
                          </h5>
                        </span>
                      </div>
                    )}

                    <div className="card">
                      <div className="cardbody p-2">
                        <ul className="bullet--list2">
                          <li className="bullet_list">
                            <b>Redeem your MyCash on all orders</b>
                          </li>
                          <li className="bullet_list">
                            <b>MyCash is 100% Redeemable on all Orders </b>
                          </li>
                          <li className="bullet_list">
                            <b>Unlimited Validity from the day you earn it</b>
                          </li>
                          <li className="bullet_list">
                            <b>Cannot be transfered to bank account</b>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="product-grid">
                      {user &&
                        user.length &&
                        user.map((order, index) => {
                          return (
                            <div key={index}>
                              <div
                                className="row past-orders-grid"
                                style={{
                                  marginTop: "5%",
                                  background: "#FBFBFC",
                                }}
                              >
                                <div className="col-md-12">
                                  <div
                                    className="row"
                                    style={{ padding: "2%" }}
                                  >
                                    <div class="OrderDetailsFoodItem no-box">
                                      {/* <div class="OrderDetailsFoodRightImage mt-1 mr-4">
                                                                                    <img src={order.ChefImage} />
                                                                                </div> */}
                                      <div
                                        class="OrderDetailsFoodDetails full-width"
                                        style={{ float: "left" }}
                                      >
                                        {/* <div className="row full-width border-bottom pb-3"> */}
                                        <span class="FoodItemName full-width">
                                          <span
                                            className="pull-left text-left "
                                            style={{ color: "black" }}
                                          >
                                            {order.TransactionName} discount for{" "}
                                          </span>
                                          {order.TransactionType === "Cr" ? (
                                            <span
                                              className="pull-right text-right"
                                              style={{ color: "green" }}
                                            >
                                              ₹
                                              {parseFloat(order.Amount).toFixed(
                                                2
                                              )}
                                            </span>
                                          ) : (
                                            <span
                                              className="pull-right text-right"
                                              style={{ color: "red" }}
                                            >
                                              ₹
                                              {parseFloat(order.Amount).toFixed(
                                                2
                                              )}
                                            </span>
                                          )}
                                        </span>
                                        <span class="FoodItemName full-width">
                                          <span
                                            className="pull-left text-left"
                                            style={{ color: "red" }}
                                          >
                                            {" "}
                                            Order Id &nbsp; : &nbsp;
                                            {order.TransactionId}{" "}
                                          </span>
                                          <span
                                            className="pull-right text-right"
                                            style={{ color: "black" }}
                                          >
                                            {" "}
                                            {get(order, "Date", "")}{" "}
                                          </span>
                                        </span>
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
export default connect(mapStateToProps)(MyCash);
