import React from 'react';
import { NavLink } from 'react-router-dom';
const noAction = e => e.preventDefault();

const Card11 = (props) => {
    return (

        <div className={props.padding ? props.padding : "p-top-100 p-bottom-80 border-bottom"}>
            <div className="m-bottom-50">
                <div className="divider divider-simple text-center">
                    <h3>What We Do</h3>
                </div>
            </div>
            <div className="card-style-eleven">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="card card--eleven">
                                <figure>
                                    <img src="./assets/img/g1.jpg" alt="mothersfood" />
                                </figure>
                                <div className="card-body text-center">
                                    <div className="card-contents">
                                        <div className="content-top">
                                            <span><i className="la la-area-chart"></i></span>
                                            <h6>Customer Strategy &amp; Marketing</h6>
                                        </div>
                                        <div className="content-bottom">
                                            <p>Investig ationes demons travge vunt lectores legere lyrus quodk legunt saepius claritas kest.</p>
                                            <NavLink to="/at_demo" onClick={noAction} className="btn btn-secondary btn-sm">See Details</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>{/*<!-- End: .card -->*/}
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card card--eleven">
                                <figure>
                                    <img src="./assets/img/g2.jpg" alt="mothersfood" />
                                </figure>
                                <div className="card-body text-center">
                                    <div className="card-contents">
                                        <div className="content-top">
                                            <span><i className="la la-bar-chart"></i></span>
                                            <h6>Industrial Goods &amp; Services</h6>
                                        </div>
                                        <div className="content-bottom">
                                            <p>Investig ationes demons travge vunt lectores legere lyrus quodk legunt saepius claritas kest.</p>
                                            <NavLink to="/at_demo" onClick={noAction} className="btn btn-secondary btn-sm">See Details</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>{/*<!-- End: .card -->*/}
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card card--eleven">
                                <figure>
                                    <img src="./assets/img/g3.jpg" alt="mothersfood" />
                                </figure>
                                <div className="card-body text-center">
                                    <div className="card-contents">
                                        <div className="content-top">
                                            <span><i className="la la-gear"></i></span>
                                            <h6>Startup Business Planning And Investment</h6>
                                        </div>
                                        <div className="content-bottom">
                                            <p>Investig ationes demons travge vunt lectores legere lyrus quodk legunt saepius claritas kest.</p>
                                            <NavLink to="/at_demo" onClick={noAction} className="btn btn-secondary btn-sm">See Details</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>{/*<!-- End: .card -->*/}
                        </div>
                    </div>{/*<!-- ends: .row -->*/}
                </div>
            </div>{/*<!-- ends: .card-style-eleven -->*/}
        </div>
    )
}


export default Card11