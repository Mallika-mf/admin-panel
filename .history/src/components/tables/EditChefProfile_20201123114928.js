import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home, Trash, PlusCircle } from 'react-feather';
import { Container, Row, Col, Button, CardHeader, Table, Input } from "reactstrap";
// import {Check,Trash} from 'react-feather';
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import MyGoogleMap from '../MapImple/MyGoogleMap';

import EditMap from './EditMap';
import { css } from "@emotion/core";
// const mapStyles = {
//     width: '100%',
//     height: '100%'
//   };
const override = css`
  display: flex;
  margin: 0 auto; 
  border-color: red;
`;

const EditChefProfileDetail = (props) => {
 const [search,setSearch] = useState()
 const [name,setName] = useState()
 const [number,setNumber] = useState()
 const [email,setEmail] = useState()
 const [costForTwo,setCostForTwo] = useState()
 const [deliveryTime,setDeliveryTime] = useState()
 const [imageAsUrl,setImageAsUrl] = useState()
 const [openTime,setOpenTime] = useState()
 const [closeTime,setCloseTime] = useState()
 const [cuisine,setCuisine] = useState()
 const [foodCategory,setFoodCategory] = useState()
 const [showTable,setShowTable] = useState(false)
 const [cuisineName,setCuisineName] = useState([])
 const [cuisineList,setCuisineList] = useState([])
 const [foodType,setFoodType] = useState([])
 const [foodTypeList,setFoodTypeList] = useState([])
 const [selectFoodTypeId,setSelectFoodTypeId] = useState("")
 const [selectFoodTypeName,setSelectFoodTypeName] = useState([])
 const [selectCuisineName,setSelectCuisineName] = useState([])
 const [selectCuisineId,setSelectCuisineId] = useState("")
 const [location,setLocation] = useState([])
 const [cuisineTypeName,setCuisineTypeName] = useState("")
 const [foodTypeName,setFoodTypeName] = useState("")
 const [lat,setLat] = useState()
 const [long,setLong] = useState()

 useEffect(()=>{
    app.database().ref().child("Masters").child("Cuisines").once('value').then(function(snapshot){
        if(snapshot.exists){
            let cuisineContent = []
            snapshot.forEach(snap =>{
                let val = snap.val()
                let cuisineData={
                    Name: val.Name,
                    PushId: val.PushId
                }
                cuisineContent.push(cuisineData)
            })
            setCuisineName(cuisineContent)
        }
    })

    app.database().ref().child("Masters").child("FoodType").once('value').then(function(snapshot){
        if(snapshot.exists){
            let foodtypeContent = []
            snapshot.forEach(snap =>{
                let val = snap.val()
                let foodtypeData={
                    Name: val.Name,
                    PushId: val.PushId
                }
                foodtypeContent.push(foodtypeData)
            })
            setFoodType(foodtypeContent)
        }
    })
    if ("geolocation" in navigator) {
        console.log("Available");
      } else {
        console.log("Not Available");
      }
    
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     setLat(position.coords.latitude)
    //     setLong( position.coords.longitude)
    //     console.log("Latitude is :", position.coords.latitude);
    //     console.log("Longitude is :", position.coords.longitude);
    //   });
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log(position)
    //   },
    //   function(error) {
    //     console.error("Error Code = " + error.code + " - " + error.message);
    //   }
    // );
    
 },[])

 const onChangeSearchHandler = (event) =>{
     setSearch(event.target.value)
}

const onClickSearchHandler = event =>{
     app.database().ref().child("CloudKitchen").child(search)
     .once('value').then(function(snapshot){
         let val = snapshot.val()
         setName(val.Name)
         setNumber(val.MobileNumber)
         setEmail(val.Email)
         setDeliveryTime(val.DeliveryTime)
         setCostForTwo(val.CostTwo)
         setCloseTime(val.Close)
         setOpenTime(val.Open)
         if(val.CuisinesList!==undefined){
            setSelectCuisineId(val.CuisinesList)
         }else{
             setSelectCuisineId("")
         }
         if(val.FoodTypeList!==undefined){
            setSelectFoodTypeId(val.FoodTypeList)
         }else{
             setSelectFoodTypeId("")
         }

         app.database().ref().child("CloudKitchen").child(search).child("FoodType")
         .once('value').then(function(snapshot){
             if(snapshot.exists()){
                 let content = []
                 snapshot.forEach(snap=>{
                    content.push(snap.val())
                 })
                 setFoodTypeList(content)
             }
         })
         app.database().ref().child("CloudKitchen").child(search).child("Cuisines")
         .once('value').then(function(snapshot){
             if(snapshot.exists()){
                 let content = []
                 snapshot.forEach(snap=>{
                    content.push(snap.val())
                 })
                 setCuisineList(content)
                }
         })
         setImageAsUrl(val.PP)
         

     })
}
//  const onChangeName = (event) =>{
    
//  }

//  const onChangeNumber = (event) =>{
     
// }

// const onChangeEmail = (event) =>{
     
// }
const onChangeDeliveryTime = (event) =>{
     setDeliveryTime(event.target.value)
}

const onChangeCostForTow = (event) =>{
     setCostForTwo((event.target.value))
}

const onChangeCuisine = (event) =>{
     setCuisine(event.target.value)
     setShowTable(true)
     cuisineName.filter(item => {
        if (item.PushId === event.target.value) {
           setCuisineTypeName(item.Name)
           let locker = {
               PushId: event.target.value,
               Name : item.Name
             }
             
             // addonItem.add(locker)
             setCuisineList([...cuisineList, locker])
         }
         return item
       })
       let lockerId =   event.target.value
    
    setSelectCuisineId(lockerId)

}

const onClickCuisineDelete = (cuisineId) =>{
    const newCuisineData = cuisineList.filter((_, item) => {
        return (
          item !== cuisineId
        )
  
      })
      setCuisineList(newCuisineData)}

const onChangeFoodCategory = (event) =>{
     setFoodCategory(event.target.value)
     foodType.filter(item => {
     if (item.PushId === event.target.value) {
        setFoodTypeName(item.Name)
        let locker = {
            PushId: event.target.value,
            Name : item.Name
          }
          // addonItem.add(locker)
          setFoodTypeList([...foodTypeList, locker])
      }
      return item
    })
    let lockerId = event.target.value
    setSelectFoodTypeId(lockerId)
}

const onDeleteFoodType = (foodId) =>{
    const newFoodData = foodTypeList.filter((_, item) => {
        return (
          item !== foodId
        )
  
      })
      setFoodTypeList(newFoodData)
}

const onChangeOpenTime = (event) =>{
     setOpenTime(event.target.value)
}

const onChangeCloseTime = (event) =>{
     setCloseTime(event.target.value)
}

const onChangeLocation = (event) =>{
     setLocation(event.target.value)
}

const onChangeImage = (event) =>{
    const image = event.target.files[0]
    // setPassportImageAsFile(imageFile => (image))
    if (image === '') {
      console.error(`not an image, the image file is a ${typeof (image)}`)
    }
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
    };

    const uploadTask = storage.ref(`ChefImage/${name}`).put(image, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storage.ref("ChefImage/").child(name).getDownloadURL()
          .then(fireBaseUrl => {
            setImageAsUrl(fireBaseUrl)
            window.temp++
          })


      })

}

