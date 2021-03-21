import React, { Fragment } from 'react';
import {Row,Col,Card,CardHeader,CardFooter,Media} from 'reactstrap';
import one from "../../assets/images/user-card/1.jpg";
import three from "../../assets/images/avtar/3.jpg";
import two from "../../assets/images/user-card/2.jpg";
import sixteen from "../../assets/images/avtar/16.jpg";
import eleven from "../../assets/images/avtar/11.jpg";
import seven from "../../assets/images/user-card/7.jpg";
import five from "../../assets/images/user-card/5.jpg";
import six from "../../assets/images/user-card/6.jpg";
import four from "../../assets/images/user-card/3.jpg";

const FriendsTab = () => {
    return (
        <Fragment>
            <Row>
                <Col md="6" lg="6" xl="4">
                    <Card className="custom-card">
                        <CardHeader><Media body className="img-fluid" src={one} alt="" /></CardHeader>
                        <div className="card-profile"><Media body className="rounded-circle" src={three} alt="" /></div>
                        <ul className="card-social">
                            <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                        </ul>
                        <div className="text-center profile-details">
                            <h4>Mark Jecno</h4>
                            <h6>Manager</h6>
                        </div>
                        <CardFooter className="row">
                            <Col sm="4 col-sm-4">
                                <h6>Follower</h6>
                                <h3 className="counter">9564</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Following</h6>
                                <h3><span className="counter">49</span>K</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Total Post</h6>
                                <h3><span className="counter">96</span>M</h3>
                            </Col>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="6" lg="6" xl="4">
                    <Card className="custom-card">
                        <CardHeader><Media body className="img-fluid" src={two} alt="" /></CardHeader>
                        <div className="card-profile"><Media body className="rounded-circle" src={sixteen} alt="" /></div>
                        <ul className="card-social">
                            <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                        </ul>
                        <div className="text-center profile-details">
                            <h4>Johan Deo</h4>
                            <h6>Designer</h6>
                        </div>
                        <CardFooter className="row">
                            <Col sm="4 col-sm-4">
                                <h6>Follower</h6>
                                <h3 className="counter">2578</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Following</h6>
                                <h3><span className="counter">26</span>K</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Total Post</h6>
                                <h3><span className="counter">96</span>M</h3>
                            </Col>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="6" lg="6" xl="4">
                    <Card className="custom-card">
                        <CardHeader><Media body className="img-fluid" src={four} alt="" /></CardHeader>
                        <div className="card-profile"><Media body className="rounded-circle" src={eleven} alt="" /></div>
                        <ul className="card-social">
                            <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                        </ul>
                        <div className="text-center profile-details">
                            <h4>Dev John</h4>
                            <h6>Devloper</h6>
                        </div>
                        <CardFooter className="row">
                            <Col sm="4 col-sm-4">
                                <h6>Follower</h6>
                                <h3 className="counter">6545</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Following</h6>
                                <h3><span className="counter">91</span>K</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Total Post</h6>
                                <h3><span className="counter">21</span>M</h3>
                            </Col>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="6" lg="6" xl="4">
                    <Card className="custom-card">
                        <CardHeader><Media body className="img-fluid" src={seven} alt="" /></CardHeader>
                        <div className="card-profile"><Media body className="rounded-circle" src={sixteen} alt="" /></div>
                        <ul className="card-social">
                            <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                        </ul>
                        <div className="text-center profile-details">
                            <h4>Johan Deo</h4>
                            <h6>Designer</h6>
                        </div>
                        <CardFooter className="row">
                            <Col sm="4 col-sm-4">
                                <h6>Follower</h6>
                                <h3 className="counter">2578</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Following</h6>
                                <h3><span className="counter">26</span>K</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Total Post</h6>
                                <h3><span className="counter">96</span>M</h3>
                            </Col>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="6" lg="6" xl="4">
                    <Card className="custom-card">
                        <CardHeader><Media body className="img-fluid" src={five} alt="" /></CardHeader>
                        <div className="card-profile"><Media body className="rounded-circle" src={eleven} alt="" /></div>
                        <ul className="card-social">
                            <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                        </ul>
                        <div className="text-center profile-details">
                            <h4>Dev John</h4>
                            <h6>Devloper</h6>
                        </div>
                        <CardFooter className="row">
                            <Col sm="4 col-sm-4">
                                <h6>Follower</h6>
                                <h3 className="counter">6545</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Following</h6>
                                <h3><span className="counter">91</span>K</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Total Post</h6>
                                <h3><span className="counter">21</span>M</h3>
                            </Col>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="6" lg="6" xl="4">
                    <Card className="custom-card">
                        <CardHeader><Media body className="img-fluid" src={six} alt="" /></CardHeader>
                        <div className="card-profile"><Media body className="rounded-circle" src={three} alt="" /></div>
                        <ul className="card-social">
                            <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                        </ul>
                        <div className="text-center profile-details">
                            <h4>Mark Jecno</h4>
                            <h6>Manager</h6>
                        </div>
                        <CardFooter className="row">
                            <Col sm="4 col-sm-4">
                                <h6>Follower</h6>
                                <h3 className="counter">9564</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Following</h6>
                                <h3><span className="counter">49</span>K</h3>
                            </Col>
                            <Col sm="4 col-sm-4">
                                <h6>Total Post</h6>
                                <h3><span className="counter">96</span>M</h3>
                            </Col>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default FriendsTab;