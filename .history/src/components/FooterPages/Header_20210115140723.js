import React, {Fragment} from 'react';
// import Navbar from '../navbar/colorNav';
// import TopHeader from '../header/topHeader';
// import {NavLink} from 'react-router-dom';

import $ from 'jquery';
const bg_holder_img = () => {
    /* setting background images */
    $('.bg_image_holder').each(function () {
        var $this = $(this);
        var imgLink = $this.children().attr('src');
        $this.css({
            "background-image": "url(" + imgLink + ")",
            "opacity": "1"
        }).children().attr('alt', imgLink);
    });
}
$(document).ready(function (){
    bg_holder_img();
})

var url = window.location.href;

setInterval(() => {
    var url2 = window.location.href;    
    if(url !== url2){
        url = url2;
        bg_holder_img();
    }
}, 100)

const SinglePage = (props) => {      
    return (
        <Fragment>
            <div className="card">
            <section className="header header--2">
               {/* <TopHeader /> */}
                {/* <Navbar />  */}
            </section>
            {/* <!-- ends: .intro-area --> */}
            <section className="breadcrumb_area breadcrumb2 bgimage biz_overlay" style={{height:"30%"}}>
                <div className="bg_image_holder">
                    <img src="./assets/img/breadbg.jpg" alt="mothersfood" />
                </div>
                <div className="container content_above">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumb_wrapper d-flex flex-column align-items-center">
                                <h4 className="page_title" style={{color:"white"}}>{props.pageTitle}</h4>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb m-bottom-30">
                                        {/* <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li> */}
                                        {/* <li className="breadcrumb-item active" aria-current="page">{props.pageTitle}</li> */}
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>{/*<!-- ends: .row -->*/}
                </div>
            </section>{/*<!-- ends: .breadcrumb_area -->*/}
            </div>
        </Fragment>       
                      
    )   
}
export default SinglePage;