const onUpdateHandler = (event) =>{
//  console.log(props.latitude)
//  console.log(props.langnitude)
if(deliveryTime===""){
    alert("Enter Delivery Time")
    return
}
if(costForTwo===""){
    alert("Enter Cost For Two ")
    return
}
var firebaseref = app.database().ref().child("CloudKitchen").child(search)
firebaseref.child("CostTwo").set(costForTwo)
firebaseref.child("DeliveryTime").set(deliveryTime)
firebaseref.child("Close").set(closeTime)
firebaseref.child("Open").set(openTime)
firebaseref.child("PP").set(imageAsUrl)
for (var index = 0; index < cuisineList.length; index++) {
  

    firebaseref.child("Cuisines").child(cuisineList[index].PushId).child("Name").set(cuisineList[index].Name)
    firebaseref.child("Cuisines").child(cuisineList[index].PushId).child("PushId").set(cuisineList[index].PushId)

  }
  for (var foodIndex = 0; foodIndex < foodTypeList.length; foodIndex++) {
  

    firebaseref.child("FoodType").child(foodTypeList[foodIndex].PushId).child("Name").set(foodTypeList[foodIndex].Name)
    firebaseref.child("FoodType").child(foodTypeList[foodIndex].PushId).child("PushId").set(foodTypeList[foodIndex].PushId)

  }
  firebaseref.child("AStatus").set("InActive")
  // firebaseref.child("FoodTypeList").set(selectFoodTypeId)
  // firebaseref.child("CuisinesList").set(selectCuisineId)
  Swal.fire({
    title: "Successfully Updated!",
    icon: "success",
    confirmButtonText: "Ok"
  });
  setSearch("")
  setName("")
  setNumber("")
  setEmail("")
  setDeliveryTime("")
  setCloseTime("")
  setOpenTime("")
  setImageAsUrl("")
  setCostForTwo("")
  setCuisineList([])
  setCuisine("")
  setFoodTypeList([])
  setFoodCategory("")
  
}
const onMarkerClick =(event)=>{
 
}

