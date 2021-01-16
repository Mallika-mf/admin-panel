import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive'
const noAction = (e) => {
    e.preventDefault();
}
class RightSideBar extends Component {
    render() {
        // const blog = this.props;

        return (
            <MediaQuery minDeviceWidth={1224}>
                <div className="col-lg-12" style={{border:"none"}}>
                    <div className="sidebar" style={{marginTop:"5%"}}>
                        {/* <!-- search widget --> */}
                        {/*<!-- ends: .widget-wrapper -->*/}


                        {/* <!-- popular post --> */}

                        <div className="widget-wrapper" >
                            <div className="widget-default">
                                <div className="widget-header"  >
                                    <h6 className="widget-title" style={{border:"0px 1px 1px solid gray"}}>Popular Post</h6>
                                </div>
                                <div class="row mx-md-n5" style={{marginTop:"20%"}} >
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-1'><img src="../assets/img/blog-img-3.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"><p ><span >July 07, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-13%" }}>
                                                <NavLink to='/news-detail-1' className="post-title"><p>Cooking is a passion for every woman</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-2'  ><img src="../assets/img/blog-img-1.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>July 07, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-20%" }}>
                                                <NavLink to='/news-detail-2' className="post-title"><p>Benefits of Eating Homemade Food</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-3'><img src="../assets/img/blog-img-2.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>July 07, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-53%" }}>
                                                <NavLink to='/news-detail-4' className="post-title"><p>Best Indian Foods.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-5'><img src="../assets/img/blog-img-5.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Nov 30, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-50%" }}>
                                                <NavLink to='/news-detail-5' className="post-title"><p>Health and Hygiene<br />&nbsp; with homemade food.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-6'><img src="../assets/img/blog-img-6.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 05, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-40%" }}>
                                                <NavLink to='/news-detail-6' className="post-title"><p>Indian Homemade Foods</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-7'><img src="../assets/img/blog-img-7.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 14, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-35%" }}>
                                                <NavLink to='/news-detail-7' className="post-title"><p>Celebrities and their favorite<br /> homemade dishes.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                 <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-8'><img src="../assets/img/blog-img-8.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 18, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-40%" }}>
                                                <NavLink to='/news-detail-8' className="post-title"><p>Importance of Homemade<br/> food for kids.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-9'><img src="../assets/img/blog-img-9.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 24, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-35%" }}>
                                                <NavLink to='/news-detail-9' className="post-title"><p>How many Types of Indian<br />  Breads are there?</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-10'><img src="../assets/img/blog-img-10.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 29, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-35%" }}>
                                                <NavLink to='/news-detail-10' className="post-title"><p>Homemade food, an integral<br />  part of fitness.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-11'><img src="../assets/img/blog-img-11.jpeg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Jan 02, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-35%" }}>
                                                <NavLink to='/news-detail-11' className="post-title"><p>Best Chicken Biryani <br />  and Its Recipes.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-12'><img src="../assets/img/blog-img-12.jpg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Jan 06, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-35%" }}>
                                                <NavLink to='/news-detail-12' className="post-title"><p>What are your comfort foods? </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-13'><img src="../assets/img/blog-img-13.jpeg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Jan 09, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-35%" }}>
                                                <NavLink to='/news-detail-13' className="post-title"><p>Top 25 Delhi Famous Foods </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4">
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-6"><NavLink to='/news-detail-14'><img src="../assets/img/blog-img-14.jpeg" alt="mothersfood" style={{width:"100px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Jan 13, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-35%" }}>
                                                <NavLink to='/news-detail-14' className="post-title"><p>Which Indian vegetable <br/>is best for winter? </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/*<!-- ends: .widget-wrapper -->*/}

                    </div> {/*<!-- ends: .sidebar -->*/}
                </div>
            </MediaQuery>
        )
    }
}
export default RightSideBar;