import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
const noAction = (e) => {
    e.preventDefault();
}
const CardStyle2 = (props) => {    
    const {team} = props;
    return ( 
        <div className="team--card2">
            <div className="container">                      
                <div className="row">
                    {
                        Object.values(team).slice(6, 10).map((value, key) => {
                            const {imgSrc, id, name, designation} = value;
                            return (                            
                            <div className="col-lg-3 col-sm-6" key={id}>
                                <div className="card card--team2">
                                    <figure>
                                        <img src={imgSrc} alt="" />
                                        <figcaption>
                                            <ul className="team-social d-flex justify-content-center">
                                                <li><NavLink to="/" onClick={noAction}><i className="fab fa-google-plus-g"></i></NavLink></li>
                                                <li><NavLink to="/" onClick={noAction}><i className="fab fa-facebook-f"></i></NavLink></li>
                                                <li><NavLink to="/" onClick={noAction}><i className="fab fa-twitter"></i></NavLink></li>
                                                <li><NavLink to="/" onClick={noAction}><i className="fab fa-linkedin-in"></i></NavLink></li>
                                            </ul>
                                            <NavLink to={"/team-details"+id} className="btn btn-sm btn-outline-light">View Profile</NavLink>
                                        </figcaption>
                                    </figure>
                                    <div className="card-body bg-primary">
                                        <a href="team-single.html">
                                            <h6>{name}</h6>
                                        </a>
                                        <span>{designation}</span>
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
export default connect(mapStateToProps)(CardStyle2)