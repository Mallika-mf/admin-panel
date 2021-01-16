import React, { Component } from 'react'
import BlogDetailContent14 from './Details/detail-content-14';
import RightSideBar from './rightSidebarblog';
export default class Blog extends Component {
    render() {
        const {content, blog} = this.props;
        return (

            <section className="blog-single-wrapper" style={{padding:"1.0rem 0"}}>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-8" >
                            <BlogDetailContent14 {...content} style={{marginLeft:"-4%"}} />
                        </div>{/*<!-- ends: .col-lg-8 -->*/}
                        {/* <div className="col-lg-4" style={{  border: "1px solid gray",marginLeft:"0%"}}> */}
                            <RightSideBar {...blog}  />                        

                            {/* </div> */}
                    </div>
                </div>
            </section>

        )
    }
}