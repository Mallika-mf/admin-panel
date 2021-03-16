import React, { Fragment, useState, useRef } from "react";
import styled from 'styled-components'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

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
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
    const FadeUp = batch(Fade(), Move(), Sticky());

    return (
        <Fragment>
            <svg className="Path_10" viewBox="13371.5 6882 1608.824 838.631">
                <path id="Path_10" d="M 13400.56640625 6945.46826171875 C 13400.56640625 6945.46826171875 13635.7109375 7379.34033203125 14053.9765625 7423.0400390625 C 14299.9150390625 7448.73486328125 14334.765625 7478.29052734375 14342.53125 7513.9072265625 C 14347.8681640625 7538.380859375 14352.74609375 7575.451171875 14352.74609375 7575.451171875 C 14352.74609375 7575.451171875 14363.2958984375 7700.51904296875 14439.6416015625 7717.83740234375 C 14399.41015625 7705.35205078125 14524.779296875 7770.5810546875 14740.6806640625 7608.2421875 C 15285.8828125 7198.30029296875 14730.2763671875 6882 14730.2763671875 6882 L 13371.5 6893.30615234375 L 13400.56640625 6945.46826171875 Z"></path>
            </svg>
            <div id="Component_1__1" className="Component_1___1">
                <svg className="Path_9" viewBox="13386 6882 1532.324 806.019">
                    <path id="Path_9" d="M 13400 6943 C 13400 6943 13626 7360 14028 7402 C 14264.3740234375 7426.69580078125 14297.8701171875 7455.10205078125 14305.3330078125 7489.33349609375 C 14310.462890625 7512.85546875 14315.1513671875 7548.484375 14315.1513671875 7548.484375 C 14315.1513671875 7548.484375 14325.2900390625 7668.6884765625 14398.6669921875 7685.33349609375 C 14360 7673.33349609375 14480.494140625 7736.02587890625 14688 7580 C 15212 7186 14678 6882 14678 6882 L 13386 6892 L 13400 6943 Z"></path>
                </svg>
            </div>
            <div className="intro-four bgimage">
                <div className="intro-four--contents content_above">
                    <div className="container">
                        <div className="row">
                            <div className="col-8 slider_left_section">
                                {/* <h1 className="display-3">Healthy, Hygienic, &amp; Home Food.</h1>
                                <p className="sub-title">Order food from the home-chefs near you.</p> */}
                                        <MDBCardTitle
                                            className="display-3"
                                            style={{
                                                 textAlign: "justify",
                                                fontWeight: "bold",
                                                marginTop: "-20%",
                                                fontSize: "60px",
                                                fontFamily: "Lemonada",
                                                color: "red",
                                            }}
                                        >
                                            Catering Service
                </MDBCardTitle>
                                <div className="widget-wrapper">
                                    <div className="search-widget">
                                    <ScrollContainer>
      <ScrollPage page={0}>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
          <span style={{ fontSize: "3em" }}>Let't me show you scroll animation 😀</span>
        </Animator>
      </ScrollPage>
      <ScrollPage page={1}>
        <Animator animation={ZoomInScrollOut}>
          <span style={{ fontSize: "3em" }}>I'm FadeUpScrollOut ✨</span>
        </Animator>
      </ScrollPage>
      <ScrollPage page={2}>
        <Animator animation={FadeUp}>
          <span style={{ fontSize: "3em" }}>I'm FadeUp ⛅️</span>
        </Animator>
      </ScrollPage>
      <ScrollPage page={3}>
        <div style={FlexCenterStyle}>
          <span style={{ fontSize: "3em" }}>
            <Animator animation={MoveIn(-1000, 0)}>Hello Guys 👋🏻</Animator>
            <Animator animation={MoveIn(1000, 0)}>Nice to meet you 🙋🏻‍♀️</Animator>- I'm Seonghyeok -
            <Animator animation={MoveOut(1000, 0)}>Good bye ✋🏻</Animator>
            <Animator animation={MoveOut(-1000, 0)}>See you 💛</Animator>
          </span>
        </div>
      </ScrollPage>
      <ScrollPage page={4}>
        <Animator animation={batch(Fade(), Sticky())}>
          <span style={{ fontSize: "3em" }}>Done</span>
          <span style={{ fontSize: "3em" }}>
            There's FadeAnimation, MoveAnimation, StickyAnimation, ZoomAnimation
          </span>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
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

        </Fragment>

    )

}
export default Catering;
