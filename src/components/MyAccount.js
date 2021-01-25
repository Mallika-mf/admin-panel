import React from "react";
import { Switch, Route } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { Row, Col, Container, Image } from "react-bootstrap";
import Offers from "./myaccount/Offers";
import Orders from "./myaccount/Orders";
import Favourites from "./myaccount/Favourites";
import Payments from "./myaccount/Payments";
import Addresses from "./myaccount/Addresses";
import MFCash from "./myaccount/MFCash";
import MyCash from "./myaccount/MyCash";
import SratchCard from "./myaccount/SratchCard";
import EditProfileModal from "./modals/EditProfileModal";
import NavBarListing from "./navBar/navbarListing";
import NavBarlisting2 from "./navBar/Navbarlisting2";
import bannerImg from "./AbotUs/AboutUs-images/Banner_MyProfile.png";

class MyAccount extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showEditProfile: false,
    };
  }
  hideEditProfile = () => this.setState({ showEditProfile: false });

  render() {
    const name = localStorage.getItem("Name");
    const number = localStorage.getItem("phoneNumber");
    const email = localStorage.getItem("Email");
    var isLoggedin = localStorage.getItem("isLogging");
    return (
      <>
        {isLoggedin === "true" ? <NavBarListing /> : <NavBarlisting2 />}
        <EditProfileModal
          show={this.state.showEditProfile}
          onHide={this.hideEditProfile}
        />
        <div className="about-container">
          <img src={bannerImg} alt="img" width="100%"></img>
          {/* <div className="banner_title">MF Cash</div>  */}
        </div>
        <section className="section pt-4 pb-4 osahan-account-page">
          <Container>
            <Row>
              <Col md={3}>
                <div className="osahan-account-page-left shadow-sm bg-white h-100">
                  <div className="border-bottom p-4">
                    <div className="osahan-user text-center">
                      <div className="osahan-user-media">
                        <Image
                          className="mb-3 rounded-pill shadow-sm mt-1"
                          src="img/offer.png"
                          alt="Mothersfood"
                        />
                        <div className="osahan-user-media-body">
                          <h6 className="mb-2">{name}</h6>
                          <p className="mb-1">{number}</p>
                          <p>{email}</p>
                          <p className="mb-0 text-black font-weight-bold">
                            <Link
                              to="#"
                              onClick={() =>
                                this.setState({ showEditProfile: true })
                              }
                              className="text-primary mr-3"
                            >
                              <i className="icofont-ui-edit"></i> EDIT
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="nav flex-column border-0 pt-4 pl-4 pb-4">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/orders"
                      >
                        <i className="icofont-food-cart"></i> Orders
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/offers"
                      >
                        <i className="icofont-sale-discount"></i> Offers
                      </NavLink>
                    </li>
                    {/* <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/favourites"
                      >
                        <i className="icofont-heart"></i> Favourites
                      </NavLink>
                    </li> */}
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/payments"
                      >
                        <i className="icofont-credit-card"></i> Payments
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/addresses"
                      >
                        <i className="icofont-location-pin"></i> Addresses
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/MFCash"
                      >
                        <i className="icofont-money-bag"></i> MFcash
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/MyCash"
                      >
                        <i className="icofont-money"></i> MyCash
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/SratchCard"
                      >
                        <i className="icofont-sale-discount"></i> ScratchCard
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={9}>
                <Switch>
                  <Route path="/myaccount/orders" exact component={Orders} />
                  <Route path="/myaccount/offers" exact component={Offers} />
                  <Route
                    path="/myaccount/favourites"
                    exact
                    component={Favourites}
                  />
                  <Route
                    path="/myaccount/payments"
                    exact
                    component={Payments}
                  />
                  <Route
                    path="/myaccount/addresses"
                    exact
                    component={Addresses}
                  />
                  <Route path="/myaccount/MFCash" exact component={MFCash} />
                  <Route path="/myaccount/MyCash" exact component={MyCash} />
                  <Route
                    path="/myaccount/SratchCard"
                    exact
                    component={SratchCard}
                  />
                </Switch>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default MyAccount;
