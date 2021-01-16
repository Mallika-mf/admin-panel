/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";

const About = () => {
  const noAction = (e) => e.preventDefault();
  return (
    <Fragment>
      <section
        className="section-bg p-top-50 p-bottom-50"
        style={{ background: "#ffffff" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>
                <b>About MothersFood</b>
              </h1>
            </div>
            {/* <div className="col-md-12">
                                <h3>Men behind MothersFood</h3>
                                <p>Behind every successful man, there’s a woman. Meet our team of men who stands behind all those women:</p>
                            </div> */}
          </div>
          {/* 

                                <section className="flip-boxes p-top-50 p-bottom-40" style={{background:"#ffffff"}}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="flip-card">
                                                        <div className="flip-wrapper">
                                                            <div className="flip-front">
                                                                <div className="front-contents" style={{padding:"0"}}>
                                                                    <img src="./assets/img/g2.jpg" height="250px" alt="" />
                                                                    <h6 style={{color:"#E41C39"}}><b>Nagababu V</b></h6>
                                                                </div>
                                                                <div className="flip-overlay" />
                                                            </div>
                                                            <div className="flip-back">
                                                                <div className="back-contents">
                                                                    <p style={{color:"white"}}>After graduating, Nagababu established his own firms in tech and solar power. Now, to give a fresh start towards a new milestone and cure the craving for home food, he came up with MothersFood.</p>
                                                                    <NavLink to="/" className="btn btn-danger" data-toggle="modal" data-target="#modal-center1" style={{background:"white",border:"white",color:"black"}}>More Details</NavLink>
                                                                </div>
                                                                <div className="flip-overlay2" style={{background:"#E41C39"}} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6">
                                                    <div className="flip-card">
                                                        <div className="flip-wrapper">
                                                            <div className="flip-front">
                                                                <div className="front-contents" style={{padding:"0"}}>
                                                                    <img src="./assets/img/g2.jpg" height="250px" alt="" />
                                                                    <h6 style={{color:"#E41C39"}}><b>Revanth Ragam</b></h6>
                                                                </div>
                                                                <div className="flip-overlay" />
                                                            </div>
                                                            <div className="flip-back">
                                                                <div className="back-contents">
                                                                    <p style={{color:"white"}}>Revanth is one of the main pillars of MothersFood. Being in business for over 13 years now and serving the big-shots like GVK Biosciences, Alivira, you name any complex business structure, and he has a plan to tackle it.</p>
                                                                    <NavLink to="/" className="btn btn-danger" data-toggle="modal" data-target="#modal-center2" style={{background:"white",border:"white",color:"black"}}>More Details</NavLink>
                                                                </div>
                                                                <div className="flip-overlay2" style={{background:"#E41C39"}}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6">
                                                    <div className="flip-card">
                                                        <div className="flip-wrapper">
                                                            <div className="flip-front">
                                                                <div className="front-contents" style={{padding:"0"}}>
                                                                    <img src="./assets/img/g2.jpg" height="250px" alt="" />
                                                                    <h6 style={{color:"#E41C39"}}><b>Vicky Ramchandani</b></h6>
                                                                </div>
                                                                <div className="flip-overlay" />
                                                            </div>
                                                            <div className="flip-back">
                                                                <div className="back-contents">
                                                                    <p style={{color:"white"}}>Vicky is a Bhopal based entrepreneur who started his career as an Operational Manager in Dubai. After 5 years in Dubai, he moved back and founded Vidanvyi solutions India Pvt limited to give a platform to local handymen. </p>
                                                                    <NavLink to="/" className="btn btn-danger" data-toggle="modal" data-target="#modal-center3" style={{background:"white",border:"white",color:"black"}}>More Details</NavLink>
                                                                </div>
                                                                <div className="flip-overlay2" style={{background:"#E41C39"}} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                        </div>
                                    </section>

                                <div className="modal fade" id="modal-center1" tabIndex={-1} role="dialog" aria-labelledby="modal-centerLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="modal-centerLabel"><b>Nagababu V</b></h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p>After graduating in Electronics and Communication Engineering, Nagababu directly aimed high by establishing his own firm, PayMagic. With his experience, he got his feet on more responsible roles in other fields into tech and solar power. Now, to give a fresh start towards a new milestone and cure the craving for home food, he came up with MothersFood while empowering women with their skills of cooking delicious food.
                                                In a word, we'd love to call our beloved director as unstoppable.
                                            </p>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            
                            <div className="modal fade" id="modal-center2" tabIndex={-1} role="dialog" aria-labelledby="modal-centerLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="modal-centerLabel"><b>Revanth Ragam</b></h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Revanth is one of the main pillars of MothersFood. Being in business for over 13 years now and serving the big-shots like GVK Biosciences, Alivira, you name any complex business structure, and he has a plan to tackle it.
                                                    When he's not planning anything, there must be something exciting to look forward to. 
                                            </p>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="modal-center3" tabIndex={-1} role="dialog" aria-labelledby="modal-centerLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="modal-centerLabel"><b>Vicky Ramchandani</b></h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Vicky is a Bhopal based entrepreneur who started his career as an Operational Manager in Dubai. After 5 years in Dubai, he moved back and founded Vidanvyi solutions India Pvt limited to give a platform to local handymen. And now, it's time to empower all those women behind the kitchen as a co-founder of Mothers food. 
                                                In the end, his dedication to the job puts perfection in work.
                                            </p>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>

                       
                         */}
        </div>
      </section>

      <div className="how-it-works">
        <div className="heading">
          <h3>How It Works</h3>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
        <div className="container">
          <div class="how-it-works-item">
            <img src="" alt="img" width="150px" height="150px" />
            <h4>Explore Items</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
          </div>
          <div class="how-it-works-item">
            <img src="" alt="img" width="150px" height="150px" />
            <h4>Choose a Tasty Dish</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
          </div>
          <div class="how-it-works-item">
            <img src="" alt="img" width="150px" height="150px" />
            <h4>Track Your Order</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
          </div>
        </div>
      </div>

      {/* <section className="section-bg p-top-50 p-bottom-80" >
        <div className="card-style-nine">
            <div className="container">
                <div className="row">
                <div className="col-lg-12 section-title text-center">
                            <h3><b>MothersFood Values</b></h3>
                            <p>How often does your mom say ‘Don’t eat outside food’? Though we used to stroll her words, now it seems to be the best option. Isn’t it? But we all are habituated to ready-made food delivered by the time we reach. Then let us ask you some questions. Have you ever seen their kitchen? Do they maintain hygiene? Do they have fresh supplies of vegetables and groceries? We’re sure you don’t have an answer for this. Now let us say something about MothersFood and the values that we follow religiously:</p>
                        </div>
                        <div className="col-lg-12 section-title text-center">
                            <h3><b>How it works</b></h3>
                        </div>
                  <div className="col-lg-4 col-md-6">
                         <div className="card">
                                <div class="card-body text-center">
                                <img src="../assets/img/values1.png" width="80px" height="80px" className="img-responsive" alt="" />
                                <h6><NavLink to="/" onClick={noAction}><b>Consumer health</b></NavLink></h6>
                                <p>Your health is our priority, and what else is suitable other than a healthy-cooked home meal?<br/></p>
                             </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                         <div className="card">
                                <div class="card-body text-center">
                                <img src="../assets/img/values2.png" width="80px" height="80px" className="img-responsive" alt="" />
                                <h6><NavLink to="/" onClick={noAction}><b>Hygiene</b></NavLink></h6>
                                <p>We’ll give you the direct visuals of the kitchen and other supplies and you be the judge.<br/></p>
                             </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                         <div className="card">
                                <div class="card-body text-center">
                                <img src="../assets/img/values3.png" width="80px" height="80px" className="img-responsive" alt="" />
                                <h6><NavLink to="/" onClick={noAction}><b>Home-made</b></NavLink></h6>
                                <p>The magic of home-made food is delivered with “no clause &amp; conditions” at your doorstep.<br/></p>
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
                                <p>Have you got any problems, feedback, complaints with your food? We’re on the cover to take care of it.<br/></p>
                             </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                         <div className="card">
                                <div class="card-body text-center">
                                <img src="../assets/img/values5.png" width="80px" height="80px" className="img-responsive" alt="" />
                                <h6><NavLink to="/" onClick={noAction}><b>Health over money</b></NavLink></h6>
                                <p>Money can come and go, but health is the priority. Let us take care of it and everything else later.<br/></p>
                             </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                         <div className="card">
                                <div class="card-body text-center">
                                <img src="../assets/img/values6.png" width="80px" height="80px" className="img-responsive" alt="" />
                                <h6><NavLink to="/" onClick={noAction}><b>Best of best</b></NavLink></h6>
                                <p>You can’t settle for nothing less than best. Well, you don’t have to. Because we’re here to give you the best.<br/></p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>             */}

      <section className="features-area  p-top-20 p-bottom-20">
        <div className="icon-boxes">
          <div className="container">
            <div className="row" style={{ margin: "auto" }}>
              <div
                className="col-lg-12 col-md-12 col-sm-6"
                style={{ margin: "auto" }}
              >
                <h3 style={{ color: "#E41C39" }}>
                  <b>Women Empowerment - PAN India</b>
                </h3>
                <div className=" icon-box-fourteen ">
                  <p className="m-top-0 p-top-0">
                    <b>Mom, why is it taking so long to cook something?</b>
                    <br />
                    <b>
                      You sit all day at home, can't you cook a little faster or
                      didn't you think I'll come home hungry?
                    </b>
                    <br />
                    For all those who say these things to your mother, have you
                    ever given thought to what your mom wanted to become when
                    she was young? Despite anything, she settled down to take
                    care of your family without any complaint. Now the question
                    is if you are given a chance, will you be willing to provide
                    them with the identity that they always wanted? If yes,
                    MothersFood is your answer. <br />
                    <br />
                    If you ever stayed away from home, you might understand the
                    value of Home food. Are we wrong? You might have spent days
                    wishing for those excellent delicacies but went to sleep
                    with disappointment with something that you had at a
                    restaurant that is nowhere close to satisfy your tastebuds.
                    MothersFood is a food-delivery platform to bridge the gap
                    between people who crave for home food and chefs behind home
                    kitchens with their perfect and delicious dishes. We believe
                    that a woman who can run a family can run a business
                    effortlessly, and now we're taking a step towards giving a
                    push to all those women with a hidden interest in gaining
                    the identity that they deserve.
                    <br />
                    <br />
                    We understand how tough it is to manage a home along with a
                    business, but we want to do everything we could to make
                    their job easier. For example: If she has school-going kids,
                    she must be busy in the mornings and evenings, then she can
                    just work for 2 hours a day and skip weekends to
                    effortlessly manage family and job. Not only that, you don't
                    personally have to serve the customers or arrange for a
                    home-pickup or home-delivery options. We will provide you
                    with the driver-partners to collect food directly from the
                    kitchen and deliver it at the customer's doorstep. <br />
                    <br />
                    And one more exciting thing is, you don't have to have an
                    entire menu like restaurants. You can cook only a few items
                    that you excel in, even if it's just one dish. And we'll
                    take it out on a tasting-spree. Wait, wait, we're not done
                    yet. We also want you to save more while you earn more. Then
                    women of MothersFood get access to M-food, an online grocery
                    store where they can place the order for groceries for a
                    very better price compared to your local market. How do we
                    do that? We said we'll go up to any mark to make empowerment
                    easier for women, and we mean it. We directly made
                    connections with the brands for a great deal. <br />
                    <br />
                    Every mother is a great chef. But even the greatest chefs
                    have a special dish. Aren't they? We're out looking for
                    those dishes to make them more famous, instead of limiting
                    them to your family. A simple step can empower her with
                    something that she's already excelled in. We'll give the
                    mother the respect and identity that she deserves. Not just
                    in the family, but also in society.
                    <br />
                    <br />
                  </p>
                </div>
                {/*<!-- ends: .icon-box -->*/}
              </div>
              {/*<!-- ends: .col-lg-3 -->*/}
            </div>
          </div>
        </div>
        {/*<!-- ends: .icon-boxes -->*/}
      </section>

      <section className="features-area  p-top-20 p-bottom-20">
        <div className="icon-boxes">
          <div className="container">
            <div className="row" style={{ margin: "auto" }}>
              <div
                className="col-lg-12 col-md-12 col-sm-6"
                style={{ margin: "auto" }}
              >
                <h3 style={{ color: "#E41C39" }}>
                  <b>Healthy homemade food at your service:</b>
                </h3>
                <div className=" icon-box-fourteen ">
                  <p className="m-top-0 p-top-0">
                    Healthy home food is nothing much to ask for but rarely
                    available and unreliable with the so-called home food
                    options available currently, and the restaurants are
                    unimaginable. With the current situation of virus-spread,
                    everyone deserves a home-cooked healthy meal that does not
                    compromise on hygiene levels. If you think only mom can cook
                    that kind of food, we've got hundreds of mothers onboard for
                    you. Our goal is to provide healthy homemade food prepared
                    by home-chefs, just like your mom, to cook you a healthy,
                    hygiene, and homemade meal, which can make your tummy happy
                    and make you satisfied well-being.
                  </p>
                </div>
                {/*<!-- ends: .icon-box -->*/}
              </div>
              {/*<!-- ends: .col-lg-3 -->*/}
            </div>
          </div>
        </div>
        {/*<!-- ends: .icon-boxes -->*/}
      </section>
    </Fragment>
  );
};

export default About;
