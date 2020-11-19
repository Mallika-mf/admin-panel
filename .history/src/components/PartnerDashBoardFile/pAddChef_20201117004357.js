import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,CardHeader,Input,Button} from "reactstrap";
import app, {storage} from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore'
import * as firebase from "firebase/app";
import axios from 'axios'
import {useHistory} from 'react-router-dom'


const AddChef = () => {
  const history = useHistory();
  const [holderName,setHolderName] = useState("")

  const [localFood,setLocalFood] = useState(false)
  const[hide,setHide] = useState(false)
  const [hideSignIn,setHideSignIn] = useState(false)  

    // const[buttonHide,setButtonHide] = useState(false)
  const [selectCityName,setSelectCityName] = useState("")
    const [selectZoneName,setSelectZoneName] = useState("")
  const [selectLocalityName,setSelectLocalityName] = useState("")


  const[aRating,setArating] = useState("")
  const[aRaview,setAraview] = useState("")

  const[refName1,setRefName1]=useState("")
  const[refNumber1,setRefNumber1]=useState("")
  const[refName2,setRefName2]=useState("")
  const[refNumber2,setRefNumber2]=useState("")
  const[refAddress1,setRefAddress1]=useState("")
  const[refAddress2,setRefAddress2]=useState("")
  const[memberShip,setMemberShip] = useState("")
  const[remark,setRemark]= useState("")
  const [sname,setSname] = useState("")
  const [name,setName] = useState("")
  const [age,setAge] = useState("")
  const [gender,setGender] = useState("")
  const [mail,setMail] = useState("")
  const [mnumber,setMnumber] = useState()
  const [otp,setOtp] = useState()
  const [aMobileNumber,setAmobileNumber] = useState("")
  const [address,setAddress] = useState("")
  const [selectZone,setSelecetZone] = useState("")
  const [selectLocality,setSelectLocality] = useState("")
  // const [selectState,setSelectState] = useState("")
  const [zipCode,setZip] = useState("")
  const [landMark, setLandMark] = useState("")
  const [kopen,setKopen] = useState("")
  const [kClose,setKclose] = useState("")
  const [bankName,setBankName] = useState("")
  const [bankNumber,setBankNumber] = useState("")
  const [bankCode,setBankCode] = useState("")
  const [branchName,setBranchName] = useState("")
  const [branchAddress,setBranchAddress] = useState("")
  const [sAmount,setSamount] = useState("")
  const [comPer,setComPer] = useState("")
  const [refCode,setRefCode] = useState("")
  // const [wPartnerId,setWpartnerId] = useState("")
  const [cateringService,setCateringService] = useState(false)
  // const [passportimageAsFile, setPassportImageAsFile] = useState('')
  
  const [passportImageAsUrl, setPassportImageAsUrl] = useState("")
  // const [adharCardImageAsFile,setAdharCardImageAsFile] = useState('')
  const [adharCardImageAsUrl,setAdharCardImageAsUrl] = useState("")
  // const [PanImageAsFile,setPanImageAsFile] = useState("")
  const [panImageAsUrl,setPanImageAsUrl] = useState("")
  // const [bankStateMentImageAsFile,setBankStateMentImageAsFile] = useState("")
  const [bankStateMentImageAsUrl,setBankStateMentImageAsUrl] = useState("")
  // const [fssiCertiImageAsFile,setFssiCertiImageAsFile] = useState("")
  const [fssiCertiImageAsUrl,setFssiCertiImageAsUrl] = useState("")
  // const [gstImageAsFile,setGstImageAsFile] = useState("")
  const [gstImageAsUrl,setGstImageAsUrl] = useState("")
  const [sdate,setSdate] = useState("")
  const [edate,setEdate] = useState("")
  const [desc,setDesc] = useState("")
  const [special,setSpecial] = useState("")
  const [brand,setBrand] = useState("")
  const [user,setUser] = useState([])
  const [zone,setZone] = useState([])
  const [state,setState] = useState("")
  // const [cID,setcID] = useState([])
  const [cNO,setcNO] = useState([])
  const [city,setCity] = useState([])
  const [citySelect,setCitySelect] = useState("")
  const [officeCity,setOfficeCity] = useState("")
  const [officeCityName,setOfficeCityName] = useState("")
  // const[cityPushId,setCityPushId] = useState([])
  // const[localityPushId,setLocalityPushId] = useState([])
  // const[subLocalityPushId,setSubLocalityPushId] = useState([])

  // const [agency,setAgency] = useState([])
  const [agencyName,setAgencyName] = useState("")
  // const [review,setReview] = useState("")
  const [veg,setVeg] = useState(false)
  const [ kname,setKname] = useState("")
  const [husband,setHusband] = useState("")

 
var citypushid=[];
var localitypushid=[];
var sublocalitypushid=[];
var cid=[];
var cno=[];
var passed=false;
   useEffect(()=>{
  
        var city=window.localStorage.getItem('city');
if(city===null){                      
    city=window.sessionStorage.getItem('city');
    if(city===null){
          history.push(`${process.env.PUBLIC_URL}/login`);
    } 
}
var username=window.localStorage.getItem('name');
if(username===null){                      
    username=window.sessionStorage.getItem('name');
    if(username===null){
history.push(`${process.env.PUBLIC_URL}/login`);
    } 
}
setAgencyName(username)
   var cno=[];
   var cid=[];
    app.database().ref().child("CloudKitchen")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
                     if(val.UserId!==""){
                if(val.City===""){
                    if(val.Franchise===null){
                            cid.push(val.UserId);
                            cno.push(val.MobileNumber);
                    }
                    else if(val.Franchise!=="")
                    {
                        if(val.Franchise===agencyName){
                        cid.push(val.UserId);
                        cno.push(val.MobileNumber);
                        }
                    }
                    else{
                        cid.push(val.UserId);
                        cno.push(val.MobileNumber);
                    }
                }
                else if(val.City!==""){
                    if(val.City===city){
                        if(val.Franchise===null){
                            cid.push(val.UserId);
                            cno.push(val.MobileNumber);
                        }
                        else if(val.Franchise!=="")
                        {
                            if(val.Franchise===agencyName){
                            cid.push(val.UserId);
                            cno.push(val.MobileNumber);
                            }
                        }
                        else{
                            cid.push(val.UserId);
                            cno.push(val.MobileNumber);
                        }
                    }
                }
            }
            // setcID(cid)
            setcNO(cno)
        });
        // $("#sname").autocomplete({
        //     source: cid
        //   });
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
            snapshot.forEach(function(snap){
              citypushid.push(snap.val.PushId)
                content.push(snap.val())
            });
           setCity(content)
          //  setCityPushId(citypushid)
            });
            // app.database().ref().child("Franchise")
            // .once('value').then(function(snapshot) {
            //     var  content=[]
            //     snapshot.forEach(function(snap){
              
            //       content.push(snap.val())
            //     });
            //     setAgency(content)
            //     });
                 app.database().ref().child("Masters").child("Localities")
                  .on('value', function(snapshot){
                    if(snapshot.exists()){
                        // document.getElementById('#datatable').empty();
                        var content = [];
                       
                        snapshot.forEach(snap=>{
                            content.push(snap.val());
                            localitypushid.push(snap.val.PushId)
                          });
                              
                            // setLocalityPushId(localitypushid)
                        }
                    })
    },[]);
    const  onSignInSubmit =()=> {
      // var len=mnumber.length;
    //  if (len===10) {
        window.signingIn = true;
        var phoneNumber ="+91"+ mnumber;
        var appVerifier = window.recaptchaVerifier;
        app.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
              console.log(confirmationResult)
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              window.signingIn = false;
              setHideSignIn(true)
              // document.getElementById('verification-code').style.display="inline";
              // document.getElementById('otp').style.display="inline";
              // document.getElementById('verify-code-button').style.display="inline";
              // document.getElementById('mobilenumber').style.display="inline";
              // document.getElementById('sign-in-button').style.display="none";
    
            })
            // .catch(function (error) {
            //   // Error; SMS not sent
            //   console.error('Error during signInWithPhoneNumber', error);
            //   window.alert('Error during signInWithPhoneNumber:\n\n'
            //       + error.code + '\n\n' + error.message);
            //   window.signingIn = false;
            //   ;
            // });
      // }
      // else{
      //   alert("Enter Proper Phone Number"); 
      //   return;
      // }
    }
    // function verifyCodeHandler(){
    //   onVerifyCodeSubmit();
    // }

    function onVerifyCodeSubmit() {
      // var code=document.getElementById('verification-code');
    
      if (otp!=="") {
        window.verifyingCode = true;
        window.confirmationResult.confirm(otp).then(function (result) {
          console.log("confirmation",result)
          // User signed in successfully.
          // var user = result.user;
          window.verifyingCode = false;
          window.confirmationResult = null;
          setHideSignIn(false)
          // document.getElementById('verification-code').style.display="none";
          // document.getElementById('otp').style.display="none";
          // document.getElementById('verify-code-button').style.display="none";
          // document.getElementById('mobilenumber').style.display="inline";
          window.verified="yes";
    
    
        })
        .catch(function (error) {
          // User couldn't sign in (bad verification code?)
          console.error('Error while checking the verification code', error);
          window.alert('Error while checking the verification code:\n\n'
              + error.code + '\n\n' + error.message);
          window.verifyingCode = false;   
        });
      }
    }
    const onChangeOfficeCityHandler = (event)=>{
      setOfficeCity(event.target.value)
      city.filter(item=>{
        if(item.PushId===event.target.value){
          setOfficeCityName(item.Name)
        }
        return item
      })
    }
  const onChangeCityHandler = (event)=>{
    setCitySelect(event.target.value)
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
            // document.getElementById('#datatable').empty();
            var content = [];
           
            snapshot.forEach(snap=>{
                content.push(snap.val());
                localitypushid.push(snap.val.PushId)
              });
                  
                // setLocalityPushId(localitypushid)
               setUser(content);
            }
        })
  }
  const onChangeZoneHandler=(event)=>{
setSelecetZone(event.target.value)
user.filter(item=>{
if(item.PushId===event.target.value){
  setSelectZoneName(item.Name)
}
return item

})
app.database().ref().child("Masters").child("SubLocalities")
  .orderByChild("Locality").equalTo(event.target.value)
  .once('value', function(snapshot){
    var content = [];
      snapshot.forEach(function(snap){
        content.push(snap.val())
        sublocalitypushid.push(snap.val.PushId)
      });
     setZone(content)
    //  setSubLocalityPushId(sublocalitypushid)
      sublocalitypushid.reverse();
      }); 
  }

 const  onChangeLocalityHandler=(event)=>{
  setSelectLocality(event.target.value)
  zone.filter(item=>{
    if(item.PushId===event.target.value){
      setSelectLocalityName(item.Name)
    }
    return item

  })
  }
  const onChangeCommisionPercentage = (event)=>{
    setComPer(event.target.value)
  }

  const onChangeSubscriptionAmount=(event)=>{
    setSamount(event.target.value)
  }

  const onChangeSearchName =(event)=>{
    setSname(event.target.value)
  }

  const onChangeNameHandler =(event)=>{
    setName(event.target.value)
  }

  const onChangeAge=(event)=>{
    setAge(event.target.value)
  }

  const onChangeGender =(event)=>{
    setGender(event.target.value)
  }

  const onChangeMail=(event)=>{
    setMail(event.target.value)
  }

  const onChangeMobileNumber=(event)=>{
    setMnumber(event.target.value)
  }

  const onChangeAlterMobileNumber=(event)=>{
    setAmobileNumber(event.target.value)
  }

  const onChangeAddress=(event)=>{
    setAddress(event.target.value)
  }

  const onChangeState =(event)=>{
    setState(event.target.value)
  }


  const onChangeZipCode =(event)=>{
    setZip(event.target.value)
  }

  const onChangeLandMark = (event) => {
    setLandMark(event.target.value)
  }

  const specialDishChange =(event)=>{
    setSpecial(event.target.value)
  }

  const kitchenOpenChange=(event)=>{
    setKopen(event.target.value)
  }

  const kitchenCloseChange=(event)=>{
    setKclose(event.target.value)
  }


  const referelName1Change=(event)=>{
    setRefName1(event.target.value)
  }

  const referelName2Change=(event)=>{
    setRefName2(event.target.value)
  }

  const referelNumber1Change=(event)=>{
    setRefNumber1(event.target.value)
  }

  const referelNumber2Change=(event)=>{
    setRefNumber2(event.target.value)
  }

  const referelAddress1Change =(event)=>{
    setRefAddress1(event.target.value)
  }

  const referelAddress2Change =(event)=>{
    setRefAddress2(event.target.value)
  }

  const BankNameChange=(event)=>{
    setBankName(event.target.value)
  }
  
  const bankNumberChange=(event)=>{
    setBankNumber(event.target.value)
  }
  
  const bankCodeChange=(event)=>{
    setBankCode(event.target.value)
//     if(bankCode.length!==11){
//   alert('Enter proper ifsc code');
//   return;
// }
      axios.get("https://ifsc.razorpay.com/"+event.target.value)
      .then(function (response) {

        console.log(response)
        setBranchName(response.data.BRANCH);
        setBranchAddress(response.data.ADDRESS);
      })
      .catch(function (error) {
          console.log(error);
         setBranchName("");
          setBranchAddress("");
      });
  
}
  const branchNameChange =(event)=>{
    setBranchName(event.target.value)
  }
  const branchAddressChange =(event)=>{
    setBranchAddress(event.target.value)
  }
  const RemarkChange=(event)=>{
    setRemark(event.target.value)
  }
  const startingDateChange =(event)=>{
    setSdate(event.target.value)
  }
  const endingDateChange =(event)=>{
    setEdate(event.target.value)
  }
  
  const chefDescriptionChange =(event)=>{
    setDesc(event.target.value)
  }
  const ingredientBrandChange =(event)=>{
    setBrand(event.target.value)
  }
  const AgencyNameChange =(event)=>{
    setAgencyName(event.target.value)
  }

  const vegChangeHandler=(event)=>{
    setVeg(event.target.checked)
  }

  const cateringServiceChange=(event)=>{
    setCateringService(event.target.checked)
  }

  const localFoodHnadler=(event)=>{
    setLocalFood(event.target.checked)
  }
  
  const hnameChange=(event)=>{
    setHusband(event.target.value)
  }
  
  const kitchenNameChange=(event)=>{
    setKname(event.target.value)
  }

   const onChangeOtp=(event)=>{
     setOtp(event.target.value)
   }
  const referelCodeChange =(event)=>{
    setRefCode(event.target.value)
  }
  const auditorRatingChange=(event)=>{
    setArating(event.target.value)
  }
  const auditrRaviewChange =(event)=>{
    setAraview(event.target.value)
  }
  const BankHolderNameChange = (event)=>{
    setHolderName(event.target.value)
  }

  const onChangePassPort = (event) => {
    const image = event.target.files[0]
    // setPassportImageAsFile(imageFile => (image))
    if (image === '') {
      console.error(`not an image, the image file is a ${typeof (image)}`)
    }
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
    };

    const uploadTask = storage.ref(`CloudKitchen/${name}`).put(image, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storage.ref("CloudKitchen/").child(name).getDownloadURL()
          .then(fireBaseUrl => {
            setPassportImageAsUrl(fireBaseUrl)
            window.temp++
          })


      })

  }
  const onChangeAdhar = (event) => {
    const image = event.target.files[0]
    // setAdharCardImageAsFile(imageFile => (image))
    if (image === '') {
      console.error(`not an image, the image file is a ${typeof (image)}`)
    }
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
    };

    const uploadTask = storage.ref(`CloudKitchen/${name}`).put(image, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storage.ref("CloudKitchen/").child(name).getDownloadURL()
          .then(fireBaseUrl => {
            setAdharCardImageAsUrl(fireBaseUrl)
            window.temp++
          })
        // setPassportImageAsUrl(prevObject => ({...prevObject, passportImgUrl: fireBaseUrl}))

      })

  }

  const onChangePanHandler = (event) => {
    const image = event.target.file[0]
    // setPanImageAsFile(imageFile => (image))

    if (image === '') {
      console.error(`not an image, the image file is a ${typeof (image)}`)
    }
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
    };

    const uploadTask = storage.ref(`CloudKitchen/${name}`).put(image, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storage.ref("CloudKitchen/").child(name).getDownloadURL()
          .then(fireBaseUrl => {
            setPanImageAsUrl(fireBaseUrl)
            window.temp++
          })

        //  .then(()=>{setImageAsUrl({imgUrl:""})})

      })
  }
  const onChangeBankStatement = (event) => {
    const image = event.target.files[0]
    // setBankStateMentImageAsFile(imageFile => (image))


    if (image === '') {
      console.error(`not an image, the image file is a ${typeof (image)}`)
    }
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
    };

    const uploadTask = storage.ref(`CloudKitchen/${name}`).put(image, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storage.ref("CloudKitchen/").child(name).getDownloadURL()
          .then(fireBaseUrl => {
            setBankStateMentImageAsUrl(fireBaseUrl)
            window.temp++
          })

        //  .then(()=>{setImageAsUrl({imgUrl:""})})

      })

  }
  const onChangeFssiCertificate = (event) => {
    const image = event.target.files[0]
    // setFssiCertiImageAsFile(imageFile => (image))

    if (image === '') {
      console.error(`not an image, the image file is a ${typeof (image)}`)
    }
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
    };

    const uploadTask = storage.ref(`CloudKitchen/${name}`).put(image, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storage.ref("CloudKitchen/").child(name).getDownloadURL()
          .then(fireBaseUrl => {
            setFssiCertiImageAsUrl(fireBaseUrl)
            window.temp++
          })
        //  .then(()=>{setImageAsUrl({imgUrl:""})})

      })



  }
  const onChangeGst = (event) => {
    const image = event.target.files[0]
    // setGstImageAsFile(imageFile => (image))


    if (image === '') {
      console.error(`not an image, the image file is a ${typeof (image)}`)
    }
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
    };

    const uploadTask = storage.ref(`CloudKitchen/${name}`).put(image, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storage.ref("CloudKitchen/").child(name).getDownloadURL()
          .then(fireBaseUrl => {
            setGstImageAsUrl(fireBaseUrl)
            window.temp++
          })
          .then(() => { setGstImageAsUrl("") })
        //  .then(()=>{setImageAsUrl({imgUrl:""})})

      })

  }
 const onChangeMemberShip=(event)=>{
  // var membership = document.getElementById('membership');
setMemberShip(event.target.value)
  if(memberShip === "Free"){
  //  document.getElementById('subscription').style.display="flex";
  //  document.getElementById('commission').style.display="flex";
   setSamount("0");
   setComPer("24");
  }
  else   if(memberShip === "Bronze"){
  //  document.getElementById('subscription').style.display="flex";
  //  document.getElementById('commission').style.display="flex";
   setSamount("14999");
   setComPer("18");
  }
  else  if(memberShip === "Silver"){
  //  document.getElementById('subscription').style.display="flex";
  //  document.getElementById('commission').style.display="flex";
   setSamount("29999");
   setComPer("12");
  }
  else  if(memberShip === "Gold"){
  //  document.getElementById('subscription').style.display="flex";
  //  document.getElementById('commission').style.display="flex";
   setSamount("79999");
   setComPer("5");
  }
  else  if(memberShip === "Custom"){
  //  document.getElementById('subscription').style.display="flex";
  //  document.getElementById('commission').style.display="flex";
   setSamount("");
  setComPer("");
  }
  }
  const onClickSearchHandler=(event)=>{
    var zoneId="";
    // var localityId="";
    setHide(true)
  if(sname==="")
      {
          alert("Enter Cloud Kitchen Number");
          return
      }
      console.log(sname)

  var firebaseref=app.database().ref().child("CloudKitchen").child(sname);
  return firebaseref.once('value').then(function(snapshot) {
      if(snapshot.exists()){
       setName(snapshot.val().Name);
      // kitchenname.value= snapshot.val().KitchenName;
      setAge(snapshot.val().Age)
      if(snapshot.val().Gender!==null&&snapshot.val().Gender!=="")
          setGender(snapshot.val().Gender);
      setMail(snapshot.val().Email);
      setMnumber(parseInt(snapshot.val().MobileNumber))
      setAmobileNumber(snapshot.val().AlternateNumber);
      setAddress(snapshot.val().Address);
      setCitySelect(snapshot.val().City)
      setSelectCityName(snapshot.val().CityName)
      if(snapshot.val().OfficeCity!==undefined){
        setOfficeCity(snapshot.val().OfficeCity)
        setOfficeCityName(snapshot.val().OfficeCityName)
      }
      zoneId=snapshot.val().Locality
      // var localityId=snapshot.val().SubLocality

        app.database().ref().child("Masters").child("City")
        .once('value').then(function(snapshotCity) {
            var content=[]
            snapshotCity.forEach(function(cityData){
              content.push(cityData.val())
            });
           setCity(content)
            });
            if(snapshot.val()!==undefined){
            var mLocalityList = [];
              var database = app.database();
              database.ref().child("Masters").child("Localities")
              .orderByChild("City").equalTo(snapshot.val().City)
              .once('value', function(snapLocality){
                    snapLocality.forEach(function(localityData){
                    mLocalityList.push(localityData.val());
                  });
                  mLocalityList.reverse();
                  setUser(mLocalityList)
                  setSelecetZone(zoneId)
                  setSelectZoneName(snapshot.val().LocalityName)
                  if(snapshot.val().SubLocality!==undefined){
                  var subLocalityList=[];
                  var database = app.database();
                  database.ref().child("Masters").child("SubLocalities")
                  .orderByChild("Locality").equalTo(snapshot.val().SubLocality)
                  .once('value', function(snapSublocality){
                    snapSublocality.forEach(function(sublocalityData){
                          subLocalityList.push(sublocalityData.val());   
                      })
                      subLocalityList.reverse();
                      setZone(subLocalityList)
                      setSelectLocality(snapshot.val().SubLocality)
                      setSelectLocalityName(snapshot.val().SubLocalityName)
                      });
                  }
              });
            } 
       


      if(snapshot.val().Passed!==null&&snapshot.val().Passed!==""){
          if(snapshot.val().Passed==="Yes"){
              passed=true;
              document.getElementById('smssent').style.display="block";
          }
          else{
              document.getElementById('smssent').style.display="block";
          }
      }
         

          if(snapshot.val().Franchise!==null&&snapshot.val().Franchise!==""){
              setAgencyName(snapshot.val().Franchise)
          }
     
          if(snapshot.val().State!==null&&snapshot.val().State!=="")
              setState(snapshot.val().State);
      setZip(snapshot.val().Zipcode);
      if(snapshot.val().LandMark!==undefined){
        setLandMark(snapshot.val().LandMark);
      }else{
        setLandMark("")
      }      setSpecial(snapshot.val().Special);
      setKopen(snapshot.val().Open);
      setKclose(snapshot.val().Close);
      setDesc(snapshot.val().Details);
      setBrand(snapshot.val().Brand);
      setRefName1(snapshot.val().ReferenceName1);
      setRefAddress1(snapshot.val().ReferenceAddress1);
      setRefNumber1(snapshot.val().ReferenceNumber1);
      setRefName2(snapshot.val().ReferenceName2);
      setRefAddress2(snapshot.val().ReferenceAddress2);
      setRefNumber2(snapshot.val().ReferenceNumber2);
      setBankName(snapshot.val().AccountName);
      setBankNumber(snapshot.val().AccountNumber);
      setBankCode(snapshot.val().IFSC);
      setBranchName(snapshot.val().BranchName);
      setBranchAddress(snapshot.val().BranchAddress);
      setRemark(snapshot.val().Remarks);
      if(snapshot.val().Membership!==null&&snapshot.val().Membership!=="")
          setMemberShip(snapshot.val().Membership);
      setRefCode(snapshot.val().Referral);
      setArating(snapshot.val().ARatings);
      setAraview(snapshot.val().AReviews);
      if(snapshot.val().KitchenName!==null&&snapshot.val().KitchenName!=="")
          setKname(snapshot.val().KitchenName);
      if(snapshot.val().FatherName!==null&&snapshot.val().FatherName!=="")
          setHusband(snapshot.val().FatherName);

      var a=snapshot.val().Location.split(",");
      window.lat=a[0];
      window.long=a[1];
      // if(membership.options[membership.selectedIndex].value === "Subscription"){
          setSamount(snapshot.val().SAmount);
          setSdate(snapshot.val().SDate);
         setComPer(snapshot.val().Commision);
          // document.getElementById('subscription').style({display:"flex"});
          // document.getElementById('commission').style{(display:"flex")};
      //    }
      // else  if(membership.options[membership.selectedIndex].value === "Commission"){
          // commision.value= snapshot.val().Commision;
          // document.getElementById('subscription').style.display="none";
          // document.getElementById('commission').style.display="flex";
      //    }
      setPassportImageAsUrl(snapshot.val().Doc1);
      setAdharCardImageAsUrl (snapshot.val().Doc2);
      setPanImageAsUrl (snapshot.val().Doc3);
      setBankStateMentImageAsUrl (snapshot.val().Doc4);
      setFssiCertiImageAsUrl (snapshot.val().Doc5);
      setGstImageAsUrl (snapshot.val().Doc6);
      window.temp=6;
      window.verified="Yes";
      if(snapshot.val().Local==="Yes"){
        setLocalFood(true)
      }
      else{
          setLocalFood(false)
      }
      if(snapshot.val().Veg==="Yes"){
        setVeg(true)
      }
      else{
          setVeg(false)
      }

      if(snapshot.val().Catering==="Yes"){
          setCateringService(true) ;
      }
      else{
        setCateringService(false) ;
      }
      if(snapshot.val().BankHolderName===undefined){
        setHolderName("")
      }
      else{
        setHolderName(snapshot.val().BankHolderName)

      }
      

      }
      else{
        

        setHolderName("")

          setName("");
          // kitchenname.value="";
        setAge("")
        setGender("Select")
        setMail("")
        setMnumber()
        setAmobileNumber("")
        setAddress("")
        setState("Select State")
        setZip("")
        setSpecial("")
        setDesc("")
        setBrand("")
        setRefName1("")
        setRefAddress1("")
        setRefNumber1("")
        setRefName2("")
        setRefNumber2("")
        setRefAddress2("")
        setBankName("")
        setBankNumber("")
        setBankCode("")
        setBranchName("")
        setBranchAddress("")
        setRemark("")
        setMemberShip("Select")
        setSdate("")
        setEdate("")
        setComPer("")
        setRefCode("")
        setArating("")
        setAraview()  
        setKname("")
        setHusband("")
          setPassportImageAsUrl("")
          setAdharCardImageAsUrl("")
          setPanImageAsUrl("")
          setBankStateMentImageAsUrl("")
          setFssiCertiImageAsUrl("")
          setGstImageAsUrl("")
        
          document.getElementById('coord').innerHTML="Location Co-Ordinates";
          // setPassportImageAsFile("")
          // setAdharCardImageAsFile('')
          // setPanImageAsFile('')
          // setBankStateMentImageAsFile('')
          // setFssiCertiImageAsFile('')
          // setGstImageAsFile('')
      }
     
});
  }

