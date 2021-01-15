import React, { Fragment } from 'react';
// import Header from '../layout/header/singlePageHeader';
// import Footer from '../layout/footer/footer-dark-3';
// import { ApplicationForm } from '../content/element/form/registration';
import SimpleReactValidator from 'simple-react-validator';
import FontAwesome from '../common/FontAwesome';
import firebase from '../Firebase';

class GeneralRules extends React.Component{

  constructor (props) {
      super (props)
      this.state = {
          fname:'',
          lname:'',
          email:'',
          mobilenumber:'',
          address:'',
          city:'',
          state:'',
          companyname:'',
          title:'',
          skills:'',
          photo:'',
          universityname:'',
          degree:'',
          gpa:'',
          resume:'',
          additional:''
      }
      this.validator = new SimpleReactValidator();
  }

  setStateFromInput = (event) => {
      var obj = {};
      obj[event.target.name] = event.target.value;
      this.setState(obj);
  }

  componentDidMount(){
       this.setState(this.props.location.data)
  };


  
  
 
 
  photoupload = e =>{
        
       if(e.target.files[0] === 0){
          alert("Add Photo ");
          return;
      }
     
      const ref = firebase.storage().ref("/Resumes/");
      const file = e.target.files[0];
      const name = e.target.files[0] + Date();
      const metadata = {
      contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
          var obj={};
          obj["photo"] = url
          this.setState(obj);
      })
      .catch(console.error);
              
  }


  resumeupload = e =>{
        
    if(e.target.files[0] === 0){
       alert("Add Resume ");
       return;
   }
  
   const ref = firebase.storage().ref("/Resumes/");
   const file = e.target.files[0];
   const name = e.target.files[0] + Date();
   const metadata = {
   contentType: file.type
   };
   const task = ref.child(name).put(file, metadata);
   task
   .then(snapshot => snapshot.ref.getDownloadURL())
   .then((url) => {
       var obj={};
       obj["resume"] = url
       this.setState(obj);
   })
   .catch(console.error);
           
}

  render(){


    //   var style = {};
      const self= this
     


      function submit(){

          let data = self.state;

          if(data.fname === ""){
              alert("Enter First Name");
              return;
          }

          if(data.lname === ""){
            alert("Enter Last Name");
            return;
        }

          if(data.email === ""){
              alert("Enter Email Id");
              return;
          }
        

          if(data.mobilenumber === ""){
              alert("Enter Mobile Number");
              return;
          }

          if(data.mobilenumber.length < 10){
              alert("Enter Proper Mobile Number");
              return;
          }

          if(data.address === ""){
              alert("Enter Address");
              return;
          }

          if(data.city === ""){
              alert("Enter City");
              return;
          }

          if(data.state === ""){
              alert("Select State");
              return;
          }

          if(data.title === ""){
            alert("Enter Professional Title");
            return;
          }

          if(data.skills === ""){
            alert("Enter Skills");
            return;
          }

          if(data.universityname === ""){
            alert("Enter University Name");
            return;
          }

          if(data.degree === ""){
            alert("Enter Degree Level");
            return;
          }

          if(data.gpa === ""){
            alert("Enter GPA");
            return;
          }

          if(data.resume === ""){
            alert("Upload Resume");
            return;
          }


          var now = new Date();
          var day = ("0" + now.getDate()).slice(-2);
          var month = ("0" + (now.getMonth() + 1)).slice(-2);
          var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
          const ref = firebase.database().ref().child("Referrals").child("Resumes").push();
          ref.child("PushId").set(ref.getKey())
          ref.child("FName").set(self.state.fname)
          ref.child("LName").set(self.state.lname)
          ref.child("Email").set(self.state.email)
          ref.child("MobileNumber").set(self.state.mobilenumber)
          ref.child("Address").set(self.state.address)
          ref.child("City").set(self.state.city)
          ref.child("State").set(self.state.state)
          ref.child("CompanyName").set(self.state.companyname)
          ref.child("Title").set(self.state.title)
          ref.child("Skills").set(self.state.skills)
          ref.child("Photo").set(self.state.photo)
          ref.child("UniversityName").set(self.state.universityname)
          ref.child("Degree").set(self.state.degree)
          ref.child("GPA").set(self.state.gpa)
          ref.child("Resume").set(self.state.resume)
          ref.child("Additional").set(self.state.additional)
          ref.child("Position").set("Finance & Accounts Manager")
          ref.child("Created").set(today);                 
          
          data.fname="";
          data.lname="";
          data.email="";
          data.mobilenumber="";
          data.address="";
          data.city="";
          data.state="";
          data.companyname="";
          data.title="";
          data.skills="";
          data.photo="";
          data.universityname="";
          data.degree="";
          data.gpa="";
          data.resume="";
          data.additional="";

                                

          document.getElementById("create-course-form").reset();
  
          alert("Dear Applicant , We’ve received your resume to be a part  with MothersFood. Our team will soon get in touch with you to process your application.");

                // window.location.reload(false);
                      
        } 

      return(

        
        <Fragment> 
            {/* <Header pageTitle='Submit Resume &amp; Apply'/> */}
            <div className="card ">
            <section className="apply-form p-top-100 p-bottom-110">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="apply-form--header " >
                                <h3>Apply For This Position</h3>
                                <p>Submit your resume below to apply for the job.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h4 className="border-bottom p-bottom-25 mb-40">Personal Information</h4>
          <form id="create-course-form">   
            <div className="form-group" style={{ textAlign: "justify" }} >
              <label >First Name<span className="sup" style={{color:"red"}}>*</span></label>
              <input type="text"  name="fname" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="First Name" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Last Name<span className="sup" style={{color:"red"}}>*</span></label>
              <input type="text" name="lname" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="Last Name" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Email Address<span className="sup" style={{color:"red"}}>*</span></label>
              <input type="email" name="email" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="Email" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Mobile Number<span className="sup" style={{color:"red"}}>*</span></label>
              <input type="text" name="mobilenumber" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="Mobile Number" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Address <span className="sup" style={{color:"red"}}>*</span></label>
              <input type="text" name="address" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="Address" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>City <span className="sup" style={{color:"red"}}>*</span></label>
              <input type="text" name="city" className="form-control" style={{ textAlign: "justify" }}  onChange={this.setStateFromInput} placeholder="City" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>State <span className="sup" style={{color:"red"}}>*</span></label>
              <div className="select-basic">
              <select id="state" name="state" onChange={this.setStateFromInput} class="form-control "><option value="SELECT STATE">SELECT STATE</option><option value="Andhra Pradesh">Andhra Pradesh</option><option value="Arunachal Pradesh">Arunachal Pradesh</option><option value="Assam">Assam</option><option value="Bihar">Bihar</option><option value="Chhattisgarh">Chhattisgarh</option><option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option><option value="Daman and Diu">Daman and Diu</option><option value="Delhi">Delhi</option><option value="Goa">Goa</option><option value="Gujarat">Gujarat</option><option value="Haryana">Haryana</option><option value="Himachal Pradesh">Himachal Pradesh</option><option value="Jammu and Kashmir">Jammu and Kashmir</option><option value="Jharkhand">Jharkhand</option><option value="Karnataka">Karnataka</option><option value="Kerala">Kerala</option><option value="Madhya Pradesh">Madhya Pradesh</option><option value="Maharashtra">Maharashtra</option><option value="Manipur">Manipur</option><option value="Meghalaya">Meghalaya</option><option value="Mizoram">Mizoram</option><option value="Nagaland">Nagaland</option><option value="Orissa">Orissa</option><option value="Puducherry">Puducherry</option><option value="Punjab">Punjab</option><option value="Rajasthan">Rajasthan</option><option value="Sikkim">Sikkim</option><option value="Tamil Nadu">Tamil Nadu</option><option value="Telangana">Telangana</option><option value="Tripura">Tripura</option><option value="Uttar Pradesh">Uttar Pradesh</option><option value="Uttarakhand">Uttarakhand</option><option value="West Bengal">West Bengal</option></select>
              </div>
            </div>{/* ends: .form-group */}
          
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Company Name</label>
              <input type="text" name="companyname" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="Company Name" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Professional Title <span className="sup" style={{color:"red"}}>*</span></label>
              <input type="text" name="title" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="e.g. Web Developer" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Skills <span className="optional">(Optional)</span> <span className="sup" style={{color:"red"}}>*</span></label>
              <input type="text" name="skills" className="form-control" style={{ textAlign: "justify" }}  onChange={this.setStateFromInput} placeholder="Comma separate a list of relevant skills" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Photo <span className="optional">(Optional)</span></label>
              <div style={{ textAlign: "justify" }} className="custom-photo-upload">
                <input name="photo"   ref={this.state.photo} onChange={this.photoupload} type="file" className="custom-upload" />
                {/* <div className="custom-upload-box d-flex">
                  <div className="image-box">
                    {/* <span className="icon"><FontAwesome icon="fas fa-image" /></span>
                    <span className="file-name"><FontAwesome icon="la la-plus" /> Add Image</span> */}
                  {/* </div>
                 
                </div> */} 
              </div>
            </div>{/* ends: .form-group */}
            <h4 className="border-bottom p-bottom-25 m-bottom-50 m-top-70">Academic Information</h4>
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>University Name <span className="sup" style={{color:"red"}}>*</span></label>
              <input type="text" name="universityname" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="University / School Name" />
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Degree Level <span className="sup" style={{color:"red"}}>*</span></label>
              <div className="select-basic" >
                <input type="text" name="degree" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="Highest Degree Qualified" />
              </div>
            </div>{/* ends: .form-group */}
            <div className="form-group" style={{ textAlign: "justify" }}>
              <label>Grade Point Average <span className="sup" style={{color:"red"}}>*</span></label>
              <input type="text" name="gpa" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  required placeholder="Grade Point" />
            </div>{/* ends: .form-group */}
            <h4 className="border-bottom p-bottom-25 m-bottom-50 m-top-70">Add Resume<span className="sup" style={{color:"red"}}>*</span></h4>
            <div className="form-group" style={{ textAlign: "justify",marginTop:"5%" }}>
              <div className="custom-upload" style={{ textAlign: "justify" }}>
              <label htmlFor="upload-button">
   
            <span  className="btn btn-danger btn-icon icon-right" style={{background:"#E41C39",border:"#E41C39",height:"200px"}}>Choose Resume <FontAwesome icon="fas fa-cloud-upload-alt" /></span>
            <span style={{marginLeft:"25%"}}>PDF,Docs </span>
                    <span >Max File Size: 5Mb</span>         
      </label>
                <input  type="file" id="upload-button" name="resume" ref={this.state.resume} style={{display:"none"}}  onChange={this.resumeupload} className="custom-upload" required/>
                {/* <div className="custom-upload-box d-flex">
                  <div className="upload-btn">
                    <a href=' ' className="btn btn-danger btn-icon icon-right" style={{background:"#E41C39",border:"#E41C39"}}>Choose Resume <FontAwesome icon="la la-cloud-upload" /></a>
                  </div>
                  <div className="upload-info">
                    <span>PDF,Docs</span>
                    <span>Max File Size: 5Mb</span>
                  </div>
                </div> */}
              </div>
            </div>{/* ends: .form-group */}
            {/* <h4 className="border-bottom p-bottom-25 m-bottom-50 m-top-70">Social Profiles <span className="optional">(Optional)</span></h4>
            <ul className="d-flex social-btns">
              <li><a href=' ' className="btn btn-facebook"><span className="fab fa-facebook-f" /> Facebook</a></li>
              <li><a href=' ' className="btn btn-twitter"><span className="fab fa-twitter" /> Twitter</a></li>
              <li><a href=' ' className="btn btn-linkedin"><span className="fab fa-linkedin-in" /> Linkedin</a></li>
              <li><a href=' ' className="btn btn-gplus"><span className="fab fa-google-plus-g" /> Google</a></li>
            </ul> */}
          </form>

            <h4 className="border-bottom p-bottom-25 m-bottom-50 m-top-70">Additional Messages</h4>
            <input type="text" name="additional" onChange={this.setStateFromInput} className="form-control" style={{ textAlign: "justify" }}  placeholder="Any other information you want to tell us" />
            <div className="btns m-top-50">
              <button type="submit" onClick={submit} className="btn btn-danger m-right-25" style={{background:"#E41C39",border:"#E41C39"}}>Apply Now</button>
            </div>
        </div>
      </div>{/* end: .row */}
    </div>
 
            </section>{/* ends: section */}
            </div>
            {/* <Footer /> */}
        </Fragment>
    
      )
  }

  
}




export default GeneralRules;