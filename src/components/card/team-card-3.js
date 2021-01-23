import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
const noAction = (e) => {
    e.preventDefault();
}

const CardStyle3 = (props) => {    
    const {team} = props;
   
    return (
        <div className="card-style section-bg team--card3">
            <div className="container">
                <div className="row">
                    {
                        Object.values(team).slice(3, 6).map((value, key) => {
                            const {imgSrc, id, name, speach} = value;
                            return (
                            key <=2 &&
                                <div className="col-lg-4 col-md-6" key={id}>
                                    <div className="card card--team3">
                                        <div className="card__thumbnail">
                                            <img src={imgSrc} alt="" />
                                        </div>
                                        <div className="card-body text-center">
                                            <h6><NavLink to={"/team-details"+id}>{name}</NavLink></h6>
                                            <span className="subtitle">Customer Relations</span>
                                            <p>{speach}</p>
                                            <div className="social-basic ">
                                                <ul className="d-flex justify-content-center ">
                                                    <li><NavLink to="/" onClick={noAction} className="facebook"><span className="fab fa-facebook-f"></span></NavLink></li>
                                                    <li><NavLink to="/" onClick={noAction} className="twitter"><span className="fab fa-twitter"></span></NavLink></li>
                                                    <li><NavLink to="/" onClick={noAction} className="linkedin"><span className="fab fa-linkedin-in"></span></NavLink></li>
                                                    <li><NavLink to="/" onClick={noAction} className="gplus"><span className="fab fa-google-plus-g"></span></NavLink></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>{/*<!-- End: .card -->*/}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        team : state.team
    }
}
export default connect(mapStateToProps)(CardStyle3)