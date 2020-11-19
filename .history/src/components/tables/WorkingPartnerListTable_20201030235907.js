import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button,Input} from "reactstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {useHistory} from 'react-router-dom'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore'
import axios from 'axios'
import app, {storage} from '../../data/base'
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const WorkingPartnerListTable = () => {
  const [show,setShow] = useState(true)
  const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})

    const [users,setUsers] = useState([])
    const [cityName,setCityName] = useState([])
    const [cityPushId,setCityPushId] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()
    const [buttonHide,setButtonHide] = useState(false)
    const [localFood,setLocalFood] = useState(false)

    const [searchName,setSearchName] = useState("")
    const [workingPartnerName,setworkingPartnerName]=useState("")   
    const [emailID,setEmailID]=useState("")
    const [deliveryBaseKm,setDeliveryBaseKm]=useState("")
    const [selectWorkingCity,setSelectWorkingCity]=useState("")
    const [mobileNumber,setMobileNumber]=useState(0)
    // const [otp,setOtp]=useState('')
    const [alterMobileNumber,setAlterMobileNumber]=useState('')
    const [address,setAddress]=useState("")
    const [selectState,setSelectState]=useState("")
    const [zip,setZip]=useState("")
    const [selectCity,setSelectCity]=useState("")
    const [ selectLocality,setSelectLocality] = useState("")
    const [city,setCity]=useState([])
    const [locality,setLocality] = useState([])
    // const [workingPartner,setworkingPartner]=useState([])
    const [deliveryPrice,setDeliveryPrice]=useState("")
    const [DeliveryExtraPrice,setDeliveryExtraPrice] = useState("") 
    const [accountName,setAccountName]=useState("")
    const [accountNumber,setAccountNumber]=useState("")
    const [isfcCode,setIfscCode]=useState("")
    const [branchName,setBranchName]=useState("")
    const [branchAddress,setBranchAddress]=useState("")
    const [commisionPercentage,setCommisionPercentage] = useState("")
    const [password,setPassword] = useState("")
    // const [adharFile,setAdharFile]=useState("")
    const [adharUrl,setAdharUrl]=useState("")
    // const [panFile,setPanFile]=useState("")
    const [panUrl,setPanUrl]=useState("")
    // const [passbookFile,setPassbookFile]=useState("")
    const [passbookUrl,setPassbookUrl]=useState("")
    // const [gstFile,setGstFile]=useState("")
    const [gstUrl,setGstUrl]=useState("")
    const [gst,setGst] = useState("")
    const [selectWorkingCityName,setSelectWorkingCityName] = useState("")
   
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
    var cityname=[];
    var citypushid=[];
    var database = app.database();
    database.ref().child("Masters").child("City")
    .once('value', function(snapshot){
        snapshot.forEach(function(data){
           snapshot.forEach(function(data){
                var val = data.val();      
                  cityname.push(val.Name);
                  citypushid.push(val.PushId);
            });
            cityname.reverse();
            citypushid.reverse();
            setCityName(cityname)
            setCityPushId(citypushid)
        })
        var database = app.database();
        database.ref().child("Franchise")
    .on('value', function(snapshot){
        if(snapshot.exists()){
        // $('#datatable').empty();
        var content = [];
        
        snapshot.forEach(snap=>{
            content.push(snap.val());
             
          });
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
},[])
    useEffect(()=>{
    //  app.database().ref().child("workingPartner")
    //  .once('value').then(function(snapshot) {
    //      snapshot.forEach(function(data){
    //          var val = data.val(); 
    //          cid.push(val.UserId);
    //          cno.push(val.MobileNumber);
    //      });
    //      setCid(cid)
    //      setCno(cno)
    //        });
    
    
     // [END appVerifier]

     app.database().ref().child("Masters").child("City")
       .once('value').then(function(snapshot) {
         var content=[]
           snapshot.forEach(function(data){
              //  var val = data.val(); 
              content.push(data.val())
           });
             setCity(content)
           });
          //  app.database().ref().child("Franchise")
          //  .once('value').then(function(snapshot) {
          //    var content=[]
          //      snapshot.forEach(function(data){
          //          var val = data.val(); 
          //        content.push(data.val())
          //      });
          //      setworkingPartner(content)
          //    });
    },[])
    

   
   const onChangeSearchName=(event)=>{
    setSearchName(event.target.value)
   }
   
   const onChangeworkingPartnerName=(event)=>{
     setworkingPartnerName(event.target.value)
    }
  
  
    const onChangeWorkingCity=(event)=>{
     setSelectWorkingCity(event.target.value)
     city.filter(item=>{
      if(item.PushId===event.target.value){
        setSelectWorkingCityName(item.Name)
        
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
     const onChangeGstNumber=(event)=>{
      setGst(event.target.value)
     }
    const onChangeMobileNumber=(event)=>{
     setMobileNumber(event.target.value)
    }
    // const onChangeOtp=(event)=>{
    //  setOtp(event.target.value)
    // }
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
  
    const onChangeCommisiionPercentage=(event)=>{
      setCommisionPercentage(event.target.value)
    }
  
    const onChangePassword=(event)=>{
      setPassword(event.target.value)
    }
   
    const onChangeEmailId=(event)=>{
     setEmailID(event.target.value)
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
           setPassbookUrl( fireBaseUrl)
           window.temp++
        })
       
        
     })  
     }
     const onChangeGst=(event)=>{
      const image = event.target.files[0]
      // setGstFile(imageFile => (image))
                    
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
           setGstUrl( fireBaseUrl)
           window.temp++
        })
      
        
     })  
     }
    
    const onSearchHandler=(event)=>{
        const pushid=event.target.value
     var firebaseref=app.database().ref().child("Franchise").child(pushid);
     return firebaseref.once('value').then(function(snapshot) {
         if(snapshot.exists()){
            setSearchName(snapshot.val().UserId);
         setworkingPartnerName(snapshot.val().Name);
         setEmailID( snapshot.val().Email);
         setSelectWorkingCity( snapshot.val().City1);
         setMobileNumber( snapshot.val().MobileNumber);
         setAlterMobileNumber( snapshot.val().AlternateNumber);
         setAddress( snapshot.val().Address);
         setSelectCity(snapshot.val().City);
         setCommisionPercentage(snapshot.val().Commision);
         setPassword(snapshot.val().Password);
         setGst(snapshot.val().Gst);
         setSelectState( snapshot.val().State);
         setZip( snapshot.val().Zipcode);
         setAccountName( snapshot.val().AccountName);
         setAccountNumber( snapshot.val().AccountNumber);
         setIfscCode( snapshot.val().IFSC)
         setBranchName( snapshot.val().BranchName);
         setBranchAddress( snapshot.val().BranchAddress);
          setDeliveryExtraPrice(snapshot.val().Price1)
           setAdharUrl(snapshot.val().Doc1);
           setPanUrl(snapshot.val().Doc2);
           setPassbookUrl(snapshot.val().Doc3);
           setGstUrl(snapshot.val().Doc4);
           var database = app.database();
          //  if(snapshot.val().Local==="Yes"){
          //   setLocalFood(true)
          // }
          // else{
          //     setLocalFood(false)
          // }
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
               });
  
           window.temp=7;
           window.verified="Yes";
         }else{
             setSearchName("")
             setSelectWorkingCity("")
             setworkingPartnerName("")
             setCommisionPercentage("")
             setSelectLocality("")
             setPassword("")
             setGst("")
             setDeliveryBaseKm("")
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
             setLocalFood(false)

             window.temp=0;
  
            //  setAdharFile("")
             setAdharUrl("")
            //  setPassbookFile("")
             setPassbookUrl("")
            //  setPanFile("")
             setPanUrl("")
            //  setGstFile("")
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
         const onBackHandler=(event)=>{
             setButtonHide(false)
         }
 
     const onUpdateHandler=()=>{
       try{
      if(workingPartnerName==="")
      {
          alert("Enter  Name");
          return;
      }
      if(emailID==="")
      {
          alert("Enter Email ID");
          return;
      }
      if(deliveryPrice==='')
      {
          alert("Enter Delivery Base Price");
          return;
      }
      if(deliveryBaseKm==='')
      {
          alert("Enter  Delivery Base Price");
          return;
      }
      if(DeliveryExtraPrice==='')
      {
          alert("Enter Extra Delivery Base Price");
          return;
      }
   
      if(mobileNumber===0)
      {
          alert("Enter Mobile Number");
          return;
      }
      // if(mobileNumber.length!==10)
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
      if(commisionPercentage==="")
      {
          alert("Enter Commision");
          return;
      }
  
      if(password==="")
      {
          alert("Enter Password");
          return;
      }
      if(selectCity==="Select")
      {
          alert("Select City");
          return;
      }
      if(selectLocality==="Select")
      {
          alert("Select Locality");
  
          return;
      }
      // var tot=0
     
      var firebaseref1=app.database().ref().child("WebUser").child(searchName);
      firebaseref1.child("Password").set(String(password));
               
               var firebaseref=app.database().ref().child("Franchise").child(searchName);
                   firebaseref.child("UserId").set(searchName);
                   firebaseref.child("Name").set(workingPartnerName);
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
                   firebaseref.child("Locality").set(selectLocality);
                      firebaseref.child("Gst").set(gst);
                      firebaseref.child("Commision").set(commisionPercentage);
                      firebaseref.child("Password").set(password);
                      firebaseref.child("Doc1").set(adharUrl);
                      firebaseref.child("Doc2").set(panUrl);
                      firebaseref.child("Doc3").set(passbookUrl);
                      firebaseref.child("Doc4").set(gstUrl);
                      if(localFood===true)
                      firebaseref.child("Local").set("Yes");
                  else 
                      firebaseref.child("Local").set("No");
                      firebaseref.child("Cash").set(0);
                               
                              
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
                   setworkingPartnerName("")
                   setSelectWorkingCity("")
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
                   setDeliveryBaseKm("")
                   setBranchAddress("")
                   setCommisionPercentage("")
                   setSelectLocality("")
                   setPassword("")
                   setGst("")
                   window.temp=0;
        
                  //  setAdharFile("")
                   setAdharUrl("")
                  //  setPassbookFile("")
                   setPassbookUrl("")
                  //  setPanFile("")
                   setPanUrl("")
                  //  setGstFile("")
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
                               app.database().ref().child("Franchise").child(pushid).remove();
                               Swal.fire("Deleted!", {
                                icon: "success",
                            });
                           }
                        })
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
            pdf.save("WorkingPartnerList.pdf");  
          });  
      }
      const excludeSearch = ["UserId","Name"]
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
            <BreadCrumb parent={<Home/>} subparent="Working Partner Management" title="Working Partner List"/>
            <Container fluid={true}>
                {buttonHide===true?
                 <Row>
                 <Col sm="12">
                       <CardHeader>
                             <h6>Create Working Partner</h6>
                             {/* <span> Use a class <code> table </code> to any table.</span> */}
                         </CardHeader>
                         <Col sm="12" style={{marginTop:"3%",marginLeft:"-1%"}}>
                   
                      
                             <h5>Alter Working Partner Details</h5>
                             {/* <span> Use a class <code> table </code> to any table.</span> */}
                     
                         </Col>
                         <Row className="form-row" style={{marginTop:"3%"}}>
                          <Col className="form-group col-md-6">
                          <label className="form-label">Enter WorkingPartner ID</label>
                         <Row>
                         <Col className="col-lg-6 col-md-5 col-sm-5">
                         <Input value={searchName} onChange={onChangeSearchName} type="text" id="sname" className="form-control"/>
                         </Col>
                         {/* <Col className="col-sm-1 col-md-2">
                         <span onClick={onSearchHandler} id="search"><img src="https://img.icons8.com/ios-filled/24/000000/search.png"/></span>
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

                      {/* <!-- <div class="form-group col-md-6">
                        <label class="form-label">Could Kitchen Name <span style="color: red;">*</span> </label>
                        <input type="text" id="kitchenname" class="form-control" placeholder="Cloud Kitchen Name">
                         <div class="clearfix"></div>
                         </div> --> */}
                     <Col className="form-group col-md-6">
                     <label className="form-label">Working Name <span style={{color: "red"}}>*</span></label>
                     <Input type="text" value={workingPartnerName} onChange={onChangeworkingPartnerName} id="name" className="form-control" placeholder="Full Name"/>
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
                     {/* <Button className="warning" onClick={onSignInSubmit} id="sign-in-button" href="#" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}}>Send OTP</Button>	 */}
                     {/* <Button class="warning" onClick={onVerifyCodeSubmit} id="verify-code-button" href="#" style={{color: "white",fontFamily: 'Cinzel',fontWeight: "bold"}}>Verify</Button>	 */}
                     {/* </Col> */} 

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
                     <label className="form-label">Working City <span style={{color: "red"}}>*</span></label>
                     <select value={selectWorkingCityName} onChange={onChangeWorkingCity} className="form-control" id="gender">
                     <option value="Select">Select</option>
                     {city.map((item,id)=>{
                       return(
                       <option key={id} value={item.PushId}>{item.Name}</option>)}
                       )}
                      </select>                        
                      <div className="clearfix"></div>
                     </Col>
                     <Col className="form-group col-md-3">
                     <label className="form-label">Zone <span style={{color: "red"}}>*</span></label>
                     <select value={selectLocality} onChange={onChangeLocality} className="form-control" id="gender">
                     <option value="Select">Select</option>
                     {locality.map((item,id)=><option key={id}  value={item.PushId}>{item.Name}</option>)}

                      </select>                       
                      <div className="clearfix"></div>
                     </Col>
                     <Col className="form-group col-md-3">
                     <label className="form-label">Commision Percentage <span style={{color: "red"}}>*</span></label>
                     <Input type="number" value={commisionPercentage} onChange={onChangeCommisiionPercentage} className="form-control" id="gender" placeholder=""/>                      
                      <div className="clearfix"></div>
                     </Col>
                     <Col className="form-group col-md-3">
                     <label className="form-label">Password<span style={{color: "red"}}>*</span></label>
                     <Input type="password" value={password} onChange={onChangePassword} className="form-control" id="gender" placeholder=""/>                      
                      <div className="clearfix"></div>
                     </Col>
                     <Col className="form-group col-md-3">
                     <label className="form-label">Gst<span style={{color: "red"}}>*</span></label>
                     <Input type="password" value={gst} onChange={onChangeGstNumber} className="form-control" id="gender" placeholder=""/>                      
                      <div className="clearfix"></div>
                     </Col>
                     </Row>
                     {/* <Row>
                        <Col className="form-group col-md-3">
                        <Input type="checkbox"  checked={localFood} onChange={localFoodHnadler}className="form-control" />Local Food                
                         <div className="clearfix"></div>
                        </Col>
                        </Row> */}
                     <Row>
                     <Col className="form-group col-md-12">
                     <h4>Documents Upload</h4>
                      <div className="clearfix"></div>
                     </Col>
                     </Row>

                  

                     <Row class="form-group row">
                     <label class="col-form-label col-sm-2 text-sm-right">Aadhar Card Upload </label>
                     <Col class="col-sm-10">
                     <Input onChange={onChangeAdharFile } type="file"  class="form-control" />
                     <div class="clearfix"></div>
                      </Col>
                      <div class="col-sm-2">
                        <a href={adharUrl}  id="a2" target="_blank" rel="noopener noreferrer">View</a>
                        </div>
                     </Row>

                     <Row class="form-group row">
                     <label class="col-form-label col-sm-2 text-sm-right">Pan/Voter </label>
                     <Col class="col-sm-10">
                     <Input onChange={ onChangePanFile} type="file" class="form-control" />
                     <div class="clearfix"></div>
                      </Col>
                      <div class="col-sm-2">
                        <a href={panUrl} target="_blank" rel="noopener noreferrer">View</a>
                        </div>
                     </Row>

                     <Row class="form-group row">
                     <label class="col-form-label col-sm-2 text-sm-right">Passbook/Bank Statement </label>
                     <Col class="col-sm-10">
                     <Input onChange={onChangePassBookFile } type="file"class="form-control" />
                     <div class="clearfix"></div>
                      </Col>
                      <div class="col-sm-2">
                        <a href={passbookUrl}   target="_blank" rel="noopener noreferrer">View</a>
                        </div>
                     </Row>

                     <Row class="form-group row">
                     <label class="col-form-label col-sm-2 text-sm-right">GST </label>
                     <Col class="col-sm-10">
                     <Input onChange={ onChangeGst} type="file"  class="form-control" />
                     <div class="clearfix"></div>
                      </Col>
                      <div class="col-sm-2">
                        <a href={gstUrl}  target="_blank" rel="noopener noreferrer">View</a>
                        </div>
                     </Row>

                    

                   
                     <Button type="submit" id="submit" onClick={onBackHandler}  className="warning">Back</Button>:
                    
                     <Button type="submit" id="update" onClick={onUpdateHandler} className="warning" >Update</Button>
                     

         </Col>
          </Row>:
          <Row>
          <Col sm="12">
          <CardHeader>
                      <h6> Working Partner Approvals</h6>
                      {/* <span> Use a class <code> table </code> to any table.</span> */}
                  </CardHeader>
          </Col>
      <div className="col-md-5" style={{margin: "1%"}}>
          <div className="form-group col-md-10">
               <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                   <input type="text" onChange={handleSearch} required=""  className="form-control"  placeholder="Search..."/>
                   <div className="clearfix"></div>
              </div>
          </div>
          <div className="col-md-6 text-right" style={{margin: "3%"}}>
      <div className="dt-buttons btn-group">       
      <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
      <ReactHTMLTableToExcel  
      className="btn btn-info"  
      table="datatable"  
      filename="WorkingPartnerList"  
      sheet="WorkingPartnerList"  
      buttonText="Excel" />
      <iframe
          id="iDatatable"
          src="/table/WorkingPartnerList-table"
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
                                  <th scop="col">Partner  ID	</th>
                                  <th scop="col"> Name	</th>
                                  <th scop="col" >MobileNumber </th>
                                  <th scop="col">Assigned  City	</th>
                                  <th scop="col">Commision	</th>
                                  <th scop="col">View Details</th>
                                  <th scop="col">Delete 	</th>

                              </tr>
                          </thead>
                          <tbody color="gray">
                          {recordsAfterPagingAndSorting().map((item,id)=>{
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
                                             <td>{item.Commision}</td>
                                             <td><button id={item.UserId} onClick={onSearchHandler} className="btn btn-primary">{"View Details"}</button></td>
                                             <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><button id={item.UserId} onChange={onDeleteHandler} type="button"  className="btn btn-danger btn-md">{"Delete"}</button></td>
                               
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
        
export default WorkingPartnerListTable;