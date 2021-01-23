import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
const CardStyle3 = (props) => {    
    const {blog} = props;
    const blog1 = Object.values(blog).slice(3, 6)
    return (
        <div className="row">
            {
                Object.values(blog1).map((value, key) => {
                    const {imgSrc, id, title, industry} = value;
                    return (
                        <div className="col-lg-4 col-md-6" key={id}>
                            <div className="card card-shadow card-three rounded-0">
                                <figure>
                                    <img src={imgSrc} alt="mothersfood" />
                                </figure>
                                <div className="card-body">
                                    <p className="card-subtitle color-secondary">{industry}</p>
                                    <h6><NavLink to={"/news-details"+id}>{title}</NavLink></h6>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        blog : state.blog
    }
}
export default connect(mapStateToProps)(CardStyle3)