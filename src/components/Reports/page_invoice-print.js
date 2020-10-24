import React, { useState,useEffect } from 'react';

import app from '../../data/base'
import {useHistory} from 'react-router-dom'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import logo from '../../assets/logo.png'

const PageInvoicePrint = () => {

return(
    <div>
    <div className="invoice-print p-5">
        <div className="card mb-4">
            <img src={logo} alt="MothersFood" height="80" width="250"/>
            <h2 className="card-header">Chef Registration Form</h2>
            </div>
            <div className="card-body">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="clearfix"></div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="form-row">
                       <div className="form-group col-md-6">
                            <label className="form-label">Home Chef registration Number</label>
                            <input type="text" id="sname" className="form-control" />
                            <div className="clearfix"></div>
                        </div>
                        <div className="col-md-3">           
                            <img src="" id="photoimage" className="img-responsive inline-block" width="150" height="150" />
                                    <div className="clearfix"></div>
                        </div>
                    </div>
                    <br/>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="clearfix"></div>
                            <h4>Personal Details</h4>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="form-row">

                       {/* <!-- <div className="form-group col-md-6">
                            <label className="form-label">Could Kitchen Name <span style={{color: "red"}}>*</span> </label>
                            <input type="text" id="kitchenname" className="form-control" placeholder="Cloud Kitchen Name">
                            <div className="clearfix"></div>
                        </div> --> */}
                        <div className="form-group col-md-6">
                            <label className="form-label">Full Name <span style={{color: "red"}}>*</span></label>
                            <input type="text"  id="name" className="form-control" placeholder="Full Name"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-2">
                            <label className="form-label">Age <span style={{color: "red"}}>*</span></label>
                            <input type="number" id="age" className="form-control" placeholder="Age"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Father/Husband Name <span style={{color: "red"}}>*</span></label>
                            <input type="text" id="father" className="form-control" placeholder="Father/Husband Name"/>
                            <div className="clearfix"></div>
                        </div>

                        <div className="form-group col-md-4">
                            <label className="form-label">Kitchen Name <span style={{color: "red"}}>*</span></label>
                            <input type="text" id="kname" className="form-control" placeholder="Kitchen Name"/>
                            <div className="clearfix"></div>
                            </div>
                    </div>

                    <div className="form-row">
                       
                        <div className="form-group col-md-4">
                            <label className="form-label">Gender <span style={{color: "red"}}>*</span></label>
                            {/* <!-- <p id = "gender">35</p> --> */}
                            <input type="text" id="gender" className="form-control" placeholder="Kitchen Name"/>
                           {/* <!-- <select className="form-control" id="gender">
                               <option value="Select">Select</option>
                               <option value="Male">Male</option>
                               <option value="Female">Female</option>
                               <option value="Transgender">Transgender</option>
                           </select> --> */}
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Email Id <span style={{color: "red"}}>*</span></label>
                            <input type="email" id="email" className="form-control" placeholder="Email Id"/>
                            <div className="clearfix"></div>
                        </div>

                      
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="form-label">Mobile Number <span style={{color: "red"}}>*</span></label>
                            <input type="number" id="mobilenumber" className="form-control" placeholder="Mobile Number"/>
                            <div className="clearfix"></div>
                        </div>



                        <div className="form-group col-md-6">
                            <label className="form-label">Alternate Mobile Number/Emergency Number</label>
                            <input type="number" id="anumber" className="form-control" placeholder="Mobile Number"/>
                            <div className="clearfix"></div>
                        </div>
                       
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                        <label className="form-label">Address <span style={{color: "red"}}>*</span></label>
                        <input type="text" id="address" className="form-control" placeholder="Address"/>
                        <div className="clearfix"></div>
                        </div>
                    </div>
                   <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="form-label">City <span style={{color: "red"}}>*</span></label>
                        <input type="text" id="city1" className="form-control"/>
                        <select id="city" className="form-control" style={{display: "none"}}>
                            <option value="Select">Select</option>
                            </select>
                         <div className="clearfix"></div>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="form-label">Zone <span style={{color: "red"}}>*</span></label>
                        <input type="text" id="locality1" className="form-control"/>
                        <select id="locality" className="form-control" style={{display: "none"}}>
                            <option value="Select">Select</option>
                            </select>
                         <div className="clearfix"></div>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="form-label">Locality <span style={{color: "red"}}>*</span></label>
                        <input type="text" id="sublocality1" className="form-control"/>
                        <select id="sublocality" className="form-control" style={{display: "none"}}>
                            <option value="Select">Select</option>
                            </select>
                         <div className="clearfix"></div>
                    </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">State <span style={{color: "red"}}>*</span></label>
                            <input type = "text" id = "state" className = "form-control"/>
                            {/* <!-- <select id="state" className="form-control "><option value="SELECT STATE">SELECT STATE</option><option value="Andhra Pradesh">Andhra Pradesh</option><option value="Arunachal Pradesh">Arunachal Pradesh</option><option value="Assam">Assam</option><option value="Bihar">Bihar</option><option value="Chhattisgarh">Chhattisgarh</option><option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option><option value="Daman and Diu">Daman and Diu</option><option value="Delhi">Delhi</option><option value="Goa">Goa</option><option value="Gujarat">Gujarat</option><option value="Haryana">Haryana</option><option value="Himachal Pradesh">Himachal Pradesh</option><option value="Jammu and Kashmir">Jammu and Kashmir</option><option value="Jharkhand">Jharkhand</option><option value="Karnataka">Karnataka</option><option value="Kerala">Kerala</option><option value="Madhya Pradesh">Madhya Pradesh</option><option value="Maharashtra">Maharashtra</option><option value="Manipur">Manipur</option><option value="Meghalaya">Meghalaya</option><option value="Mizoram">Mizoram</option><option value="Nagaland">Nagaland</option><option value="Orissa">Orissa</option><option value="Puducherry">Puducherry</option><option value="Punjab">Punjab</option><option value="Rajasthan">Rajasthan</option><option value="Sikkim">Sikkim</option><option value="Tamil Nadu">Tamil Nadu</option><option value="Telangana">Telangana</option><option value="Tripura">Tripura</option><option value="Uttar Pradesh">Uttar Pradesh</option><option value="Uttarakhand">Uttarakhand</option><option value="West Bengal">West Bengal</option></select> --> */}
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-2">
                            <label className="form-label">Zip <span style={{color: "red"}}>*</span></label>
                            <input type="number" id="zipcode" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-4" style={{display: "none"}}>
                            <button type="button" id="getcoord" className="btn btn-primary">Get Location Co-ordiantes *</button>
                            <p id="coord">Location Co-ordidates</p>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-8">
                            <label className="form-label">Specialized Dishes <span style={{color: "red"}}>*</span></label>
                            <input type="text" id="special" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>



                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Kitchen Open <span style={{color: "red"}}>*</span> </label>
                            <input type="time" id="otime" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Kitchen Close <span style={{color: "red"}}>*</span> </label>
                            <input type="time" id="ctime" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Chef Description  </label>
                            <input type="text" id="desc" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Ingredients Brands  </label>
                            <input type="text" id="brand" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Reference 1 Name </label>
                            <input type="text" id="referencename1" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Reference 1 Address </label>
                            <input type="text" id="referenceaddress1" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Reference 1 Mobile Number</label>
                            <input type="number" id="referencenumber1" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Reference 2 Name </label>
                            <input type="text" id="referencename2" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Reference 2 Address </label>
                            <input type="text" id="referenceaddress2" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Reference 2 Mobile Number</label>
                            <input type="number" id="referencenumber2" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <br/>
                    <br/>


                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="clearfix"></div>
                            <h4>Bank Account Details</h4>
                            <div className="clearfix"></div>
                        </div>
                    </div>



                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Bank Account Name <span style={{color: "red"}}>*</span> </label>
                            <input type="text" id="accountname" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Bank Account Number <span style={{color: "red"}}>*</span> </label>
                            <input type="text" id="accountnumber" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Bank IFSC code <span style={{color: "red"}}>*</span></label>
                            <input type="text" id="ifsccode" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Branch Name  <span style={{color: "red"}}>*</span></label>
                            <input type="text" id="branchname" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4" >
                            <label className="form-label">Branch Address <span style={{color: "red"}}>*</span> </label>
                            <input type="text" id="branchaddress" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4" style={{display: "none"}}>
                            <label className="form-label">Remarks <span style={{color: "red"}}>*</span> </label>
                            <input type="text" id="remarks" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>

                    <br/>
                    <br/>


                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="clearfix"></div>
                            <h4>OnBoarding Details</h4>
                            <div className="clearfix"></div>
                        </div>
                    </div>

                    <div className="form-row">

                        <div className="form-group col-md-6">
                             <label className="form-label">Select OnBoard Membership Type <span style={{color: "red"}}>*</span> </label>
                             <select className="form-control" id="membership">
                                 <option value="Select">Select</option>
                                 <option value="Free">Free Package</option>
                                 <option value="Bronze">Bronze Package</option>
                                 <option value="Silver">Silver Package</option>
                                 <option value="Gold">Gold Package</option>
                                 <option value="Custom">Custom Package</option>
                             </select>
                             <div className="clearfix"></div>
                         </div>
                     </div>

                <div className="form-row" id="subscription" style={{display: "none"}}>
                        <div className="form-group col-md-4">
                            <label className="form-label">Subscription Amount<span style={{color: "red"}}>*</span> </label>
                            <input type="number" id="samount" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">Start Date <span style={{color: "red"}}>*</span> </label>
                            <input type="date" id="sdate" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label">End Date <span style={{color: "red"}}>*</span></label>
                            <input type="date" id="edate" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                    </div>


                    <div className="form-row" id="commission" style={{display: "none"}}>
                        <div className="form-group col-md-4">
                            <label className="form-label">Enter Commision Percentage <span style={{color: "red"}}>*</span> </label>
                            <input type="number" id="commision" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>

                    </div>

                    

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Enter Referral Code </label>
                            <input type="text" id="referral" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                       
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Master Working Partner  ID  </label>
                            <input type="text" id="agency1" className="form-control" />
                            <select id="agency" className="form-control" style={{display: "none"}}>
                                <option value="Select">Select</option>
                            </select>
                            <div className="clearfix"></div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="form-label">Auditor Ratings (0-10)  <span style={{color: "red"}}>*</span></label>
                            <input type="number" id="aratings" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-8" >
                            <label className="form-label">Auditor Review <span style={{color: "red"}}>*</span> </label>
                            <input type="text" id="areview" className="form-control"/>
                            <div className="clearfix"></div>
                        </div>
                       
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <input type="checkbox" id="veg" /> Veg Only 
                            <div className="clearfix"></div>
                        </div>

                        <div className="form-group col-md-4">
                            <input type="checkbox" id="catering" /> Catering Service 
                            <div className="clearfix"></div>
                        </div>
                      
                    </div>

                    <br/><br/>

                    <div className="form-row">
                        <p>I, hereby consent to my personal data being processed by MothersFood for
                            Home Chef Registration</p>
                    </div>

                    <br/><br/>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <h6>CUSTOMER SIGNATURE</h6>
                            <p>DATE:</p>
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            {/* <!-- <label className="form-label">Start Date <span style={{color: "red"}}>*</span> </label>
                            <input type="date" id="sdate" className="form-control"> --> */}
                            <div className="clearfix"></div>
                        </div>
                        <div className="form-group col-md-4">
                            <h6>MARKETTING EXECUTIVE</h6>
                            <p>Name And Signature</p>
                            <div className="clearfix"></div>
                        </div>
                    </div>
            </div>
        </div>
 
    </div>
    
)
}
export default PageInvoicePrint