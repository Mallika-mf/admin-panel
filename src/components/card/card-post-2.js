import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const PostCard2 = (props) => {
    const blog  = props;
    //console.log(props.masonary)
    return (
        <Fragment>
            {

            Object.values(blog).map((value, key) => {
                const {imgSrc, id, date, content, title} = value;
                return (
                    <div className={"blog-single"} key={id}>        
                        <div className="card post--card post--card2 ">
                            <figure>
                                <NavLink to={"/news-details"+id} ><img src={imgSrc} alt="mothersfood" /></NavLink>
                                <figcaption>
                                    <NavLink to={"/news-details"+id} ><i className="la la-image"></i></NavLink>
                                </figcaption>
                            </figure>
                            <div className="card-body">
                                <h5><NavLink to={"/news-details"+id} >{title}</NavLink></h5>
                                <ul className="post-meta d-flex">
                                    <li>{date}</li>
                                    <li>by <NavLink to="">Aazztech</NavLink></li>
                                    <li>in <NavLink to="">Event</NavLink></li>
                                    <li><NavLink to="">6 Comments</NavLink></li>
                                </ul>
                                <p>{content}</p>
                            </div>
                        </div>{/*<!-- End: .card -->*/}    
                    </div>
                )        
            })
            }
        </Fragment>
    )

}
export default PostCard2;