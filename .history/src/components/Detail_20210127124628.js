/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Tab,
  Nav,
  Image,
  Badge,
  Modal,
} from "react-bootstrap";
// import ItemsCarousel from './common/ItemsCarousel';
import GalleryCarousel from "./common/GalleryCarousel";
import CheckoutItem from "./common/CheckoutItem";
import NavBarListing from "./navBar/navbarListing";
import NavBarlisting2 from "./navBar/Navbarlisting2";
// import BestSeller from './common/BestSeller';
import QuickBite from "./common/QuickBite";
import StarRating from "./common/StarRating";
import RatingBar from "./common/RatingBar";
import Review from "./common/Review";
import Icofont from "react-icofont";
import { AppContext } from "./home/context/app.provider";
import firebase from "./Firebase";
import { get } from "lodash";
import { connect } from "react-redux";
import { Cart } from "./Store/action/cartActions";
import {} from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import "bootstrap/dist/css/bootstrap.css";

class Detail extends React.Component {
  static contextType = AppContext;
  foodItems = [];
  filter = [];

  componentDidMount() {
    let userName = localStorage.getItem("UserName");
    let chef = this.props.match.params["chef"];
    this.loadVendors(chef);
    //   this.loadUserCart();
    if (userName !== null) {
      firebase
        .database()
        .ref()
        .child("Users")
        .child(userName)
        .child("Cart")
        .on(
          "value",
          (snapshot) => {
            if (snapshot.exists()) {
              let content = [];
              let num = 0;
              snapshot.forEach((snap) => {
                if (snap.exists()) {
                  num = num + +parseFloat(snap.val().Total);
                  content.push(num);
                }
              });
              console.log(content)
              this.setState({ num: content });
            }
          },
          () => {}
        );
    }
  }
  // Start Template State
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddressModal: false,
      users: [
        {
          name: "Osahan Singh",
          image: "/img/user/5.png",
          url: "#",
        },
        {
          name: "Gurdeep Osahan",
          image: "/img/user/2.png",
          url: "#",
        },
        {
          name: "Askbootstrap",
          image: "/img/user/3.png",
          url: "#",
        },
        {
          name: "Osahan Singh",
          image: "/img/user/4.png",
          url: "#",
        },
      ],
      product: { data: {}, loading: true },
      userCart: [],
      filteredFoodItems: [],
      filter: { cusines: [], search: "", sort: "" },
      count: 0,
      showPlusMinus: false,
      showClearCartModal: false,
      show: false,
      num: [],
    };
  }
  //End Template State
  loadUserCart = async () => {
    let userName = localStorage.getItem("UserName");
    const user = await firebase
      .database()
      .ref("Users")
      .orderByChild("UserName")
      .equalTo(userName)
      .once("value");

    if (user.exists()) {
      this.setState({
        userCart: Object.values(get(user.val()[userName], "Cart", [])),
      });
    }
  };

  loadVendors = (chef) => {
    this.loadUserCart();
    // const cityId = this.context.appState.cityinfo.PushId;
    let isLoggedIn = localStorage.getItem("isLogging");

    this.setState({ product: { data: {}, loading: true } });

    // if (!cityId) {
    //   console.log('cityId', cityId)
    //   this.setState({ product: { data: {}, loading: false } });
    //   return false;
    // }

    try {
      firebase
        .database()
        .ref()
        .child("CloudKitchen")
        .child(chef)
        .once(
          "value",
          (snapshot) => {
            if (snapshot.exists()) {
              // console.log('vendor single', snapshot.val());
              // console.log(this.state.userCart)
              this.setState({
                product: { data: snapshot.val(), loading: false },
              });
              let userCart = this.state.userCart;
              // console.log(...this.state.userCart)
              const foodItems = Object.values(
                snapshot.val().FoodItems ? snapshot.val().FoodItems : {}
              );
              // console.log('vendor foodItems', foodItems);
              //const foodItemsWithQuantity = foodItems.map(obj => ({ ...obj, quantity: 0 }));
              const foodItemsWithQuantity = foodItems.map((obj) => {
                if (userCart !== undefined) {
                  var cartItemMatch = userCart.find(
                    (userCartItem) => userCartItem.PushId === obj.PushId
                  );
                }

                if (cartItemMatch)
                  return {
                    ...obj,
                    quantity: cartItemMatch.Qty,
                    showPlusMinus: false,
                  };
                else return { ...obj, quantity: 0, showPlusMinus: false };
              });
              // console.log('foodItemsWithQuantity', uniqWith(eqProps('PushId'), foodItemsWithQuantity));
              if (isLoggedIn) {
                // console.log('filteredFoodItems loggedin')
                this.setState({ filteredFoodItems: foodItemsWithQuantity });
              } else {
                // console.log('filteredFoodItems notloggedin')
                this.setState({ filteredFoodItems: foodItems });
              }
            } else {
              this.setState({ product: { data: {}, loading: false } });
            }
          },
          () => {}
        );
    } catch (e) {
      this.setState({ product: { data: {}, loading: false } });
      console.log(e);
    }
  };

  handleAddToCart = (cartItem) => {
    let chef = this.props.match.params["chef"];
    let storedChef = localStorage.getItem("chefId");
    let isLoggedIn = localStorage.getItem("isLogging");
    // console.log(isLoggedIn)
    if (!isLoggedIn || isLoggedIn === "false") {
      this.setState({ show: true });
      // message.warning('Please Login First To add Food Items To your cart!');
      return;
    }
    if (storedChef) {
      if (chef !== storedChef) {
        // message.warning('you can order from one chef only!');
        this.setState({ showClearCartModal: true });
        return;
      }
    }
    let chef1 = this.props.match.params["chef"];
    let prd = this.state.product.data;
    if (prd !== undefined) {
      localStorage.setItem("chefId", chef1);
      localStorage.setItem("chefLoc", prd.Location);
      localStorage.setItem("chefAddress", prd.Address);
      localStorage.setItem("chefName", prd.Name);
      localStorage.setItem("chefPhoto", prd.PP);
      localStorage.setItem("KitchenName", prd.KitchenName);
      if (prd.Local === "Yes") {
        localStorage.setItem("Local", prd.Local);
      } else {
        localStorage.setItem("Local", "No");
      }
      const { filteredFoodItems } = this.state;
      let foodItemsUpdated = [...filteredFoodItems];
      let foodItemUpdated = foodItemsUpdated.find(
        (foodItem) => foodItem.PushId === cartItem.PushId
      );
      // if (foodItemUpdated.quantity) {
      foodItemUpdated.showPlusMinus = true;
      foodItemUpdated.quantity++;
      // }
      this.props.setCart(foodItemUpdated);
      // this.props.setCart(foodItemUpdated);

      this.setState({ filteredFoodItems: foodItemsUpdated });
    }
  };
  renderCuisines(product) {
    let cuisines = product.Cuisines ? product.Cuisines : {};

    return Object.values(cuisines)
      .map((currentValue) => {
        return currentValue.Name;
      })
      .join(",");
  }

  filterCategory = (item, e) => {
    const activeClass = "active";

    if (!e.target.parentElement.classList.contains(activeClass)) {
      e.target.parentElement.classList.add(activeClass);
      this.filter.push(item.PushId);
    } else {
      e.target.parentElement.classList.remove(activeClass);
      let index = this.filter.indexOf(item.PushId);
      this.filter.splice(index, 1);
    }

    this.setState({ filter: { ...this.state.filter, cusines: this.filter } });
    this.applyFilter();
  };

  searchText = (e) => {
    var text = e.target.value;

    this.setState({ filter: { ...this.state.filter, search: text } });
    this.applyFilter();
  };

  applyFilter = () => {
    setTimeout(() => {
      let filteredCuisines = this.state.filter.cusines;
      let filteredProducts = this.foodItems;
      if (filteredCuisines.length > 0) {
        filteredProducts = this.foodItems.filter((product) => {
          let productCuisines = product.CuisinePushId
            ? product.CuisinePushId
            : "";

          return filteredCuisines.indexOf(productCuisines) >= 0 ? true : false;
        });
      }
      let searchText = this.state.filter.search.trim();
      if (searchText.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          let chefname = product.Name ? product.Name : "";

          return chefname.indexOf(searchText) >= 0;
        });
      }

      this.setState({ filteredFoodItems: filteredProducts });
    }, 2);
  };

  handleIncreaseQuantity = async (cartItem) => {
    let chef = this.props.match.params["chef"];
    let prd = this.state.product.data;
    localStorage.setItem("chefId", chef);
    localStorage.setItem("chefLoc", prd.Location);
    localStorage.setItem("chefAddress", prd.Address);
    localStorage.setItem("chefName", prd.Name);
    localStorage.setItem("chefPhoto", prd.PP);
    localStorage.setItem("KitchenName", prd.KitchenName);
    if (prd.Local === "Yes") {
      localStorage.setItem("Local", prd.Local);
    } else {
      localStorage.setItem("Local", "No");
    }
    const { filteredFoodItems } = this.state;
    let userName = localStorage.getItem("UserName");
    // var user = await firebase.database().ref().child("Users").child(userName) || {};
    const user = await firebase
      .database()
      .ref("Users")
      .child(userName)
      .once("value");

    if (user.Cart) {
    } else {
      let foodItemsUpdated = [...filteredFoodItems];
      let foodItemUpdated = foodItemsUpdated.find(
        (foodItem) => foodItem.PushId === cartItem.PushId
      );
      //if (foodItemUpdated.quantity) {
      foodItemUpdated.quantity++;
      //}
      this.props.setCart(foodItemUpdated);

      this.setState({ filteredFoodItems: foodItemsUpdated });
    }
  };

  handleIncreasecartItemQuantity = async (cartItem) => {
    // console.log('handleIncreasecartItemQuantity', cartItem);
    let chef = this.props.match.params["chef"];
    let prd = this.state.product.data;
    localStorage.setItem("chefId", chef);
    localStorage.setItem("chefLoc", prd.Location);
    localStorage.setItem("chefAddress", prd.Address);
    localStorage.setItem("chefName", prd.Name);
    localStorage.setItem("chefPhoto", prd.PP);
    localStorage.setItem("KitchenName", prd.KitchenName);
    if (prd.Local === "Yes") {
      localStorage.setItem("Local", prd.Local);
    } else {
      localStorage.setItem("Local", "No");
    }
    const { filteredFoodItems } = this.state;
    let userName = localStorage.getItem("UserName");
    const user = await firebase
      .database()
      .ref("Users")
      .orderByChild("UserName")
      .equalTo(userName)
      .once("value");

    if (user.Cart) {
    } else {
      let foodItemsUpdated = [...filteredFoodItems];
      let foodItemUpdated = foodItemsUpdated.find(
        (foodItem) => foodItem.PushId === cartItem.PushId
      );
      if (foodItemUpdated) {
        foodItemUpdated.quantity++;
      }
      this.props.setCart(foodItemUpdated);

      this.setState({ filteredFoodItems: foodItemsUpdated });
    }
  };

  handleDecreaseQuantity = async (cartItem) => {
    const { filteredFoodItems } = this.state;
    let userName = localStorage.getItem("UserName");
    // var user = await firebase.database().ref().child("Users").child(userName) || {};
    const user = await firebase
      .database()
      .ref("Users")
      .orderByChild("UserName")
      .equalTo(userName)
      .once("value");

    if (user.Cart) {
    } else {
      // console.log('filteredFoodItems', filteredFoodItems)
      let foodItemsUpdated = [...filteredFoodItems];
      let foodItemUpdated =
        foodItemsUpdated.find(
          (foodItem) => foodItem.PushId === cartItem.PushId
        ) || {};
      // console.log('foodItemUpdated', foodItemUpdated)
      if (get(foodItemUpdated, "quantity", 0) > 0) {
        foodItemUpdated.quantity--;
      } else {
        //foodItemUpdated.showPlusMinus = false;
      }
      this.props.setCart(foodItemUpdated);

      this.setState({ filteredFoodItems: foodItemsUpdated });
    }
  };

  handleDecreaseCartItemQuantity = async (cartItem) => {
    if (cartItem.Qty > 0) {
      cartItem.Qty--;
    }
    this.props.setCart(cartItem);
  };

  handleOk = async (e) => {
    // console.log(e);
    let userName = localStorage.getItem("UserName");

    try {
      const user = await firebase
        .database()
        .ref("Users")
        .orderByChild("UserName")
        .equalTo(userName)
        .once("value");

      if (user.exists()) {
        //let subTotal = 0;
        localStorage.removeItem("chefId");
        localStorage.removeItem("chefLoc");
        localStorage.removeItem("chefAddress");
        localStorage.removeItem("chefName");
        localStorage.removeItem("chefPhoto");
        localStorage.removeItem("KitchenName");
        localStorage.removeItem("Local");

        // console.log('USER ADDRESSES', Object.values(get(user.val()[userName], 'Address', [])))
        this.setState({ userCart: [] });

        Object.values(get(user.val()[userName], "Cart", [])).map((cartItem) => {
          // console.log('cartItem Deleted', cartItem.PushId)
          cartItem.Qty = 0;
          this.props.setCart(cartItem);
          //firebaserefUser.child("Cart").child(cartItem.PushId).remove().then((res)=> console.log('cart removed successfullt')).caatch((err) => console.log('cart remoed error', err))
        });
        //this.setState({ userAddresses: Object.values(get(user.val()[userName], 'Address', [])) });

        // Object.values(get(user.val()[userName], 'Cart', [])).map((cart) => subTotal += parseInt(get(cart, 'Total', 0)));
        // this.setState({subTotal: subTotal});
        // this.setState({total: subTotal});
      }
      this.setState({
        showClearCartModal: false,
      });
    } catch (e) {
      this.setState({ userCart: [] });
      this.setState({
        showClearCartModal: false,
      });
    }
  };

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      showClearCartModal: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filteredFoodItems !== this.state.filteredFoodItems) {
      this.loadUserCart();
    }
  }

  onShowImage = () => {
    let image = localStorage.getItem("chefPhoto");
    let kitchenName = localStorage.getItem("KitchenName");
    let localFood = localStorage.getItem("Local");
    let chefName = localStorage.getItem("chefName");
    // console.log(image)
    if (localFood === "Yes") {
      return (
        <div className="row">
          <div className="col-3 text-left">
            <img src={String(image)} style={{ width: "50px" }} alt="img" />
          </div>
          <div className="col-9 " style={{ marginTop: "4%" }}>
            <h6 className="text-left">{kitchenName}</h6>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-3 text-left">
            <img src={String(image)} style={{ width: "50px" }} alt="img" />
          </div>
          <div className="col-9 " style={{ marginTop: "4%" }}>
            <h6 className="text-left">{chefName}</h6>
          </div>
        </div>
      );
    }
  };

  //Template Code
  hideAddressModal = () => this.setState({ showAddressModal: false });
  getQty = ({ id, quantity }) => {
    //console.log(id);
    //console.log(quantity);
  };
  getStarValue = ({ value }) => {
    // console.log(value);
    //console.log(quantity);
  };

  //End Template code

  render() {
    var isLoggedin = localStorage.getItem("isLogging");
    if (this.state.product.loading) {
      return <>Loading...</>;
    }
    //   if (!this.state.product.data.UserId) {
    //     return <Redirect to="/"></Redirect>;
    //   }

    let prd = this.state.product.data;
    let cusines = Object.values(prd.Cuisines ? prd.Cuisines : {});
    let foodItems = this.state.filteredFoodItems;
    const { showPlusMinus, userCart, showClearCartModal } = this.state;

    var today = new Date();
    var currenttime = today.getHours() + ":" + today.getMinutes();
    var inActiveFoodItems = [];
    var cuisinesitems = [];
    if (prd.Cuisines) {
      Object.keys(prd.Cuisines).forEach(function (key, index) {
        if (index < 3) {
          cuisinesitems.push(
            <>
              &nbsp;{index > 0 ? "•" : ""}&nbsp;
              {prd.Cuisines[key].Name}
            </>
          );
        }
      });
    }
    return (
      <>
        {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}

        {this.state.show ? (
          <SweetAlert
            title="Warning!"
            warning
            confirmBtnBsStyle="success"
            onConfirm={() => this.setState({ show: false })}
          >
            Please Login First To add Food Items To your cart!
          </SweetAlert>
        ) : null}
        {/* <Modal
          title="Clear Your Cart"
          visible={showClearCartModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <h3>Delete your Cart items </h3>
              </div>
            </div>
          </div>
        </Modal> */}
        <Modal
          show={showClearCartModal}
          onHide={this.handleCancel}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Clear Your Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  <h3>Delete your Cart items </h3>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCancel}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleOk}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <section className="restaurant-detailed-banner">
          <div className="text-center">
            <Image
              fluid
              className="cover"
              src="/img/mall-dedicated-banner.png"
            />
          </div>
          <div className="restaurant-detailed-header">
            <Container>
              <Row className="d-flex align-items-end">
                <Col md={8}>
                  <div className="restaurant-detailed-header-left">
                    {prd.PP ===
                      "https://firebasestorage.googleapis.com/v0/b/mothersfood-a1de8.appspot.com/o/CloudKitchen%2F1599912088639-add.png?alt=media&token=60561b4b-af5d-489c-bbc8-28e8de47851f" ||
                    prd.PP === "" ? (
                      <Image
                        fluid
                        className="mr-3 float-left"
                        alt="osahan"
                        src="/assets/img/chef.png"
                        style={{ marginTop: "-2%" }}
                      />
                    ) : (
                      <Image
                        fluid
                        className="mr-3 float-left"
                        alt="osahan"
                        style={{
                          width: "170px",
                          height: "170px",
                          borderRadius: "50%",
                          marginTop: "-5%",
                        }}
                        src={prd.PP}
                      />
                    )}
                    <h2 className="text-white" style={{ textAlign: "justify" }}>
                      {prd.Name}
                    </h2>
                    <h6
                      className="text-white mb-1"
                      style={{ textAlign: "justify" }}
                    >
                      <Icofont icon="icofont-home" /> {prd.KitchenName}
                      <Badge variant="success">OPEN</Badge>
                    </h6>

                    <p
                      className="text-white mb-0"
                      style={{ textAlign: "justify" }}
                    >
                      <Icofont icon="food-cart" /> {cuisinesitems}
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="restaurant-detailed-header-right text-right">
                    <Button variant="success" type="button">
                      <Icofont icon="clock-time" />{" "}
                      {prd.DeliveryTime !== undefined
                        ? prd.DeliveryTime + " Mins"
                        : "40 Mins"}
                    </Button>
                    <h6 className="text-white mb-0 restaurant-detailed-ratings">
                      <span className="generator-bg rounded text-white">
                        <Icofont icon="star" /> {prd.Ratings}
                      </span>{" "}
                      Cost for two ₹{prd.CostTwo ? prd.CostTwo : 250}
                      {/* <Icofont icon="speech-comments" className="ml-3" /> 91 reviews */}
                    </h6>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>

        <Tab.Container defaultActiveKey="first">
          <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
            <Container>
              <Row>
                <Col md={12}>
                  <span className="restaurant-detailed-action-btn float-right">
                    <Button
                      variant="light"
                      size="sm"
                      className="border-light-btn mr-1"
                      type="button"
                    >
                      <Icofont icon="heart" className="text-danger" /> Mark as
                      Favourite
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="border-light-btn mr-1"
                      type="button"
                    >
                      <Icofont icon="cauli-flower" className="text-success" />{" "}
                      Pure Veg
                    </Button>
                    <Button variant="outline-danger" size="sm" type="button">
                      <Icofont icon="sale-discount" /> OFFERS
                    </Button>
                  </span>
                  <Nav id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Order Online</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Gallery</Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
											<Nav.Link eventKey="third">Restaurant Info</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="fourth">Book A Table</Nav.Link>
										</Nav.Item> */}
                    <Nav.Item>
                      <Nav.Link eventKey="fifth">Ratings & Reviews</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
            <Container>
              <Row>
                <Col md={8}>
                  <div className="offer-dedicated-body-left">
                    <Tab.Content className="h-100">
                      <Tab.Pane eventKey="first">
                        {/* <h5 className="mb-4">Recommended</h5>
												<Form className="explore-outlets-search mb-4">
													<InputGroup>
														<Form.Control type="text" placeholder="Search for dishes..." />
														<InputGroup.Append>
															<Button type="button" variant="link">
																<Icofont icon="search" />
															</Button>
														</InputGroup.Append>
													</InputGroup>
												</Form> */}
                        {/* <h6 className="mb-3">Most Popular  <Badge variant="success">	<Icofont icon="tags" /> 15% Off All Items </Badge></h6>
		                        	  <ItemsCarousel /> */}

                        {/* <Row>
			                              <h5 className="mb-4 mt-3 col-md-12">Best Sellers</h5>
			                              <Col md={4} sm={6} className="mb-4">
			                                 <BestSeller 
												id={1}
										   		title='World Famous'
												subTitle='North Indian • American • Pure veg'
											  	imageAlt='Product'
											    image='img/list/1.png'
											    imageClass='img-fluid item-img'
												price={250}
												priceUnit='$'
												isNew={true}
												showPromoted={true}
												promotedVariant='dark'
												favIcoIconColor='text-danger'
												rating='3.1 (300+)'
												getValue={this.getQty}
										   	/>
			                              </Col>

			                              <Col md={4} sm={6} className="mb-4">
			                                 <BestSeller 
												id={2}
										   		title='The osahan Restaurant'
												subTitle='North Indian • American • Pure veg'
											  	imageAlt='Product'
											    image='img/list/6.png'
											    imageClass='img-fluid item-img'
												price={250}
												priceUnit='$'
												qty={1}
												showPromoted={true}
												promotedVariant='dark'
												favIcoIconColor='text-danger'
												rating='3.1 (300+)'
												getValue={this.getQty}
										   	/>
			                              </Col>

			                              <Col md={4} sm={6} className="mb-4">
			                                 <BestSeller 
												id={3}
										   		title='Bite Me Sandwiches'
												subTitle='North Indian • American • Pure veg'
											  	imageAlt='Product'
											    image='img/list/3.png'
											    imageClass='img-fluid item-img'
												price={250}
												priceUnit='$'
												showPromoted={true}
												promotedVariant='dark'
												favIcoIconColor='text-danger'
												rating='3.1 (300+)'
												getValue={this.getQty}
										   	/>
			                              </Col>
			                           </Row> */}
                        {/* <Row>
			                              <h5 className="mb-4 mt-3 col-md-12">Quick Bites <small className="h6 text-black-50">3 ITEMS</small></h5>
			                              <Col md={12}>
			                                 <div className="bg-white rounded border shadow-sm mb-4">
				                                <QuickBite 
													id={1}
											   		title='Chicken Tikka Sub'
													price={250}
													priceUnit='$'
													getValue={this.getQty}
											   	/>
				                                <QuickBite 
													id={2}
											   		title='Cheese corn Roll'
													price={600}
													showBadge={true}
													badgeText='BEST SELLER'
													qty={1}
													priceUnit='$'
													getValue={this.getQty}
											   	/>
				                                <QuickBite 
													id={3}
											   		title='Chicken Tikka Sub'
													price={250}
													showBadge={true}
													badgeText='Pure Veg'
													badgeVariant="success"
													qty={2}
													priceUnit='$'
													getValue={this.getQty}
											   	/>
			                                 </div>
			                              </Col>
			                           </Row> */}
                        <Row>
                          <h5 className="mb-4 mt-3 col-md-12">
                            Food Items{" "}
                            <small className="h6 text-black-50">
                              {foodItems.length} &nbsp;Active ITEMS
                            </small>
                          </h5>
                          <Col md={12}>
                            <div className="bg-white rounded border shadow-sm mb-4">
                              {foodItems.map((item, index) => {
                                if (
                                  item.AStatus !== "Active" ||
                                  item.Status !== "Active" ||
                                  Date.parse(currenttime) <
                                    Date.parse(item.SDate) ||
                                  Date.parse(currenttime) >
                                    Date.parse(item.EDate)
                                ) {
                                  inActiveFoodItems.push(item);
                                  return "";
                                }
                                return (
                                  <div key={index}>
                                    <QuickBite
                                      id={1}
                                      itemClass="menu-list"
                                      image={item.Image}
                                      title={item.Name}
                                      detail={item.Details}
                                      price={parseInt(item.Price)}
                                      priceUnit={`₹ `}
                                      onIncClicked={() =>
                                        this.handleDecreaseQuantity(item)
                                      }
                                      onDecClick={() =>
                                        this.handleIncreaseQuantity(item)
                                      }
                                      onAddClick={() =>
                                        this.handleAddToCart(item)
                                      }
                                      quantity={item.quantity===undefined?item.quantity=0:parseInt(item.quantity)}
                                      getValue={this.getQty}
                                      showCart={false}
                                    />
                                    {/* <QuickBite 
													id={2}
													itemClass="menu-list"
											   		title='Cheese corn Roll'
													image="/img/2.jpg"
													price={600}
													showBadge={true}
													badgeText='BEST SELLER'
													qty={1}
													priceUnit='$'
													getValue={this.getQty}
												/>*/}
                                    {/* <QuickBite 
													id={3}
													itemClass="menu-list"
													image="/img/3.jpg"
											   		title='Chicken Tikka Sub'
													price={250}
													showBadge={true}
													badgeText='Pure Veg'
													badgeVariant="success"
													priceUnit='$'
													getValue={this.getQty}
											   	/>  */}
                                  </div>
                                );
                              })}
                              {inActiveFoodItems.map((item, index) => {
                                return (
                                  <div key={index}>
                                    <QuickBite
                                      id={1}
                                      itemClass="menu-list"
                                      image={item.Image}
                                      title={item.Name}
                                      detail={item.Details}
                                      price={parseInt(item.Price)}
                                      priceUnit={`₹ `}
                                      onIncClicked={() =>
                                        this.handleDecreaseQuantity(item)
                                      }
                                      onDecClick={() =>
                                        this.handleIncreaseQuantity(item)
                                      }
                                      onAddClick={() =>
                                        this.handleAddToCart(item)
                                      }
                                      quantity={item.quantity}
                                      getValue={this.getQty}
                                      showCart={true}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </Col>
                        </Row>

                        {/* <Row>
													<h5 className="mb-4 mt-3 col-md-12">Soups <small className="h6 text-black-50">8 ITEMS</small></h5>
													<Col md={12}>
														<div className="bg-white rounded border shadow-sm">
															<QuickBite
																id={1}
																title='Chicken Tikka Sub'
																price={250}
																priceUnit='$'
																getValue={this.getQty}
															/>
															<QuickBite
																id={2}
																title='Cheese corn Roll'
																price={600}
																showBadge={true}
																badgeText='BEST SELLER'
																qty={1}
																priceUnit='$'
																getValue={this.getQty}
															/>
															<QuickBite
																id={3}
																title='Chicken Tikka Sub'
																price={250}
																showBadge={true}
																badgeText='Pure Veg'
																badgeVariant="success"
																priceUnit='$'
																getValue={this.getQty}
															/>
															<QuickBite
																id={1}
																title='Chicken Tikka Sub'
																price={250}
																priceUnit='$'
																getValue={this.getQty}
															/>
															<QuickBite
																id={2}
																title='Cheese corn Roll'
																price={600}
																showBadge={true}
																badgeText='BEST SELLER'
																priceUnit='$'
																getValue={this.getQty}
															/>
															<QuickBite
																id={3}
																title='Chicken Tikka Sub'
																price={250}
																showBadge={true}
																badgeText='Pure Veg'
																badgeVariant="success"
																priceUnit='$'
																getValue={this.getQty}
															/>
														</div>
													</Col>
												</Row> */}
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="position-relative">
                          <GalleryCarousel />
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div
                          id="restaurant-info"
                          className="bg-white rounded shadow-sm p-4 mb-4"
                        >
                          <div className="address-map float-right ml-5">
                            <div className="mapouter">
                              <div className="gmap_canvas">
                                <iframe
                                  title="addressMap"
                                  width="300"
                                  height="170"
                                  id="gmap_canvas"
                                  src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=9&ie=UTF8&iwloc=&output=embed"
                                  frameBorder="0"
                                  scrolling="no"
                                  marginHeight="0"
                                  marginWidth="0"
                                ></iframe>
                              </div>
                            </div>
                          </div>
                          <h5 className="mb-4">Restaurant Info</h5>
                          <p className="mb-3">
                            Jagjit Nagar, Near Railway Crossing,
                            <br /> Near Model Town, Ludhiana, PUNJAB
                          </p>
                          <p className="mb-2 text-black">
                            <Icofont icon="phone-circle text-primary mr-2" />{" "}
                            +91 01234-56789, +91 01234-56789
                          </p>
                          <p className="mb-2 text-black">
                            <Icofont icon="email text-primary mr-2" />{" "}
                            iamosahan@gmail.com, osahaneat@gmail.com
                          </p>
                          <p className="mb-2 text-black">
                            <Icofont icon="clock-time text-primary mr-2" />{" "}
                            Today 11am – 5pm, 6pm – 11pm
                            <Badge variant="success" className="ml-1">
                              {" "}
                              OPEN NOW{" "}
                            </Badge>
                          </p>
                          <hr className="clearfix" />
                          <p className="text-black mb-0">
                            You can also check the 3D view by using our menue
                            map clicking here &nbsp;&nbsp;&nbsp;{" "}
                            <Link className="text-info font-weight-bold" to="#">
                              Venue Map
                            </Link>
                          </p>
                          <hr className="clearfix" />
                          <h5 className="mt-4 mb-4">More Info</h5>
                          <p className="mb-3">
                            Dal Makhani, Panneer Butter Masala, Kadhai Paneer,
                            Raita, Veg Thali, Laccha Paratha, Butter Naan
                          </p>
                          <div className="border-btn-main mb-4">
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Breakfast
                            </Link>
                            <Link
                              className="border-btn text-danger mr-2"
                              to="#"
                            >
                              <Icofont icon="close-circled" /> No Alcohol
                              Available
                            </Link>
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Vegetarian Only
                            </Link>
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Indoor Seating
                            </Link>
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Breakfast
                            </Link>
                            <Link
                              className="border-btn text-danger mr-2"
                              to="#"
                            >
                              <Icofont icon="close-circled" /> No Alcohol
                              Available
                            </Link>
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Vegetarian Only
                            </Link>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <div
                          id="book-a-table"
                          className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
                        >
                          <h5 className="mb-4">Book A Table</h5>
                          <Form>
                            <Row>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Full Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Full Name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Email Address</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Email address"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Mobile number</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Mobile number"
                                  />
                                </Form.Group>
                              </Col>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Date And Time</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Date And Time"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Form.Group className="text-right">
                              <Button variant="primary" type="button">
                                {" "}
                                Submit{" "}
                              </Button>
                            </Form.Group>
                          </Form>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifth">
                        <div
                          id="ratings-and-reviews"
                          className="bg-white rounded shadow-sm p-4 mb-4 clearfix restaurant-detailed-star-rating"
                        >
                          <div className="star-rating float-right">
                            <StarRating
                              fontSize={26}
                              star={5}
                              getValue={this.getStarValue}
                            />
                          </div>
                          <h5 className="mb-0 pt-1">Rate this Place</h5>
                        </div>
                        <div className="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
                          <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
                          <div className="graph-star-rating-header">
                            <div className="star-rating">
                              <StarRating
                                fontSize={18}
                                disabled={true}
                                star={5}
                                getValue={this.getStarValue}
                              />
                              <b className="text-black ml-2">334</b>
                            </div>
                            <p className="text-black mb-4 mt-2">
                              Rated 3.5 out of 5
                            </p>
                          </div>
                          <div className="graph-star-rating-body">
                            <RatingBar leftText="5 Star" barValue={56} />
                            <RatingBar leftText="4 Star" barValue={23} />
                            <RatingBar leftText="3 Star" barValue={11} />
                            <RatingBar leftText="2 Star" barValue={6} />
                            <RatingBar leftText="1 Star" barValue={4} />
                          </div>
                          <div className="graph-star-rating-footer text-center mt-3 mb-3">
                            <Button
                              type="button"
                              variant="outline-primary"
                              size="sm"
                            >
                              Rate and Review
                            </Button>
                          </div>
                        </div>
                        <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
                          <Link
                            to="#"
                            className="btn btn-outline-primary btn-sm float-right"
                          >
                            Top Rated
                          </Link>
                          <h5 className="mb-1">All Ratings and Reviews</h5>
                          <Review
                            image="/img/user/1.png"
                            ImageAlt=""
                            ratingStars={5}
                            Name="Singh Osahan"
                            profileLink="#"
                            reviewDate="Tue, 20 Mar 2020"
                            reviewText="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classNameical literature, discovered the undoubtable source. Lorem Ipsum comes from sections"
                            likes="856M"
                            dislikes="158K"
                            otherUsers={this.state.users}
                          />
                          <hr />
                          <Review
                            image="/img/user/6.png"
                            ImageAlt=""
                            ratingStars={5}
                            Name="Gurdeep Osahan"
                            profileLink="#"
                            reviewDate="Tue, 20 Mar 2020"
                            reviewText="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                            likes="88K"
                            dislikes="1K"
                            otherUsers={this.state.users}
                          />
                          <hr />
                          <Link
                            className="text-center w-100 d-block mt-4 font-weight-bold"
                            to="#"
                          >
                            See All Reviews
                          </Link>
                        </div>
                        <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
                          <h5 className="mb-4">Leave Comment</h5>
                          <p className="mb-2">Rate the Place</p>
                          <div className="mb-4">
                            <div className="star-rating">
                              <StarRating
                                fontSize={26}
                                star={5}
                                getValue={this.getStarValue}
                              />
                            </div>
                          </div>
                          <Form>
                            <Form.Group>
                              <Form.Label>Your Comment</Form.Label>
                              <Form.Control as="textarea" />
                            </Form.Group>
                            <Form.Group>
                              <Button variant="primary" size="sm" type="button">
                                {" "}
                                Submit Comment{" "}
                              </Button>
                            </Form.Group>
                          </Form>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Col>
                <Col md={4}>
                  {/* <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
										<Image fluid className="float-left mr-3" src="/img/earn-score-icon.png" />
										<h6 className="pt-0 text-primary mb-1 font-weight-bold">OFFER</h6>
										<p className="mb-0">60% off on orders above $99 | Use coupon <span className="text-danger font-weight-bold">OSAHAN50</span></p>
										<div className="icon-overlap">
											<Icofont icon="sale-discount" />
										</div>
									</div> */}
                  <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                    <h5 className="mb-1 text-white">Your Order</h5>
                    <p className="mb-4 text-white">
                      {userCart.length} &nbsp; Items
                    </p>
                    <div className="bg-white rounded shadow-sm mb-2">
                      {get(userCart, "length", 0) > 0 ? (
                        <>
                          {this.onShowImage()}
                          {userCart.map((cartItem, index) => {
                            let cartType = cartItem.Type;
                            return (
                              <div key={index}>
                                <CheckoutItem
                                  itemName={cartItem.Name}
                                  price={parseInt(
                                    get(cartItem, "Total", "3500$")
                                  )}
                                  priceUnit="₹"
                                  id={1}
                                  // qty={2}
                                  // show={true}
                                  // minValue={0}
                                  // maxValue={7}
                                  // getValue={this.getQty}
                                  cartType={cartType}
                                  onDecrement={() =>
                                    this.handleDecreaseQuantity(cartItem)
                                  }
                                  onIncrement={() =>
                                    this.handleIncreasecartItemQuantity(
                                      cartItem
                                    )
                                  }
                                  quantity={cartItem.Qty}
                                />
                                {/* <CheckoutItem
												itemName="Cheese corn Roll"
												price={260}
												priceUnit="$"
												id={2}
												qty={1}
												show={true}
												minValue={0}
												maxValue={7}
												getValue={this.getQty}
											/>
											<CheckoutItem
												itemName="Mixed Veg"
												price={122}
												priceUnit="$"
												id={3}
												qty={1}
												show={true}
												minValue={0}
												maxValue={7}
												getValue={this.getQty}
											/>
											<CheckoutItem
												itemName="Black Dal Makhani"
												price={652}
												priceUnit="$"
												id={1}
												qty={1}
												show={true}
												minValue={0}
												maxValue={7}
												getValue={this.getQty}
											/>
											<CheckoutItem
												itemName="Mixed Veg"
												price={122}
												priceUnit="$"
												id={4}
												qty={1}
												show={true}
												minValue={0}
												maxValue={7}
												getValue={this.getQty}
											/> */}
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        "Cart Empty"
                      )}
                    </div>
                    <div className="mb-2 bg-white rounded p-2 clearfix">
                      <Image
                        fluid
                        className="float-left"
                        src="/img/wallet-icon.png"
                      />
                      <h6 className="font-weight-bold text-right mb-2">
                        Subtotal :{this.state.num[1]}{" "}
                        <span className="text-danger">{this.state.num[(this.state.num).length-1]}</span>{console.log(this.state.num[(this.state.num).length-1])}
                      </h6>
                      <p className="seven-color mb-1 text-right">
                        Extra charges may apply
                      </p>
                      {/* <p className="text-black mb-0 text-right">You have saved $955 on the bill</p> */}
                    </div>
                    <Link
                      to="/checkout"
                      className="btn btn-success btn-block btn-lg"
                    >
                      Checkout
                      <Icofont icon="long-arrow-right" />
                    </Link>
                    <div className="pt-2"></div>
                    {/* <div className="alert alert-success" role="alert">
											You have saved <strong>$1,884</strong> on the bill
		                  </div> */}
                    <div className="pt-2"></div>
                    {/* <div className="text-center pt-2">
											<Image fluid src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads" />
										</div>
										<div className="text-center pt-2">
											<Image fluid src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads" />
										</div> */}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </Tab.Container>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
