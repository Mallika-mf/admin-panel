import React,{Fragment} from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";

import BreadCrumb from '../../layout/Breadcrumb'
import { Home, Trash, PlusCircle } from 'react-feather';
import { Container, Row, Col, Button, CardHeader, Table, Input } from "reactstrap";
// import {Check,Trash} from 'react-feather';
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
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
// import EditChefProfile from './EditChefProfile'
Geocode.setApiKey("AIzaSyAo4tQpXz_kP166-72ugd5sc9b94l8LVzs");
Geocode.enableDebug();
class EditMap extends React.Component{
 state = {
   address: '',
   city: '',
   area: '',
   state: '',
   mapPosition: {
    lat: 18.5204,
    lng:  73.8567
   },
   markerPosition: {
    lat: 18.5204,
    lng:  73.8567
},
search:'',
name: '',
number: '',
email: '',
costForTwo:'',
deliveryTime:'',
imageAsUrl: '',
openTime: '',
closeTime: '',
cuisine: '',
foodCategory:'',
cuisineName:[],
cuisineList:[],
foodType: [],
foodTypeList: [],
selectCuisineId:'',
google :this.props.google,
     center:{lat: 18.5204, lng: 73.8567},
     zoom:15
  }
  // this.onChangeCuisine = this.onChangeCuisine.bind(this)
  // this.onChangeFoodCategory = this.onChangeFoodCategory.bind(this)
  // this.onChangeImage = this.onChangeImage.bind(this)
  // this.onChangeHandler = this.onChangeHandler.bind(this)
  // this.onClickCuisineDelete = this.onClickCuisineDelete.bind(this)
  // this.onClickSearchHandler = this.onClickSearchHandler.bind(this)
  // this.onUpdateHandler = this.onUpdateHandler.bind(this)


 
 
/**
  * Get the current address from the default map position and set those values in the state
  */
 componentDidMount() {
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
        console.log(cuisineContent)
        // this.setState({cuisineName:cuisineContent})
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
        // this.setState({foodType:foodtypeContent})
    }
})
if ("geolocation" in navigator) {
    console.log("Available");
  } else {
    console.log("Not Available");
  }
   
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );

     
   //  console.log( 'city', city, area, state );
   
    this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : '',

    } )
    
   },
   error => {
    console.error(error);
   }
  );
  
 };
// /**
//   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
//   *
//   * @param nextProps
//   * @param nextState
//   * @return {boolean}
//   */
 shouldComponentUpdate( nextProps, nextState ){
  if (
   this.state.markerPosition.lat !== this.state.center.lat ||
   this.state.address !== nextState.address ||
   this.state.city !== nextState.city ||
   this.state.area !== nextState.area ||
   this.state.state !== nextState.state
  ) {
   return true
  } else if ( this.state.center.lat === nextState.center.lat ){
   return false
  }
 }
