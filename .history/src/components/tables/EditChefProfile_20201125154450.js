import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home, Trash, PlusCircle } from 'react-feather';
import { Container, Row, Col, Button, CardHeader, Table, Input } from "reactstrap";
// import {Check,Trash} from 'react-feather';
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import EditMap from './EditMap';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
// import EditChefProfile from './EditChefProfile'

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
Geocode.setApiKey("AIzaSyAo4tQpXz_kP166-72ugd5sc9b94l8LVzs");
Geocode.enableDebug();

const EditChefProfileDetail = (props) => {
 const [search,setSearch] = useState("")
 const [name,setName] = useState("")
 const [number,setNumber] = useState("")
 const [email,setEmail] = useState("")
 const [costForTwo,setCostForTwo] = useState("")
 const [deliveryTime,setDeliveryTime] = useState("")
 const [imageAsUrl,setImageAsUrl] = useState("")
 const [openTime,setOpenTime] = useState("")
 const [closeTime,setCloseTime] = useState("")
 const [cuisine,setCuisine] = useState("")
 const [foodCategory,setFoodCategory] = useState("")
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
//  const [state,setState] = useState({
//   address: '',
//   city: '',
//   area: '',
//   state: '',
//   mapPosition: {
//    lat: 18.5204,
//    lng: 73.8567
//   },
//   markerPosition: {
//     lat: 18.5204,
//     lng: 73.8567
// },
// center:{
//   lat: 18.5204,
//   lng: 73.8567
// },
// size: 15,
// google: props.google
//  })
const [address,setAddress] = useState("")
 const [city,setCity] = useState("")
 const [area,setArea] = useState("")
 const [state,setState] = useState("")
 const [mapPosition,setMapPosition] = useState({
  lat: 18.5204,
    lng: 73.8567
})
 const [markerPosition,setMarkerPosition] = useState({
  lat: 18.5204,
    lng: 73.8567
 })
 const [center,setCenter] = useState({
  lat: 18.5204,
  lng: 73.8567
 })
 const [zoom,setZoom] = useState(15)
 const [google,setGoogle] = useState(props.google)

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
    
      Geocode.fromLatLng( mapPosition.lat , mapPosition.lng ).then(
        response => {
         const address = response.results[0].formatted_address,
          addressArray =  response.results[0].address_components,
          city = getCity( addressArray ),
          area = getArea( addressArray ),
          state = getState( addressArray );

         
            setAddress(( address ) ? address : '')
            setArea(( area ) ? area : '')
            setCity(( city ) ? city : '')
            setState(( state ) ? state : '')
   
          },
          error => {
           console.error(error);
          }
         );
    
 },[])
//  const Modal = React.memo(
//   useEffect((nextState,nextProps)=>{

//     if (
//       state.markerPosition.lat !== state.center.lat ||
//       state.address !== nextState.address ||
//       state.city !== nextState.city ||
//       state.area !== nextState.area ||
//       state.state !== nextState.state
//      ) {
//       return true
//      } else if ( state.center.lat === nextState.center.lat ){
//       return false
//      }
    
//   },[])
//  )

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
         if(val.PP!==undefined&& val.PP!==""){
          setImageAsUrl(val.PP)

         }
         

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
  firebaseref.child("FoodTypeList").set(selectFoodTypeId)
  firebaseref.child("CuisinesList").set(selectCuisineId)
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


// /**
//   * Get the city and set the city input value to the one selected
//   *
//   * @param addressArray
//   * @return {string}
//   */
const getCity = ( addressArray ) => {
  let city = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
   }
  }
 };
// /**
//   * Get the area and set the area input value to the one selected
//   *
//   * @param addressArray
//   * @return {string}
//   */
const getArea = ( addressArray ) => {
  let area = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0]  ) {
    for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
     if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
      area = addressArray[ i ].long_name;
      return area;
     }
    }
   }
  }
 };
// /**
//   * Get the address and set the address input value to the one selected
//   *
//   * @param addressArray
//   * @return {string}
//   */
 const getState = ( addressArray ) => {
  let state = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   for( let i = 0; i < addressArray.length; i++ ) {
    if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
     state = addressArray[ i ].long_name;
     return state;
    }
   }
  }
 };
// /**
//   * And function for city,state and address input
//   * @param event
//   */
 const onChangeAddress = ( event ) => {
   setAddress(event.target.value)
 };

 const onChangeState = ( event ) => {
  setState(event.target.value)
}

const onChangeCity = ( event ) => {
  setCity(event.target.value)
}

const onChangeArea = ( event ) => {
  setArea(event.target.value)
}


