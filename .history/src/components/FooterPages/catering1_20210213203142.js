import React, { Fragment, useState, useRef } from "react";
import styled from 'styled-components'
import { MDBAnimation, MDBView, MDBCol } from "mdbreact";
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import TextLoop from "react-text-loop";

const Box = styled.div`
max-width: 70vw;
	padding: 30px;
	margin-top: 4%;
	position: relative;
	top: 50%;
	font-size: 30px;
	line-height: 1.5;
	transform: translateY(-50%);
	perspective: 400px;
`
const Catering = () => {


    return (
        <Fragment>
            <div className='card' style={{}}>
            <svg width="50%" height="100" style={{alignItem:"right"}}>
  <circle cx="60" cy="60" r="60"
  stroke="green" stroke-width="4" fill="yellow" /><h1>
Sorry, your browser does not support inline SVG.</h1>
</svg>
            {/* <svg className="Path_10" viewBox="13371.5 6882 1608.824 838.631">
                <path id="Path_10" d="M 13400.56640625 6945.46826171875 C 13400.56640625 6945.46826171875 13635.7109375 7379.34033203125 14053.9765625 7423.0400390625 C 14299.9150390625 7448.73486328125 14334.765625 7478.29052734375 14342.53125 7513.9072265625 C 14347.8681640625 7538.380859375 14352.74609375 7575.451171875 14352.74609375 7575.451171875 C 14352.74609375 7575.451171875 14363.2958984375 7700.51904296875 14439.6416015625 7717.83740234375 C 14399.41015625 7705.35205078125 14524.779296875 7770.5810546875 14740.6806640625 7608.2421875 C 15285.8828125 7198.30029296875 14730.2763671875 6882 14730.2763671875 6882 L 13371.5 6893.30615234375 L 13400.56640625 6945.46826171875 Z"></path>
            </svg>
            <div id="Component_1__1"  className="Component_1___1">
                <svg className="Path_9" viewBox="13386 6882 1532.324 806.019">
                    <path id="Path_9" d="M 13400 6943 C 13400 6943 13626 7360 14028 7402 C 14264.3740234375 7426.69580078125 14297.8701171875 7455.10205078125 14305.3330078125 7489.33349609375 C 14310.462890625 7512.85546875 14315.1513671875 7548.484375 14315.1513671875 7548.484375 C 14315.1513671875 7548.484375 14325.2900390625 7668.6884765625 14398.6669921875 7685.33349609375 C 14360 7673.33349609375 14480.494140625 7736.02587890625 14688 7580 C 15212 7186 14678 6882 14678 6882 L 13386 6892 L 13400 6943 Z"></path>
                </svg>
            </div> */}
            <div className="intro-four bgimage" style={{width:"100%",height:"200px",borderRadius:"0 0 100% 100%",backgroundImage:"url('../assets/img/cupcake.jpg')",marginRight:"-130px", textShadow: ".1em .1em rgba(0, 0, 0, 0.2)"}}>
                <div className="intro-four--contents content_above">
                    <div className="container">
                        <div className="row">
                            <div className="col-8 slider_left_section">
                                {/* <h1 className="display-3">Healthy, Hygienic, &amp; Home Food.</h1>
                                <p className="sub-title">Order food from the home-chefs near you.</p> */}
                                <MDBAnimation type="bounce">
            <MDBContainer style={{ marginLeft: "0%" }}>
              <MDBCard
                className="card-body"
                style={{
                  width: "60rem",
                  background: "transparent",
                  border: "none",
                }}
              >
                                        <MDBCardTitle
                                            className="display-3"
                                            style={{
                                                 textAlign: "justify",
                                                fontWeight: "bold",
                                                marginTop: "0%",
                                                fontSize: "60px",
                                                fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                                                color: " gray",
                                                textShadow: ".1em .1em rgba(0, 0, 0, 0.2)"
                                            }}
                                        >
                                            Catering Service
                </MDBCardTitle>
                <MDBCardText
                  className="animated flipInX  "
                 
                  style={{ fontSize: "30px",fontWeight: "bold",fontHeight:"10px", fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif" , textAlign: "justify",color:"gray" }}
                >
                <TextLoop interval={5000} noWrap={true} fade={true} mask={true}>
                    <div
                      style={{
                        fontSize: "30px",
                        
                        fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                        textAlign: "justify"
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                          textAlign: "justify",
                        }}
                      >
                        A major part of hospitality industry catering brings
                        <br />
                        together service and tasty food under one umbrella
                      </span>
                      </div>
                      <div
                      style={{
                        fontSize: "15px",
                        fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                        textAlign: "justify"
                      }}
                    >
                    
                    <span
                      style={{
                        fontSize: "15px",
                        fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                        textAlign: "justify",
                      }}
                    >
                      {" "}
                      Caterers play a very important role in any event be it a
                      small
                      <br />
                      get together or a wedding
                    </span>
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                        textAlign: "justify"
                      }}
                    >
                    <span
                      style={{
                        fontSize: "15px",
                        fontFamily: "Helvetica Neue', Helvetica, Arial, sans-serif",
                        textAlign: "justify",
                      }}
                    >
                      Catering services not only bring on table lip smacking
                      innovative
                      <br />
                      dishes but also play an important role with the <br />{" "}
                      presetation and serving of dishes
                    </span>
                    </div>
                  </TextLoop>
                  {/* <TextLoop interval={3000}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontFamily: "Lemonada",
                      textAlign: "justify",
                    }}
                  >
                    {" "}
                    <span>
                      Some quick example text to build on the panel title and
                      makeup the bulk of the panel's content
                    </span>
                  </div>
                  <div></div>
                  <div></div>
                </TextLoop> */}
                </MDBCardText>

                {/* <div className="flex-row" style={{ fontSize: "20px" }}>
                <a href="/contactus">Contact Us</a>
              </div> */}
              </MDBCard>
            </MDBContainer>
          </MDBAnimation>
                                <div className="widget-wrapper">
                                    <div className="search-widget">
                                
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 homepage-banner-section">
                                <img src="assets/img/xd/Food_2a.png" alt="mothersfood" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="blue" fill-opacity="1" d="M0,192L40,181.3C80,171,160,149,240,128C320,107,400,85,480,96C560,107,640,149,720,176C800,203,880,213,960,197.3C1040,181,1120,139,1200,122.7C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
</svg>
        </Fragment>

    )

}
export default Catering;
