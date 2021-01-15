import React from 'react';
import banner from './AboutUs-images/Banner_About2.png';

import { NavLink } from 'react-router-dom';

function Content() {
    const noAction = e => e.preventDefault();
    return (
        <>
            <div className="about-container">
                <img src = {banner} alt = "img" width = "100%"></img>
                {/* <div className="banner_title">About Us</div> */}
            </div>
            {/* <div className="about-content">
                <div className = "title">
                    <h3>About Mothers Food</h3>
                    <h6>It is a long established fact that a reader
                        will be distracted by the readable content of a page when looking at its layout.
                    </h6>
                </div>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div> */}
            <section className="section-bg p-top-50 p-bottom-80" style={{marginTop:"2%"}} >
                <div className="card-style-nine">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12 section-title text-center">
                                    <h3><b>MothersFood Values</b></h3>
                                    <p style={{ textAlign: "justify" }}>How often does your mom say ‘Don’t eat outside food’? Though we used to stroll her words, now it seems to be the best option. Isn’t it? But we all are habituated to ready-made food delivered by the time we reach. Then let us ask you some questions. Have you ever seen their kitchen? Do they maintain hygiene? Do they have fresh supplies of vegetables and groceries? We’re sure you don’t have an answer for this. Now let us say something about MothersFood and the values that we follow religiously:</p>
                                </div>
                        <div className="col-lg-4 col-md-6">
                                <div className="card" style={{marginBottom:"10%"}}>
                                        <div class="card-body text-center">
                                        <img src="../assets/img/values1.png" width="80px" height="80px" className="img-responsive" alt="" />
                                        <h6><NavLink to="/" onClick={noAction}><b>Consumer health</b></NavLink></h6>
                                        <p style={{ textAlign: "justify",wordSpacing:"-1.5px" }}>Consumer health, hygienic delivery is our priority. Nothing better than a delicious  home cooked meal delivered at your door step.<br/></p>
                                    </div>
                                </div> 
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card">
                                        <div class="card-body text-center">
                                        <img src="../assets/img/values2.png" width="80px" height="80px" className="img-responsive" alt="" />
                                        <h6><NavLink to="/" onClick={noAction}><b>Hygiene</b></NavLink></h6>
                                        <p style={{ textAlign: "justify",wordSpacing:"-1.7px"}}>To ensure consumer trust, we provide direct visuals and pictures of the home kitchen where your food has been prepared by home chefs.<br/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card">
                                        <div class="card-body text-center">
                                        <img src="../assets/img/values3.png" width="80px" height="80px" className="img-responsive" alt="" />
                                        <h6><NavLink to="/" onClick={noAction}><b>Home-made</b></NavLink></h6>
                                        <p style={{ textAlign: "justify", wordSpacing:"0.1px"}}>Nothing better than the taste of mom made food. We deliver the same magical homemade food with no clause and conditions.<br/></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row p-top-50">
                        
                        <div className="col-lg-4 col-md-6">
                                <div className="card">
                                        <div class="card-body text-center">
                                        <img src="../assets/img/values4.png" width="80px" height="80px" className="img-responsive" alt="" />
                                        <h6><NavLink to="/" onClick={noAction}><b>Feedback</b></NavLink></h6>
                                        <p style={{ textAlign: "justify",wordSpacing:"-0.5px" }}>We are on the watch for feedback always. We strive to work on the feedback, make changes and give our customers good experience.<br/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card">
                                        <div class="card-body text-center">
                                        <img src="../assets/img/values5.png" width="80px" height="80px" className="img-responsive" alt="" />
                                        <h6><NavLink to="/" onClick={noAction}><b>Health over money</b></NavLink></h6>
                                        <p style={{ textAlign: "justify"}}>Money is temporary, health is permanent. Hence, we thrive to provide the most delicious and healthy homemade food to you.<br/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card">
                                        <div class="card-body text-center">
                                        <img src="../assets/img/values6.png" width="80px" height="80px" className="img-responsive" alt="" />
                                        <h6><NavLink to="/" onClick={noAction}><b>Best of best</b></NavLink></h6>
                                        <p style={{ textAlign: "justify",wordSpacing:"0.5px" }}>Customer satisfaction is key for us. We give our customers nothing but the best. Best food, best delivery experience and best prices.<br/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*<!-- ends: .card-style-nine -->*/}
            </section>            


            <div className="card" style={{marginTop:"5%"}}>
            <section className="features-area  p-top-20 p-bottom-20" >
                <div className="icon-boxes">
                    <div className="container">
                        <div className="row" style={{margin:"auto"}}>
                            <div className="col-lg-12 col-md-12 col-sm-6 " style={{marginTop:"5"}}>
                            <h3 style={{color:"#E41C39"}}><b>Women Empowerment - PAN India</b></h3>
                                <div className=" icon-box-fourteen ">
                                    <p className="m-top-0 p-top-0" style={{ textAlign: "justify" }}>
                                    <b >Mom, why is it taking so long to cook something?</b><br/>
                                    <b >You sit all day at home, can't you cook a little faster or didn't you think I'll come home hungry?</b><br/>

                                    For all those who say these things to your mother, have you ever given thought to what your mom wanted to become when she was young? Despite anything, she settled down to take care of your family without any complaint. Now the question is if you are given a chance, will you be willing to provide them with the identity that they always wanted? If yes, MothersFood is your answer. <br/>

                                    If you ever stayed away from home, you might understand the value of Home food. Are we wrong? You might have spent days wishing for those excellent delicacies but went to sleep with disappointment with something that you had at a restaurant that is nowhere close to satisfy your tastebuds. MothersFood is a food-delivery platform to bridge the gap between people who crave for home food and chefs behind home kitchens with their perfect and delicious dishes. We believe that a woman who can run a family can run a business effortlessly, and now we're taking a step towards giving a push to all those women with a hidden interest in gaining the identity that they deserve.<br/>

                                    We understand how tough it is to manage a home along with a business, but we want to do everything we could to make their job easier. For example: If she has school-going kids, she must be busy in the mornings and evenings, then she can just work for 2 hours a day and skip weekends to effortlessly manage family and job. Not only that, you don't personally have to serve the customers or arrange for a home-pickup or home-delivery options. We will provide you with the driver-partners to collect food directly from the kitchen and deliver it at the customer's doorstep. <br/>

                                    And one more exciting thing is, you don't have to have an entire menu like restaurants. You can cook only a few items that you excel in, even if it's just one dish. And we'll take it out on a tasting-spree. Wait, wait, we're not done yet. We also want you to save more while you earn more. Then women of MothersFood get access to M-food, an online grocery store where they can place the order for groceries for a very better price compared to your local market. How do we do that? We said we'll go up to any mark to make empowerment easier for women, and we mean it. We directly made connections with the brands for a great deal. <br/>

                                    Every mother is a great chef. But even the greatest chefs have a special dish. Aren't they? We're out looking for those dishes to make them more famous, instead of limiting them to your family. A simple step can empower her with something that she's already excelled in. We'll give the mother the respect and identity that she deserves. Not just in the family, but also in society.

                                    </p>
                                </div>{/*<!-- ends: .icon-box -->*/}
                            </div>{/*<!-- ends: .col-lg-3 -->*/}
                        
                        </div>
                    
                    </div>
                </div>{/*<!-- ends: .icon-boxes -->*/}
            </section>
            
            <section className="features-area  p-top-20 p-bottom-20" >
                <div className="icon-boxes">
                    <div className="container">
                        <div className="row" style={{margin:"auto"}}>
                            <div className="col-lg-12 col-md-12 col-sm-6" style={{margin:"auto"}}>
                            <h3 style={{color:"#E41C39"}}><b>Healthy homemade food at your service:</b></h3>
                                <div className=" icon-box-fourteen ">
                                    <p className="m-top-0 p-top-0" style={{ textAlign: "justify" }}>
                                    Healthy home food is nothing much to ask for but rarely available and unreliable with the so-called home food options available currently, and the restaurants are unimaginable. With the current situation of virus-spread, everyone deserves a home-cooked healthy meal that does not compromise on hygiene levels. If you think only mom can cook that kind of food, we've got hundreds of mothers onboard for you. Our goal is to provide healthy homemade food prepared by home-chefs, just like your mom, to cook you a healthy, hygiene, and homemade meal, which can make your tummy happy and make you satisfied well-being.
                                    </p>
                                </div>{/*<!-- ends: .icon-box -->*/}
                            </div>{/*<!-- ends: .col-lg-3 -->*/}
                        
                        </div>
                    
                    </div>
                </div>{/*<!-- ends: .icon-boxes -->*/}
            </section>
            </div>
        </>
    );
}



export default Content;