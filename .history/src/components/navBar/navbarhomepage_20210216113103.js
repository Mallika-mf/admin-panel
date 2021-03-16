/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, Link } from "react-router-dom";
//import "./navbarhome.scss";
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
  constructor(props) {
    super(props);
    this.state = {
      isNavExpanded: false,
    };
  }
  setIsNavExpanded = (isNavExpanded) => {
    this.setState({ isNavExpanded: isNavExpanded });
  };
  closeMenu = () => {
    this.setState({ isNavExpanded: false });
  };

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      // if clicked inside menu do something
    } else {
      // If clicked outside menu, close the navbar.
      this.setState({ isNavExpanded: false });
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  render() {
    return (
      // {isLoggedin === "true" ? (
      <div ref={(node) => (this.node = node)}>
        <Navbar
          fixed="top"
          onToggle={this.setIsNavExpanded}
          expanded={this.state.isNavExpanded}
          color="light"
          expand="lg"
          className="navbar-light osahan-nav shadow-sm"
        >
          <Container
            style={{
              marginTop: "-1%",
              marginBottom: "-1%",
            }}
          >
            <Nav.Link to="/">
              <Image
                style={{
                  width: "125px",
                  marginTop: "-13px",
                  marginBottom: "-10%",
                }}
                src="/img/logo.png"
                alt=""
              />
            </Nav.Link>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav activeKey={0} className="ml-auto" onSelect={this.closeMenu}>
                <Nav.Link
                  className="text-secondary"
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/partnerwithus"
                >
                  <Icofont icon="handshake-deal" size="1" />
                  Partner with us <span className="sr-only">(current)</span>
                </Nav.Link>
                <Nav.Link
                  className="text-secondary"
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/ridewithus"
                >
                  <Icofont icon="motor-biker" size="1" /> Drive with us
                  <span className="sr-only">(current)</span>
                </Nav.Link>
                <Nav.Link
                  className="text-primary"
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/contactus"
                >
                  <Icofont icon="live-support" size="2" />
                  Customer support
                  <span className="sr-only">(current)</span>
                </Nav.Link>
                {/* <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/login"
                >
                  <Icofont icon="login" />
                  Login <span className="sr-only">(current)</span>
                </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Navbarhomepage;
