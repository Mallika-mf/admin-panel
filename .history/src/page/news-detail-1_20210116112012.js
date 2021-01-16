import React, { Component } from 'react'
import BlogDetailContent from './detail-content-1';
import RightSideBar from './rightSidebarblog';
export default class Blog extends Component {
    render() {
        const {content, blog} = this.props;
        return (
            <section className="blog-single-wrapper" style={{padding:"1.0rem 0"}}>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-8">
                            <BlogDetailContent {...content} />
                        </div>{/*<!-- ends: .col-lg-8 -->*/}
                        <RightSideBar {...blog} />                        
                    </div>
                </div>
            </section>
        )
    }
}