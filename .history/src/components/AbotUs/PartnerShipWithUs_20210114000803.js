import React from 'react';


function Partnership() {
    return (
        <section class="become-member-area m-top-50 p-top-50 p-bottom-50" style={{marginTop:"5%"}}>
            <div class="icon-boxes">
                <div class="container">
                    <div class="row">
                        <div class="col-12 section-title text-center m-bottom-20">
                            <h4><b>Be a part of Mothers Food</b></h4>
                            <h2 class="theme-title"><b style={{color:"#B4031B"}}>Become a member!</b></h2>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6" style={{marginTop:"3%"}}>
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="icon-box-fourteen text-center">
                                        <div class="row">
                                            <div class="col-lg-4 col-md-4 col-sm-12">
                                                <img src="assets/img/xd/004-cooking@2x.png" height="100px" class="img-responsive" alt="mothersfood" />
                                            </div>
                                            <div class="col-lg-8 col-md-8 col-sm-12">
                                                <h6 class="color-dark m-top-5 m-bottom-0 p-bottom-0 block-title">Become a Partner</h6>
                                                <p class="m-top-0 p-top-0 block-info-text">Reach more customers 
                                                and more growth with us</p>
                                                <a href="/partnerwithus#registerwithus" className="btn btn-info btn-icon icon-right btn-find-food btn-danger" style={{ borderRadius: "50px",width:"100px"}}>For a Partner</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6" style={{marginTop:"3%"}}>
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="icon-box-fourteen text-center">
                                        <div class="row">
                                            <div class="col-lg-4 col-md-4 col-sm-12">
                                                <img src="assets/img/xd/delivery@2x.png" height="100px" className="img-responsive" alt="mothersfood" />
                                            </div>
                                            <div class="col-lg-8 col-md-8 col-sm-12">
                                                <h6 class="color-dark m-top-5 m-bottom-0 p-bottom-0 block-title">Become a Delivery Partner</h6>
                                                <p class="m-top-0 p-top-0 block-info-text">Reach more customers 
                                                and more growth with us</p>
                                                <a href="/ridewithus"  className="btn btn-info btn-icon icon-right  btn-danger" style={{ borderRadius: "50px",backgroundColor:"#B4031B" }}>For Delivery</a>
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
    );
}

export default Partnership;