// /**
//   * This Event triggers when the marker window is closed
//   *
//   * @param event
//   */
const onInfoWindowClose = ( event ) => {
};
// /**
//   * When the user types an address in the search box
//   * @param place
//   */
const onPlaceSelected = ( place ) => {
  const address = place.formatted_address,
     addressArray =  place.address_components,
     city = getCity( addressArray ),
     area = getArea( addressArray ),
     state = getState( addressArray ),
     latValue = place.geometry.location.lat(),
     lngValue = place.geometry.location.lng();
  // Set these values in the state.
  setAddress(( address ) ? address : '')
  setArea(( area ) ? area : '')
  setCity(( city ) ? city : '')
  setState(( state ) ? state : '')
     setMarkerPosition({
      lat: latValue,
      lng: lngValue
     })
     setMapPosition({
      lat: latValue,
      lng: lngValue
     })
    
  //   console.log(this.state.mapPosition.lat)
  //   console.log(this.state.mapPosition.lng)
    }
// /**
//   * When the marker is dragged you get the lat and long using the functions available from event object.
//   * Use geocode to get the address, city, area and state from the lat and lng positions.
//   * And then set those values in the state.
//   *
//   * @param event
//   */
const onMarkerDragEnd = ( event ) => {
//   console.log( 'event', event );
  let newLat = event.latLng.lat(),
   newLng = event.latLng.lng(),
  
   addressArray = [];
Geocode.fromLatLng( newLat , newLng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city =getCity( addressArray ),
     area = getArea( addressArray ),
     state =getState( addressArray );
     setAddress(( address ) ? address : '')
     setArea(( area ) ? area : '')
     setCity(( city ) ? city : '')
     setState(( state ) ? state : '')
    sessionStorage.setItem("lat",newLat);
    sessionStorage.setItem("lnd",newLng);
   //  console.log(newLat)
   //  console.log(newLng)
   //  console.log(addressArray)

   },
   error => {
    console.error(error);
   }
  );
 };

 const AsyncMap = withScriptjs(
  withGoogleMap(
    <GoogleMap google={google}
     defaultZoom={zoom}
     defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
    >
     {/* For Auto complete Search Box */}
     <Autocomplete
      style={{
       width: '100%',
       height: '40px',
       paddingLeft: '16px',
       marginTop: '2px',
       marginBottom: '100px'
      }}
      onPlaceSelected={ onPlaceSelected }
      types={['(regions)']}
     />
{/*Marker*/}
     <Marker google={google}
      name={'Dolores park'}
         draggable={true}
         onDragEnd={ onMarkerDragEnd }
            position={{ lat: markerPosition.lat, lng:markerPosition.lng }}
     />
     <Marker />
{/* InfoWindow on top of marker */}
     <InfoWindow
      onClose={onInfoWindowClose}
      position={{ lat: ( markerPosition.lat + 0.0018 ), lng: markerPosition.lng }}
     >
      <div>
       <span style={{ padding: 0, margin: 0 }}>{ address }</span>
      </div>
     </InfoWindow>
</GoogleMap>

  )
 );
let map;
 if( center.lat !== undefined ) {
  map = <div>
    <div>
     <div className="form-group">
      <label htmlFor="">City</label>
      <input type="text" name="city" className="form-control" onChange={ onChangeCity } readOnly="readOnly" value={ city }/>
     </div>
     <div className="form-group">
      <label htmlFor="">Area</label>
      <input type="text" name="area" className="form-control" onChange={ onChangeArea } readOnly="readOnly" value={ area }/>
     </div>
     <div className="form-group">
      <label htmlFor="">State</label>
      <input type="text" name="state" className="form-control" onChange={ onChangeState } readOnly="readOnly" value={state }/>
     </div>
     <div className="form-group">
      <label htmlFor="">Address</label>
      <input type="text" name="address" className="form-control" onChange={onChangeAddress } readOnly="readOnly" value={ address }/>
     </div>
    </div>
    <AsyncMap
     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAo4tQpXz_kP166-72ugd5sc9b94l8LVzs&libraries=places"
     loadingElement={
      <div style={{ height: `100%` }} />
     }
     containerElement={
      <div style={{ height:"300px" }} />
     }
     mapElement={
      <div style={{ height: `100%` }} />
     }
    />
    {/* <EditChefProfile latitude = {this.state.mapPosition.lat}
    longnitude = {this.state.mapPosition.lng} /> */}
   </div>
} else {
  map = <div style={{height: "300px"}} />
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
        <Row className="form-row">{console.log(state.center.lat)}
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
        <EditMap

     google={state.google}
     center={{lat: 18.5204, lng: 73.8567}}
     height='300px'
     zoom={15}
     
    />
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
      {map}


            <Button type="submit" style={{marginTop:"10%"}}onClick={onUpdateHandler} className="warning">Update</Button>

      </Container>
    </Fragment>
  );
};
export default EditChefProfileDetail
// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyBhYZ7B9Qf6DWiixOxZf2GYciJIrmbQHoA',


//   })(EditChefProfileDetail);

  