import React, {useState,Fragment, useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, CardFooter,input } from 'reactstrap'
import { PrintContextConsumer } from 'react-to-print';
import { min, max } from 'lodash';
import app from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const AddCity = () => {
  const [state,setState]= useState({
    scity:"",
    name:"",
    commision:"",
    radius:"",
    subscription:"",
    delivery:"",
    packing:"",
    base:"",
    price:"",
    price1:"",
    mfcash:"",
    minimum:"",
    maximum:"",
    status:"",
    pushId:"",
    
  })
const [city,setCity] = useState([])
const [show, setShow] = useState(false)

  useEffect((props)=>{
    async function fetchMyAPI() {
    var pushid=[]
    var name=[]
  var firebaseref1=await app.database().ref().child("Masters").child("City");
    return firebaseref1.once('value').then(function(snapshot) {
      if(snapshot.exists()){
        // $('#datatable').empty();
        var content = [];
        
        snapshot.forEach(data=>{
            content.push(data.val());
            pushid.push(data.val().PushId);
             
          });
          setCity(content);
         
         
        }
          

        }); 
      
      }
      fetchMyAPI()
},[app])





   const onChangeHandler = (event) =>{
    
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
 
 
  }
  const onChangeCityHandler=(event)=>{
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
    
    // console.log(event.target.value)
  app.database().ref().child("Masters").child("City").child(event.target.value)
  .once('value').then(function(snapshot) {
    
          if(snapshot.exists()){
           setState({
           name : snapshot.val().Name,
           pushId: snapshot.val().PushId,
          commision :snapshot.val().Commision,
          radius: snapshot.val().Radius,
         subscription : snapshot.val().Subscription,
           delivery : snapshot.val().DeliveryCharges,
           packing : snapshot.val().PackingCharges,
           base : snapshot.val().Base,
           price :snapshot.val().Price,
           price1 : snapshot.val().Price1,
           mfcash : snapshot.val().MFCash,
           minimum : snapshot.val().Min,
           maximum: snapshot.val().Max,
           status: snapshot.val().Status
            })
            // document.getElementById("submitbtn").style.visibility="hidden"; 
            // document.getElementById("updatebtn").style.visibility="visible";
          }
  })
  setShow(true)

  }

  const updateHandler = ()=>{
    try{
      setShow(false)
      // event.preventDefault()
    

    
    
    if(state.scity=="Select"){
      alert("Selete City");
      // city.focus();
      return;
  }

  if(state.name==""){
    alert('Enter City Name');
    // state.name.focus();
    return;
}

if(state.commision==""){
   alert('Enter Commision Percentage');
  //  state.commision.focus();
   return;
}

if(state.radius==""){
   alert('Enter Radius');
  //  state.radius.focus();
   return;
}

if(state.subscription==""){
   alert('Enter Subscription');
  //  state.subscription.focus();
   return;
}

if(state.delivery==""){
   alert('Enter Delivery Charges');
  //  state.delivery.focus();
   return;
}

if(state.packing==""){
   alert('Enter Packing Charges ');
  //  state.packing.focus();
   return;
}

if(state.price==""){
   alert('Enter Delivery Base');
  //  state.base.focus();
   return;
}

if(state.base==""){
   alert('Enter Delivery Base Km ');
  //  state.price.focus();
   return;
}

if(state.price1==""){
   alert('Enter Delivery Extra Price per Km ');
  //  state.price1.focus();
   return;
}

if(state.mfcash==""){
   alert('Enter MF Cash Utilisation ');
  //  state.mfcash.focus();
   return;
}

if(state.minimum==""){
   alert('Enter Minimum Scratch Card Amount ');
  //  state.minimum.focus();
   return;
}

if(state.maximum==""){
   alert('Enter Maximum Scratch Card Amount ');
  //  state.maximum.focus();
   return;
}


 var firebaseref=app.database().ref().child("Masters").child("City").child(state.pushId)

 firebaseref.child("Name").set(String(state.name));
 firebaseref.child("Commision").set(String(state.commision));
 firebaseref.child("Radius").set(String(state.radius));
 firebaseref.child("Subscription").set(String(state.subscription));
 firebaseref.child("DeliveryCharges").set(String(state.delivery));
 firebaseref.child("PackingCharges").set(String(state.packing));
 firebaseref.child("Base").set(String(state.base));
 firebaseref.child("Price").set(String(state.price));
 firebaseref.child("Price1").set(String(state.price1));
 firebaseref.child("MFCash").set(String(state.mfcash));
 firebaseref.child("Min").set(String(state.minimum));
 firebaseref.child("Max").set(String(state.maximum));
 firebaseref.child("PushId").set(firebaseref.getKey());
 firebaseref.child("Status").set(state.status);
 
      state.scity="";
      state.name="";
      state.commision="";
      state.radius="";
      state.subscription="";
      state.delivery="";
      state.packing="";
      state.base="";
      state.price="";
      state.price1="";
      state.mfcash="";
      state. minimum="";
      state.maximum="";
      state.status=""
      Swal.fire("Good job!", "You have successfully updated the city!", "success");
      // document.getElementById("submitbtn").style.visibility="visible"; 
      // document.getElementById("updatebtn").style.visibility="hidden";
}catch(err){
  console.log(err)
}
}

//   const onChangeCityHandler = (event) =>{
  
// }
  const onSubmit =(event)=>{
     event.preventDefault()
     setShow(false)
     if(state.name.length==0){
      alert('Enter City Name');
      // state.name.focus();
      return;
  }

  if(state.commision.length==0){
     alert('Enter Commision Percentage');
    //  state.commision.focus();
     return;
 }
 
 if(state.radius.length==0){
     alert('Enter Radius');
    //  state.radius.focus();
     return;
 }

 if(state.subscription.length==0){
     alert('Enter Subscription');
    //  state.subscription.focus();
     return;
 }

 if(state.delivery.length==0){
     alert('Enter Delivery Charges');
    //  state.delivery.focus();
     return;
 }

 if(state.packing.length==0){
     alert('Enter Packing Charges ');
    //  state.packing.focus();
     return;
 }

 if(state.base.length==0){
     alert('Enter Delivery Base');
    //  state.base.focus();
     return;
 }

 if(state.price.length==0){
     alert('Enter Delivery Base Km ');
    //  state.price.focus();
     return;
 }

 if(state.price1.length==0){
     alert('Enter Delivery Extra Price per Km ');
    //  state.price1.focus();
     return;
 }

 if(state.mfcash.length==0){
     alert('Enter MF Cash Utilisation ');
    //  state.mfcash.focus();
     return;
 }

 if(state.minimum.length==0){
     alert('Enter Minimum Scratch Card Amount ');
    //  state.minimum.focus();
     return;
 }

 if(state.maximum.length==0){
     alert('Enter Maximum Scratch Card Amount ');
    //  state.maximum.focus();
     return;
 }
 var firebaseref=app.database().ref().child("Masters").child("City").push();
 firebaseref.child("Name").set(String(state.name));
 firebaseref.child("Commision").set(String(state.commision));
 firebaseref.child("Radius").set(String(state.radius));
 firebaseref.child("Subscription").set(String(state.subscription));
 firebaseref.child("DeliveryCharges").set(String(state.delivery));
 firebaseref.child("PackingCharges").set(String(state.packing));
 firebaseref.child("Base").set(String(state.base));
 firebaseref.child("Price").set(String(state.price));
 firebaseref.child("Price1").set(String(state.price1));
 firebaseref.child("MFCash").set(String(state.mfcash));
 firebaseref.child("Min").set(String(state.minimum));
 firebaseref.child("Max").set(String(state.maximum));
 firebaseref.child("PushId").set(firebaseref.getKey());
 firebaseref.child("Status").set(state.status);
   
// setSearchTerm(event.tastate.rget)
            state.name="";
            state.commision="";
            state.radius="";
            state.subscription="";
            state.delivery="";
            state.packing="";
            state.base="";
            state.price="";
            state.price1="";
            state.mfcash="";
            state. minimum="";
            state.maximum="";
            state.status=""

        
    
    
             Swal.fire("Good job!", "You have successfully added the city!", "success");
            }

  
    return (
      
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="City Management" title="Add City"/> 
        <Container fluid={true}>
        <Row>
            <Col className="col-xl-12">
            <Card>
                <CardHeader>
                    <h6>Create PromoCode</h6>
                </CardHeader>
                <CardBody>
                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Select City</label>
                <div className="col-sm-8">
                <select className="form-control" id="scity" name="scity" value={state.scity} onChange={ onChangeCityHandler}>
                  
                 <option value="Select">Select</option>
                 {city.map((item,id)=>{
                   return(<option key={id} value={item.PushId}>{item.Name}</option> )})}
                 </select>                
                 <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row" >
                <label className="col-form-label col-sm-2 text-sm-right">Enter City Name <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="text" className="form-control" name="name"  placeholder="City Name" value={state.name} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>
               
                <input type="text" className="form-control" name="pushId"  placeholder="push Id" value={state.pushId} onChange={onChangeHandler} style={{display:"none"}}/>
                

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Vendor Commision (in %) <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="number" className="form-control" name="commision" placeholder="Vendor Commison" value={state.commision} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>


                <Row className="form-group row">
                 <label className="col-form-label col-sm-2 text-sm-right">Radius<span style={{color: "red"}}>*</span></label>
                 <div className="col-sm-8">
                <input type="number" className="form-control" name="radius" placeholder="Enter Radius" value={state.radius} onChange={onChangeHandler}/>
                 <div className="clearfix"></div>
                </div>
                </Row>
                

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Subscription Radius<span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="email" className="form-control" name="subscription" placeholder="Enter Subscription Radius" value={state.subscription} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Delivery Charges (User) <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="number" className="form-control" name="delivery" placeholder="Delivery Charges" value={state.delivery} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Packing Charges (User) <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="number" className="form-control" name="packing" placeholder="Packing Charges" value={state.packing} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Delivery Base Price  <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="number" className="form-control" name="base" placeholder="Delivery Base Price" value={state.price} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Delivery Base KM <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="number" className="form-control" name="price" placeholder="Delivery Base KM" value={state.base} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Delivery Extra Price Per KM <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="number" className="form-control" name="price1" placeholder="Delivery Extra Price Per KM" value={state.price1} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">MF Cash Utilisation <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="number" className="form-control" name="mfcash" placeholder="Enter In Percentage" value={state.mfcash} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Scratch Card Min Amount <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="number" className="form-control" name="minimum" placeholder="Enter Amount" value={state.minimum} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Scratch Card Max Amount <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-8">
                <input type="number" className="form-control" name="maximum" placeholder="Enter Amount" value={state.maximum} onChange={onChangeHandler}/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Select Status</label>
                <div className="col-sm-10">
                 <select name="status" className="form-control" value={state.status} onChange={onChangeHandler}>
                 <option value="Active">Active</option>
                 <option value="InActive">InActive</option>
                </select>
                <div className="clearfix"></div>
                </div>
                 </Row>

                <Row className="form-group row">
               <div className="col-sm-10 ml-sm-auto">
                 {show==true?<Button type="submit" id="updatebtn" onClick={updateHandler} color="warning">Update</Button>:<Button type="submit" id="submitbtn" onClick={(event) => onSubmit(event)} color="warning">Submit</Button>

}

            </div>
            </Row>
              </CardBody>
            </Card>
            </Col>
        </Row>
        </Container>
        </Fragment>
    )}
    export default AddCity