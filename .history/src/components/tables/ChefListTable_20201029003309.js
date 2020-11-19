import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button,Input} from "reactstrap";
import {Trash} from 'react-feather';
import app, {storage} from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {useHistory} from 'react-router-dom'
import Pagination from "react-js-pagination";

import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore'

// import * as firebase from "firebase/app";
import axios from 'axios'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const ChefListTable = () => {
  const [show,setShow] = useState(false)
    const [hide,setHide] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState([]);
    const history = useHistory()
    const[aRating,setArating] = useState("")
    const[aRaview,setAraview] = useState("")
    // const[coord,setCoord] = useState("")
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
    const [mnumber,setMnumber] = useState("")
    // const [otp,setOtp] = useState("")
    const [aMobileNumber,setAmobileNumber] = useState("")
    const [address,setAddress] = useState("")
    const [selectZoneName,setSelectZoneName] = useState("")
    const [selectLocalityName,setSelectLocalityName] = useState("")
    const [selectCityName,setSelectCityName] = useState([])
    const [selectZone,setSelecetZone] = useState("")
    const [selectLocality,setSelectLocality] = useState("")
    const [zipCode,setZip] = useState("")
    // const [dish,setDish] = useState("")
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
    const [cateringService,setCateringService] = useState(false)
    // const [passportimageAsFile, setPassportImageAsFile] = useState('')
    const [localFood,setLocalFood] = useState(false)

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
    const [locality,setLocality] = useState([])
    const [zone,setZone] = useState([])
    const [state,setState] = useState("")
    // const [cID,setcID] = useState([])
    // const [cNO,setcNO] = useState([])
    const [city,setCity] = useState([])
    const [citySelect,setCitySelect] = useState("")
    // const[cityPushId,setCityPushId] = useState([])
    // const[subLocalityPushId,setSubLocalityPushId] = useState([])
  
    const [agency,setAgency] = useState([])
    const [agencyName,setAgencyName] = useState("")
    // const [review,setReview] = useState("")
    const [veg,setVeg] = useState(false)
    const [ kname,setKname] = useState("")
    const [husband,setHusband] = useState("")
    const [searchTerm,setSearchTerm] = useState("")
   
 
   
  
    
  var cid=[];
  var cno=[];
  // var isMobile = false;
  // var passed=false;
    // .equalTo(a.options[a.selectedIndex].value)
    useEffect(()=>{
      setShow(true)
      // var today = new Date();
      // var dd = String(today.getDate()).padStart(2, '0');
      //  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      //  var yyyy = today.getFullYear();
      //   today = yyyy + '-' + mm + '-' + dd;
        window.addEventListener('message', handleMessage);
        var database = app.database();
        database.ref().child("CloudKitchen")
        .once('value', function(snapshot){
            if(snapshot.exists()){
              console.log(snapshot.val().size)
                var content = [];
                
                snapshot.forEach(snap=>{
                  let val = snap.val()
                  const locker = {
                    UserId: val.UserId,
                    Name: val.Name,
                    Gender: val.Gender,
                    MobileNumber:val.MobileNumber,
                    CityName: val.CityName,
                    LocalityName:val.LocalityName,
                    Membership: val.Membership,
                    AStatus: val.AStatus,
                    Passed: val.Passed
                  }
                    content.push(locker);
                  });
                  content.map(item=>{
                    if(item.Name===undefined){
                      item.Name="undefined"
                    }
                    if(item.UserId===undefined){
                      item.UserId="undefined"
                    }
                    if(item.MobileNumber===undefined){
                      item.MobileNumber="undefined"
                    }
                    return item
                  })
                  // content.reverse()
                  setSearchValue(content);
                  setShow(false)
                  
                }else{
                  const timeout = setTimeout(() => {
                      setShow(false)
                    }, 3000);
                    return ()=>{clearTimeout(timeout);}
  
              }
                });
                return () => {
                    window.removeEventListener('message', handleMessage);
                  };
                  

    },[])
    useEffect(()=>{
        // cno=[];
        // cid=[];
        // app.database().ref().child("CloudKitchen")
        // .once('value').then(function(snapshot) {
        //     snapshot.forEach(function(data){
        //         var val = data.val(); 
        //         if(val.UserId!==""&&val.UserId!==null){
        //             cid.push(val.UserId);
        //             cno.push(val.MobileNumber);
        //         }
        //         setcID(cid)
        //         setcNO(cno)
        //     });
        //     // $("#sname").autocomplete({
        //     //     source: cid
        //     //   });
        //   });
      
                app.database().ref().child("Franchise")
                .once('value').then(function(snapshot) {
                    var  content=[]
                    snapshot.forEach(function(snap){
                  
                      content.push(snap.val())
                    });
                    setAgency(content)
                    });
                
                       
        },[]);
      
       
     
        const handlePageChange = ( pageNumber ) => {
           console.log( `active page is ${ pageNumber }` );
           setCurrentPage( pageNumber )
        };

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
            // var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            // var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            // var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("ChefList.pdf");  
          });  
      }
      const onClickDeleteHandler=(event)=>{
        const localityId=event.target.id
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
                         app.database().ref().child("CloudKitchen").child(localityId).remove();
                        Swal.fire({
                        icon: "success",
                        text:"Deleted!"
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
    }
         
    const localFoodHnadler=(event)=>{
      setLocalFood(event.target.checked)
    }
       
      const onChangeCityHandler = (event)=>{
        setCitySelect(event.target.value)
        console.log(city)
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
                snapshot.forEach(zoneData=>{
                    content.push(zoneData.val());
                  });
                   setZone(content);
                }
            })
      }
  const onChangeZoneHandler=(event)=>{
  setSelecetZone(event.target.value)
  zone.filter(item=>{
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
          });
         setLocality(content)
         
          });
      }
  
     const  onChangeLocalityHandler=(event)=>{
      setSelectLocality(event.target.value)
      locality.filter(item=>{
        if(item.PushId===event.target.value){
          setSelectLocalityName(event.target.name)
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
      // const referrelChange =(event)=>{
      //   setRefCode(event.target.value)
      // }
      const chefDescriptionChange =(event)=>{
        setDesc(event.target.value)
      }
      const ingredientBrandChange =(event)=>{
        setBrand(event.target.value)
      }
      const AgencyNameChange =(event)=>{
        setAgencyName(event.target.value)
      }
      // const AreviewChange=(event)=>{
      //   setReview(event.target.value)
      // }
      const vegChangeHandler=(event)=>{
        setVeg(event.target.checked)
      }
  
      const cateringServiceChange=(event)=>{
        setCateringService(event.target.checked)
      }
      
      const hnameChange=(event)=>{
        setHusband(event.target.value)
      }
      
      const kitchenNameChange=(event)=>{
        setKname(event.target.value)
      }
  
    //    const onChangeOtp=(event)=>{
    //      setOtp(event.target.value)
    //    }
      const referelCodeChange =(event)=>{
        setRefCode(event.target.value)
      }
      const auditorRatingChange=(event)=>{
        setArating(event.target.value)
      }
      const auditrRaviewChange =(event)=>{
        setAraview(event.target.value)
      }
  
      const onChangePassPort=(event)=>{
        const image = event.target.files[0]
        // setPassportImageAsFile(imageFile => (image))
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
          storage.ref().child(image.name).getDownloadURL()
           .then(fireBaseUrl => {
            setPassportImageAsUrl(fireBaseUrl)
            window.temp++
         })
        
           
        })
    
      }
      const onChangeAdhar=(event)=>{
        const image = event.target.files[0]
        // setAdharCardImageAsFile(imageFile => (image))
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
          storage.ref().child(image.name).getDownloadURL()
           .then(fireBaseUrl => {
            setAdharCardImageAsUrl(fireBaseUrl)
            window.temp++
         })
              // setPassportImageAsUrl(prevObject => ({...prevObject, passportImgUrl: fireBaseUrl}))
          
           })
  
      }

      const onChangePanHandler=(event)=>{
        const image = event.target.file[0]
        // setPanImageAsFile(imageFile=>(image))
        
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
          storage.ref().child(image.name).getDownloadURL()
           .then(fireBaseUrl => {
          setPanImageAsUrl(fireBaseUrl)
          window.temp++
       })
          
          //  .then(()=>{setImageAsUrl({imgUrl:""})})
           
        })
      }
      const onChangeBankStatement=(event)=>{
        const image = event.target.files[0]
        // setBankStateMentImageAsFile(imageFile => (image))
        
                  
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
          storage.ref().child(image.name).getDownloadURL()
           .then(fireBaseUrl => {
          setBankStateMentImageAsUrl(fireBaseUrl)
          window.temp++
       })
          
          //  .then(()=>{setImageAsUrl({imgUrl:""})})
           
        })
    
      }
      const onChangeFssiCertificate=(event)=>{
        const image = event.target.files[0]
          // setFssiCertiImageAsFile(imageFile => (image))
          
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
            storage.ref().child(image.name).getDownloadURL()
             .then(fireBaseUrl => {
              setFssiCertiImageAsUrl(fireBaseUrl)
              window.temp++
           })
            //  .then(()=>{setImageAsUrl({imgUrl:""})})
             
          })

    
          
      } 
      const onChangeGst=(event)=>{
        const image = event.target.files[0]
          // setGstImageAsFile(imageFile => (image))
          
                  
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
            storage.ref().child(image.name).getDownloadURL()
             .then(fireBaseUrl => {
              setGstImageAsUrl(fireBaseUrl)
              window.temp++
           })
           .then(()=>{setGstImageAsUrl("")})
            //  .then(()=>{setImageAsUrl({imgUrl:""})})
             
          })
         
      } 
     const onChangeMemberShip=(event)=>{
      // var membership = document.getElementById('membership');
  setMemberShip(event.target.value)
      if(memberShip === "Free"){
    //    document.getElementById('subscription').style.display="flex";
    //    document.getElementById('commission').style.display="flex";
       setSamount("0");
       setComPer("24");
      }
      else   if(memberShip === "Bronze"){
    //    document.getElementById('subscription').style.display="flex";
    //    document.getElementById('commission').style.display="flex";
       setSamount("14999");
       setComPer("18");
      }
      else  if(memberShip === "Silver"){
    //    document.getElementById('subscription').style.display="flex";
    //    document.getElementById('commission').style.display="flex";
       setSamount("29999");
       setComPer("12");
      }
      else  if(memberShip === "Gold"){
    //    document.getElementById('subscription').style.display="flex";
    //    document.getElementById('commission').style.display="flex";
       setSamount("79999");
       setComPer("5");
      }
      else  if(memberShip === "Custom"){
    //    document.getElementById('subscription').style.display="flex";
    //    document.getElementById('commission').style.display="flex";
       setSamount("");
      setComPer("");
      }
      }
      const onClickSearchHandler=(event)=>{
        setHide(false)
          const id=event.target.id
      var zoneId="";
      // var localityId="";
      // var selectcityname=[]
      // var selectcitypushid = []
      var firebaseref=app.database().ref().child("CloudKitchen").child(id);
      return firebaseref.once('value').then(function(snapshot) {
          if(snapshot.exists()){
           setSname(snapshot.val().UserId)
           setName(snapshot.val().Name);
          // kitchenname.value= snapshot.val().KitchenName;
          setAge(snapshot.val().Age)
          if(snapshot.val().Gender!==null&&snapshot.val().Gender!=="")
              setGender(snapshot.val().Gender);
          setMail(snapshot.val().Email);
          setMnumber(snapshot.val().MobileNumber)
          setAmobileNumber(snapshot.val().AlternateNumber);
          setAddress(snapshot.val().Address);
          setCitySelect(snapshot.val().City)
          setSelectCityName(snapshot.val().CityName)
          zoneId=snapshot.val().Locality
          // localityId=snapshot.val().SubLocality

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
                      setZone(mLocalityList)
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
                          setLocality(subLocalityList)
                          setSelectLocality(snapshot.val().SubLocality)
                          setSelectLocalityName(snapshot.val().SubLocalityName)
                          });
                      }
                  });
                } 
           
  
          if(snapshot.val().Passed!==null&&snapshot.val().Passed!==""){
              if(snapshot.val().Passed==="Yes"){
                  // passed=true;
                //   document.getElementById('smssent').style.display="block";
              }
              else{
                //   document.getElementById('smssent').style.display="block";
              }
          }
             
  
              if(snapshot.val().Franchise!==null&&snapshot.val().Franchise!==""){
                  setAgencyName(snapshot.val().Franchise)
              }
         
          if(snapshot.val().State!==null&&snapshot.val().State!=="")
          setState(snapshot.val().State);
          setZip(snapshot.val().Zipcode);
          setSpecial(snapshot.val().Special);
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
          if(snapshot.val().Doc1!==""){
            setPassportImageAsUrl(snapshot.val().Doc1);
        }
        else{
          setPassportImageAsUrl("")
                }
        if(snapshot.val().Doc2!==""){
          setAdharCardImageAsUrl(snapshot.val().Doc2);
        }
        else{
          setAdharCardImageAsUrl("")
                }
         if(snapshot.val().Doc3!==""){
          setPanImageAsUrl(snapshot.val().Doc3);
         }
        else{
          setPanImageAsUrl("")      
          }
         if(snapshot.val().Doc4!==""){
          setBankStateMentImageAsUrl(snapshot.val().Doc4);
         }
        else{
          setBankStateMentImageAsUrl("")    
            }
         if(snapshot.val().Doc5!==""){
          setFssiCertiImageAsUrl(snapshot.val().Doc5);
         }
        else{
          setFssiCertiImageAsUrl("")   
             }
        if(snapshot.val().Doc6!==""){
          setGstImageAsUrl(snapshot.val().Doc6);
        }
        else{
          setGstImageAsUrl("");
        }
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
            setVeg(true)
          }
  
          if(snapshot.val().Catering==="Yes"){
              setCateringService(true);
          }
          else{
            setCateringService(false);
          }
  
          setShow(false)
          }
          else{
           
  
              
            setName("");
            // kitchenname.value="";
            setAge("")
            setGender("Select")
            setMail("")
            setMnumber("")
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
              setPanImageAsUrl("")
              setPassportImageAsUrl("")
              setBankStateMentImageAsUrl("")
              setGstImageAsUrl("")
              setFssiCertiImageAsUrl("")
            
            //   document.getElementById('smssent').style.display="none";
            //   document.getElementById('coord').innerHTML="Location Co-Ordinates";
            // setCoord("Location Co-Ordinates")

              // setPassportImageAsFile("")
              // setAdharCardImageAsFile('')
              // setPanImageAsFile('')
              // setBankStateMentImageAsFile('')
              // setFssiCertiImageAsFile('')
              // setGstImageAsFile('')
              
                const timeout = setTimeout(() => {
                    setShow(false)
                  }, 3000);
                  return ()=>{clearTimeout(timeout);}

            
          }
         
  });
      }

     
      const onClickBackHandler=(event)=>{
        setHide(true)
      }
          const onUpdateHandler=(event)=>{
            
        console.log(gstImageAsUrl)
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
                // if(husband==="")
                // {
                //     alert("Enter Father/Husband Name");
        
                //     return;
                // }
                // if(kname==="")
                // {
                //     alert("Enter Kitchen Name");
      
                //     return;
                // }
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
                if(mnumber.length!==10)
                {
                    alert("Enter Proper Mobile Number");
                    
                    return;
                }
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
        
        
                    if(window.lat===0){
                        alert("Please enable gps in setting and click get location button");
                            return;
                    }
        
                    if(window.long===0){
                        alert("Please enable gps in setting and click get location button");
                            return;
                    }
                    if(aRating==="")
                    {
                        alert("Enter Auditor Ratings");
                    
                        // $("#update").removeAttr("disabled");
                        return;
                    }
        
                    if(aRaview==="")
                    {
                        alert("Enter Auditor Review");
                    
                        // $("#update").removeAttr("disabled");
                        return;
                    }
        
        
                // if(window.temp<5){
                //       alert('Wait for images to upload');
                //     //   $("#update").removeAttr("disabled");
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
                            firebaseref.child("MobileNumber").set(mnumber);
                            firebaseref.child("AlternateNumber").set(aMobileNumber);
                            firebaseref.child("Address").set(address);
                            firebaseref.child("City").set(citySelect);
                            firebaseref.child("CityName").set(selectCityName);
                            firebaseref.child("Locality").set(selectZone);
                            firebaseref.child("LocalityName").set(selectZoneName);
                            firebaseref.child("SubLocality").set(selectLocality);
                            firebaseref.child("SubLocalityName").set(selectLocalityName);
                            firebaseref.child("State").set(state);
                            firebaseref.child("Zipcode").set(zipCode);
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
  
                           
                            if(localFood===true)
                            firebaseref.child("Local").set("Yes");
                        else 
                            firebaseref.child("Local").set("No");
  
                            if(veg===true)
                                firebaseref.child("Veg").set("Yes");
                            else 
                                firebaseref.child("Veg").set("No");
  
                                if(cateringService===true)
                              firebaseref.child("Catering").set("Yes");
                           else 
                                firebaseref.child("Catering").set("No");
  
  
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
                          setMnumber("")
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
                            window.verified="no";
                            setLocalFood(false)

                            setVeg(false)
                            setCateringService(false)
                            // locality.value="";
                            // document.getElementById('coord').innerHTML="Location Co-Ordinates";
                            // setCoord("Location Co-Ordinates")

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
                        
                
                //             document.getElementById("#submit").style.visibility="visible";
                //    document.getElementById("#delete").style.visibility="hidden";
                //    document.getElementById("#update").style.visibility="hidden";
                //    document.getElementById("#sign-in-button").style.visibility="visible";
  
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
                          //  setcNO(cno)
                       });
                            });
                            var database = app.database();
                            database.ref().child("CloudKitchen")
                            .once('value', function(snapshot){
                                if(snapshot.exists()){
                                    var content = [];
                                    
                                    snapshot.forEach(snap=>{
                                        content.push(snap.val());
                                      });
                                      setSearchValue(content);
                                    }
                                    });
                            setHide(true)
                        
          }

