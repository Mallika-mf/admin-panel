import React, { Fragment } from 'react';
import * as appconfig from "../config/Config";
import {NavLink} from 'react-router-dom';

class Download extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
        }
      
    }

    render() {

        return (
            <Fragment>
                <div className="card">
                <section class="download-app-area  p-top-55 p-bottom-50">
                    <div class="icon-boxes">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="card-body text-center">
                                        <div class=" icon-box-fourteen text-center">
                                            <img src="assets/img/xd/12@2x.png" height="350" class="img-responsive" alt="mothersfood" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="card-body text-center">
                                        <div class=" icon-box-fourteen text-center">
                                            <NavLink to='/'>
                                                <img src="assets/img/1logo.png" height="60" class="img-responsive" alt="mothersfood" />
                                            </NavLink>
                                        </div>
                                        <div class="icon-box-fourteen text-center">
                                            <h2 class="color-dark m-top-50 m-bottom-0 p-bottom-0 text-left">The Best Food Delivery App</h2>
                                            <p class="m-top-0 p-top-0 block-info-text">Now you can make food happen pretty much wherever you
                                            are thanks to the free easy-to-use Food Delivery & 
                                            Takeout App.</p>
                                            <div class="badges">
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                                        <a class="badge-link" href={appconfig.playstore} target="_blank">
                                                            <img src="assets/img/xd/awesome-google-play.png" alt="" /> 
                                                            <span>Download from Playstore</span>
                                                        </a>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                                        <a class="badge-link" href={appconfig.appstore} target="_blank">
                                                            <img src="assets/img/xd/awesome-apple.png" alt="" /> 
                                                            <span>Download from App Store</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>

            </Fragment>
        )

    }
}

export default Download;