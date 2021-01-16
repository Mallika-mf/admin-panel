import React, { Fragment } from 'react';
// import { NavLink } from 'react-router-dom';
// import Header from '../layout/header/slider-header-2';
// import Footer from '../layout/footer/footer-dark-3';
// import {AccordianOne} from '../content/element/accordians/accordians';

const noAction = e => e.preventDefault();
const Project = () => {
    return (
        <Fragment>

           {/* <Header/> */}
            <section className="section-bg p-top-100 p-bottom-110">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="mb-5">
                                <div className="divider divider-simple text-center" style={{marginTop:"7%"}}>
                                    <h1 style={{fontWeight:340}}><b>Refund &amp; Cancellation</b></h1>
                                </div>
                            </div>
                        </div>{/*<!-- ends: .col-lg-12 -->*/}
                    </div>


                <div className="post-details">
               
                <div className="post-content">
                    <div className="post-header" style={{textAlign:"justify"}}>
                        <h3 style={{fontWeight:340,textAlign:"justify"}}><b>CANCELLATIONS AND REFUNDS</b></h3>
                    </div>
                    <div className="post-body">
                        <h4 style={{fontWeight:340,textAlign:"justify"}}><b>1. CANCELLATION</b></h4>
                        <div className="m-bottom-40">
                            <ol className="bullet--list2">
                                <li style={{textAlign:"justify"}} className="menu-listt">As a general rule you shall not be entitled to cancel your order once you have received confirmation of the same. If you cancel your order after it has been confirmed, Mothers Kitchens shall have a right to charge you cancellation fee of a minimum INR 75 upto the order value, with a right to either not to refund the order value or recover from your subsequent order, the complete/ deficit cancellation fee, as applicable, to compensate our restaurant and delivery partners.</li>
                                <li style={{textAlign:"justify"}} className="bullet_list">Mothers Kitchens shall also have right to charge you cancellation fee for the orders cancelled by Mothers Kitchens for the reasons specified under clause 1(iv) of this cancellation and refunds policy. In case of cancellations for the reasons attributable to Mothers Kitchens or its restaurant and delivery partners, Mothers Kitchens shall not charge you any cancellation fee.</li>
                                <li style={{textAlign:"justify"}} className="bullet_list">However, in the unlikely event of an item on your order being unavailable, we will contact you on the phone number provided to us at the time of placing the order and inform you of such unavailability. In such an event you will be entitled to cancel the entire order and shall be entitled to a refund in accordance with our refund policy.</li>
                                <li style={{textAlign:"justify"}} className="bullet_list">We reserve the sole right to cancel your order in the following circumstance:
                                <ol className="number-list number--list1">
                                    <li style={{textAlign:"justify"}} className="numbers-decimal">in the event of the designated address falls outside the delivery zone offered by us;</li>
                                    <li style={{textAlign:"justify"}} className="numbers-decimal">failure to contact you by phone or email at the time of confirming the order booking;</li>
                                    <li style={{textAlign:"justify"}} className="numbers-decimal">failure to deliver your order due to lack of information, direction or authorization from you at the time of delivery; or</li>
                                    <li style={{textAlign:"justify"}} className="numbers-decimal">unavailability of all the items ordered by you at the time of booking the order; or</li>
                                    <li style={{textAlign:"justify"}} className="numbers-decimal">unavailability of all the items ordered by you at the time of booking the order; or</li>
                            </ol>
                                    </li>
                            </ol>{/*<!-- ends: .bullet--list2 -->*/}
                        </div>
                    </div>


          
                    <div className="post-body">
                        <h4><b>2. REFUNDS</b></h4>
                        <div className="m-bottom-40">
                        <ol className="bullet--list2">
                                <li style={{textAlign:"justify"}} className="bullet_list">You shall be entitled to a refund only if you pre-pay for your order at the time of placing your order on the Platform and only in the event of any of the following circumstances:
                                <ol className="number-list number--list1">
                                    <li style={{textAlign:"justify"}} className="numbers-decimal">your order packaging has been tampered or damaged at the time of delivery;</li>
                                    <li style={{textAlign:"justify"}} className="numbers-decimal">us cancelling your order due to (A) your delivery location following outside our designated delivery zones; (B) failure to contact you by phone or email at the time of confirming the order booking; or (C) failure to contact you by phone or email at the time of confirming the order booking; or</li>
                                    <li style={{textAlign:"justify"}} className="numbers-decimal">You cancelling the order at the time of confirmation due to unavailability of the items you ordered for at the time of booking.</li>
                                </ol>
                                </li>
                                <li style={{textAlign:"justify"}} className="bullet_list">Our decision on refunds shall be at our sole discretion and shall be final and binding.</li>
                                <li style={{textAlign:"justify"}} className="bullet_list">All refund amounts shall be credited to your account within 3-4 business days in accordance with the terms that may be stipulated by the bank which has issued the credit / debit card.</li>
                                    <div className="table-responsive">
                                <table className="table table-one">
                                        <thead className="table-danger table-danger--darken" style={{backgroundColor:"#E41C39",color:"#ffffff"}}>
                                        <tr>
                                        <td >
                                        <p><strong>Process</strong></p>
                                        </td>
                                        <td >
                                        <p><strong>Payment Method</strong></p>
                                        </td>
                                        <td >
                                        <p><strong>Refund Source</strong></p>
                                        </td>
                                        <td >
                                        <p><strong>TAT</strong></p>
                                        </td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        <td rowspan="10" >
                                        <p>Order Edit/Cancellation/Compensation/Payment Failure</p>
                                        </td>
                                        <td >
                                        <p>Net Banking</p>
                                        </td>
                                        <td >
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>5-7 Business Days</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td >
                                        <p>Debit/Credit Cards</p>
                                        </td>
                                        <td >
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>4-7 Business Days</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td >
                                        <p>UPI</p>
                                        </td>
                                        <td>
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>2-4 Business Days</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td >
                                        <p>Amazon Pay (Wallet)</p>
                                        </td>
                                        <td>
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>5 Business Days</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td >
                                        <p>Amazon Pay (CC/DC/NB)</p>
                                        </td>
                                        <td>
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>5 Business Days</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td >
                                        <p>Phone Pe (Wallet)</p>
                                        </td>
                                        <td>
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>5 Business Days</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td >
                                        <p>Phone Pe (CC/DC/NB)</p>
                                        </td>
                                        <td>
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>5 Business Days</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td >
                                        <p>Wallets-Paytm / Mobikwik /</p>
                                        <p>Freecharge</p>
                                        </td>
                                        <td>
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>1 Hour</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td >
                                        <p>Lazy Pay</p>
                                        </td>
                                        <td>
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>1 Hour</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td >
                                        <p>Sodexo</p>
                                        </td>
                                        <td>
                                        <p>Source</p>
                                        </td>
                                        <td >
                                        <p>5 Business Days</p>
                                        </td>
                                        </tr>
                                        </tbody>
                                </table>
                                </div>
                            </ol>
                        </div>
                    </div>


                    <div className="post-body">
                        <h4><b>3. In case of payment at the time of delivery, you will not be required to pay for:</b></h4>
                        <div className="m-bottom-40">
                            <ol className="bullet--list2">
                                <li style={{textAlign:"justify"}} className="bullet_list">orders where the packaging has been tampered or damaged by us;</li>
                                <li style={{textAlign:"justify"}} className="bullet_list">wrong order being delivered; or</li>
                                <li style={{textAlign:"justify"}} className="bullet_list">Items missing from your order at the time of delivery. </li>
                                <li style={{textAlign:"justify"}} className="bullet_list">If food is not fresh or quality issue</li>
                            </ol>{/*<!-- ends: .bullet--list2 -->*/}
                        </div>
                    </div>


                </div>
            </div>{/*<!-- ends: .post-details -->*/}
            

                </div>

            </section>{/*<!-- ends: .section-padding-sm -->*/}
            {/* <Footer /> */}
        </Fragment>
    )
}

export default Project;