const fetchPlaces =(mapProps, map) => {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    // ...
  }

  return (
    <Fragment>
      <BreadCrumb parent={<Home />} subparent="Food Management" title=" Edit Chef Profile Details " />
      <Container fluid={true}>
        <Row className="form-row" style={{ marginTop: "3%" }}>
          <Col className="form-group col-md-6">
            <label className="form-label">Enter Home Chef registration Number</label>
            <Row>
              <Col className="col-lg-6 col-md-5 col-sm-5">
                <Input type="text" value={search} onChange={onChangeSearchHandler} className="form-control" />
              </Col>
              <Col className="col-sm-1 col-md-2">
                <span id="search" onClick={onClickSearchHandler} ><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
              </Col>
            </Row>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <CardHeader>
              <h5>Edit Chef Details </h5>
              {/* <span> Use a className <code> table </code> to any table.</span> */}
            </CardHeader>
          </Col>

        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Name</label>
            <input value={name} disabled className="form-control"/>
            <div className="clearfix"></div>
          </Col>
        </Row>


        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Mobile Number <span style={{ color: "red" }}>*</span></label>
            <Input type="number" value={number} disabled  className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">EmailId <span style={{ color: "red" }}>*</span></label>
            <Input type="email" value={email} disabled  className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Delivery Time</label>
            <input type="number" value={deliveryTime} onChange={onChangeDeliveryTime} className="form-control"/>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Cost for Two</label>
            <input type="number"  value={costForTwo} onChange={onChangeCostForTow} className="form-control"/>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Cuisine</label>
            <select value={cuisine} onChange={onChangeCuisine} className="form-control">
              <option value="Select">Select</option>
              {cuisineName.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}
            </select>
            <div className="clearfix"></div>
          </Col>
          {/* {showTable===true? */}
          <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
          <Table>
            <thead>
              <tr>
                <th>cuisines Name</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {cuisineList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    {/* <td>{}</td> */}
                    <td><Trash style={{ color: "orange" }} onClick={() => {
                      onClickCuisineDelete(index);
                    }} size={15} /></td>

                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
        {/* <></>
          } */}
          
        </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Food Type</label>
            <select value={foodCategory} onChange={onChangeFoodCategory} className="form-control">
              <option value="Select">Select</option>
              {foodType.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}

            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
          <Table>
            <thead>
              <tr>
                <th>Food Category</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {foodTypeList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td><Trash id={index} onClick={() => {
                      onDeleteFoodType(index);
                    }} size={15} /></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Open Time <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={openTime} onChange={onChangeOpenTime} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">Close Time <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={closeTime} onChange={onChangeCloseTime} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>
        {/* <Row>
        <Col className="form-group col-md-3">
            <label className="form-label">Location <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={location} onChange={onChangeLocation} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row> */}
        <Row className="form-row">
          <Col className="form-group col-md-6">
            <label className="form-label">Chef Photo <span style={{ color: "red" }}>*</span></label>
            <Input type="file" onChange={onChangeImage} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <div className="col-sm-1">
            {imageAsUrl === "" ?
              <></> :
              <a href={imageAsUrl} target="_blank" rel="noopener noreferrer">View</a>}
          </div>
        </Row>
        <MyGoogleMap
             google={props.google}

        />

        {/* <EditMap

     google={props.google}
     center={{lat: 18.5204, lng: 73.8567}}
     height='300px'
     zoom={15}
     
    /> */}
        {/* <div style={{height:"100vh",width:"100vh"}}>
        <Map
          google={props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat:  22,
            lng: 77
          }}
    //       onReady={fetchPlaces}
    //   visible={false}
      >
        
         <Marker
          onClick={onMarkerClick}
          name={'This is test name'}
        />
        </Map>
      </div> */}


            <Button type="submit" style={{marginTop:"10%"}}onClick={onUpdateHandler} className="warning">Update</Button>

      </Container>
    </Fragment>
  );
};
export default EditChefProfileDetail
// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyBhYZ7B9Qf6DWiixOxZf2GYciJIrmbQHoA',


//   })(EditChefProfileDetail);

  