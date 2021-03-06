import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Input,Button} from "reactstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {useHistory,Link} from 'react-router-dom'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore'
import * as firebase from "firebase/app";
import axios from 'axios'
import app, {storage} from '../../data/base'

const AddAgency = () => {
  const history = useHistory()
  const[otpHide,setOtpHide] = useState(false)
  const [buttonHide,setButtonHide] = useState(false)
 
  const [searchName,setSearchName] = useState("")
  const [agencyName,setAgencyName]=useState("")   
  const [emailID,setEmailID]=useState("")
  const [deliveryBaseKm,setDeliveryBaseKm]=useState("")
  const [selectWorkingCity,setSelectWorkingCity]=useState("")
  const [maritialStatus,setMaritialStatus]=useState("")
  const [mobileNumber,setMobileNumber]=useState()
  const [otp,setOtp]=useState()
  const [alterMobileNumber,setAlterMobileNumber]=useState('')
  const [address,setAddress]=useState("")
  const [selectState,setSelectState]=useState("")
  const [zip,setZip]=useState("")
  const [selectCity,setSelectCity]=useState("")
  const [city,setCity]=useState([])

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
   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
     'size': 'invisible',
     'callback': function(response) {
       // reCAPTCHA solved, allow signInWithPhoneNumber.
       onSignInSubmit();
       }
   });
   // [END appVerifier]
   window.recaptchaVerifier.render().then(function(widgetId) {
     window.recaptchaWidgetId = widgetId;  
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
  
  function onSignInSubmit() {
   var len=mobileNumber.length;
 //  if (len===10) {
 
 
   for(var i=0;i<cNo.length;i++) {
       if(mobileNumber===cNo[i])
       {alert("Mobile Number already Exists!!!");
       return;}
     }
 
 
           window.signingIn = true;
           var phoneNumber ="+91"+ mobileNumber;
           var appVerifier = window.recaptchaVerifier;
           app.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
               .then(function (confirmationResult) {
                   // SMS sent. Prompt user to type the code from the message, then sign the
                   // user in with confirmationResult.confirm(code).
                   window.confirmationResult = confirmationResult;
                   window.signingIn = false;
                   setOtpHide(true)
       
               })
               //.catch(function (error) {
               //     // Error; SMS not sent
               //     console.error('Error during signInWithPhoneNumber', error);
               //     window.alert('Error during signInWithPhoneNumber:\n\n'
               //         + error.code + '\n\n' + error.message);
               //     window.signingIn = false;
               //     ;
               // });
   // }
   // else{
   //   alert("Enter Proper Phone Number");
   //   return;
   // }
 }
 
 const onVerifyCodeButton=()=>{
   onVerifyCodeSubmit();
 }
 
 function onVerifyCodeSubmit() {
 
   if (otp!="") {
     window.verifyingCode = true;
     window.confirmationResult.confirm(otp).then(function (result) {
       console.log("confirmation",result)
       // User signed in successfully.
       var user = result.user;
       window.verifyingCode = false;
       window.confirmationResult = null;
      setOtpHide(false)
       // document.getElementById('verification-code').style.display="none";
       // document.getElementById('otp').style.display="none";
       // document.getElementById('verify-code-button').style.display="none";
       // document.getElementById('mobilenumber').style.display="inline";
       window.verified="yes";
 
 
     }).catch(function (error) {
       // User couldn't sign in (bad verification code?)
       console.error('Error while checking the verification code', error);
       window.alert('Error while checking the verification code:\n\n'
           + error.code + '\n\n' + error.message);
       window.verifyingCode = false;   
     });
   }
 }
 
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
   if(searchName==='')
   {
       alert("Enter Agency ID");
       return;
   }
   var firebaseref=app.database().ref().child("Agency").child(searchName);
   return firebaseref.once('value').then(function(snapshot) {
       if(snapshot.exists()){
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
         setAdharUrl(snapshot.val().Doc1);
         setPanFile(snapshot.val().Doc2);
         setPassbookUrl(snapshot.val().Doc3);
         setGstUrl(snapshot.val().Doc4);

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
       const onSubmitHandler=(event)=>{
         event.preventDefault()
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
         if(maritialStatus=="Select")
         {
             alert("Select Maritail Status");
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
         // if(remarks==="")
         // {
         //     alert("Enter Remarks");
         //     remarks.focus();
         //     $("#submit").removeAttr("disabled");
         //     return;
         // }
        
      
         for(var i=0;i<cNo.length;i++) {
           if(mobileNumber===cNo[i])
           {
               alert("Mobile Number already Exists!!!");
               window.verified="no";               
               return;
           }
         }
         if(window.verified!=="yes"){
           alert("Verify Delivery Partner Number");
           return;
       }
       var tot=0;
     
               var stock=app.database().ref().child("AGID");              
               stock.transaction(function(currentstock) {
                tot = currentstock+1;   
               return tot;
               },
               function(error, committed, snapshot) {
               if (error) {
                 console.log('Transaction failed abnormally!', error);
               } else if (committed) {
 
                     var userid = "MFAG"+tot;
                 
                 var firebaseref=app.database().ref().child("Agency").child(userid);
                     firebaseref.child("UserId").set(userid);
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
          
           window.verified="no";
           // document.getElementById('#doc1').val('');
           // document.getElementById('#doc2').val('');
           // document.getElementById('#doc3').val('');
           // document.getElementById('#doc4').val('');
           // document.getElementById('#doc5').val('');
           // document.getElementById('#doc6').val('');
           // document.getElementById('#doc7').val('');
 
                     Swal.fire({
                         title: "Successfully Created!",
                         text: "Delivery Partner Registered Id : " + userid,
                         icon: "success",
                         confirmButtonText: "Ok" 
                        });
 
             }
         });
         setButtonHide(false)
       }
   const onUpdateHandler=()=>{
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
    if(maritialStatus=="Select")
    {
        alert("Select Maritail Status");
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
                  if(adharFile === '' ) {
                   console.error(`not an image, the image file is a ${typeof(adharFile)}`)
                   
          
                     
                 }
                 const uploadTask2 = storage.ref(`/${adharFile.name}`).put(adharFile)
                 uploadTask2.on('state_changed', 
                 (snapShot) => {
                   //takes a snap shot of the process as it is happening
                   console.log(snapShot)
                 }, (err) => {
                   //catches the errors
                   console.log(err)
                 }, () => {
                   // gets the functions from storage refences the image storage in firebase by the children
                   // gets the download url then sets the image from firebase as the value for the imgUrl key:
                   storage.ref().child(adharFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                       firebaseref.child("Doc1").set(fireBaseUrl);
                       setAdharUrl(prevObject => ({...prevObject, fireBaseUrl}))
                       window.temp++
                    })
                    .then(()=>{setAdharUrl("")})
                    
                 })                
                 if(panFile === '' ) {
                   console.error(`not an image, the image file is a ${typeof(panFile)}`)
     
                 }
                 const uploadTask3= storage.ref(`/${panFile.name}`).put(panFile)
                 uploadTask3.on('state_changed', 
                 (snapShot) => {
                   //takes a snap shot of the process as it is happening
                   console.log(snapShot)
                 }, (err) => {
                   //catches the errors
                   console.log(err)
                 }, () => {
                   // gets the functions from storage refences the image storage in firebase by the children
                   // gets the download url then sets the image from firebase as the value for the imgUrl key:
                   storage.ref().child(panFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                       firebaseref.child("Doc2").set(fireBaseUrl);
                       setPanUrl(prevObject => ({...prevObject, fireBaseUrl}))
                       window.temp++
                    })
                    .then(()=>{panUrl("")})
                    
                 })              
                 if(passbookFile === '' ) {
                   console.error(`not an image, the image file is a ${typeof(passbookFile)}`)

                 
                     
                 }
                 const uploadTask4= storage.ref(`/${passbookFile.name}`).put(passbookFile)
                 uploadTask4.on('state_changed', 
                 (snapShot) => {
                   //takes a snap shot of the process as it is happening
                   console.log(snapShot)
                 }, (err) => {
                   //catches the errors
                   console.log(err)
                 }, () => {
                   // gets the functions from storage refences the image storage in firebase by the children
                   // gets the download url then sets the image from firebase as the value for the imgUrl key:
                   storage.ref().child(passbookFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                       firebaseref.child("Doc3").set(fireBaseUrl);
                       setPassbookUrl(prevObject => ({...prevObject, fireBaseUrl}))
                       window.temp++
                    })
                    .then(()=>{passbookUrl("")})
                    
                 })              
                 if(gstFile === '' ) {
                   console.error(`not an image, the image file is a ${typeof(gstFile)}`)

                     
                 }
                 const uploadTask5= storage.ref(`/${gstFile.name}`).put(gstFile)
                 uploadTask5.on('state_changed', 
                 (snapShot) => {
                   //takes a snap shot of the process as it is happening
                   console.log(snapShot)
                 }, (err) => {
                   //catches the errors
                   console.log(err)
                 }, () => {
                   // gets the functions from storage refences the image storage in firebase by the children
                   // gets the download url then sets the image from firebase as the value for the imgUrl key:
                   storage.ref().child(gstFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                       firebaseref.child("Doc4").set(fireBaseUrl);
                       setGstUrl(prevObject => ({...prevObject, fireBaseUrl}))
                       window.temp++
                    })
                    .then(()=>{setGstUrl("")})
                    
                 })               
                            
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
         }
     const onDeleteHandler=()=>{
       
     if(searchName=="")
     {
         alert("Enter Delivery Partner User ID");
         return;
     }
 
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
                             app.database().ref().child("Agency").child(searchName).remove();
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
                   // window
                             // document.getElementById('#doc1').val('');
                             // document.getElementById('#doc2').val('');
                             // document.getElementById('#doc3').val('');
                             // document.getElementById('#doc4').val('');
                             // document.getElementById('#doc5').val('');
                             // document.getElementById('#doc6').val('');
                             // document.getElementById('#doc7').val('');
                       
                                     alert('Successfully Deleted!');                
 
                 
                       
                 
                 
                                     if(adharFile === '' ) {
                                       console.error(`not an image, the image file is a ${typeof(adharFile)}`)
                                       
                     
                                         window.temp--;
                                         var imagePath2 = adharFile
                                         let name2 = imagePath2.substr(imagePath2.indexOf('%2F') + 3, (imagePath2.indexOf('?')) - (imagePath2.indexOf('%2F') + 3));
                                         name2 = name2.replace('%20',' '); 
                                         let storagePath2 = app.storage().ref();
                                         storagePath2.child(`Agency/${name2}`).delete();
                                     
                                         
                                     }
                 
                 
                                     if(panFile === '' ) {
                                       console.error(`not an image, the image file is a ${typeof(panFile)}`)
                                       
                     
                                         window.temp--;
                                         var imagePath3 = panFile
                                         let name3 = imagePath3.substr(imagePath3.indexOf('%2F') + 3, (imagePath3.indexOf('?')) - (imagePath3.indexOf('%2F') + 3));
                                         name3 = name3.replace('%20',' '); 
                                         let storagePath3 = app.storage().ref();
                                         storagePath3.child(`Agency/${name3}`).delete();
                                     
                                         
                                     }
                 
                                     if(passbookFile === '' ) {
                                       console.error(`not an image, the image file is a ${typeof(passbookFile)}`)
                                       
                     
                                         window.temp--;
                                         var imagePath4 = passbookFile
                                         let name4 = imagePath4.substr(imagePath4.indexOf('%2F') + 3, (imagePath4.indexOf('?')) - (imagePath4.indexOf('%2F') + 3));
                                         name4 = name4.replace('%20',' '); 
                                         let storagePath4 = app.storage().ref();
                                         storagePath4.child(`Agency/${name4}`).delete();
                                     
                                         
                                     }
                 
                                     if(gstFile === '' ) {
                                       console.error(`not an image, the image file is a ${typeof(gstFile)}`)
                                       
                     
                                         window.temp--;
                                         var imagePath5 = gstFile
                                         let name5 = imagePath5.substr(imagePath5.indexOf('%2F') + 3, (imagePath5.indexOf('?')) - (imagePath5.indexOf('%2F') + 3));
                                         name5 = name5.replace('%20',' '); 
                                         let storagePath5 = app.storage().ref();
                                         storagePath5.child(`Agency/${name5}`).delete();
                                     
                                         
                                     }
                 
                                    
                                     Swal.fire("Chef Deleted!", {
                                         icon: "success",
                                     });
                                 }
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
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Master Creation" title="Create Agency"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                          <CardHeader>
                                <h6>Create Agency</h6>
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
                            <span onClick={onSearchHandler} id="search"><img src="https://img.icons8.com/ios-filled/24/000000/search.png"/></span>
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
                            {otpHide!==false?
                         <Col className="form-group col-md-2" >
                        <label className="form-label" id="otp">OTP <span style={{color: "red"}}>*</span></label>
                         <Input id="verification-code" value={otp} onChange={onChangeOtp}  type="number" className="form-control" placeholder="OTP"/>	
                         <Button class="warning" onClick={onVerifyCodeSubmit} id="verify-code-button" href="#" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}}>Verify</Button>	
                        </Col> :
                        <Col className="form-group col-md-3" style={{marginTop:"3%"}} >
                        <Button className="warning" onClick={onSignInSubmit} id="sign-in-button" href="#" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}}>Send OTP</Button>	
                        </Col>
                      }
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
                        </Row>

                        <Row class="form-group row">
                        <label class="col-form-label col-sm-2 text-sm-right">Pan/Voter </label>
                        <Col class="col-sm-10">
                        <Input onChange={ onChangePanFile} type="file" id="doc1" class="form-control" />
                        <div class="clearfix"></div>
                         </Col>
                        </Row>

                        <Row class="form-group row">
                        <label class="col-form-label col-sm-2 text-sm-right">Passbook/Bank Statement </label>
                        <Col class="col-sm-10">
                        <Input onChange={onChangePassBookFile } type="file" id="doc1" class="form-control" />
                        <div class="clearfix"></div>
                         </Col>
                        </Row>

                        <Row class="form-group row">
                        <label class="col-form-label col-sm-2 text-sm-right">GST </label>
                        <Col class="col-sm-10">
                        <Input onChange={ onChangeGst} type="file" id="doc1" class="form-control" />
                        <div class="clearfix"></div>
                         </Col>
                        </Row>

                       

                        {buttonHide===false?
                        <Button type="submit" id="submit" onClick={onSubmitHandler}  className="warning">Submit</Button>:
                        <div>
                        <Button type="submit" id="update" onClick={onUpdateHandler} className="warning" >Update</Button>
                        <Button type="submit" id="delete" onClick={onDeleteHandler} className="warning" >Delete</Button>
                        </div>
}
                    </Col>
             </Row>
            </Container>
        </Fragment>
    )}
    export default AddAgency