const onSubmitHandler=(event)=>{
  var username=window.localStorage.getItem('name');
                if(username===null){                      
                    username=window.sessionStorage.getItem('name');
                    if(username===null){
                history.push(`${process.env.PUBLIC_URL}/login`);
                    } 
                }

    if(name==="")
    {
        alert("Enter Name");
        return;
    }
    if(age==="")
    {
        alert("Enter Age");
        return;
    }
    if(husband===0)
    {
        alert("Enter Father/Husband Name");
        return;
    }
    if(kname==="")
    {
        alert("Enter Kitchen Name");
        return;
    }
    if(gender==="Select")
    {
        alert("Select Gender");

        return;
    }
    if(mail==="")
    {
        alert("Enter Email ID");
        return;
    }
  
    if(mnumber==="")
    {
        alert("Enter Mobile Number");
        return;
    }
    if(holderName==="")
    {
        alert("Enter Bank Holder Name");
        // document.getElementById("#submit").removeAttr("disabled");
        return;
    }
    // if(mnumber.length!==10)
    // {
    //     alert("Enter Proper Mobile Number");
    //     return;

    // }
    // if(anumber.value.length===0)
    // {
    //     alert("Enter Aternate Mobile Number");
    //
    //     return;
    // }
    // if(anumber.value.length!==10)
    // {
    //     alert("Enter Proper Alternate Mobile Number");
    //
    //     return;
    // }
    if(address==="")
    {
        alert("Enter Address");

return;
}
if(citySelect==="Select")
{
alert("Select City");
return;
}
if(selectZone==="Select")
{
alert("Select Locality");
return;
}
if(selectLocality==="Select")
{
alert("Select SubLocality");
return;
}

if(zipCode==="")
{
alert("Enter ZipCode");
// document.getElementById("#submit").removeAttr("disabled");
return;
}
if(special==="")
{
alert("Enter Special Dishes");

// document.getElementById("#submit").removeAttr("disabled");
return;
}
if(kopen==="")
{
alert("Enter Opening Time");
// document.getElementById("#submit").removeAttr("disabled");
return;
}
if(kClose==="")
{
alert("Enter Closing Time");
// document.getElementById("#submit").removeAttr("disabled");
return;
}
if(bankName==="")
{
alert("Enter Bank Account Name");
// document.getElementById("#submit").removeAttr("disabled");
return;
}
if(bankNumber==="")
{
alert("Enter Bank Account Number");
// document.getElementById("#submit").removeAttr("disabled");
return;
}
if(bankCode==="")
{
alert("Enter Bank IFSC Code");
// document.getElementById("#submit").removeAttr("disabled");
return;
}
if(branchName==="")
{
alert("Enter Branch Name");
// document.getElementById("#submit").removeAttr("disabled");
return;
}
// if(branchaddress.value.length===0)
// {
//     alert("Enter Bank Address");
//     b
//     $("#submit").removeAttr("disabled");
//     return;
// }
// if(remarks.value.length===0)
// {
//     alert("Enter Remarks");
//
//     $("#submit").removeAttr("disabled");
//     return;
// }
if(memberShip==="Select")
{
alert("Select Membership Type");
// document.getElementById("#submit").removeAttr("disabled");
return;
}

if(sAmount==="")
{
    alert("Enter Subscription Amount");
    // document.getElementById("#submit").removeAttr("disabled");
    return;
}

// if(sdate.value.length===0)
// {
//     alert("Select Start Date");

//     $("#submit").removeAttr("disabled");
//     return;
// }

// if(edate.value.length===0)
// {
//     alert("Select End Date");

//     $("#submit").removeAttr("disabled");
//     return;
// }

if(comPer==="")
{
    alert("Enter Commision");
    // document.getElementById("#submit").removeAttr("disabled");
    return;
}

// if(aratings.value.length===0)
// {
//     alert("Enter Auditor Ratings"); 
// 
//     $("#submit").removeAttr("disabled");
//     return;
// }

// if(areview.value.length===0)
// {
//     alert("Enter Auditor Review");
//
//     $("#submit").removeAttr("disabled");
//     return;
// }


// if(window.lat===0){
//     alert("Please enable gps in setting and click get location button");
//     // document.getElementById
//     // document.getElementById("#submit").removeAttr("disabled");
//     return;
// }

// if(window.long===0){
//     alert("Please enable gps in setting and click get location button");
//     // document.getElementById
//     // document.getElementById("#submit").removeAttr("disabled");
//     return;
// }

for(var i=0;i<cNO.length;i++) {
    if(String(mnumber)===cNO[i])
    {
        alert("Mobile Number already Exists!!!");
        window.verified="no";    
        setHideSignIn(false)           
        // document.getElementById("#submit").removeAttr("disabled");
        return;
    }
  }


if(window.verified!=="yes"){
    alert("Verify Chef Number");
    // document.getElementById("#submit").removeAttr("disabled");
    return;
}

// if(window.temp<5){
//       alert('Wait for images to upload');
//       $("#submit").removeAttr("disabled");
//       return;
//   }

var referralamount=0;
if(sAmount===0){
 referralamount = 250;
}
else{
  referralamount = parseInt((sAmount*10)/100);
}

var tot=0;

  var stock=app.database().ref().child("CKID");              
  stock.transaction(function(currentstock) {
   tot = currentstock+1;   
  return tot;
  },
  function(error, committed, snapshot) {
  if (error) {
    console.log('Transaction failed abnormally!', error);
  } else if (committed) {

        var userid = "MFCK"+tot;
    
    var firebaseref=app.database().ref().child("CloudKitchen").child(userid);
        firebaseref.child("UserId").set(userid);
        firebaseref.child("Name").set(name);
        // firebaseref.child("KitchenName").set(kitchenname.value);
        firebaseref.child("Age").set(age);
        firebaseref.child("Gender").set(gender);
        firebaseref.child("Email").set(mail);
        firebaseref.child("MobileNumber").set(String(mnumber));
        firebaseref.child("AlternateNumber").set(aMobileNumber);
        firebaseref.child("Address").set(address);
        firebaseref.child("City").set(citySelect)
        firebaseref.child("CityName").set(selectCityName);
        firebaseref.child("OfficeCity").set(officeCity)
        firebaseref.child("OfficeCityName").set(officeCityName);
        firebaseref.child("Locality").set(selectZone);
        firebaseref.child("LocalityName").set(selectZoneName);
        firebaseref.child("SubLocality").set(selectLocality);
        firebaseref.child("SubLocalityName").set(selectLocalityName);
        firebaseref.child("State").set(state);
        firebaseref.child("Zipcode").set(zipCode);
        firebaseref.child("LandMark").set(landMark);
        firebaseref.child("Special").set(special);
        firebaseref.child("Open").set(kopen);
        firebaseref.child("Close").set(kClose);
        firebaseref.child("Ratings").set(5);
        firebaseref.child("ReferenceName1").set(refName1);
        firebaseref.child("ReferenceAddress1").set(refAddress1);
        firebaseref.child("ReferenceNumber1").set(refNumber1);
        firebaseref.child("ReferenceName2").set(refName2);
        firebaseref.child("ReferenceAddress2").set(refAddress2);
        firebaseref.child("ReferenceNumber2").set(refNumber2);
        firebaseref.child("AccountName").set(bankName);
        firebaseref.child("AccountNumber").set(bankNumber);
        firebaseref.child("IFSC").set(bankCode);
        firebaseref.child("BranchName").set(branchName);
        firebaseref.child("BranchAddress").set(branchAddress);
        firebaseref.child("Remarks").set(remark);
        firebaseref.child("Membership").set(memberShip);
        firebaseref.child("SAmount").set(sAmount);
        firebaseref.child("SDate").set(sdate);
        firebaseref.child("EDate").set(edate);
        firebaseref.child("Commision").set(comPer);
        firebaseref.child("Details").set(desc);
        firebaseref.child("Brand").set(brand);
        firebaseref.child("Doc1").set(passportImageAsUrl);
        firebaseref.child("Doc2").set(adharCardImageAsUrl);
        firebaseref.child("Doc3").set(panImageAsUrl);
        firebaseref.child("Doc4").set(bankStateMentImageAsUrl);
        firebaseref.child("Doc5").set(fssiCertiImageAsUrl);
        firebaseref.child("Doc6").set(gstImageAsUrl);
        firebaseref.child("Location").set(window.lat+","+window.long);
        firebaseref.child("Status").set("InActive");
        firebaseref.child("AStatus").set("InActive");
        firebaseref.child("Cash").set(0);
        firebaseref.child("Coins").set(0);
        firebaseref.child("PP").set("");
        firebaseref.child("Referral").set(refCode);
        firebaseref.child("ReferralAmount").set(""+referralamount);
        firebaseref.child("ARatings").set(aRating);
        firebaseref.child("AReviews").set(aRaview);
        firebaseref.child("KitchenName").set(kname);
        firebaseref.child("FatherName").set(husband);
        firebaseref.child("BankHolderName").set(holderName);

           
        if(veg===true)
            firebaseref.child("Veg").set("Yes");
        else 
            firebaseref.child("Veg").set("No");

            if(cateringService===true)
            firebaseref.child("Catering").set("Yes");
        else 
            firebaseref.child("Catering").set("No");

        if(localFood===true)
            firebaseref.child("Local").set("Yes");
        else 
            firebaseref.child("Local").set("No");

        if(agencyName!=="Select"){
            firebaseref.child("Franchise").set(agencyName);
        }






        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        firebaseref.child("Created").set(today);
        firebaseref.child("CreatedBy").set("WorkinPartner")


        axios
        .post('https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles='+String(mnumber)+'&sms=Dear '+name+'%0aThanks for Registering with MothersFood as Home Chef! %0aYour ID:'+userid+'%0aPackage:'+memberShip+'%0aYour account is under review,will update you once your account is approved.%0a- Team MothersFood&senderid=mtfood&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=')
        .then(function (response) {

            Swal.fire({
                title: "Successfully Created!",
                text: "Home Chef Registered Id : " + userid,
                icon: "success",
                confirmButtonText: "Ok" 
               });

               setName("");
               setHolderName("")

               // kitchenname.value="";
             setAge("")
             setGender("Select")
             setMail("")
             setMnumber()
             setAmobileNumber("")
             setAddress("")
             setState("Select State")
             setZip("")
             setSpecial("")
             setDesc("")
             setBrand("")
             setRefName1("")
             setRefAddress1("")
             setRefNumber1("")
             setRefName2("")
             setRefNumber2("")
             setRefAddress2("")
             setBankName("")
             setBankNumber("")
             setBankCode("")
             setBranchName("")
             setBranchAddress("")
             setRemark("")
             setMemberShip("Select")
             setSdate("")
             setEdate("")
             setComPer("")
             setRefCode("")
             setArating("")
             setAraview()  
             setKname("")
             setHusband("")
             setGstImageAsUrl("")
             setPassportImageAsUrl("")
             setAdharCardImageAsUrl("")
             setPanImageAsUrl("")
             setBankStateMentImageAsUrl("")
             setFssiCertiImageAsUrl("")
            //  setGstImageAsFile("")

               window.temp=0;

            //    locality.value="";
               window.verified="no";
               setLocalFood(false)
               setVeg(false)
               setCateringService(false)
               document.getElementById('coord').innerHTML="Location Co-Ordinates";
          //      setPassportImageAsFile("")
          // setAdharCardImageAsFile('')
          // setPanImageAsFile('')
          // setBankStateMentImageAsFile('')
          // setFssiCertiImageAsFile('')
          // setGstImageAsFile('')
              
               cno=[];
               cid=[];
               app.database().ref().child("CloudKitchen")
               .once('value').then(function(snapshot) {
                   snapshot.forEach(function(data){
                       var val = data.val(); 
                       if(val.UserId!==""){
                           cid.push(val.UserId);
                           cno.push(val.MobileNumber);
                       }
                      //  setcID(cid)
                       setcNO(cno)
                   });
                  //  $("#sname").autocomplete({
                  //      source: cid
                  //    });
               });

        })
        .catch(function (error) {
            console.log(error);
        });




      

}
});

  }
  const onClickSmsHandler=(event)=>{
    // document.getElementById("#sms").attr("disabled", "disabled");
  
    // var aratings = document.getElementById('aratings');
    // var areview = document.getElementById('areview');
    // var mobilenumber=document.getElementById("mobilenumber");
    // var sname=document.getElementById("sname");
  
    if(parseInt(aRating)>=5){
  
        axios
        .post('https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles='+String(mnumber)+'&sms=Congratulations!%0aYou proved to be a worthy Home-Chef.Your taste audit results are out, and your application is now just a step-away to get approved.%0aYour ID : '+sname+'%0aRating : '+aRating+'%0aStatus : Pending for approval.%0a- Team MothersFood&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=')
        .then(function (response) {
          
            console.log(response);
            if(!passed){
  
                axios
                .post('https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles='+String(mnumber)+'&sms=MF Cash Deposit:%0aHurray! Here is a reward for passing the Taste Audit. 500 MF Cash has been credited to your account. You can redeem them within 15 days from now from here: https://bit.ly/mfhc%0a- Team MothersFood&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=')
                .then(function (response) {
  
                            var referralamount=500;
                            var today = new Date();
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = today.getFullYear();
                            
                            today = yyyy + '-' + mm + '-' + dd;
  
                            var firebaseref1=app.database().ref().child("CloudKitchen").child(sname).child("Coins");
                            firebaseref1.transaction(function(currentstock) {
                                return currentstock + parseInt(referralamount);
                                },
                                function(error, committed, snapshot) {           
                                if (error) {
                                console.log('Transaction failed abnormally!', error);
                                } else if (committed) {
                    
                                    var number = parseInt(snapshot.val());
  
                                    var d = new Date();
                                    var n = d.getTime();
                    
                                    app.database().ref().child("CloudKitchen").child(sname).child("Passed").set("Yes");
                                    app.database().ref().child("CloudKitchen").child(sname).child("ARatings").set(aRating);
                                    app.database().ref().child("CloudKitchen").child(sname).child("AReviews").set(aRaview);
  
                                var firebaseref=app.database().ref().child("CloudKitchen").child(sname).child("CoinsTransactions").push();
                                    firebaseref.child("Amount").set(String(referralamount));
                                    firebaseref.child("Date").set(today);
                                    firebaseref.child("Generated").set("Online");
                                    firebaseref.child("PushId").set(firebaseref.getKey());
                                    firebaseref.child("Status").set(String("Approved"));
                                    firebaseref.child("TransactionId").set(""+n);
                                    firebaseref.child("TransactionName").set("Joining Bonus");
                                    firebaseref.child("TransactionType").set("Cr");
                                    firebaseref.child("UserBalance").set(""+number);
                                    firebaseref.child("UserId").set(sname)
  
                                    Swal.fire({
                                        title: "Success!",
                                        text: "Taste Ratings has been sent",
                                        icon: "success",
                                        confirmButtonText: "Ok" 
                                    });
                                    document.getElementById('smssent').style.display="block";
  
                                }
                        });
  
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
  
                    }
            else{
              
                Swal.fire({
                    title: "Success!",
                    text: "Taste Ratings has been sent",
                    icon: "success",
                    confirmButtonText: "Ok" 
                });
                document.getElementById('smssent').style.display="block";
                // document.getElementById("#sms").removeAttr("disabled");
                
            }
                        
                 
       
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    else{
        axios
        .post('https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles='+String(mnumber)+'&sms=Alert!%0aWe are sorry to inform you that you have got rejected in the taste-audit.%0aChef ID : '+sname+'%0aRating : '+aRating+'%0aReason : '+aRaview+'%0aStatus : Rejected.%0a- Team MothersFood&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=')
        .then(function (response) {
  
            app.database().ref().child("CloudKitchen").child(sname.value).child("Passed").set("No");
            app.database().ref().child("CloudKitchen").child(sname.value).child("ARating").set("");
            app.database().ref().child("CloudKitchen").child(sname.value).child("AReviews").set("");
  
            document.getElementById('smssent').style.display="block";
  
            Swal.fire({
                title: "Success!",
                text: "Taste Ratings has been sent",
                icon: "success",
                confirmButtonText: "Ok" 
            });
  
            document.getElementById("#sms").removeAttr("disabled");
  
          })
          .catch(function (error) {
              console.log(error);
          });
  
      }
  
}
  
      const onUpdateHandler=(event)=>{
    
    
        if(sname==="")
        {
            alert("Enter Cloud Kitchen Number");
           return;
        }
        
        // if(kitchenname.value.length===0)
        //     {
        //         alert("Enter Cloud Kitchen Name");
        //        
        //         return;
        //     }
            if(name==="")
            {
                alert("Enter Name");

                return;
            }
            if(age==="")
            {
                alert("Enter Age");

                return;
            }
            if(husband==="")
            {
                alert("Enter Father/Husband Name");
    
                return;
            }
            if(kname==="")
            {
                alert("Enter Kitchen Name");
  
                return;
            }
            if(holderName==="")
            {
                alert("Enter Bank Holder Name");
                // document.getElementById("#submit").removeAttr("disabled");
                return;
            }
            if(gender==="Select")
            {
                alert("Select Gender");
    
                return;
            }
            if(mail==="")
            {
                alert("Enter Email ID");
  
                return;
            }
         
            if(mnumber==="")
            {
                alert("Enter Mobile Number");
                
                return;
            }
            // if(mnumber.length!==10)
            // {
            //     alert("Enter Proper Mobile Number");
                
            //     return;
            // }
            // if(anumber.value.length===0)
            // {
            //     alert("Enter Aternate Mobile Number");
            //
            //     return;
            // }
            // if(anumber.value.length!==10)
            // {
            //     alert("Enter Proper Alternate Mobile Number");
            //
            //     return;
            // }
            if(address==="")
            {
                alert("Enter Address");
      
                return;
            }
            if(citySelect==="Select")
            {
                alert("Select City");

                return;
            }
            if(selectZone==="Select")
            {
                alert("Select Locality");
        
                return;
            }
            if(selectLocality==="Select")
            {
                alert("Select SubLocality");
              
                return;
            }
            if(zipCode==="")
            {
                alert("Enter ZipCode");
      
                return;
            }
            if(special==="")
            {
                alert("Enter Special Dishes");
      
                return;
            }
            if(kopen==="")
            {
                alert("Enter Opening Time");
  
                return;
            }
            if(kClose==="")
            {
                alert("Enter Closing Time");
  
                return;
            }
            if(bankName==="")
            {
                alert("Enter Bank Account Name");
              
                return;
            }
            if(bankNumber==="")
            {
                alert("Enter Bank Account Number");
              
                return;
            }
            if(bankCode==="")
            {
                alert("Enter Bank IFSC Code");
        
                return;
            }
            if(branchName==="")
            {
                alert("Enter Branch Name");
            
                return;
            }
            // if(branchaddress.value.length===0)
            // {
            //     alert("Enter Bank Address");
            //     b
            //     $("#update").removeAttr("disabled");
            //     return;
            // }
            // if(remarks.value.length===0)
            // {
            //     alert("Enter Remarks");
            //
            //     $("#update").removeAttr("disabled");
            //     return;
            // }
            if(memberShip==="Select")
            {
                alert("Select Membership Type");
            
                return;
            }
    
            if(memberShip=== "Subscription"){
    
                if(sAmount==="")
                {
                    alert("Enter Subscription Amount");
          
                        return;
                }
    
                // if(sdate.value.length===0)
                // {
                //     alert("Select Start Date");
                
                //     $("#update").removeAttr("disabled");
                //     return;
                // }
    
                // if(edate.value.length===0)
                // {
                //     alert("Select End Date");
                
                //     $("#update").removeAttr("disabled");
                //     return;
                // }
    
                if(comPer==="")
                {
                    alert("Enter Commision");
              
                        return;
                }
                
               }
            else  if(memberShip === "Commission"){
                    if(comPer==="")
                    {
                        alert("Enter Commision");
                  
                                return;
                    }
                }
    
    
                // if(window.lat===0){
                //     alert("Please enable gps in setting and click get location button");
                //         return;
                // }
    
                // if(window.long===0){
                //     alert("Please enable gps in setting and click get location button");
                //         return;
                // }
                // if(aratings.value.length===0)
                // {
                //     alert("Enter Auditor Ratings");
                // 
                //     $("#update").removeAttr("disabled");
                //     return;
                // }
    
                // if(areview.value.length===0)
                // {
                //     alert("Enter Auditor Review");
                //
                //     $("#update").removeAttr("disabled");
                //     return;
                // }
    
    
            // if(window.temp<5){
            //       alert('Wait for images to upload');
            //       $("#update").removeAttr("disabled");
            //       return;
            //   }
              // var tot=0;
        
                    
                    var firebaseref=app.database().ref().child("CloudKitchen").child(sname);
                        firebaseref.child("UserId").set(sname);
                        firebaseref.child("Name").set(name);
                        // firebaseref.child("KitchenName").set(kitchenname.value);
                        firebaseref.child("Age").set(age);
                        firebaseref.child("Gender").set(gender);
                        firebaseref.child("Email").set(mail);
                        firebaseref.child("MobileNumber").set(String(mnumber));
                        firebaseref.child("AlternateNumber").set(aMobileNumber);
                        firebaseref.child("Address").set(address);
                        firebaseref.child("City").set(citySelect);
                        firebaseref.child("CityName").set(selectCityName);
                        firebaseref.child("OfficeCity").set(officeCity);
                        firebaseref.child("OfficeCityName").set(officeCityName);
                        firebaseref.child("Locality").set(selectZone);
                        firebaseref.child("LocalityName").set(selectZoneName);
                        firebaseref.child("SubLocality").set(selectLocality);
                        firebaseref.child("SubLocalityName").set(selectLocalityName);
                        firebaseref.child("State").set(state);
                        firebaseref.child("Zipcode").set(zipCode);
                        firebaseref.child("LandMark").set(landMark);
                        firebaseref.child("Special").set(special);
                        firebaseref.child("Open").set(kopen);
                        firebaseref.child("Close").set(kClose);
                        firebaseref.child("Ratings").set(0);
                        firebaseref.child("ReferenceName1").set(refName1);
                        firebaseref.child("ReferenceAddress1").set(refAddress1);
                        firebaseref.child("ReferenceName1").set(refName1);
                        firebaseref.child("ReferenceAddress1").set(refAddress1);
                        firebaseref.child("ReferenceNumber1").set(refNumber1);
                        firebaseref.child("ReferenceName2").set(refName2);
                        firebaseref.child("ReferenceAddress2").set(refAddress2);
                        firebaseref.child("ReferenceNumber2").set(refNumber2);
                        firebaseref.child("AccountName").set(bankName);
                        firebaseref.child("AccountNumber").set(bankNumber);
                        firebaseref.child("IFSC").set(bankCode);
                        firebaseref.child("BranchName").set(branchName);
                         firebaseref.child("BranchAddress").set(branchAddress);
                        firebaseref.child("Remarks").set(remark);
                        firebaseref.child("Membership").set(memberShip);
                        firebaseref.child("SAmount").set(sAmount);
                        firebaseref.child("SDate").set(sdate);
                        firebaseref.child("EDate").set(edate);
                        firebaseref.child("Commision").set(comPer);
                        firebaseref.child("Details").set(desc);
                        firebaseref.child("Brand").set(brand);
                        firebaseref.child("Doc1").set(passportImageAsUrl);
                        firebaseref.child("Doc2").set(adharCardImageAsUrl);
                        firebaseref.child("Doc3").set(panImageAsUrl);
                        firebaseref.child("Doc4").set(bankStateMentImageAsUrl);
                        firebaseref.child("Doc5").set(fssiCertiImageAsUrl);
                        firebaseref.child("Doc6").set(gstImageAsUrl);
                        firebaseref.child("Location").set(window.lat+","+window.long);
                        firebaseref.child("Status").set("InActive");
                        firebaseref.child("AStatus").set("InActive");
                        firebaseref.child("ARatings").set(aRating);
                        firebaseref.child("AReviews").set(aRaview);
                        firebaseref.child("KitchenName").set(kname);
                        firebaseref.child("FatherName").set(husband);
                        firebaseref.child("BankHolderName").set(holderName);

                        if(veg===true)
                            firebaseref.child("Veg").set("Yes");
                        else 
                            firebaseref.child("Veg").set("No");

                            if(cateringService===true)
                          firebaseref.child("Catering").set("Yes");
                       else 
                            firebaseref.child("Catering").set("No");

                        if(localFood===true)
                            firebaseref.child("Local").set("Yes");
                        else 
                            firebaseref.child("Local").set("No");
                        if(agencyName!=="Select"){
                           firebaseref.child("Franchise").set(agencyName);
                        }
    
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();
                        today = yyyy + '-' + mm + '-' + dd;
                        firebaseref.child("Updated").set(today);
    
                    
                        setName("");
                        // kitchenname.value="";
                      setAge("")
                      setGender("Select")
                      setMail("")
                      setMnumber()
                      setAmobileNumber("")
                      setAddress("")
                      setState("Select State")
                      setZip("")
                      setSpecial("")
                      setDesc("")
                      setBrand("")
                      setRefName1("")
                      setRefAddress1("")
                      setRefNumber1("")
                      setRefName2("")
                      setRefNumber2("")
                      setRefAddress2("")
                      setBankName("")
                      setBankNumber("")
                      setBankCode("")
                      setBranchName("")
                      setBranchAddress("")
                      setRemark("")
                      setMemberShip("Select")
                      setSdate("")
                      setEdate("")
                      setComPer("")
                      setRefCode("")
                      setArating("")
                      setAraview()  
                      setKname("")
                      setHusband("")
                      setPassportImageAsUrl("")
                      setAdharCardImageAsUrl("")
                      setPanImageAsUrl("")
                      setBankStateMentImageAsUrl("")
                      setFssiCertiImageAsUrl("")
                      setGstImageAsUrl("")
                      setHolderName("")
                        
                        window.verified="no";
                        setLocalFood(false)
                        setVeg(false)
                        setCateringService(false)
                        // locality.value="";
                        document.getElementById('coord').innerHTML="Location Co-Ordinates";
                        // setPassportImageAsFile("")
                        // setAdharCardImageAsFile('')
                        // setPanImageAsFile('')
                        // setBankStateMentImageAsFile('')
                        // setFssiCertiImageAsFile('')
                        // setGstImageAsFile('')
    
    
                        Swal.fire({
                            title: "Successfully Updated!",
                            text: "Home Chef Registered Id : " + sname,
                            icon: "success",
                            confirmButtonText: "Ok" 
                           });
                        
                        setSname("");

               cno=[];
               cid=[];
               app.database().ref().child("CloudKitchen")
               .once('value').then(function(snapshot) {
                   snapshot.forEach(function(data){
                       var val = data.val(); 
                       if(val.UserId!==""){
                           cid.push(val.UserId);
                           cno.push(val.MobileNumber);
                       }
                      //  setcID(cid)
                       setcNO(cno)
                   });
                        });
                        setHide(false)
                    
      }
const onClickDeleteHandler=(event)=>{
  

  if(sname==="")
  {
      alert("Enter Cloud Kitchen Number");
      return;
  }

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
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
              app.database().ref().child("CloudKitchen").child(sname).remove();
              setName("");
              // kitchenname.value="";
            setAge("")
            setGender("Select")
            setMail("")
            setMnumber()
            setAmobileNumber("")
            setAddress("")
            setState("Select State")
            setZip("")
            setSpecial("")
            setDesc("")
            setBrand("")
            setRefName1("")
            setRefAddress1("")
            setRefNumber1("")
            setRefName2("")
            setRefNumber2("")
            setRefAddress2("")
            setBankName("")
            setBankNumber("")
            setBankCode("")
            setBranchName("")
            setBranchAddress("")
            setRemark("")
            setMemberShip("Select")
            setSdate("")
            setEdate("")
            setComPer("")
            setRefCode("")
            setArating("")
            setAraview()  
            setKname("")
            setHusband("")
       
              window.temp=0;
              setPassportImageAsUrl("")
                      setAdharCardImageAsUrl("")
                      setPanImageAsUrl("")
                      setBankStateMentImageAsUrl("")
                      setFssiCertiImageAsUrl("")
                      setGstImageAsUrl("")
              window.verified="no";
              setLocalFood(false)
              setVeg(false)
              setCateringService(false)
              document.getElementById('smssent').style.display="none";
              // locality.value="";
              document.getElementById('coord').innerHTML="Location Co-Ordinates";
              // setPassportImageAsFile("")
              // setAdharCardImageAsFile('')
              // setPanImageAsFile('')
              // setBankStateMentImageAsFile('')
              // setFssiCertiImageAsFile('')
              // setGstImageAsFile('')
  
                      if(!passportImageAsUrl==='')
                      {
                  
                      window.temp--;
                      var imagePath = passportImageAsUrl;
                      let name = imagePath.substr(imagePath.indexOf('%2F') + 3, (imagePath.indexOf('?')) - (imagePath.indexOf('%2F') + 3));
                      name = name.replace('%20',' '); 
                      let storagePath = app.storage().ref();
                      storagePath.child(`CloudKitchen/${name}`).delete();
                  
                      }
  
  
                      if(!adharCardImageAsUrl==='')
                      {
                  
                      window.temp--;
                      var imagePath2 = adharCardImageAsUrl;
                      let name = imagePath2.substr(imagePath2.indexOf('%2F') + 3, (imagePath2.indexOf('?')) - (imagePath2.indexOf('%2F') + 3));
                      name = name.replace('%20',' '); 
                      let storagePath = app.storage().ref();
                      storagePath.child(`CloudKitchen/${name}`).delete();
                  
                      }
  
  
                      if(!panImageAsUrl==='')
                      {
                  
                      window.temp--;
                      var imagePath3 = panImageAsUrl;
                      let name = imagePath3.substr(imagePath3.indexOf('%2F') + 3, (imagePath3.indexOf('?')) - (imagePath3.indexOf('%2F') + 3));
                      name = name.replace('%20',' '); 
                      let storagePath = app.storage().ref();
                      storagePath.child(`CloudKitchen/${name}`).delete();
                  
                      }
  
                      if(!bankStateMentImageAsUrl==='')
                      {
                  
                      window.temp--;
                      var imagePath4 = bankStateMentImageAsUrl;
                      let name = imagePath4.substr(imagePath4.indexOf('%2F') + 3, (imagePath4.indexOf('?')) - (imagePath4.indexOf('%2F') + 3));
                      name = name.replace('%20',' '); 
                      let storagePath = app.storage().ref();
                      storagePath.child(`CloudKitchen/${name}`).delete();
                  
                      }
  
  
                      if(!fssiCertiImageAsUrl==='')
                      {
  
                      window.temp--;
                      var imagePath5 = fssiCertiImageAsUrl;
                      let name = imagePath5.substr(imagePath5.indexOf('%2F') + 3, (imagePath5.indexOf('?')) - (imagePath5.indexOf('%2F') + 3));
                      name = name.replace('%20',' '); 
                      let storagePath = app.storage().ref();
                      storagePath.child(`CloudKitchen/${name}`).delete();
  
                      }
  
                      if(!gstImageAsUrl==='')
                      {
                  
                      window.temp--;
                      var imagePath6 = gstImageAsUrl;
                      let name = imagePath.substr(imagePath6.indexOf('%2F') + 3, (imagePath6.indexOf('?')) - (imagePath6.indexOf('%2F') + 3));
                      name = name.replace('%20',' '); 
                      let storagePath = app.storage().ref();
                      storagePath.child(`CloudKitchen/${name}`).delete();
                  
                      }
  
  
                      cno=[];
                      cid=[];
                      app.database().ref().child("CloudKitchen")
                      .once('value').then(function(snapshot) {
                          snapshot.forEach(function(data){
                              var val = data.val(); 
                              if(val.UserId!==""){
                                  cid.push(val.UserId);
                                  cno.push(val.MobileNumber);
                              }
                          });
                        //  setcID(cid)
                         setcNO(cno)
                      });
                  
                                  
                  Swal.fire("Chef Deleted!", {
                  icon: "success",
              });
          }
          else{
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
  setHide(false)
}

const onClickGetCoordHandler=(event)=>{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById('coord').innerHTML = "Geolocation is not supported by this browser.";
  }

}

function showPosition(position) {
  document.getElementById('coord').innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  window.lat=position.coords.latitude;
  window.long=position.coords.longitude;
}
  return (
      <Fragment>
          <BreadCrumb parent={<Home/>} subparent="Master Creation" title="Add Chef"/>
          <Container fluid={true}>
              <Row>
                  <Col sm="12">
                        <CardHeader>
                              <h6>Create Chef</h6>
                              {/* <span> Use a class <code> table </code> to any table.</span> */}
                          </CardHeader>
                          <Col sm="12" style={{marginTop:"3%",marginLeft:"-1%"}}>
                    
                       
                    <h5>Alter Chef Details</h5>
                    {/* <span> Use a class <code> table </code> to any table.</span> */}
            
                </Col>
                          <Row className="form-row" style={{marginTop:"3%"}}>
                           <Col className="form-group col-md-6">
                           <label className="form-label">Enter Home Chef registration Number</label>
                          <Row>
                          <Col className="col-lg-6 col-md-5 col-sm-5">
                          <Input type="text" id="sname" value={sname} onChange={onChangeSearchName} className="form-control"/>
                          </Col>
                          <Col className="col-sm-1 col-md-2">
                          <span id="search" onClick={onClickSearchHandler}><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine"/></span>
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
                      <label className="form-label">Full Name <span style={{color: "red"}}>*</span></label>
                      <Input type="text"  id="name" value={name} onChange={onChangeNameHandler} className="form-control" placeholder="Full Name"/>
                      <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-2">
                     <label className="form-label">Age <span style={{color: "red"}}>*</span></label>
                      <Input type="number" id="age" value={age} onChange={onChangeAge} className="form-control" placeholder="Age"/>
                       <div className="clearfix"></div>
                      </Col>
                       </Row>

                       <Row className="form-row">
                       <Col className="form-group col-md-4">
                      <label className="form-label">Father/Husband Name <span style={{color: "red"}}>*</span></label>
                      <Input type="text"  id="name" value={husband} onChange={hnameChange} className="form-control" placeholder="Father/Husband Name"/>
                      <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                     <label className="form-label">Kitchen Name <span style={{color: "red"}}>*</span></label>
                      <Input type="text" id="age" value={kname} onChange={kitchenNameChange} className="form-control" placeholder="Kitchen Name"/>
                       <div className="clearfix"></div>
                      </Col>
                       </Row>

                       <Row className="form-row">
                       <Col className="form-group col-md-4">
                      <label className="form-label">Gender <span style={{color: "red"}}>*</span></label>
                      <select className="form-control" value={gender} onChange={onChangeGender} id="gender">
                      <option value="Select">Select</option>
                      <option value="Male">Male</option>
                       <option value="Female">Female</option>
                       <option value="Transgender">Transgender</option>
                       </select>                        
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                     <label className="form-label">Email Id <span style={{color: "red"}}>*</span></label>
                      <Input type="email" id="age" value={mail} onChange={onChangeMail} className="form-control" placeholder="Email ID"/>
                       <div className="clearfix"></div>
                      </Col>
                       </Row>
                       <Row className="form-row">
                       <Col className="form-group col-md-6">
                      <label className="form-label">Mobile Number <span style={{color: "red"}}>*</span></label>
                      <Input type="number" id="mobilenumber" value={mnumber} onChange={onChangeMobileNumber}className="form-control" placeholder="Mobile Number"/>
                      <div className="clearfix"></div>
                       </Col>
                          {hideSignIn!==false?
                       <Col className="form-group col-md-2" >
                      <label className="form-label" id="otp">OTP <span style={{color: "red"}}>*</span></label>
                       <Input id="verification-code"   type="number" className="form-control" value={otp} onChange={onChangeOtp} placeholder="OTP"/>	
                       <Button className="btn btn-primary"  id="verify-code-button" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}} onClick={onVerifyCodeSubmit} >Verify</Button>	
                      </Col> :
                      <Col className="form-group col-md-3" style={{marginTop:"3%"}} >
                      <Button className="warning" id="sign-in-button" onClick={onSignInSubmit}  style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}} >Send OTP</Button>	
                      </Col>
                  }
                       <Col className="form-group col-md-6">
                      <label className="form-label">Alternate Mobile Number/Emergency Number</label>
                      <Input type="number" id="anumber" value={aMobileNumber} onChange={onChangeAlterMobileNumber} className="form-control" placeholder="Mobile Number"/>
                      <div className="clearfix"></div>
                       </Col>                     
                      </Row>
                      <Row className="form-row">
                       <Col className="form-group col-md-12">
                      <label className="form-label">Address <span style={{color: "red"}}>*</span></label>
                      <Input type="text" id="mobilenumber" value={address} onChange={onChangeAddress} className="form-control" placeholder="Address"/>
                      <div className="clearfix"></div>
                       </Col>
                       </Row>

                       <Row className="form-row">
                       <Col className="form-group col-md-4">
                      <label className="form-label">City <span style={{color: "red"}}>*</span></label>
                      <select className="form-control" value={citySelect} onChange={onChangeCityHandler} id="gender">
                      <option value="Select">Select</option>
                        {city.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                       </select>                        
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label" >Zone <span style={{color: "red"}}>*</span></label>
                      <select className="form-control" value={selectZone} onChange={onChangeZoneHandler} id="gender">
                      <option value="Select">Select</option>
                      {user.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                       </select>                        
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Locality <span style={{color: "red"}}>*</span></label>
                      <select className="form-control" value={selectLocality} onChange={onChangeLocalityHandler} id="gender">
                      <option value="Select">Select</option>
                      {zone.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                       </select>                        
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row>
                      <Col className="form-group col-md-4">
                      <label className="form-label">State <span style={{color: "red"}}>*</span></label>
                      <select className="form-control"value={state} onChange={onChangeState} id="gender">
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
                      <Input type="number" value={zipCode} onChange={onChangeZipCode} className="form-control" placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-2">
                <label className="form-label">LandMark</label>
                <Input type="text" value={landMark} onChange={onChangeLandMark} className="form-control" placeholder="" />
                <div className="clearfix"></div>
              </Col>
                      </Row>
                      <Row>
                          <h6>For Office Use</h6>
                        </Row>
                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">City <span style={{color: "red"}}>*</span></label>
                        <select className="form-control" value={officeCity} onChange={onChangeOfficeCityHandler} >
                        <option value="Select">Select</option>
                          {city.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                         </select>                        
                         <div className="clearfix"></div>
                        </Col>
                        </Row>
                        
                      
                      <Row>
                      <Col className="form-group col-md-4">
                      <Button type="button" id="getcoord" onClick={onClickGetCoordHandler}  className="warning">Get Location Co-ordiantes </Button>
                      <p id="coord"> Location Co-ordiantes </p>
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-8">
                      <label className="form-label">Specialized Dishes <span style={{color: "red"}}>*</span></label>
                      <Input type="text" className="form-control" value={special} onChange={specialDishChange} placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      
                      <Row>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Kitchen Open <span style={{color: "red"}}>*</span></label>
                      <Input type="time" value={kopen} onChange={kitchenOpenChange}  className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Kitchen Close <span style={{color: "red"}}>*</span></label>
                      <Input type="time" value={kClose} onChange={kitchenCloseChange} className="form-control" placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Chef Description </label>
                      <Input type="text" value={desc} onChange={chefDescriptionChange} className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Ingredients Brands </label>
                      <Input type="number" value={brand} onChange={ingredientBrandChange} className="form-control" placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row>
                      <Col className="form-group col-md-12">
                      <h4>References</h4>
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Reference 1 Name </label>
                      <Input type="text" value={refName1} onChange={referelName1Change}  className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Reference 1 Address</label>
                      <Input type="text" value={refAddress1} onChange={referelAddress1Change} className="form-control" placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Reference 1 Mobile Number </label>
                      <Input type="number" value={refNumber1} onChange={referelNumber1Change} className="form-control" placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Reference 2 Name </label>
                      <Input type="text" value={refName2} onChange={referelName2Change}  className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Reference 2 Address</label>
                      <Input type="text" className="form-control" value={refAddress2} onChange={referelAddress2Change} placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Reference 2 Mobile Number </label>
                      <Input type="number" value={refNumber2} onChange={referelNumber2Change}className="form-control" placeholder=""/>                      
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
                        <label className="form-label">Bank Holder Name <span style={{color: "red"}}>*</span> </label>
                        <Input type="text" value={holderName} onChange={BankHolderNameChange} className="form-control"/>                    
                         <div className="clearfix"></div>
                        </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Bank  Name <span style={{color: "red"}}>*</span> </label>
                      <Input type="text" value={bankName} onChange={BankNameChange} className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label"> Account Number <span style={{color: "red"}}>*</span> <span style={{color: "red"}}>*</span></label>
                      <Input type="number" value={bankNumber} onChange={bankNumberChange} className="form-control" placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label"> IFSC Code <span style={{color: "red"}}>*</span></label>
                      <Input type="text" value={bankCode} onChange={bankCodeChange} className="form-control" placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Branch Name <span style={{color: "red"}}>*</span> </label>
                      <Input type="text" value={branchName} onChange={branchNameChange} className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Branch Address <span style={{color: "red"}}>*</span> </label>
                      <Input type="text" className="form-control" value={branchAddress} onChange={branchAddressChange} placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Remark </label>
                      <Input type="text" value={remark} onChange={RemarkChange}className="form-control" placeholder=""/>                      
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
                      <Col className="form-group col-md-6">
                      <label className="form-label">Select OnBoard Membership Type <span style={{color: "red"}}>*</span></label>
                      <select className="form-control" value={memberShip} onChange={onChangeMemberShip}id="gender">
                      <option value="Select">Select</option>
                      <option value="Free">Free Package</option>
                      <option value="Bronze">Bronze Package</option>
                      <option value="Silver">Silver Package</option>
                      <option value="Gold">Gold Package</option>
                      <option value="Custom">Custom Package</option>
                       </select>                        
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row >
                      <Col className="form-group col-md-4">
                      <label className="form-label">Subscription Amount<span style={{color: "red"}}>*</span> </label>
                      <Input type="text" id="subscription" value={sAmount} onChange={onChangeSubscriptionAmount}  className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Start Date </label>
                      <input type="date" value={sdate} onChange={startingDateChange} className="form-control digits"   />                      
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">End Date </label>
                      <input type="date" value={edate} onChange={endingDateChange}className="form-control digits" />                      
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row >
                      <Col className="form-group col-md-4">
                      <label className="form-label">Enter Commision Percentage<span style={{color: "red"}}>*</span> </label>
                      <Input type="number" id="commision" value={comPer} onChange={onChangeCommisionPercentage}  className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row >
                      <Col className="form-group col-md-4">
                      <label className="form-label">Enter Referral  </label>
                      <Input type="text" value={refCode} onChange={referelCodeChange} className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      </Row>

                      
                      <Row >
                      <Col className="form-group col-md-4">
                      <label className="form-label">Master Franchise ID  </label>
                      <input id="agency" value={agencyName} onChange={AgencyNameChange}className="form-control"/>
                                      
                      <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Auditor Ratings (0-10)</label>
                      <Input type="number" value={aRating} onChange={auditorRatingChange} className="form-control"/>                    
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <label className="form-label">Auditor Review    </label>
                      <Input type="text" className="form-control" value={aRaview}  onChange={auditrRaviewChange} placeholder=""/>                      
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <Button className="warning" id="sms" href="#" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}} onClick={onClickSmsHandler}>Send Message</Button>	
                      <p id="smssent" style={{color:"green"}}>SMS Sent</p>                         
                      <div className="clearfix"></div>
                      </Col>
                      </Row>

                      <Row>
                      <Col className="form-group col-md-4">
                      <Input type="checkbox"  checked={veg} onChange={vegChangeHandler}  className="form-control"/>Veg Only                   
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <Input type="checkbox"  checked={cateringService} onChange={cateringServiceChange}className="form-control" />Catering Service                   
                       <div className="clearfix"></div>
                      </Col>
                      <Col className="form-group col-md-4">
                      <Input type="checkbox"  checked={localFood} onChange={localFoodHnadler}className="form-control" />Local Food                
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
                      <Input type="file" onChange={onChangePassPort} id="doc1" className="form-control" />
                      <div className="clearfix"></div>
                       </Col>
                      </Row>

                      <Row className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Aadhar Card Upload </label>
                      <Col className="col-sm-10">
                      <Input type="file" id="doc1" onChange={onChangeAdhar} className="form-control" />
                      <div className="clearfix"></div>
                       </Col>
                      </Row>

                      <Row className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Pan/Voter </label>
                      <Col className="col-sm-10">
                      <Input type="file" onChange={onChangePanHandler} className="form-control" />
                      <div className="clearfix"></div>
                       </Col>
                      </Row>

                      <Row className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Passbook/Bank Statement </label>
                      <Col className="col-sm-10">
                      <Input type="file" id="doc1" onChange={onChangeBankStatement} className="form-control" />
                      <div className="clearfix"></div>
                       </Col>
                      </Row>

                      <Row className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">FSSAI Certificate </label>
                      <Col className="col-sm-10">
                      <Input type="file" id="doc1" onChange={onChangeFssiCertificate} className="form-control" />
                      <div className="clearfix"></div>
                       </Col>
                      </Row>

                      <Row className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">GST </label>
                      <Col className="col-sm-10">
                      <Input type="file" id="doc1" onChange={onChangeGst} className="form-control" />
                      <div className="clearfix"></div>
                       </Col>
                      </Row>
                          {hide===false?
                      <Button type="submit" id="submit" onClick={onSubmitHandler} className="warning">Submit</Button>:
                      <div>
                      <Button type="submit" id="update" onClick={onUpdateHandler} className="warning" >Update</Button>
                      <Button type="submit" id="delete" onClick={onClickDeleteHandler} className="warning" >Delete</Button>
                      </div>
                  }
                  </Col>
           </Row>
          </Container>
      </Fragment>
    )}
    export default AddChef