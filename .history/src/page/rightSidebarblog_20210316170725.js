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
                <div className="col-lg-4" >
                    <div className="sidebar">
                        {/* <!-- search widget --> */}
                        {/*<!-- ends: .widget-wrapper -->*/}


                        {/* <!-- popular post --> */}

                        <div className="widget-wrapper" >
                            <div className="widget-default">
                                <div className="widget-header"  >
                                    <h6 className="widget-title" >Popular Post</h6>
                                </div><hr/>
                                <div class="row mx-md-n5" style={{marginBottom:"20%"}} >
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-10"><NavLink to='/news-detail-1'><img src="../assets/img/blog-img-3.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-7" style={{marginLeft:"-10%"}}><p ><span >July 07, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "14%" }}>
                                                <NavLink to='/news-detail-1' className="post-title"><p>Cooking is a passion for every woman</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-2'  ><img src="../assets/img/blog-img-1.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>July 07, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "0%" }}>
                                                <NavLink to='/news-detail-2' className="post-title"><p>Benefits of Eating Homemade Food</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-3'><img src="../assets/img/blog-img-2.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>July 07, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-33%" }}>
                                                <NavLink to='/news-detail-4' className="post-title"><p>Best Indian Foods.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-5'><img src="../assets/img/blog-img-5.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Nov 30, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-30%" }}>
                                                <NavLink to='/news-detail-5' className="post-title"><p>Health and Hygiene<br />&nbsp; with homemade food.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-6'><img src="../assets/img/blog-img-6.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 05, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-20%" }}>
                                                <NavLink to='/news-detail-6' className="post-title"><p>Indian Homemade Foods</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-7'><img src="../assets/img/blog-img-7.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 14, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-15%" }}>
                                                <NavLink to='/news-detail-7' className="post-title"><p>Celebrities and their favorite<br /> homemade dishes.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                 <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-8'><img src="../assets/img/blog-img-8.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 18, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-20%" }}>
                                                <NavLink to='/news-detail-8' className="post-title"><p>Importance of Homemade<br/> food for kids.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-9'><img src="../assets/img/blog-img-9.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 24, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-15%" }}>
                                                <NavLink to='/news-detail-9' className="post-title"><p>How many Types of Indian<br />  Breads are there?</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-10'><img src="../assets/img/blog-img-10.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Dec 29, 2020</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-15%" }}>
                                                <NavLink to='/news-detail-10' className="post-title"><p>Homemade food, an integral<br />  part of fitness.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-11'><img src="../assets/img/blog-img-11.jpeg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Jan 02, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-35%" }}>
                                                <NavLink to='/news-detail-11' className="post-title"><p>Best Chicken Biryani <br />  and Its Recipes.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-12'><img src="../assets/img/blog-img-12.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Jan 06, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-15%" }}>
                                                <NavLink to='/news-detail-12' className="post-title"><p>What are your comfort foods? </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-13'><img src="../assets/img/blog-img-13.jpeg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Jan 09, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-20%" }}>
                                                <NavLink to='/news-detail-13' className="post-title"><p>Top 25 Delhi Famous Foods </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-14'><img src="../assets/img/blog-img-14.jpeg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Jan 13, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Rikitha Ravula</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-14' className="post-title"><p>Which Indian vegetable <br/>is best for winter? </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-15'><img src="../assets/img/blog-img-15.jpeg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Feb 02, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-15' className="post-title"><p>Why Home-Made Food is the  <br/>best as compared to Junk Food? </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-16'><img src="../assets/img/blog-img-16.jpeg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Feb 06, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-16' className="post-title"><p>7 Unique ways to   <br/>Consume Vegetables </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-17'><img src="../assets/img/blog-img-17.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Feb 09, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-17' className="post-title"><p>HOW SPROUTS ARE    <br/>BENEFICIAL FOR THE BODY? </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-18'><img src="../assets/img/blog-img-18.jpeg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Feb 16, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-18' className="post-title"><p>SUPERFOODS AND THEIR BENEFITS </p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-19'><img src="../assets/img/blog-img-19.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Feb 20, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-19' className="post-title"><p>Leafy Green Vegetables <br/> in your meals and their benefits.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-20'><img src="../assets/img/blog-img-20.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>Feb 26, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-20' className="post-title"><p>Indian Ancient Ingredients  <br/> and their benefits.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-21'><img src="../assets/img/blog-img-21-4.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>March 01, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-21' className="post-title"><p>Indian Home-cooked meals <br/> and their Benefits:</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-22'><img src="../assets/img/blog-img-22.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>March 06, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-22' className="post-title"><p>Indian Meal Prep and Hacks</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-23'><img src="../assets/img/blog-img-23.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>March 09, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-23' className="post-title"><p>Importance of High Quality<br/> Ingredients in meals.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-24'><img src="../assets/img/blog-img-24.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>March 13, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-24' className="post-title"><p>How the Right Nutrition <br/> Can Help You to Save <br/>a Lot of Money.</p></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-md-n4" style={{marginBottom:"20%"}}>
                                    <div className="widget-content">
                                        <div className="sidebar-post">
                                            <div className="d-flex align-items-center">
                                                <div className="col-lg-8"><NavLink to='/news-detail-25'><img src="../assets/img/blog-img-25.jpg" alt="mothersfood" style={{width:"120px"}} /></NavLink></div>
                                                <div className="col-lg-6"> <p><span>March 16, 2021</span> <br /><span>by <NavLink to='/' onClick={noAction}>Eishita Rambhiya</NavLink></span></p></div>
                                            </div>
                                            <div style={{ position: "relative", marginLeft: "-25%" }}>
                                                <NavLink to='/news-detail-25' className="post-title"><p>Top 10 Tips to Eat  <br/> Healthy when Dining Out</p></NavLink>
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