// /**
//   * Get the city and set the city input value to the one selected
//   *
//   * @param addressArray
//   * @return {string}
//   */
 getCity = ( addressArray ) => {
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
 getArea = ( addressArray ) => {
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
 getState = ( addressArray ) => {
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
 onChangeHandler = ( event ) => {
  this.setState({ [event.target.name]: event.target.value });
 };
// /**
//   * This Event triggers when the marker window is closed
//   *
//   * @param event
//   */
 onInfoWindowClose = ( event ) => {
};
// /**
//   * When the user types an address in the search box
//   * @param place
//   */
 onPlaceSelected = ( place ) => {
const address = place.formatted_address,
   addressArray =  place.address_components,
   city = this.getCity( addressArray ),
   area = this.getArea( addressArray ),
   state = this.getState( addressArray ),
   latValue = place.geometry.location.lat(),
   lngValue = place.geometry.location.lng();
// Set these values in the state.
  this.setState({
   address: ( address ) ? address : '',
   area: ( area ) ? area : '',
   city: ( city ) ? city : '',
   state: ( state ) ? state : '',
   markerPosition: {
    lat: latValue,
    lng: lngValue
   },
   mapPosition: {
    lat: latValue,
    lng: lngValue
   },
  })
//   console.log(this.state.mapPosition.lat)
//   console.log(this.state.mapPosition.lng)
 };
// /**
//   * When the marker is dragged you get the lat and long using the functions available from event object.
//   * Use geocode to get the address, city, area and state from the lat and lng positions.
//   * And then set those values in the state.
//   *
//   * @param event
//   */
 onMarkerDragEnd = ( event ) => {
//   console.log( 'event', event );
  let newLat = event.latLng.lat(),
   newLng = event.latLng.lng(),
  
   addressArray = [];
Geocode.fromLatLng( newLat , newLng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );
this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : ''
    } )
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
  onChangeSearchHandler = (event) =>{
  this.setState({search:event.target.value})
}

  onClickSearchHandler = event =>{
  app.database().ref().child("CloudKitchen").child(this.state.search)
  .once('value').then(function(snapshot){
      let val = snapshot.val()
      this.setState({
        name:val.Name,
        snumber:val.MobileNumber,
        email:val.Email,
        deliveryTime:val.DeliveryTime,
        costForTwo:val.CostTwo,
        closeTime:val.Close,
        openTime:val.Open,
      })

      if(val.CuisinesList!==undefined){
         this.setState({selectCuisineId: val.CuisinesList})
      }else{
        this.setState({selectCuisineId:''})
      }
      if(val.FoodTypeList!==undefined){
        this.setState({selectFoodTypeId: val.FoodTypeList})

      }else{
        this.setState({selectFoodTypeId: ""})
      }

      app.database().ref().child("CloudKitchen").child(this.state.search).child("FoodType")
      .once('value').then(function(snapshot){
          if(snapshot.exists()){
              let content = []
              snapshot.forEach(snap=>{
                 content.push(snap.val())
              })
              this.setState({foodTypeList:content})
          }
      })
      app.database().ref().child("CloudKitchen").child(this.state.search).child("Cuisines")
      .once('value').then(function(snapshot){
          if(snapshot.exists()){
              let content = []
              snapshot.forEach(snap=>{
                 content.push(snap.val())
              })
              this.setState({cuisineList:content})

             }
      })
      if(val.PP!==undefined && val.PP!==""){
      this.setState({imageAsUrl:val.PP})
      }
      

  })
}

 onChangeCuisine = (event) =>{
  this.setState({cuisine:event.target.value})
  this.setState({showTable:true})
  this.state.cuisineName.filter(item => {
     if (item.PushId === event.target.value) {
       this.setState({cuisineTypeName: item.Name})
        let locker = {
            PushId: event.target.value,
            Name : item.Name
          }
          
          // addonItem.add(locker)
          this.setState({cuisineList:[...this.state.cuisineList, locker]})
      }
      return item
    })
    let lockerId =   event.target.value
 this.setState({selectCuisineId:lockerId})

}

onClickCuisineDelete = (cuisineId) =>{
  const newCuisineData = this.state.cuisineList.filter((_, item) => {
      return (
        item !== cuisineId
      )

    })
    this.setState({cuisineList:newCuisineData})
  }

onChangeFoodCategory = (event) =>{
  this.setState({foodCategory:event.target.value})
   this.state.foodType.filter(item => {
   if (item.PushId === event.target.value) {
     this.setState({foodTypeName:item.Name})
      let locker = {
          PushId: event.target.value,
          Name : item.Name
        }
        // addonItem.add(locker)
        this.setState({foodTypeList: [...this.statefoodTypeList, locker]})
    }
    return item
  })
  let lockerId = event.target.value
  this.setState({selectFoodTypeId:lockerId})
}

onDeleteFoodType = (foodId) =>{
  const newFoodData = this.state.foodTypeList.filter((_, item) => {
      return (
        item !== foodId
      )

    })
    this.setState({foodTypeList: newFoodData})
}

 onChangeImage = (event) =>{
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
          this.setState({imageAsUrl:fireBaseUrl})
          window.temp++
        })


    })

}

onUpdateHandler = (event) =>{
  //  console.log(props.latitude)
  //  console.log(props.langnitude)
  if(this.state.deliveryTime===""){
      alert("Enter Delivery Time")
      return
  }
  if(this.state.costForTwo===""){
      alert("Enter Cost For Two ")
      return
  }
  var firebaseref = app.database().ref().child("CloudKitchen").child(this.state.search)
  firebaseref.child("CostTwo").set(this.state.costForTwo)
  firebaseref.child("DeliveryTime").set(this.state.deliveryTime)
  firebaseref.child("Close").set(this.state.closeTime)
  firebaseref.child("Open").set(this.state.openTime)
  if(this.state.imageAsUrl!=="" && this.state.imageAsUrl!==undefined){
  firebaseref.child("PP").set(this.state.imageAsUrl)
  }
  for (var index = 0; index < this.state.cuisineList.length; index++) {
    
  
      firebaseref.child("Cuisines").child(this.state.cuisineList[index].PushId).child("Name").set(this.state.cuisineList[index].Name)
      firebaseref.child("Cuisines").child(this.state.cuisineList[index].PushId).child("PushId").set(this.state.cuisineList[index].PushId)
  
    }
    for (var foodIndex = 0; foodIndex < this.state.foodTypeList.length; foodIndex++) {
    
  
      firebaseref.child("FoodType").child(this.state.foodTypeList[foodIndex].PushId).child("Name").set(this.state.foodTypeList[foodIndex].Name)
      firebaseref.child("FoodType").child(this.state.foodTypeList[foodIndex].PushId).child("PushId").set(this.state.foodTypeList[foodIndex].PushId)
  
    }
    firebaseref.child("AStatus").set("InActive")
    // firebaseref.child("FoodTypeList").set(selectFoodTypeId)
    // firebaseref.child("CuisinesList").set(selectCuisineId)
    Swal.fire({
      title: "Successfully Updated!",
      icon: "success",
      confirmButtonText: "Ok"
    });
    this.setState({
      search:'',
name: '',
number: '',
email: '',
costForTwo:'',
deliveryTime:'',
imageAsUrl: '',
openTime: '',
closeTime: '',
cuisine: '',
foodCategory:'',
cuisineList:[],
foodTypeList: [],
    })
 }


