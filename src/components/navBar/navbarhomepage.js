/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  Badge,
} from "react-bootstrap";
import DropDownTitle from "../common/DropDownTitle";
import CartDropdownHeader from "../cart/CartDropdownHeader";
import CartDropdownItem from "../cart/CartDropdownItem";
import Icofont from "react-icofont";

class Navbarhomepage extends React.Component {
  setIsNavExpanded = (isNavExpanded) => {
    this.setState({ isNavExpanded: isNavExpanded });
  };
  render() {
    return (
      // {isLoggedin === "true" ? (
      <div ref={(node) => (this.node = node)}>
        <Navbar expand="lg" className="">
          <Container
            style={{
              marginTop: "-6%",
              marginBottom: "-2%",
              backgroundColor: "transparent",
            }}
          >
            <Navbar.Brand to="/">
              <Image
                style={{
                  width: "100px",
                  marginTop: "10px",
                  marginBottom: "-10%",
                  marginLeft: "100%",
                }}
                src="/img/logo.png"
                alt="MF"
              />
            </Navbar.Brand>
            {/* <Navbar.Toggle /> */}
            {/* <Navbar.Collapse id="navbarNavDropdown">
               <Nav activeKey={0} className="ml-auto">
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/blogs"
                >
                  <Icofont icon="blogger" />
                  Blogs <span className="sr-only">(current)</span>
                </Nav.Link> 
              </Nav>
            </Navbar.Collapse> */}
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Navbarhomepage;
