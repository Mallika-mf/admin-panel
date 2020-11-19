import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button,Input} from "reactstrap";
import {Check,Trash} from 'react-feather'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {useHistory} from 'react-router-dom'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore'
import axios from 'axios'
import app, {storage} from '../../data/base'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const DeliveryPartnerApprovals = () => {   
     const [isLoading, setIsLoading] = useState(true);
     const [show,setShow]=useState(true)
     const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})

    const [users,setUsers] = useState([])
    const history = useHistory()
    const [buttonHide,setButtonHide] = useState(false)
    const [agencyHide,setAgencyHide] = useState(false)
    // const [otpHide,setOtpHide] = useState(false)
    const [searchName,setSearchName] = useState("")
    const [fullName,setFullName]=useState("")   
    const [age,setAge]=useState("")
    const [gender,setGender]=useState("")
    const [workingTime,setWorkingTime]=useState("")
    const [maritialStatus,setMaritialStatus]=useState("")
    const [mobileNumber,setMobileNumber]=useState(0)
    // const [otp,setOtp]=useState('')
    const [alterMobileNumber,setAlterMobileNumber]=useState('')
    const [address,setAddress]=useState("")
    const [selectState,setSelectState]=useState("")
    const [zip,setZip]=useState("")
    const [holderName,setHolderName] = useState("")

    const [selectCity,setSelectCity]=useState("")
    const [selectCityName,setSelectCityName]=useState("")
    const [city,setCity]=useState([])
    const [selectLocality,setSelectLocality]=useState("")
    const [selectLocalityName,setSelectLocalityName]=useState("")
    const [locality,setLocality]=useState([])
    const [reference,setReference]=useState("")
    const [agency,setAgency]=useState([])
    const [selectAgency,setSelectAgency]=useState("")
    const [fatherName,setFatherName] = useState("") 
    const [accountName,setAccountName]=useState("")
    const [accountNumber,setAccountNumber]=useState("")
    const [isfcCode,setIfscCode]=useState("")
    const [branchName,setBranchName]=useState("")
    const [branchAddress,setBranchAddress]=useState("")
    const [vehicalName,setVehicalName]=useState("")
    const [vehicalNumber,setVehicalNumber]=useState("")
    const [insurenceNumber,setInsuranceNumber]=useState("")
    const [rcNumber,setRCnumber]=useState("")
    const [amount,setAmount]=useState("")
    const [paymentType,setPaymentType]=useState("")
    const [recieptNumber,setRecieptNumber]=useState("")
    // const [passportFile,setPassportFile]=useState("")
    const [passportUrl,setPassportUrl]=useState("")
    // const [adharFile,setAdharFile]=useState("")
    const [adharUrl,setAdharUrl]=useState("")
    // const [panFile,setPanFile]=useState("")
    const [panUrl,setPanUrl]=useState("")
    // const [passbookFile,setPassbookFile]=useState("")
    const [passbookUrl,setPassbookUrl]=useState("")
    // const [rcFile,setRCFile]=useState("")
    const [rcUrl,setRcUrl]=useState("")
    // const [drivingFile,setDrivingFile]=useState("")
    const [drivingUrl,setDrivingUrl]=useState("")
    // const [insurenceCopyFile,setInsurenceCopyFile]=useState("")
    const [insurenceCopyUrl,setInsurenceCopyUrl]=useState("")
    const [remarks,setRemarks]=useState("")
   
    // const[cID,setCid] = useState([])
    // const[cNo,setCno] = useState([])
   
  //   var path1="",path2="",path3="",path4="",path5="",path6="",path7="",verified="no";
  //  var lat="",long="";
  //  var temp=0;
  //  var count = 0;
  //  var citypushid=[];
  //  var localitypushid=[];
  //  var cid=[];
  //  var cno=[];
    useEffect(()=>{
        window.addEventListener('message', handleMessage);

        var database = app.database();
        database.ref().child("DeliveryPartner")
        .orderByChild("AStatus").equalTo("InActive")
        .on('value', function(snapshot){
        if(snapshot.exists()){
        // $('#datatable').empty();
        var content = [];
        
        snapshot.forEach(snap=>{
          let val = snap.val()
            let locker = {
              UserId: val.UserId,
              Name: val.Name,
              MobileNumber: val.MobileNumber,
              CityName: val.CityName,
              LocalityName: val.LocalityName
            }
            content.push(locker);

          });
          content.map(item=>{
            if(item.UserId===undefined){
              item.UserId=""
            }
            if(item.Name===undefined){
              item.Name=""
            }
            if(item.MobileNumber===undefined){
              item.MobileNumber=""
            }
            if(item.CityName===undefined){
              item.CityName=""
            }
            if(item.LocalityName===undefined){
              item.LocalityName=""
            }
            return item
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
    return () => {
        window.removeEventListener('message', handleMessage);
      };
},[])
useEffect(()=>{
    // app.database().ref().child("DeliveryPartner")
    // .once('value').then(function(snapshot) {
    //     snapshot.forEach(function(data){
    //         var val = data.val(); 
    //         cid.push(val.UserId);
    //         cno.push(val.MobileNumber);
    //     });
    //     setCid(cid)
    //     setCno(cno)
    //       });
   
    app.database().ref().child("Masters").child("City")
      .once('value').then(function(snapshot) {
        var content=[]
          snapshot.forEach(function(data){
             content.push(data.val())
          });
            setCity(content)
          });
          app.database().ref().child("Agency")
          .once('value').then(function(snapshot) {
            var content=[]
              snapshot.forEach(function(data){
                  // var val = data.val(); 
                content.push(data.val())
              });
              setAgency(content)
            });
   },[])
   
  
  const onChangeSearchName=(event)=>{
   setSearchName(event.target.value)
  }
  
  const onChangeFNameHandler=(event)=>{
    setFatherName(event.target.value)
   }
  
  const onChangeFullName=(event)=>{
    setFullName(event.target.value)
   }
   const onChangeAge=(event)=>{
  
    setAge(event.target.value)
   }
  const onChangeGender=(event)=>{
    setGender(event.target.value)
   }
  
   const onChangeWorkingTime=(event)=>{
    setWorkingTime(event.target.value)
   }
   const onChangeMaritialStatus=(event)=>{
    setMaritialStatus(event.target.value)
   }
   const onChangeMobileNumber=(event)=>{
    setMobileNumber(event.target.value)
   }
  //  const onChangeOtp=(event)=>{
  //   setOtp(event.target.value)
  //  }
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
   const BankHolderNameChange = (event)=>{
    setHolderName(event.target.value)
  }
   const onChangeCity=(event)=>{
    setSelectCity(event.target.value)
    city.filter(item=>{
      if(item.PushId===event.target.value){
        setSelectCityName(item.Name)
      }
      return item
    })
    var database = app.database();
    database.ref().child("Masters").child("Localities")
    .orderByChild("City").equalTo(event.target.value)
      .on('value', function(snapshot){
        if(snapshot.exists()){
            console.log(snapshot.val())
            var content = [];
            snapshot.forEach(localityData=>{
                content.push(localityData.val());
              });
               setLocality(content);
            }else{
              setLocality("Select")
            }
        })
   }
   const onChangeLocality=(event)=>{
    setSelectLocality(event.target.value)
    locality.filter(item=>{
      if(item.PushId===event.target.value){
        setSelectLocality(item.Name)
      }
      return item

    })
   }
   const onChangeReferenceType=(event)=>{
    setReference(event.target.value)
   }
   const onChangeAgency=(event)=>{
    setSelectAgency(event.target.value)
   }
   const onChangeAccountName=(event)=>{
    setAccountName(event.target.value)
   }
   const onChangeAccountNumber=(event)=>{
    setAccountNumber(event.target.value)
   }
   const onChangeIFSCcode=(event)=>{
    setIfscCode(event.target.value)
      if(event.target.value!==10){
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
   const onChangeRemarks=(event)=>{
    setRemarks(event.target.value)
   }
   const onChangeVehicalName=(event)=>{
    setVehicalName(event.target.value)
   }
   const onChangeVehicalNumber=(event)=>{
    setVehicalNumber(event.target.value)
   }
   const onChangeInsurenceNumber=(event)=>{
    setInsuranceNumber(event.target.value)
   }
   const onChangeRcNumber=(event)=>{
    setRCnumber(event.target.value)
   }
   const onChangeAmount=(event)=>{
    setAmount(event.target.value)
   }
   const onChangePaymentType=(event)=>{
    setPaymentType(event.target.value)
   }
   const onChangeRecieptNumber=(event)=>{
    setRecieptNumber(event.target.value)
   }
   const onChangePassportFile=(event)=>{
    const image = event.target.files[0]
    // setPassportFile(imageFile => (image))
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
          setPassportUrl(fireBaseUrl)
          window.temp++
       })
       
    })
  
  
   }
   const onChangeAdharFile=(event)=>{
    const image = event.target.files[0]
    // setAdharFile(imageFile => (image))
    if(image === '' ) {
      console.error(`not an image, the image file is a ${typeof(image)}`)
  
    }
    const uploadTask2 = storage.ref(`/${image.name}`).put(image)
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
      storage.ref().child(image.name).getDownloadURL()
       .then(fireBaseUrl => {
          setAdharUrl(fireBaseUrl)
          window.temp++
       })
       
    })  
   }
   const onChangePanFile=(event)=>{
    const image = event.target.files[0]
    // setPanFile(imageFile => (image))
                  
    if(image === '' ) {
      console.error(`not an image, the image file is a ${typeof(image)}`)
  
    }
    const uploadTask3= storage.ref(`/${image.name}`).put(image)
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
      storage.ref().child(image.name).getDownloadURL()
       .then(fireBaseUrl => {
          setPanUrl(fireBaseUrl)
          window.temp++
       })
       
    }) 
   }
   const onChangePassBookFile=(event)=>{
    const image = event.target.files[0]
    // setPassbookFile(imageFile => (image))
    if(image === '' ) {
      console.error(`not an image, the image file is a ${typeof(image)}`)
     
    }
    const uploadTask4= storage.ref(`/${image.name}`).put(image)
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
      storage.ref().child(image.name).getDownloadURL()
       .then(fireBaseUrl => {
          setPassbookUrl(fireBaseUrl)
          window.temp++
       })
       
    })
   }
   const onChangeRcFile=(event)=>{
    const image = event.target.files[0]
    // setRCFile(imageFile => (image))
    if(image === '' ) {
      console.error(`not an image, the image file is a ${typeof(image)}`)
  
    }
    const uploadTask5= storage.ref(`/${image.name}`).put(image)
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
      storage.ref().child(image.name).getDownloadURL()
       .then(fireBaseUrl => {
          setRcUrl(fireBaseUrl)
          window.temp++
       })
       
    })  
   }
   const onChangeDrivingFile=(event)=>{
    const image = event.target.files[0]
    // setDrivingFile(imageFile => (image))
    if(image === '' ) {
      console.error(`not an image, the image file is a ${typeof(image)}`)
  
    }
    const uploadTask6= storage.ref(`/${image.name}`).put(image)
    uploadTask6.on('state_changed', 
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
          setDrivingUrl(fireBaseUrl)
          window.temp++
       })
       
    }) 
   }
   const onChangeInsurenceFile=(event)=>{
    const image = event.target.files[0]
    // setInsurenceCopyFile(imageFile => (image))
    if(image === '' ) {
      console.error(`not an image, the image file is a ${typeof(image)}`)
    
    }
    const uploadTask7= storage.ref(`/${image.name}`).put(image)
    uploadTask7.on('state_changed', 
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
          setDrivingUrl(fireBaseUrl)
          window.temp++
       })
       
    }) 
   }
   const onSearchHandler=(event)=>{
  const pushId=event.target.id
    var firebaseref=app.database().ref().child("DeliveryPartner").child(pushId);
    return firebaseref.once('value').then(function(snapshot) {
        if(snapshot.exists()){
           setSearchName(snapshot.val().UserId);

        setFullName(snapshot.val().Name);
        setFatherName( snapshot.val().FName);
        setAge( snapshot.val().Age);
        setGender( snapshot.val().Gender);
        setWorkingTime( snapshot.val().Working);
        setMaritialStatus( snapshot.val().Maritial);
        setMobileNumber( snapshot.val().MobileNumber);
        setAlterMobileNumber( snapshot.val().AlternateNumber);
        setAddress( snapshot.val().Address);
        setSelectCity(snapshot.val().City);
        setSelectCityName(snapshot.val().CityName)
        setReference(snapshot.val().Type);
        if(snapshot.val().BankHolderName===undefined){
          setHolderName("")
        }
        else{
          setHolderName(snapshot.val().BankHolderName)
  
        }
        if(reference === "Agency"){
  
        setSelectAgency(snapshot.val().Agency);
        setAgencyHide(false)
      }else{
        setAgencyHide(true)
        }
  
        var database = app.database();
        database.ref().child("Masters").child("Localities")
        .orderByChild("City").equalTo(snapshot.val().City)
        .once('value', function(snapshot1){
          var content=[]
            snapshot1.forEach(function(data){
                var val = data.val(); 
              content.push(val)
            });
            setLocality(content)
            setSelectLocality(snapshot.val().Locality)
            setSelectLocalityName(snapshot.val().LocalityName)
            });
            setSelectState( snapshot.val().State);
          setZip( snapshot.val().Zipcode);
          setAccountName( snapshot.val().AccountName);
          setAccountNumber( snapshot.val().AccountNumber);
          setIfscCode( snapshot.val().IFSC)
          setBranchName( snapshot.val().BranchName);
          setBranchAddress( snapshot.val().BranchAddress);
          setRemarks( snapshot.val().Remarks);
          setVehicalName( snapshot.val().VName);
          setVehicalNumber( snapshot.val().VNumber);
          setInsuranceNumber( snapshot.val().INumber);
          setRCnumber( snapshot.val().RCNumber);
          setAmount( snapshot.val().Amount);
          setPaymentType( snapshot.val().PaymentType);
          setRecieptNumber( snapshot.val().Reciept);
          if(snapshot.val().Doc1!==""){
            setPassbookUrl(snapshot.val().Doc1)
          }else{
            setPassbookUrl("")
          }
          if(snapshot.val().Doc2!==""){
            setAdharUrl(snapshot.val().Doc2);
          }else{
            setAdharUrl("")
          }
          if(snapshot.val().Doc3!==""){
            setPanUrl(snapshot.val().Doc3);
          }else{
            setPanUrl("")          }
          if(snapshot.val().Doc4!==""){
            setPassbookUrl(snapshot.val().Doc4);
          }else{
            setPassbookUrl("")
          }
         
          if(snapshot.val().Doc5!==""){
            setRcUrl(snapshot.val().Doc5);
          }else{
            setRcUrl("")
          }
          if(snapshot.val().Doc6!==""){
            setDrivingUrl(snapshot.val().Doc6);
          }else{
            setDrivingUrl("")
          }
          if(snapshot.val().Doc7!==""){
            setInsurenceCopyUrl(snapshot.val().Doc7);
          }else{
            setInsurenceCopyUrl("")
          }
          window.temp=7;
          window.verified="Yes";
        }else{
          setHolderName("")

            setSearchName("")
            setFatherName("")
            setAge("")
            setGender("")
            setWorkingTime("")
            setMaritialStatus("")
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
            setRemarks("")
            setVehicalName("")
            setVehicalNumber("")
            setInsuranceNumber("")
            setRCnumber("")
            setAmount("")
            setPaymentType("")
            setReference("")
            setAgency("")
            setRecieptNumber("")
            window.temp=0;
            // setPassportFile("")
            setPassportUrl("")
            // setAdharFile("")
            setAdharUrl("")
            // setPassbookFile("")
            setPassbookUrl("")
            // setPanFile("")
            setPanUrl("")
            // setRCFile("")
            setRcUrl("")
            // setDrivingFile("")
            setDrivingUrl("")
            // setInsurenceCopyFile("")
            setInsurenceCopyUrl("")
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
          const onUpdateHandler=()=>{
      if(fullName==="")
      {
          alert("Enter  Name");
          return;
      }
      if(fatherName==="")
      {
          alert("Enter Fathers Name");
          return;
      }
      if(age==="")
      {
          alert("Enter Age");
          return;
      }
      if(gender==="Select")
      {
          alert("Select Gender");
          return;
      }
      if(workingTime==="Select")
      {
          alert("Select Working Time");
          return;
      }
      if(maritialStatus==="Select")
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
      if(selectCity==="Select")
      {
          alert("Select City");
          return;
      }
      if(holderName==="")
      {
          alert("Enter Bank Holder Name");
          // document.getElementById("#submit").removeAttr("disabled");
          return;
      }
      if(selectLocality==="Select")
      {
          alert("Select Locality");
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
      if(reference === "Select"){
              alert("Select Reference Type");
                  return;
         }
      else if(reference === "Agency"){
              if(selectAgency === "Select"){
                  alert('Select Agency');
                          return;
              }
         }
  
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
     
      if(vehicalName==="")
      {
          alert("Enter Vehicle Name");
          return;
      }
  
      if(vehicalNumber==="")
      {
          alert("Enter Vehicle Number");
          return;
      }
  
      if(insurenceNumber==="")
      {
          alert("Enter Insurance Number");
          return;
      }
  
      if(rcNumber==="")
      {
          alert("Enter RC Book Number");
          return;
      }
  
      if(amount==="")
      {
          alert("Enter Deposit Amount");
          return;
      }
  
      if(paymentType==="Select")
      {
          alert("Select Payment Type");
          return;
      }
  
      if(recieptNumber==="")
      {
          alert("Enter Reciept/Reference Number");
          return;
      }
  
    
              
              var firebaseref=app.database().ref().child("DeliveryPartner").child(searchName);
                  firebaseref.child("UserId").set(searchName);
                  firebaseref.child("Name").set(fullName);
                  firebaseref.child("FName").set(fatherName);
                  firebaseref.child("Age").set(age);
                  firebaseref.child("Gender").set(gender);
                  firebaseref.child("Working").set(workingTime);
                  firebaseref.child("Maritial").set(maritialStatus);
                  firebaseref.child("MobileNumber").set(mobileNumber);
                  firebaseref.child("AlternateNumber").set(alterMobileNumber);
                  firebaseref.child("Address").set(address);
                  firebaseref.child("City").set(selectCity);
                  firebaseref.child("CityName").set(selectCityName);
                  firebaseref.child("BankHolderName").set(holderName);

                  firebaseref.child("Locality").set(selectLocality);
                  firebaseref.child("LocalityName").set(selectLocalityName);
                  firebaseref.child("State").set(selectState);
                  firebaseref.child("Zipcode").set(zip);
                  firebaseref.child("AccountName").set(accountName);
                  firebaseref.child("AccountNumber").set(accountNumber);
                  firebaseref.child("IFSC").set(isfcCode);
                  firebaseref.child("BranchName").set(branchName);
                  firebaseref.child("BranchAddress").set(branchAddress);
                  firebaseref.child("Remarks").set(remarks);
                  firebaseref.child("VName").set(vehicalName);
                  firebaseref.child("VNumber").set(vehicalNumber);
                  firebaseref.child("INumber").set(insurenceNumber);
                  firebaseref.child("RCNumber").set(rcNumber);
                  firebaseref.child("Amount").set(amount);
                  firebaseref.child("PaymentType").set(paymentType);
                  firebaseref.child("Type").set(reference);
                  firebaseref.child("Agency").set(selectAgency);
                  firebaseref.child("Reciept").set(recieptNumber);
  
                                
                  firebaseref.child("Status").set("InActive");
                  firebaseref.child("AStatus").set("InActive");
                  var today = new Date();
                  var dd = String(today.getDate()).padStart(2, '0');
                  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                  var yyyy = today.getFullYear();
                  today = yyyy + '-' + mm + '-' + dd;
                  firebaseref.child("Updated").set(today);
  
                  setHolderName("")

         setSearchName("")
        setFatherName("")
        setAge("")
        setGender("")
        setWorkingTime("")
        setMaritialStatus("")
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
        setRemarks("")
        setVehicalName("")
        setVehicalNumber("")
        setInsuranceNumber("")
        setRCnumber("")
        setAmount("")
        setPaymentType("")
        setReference("")
        setAgency("")
        setRecieptNumber("")
        window.temp=0;
        // setPassportFile("")
        setPassportUrl("")
        // setAdharFile("")
        setAdharUrl("")
        // setPassbookFile("")
        setPassbookUrl("")
        // setPanFile("")
        setPanUrl("")
        // setRCFile("")
        setRcUrl("")
        // setDrivingFile("")
        setDrivingUrl("")
        // setInsurenceCopyFile("")
        setInsurenceCopyUrl("")
        // window.verified="no";
  
  
                  Swal.fire({
                      title: "Successfully Updated!",
                      text: "Delivery Partner Registered Id : " + searchName,
                      icon: "success",
                      confirmButtonText: "Ok" 
                     });
                     setButtonHide(false)
          }
      const onDeleteHandler=(event)=>{
        
      const pushid=event.target.id
  
      var superadmin=window.localStorage.getItem('superadmin');
      if(superadmin===null){                      
          superadmin=window.sessionStorage.getItem('superadmin');
          if(superadmin===null){
            history.push(`${process.env.PUBLIC_URL}/login`);
          } 
      }
  
      if(superadmin==="Yes"){
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
                              app.database().ref().child("DeliveryPartner").child(pushid).remove();

                                  
                                      Swal.fire("Chef Deleted!", {
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

  const onClickBackHandler=(event)=>{
   setButtonHide(false)
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
        // var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        // var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 0;  
        // var heightLeft = imgHeight;  
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
        pdf.save("DeliveryPartnerApprovals.pdf");  
      });
    }
    const onApprovalHandler=(event)=>{
        const pushid =event.target.id
        var firebaseref=app.database().ref().child("DeliveryPartner").child(pushid);      
    firebaseref.child("AStatus").set("Active");
   
    Swal.fire({
        title: "Successfully Approved!",
        text: "",
        icon: "success",
        confirmButtonText: "Ok" 
       });
    }
    const handleSearch = (e)=>{
      let target = e.target.value.toLowerCase().trim()
      setFilterFn({
          fn: items =>{
              if(target === ""){
              return items;
              }
              else{
              return items.filter(x =>{
                return Object.keys(x).some(key =>
                  users.includes(key) ?false: x[key].toString().toLowerCase().includes(target)
                  )
              })
  
              }
          }
  
         
      })
  }
    const recordsAfterPagingAndSorting = ()=>{
        return filterfn.fn(users)
    }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title="Approvals"/>
            <Container fluid={true}>
            {buttonHide===true?
                <Row>
                <Col sm="12">
                      <CardHeader>
                            <h6>Delivery Partner Approvals</h6>
                            {/* <span> Use a className <code> table </code> to any table.</span> */}
                        </CardHeader>
                        <Col sm="12" style={{marginTop:"3%",marginLeft:"-1%"}}>
                  
                     
                            <h5>Alter  Delivery Partner Details</h5>
                            {/* <span> Use a className <code> table </code> to any table.</span> */}
                    
                        </Col>
                        <Row className="form-row" style={{marginTop:"3%"}}>
                         <Col className="form-group col-md-6">
                         <label className="form-label">Select Delivery Partner Number</label>
                        <Row>
                        <Col className="col-lg-6 col-md-5 col-sm-5">
                        <Input value={searchName} onChange={onChangeSearchName} type="text" id="sname" className="form-control"/>
                        </Col>
                        {/* <Col className="col-sm-1 col-md-2">
                        <span id="search" onClick={onSearchHandler}><img src="https://img.icons8.com/ios-filled/24/000000/search.png"/></span>
                        </Col> */}
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

                     {/* <!-- <div className="form-group col-md-6">
                       <label className="form-label">Could Kitchen Name <span style="color: red;">*</span> </label>
                       <input type="text" id="kitchenname" className="form-control" placeholder="Cloud Kitchen Name">
                        <div className="clearfix"></div>
                        </div> --> */}
                    <Col className="form-group col-md-4">
                    <label className="form-label">Full Name <span style={{color: "red"}}>*</span></label>
                    <Input type="text" value={fullName} onChange={onChangeFullName} id="name" className="form-control" placeholder="Full Name"/>
                    <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Father Name <span style={{color: "red"}}>*</span></label>
                    <Input type="text" value={fatherName} onChange={onChangeFNameHandler} id="name" className="form-control" placeholder="Full Name"/>
                    <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-2">
                   <label className="form-label">Age <span style={{color: "red"}}>*</span></label>
                    <Input type="number" value={age} onChange={onChangeAge} id="age" className="form-control" placeholder="Age"/>
                     <div className="clearfix"></div>
                    </Col>
                     </Row>

                     <Row className="form-row">
                     <Col className="form-group col-md-4">
                    <label className="form-label">Gender <span style={{color: "red"}}>*</span></label>
                    <select value={gender} onChange={onChangeGender}className="form-control" id="gender">
                    <option value="Select">Select</option>
                    <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Transgender">Transgender</option>
                     </select>                          <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                   <label className="form-label">Working Time<span style={{color: "red"}}>*</span></label>
                   <select className="form-control" value={workingTime} onChange={onChangeWorkingTime} id="gender">
                    <option value="Select">Select</option>
                    <option value="Part Time">Part Time</option>
                     <option value="Full Time">Full Time</option>
                     <option value="Weekends">Weekends</option>
                     </select>                          
                      <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                   <label className="form-label">Marritial Status<span style={{color: "red"}}>*</span></label>
                   <select className="form-control" value={maritialStatus} onChange={onChangeMaritialStatus} id="gender">
                    <option value="Select">Select</option>
                    <option value="Married ">Married</option>
                     <option value="Single ">Single</option>
                     </select>                         
                      <div className="clearfix"></div>
                    </Col>
                     </Row>
                     <Row className="form-row">
                     <Col className="form-group col-md-6">
                    <label className="form-label">Mobile Number <span style={{color: "red"}}>*</span></label>
                    <Input type="number" id="mobilenumber" value={mobileNumber} onChange={onChangeMobileNumber} className="form-control" placeholder="Mobile Number"/>
                    <div className="clearfix"></div>
                     </Col>
                      
                     {/* <Col className="form-group col-md-2" >
                    <label className="form-label" id="otp">OTP <span style={{color: "red"}}>*</span></label>
                     <Input id="verification-code" value={otp} onChange={onChangeOtp}  type="number" className="form-control" placeholder="OTP"/>	
                    </Col> 
                               
                    <Col className="form-group col-md-3" style={{marginTop:"3%"}} >
                    <Button className="warning"  onClick={onSignInSubmit} id="sign-in-button"  style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}}>Send OTP</Button>	
                    <Button className="warning" onClick={onVerifyCodeSubmit} id="verify-code-button"  style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}}>Verify</Button>	

                    </Col> */}
                    
                  
                     <Col className="form-group col-md-6">
                    <label className="form-label">Alternate Mobile Number/Emergency Number</label>
                    <Input type="number" value={alterMobileNumber} onChange={onChangeAlterMobileNumber} id="anumber" className="form-control" placeholder="Mobile Number"/>
                    <div className="clearfix"></div>
                     </Col>                     
                    </Row>
                    <Row className="form-row">
                     <Col className="form-group col-md-12">
                    <label className="form-label">Address <span style={{color: "red"}}>*</span></label>
                    <Input type="text" value={address} onChange={onChangeAddress} id="mobilenumber" className="form-control" placeholder="Address"/>
                    <div className="clearfix"></div>
                     </Col>
                     </Row>

                    
                    <Row>
                    <Col className="form-group col-md-4">
                    <label className="form-label">State <span style={{color: "red"}}>*</span></label>
                    <select value={selectState} onChange={onChangeState}className="form-control" id="gender">
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
                    <Input value={zip} onChange={onChangeZip} type="number" className="form-control" id="gender" placeholder=""/>                      
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-12">
                    <h4>Working Location Details</h4>
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row className="form-row">
                     <Col className="form-group col-md-4">
                    <label className="form-label">City <span style={{color: "red"}}>*</span></label>
                    <select value={selectCity} onChange={onChangeCity} className="form-control" id="gender">
                    <option value="Select">Select</option>
                    {city.map((item,id)=>{
                      return(
                      <option key={id} value={item.PushId}>{item.Name}</option>)}
                      )}
                     </select>                        
                     <div className="clearfix"></div>
                    </Col>
                  
                    <Col className="form-group col-md-4">
                    <label className="form-label">Locality <span style={{color: "red"}}>*</span></label>
                    <select value={selectLocality} onChange={onChangeLocality} className="form-control" id="gender">
                    <option value="Select">Select</option>
                    {locality.map((item,id)=><option key={id}  value={item.PushId}>{item.Name}</option>)}

                     </select>                        
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-6">
                    <label className="form-label">Reference Type <span style={{color: "red"}}>*</span></label>
                    <select value={reference} onChange={onChangeReferenceType} className="form-control" id="gender">
                    <option value="Select">Select</option>
                    <option value="Agency">Agency</option>
                    <option value="Individual">Individual</option>
                     </select>                        
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    {agencyHide===true?
                    <Row>
                    <Col className="form-group col-md-6">
                    <label className="form-label">Agency ID </label>
                    <select value={selectAgency} onChange={onChangeAgency} className="form-control" id="agency">
                    <option value="Select">Select</option>

                     </select>                        
                     <div className="clearfix"></div>
                    </Col>
                    </Row>:
                      <Row>
                      <Col className="form-group col-md-6">
                      <label style={{display:"none"}}className="form-label">Agency ID </label>
                      <select value={selectAgency} onChange={onChangeAgency} style={{display:"none"}} className="form-control" id="agency">
                      <option value="Select">Select</option>
                      {agency.map((item,id)=><option key={id}  value={item.UserId}>{item.UserId}</option>)}

                       </select>                        
                       <div className="clearfix"></div>
                      </Col>
                      </Row>
                    }
                    <Row>
                    <Col className="form-group col-md-12">
                    <h4>Bank Account Details</h4>
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-4">
                   <label className="form-label">Bank Holder Name <span style={{color: "red"}}>*</span> </label>
                  <Input type="text" value={holderName} onChange={BankHolderNameChange} className="form-control"/>                    
                  <div className="clearfix"></div>
                </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Bank  Name <span style={{color: "red"}}>*</span> </label>
                    <Input value={accountName} onChange={onChangeAccountName} type="text"  className="form-control"/>                    
                     <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label"> Account Number <span style={{color: "red"}}>*</span> <span style={{color: "red"}}>*</span></label>
                    <Input value={accountNumber} onChange={onChangeAccountNumber}type="text" className="form-control" id="gender" placeholder=""/>                      
                     <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label"> IFSC Code <span style={{color: "red"}}>*</span></label>
                    <Input value={isfcCode} onChange={onChangeIFSCcode}type="text" className="form-control" id="gender" placeholder=""/>                      
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Branch Name <span style={{color: "red"}}>*</span> </label>
                    <Input value={branchName} onChange={onChangeBranchName} type="text"  className="form-control"/>                    
                     <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Branch Address <span style={{color: "red"}}>*</span> </label>
                    <Input value={branchAddress} onChange={onChangeBranchAddress} type="text" className="form-control" id="gender" placeholder=""/>                      
                     <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Remarks  </label>
                    <Input value={remarks} onChange={onChangeRemarks} type="text" className="form-control" id="gender" placeholder=""/>                      
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-12">
                    <h4>Vehicle Details</h4>
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Vehicle  Name <span style={{color: "red"}}>*</span> </label>
                    <Input value={vehicalName} onChange={onChangeVehicalName} type="text"  className="form-control"/>                    
                     <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Vehicle  Number <span style={{color: "red"}}>*</span> <span style={{color: "red"}}>*</span></label>
                    <Input value={vehicalNumber} onChange={onChangeVehicalNumber} type="text" className="form-control" id="gender" placeholder=""/>                      
                     <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Insurance Number  <span style={{color: "red"}}>*</span></label>
                    <Input value={insurenceNumber} onChange={onChangeInsurenceNumber} type="text" className="form-control" id="gender" placeholder=""/>                      
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-4">
                    <label className="form-label">RC Number <span style={{color: "red"}}>*</span> </label>
                    <Input value={rcNumber} onChange={onChangeRcNumber} type="text" className="form-control" id="gender" placeholder=""/>                      
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-12">
                    <h4>Deposit Payment Details</h4>
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Amount  <span style={{color: "red"}}>*</span> </label>
                    <Input value={amount} onChange={onChangeAmount} type="number"  className="form-control"/>                    
                     <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Payment Type <span style={{color: "red"}}>*</span> <span style={{color: "red"}}>*</span></label>
                    <select value={paymentType} onChange={onChangePaymentType} className="form-control" id="gender">
                    <option value="Select">Select</option>
                    <option value="Cash">Cash</option>
                    <option value="Online Payment">Online Payment</option>
                     </select>                            
                     <div className="clearfix"></div>
                    </Col>
                    <Col className="form-group col-md-4">
                    <label className="form-label">Reciept/Reference Numbers  <span style={{color: "red"}}>*</span></label>
                    <Input type="number" value={recieptNumber} onChange={onChangeRecieptNumber}className="form-control" id="gender" placeholder=""/>                      
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row>
                    <Col className="form-group col-md-12">
                    <h4>Documents Upload</h4>
                     <div className="clearfix"></div>
                    </Col>
                    </Row>

                    <Row className="form-group row">
                    <label className="col-form-label col-sm-2 text-sm-right">Passport Size Photo </label>
                    <Col className="col-sm-10">
                    <Input type="file"  onChange={onChangePassportFile} id="doc1" className="form-control" />
                    <div className="clearfix"></div>
                     </Col>
                     <div class="col-sm-2">
                       {passbookUrl===""?
                         <></>:
                         <a href={passportUrl}  id="a2" target="_blank" rel="noopener noreferrer">View</a>
                       }
                        </div>
                    </Row>

                    <Row className="form-group row">
                    <label className="col-form-label col-sm-2 text-sm-right">Aadhar Card Upload </label>
                    <Col className="col-sm-10">
                    <Input type="file" onChange={onChangeAdharFile} id="doc2" className="form-control" />
                    <div className="clearfix"></div>
                     </Col>
                     <div class="col-sm-2">
                     {adharUrl===""?
                         <></>:
                         <a href={adharUrl}   target="_blank" rel="noopener noreferrer">View</a>
                       }
                        </div>
                    </Row>

                    <Row className="form-group row">
                    <label className="col-form-label col-sm-2 text-sm-right">Pan/Voter </label>
                    <Col className="col-sm-10">
                    <Input type="file" onChange={onChangePanFile} id="doc3" className="form-control" />
                    <div className="clearfix"></div>
                     </Col>
                     <div class="col-sm-2">
                     {panUrl===""?
                         <></>:
                         <a href={panUrl}   target="_blank" rel="noopener noreferrer">View</a>
                       }
                        </div>
                    </Row>

                    <Row className="form-group row">
                    <label className="col-form-label col-sm-2 text-sm-right">Passbook/Bank Statement </label>
                    <Col className="col-sm-10">
                    <Input type="file" onChange={onChangePassBookFile} id="doc4" className="form-control" />
                    <div className="clearfix"></div>
                     </Col>
                     <div class="col-sm-2">
                     {passbookUrl===""?
                         <></>:
                         <a href={passbookUrl}   target="_blank" rel="noopener noreferrer">View</a>
                        }
                        </div>
                    </Row>

                    <Row className="form-group row">
                    <label className="col-form-label col-sm-2 text-sm-right">RC Book </label>
                    <Col className="col-sm-10">
                    <Input type="file" onChange={onChangeRcFile} id="doc5" className="form-control" />
                    <div className="clearfix"></div>
                     </Col>
                     <div class="col-sm-2">
                     {rcUrl===""?
                         <></>:
                         <a href={rcUrl}  id="a2" target="_blank" rel="noopener noreferrer">View</a>
                        }
                        </div>
                    </Row>

                    <Row className="form-group row">
                    <label className="col-form-label col-sm-2 text-sm-right">Driving Licence </label>
                    <Col className="col-sm-10">
                    <Input type="file" onChange={onChangeDrivingFile} id="doc6" className="form-control" />
                    <div className="clearfix"></div>
                     </Col>
                     <div class="col-sm-2">
                     {drivingUrl===""?
                         <></>:
                         <a href={drivingUrl}   target="_blank" rel="noopener noreferrer">View</a>
                        }
                        </div>
                    </Row>

                    <Row className="form-group row">
                    <label className="col-form-label col-sm-2 text-sm-right">Insurancy Copy </label>
                    <Col className="col-sm-10">
                    <Input type="file" onChange={onChangeInsurenceFile} id="doc7" className="form-control" />
                    <div className="clearfix"></div>
                     </Col>
                     <div class="col-sm-2">
                     {insurenceCopyUrl===""?
                         <></>:
                         <a href={insurenceCopyUrl} target="_blank" rel="noopener noreferrer">View</a>
                        }
                        </div>
                    </Row>
                 
                    <Button type="submit" id="submit" onClick={onClickBackHandler}  className="warning">Back</Button>:
                    
                    <Button type="submit" id="update" onClick={onUpdateHandler} className="warning" >Update</Button>
                  

                </Col>
         </Row>:
                <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h6> Delivery Partner Approvals</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-11">
                         <label className="form-label">Search </label>
                             <input type="text"  placeholder="Search..." onChange={handleSearch}  required=""  className="form-control"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="DeliveryPartnerApprovals"  
                sheet="DeliveryPartnerApprovals"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/approvals/deliveryPartner-approvals"
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
                                            <th scop="col">Delivery  ID</th>
                                            <th scop="col"> Full Name		</th>
                                            <th scop="col" >MobileNumber </th>
                                            <th scop="col"> City	</th>
                                            <th scop="col"> Locality	</th>
                                            <th scop="col">View Details	 </th>
                                            <th scop="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {recordsAfterPagingAndSorting().map((item,id)=>{
                                                    return(
                                                        <tr key={id}>
                                                            <td>{id+1}</td>
                                                       <td class="item_userid">{item.UserId}</td>
                                                       <td class="item_locality">{item.Name}</td>
                                                       <td>{item.MobileNumber}</td>
                                                       <td>{item.CityName}</td>
                                                       <td>{item.LocalityName}</td>
                                                       <td><button id={item.UserId} onClick={onSearchHandler} className="btn btn-primary">{"View Details"}</button></td>
                                                       <td class="actions" style={{textAlign:"center"}}><button type="button" id={item.UserId} onClick={onApprovalHandler} className="btn btn-success btn-sm"><Check size={15}/> {"Approve"}</button><br/><button type="button"id={item.UserId} onClick={onDeleteHandler} className="btn btn-danger btn-sm"><Trash size={15}/> {"Cancel"} </button></td>
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
            );
        };
        
export default DeliveryPartnerApprovals;