render(){
      const { cuisineName = [] } = this.props;

const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
     <GoogleMap google={this.state.google}
      defaultZoom={this.state.zoom}
      defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
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
       onPlaceSelected={ this.onPlaceSelected }
       types={['(regions)']}
      />
{/*Marker*/}
      <Marker google={this.state.google}
       name={'Dolores park'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
      />
      <Marker />
{/* InfoWindow on top of marker */}
      <InfoWindow
       onClose={this.onInfoWindowClose}
       position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
      >
       <div>
        <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
       </div>
      </InfoWindow>
</GoogleMap>
)
   )
  );
let map;
  if( this.state.center.lat !== undefined ) {
   map = <div>
     <div>
      <div className="form-group">
       <label htmlFor="">City</label>
       <input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.city }/>
      </div>
      <div className="form-group">
       <label htmlFor="">Area</label>
       <input type="text" name="area" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.area }/>
      </div>
      <div className="form-group">
       <label htmlFor="">State</label>
       <input type="text" name="state" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state }/>
      </div>
      <div className="form-group">
       <label htmlFor="">Address</label>
       <input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
      </div>
     </div>
     <AsyncMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAo4tQpXz_kP166-72ugd5sc9b94l8LVzs&libraries=places"
      loadingElement={
       <div style={{ height: `100%` }} />
      }
      containerElement={
       <div style={{ height: "300px" }} />
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
  if(this.state.search===undefined)return null;
  return( 
    <Fragment>
      <BreadCrumb parent={<Home />} subparent="Food Management" title=" Edit Chef Profile Details " />
      <Container fluid={true}>
        <Row className="form-row" style={{ marginTop: "3%" }}>
          <Col className="form-group col-md-6">
            <label className="form-label">Enter Home Chef registration Number</label>
            <Row>
              <Col className="col-lg-6 col-md-5 col-sm-5">
                <Input type="text" name="search" value={this.state.search} onChange={this.onChangeSearchHandler} className="form-control" />
              </Col>
              <Col className="col-sm-1 col-md-2">
                <span id="search" onClick={this.onClickSearchHandler} ><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
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
            <input value={this.state.name} disabled className="form-control"/>
            <div className="clearfix"></div>
          </Col>
        </Row>


        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Mobile Number <span style={{ color: "red" }}>*</span></label>
            <Input type="number" value={this.state.number} disabled  className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">EmailId <span style={{ color: "red" }}>*</span></label>
            <Input type="email" value={this.state.email} disabled  className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Delivery Time</label>
            <input type="number" value={this.state.deliveryTime} onChange={this.onChangeHandler} className="form-control"/>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Cost for Two</label>
            <input type="number"  value={this.state.costForTwo} onChange={this.onChangeHandler} className="form-control"/>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Cuisine</label>
            <select value={this.state.cuisine} onChange={this.onChangeCuisine} className="form-control">
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
              {this.state.cuisineList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    {/* <td>{}</td> */}
                    <td><Trash style={{ color: "orange" }} onClick={() => {
                      this.onClickCuisineDelete(index);
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
            <select value={this.state.foodCategory} onChange={this.onChangeFoodCategory} className="form-control">
              <option value="Select">Select</option>
              {this.state.foodType.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}

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
              {this.state.foodTypeList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td><Trash id={index} onClick={() => {
                      this.onDeleteFoodType(index);
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
            <Input type="time" value={this.state.openTime} onChange={this.onChangeHandler} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">Close Time <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={this.state.closeTime} onChange={this.onChangeHandler} className="form-control" />
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
            <Input type="file" onChange={this.onChangeImage} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <div className="col-sm-1">
            {this.state.imageAsUrl === "" ?
              <></> :
              <a href={this.state.imageAsUrl} target="_blank" rel="noopener noreferrer">View</a>}
          </div>
        </Row>
        {/* <MyGoogleMap

        /> */}

   
    {map}
 


            <Button type="submit" style={{marginTop:"10%"}}onClick={this.onUpdateHandler} className="warning">Update</Button>

      </Container>
    </Fragment>
     )
 }
}
export default EditMap