//     const onClickGetCoordHandler=(event)=>{
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//       } else {
//         document.getElementById('coord').innerHTML = "Geolocation is not supported by this browser.";
//       }
    
//   }
  
  // function showPosition(position) {
  //     // document.getElementById('coord').innerHTML = "Latitude: " + position.coords.latitude +
  //     // "<br>Longitude: " + position.coords.longitude;
  //     setCoord("Latitude: " + position.coords.latitude +
  //      "<br>Longitude: " + position.coords.longitude)
  //     window.lat=position.coords.latitude;
  //     window.long=position.coords.longitude;
  // }

  const deletePhotoHandler = (event) =>{
    var userid = event.target.id
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
               app.database().ref().child("CloudKitchen").child(userid).child("PP").remove();
              Swal.fire({
              icon: "success",
              text:"Deleted!"
          });
      }
  });

  }

 
 
//   const Columns = [
//     {name: 'IMFIDD',selector: 'id',sortable: true,center:true,},
//     {name: 'Name',selector: 'name',sortable: true,center:true,},
//     {name: 'Gender',selector: 'gender',sortable: true,center:true},
//     {name: 'Number',selector: 'number',sortable: true,center:true},
//     {name: 'City',selector: 'city',sortable: true,center:true},
//     {name: 'Zone',selector: 'zone',sortable: true,center:true},
//     {name: 'Package',selector: 'package',sortable: true,center:true},
//     {name: 'Status',selector: 'status',sortable: true,center:true},
//     {name: 'TA',selector: 'ta',sortable: true,center:true},
//     {name: 'Profile',selector: 'profiler',sortable: true,center:true},
//     {name: 'Delete Photo',selector: 'delete photo',sortable: true,center:true},
//     {name: 'View',selector: 'view',sortable: true,center:true},
//     {name: 'Delete ',selector: 'delete',sortable: true,center:true},

