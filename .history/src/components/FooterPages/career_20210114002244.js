import React, { Fragment } from 'react';
import {NavLink} from 'react-router-dom';
// import Header from '../layout/header/slider-header-2';
// import Footer from '../layout/footer/footer-dark-3';
// import Split from '../container/split/section-split';
// import Team from '../container/element/carousel/team-carousel-one';
const About = () => {

    function submit(){
        window.location="/apply";
    }

    return (

        <Fragment>
            
       
                 <section className="section-bg p-top-50 p-bottom-50" style={{background:"#ffffff"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center" style={{marginTop:"5%"}}>
                                <h2 style={{color:"#E41C39"}}><b>Together at MothersFood </b></h2>
                            </div>
                            <div className="col-md-12 text-center">
                                <h2><b>Change takes courage. Change takes time.<br/>Change takes effort.</b></h2>
                                <p style={{fontWeight:"600"}}>We believe in bringing change to the world by making it a better place for women. We need your support with that. If you’re ready to make that taboo of women empowerment transparent, where were you all these days? Let’s combine our hands and hearts towards making a difference and bring innovation to life.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="intro-four bgimage" style={{minHeight:"33.33333rem"}}>
                <div className="bg_image_holder">
                    <img src="./assets/img/team.png" alt="" />
                </div>
                <div className="intro-four--contents content_above">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h1 className="display-3" style={{color:"#E41C39"}}>Why Mothers Food?</h1>
                                    <div className="col-lg-6 offset-lg-3">
                                        <p className="text-justify " >Because you’ll be heard and supported. Building a new career is nothing less than making life, and we value it. And what if we say your career with us can bring a unique identity to hundreds of women behind the kitchen? If you’re excited after knowing us, let’s talk.</p>
                                    </div>
                              </div>
                        </div>
                    </div>
                </div>{/*<!-- ends: .intro-four-contents -->*/}
            </div>


            <li className="m-bottom-30"></li>
                           

                <section className="features-area  p-top-105 p-bottom-75" >
            <div className="icon-boxes">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 section-title">
                            <h2><b>Job Openings</b></h2>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                       
                                <div className=" icon-box-fourteen text-center">
                                <NavLink to="" data-toggle="modal" data-target="#modal-center">
                                    <img src="../assets/img/career1.png" alt="mothersfood"   className="img-responsive"></img>
                                    </NavLink>
                                </div>
                            
                        </div>
                       
                    </div>
                 
                </div>
            </div>{/*<!-- ends: .icon-boxes -->*/}
        </section>


        <div className="modal fade" id="modal-center" tabIndex={-1} role="dialog" aria-labelledby="modal-centerLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="modal-centerLabel"><b>Finance &amp; Accounts Manager</b></h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p>The ideal candidate will be involved with preparing financial reports and statements, bank reconciliations, and conducting cyclical audits. Moreover, the candidate must have strong interpersonal skills and possess a strong business acumen. <br/>
                                            <strong style={{color:"black"}}>Salary: 18K to 22K PM</strong></p>
                                            <p><strong style={{color:"black"}}>Responsibilities:</strong></p>
                                            <p>Create ad-hoc reports for various business needs
                                                Compile and analyze financial statements
                                                Manage budgeting and forecasting
                                                Complying with all company, local, state accounting and financial regulations.
                                                Compiling, analyzing, and reporting financial data.
                                                Creating periodic reports, such as balance sheets, profit &amp; loss statements, etc.
                                                Presenting data to managers, investors, and other entities.
                                                Maintaining accurate financial records.
                                                Performing audits and resolving discrepancies.
                                                Computing taxes.
                                                Keeping informed about current legislation relating to finance and accounting.
                                                Assisting management in the decision-making process by preparing budgets and financial forecastsCoordinating Finance and Accounting functions and programs.
                                                Preparing financial analyses and reports.
                                                Preparing revenue projections and forecasting expenditure.
                                                Assisting with preparing and monitoring budgets.
                                                Maintaining and reconciling balance sheet and general ledger accounts.
                                                Assisting with annual audit preparations.
                                                Investigating and resolving audit findings, account discrepancies, and issues of non-compliance.
                                                Preparing GST, TDS tax returns.
                                                Contributing to the development of new or amended accounting systems, programs, and procedures.
                                                Performing other accounting duties and supporting junior staff as required or assigned.</p>
                                                <p><strong style={{color:"black"}}>Qualifications:</strong></p>
                                                <p>Bachelor's degree in Accounting or related field
                                                    Ability to interpret and analyze financial statements and periodicals
                                                    Fluency in Microsoft Office suite (Outlook, Excel, Word, PowerPoint, etc.)</p>
                                                    <button className="btn btn-danger"  onClick={submit}  data-dismiss="modal">Apply Now</button>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>

        </Fragment>
    )
}

export default About;