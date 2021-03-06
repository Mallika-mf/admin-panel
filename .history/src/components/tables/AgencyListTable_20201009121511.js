import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb';
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button,Input} from "reactstrap";
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import {useHistory,Link} from 'react-router-dom'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore'
import * as firebase from "firebase/app";
import axios from 'axios'
import app, {storage} from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const AgencyListTable = () => {
  const [show,setShow] = useState(true)
    const [searchTerm, setSearchTerm]=useState("")
    const [users,setUsers] = useState([])
    const [cityName,setCityName] = useState([])
    const [cityPushId,setCityPushId] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()
    const [buttonHide,setButtonHide] = useState(false)
    const [searchName,setSearchName] = useState("")
    const [agencyName,setAgencyName]=useState("")   
    const [emailID,setEmailID]=useState("")
    const [deliveryBaseKm,setDeliveryBaseKm]=useState("")
    const [selectWorkingCity,setSelectWorkingCity]=useState("")
    const [mobileNumber,setMobileNumber]=useState(0)
    const [otp,setOtp]=useState('')
    const[city,setCity] = useState([])
    const [alterMobileNumber,setAlterMobileNumber]=useState('')
    const [address,setAddress]=useState("")
    const [selectState,setSelectState]=useState("")
    const [zip,setZip]=useState("")
    const [selectCity,setSelectCity]=useState("")
  
    const [agency,setAgency]=useState([])
    const [deliveryPrice,setDeliveryPrice]=useState("")
    const [DeliveryExtraPrice,setDeliveryExtraPrice] = useState("") 
    const [accountName,setAccountName]=useState("")
    const [accountNumber,setAccountNumber]=useState("")
    const [isfcCode,setIfscCode]=useState("")
    const [branchName,setBranchName]=useState("")
    const [branchAddress,setBranchAddress]=useState("")
   
    const [adharFile,setAdharFile]=useState("")
    const [adharUrl,setAdharUrl]=useState("")
    const [panFile,setPanFile]=useState("")
    const [panUrl,setPanUrl]=useState("")
    const [passbookFile,setPassbookFile]=useState("")
    const [passbookUrl,setPassbookUrl]=useState("")
    const [gstFile,setGstFile]=useState("")
    const [gstUrl,setGstUrl]=useState("")
  
    const [selectWorkingCityName,setSelectWorkingCityName] = useState("")
   
    const[cID,setCid] = useState([])
    const[cNo,setCno] = useState([])
   
    var path1="",path2="",path3="",path4="",path5="",path6="",path7="",verified="no";
   var lat="",long="";
   var temp=0;
   var count = 0;
   var citypushid=[];
   var localitypushid=[];
   var cid=[];
   var cno=[];
   useEffect(()=>{
       function showProject(){
    window.addEventListener('message', handleMessage);
    var cityname=[];
    var citypushid=[];
    var database = app.database();
    database.ref().child("Masters").child("City")
    .once('value', function(snapshot){
        if(snapshot.exists()){
           snapshot.forEach(function(data){
                var val = data.val();      
                  cityname.push(val.Name);
                  citypushid.push(val.PushId);
            });
            cityname.reverse();
            citypushid.reverse();
            setCityName(cityname)
            setCityPushId(citypushid)
        }
    var database = app.database();
    database.ref().child("Agency")
    .on('value', function(snapshot){
        if(snapshot.exists()){
        // $('#datatable').empty();
        
        
        var content = [];
        
        snapshot.forEach(snap=>{
          
            content.push(snap.val());
             
          });
          content.map((item)=>{
            if(item.UserId===undefined){
                item.UserId="undefined"
            }
            if(item.Name===undefined){
              item.Name="undefined"
            }
          })
          setUsers(content);
          setShow(false)
        }else{
          const timeout = setTimeout(() => {
              setShow(false)
            }, 3000);
            return ()=>{clearTimeout(timeout);}

      }
    })
})
return () => {
    window.removeEventListener('message', handleMessage);
  };
}
showProject()
},[])
    useEffect(()=>{
     app.database().ref().child("Agency")
     .once('value').then(function(snapshot) {
         snapshot.forEach(function(data){
             var val = data.val(); 
             cid.push(val.UserId);
             cno.push(val.MobileNumber);
         });
         setCid(cid)
         setCno(cno)
           });
    
     app.database().ref().child("Masters").child("City")
       .once('value').then(function(snapshot) {
         var content=[]
           snapshot.forEach(function(data){
               var val = data.val(); 
              content.push(data.val())
           });
             setCity(content)
           });
           app.database().ref().child("Agency")
           .once('value').then(function(snapshot) {
             var content=[]
               snapshot.forEach(function(data){
                   var val = data.val(); 
                 content.push(data.val())
               });
               setAgency(content)
             });
    },[])

   
   const onChangeSearchName=(event)=>{
    setSearchName(event.target.value)
   }
   
   const onChangeAgencyName=(event)=>{
     setAgencyName(event.target.value)
    }
  
  
    const onChangeWorkingCity=(event)=>{
     setSelectWorkingCity(event.target.value)
     city.filter(item=>{
      if(item.PushId===event.target.value){
        setSelectWorkingCityName(item.Name)
      }
    })
    }
   
    const onChangeMobileNumber=(event)=>{
     setMobileNumber(event.target.value)
    }
    const onChangeOtp=(event)=>{
     setOtp(event.target.value)
    }
    const onChangeAlterMobileNumber=(event)=>{
     setAlterMobileNumber(event.target.value)
    }
    const onChangeAddress=(event)=>{
     setAddress(event.target.value)
    }
    const onChangeState=(event)=>{
     setSelectState(event.target.value)
    }
    const onChangeZip=(event)=>{
     setZip(event.target.value)
    }
    const onChangeCity=(event)=>{
     setSelectCity(event.target.value)
  
    
    }
   
    const onChangeEmailId=(event)=>{
     setEmailID(event.target.value)
    }
    const onChangeDeliveryPrice=(event)=>{
     setDeliveryPrice(event.target.value)
    }
    const onChangeAccountName=(event)=>{
     setAccountName(event.target.value)
    }
    const onChangeAccountNumber=(event)=>{
     setAccountNumber(event.target.value)
    }
    const onChangeIFSCcode=(event)=>{
     setIfscCode(event.target.value)
       if(event.target.value!=10){
           alert('Enter proper ifsc code');
           return;
       }
   
      
   
       axios.get('https://ifsc.razorpay.com/'+event.target.value)
       .then(function (response) {
         setBranchName(response.data.BRANCH);
         setBranchAddress(response.data.ADDRESS);
       })
       .catch(function (error) {
           console.log(error);
           alert('Enter proper ifsc code');
           setBranchName("");
           setBranchAddress("");
       });
    }
    const onChangeBranchName=(event)=>{
     setBranchName(event.target.value)
    }
    const onChangeBranchAddress=(event)=>{
     setBranchAddress(event.target.value)
    }
    const onChangeDeliveryBaseKm=(event)=>{
      setDeliveryBaseKm(event.target.value)
     }
    const onChangeDeliveryExtraPrice=(event)=>{
     setDeliveryExtraPrice(event.target.value)
    }
   
    const onChangeAdharFile=(event)=>{
      const image = event.target.files[0]
      setAdharFile(imageFile => (image))
      if(image === '' ) {
       console.error(`not an image, the image file is a ${typeof(image)}`)
   
     }
     const uploadTask = storage.ref(`/${image.name}`).put(image)
     uploadTask.on('state_changed', 
     (snapShot) => {
       //takes a snap shot of the process as it is happening
       console.log(snapShot)
     }, (err) => {
       //catches the errors
       console.log(err)
     }, () => {
       // gets the functions from storage refences the image storage in firebase by the children
       // gets the download url then sets the image from firebase as the value for the imgUrl key:
       storage.ref().child(image.name).getDownloadURL()
        .then(fireBaseUrl => {
           setAdharUrl(fireBaseUrl)
           window.temp++
        })
        
     }) 
     }
     const onChangePanFile=(event)=>{
      const image = event.target.files[0]
      setPanFile(imageFile => (image))
      if(image === '' ) {
       console.error(`not an image, the image file is a ${typeof(image)}`)
       
   
     }
     const uploadTask= storage.ref(`/${image.name}`).put(image)
     uploadTask.on('state_changed', 
     (snapShot) => {
       //takes a snap shot of the process as it is happening
       console.log(snapShot)
     }, (err) => {
       //catches the errors
       console.log(err)
     }, () => {
       // gets the functions from storage refences the image storage in firebase by the children
       // gets the download url then sets the image from firebase as the value for the imgUrl key:
       storage.ref().child(image.name).getDownloadURL()
        .then(fireBaseUrl => {
           setPanUrl(fireBaseUrl)
           window.temp++
        })
        
     })  
     }
     const onChangePassBookFile=(event)=>{
      const image = event.target.files[0]
      setPassbookFile(imageFile => (image))
      if(image === '' ) {
       console.error(`not an image, the image file is a ${typeof(image)}`)
       
   
     }
     const uploadTask= storage.ref(`/${image.name}`).put(image)
     uploadTask.on('state_changed', 
     (snapShot) => {
       //takes a snap shot of the process as it is happening
       console.log(snapShot)
     }, (err) => {
       //catches the errors
       console.log(err)
     }, () => {
       // gets the functions from storage refences the image storage in firebase by the children
       // gets the download url then sets the image from firebase as the value for the imgUrl key:
       storage.ref().child(image.name).getDownloadURL()
        .then(fireBaseUrl => {
           setPassbookUrl(fireBaseUrl)
           window.temp++
        })
        
     })              
     }
     const onChangeGst=(event)=>{
      const image = event.target.files[0]
      setGstFile(imageFile => (image))
      
      if(image === '' ) {
       console.error(`not an image, the image file is a ${typeof(image)}`)               
     }
     const uploadTask= storage.ref(`/${image.name}`).put(image)
     uploadTask.on('state_changed', 
     (snapShot) => {
       //takes a snap shot of the process as it is happening
       console.log(snapShot)
     }, (err) => {
       //catches the errors
       console.log(err)
     }, () => {
       // gets the functions from storage refences the image storage in firebase by the children
       // gets the download url then sets the image from firebase as the value for the imgUrl key:
       storage.ref().child(image.name).getDownloadURL()
        .then(fireBaseUrl => {
           setGstUrl(fireBaseUrl)
           window.temp++
        })
        
     })   
     }
     
    
    const onSearchHandler=(event)=>{
        const pushId=event.target.id
   
     var firebaseref=app.database().ref().child("Agency").child(pushId);
     return firebaseref.once('value').then(function(snapshot) {
         if(snapshot.exists()){
             setSearchName(snapshot.val().UserId)
         setAgencyName(snapshot.val().Name);
         setEmailID( snapshot.val().Email);
         setSelectWorkingCityName( snapshot.val().City1);
         setDeliveryExtraPrice( snapshot.val().Maritial);
         setMobileNumber( snapshot.val().MobileNumber);
         setAlterMobileNumber( snapshot.val().AlternateNumber);
         setAddress( snapshot.val().Address);
         setSelectCity(snapshot.val().City);
         setDeliveryBaseKm(snapshot.val().Price);
         setDeliveryPrice(snapshot.val().Base)
         setSelectState( snapshot.val().State);
         setZip( snapshot.val().Zipcode);
         setAccountName( snapshot.val().AccountName);
         setAccountNumber( snapshot.val().AccountNumber);
         setIfscCode( snapshot.val().IFSC)
         setBranchName( snapshot.val().BranchName);
         setBranchAddress( snapshot.val().BranchAddress);
          setDeliveryExtraPrice(snapshot.val().Price1)
          if(snapshot.val().Doc1!==""){
            setAdharUrl(snapshot.val().Doc1);
          }else{
            setAdharUrl("")
          }
          if(snapshot.val().Doc1!==""){
            setPanFile(snapshot.val().Doc2);
          }else{
            setPanFile("")
          }
          if(snapshot.val().Doc1!==""){
            setPassbookUrl(snapshot.val().Doc3);
          }else{
            setPassbookUrl("")
          }
          if(snapshot.val().Doc1!==""){
            setGstUrl(snapshot.val().Doc4);
          }else{
            setGstUrl("")
          }
           window.temp=7;
           window.verified="Yes";
         }else{
             setSearchName("")
             setSelectWorkingCity("")
             setAgencyName("")
             setDeliveryBaseKm("")
             setSelectWorkingCity("")
             setDeliveryExtraPrice("")
             setMobileNumber("")
             setAlterMobileNumber("")
             setAddress("")
             setSelectState("")
             setZip("")
             setAccountName("")
             setAccountNumber("")
             setIfscCode("")
             setBranchName("")
             setBranchAddress("")
             setDeliveryPrice("")
             window.temp=0;
  
             setAdharFile("")
             setAdharUrl("")
             setPassbookFile("")
             setPassbookUrl("")
             setPanFile("")
             setPanUrl("")
             setGstFile("")
             setGstUrl("")
  
             window.verified="no";
             // document.getElementById('#doc1').val('');
             // document.getElementById('#doc2').val('');
             // document.getElementById('#doc3').val('');
             // document.getElementById('#doc4').val('');
             // document.getElementById('#doc5').val('');
             // document.getElementById('#doc6').val('');
             // document.getElementById('#doc7').val('');
                       
         }
         setButtonHide(true)
       })
         }
             const onUpdateHandler=(event)=>{
       try{
      if(agencyName==="")
      {
          alert("Enter  Name");
          return;
      }
      if(emailID==="")
      {
          alert("Enter Email ID");
          return;
      }
      if(deliveryPrice=='')
      {
          alert("Enter Delivery Base Price");
          return;
      }
      if(deliveryBaseKm=='')
      {
          alert("Enter  Delivery Base Price");
          return;
      }
      if(DeliveryExtraPrice=='')
      {
          alert("Enter Extra Delivery Base Price");
          return;
      }

      if(mobileNumber===0)
      {
          alert("Enter Mobile Number");
          return;
      }
      // if(mobileNumber.length!=10)
      // {
      //     alert("Enter Proper Mobile Number");
      //     return;
      // }
      if(address==="")
      {
          alert("Enter Address");
          return;
      }
      if(selectCity=="Select")
      {
          alert("Select City");
          return;
      }
     
      if(zip==="")
      {
          alert("Enter ZipCode");
          return;
      }
      // if(password==="")
      // {
      //     alert("Enter Password");
      //     password.focus();
      //     $("#submit").removeAttr("disabled");
      //     return;
      // }
      // if(cpassword==="")
      // {
      //     alert("Enter Confirm Password");
      //     cpassword.focus();
      //     $("#submit").removeAttr("disabled");
      //     return;
      // }
  
     if(accountName==="")
      {
          alert("Enter Bank Account Name");
          return;
      }
      if(accountNumber==="")
      {
          alert("Enter Bank Account Number");
          return;
      }
      if(isfcCode==="")
      {
          alert("Enter Bank IFSC Code");
          return;
      }
      if(branchName==="")
      {
          alert("Enter Branch Name");
          return;
      }
      if(branchAddress==="")
      {
          alert("Enter Bank Address");
          return;
      }
   
     
               
               var firebaseref=app.database().ref().child("Agency").child(searchName);
                   firebaseref.child("UserId").set(searchName);
                   firebaseref.child("Name").set(agencyName);
                   firebaseref.child("Email").set(emailID);
                   firebaseref.child("City1").set(selectWorkingCity);
                   firebaseref.child("Base").set(deliveryPrice);
                   firebaseref.child("Price1").set(DeliveryExtraPrice);
                   firebaseref.child("Price").set(deliveryBaseKm);
                   firebaseref.child("MobileNumber").set(mobileNumber);
                   firebaseref.child("AlternateNumber").set(alterMobileNumber);
                   firebaseref.child("Address").set(address);
                   firebaseref.child("City").set(selectCity);
                   firebaseref.child("State").set(selectState);
                   firebaseref.child("Zipcode").set(zip);
                   firebaseref.child("AccountName").set(accountName);
                   firebaseref.child("AccountNumber").set(accountNumber);
                   firebaseref.child("IFSC").set(isfcCode);
                   firebaseref.child("BranchName").set(branchName);
                   firebaseref.child("BranchAddress").set(branchAddress);
                                 
                              
                   firebaseref.child("Status").set("InActive");
                   firebaseref.child("AStatus").set("InActive");
                   var today = new Date();
                   var dd = String(today.getDate()).padStart(2, '0');
                   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                   var yyyy = today.getFullYear();
                   today = yyyy + '-' + mm + '-' + dd;
                   firebaseref.child("Created").set(today);
  
  
                   setSearchName("")
                   setSelectWorkingCity("")
                   setAgencyName("")
                   setDeliveryBaseKm("")
                   setSelectWorkingCity("")
                   setDeliveryExtraPrice("")
                   setMobileNumber("")
                   setAlterMobileNumber("")
                   setAddress("")
                   setSelectState("")
                   setZip("")
                   setAccountName("")
                   setAccountNumber("")
                   setIfscCode("")
                   setBranchName("")
                   setBranchAddress("")
                   setDeliveryPrice("")
                   window.temp=0;
        
                   setAdharFile("")
                   setAdharUrl("")
                   setPassbookFile("")
                   setPassbookUrl("")
                   setPanFile("")
                   setPanUrl("")
                   setGstFile("")
                   setGstUrl("")
         // window.verified="no";
   
   
                   Swal.fire({
                       title: "Successfully Updated!",
                       text: "Delivery Partner Registered Id : " + searchName,
                       icon: "success",
                       confirmButtonText: "Ok" 
                      });
                      setButtonHide(false)
                    }
                    catch(err){
                      console.log(err.message)
                    }
                    setButtonHide(false)

           }
       const onDeleteHandler=(event)=>{
         const pushId=event.target.id
     
   
       var superadmin=window.localStorage.getItem('superadmin');
       if(superadmin===null){                      
           superadmin=window.sessionStorage.getItem('superadmin');
           if(superadmin===null){
             history.push(`${process.env.PUBLIC_URL}/login`);
           } 
       }
   
       if(superadmin=="Yes"){
               Swal.fire({
                   title: "Are you sure?",
                   text: "Once deleted, you will not be able to recover it!",
                   icon: "warning",
                   showCancelButton: true,
                   confirmButtonText: 'OK',
                   cancelButtonText: 'Cancel',
                   cancelButtonColor:'gray'
               })
               .then((willDelete) => {
                  
                           if (willDelete.value) {
                               app.database().ref().child("Agency").child(pushId).remove();
                               Swal.fire("Deleted!", {
                                icon: "success",
                            });
                        }
                    });
       }
       else{
           Swal.fire({
               title: "Disabled",
               text: "The option has been disabled!",
               icon: "warning",
               dangermode: true,
             });
       }
       setButtonHide(false)

       } 
    
  
    const  onChangeHandler=(event)=>{
        setSearchTerm(event.target.value);
       }
       const handleMessage = (event) => {
        if (event.data.action === 'receipt-loaded') {
          setIsLoading(false);
        }
      };
       const printIframe = (id) => {
        const iframe = document.frames
          ? document.frames[id]
          : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;
    
        iframe.focus();
        iframeWindow.print();
    
        return false;
      };
     const printDocument=(event)=> {  
        const input = document.getElementById('datatable');  
        html2canvas(input)  
          .then((canvas) => {  
            var imgWidth = 200;  
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("AgencyList.pdf");  
          });  
      }
      const onBackHandler=()=>{
          setButtonHide(false)
      }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Driver Management" title="Agency List"/>
            <Container fluid={true}>
                {buttonHide==true?
            
      <Row>
                    <Col sm="12">
                          <CardHeader>
                                <h6> Agency Partner Approvals</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                            <Col sm="12" style={{marginTop:"3%",marginLeft:"-1%"}}>
                      
                         
                                <h5>Alter Agency Details</h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        
                            </Col>
                            <Row className="form-row" style={{marginTop:"3%"}}>
                             <Col className="form-group col-md-6">
                             <label className="form-label">Enter Agency ID</label>
                            <Row>
                            <Col className="col-lg-6 col-md-5 col-sm-5">
                            <Input value={searchName} onChange={onChangeSearchName} type="text" id="sname" className="form-control"/>
                            </Col>
                            <Col className="col-sm-1 col-md-2">
                            {/* <span onClick={onSearchHandler} id="search"><img src="https://img.icons8.com/ios-filled/24/000000/search.png"/></span> */}
                            </Col>
                            </Row>
                            <div className="clearfix"></div>
                            </Col>
                            </Row>
                            
                          <Row className="form-row">
                         <Col className="form-group col-md-12">
                        <div className="clearfix"></div>
                        <h4>Personal Details</h4>
                        <div className="clearfix"></div>
                        </Col>
                        </Row>
                        <Row className="form-row">

                         {/* <!-- <div class="form-group col-md-6">
                           <label class="form-label">Could Kitchen Name <span style="color: red;">*</span> </label>
                           <input type="text" id="kitchenname" class="form-control" placeholder="Cloud Kitchen Name">
                            <div class="clearfix"></div>
                            </div> --> */}
                        <Col className="form-group col-md-6">
                        <label className="form-label">Agency Name <span style={{color: "red"}}>*</span></label>
                        <Input type="text" value={agencyName} onChange={onChangeAgencyName} id="name" className="form-control" placeholder="Full Name"/>
                        <div className="clearfix"></div>
                        </Col>
                        </Row>
                        <Row>
                        <Col className="form-group col-md-6">
                        <label className="form-label">Email Id <span style={{color: "red"}}>*</span></label>
                        <Input type="email" value={emailID} onChange={onChangeEmailId} id="name" className="form-control" placeholder="Email Id"/>
                        <div className="clearfix"></div>
                        </Col>
                        </Row>

                         <Row className="form-row">
                         <Col className="form-group col-md-6">
                        <label className="form-label">Mobile Number <span style={{color: "red"}}>*</span></label>
                        <Input type="number" value={mobileNumber} onChange={onChangeMobileNumber} id="mobilenumber" className="form-control" placeholder="Mobile Number"/>
                        <div className="clearfix"></div>
                         </Col>

                         {/* <Col className="form-group col-md-2" >
                        <label className="form-label" id="otp">OTP <span style={{color: "red"}}>*</span></label>
                         <Input id="verification-code" value={otp} onChange={onChangeOtp}  type="number" className="form-control" placeholder="OTP"/>	
                        </Col>  */}
                        {/* <Col className="form-group col-md-3" style={{marginTop:"3%"}} >
                        <Button className="warning" onClick={onSignInSubmit} id="sign-in-button" href="#" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}}>Send OTP</Button>	
                        <Button class="warning" onClick={onVerifyCodeSubmit} id="verify-code-button" href="#" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}}>Verify</Button>	
                        </Col> */}

                         <Col className="form-group col-md-6">
                        <label className="form-label">Alternate Mobile Number/Emergency Number</label>
                        <Input value={alterMobileNumber} onChange={onChangeAlterMobileNumber} type="number" id="anumber" className="form-control" placeholder="Mobile Number"/>
                        <div className="clearfix"></div>
                         </Col>                     
                        </Row>
                        <Row className="form-row">
                         <Col className="form-group col-md-12">
                        <label className="form-label">Address <span style={{color: "red"}}>*</span></label>
                        <Input value={address} onChange={onChangeAddress} type="text" id="mobilenumber" className="form-control" placeholder="Address"/>
                        <div className="clearfix"></div>
                         </Col>
                         </Row>

                        
                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">City <span style={{color: "red"}}>*</span></label>
                        <input type="text" value={selectCity} onChange={onChangeCity} className="form-control" id="gender"/>                       
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">State <span style={{color: "red"}}>*</span></label>
                        <select value={selectState} onChange={onChangeState} className="form-control" id="gender">
                        <option value="Select State">Select State</option>
                        <option value="Select State">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                         </select>                        
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-2">
                        <label className="form-label">Zip <span style={{color: "red"}}>*</span></label>
                        <Input type="number" value={zip} onChange={onChangeZip} className="form-control" id="gender" placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                       

                        <Row>
                        <Col className="form-group col-md-12">
                        <h4>Bank Account Details</h4>
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Bank Account Name <span style={{color: "red"}}>*</span> </label>
                        <Input type="text" value={accountName} onChange={onChangeAccountName} className="form-control"/>                    
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Bank Account Number <span style={{color: "red"}}>*</span> <span style={{color: "red"}}>*</span></label>
                        <Input type="text" value={accountNumber} onChange={onChangeAccountNumber}className="form-control" id="gender" placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Bank IFSC Code <span style={{color: "red"}}>*</span></label>
                        <Input type="text" value={isfcCode} onChange={onChangeIFSCcode} className="form-control" id="gender" placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Branch Name <span style={{color: "red"}}>*</span> </label>
                        <Input type="text" value={branchName} onChange={onChangeBranchName}  className="form-control"/>                    
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Branch Address <span style={{color: "red"}}>*</span> </label>
                        <Input type="text" value={branchAddress} onChange={onChangeBranchAddress} className="form-control" id="gender" placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-12">
                        <h4>OnBoarding Details</h4>
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Delivery Base Price<span style={{color: "red"}}>*</span> </label>
                        <Input type="text" value={deliveryPrice} onChange={onChangeDeliveryPrice}  className="form-control" placeholder="Delivery Base Price"/>                    
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Delivery Base KM <span style={{color: "red"}}>*</span> <span style={{color: "red"}}>*</span></label>
                        <Input type="number" value={deliveryBaseKm} onChange={onChangeDeliveryBaseKm} className="form-control" id="gender" placeholder="Delivery Base KM"/>                      
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Delivery Extra Price Per KM <span style={{color: "red"}}>*</span></label>
                        <Input type="number" value={DeliveryExtraPrice} onChange={onChangeDeliveryExtraPrice} className="form-control" id="gender" placeholder="Delivery Extra Price Per KM"/>                      
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Working City <span style={{color: "red"}}>*</span></label>
                        <select value={selectWorkingCity} onChange={onChangeWorkingCity} className="form-control" id="gender">
                        <option value="Select">Select</option>
                        {city.map((item,id)=>{
                          return(
                          <option key={id} value={item.PushId}>{item.Name}</option>)}
                          )}
                         </select>                        
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-12">
                        <h4>Documents Upload</h4>
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                     

                        <Row class="form-group row">
                        <label class="col-form-label col-sm-2 text-sm-right">Aadhar Card Upload </label>
                        <Col class="col-sm-10">
                        <Input onChange={onChangeAdharFile } type="file" id="doc1" class="form-control" />
                        <div class="clearfix"></div>
                         </Col>
                         <div class="col-sm-2">
                         {adharUrl===""?
                        <a></a>:  
                        <a href={adharUrl}  id="a2" target="_blank">View</a>

                        }
                        </div>
                        </Row>

                        <Row class="form-group row">
                        <label class="col-form-label col-sm-2 text-sm-right">Pan/Voter </label>
                        <Col class="col-sm-10">
                        <Input onChange={ onChangePanFile} type="file" id="doc1" class="form-control" />
                        <div class="clearfix"></div>
                         </Col>
                         <div class="col-sm-2">
                         {panUrl===""?
                        <a></a>:  
                        <a href={panUrl}  id="a2" target="_blank">View</a>

                        } 
                        </div>
                        </Row>

                        <Row class="form-group row">
                        <label class="col-form-label col-sm-2 text-sm-right">Passbook/Bank Statement </label>
                        <Col class="col-sm-10">
                        <Input onChange={onChangePassBookFile } type="file" id="doc1" class="form-control" />
                        <div class="clearfix"></div>
                         </Col>
                         <div class="col-sm-2">
                         {passbookUrl===""?
                        <a></a>:  
                        <a href={passbookUrl}  id="a2" target="_blank">View</a>

                        }
                        </div>
                        </Row>

                        <Row class="form-group row">
                        <label class="col-form-label col-sm-2 text-sm-right">GST </label>
                        <Col class="col-sm-10">
                        <Input onChange={ onChangeGst} type="file" id="doc1" class="form-control" />
                        <div class="clearfix"></div>
                        <div class="col-sm-2">
                          {gstUrl===""?
                        <a></a>:  
                        <a href={gstUrl}  id="a2" target="_blank">View</a>

                        }
                        </div>
                         </Col>
                        </Row>

                       

                        
                        <Button type="submit" id="submit" onClick={onBackHandler}  className="warning">Back</Button>:
                        
                        <Button type="submit" id="update" onClick={onUpdateHandler} className="warning" >Update</Button>
                       

                    </Col>
             </Row>
            :
            
<Row>
                    <Col sm="12">
                    <CardHeader>
                                <h6> Agency Partner Approvals</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-11">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text" value={searchTerm} onChange={onChangeHandler}  required=""  className="form-control" placeholder="Search for Agency  ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="AgencyList"  
                sheet="AgencyList"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/AgencyList-table"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatable')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
   
                </div>
                </div>
                    <Col sm="12">
                        <Card>
                            <div className="table-responsive text-nowrap" style={{ overflowX:"scroll"}}   >
                                
                                <Table id="datatable"  data-toolbar="#bootstrap-table-toolbar" className="datatables-demo table table-striped table-bordered" style={{tablelayout: "auto;"}}>
                                    <thead >
                                        <tr>
                                            <th scop="col">SL.NO</th>
                                            <th scop="col">Agency ID	</th>
                                            <th scop="col"> Name	</th>
                                            <th scop="col" >MobileNumber </th>
                                            <th scop="col">Delivery City	</th>
                                            <th scop="col">Base Price	</th>
                                            <th scop="col">Base Km		</th>
                                            <th scop="col">Extra Per Km	</th>
                                            <th  scop="col">View Details		</th>
                                            <th scop="col">Delete 	</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(orders =>
                                            orders.UserId.includes(searchTerm)).map((item,id)=>{
                                                // for (var i=0;i<driverNumber.length;i++){
                                                   
                                                    return(
                                                        <tr key={id}>
                                                        <td>{id+1}</td>
                                                       <td class="item_userid">{item.UserId}</td>
                                                       <td class="item_locality">{item.Name}</td>
                                                       <td>{item.MobileNumber}</td>
                                                        {/* //<td>item.Address</td>
                                                        //<td>item.City</td> */}
                                                       <td>{cityName[cityPushId.indexOf(item.City1)]}</td>
                                                       <td>{item.Base}</td>
                                                       <td>{item.Price}</td>
                                                       <td>{item.Price1}</td>
                                                       <td><button id={item.UserId} onClick={onSearchHandler} className="btn btn-primary">{"View Details"}</button></td>
                                                       <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.UserId} onClick={onDeleteHandler} className="btn btn-danger btn-md">{"Delete"}</button></td>
                                         
                                                     </tr> 
                                                    )
                                                
                                                     })}
                                    </tbody>
                                </Table>
                                </div>
                                </Card>
                                </Col>
                        
                    </Row>
          
            }
                                   <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} className="sweet-loading">
                                     <BeatLoader
                                         css={override}
                                        size={30}
                                        margin={5}
                                        color={"#F10542"}
                                        loading={show}
                                        />
                                    </div>  
                
                </Container> 
        </Fragment>
    )}
        
export default AgencyListTable;