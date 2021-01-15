import React from "react";
import PropTypes from "prop-types";
import { Link,NavLink } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import FontAwesome from "./FontAwesome";

class Footer extends React.Component {
  render() {
    return (
      <>
        <section className="section pt-5 pb-5 text-center bg-white">
          <Container>
            <Row>
              <Col sm={12}>
                <h5 className="m-0">
                  Operate food store or restaurants?{" "}
                  <Link to="login">Work With Us</Link>
                </h5>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="footer pt-5 pb-5">
          <Container>
            <Row>
              <Col md={4} sm={12}>
                <h6 className="mb-3" style={{ textAlign: "justify" }}>Subscribe to our Newsletter</h6>
                <Form className="newsletter-form mb-1">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      placeholder="Please enter your email"
                    />
                    <InputGroup.Append>
                      <Button type="button" variant="primary">
                        Subscribe
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
                <p style={{ textAlign: "justify" }}>
                  <Link className="text-info" to="register">
                    Register now
                  </Link>{" "}
                  to get updates on <Link to="offers">Offers and Coupons</Link>
                </p>
{/* <<<<<<< HEAD */}
                <div style={{ textAlign: "justify" }} className="app">
                  <p className="mb-2" style={{ textAlign: "justify" }}>DOWNLOAD APP(Customers)</p>
                  <a href = "https://play.google.com/store/apps/details?id=mothers.food.mothersfood" target = "_blank" rel="noopener noreferrer"  className="mr-1">      
                   
                 
                    <Image style={{ textAlign: "justify" }} src="img/google.png" fluid />
                  </a>
                  <a href = "https://apps.apple.com/us/app/mothers-food/id1533947618" target = "_blank" rel="noopener noreferrer"  >      

                    <Image style={{ textAlign: "justify" }} src="img/apple.png" alt="" fluid />
                  </a>
                </div>
                <div style={{ textAlign: "justify" }} className="app">
                  <p style={{ textAlign: "justify" }} className="mb-2 mt-2">DOWNLOAD APP(Venders)</p>
{/* ======= */}
                {/* <div className="app">
                  <p className="mb-2">DOWNLOAD APP(Customers)</p>
                  <Link
                    href="https://play.google.com/store/apps/details?id=mothers.food.mothersfood"
                    className="mr-1"
                  >
                    <Image src="img/google.png" fluid />
                  </Link>
                  <Link to="#">
                    <Image src="img/apple.png" alt="" fluid />
                  </Link>
                </div>
                <div className="app">
                  <p className="mb-2 mt-2">DOWNLOAD APP(Vendors)</p>
{/* >>>>>>> e1f3282275238d424e5f4b2b07c9431b2a2a07bf */}
                  {/* <Link to="#" className="mr-1">
                    <Image src="img/google.png" alt="" fluid />
                  </Link>
                  <Link to="#">
                    <Image src="img/apple.png" alt="" fluid />
                  </Link>
                </div> */} 
                </div>
              </Col>
              <Col md={1} sm={6} className="mobile-none"></Col>
              <Col md={2} sm={4} xs={6}>
                <h6 style={{ textAlign: "justify" }} className="mb-3">Company</h6>
                <ul>
                  <li style={{ textAlign: "justify" }}>
                    <NavLink to="/about-us">About Us</NavLink>
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    <Link to="/career">Careers</Link>
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    <Link to="#">Blog</Link>
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    {/* <Link to="#">Careers</Link>
                  </li>
                  <li>
                    <Link to="#">Contact</Link> */}
                  </li>
                </ul>
              </Col>
              <Col md={2} sm={4} xs={6}>
                <h6 style={{ textAlign: "justify" }} className="mb-3">Contact</h6>
                <ul>
                  <li style={{ textAlign: "justify" }}>
                    <Link to="#">Partner With Us</Link>
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    <Link to="#">Drive With Us</Link>
                  </li >
                  <li style={{ textAlign: "justify" }}>
                    <Link to="#">Help & Support</Link>
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    <Link to="#">Contact Us</Link>
                  </li>
                  {/* <li>
                    <Link to="#">Code of Conduct</Link>
                  </li> */}
                </ul>
              </Col>
              <Col md={2} sm={4} xs={4} className="m-none">
                <h6 style={{ textAlign: "justify" }} className="mb-3">Legal</h6>
                <ul>
                  <li style={{ textAlign: "justify" }}>
                    <Link to="#">Terms & Conditions </Link>
                  </li >
                  <li style={{ textAlign: "justify" }}>
                    <Link to="#">Refund & Policy</Link>
                  </li>
                  {/* <li>
                    <Link to="#">Claim your uling</Link>
                  </li>
                  <li>
                    <Link to="#">For Businesses</Link>
                  </li>
                  <li>
                    <Link to="#">Owner Guidelines</Link>
                  </li> */}
                </ul>
                {/* <ul className="d-flex  justify-content-end ">
                  <li>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/MothersFoodIndia/"
                      rel="noopener noreferrer"
                    >
                      <span className="fab fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/mothersfoodindia/"
                      rel="noopener noreferrer"
                    >
                      <span className="fab fa-instagram"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA"
                      rel="noopener noreferrer"
                    >
                      <span className="fab fa-youtube"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://twitter.com/mothersfood1"
                      rel="noopener noreferrer"
                    >
                      <span className="fab fa-twitter"></span>
                    </a>
                  </li>
                </ul> */}
              </Col>
            </Row>
          </Container>
        </section>
        <section className={this.props.sectionclassName}>
          <div className="container">
            <Row>
              <Col xs={12}>
                <p style={{ textAlign: "justify" }} className={this.props.popularCHclassName}>POPULAR CITIES</p>
                <div style={{ textAlign: "justify" }} className="search-links">
                  <Link to="#">Hyderabad</Link> |<Link to="#">Delhi</Link> |
                  <Link to="#">Mumbai</Link> |<Link to="#">Noida</Link> |
                  <Link to="#">Greater Noida</Link> |
                  <Link to="#">Fairdabad</Link> |<Link to="#">Ghazibad</Link> |
                  <Link to="#">Pune</Link> |<Link to="#">Banglore</Link>
                  {/* <Link to="#">Australia</Link> |<Link to="#">Brasil</Link> |
                  <Link to="#">Canada</Link> |<Link to="#">Chile</Link> |
                  <Link to="#">Czech Republic</Link> |<Link to="#">India</Link>{" "}
                  |<Link to="#">Indonesia</Link> |<Link to="#">Ireland</Link> |
                  <Link to="#">New Zealand</Link> |
                  <Link to="#">United Kingdom</Link> |<Link to="#">Turkey</Link>{" "}
                  |<Link to="#">Philippines</Link> |
                  <Link to="#">Sri Lanka</Link> |<Link to="#">Australia</Link> |
                  <Link to="#">Brasil</Link> |<Link to="#">Canada</Link> |
                  <Link to="#">Chile</Link> |<Link to="#">Czech Republic</Link>{" "}
                  |<Link to="#">India</Link> |<Link to="#">Indonesia</Link> |
                  <Link to="#">Ireland</Link> |<Link to="#">New Zealand</Link> |
                  <Link to="#">United Kingdom</Link> |<Link to="#">Turkey</Link>{" "}
                  |<Link to="#">Philippines</Link> |
                  <Link to="#">Sri Lanka</Link> |<Link to="#">Australia</Link> |
                  <Link to="#">Brasil</Link> |<Link to="#">Canada</Link> |
                  <Link to="#">Chile</Link> |<Link to="#">Czech Republic</Link>{" "}
                  |<Link to="#">India</Link> |<Link to="#">Indonesia</Link> |
                  <Link to="#">Ireland</Link> |<Link to="#">New Zealand</Link> |
                  <Link to="#">United Kingdom</Link> |<Link to="#">Turkey</Link>{" "}
                  |<Link to="#">Philippines</Link> |
                  <Link to="#">Sri Lanka</Link> |<Link to="#">Australia</Link> |
                  <Link to="#">Brasil</Link> |<Link to="#">Canada</Link> |
                  <Link to="#">Chile</Link> |<Link to="#">Czech Republic</Link>{" "}
                  |<Link to="#">India</Link> |<Link to="#">Indonesia</Link> |
                  <Link to="#">Ireland</Link> |<Link to="#">New Zealand</Link> |
                  <Link to="#">United Kingdom</Link> |<Link to="#">Turkey</Link>{" "}
                  |<Link to="#">Philippines</Link> |
                  <Link to="#">Sri Lanka</Link> */}
                </div>
                <p style={{ textAlign: "justify" }} className={this.props.popularFHclassName}>
                  POPULAR CUISINES
                </p>
                <div style={{ textAlign: "justify" }} className="search-links">
                  <Link to="#">South Indian</Link> |<Link to="#">Italian</Link>{" "}
                  |<Link to="#">Thai</Link> |<Link to="#">Continental</Link> |
                  <Link to="#">Gujarati</Link> |<Link to="#">Rajasthani</Link> |
                  <Link to="#">Maharashtrian </Link> |
                  <Link to="#">Mughlai</Link> |<Link to="#">Awadhi </Link> |
                  <Link to="#">Mexican </Link> |<Link to="#">Kerala </Link> |
                  <Link to="#">Odiya</Link> |<Link to="#">Chinese </Link> |
                  <Link to="#">American</Link> |<Link to="#">Bengali </Link> |
                  <Link to="#">Punjabi </Link> |<Link to="#">Andhra </Link> |
                  <Link to="#">Kashmiri </Link> |<Link to="#">Goan </Link> |
                  <Link to="#">Tamilian</Link> |<Link to="#">Assamese </Link> |
                  <Link to="#">Manipuri </Link> |<Link to="#">Naga </Link> |
                  <Link to="#">Meghalayan</Link> |<Link to="#">Mizo </Link> |
                  <Link to="#">Sikkimese </Link> |<Link to="#">Spanish </Link> |
                  <Link to="#">Indonesian </Link> |<Link to="#">Turkish </Link>{" "}
                  |<Link to="#">French </Link> |<Link to="#">Vietnamese</Link> |
                  <Link to="#">Lebanese </Link> |<Link to="#">Moroccan</Link>|
                  <Link to="#">British</Link> |<Link to="#">European</Link>|
                  <Link to="#">Asian </Link> |<Link to="#">Bihari</Link>|
                  <Link to="#">Malvani</Link> |<Link to="#">Mangalorean</Link>|
                  <Link to="#">Sindhi</Link> |<Link to="#">Telangana</Link>|
                  <Link to="#">Bhojpuri </Link> |<Link to="#">Kumauni</Link>|
                  <Link to="#">Japanese </Link> |<Link to="#"> Korean</Link>|
                  <Link to="#"> Russian </Link> |<Link to="#"> Spa </Link>|
                  <Link to="#"> Ayurvedic </Link> |<Link to="#"> Vegan </Link>|
                  <Link to="#"> Mediterranean </Link> |
                  <Link to="#"> Mangolian </Link>|
                  <Link to="#"> Cake baking </Link> |
                  <Link to="#"> North indian </Link>|
                  <Link to="#"> Parsi Food </Link> |<Link to="#"> Baking </Link>
                  |<Link to="#">Items </Link>
                </div>
              </Col>
            </Row>
          </div>
        </section>
        <footer className="pt-4 pb-4 text-center">
          <Container>
            <p className="mt-0 mb-0">{this.props.copyrightText}</p>
            <small className="mt-0 mb-0">
              {" "}
              Made with <FontAwesome
                icon={this.props.madewithIconclassName}
              />{" "}
              by
              <Link
                className="text-danger ml-1"
                target="_blank"
                to={`${this.props.firstLink}`}
              >
                {this.props.firstLinkText}
              </Link>{" "}
              -{" "}
              {/* <Link
                className="text-primary"
                target="_blank"
                to={this.props.secondLink}
              >
                {this.props.secondLinkText}
              </Link> */}
            </small>
          </Container>
        </footer>
      </>
    );
  }
}

Footer.propTypes = {
  sectionclassName: PropTypes.string,
  popularCHclassName: PropTypes.string,
  popularCountries: PropTypes.array,
  popularFHclassName: PropTypes.string,
  popularFood: PropTypes.array,
  copyrightText: PropTypes.string,
  madewithIconclassName: PropTypes.string,
  firstLinkText: PropTypes.string,
  firstLink: PropTypes.string,
  secondLinkText: PropTypes.string,
  secondLink: PropTypes.string,
};

Footer.defaultProps = {
  sectionclassName: "footer-bottom-search pt-5 pb-5 bg-white",
  popularCHclassName: "text-black",
  popularCountries: [],
  popularFHclassName: "mt-4 text-black",
  popularFood: [],
  copyrightText: "© 2020 MothersFood. All rights reserved.",
  madewithIconclassName: "heart heart-icon text-danger",
  firstLinkText: "Mr.Naga Babu",
  firstLink: "//www.instagram.com/nagababu_v/",
  // secondLinkText: "Askbootstrap",
  // secondLink: "//askbootstrap.com/",
};

export default Footer;