// ];
const todosPerPage = 3;
const [ activePage, setCurrentPage ] = useState( 1 );

// Logic for displaying current todos
const indexOfLastTodo  = activePage * todosPerPage;
const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
const currentTodos     = searchValue.slice( indexOfFirstTodo, indexOfLastTodo );

const renderTodos =   currentTodos.filter(order=>order.UserId.includes(searchTerm)).map((item,id) => {
                            
  return(
 <tr key={id}>
     <td>{id+1}</td>
     <td>{item.UserId}</td>
     <td>{item.Name}</td>
     <td>{item.Gender}</td>
     <td>{item.MobileNumber}</td>
     <td>{item.CityName}</td>
     <td>{item.LocalityName}</td>
     <td>{item.Membership}</td>
     {item.AStatus==="InActive"?
     <td className="text-primary">{item.AStatus}</td>:
     <td className="text-success">{item.AStatus}</td>
   }
   {item.Passed!==""&&item.Passed!==null?
   <td className="text-primary"><b>{item.Passed}</b></td>:
   <td className="text-primary"><b>{""}</b></td>

 }
 {item.UserId==="undefined"?
 <>
 <td><></></td>
 <td></td>
 </>:
 <>
 <td><a href={item.PP} target="_blank" rel="noopener noreferrer">View</a></td>
 <td ><Button type="button"><Trash id={item.UserId} onClick={deletePhotoHandler} size={15}/></Button></td> 
 
 </>
}
                                               
      <td><button type="button" id={item.UserId} onClick={onClickSearchHandler} className="btn btn-success btn-md">{"View"}</button></td>
     <td><button type="button" id={item.UserId} onClick={onClickDeleteHandler} className="btn btn-danger btn-md">{"Delete"}</button></td>

 </tr>
 )
 
     })
    

    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Food Management" title="Chef List"/>
            <Container fluid={true}>
                <Row>
                <Col sm ="12">
               <CardHeader>
               <h6>Chef List</h6>
                                {/* <span> Use a className <code> table </code> to any table.</span> */}
                 </CardHeader>
               </Col> 
                </Row>
                {hide!==true?
                    <div>


                <Col sm="12">
                            <Col sm="12" style={{marginTop:"3%",marginLeft:"-1%"}}>
                      
                         
                      <h5>Alter Chef Details</h5>
                      {/* <span> Use a className <code> table </code> to any table.</span> */}
              
                  </Col>
                            <Row className="form-row" style={{marginTop:"3%"}}>
                             <Col className="form-group col-md-6">
                             <label className="form-label">Enter Home Chef registration Number</label>
                            <Row>
                            <Col className="col-lg-6 col-md-5 col-sm-5">
                            <Input type="text" id="sname" value={sname} onChange={onChangeSearchName} className="form-control"/>
                            </Col>
                            {/* <Col className="col-sm-1 col-md-2">
                            <span id="search" onClick={onClickSearchHandler}><img src="https://img.icons8.com/ios-filled/24/000000/search.png"/></span>
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
                        <Col className="form-group col-md-6">
                        <label className="form-label">Full Name <span style={{color: "red"}}>*</span></label>
                        <Input type="text"   value={name} onChange={onChangeNameHandler} className="form-control" placeholder="Full Name"/>
                        <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-2">
                       <label className="form-label">Age <span style={{color: "red"}}>*</span></label>
                        <Input type="number"  value={age} onChange={onChangeAge} className="form-control" placeholder="Age"/>
                         <div className="clearfix"></div>
                        </Col>
                         </Row>

                         <Row className="form-row">
                         <Col className="form-group col-md-4">
                        <label className="form-label">Father/Husband Name <span style={{color: "red"}}>*</span></label>
                        <Input type="text"   value={husband} onChange={hnameChange} className="form-control" placeholder="Father/Husband Name"/>
                        <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                       <label className="form-label">Kitchen Name <span style={{color: "red"}}>*</span></label>
                        <Input type="text"  value={kname} onChange={kitchenNameChange} className="form-control" placeholder="Kitchen Name"/>
                         <div className="clearfix"></div>
                        </Col>
                         </Row>

                         <Row className="form-row">
                         <Col className="form-group col-md-4">
                        <label className="form-label">Gender <span style={{color: "red"}}>*</span></label>
                        <select className="form-control" value={gender} onChange={onChangeGender} >
                        <option value="Select">Select</option>
                        <option value="Male">Male</option>
                         <option value="Female">Female</option>
                         <option value="Transgender">Transgender</option>
                         </select>                        
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                       <label className="form-label">Email Id <span style={{color: "red"}}>*</span></label>
                        <Input type="email"  value={mail} onChange={onChangeMail} className="form-control" placeholder="Email ID"/>
                         <div className="clearfix"></div>
                        </Col>
                         </Row>
                         <Row className="form-row">
                         <Col className="form-group col-md-6">
                        <label className="form-label">Mobile Number <span style={{color: "red"}}>*</span></label>
                        <Input type="number" id="mobilenumber" value={mnumber} onChange={onChangeMobileNumber}className="form-control" placeholder="Mobile Number"/>
                        <div className="clearfix"></div>
                         </Col>

                         {/* <Col className="form-group col-md-2" >
                        <label className="form-label" id="otp">OTP <span style={{color: "red"}}>*</span></label>
                         <Input id="verification-code"   type="number" className="form-control" value={otp} onChange={onChangeOtp} placeholder="OTP"/>	
                        </Col>  */}
                        {/* <Col className="form-group col-md-3" style={{marginTop:"3%"}} >
                        <Button className="warning" id="sign-in-button"  style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}} >Send OTP</Button>	
                        <Button className="btn btn-primary"  id="verify-code-button" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}} onClick={verifyCodeHandler} >Verify</Button>	
                        </Col> */}

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
                        <select className="form-control" value={citySelect} onChange={onChangeCityHandler} >
                        <option value="Select">Select</option>
                          {city.map((item,id)=>{
                          return(
                          <option key={id} value={item.PushId}>{item.Name}</option>)}
                          )}
                         </select>                        
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label" >Zone <span style={{color: "red"}}>*</span></label>
                        <select className="form-control" value={selectZone} onChange={onChangeZoneHandler} >
                        <option value="Select">Select</option>
                        {zone.map((item,id)=><option key={id}  value={item.PushId}>{item.Name}</option>)}
                         </select>                        
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Locality <span style={{color: "red"}}>*</span></label>
                        <select className="form-control" value={selectLocality} onChange={onChangeLocalityHandler} >
                        <option value="Select">Select</option>
                        {locality.map((item,id)=><option key={id}  value={item.PushId}>{item.Name}</option>)}
                         </select>                        
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">State <span style={{color: "red"}}>*</span></label>
                        <select className="form-control"value={state} onChange={onChangeState} >
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
                        <Input type="number" value={zipCode} onChange={onChangeZipCode} className="form-control"  placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        
                        <Row>
                        {/* <Col className="form-group col-md-4">
                        <Button type="button" id="getcoord" onClick={onClickGetCoordHandler}  className="warning">Get Location Co-ordiantes *</Button>
                        <p id="coord"> Location Co-ordiantes </p>
                         <div className="clearfix"></div>
                        </Col> */}
                        <Col className="form-group col-md-8">
                        <label className="form-label">Specialized Dishes <span style={{color: "red"}}>*</span></label>
                        <Input type="text" className="form-control" value={special} onChange={specialDishChange}  placeholder=""/>                      
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
                        <Input type="time" value={kClose} onChange={kitchenCloseChange} className="form-control"  placeholder=""/>                      
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
                        <Input type="number" value={brand} onChange={ingredientBrandChange} className="form-control"  placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-12">
                        <h4>Refrences</h4>
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
                        <Input type="text" value={refAddress1} onChange={referelAddress1Change} className="form-control"  placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Reference 1 Mobile Number </label>
                        <Input type="number" value={refNumber1} onChange={referelNumber1Change} className="form-control"  placeholder=""/>                      
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
                        <Input type="text" className="form-control" value={refAddress2} onChange={referelAddress2Change}  placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Reference 2 Mobile Number </label>
                        <Input type="number" value={refNumber2} onChange={referelNumber2Change}className="form-control"  placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-12">
                        <h4>Bank Account</h4>
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        <Row>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Bank Account Name <span style={{color: "red"}}>*</span> </label>
                        <Input type="text" value={bankName} onChange={BankNameChange} className="form-control"/>                    
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Bank Account Number <span style={{color: "red"}}>*</span> <span style={{color: "red"}}>*</span></label>
                        <Input type="number" value={bankNumber} onChange={bankNumberChange} className="form-control"  placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Bank IFSC Code <span style={{color: "red"}}>*</span></label>
                        <Input type="text" value={bankCode} onChange={bankCodeChange} className="form-control"  placeholder=""/>                      
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
                        <Input type="text" className="form-control" value={branchAddress} onChange={branchAddressChange}  placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        <Col className="form-group col-md-4">
                        <label className="form-label">Remark</label>
                        <Input type="text" value={remark} onChange={RemarkChange}className="form-control"  placeholder=""/>                      
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
                        <select className="form-control" value={memberShip} onChange={onChangeMemberShip}>
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
                        <input type="date" value={edate} onChange={endingDateChange}className="form-control digits"  />                      
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
                        <label className="form-label">Enter Referral Code </label>
                        <Input type="text" value={refCode} onChange={referelCodeChange} className="form-control"/>                    
                         <div className="clearfix"></div>
                        </Col>
                        </Row>

                        
                        <Row >
                        <Col className="form-group col-md-4">
                        <label className="form-label">Working Partner ID   </label>
                        <select id="agency" value={agencyName} onChange={AgencyNameChange}className="form-control">
                        <option value="Select">Select</option>
                          {agency.map((item,id)=><option key={id} value={item.UserId}>{item.Name}</option>)}
                        </select>                   
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
                        <Input type="text" className="form-control" value={aRaview}  onChange={auditrRaviewChange}  placeholder=""/>                      
                         <div className="clearfix"></div>
                        </Col>
                        {/* <Col className="form-group col-md-4">
                        <Button className="warning" id="sms" href="#" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}} onClick={onClickSmsHandler}>Send Message</Button>	
                        <p id="smssent" style={{color:"green"}}>SMS Sent</p>                         
                        <div className="clearfix"></div>
                        </Col> */}
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
                        <Col className="col-sm-8">
                        <Input type="file" onChange={onChangePassPort}   />
                        <div className="clearfix"></div>
                         </Col>
                         <div className="col-sm-1">
                           {passportImageAsUrl===""?
                             <></> :
                           <a href={passportImageAsUrl}   target="_blank" rel="noopener noreferrer">View</a>
                           }
                          </div>

                         
                        </Row>

                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Aadhar Card Upload </label>
                        <Col className="col-sm-8">
                        <Input type="file"  onChange={onChangeAdhar}  />
                        <div className="clearfix"></div>
                         </Col>
                         <div className="col-sm-1">
                           {adharCardImageAsUrl===""?
                            <></>:
                            <a href={adharCardImageAsUrl}   target="_blank" rel="noopener noreferrer">View</a>
                           }
                        </div>
                        </Row>

                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Pan/Voter </label>
                        <Col className="col-sm-8">
                        <Input type="file" onChange={onChangePanHandler}  />
                        <div className="clearfix"></div>
                         </Col>
                         <div className="col-sm-1">
                         {panImageAsUrl===""?
                            <></>:
                            <a href={panImageAsUrl}  target="_blank" rel="noopener noreferrer">View</a>
                           }
                           </div>
                        </Row>

                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Passbook/Bank Statement </label>
                        <Col className="col-sm-8">
                        <Input type="file" onChange={onChangeBankStatement}  />
                        <div className="clearfix"></div>
                         </Col>
                         <div className="col-sm-1">
                         {bankStateMentImageAsUrl===""?
                            <></>:
                            <a href={bankStateMentImageAsUrl}  target="_blank" rel="noopener noreferrer">View</a>                
                                       }
                        </div>
                        </Row>

                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">FSSAI Certificate </label>
                        <Col className="col-sm-8">
                        <Input type="file" onChange={onChangeFssiCertificate}  />
                        <div className="clearfix"></div>
                         </Col>
                         <div className="col-sm-1">
                         {fssiCertiImageAsUrl===""?
                            <></>:
                            <a href={fssiCertiImageAsUrl}  target="_blank" rel="noopener noreferrer">View</a>
                           }
                        </div>
                        </Row>

                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">GST </label>
                        <Col className="col-sm-8">
                        <Input type="file"  onChange={onChangeGst} />
                        <div className="clearfix"></div>
                         </Col>
                         <div className="col-sm-1">
                         {gstImageAsUrl===""?
                          <></>  : 
                           <a href={gstImageAsUrl}   target="_blank" rel="noopener noreferrer">View</a>}
                        </div>
                        </Row>

                        <Button type="submit" id="submit" onClick={onClickBackHandler} className="warning">Back</Button>
                        <Button type="submit" id="update" style={{marginLeft:"2%"}} onClick={onUpdateHandler} className="warning" >Update</Button>
                    </Col>
                    </div>
                :<div>

                
                <Row>
               
                    <div className="col-md-11 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="ChefList"  
                sheet="ChefList"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/addChef"
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
                        <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-9">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text"  value={searchTerm} onChange={onChangeHandler}  required=""  className="form-control" placeholder="Search for Order ID" />
                             <div className="clearfix"></div>
                        </div>
                    </div>
       
                            <div className="table-responsive text-nowrap">
                                <Table id="datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col"> MFID</th>
                                            <th scope="col"> Name</th>
                                            <th scope="col"> Gender</th>
                                            <th scope="col"> Number</th>
                                            <th scope="col"> City</th>
                                            <th scope="col"> Zone</th>
                                            <th scope="col"> Package</th>
                                            <th scope="col"> Status</th>
                                            <th scope="col"> TA</th>
                                            <th  scope="col">Profile Photo</th>
                                            <th  scope="col">Delete Photo</th>

                                            <th scope="col"> View</th>
                                            <th scope="col"> Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    { renderTodos }
                                    </tbody>
                                </Table>
                               
      
                            </div>
    
                            <div className="pagination">
            <Pagination
               activePage={ activePage }
               itemsCountPerPage={ 10 }
               totalItemsCount={ searchValue.length }
               pageRangeDisplayed={ 10 }
               onChange={ handlePageChange }
            />
         </div>
                        </Card>
                    </Col>
                    </Row>
                    </div>
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
        
export default ChefListTable;