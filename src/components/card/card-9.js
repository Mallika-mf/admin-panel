import React from 'react';
import { NavLink } from 'react-router-dom';
const noAction = e => e.preventDefault();

const Card9 = (props) => {    
    return (
        
    <section className="section-bg p-top-110 p-bottom-80">
        <div className="card-style-nine">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="card card-shadow card--seven card--nine">
                            <figure>
                                <img src="./assets/img/c1.jpg" alt="mothersfood" />
                            </figure>
                            <div className="card-body">
                                <h6><NavLink to="/" onClick={noAction}>Insurance And Finance</NavLink></h6>
                                <p>Investig ationes demons trave runt lectores legere liusry quod ii legunt saepius claritas Investig ationes.</p>
                            </div>
                        </div>{/*<!-- End: .card -->*/}
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card card-shadow card--seven card--nine">
                            <figure>
                                <img src="./assets/img/c2.jpg" alt="mothersfood" />
                            </figure>
                            <div className="card-body">
                                <h6><NavLink to="/" onClick={noAction}>Business And Consulting</NavLink></h6>
                                <p>Investig ationes demons trave runt lectores legere liusry quod ii legunt saepius claritas Investig ationes.</p>
                            </div>
                        </div>{/*<!-- End: .card -->*/}
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card card-shadow card--seven card--nine">
                            <figure>
                                <img src="./assets/img/c3.jpg" alt="mothersfood" />
                            </figure>
                            <div className="card-body">
                                <h6><NavLink to="/" onClick={noAction}>Strategy Advisory</NavLink></h6>
                                <p>Investig ationes demons trave runt lectores legere liusry quod ii legunt saepius claritas Investig ationes.</p>
                            </div>
                        </div>{/*<!-- End: .card -->*/}
                    </div>
                </div>
            </div>
        </div>{/*<!-- ends: .card-style-nine -->*/}
    </section>            
    )
}


export default Card9