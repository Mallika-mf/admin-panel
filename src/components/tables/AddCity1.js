import React, { useState, Fragment, useEffect } from "react";
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, CardFooter,input } from 'reactstrap'
import { PrintContextConsumer } from 'react-to-print';
import { min, max } from 'lodash';
import app from '../../data/base'

const AddCity1 = () => {
  const [state, setState] = useState({
    scity: "",
    name: "",
    commision: "",
    radius: "",
    subscription: "",
    delivery: "",
    packing: "",
    base: "",
    price: "",
    price1: "",
    mfcash: "",
    minimum: "",
    maximum: "",
    status: "",
    pushId: []
  });
  const [city, setCity] = useState([]);
  const [cityId, setCityId] = useState("");

  useEffect(() => {
    var pushid = [];
    var name = [];
    var firebaseref1=app.database().ref().child("Masters").child("City");
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
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onChangeCityHandler = (event) => {
    // setState({ scity: event.target.value });

    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    // app.database().ref().child("Masters").child("City").child(event.target.value)
    // .once('value').then(function(snapshot) {

    //         if(snapshot.exists()){
    //          setState({
    //          name : snapshot.val().Name,
    //          pushId: snapshot.val().PushId,
    //         commision :snapshot.val().Commision,
    //         radius: snapshot.val().Radius,
    //        subscription : snapshot.val().Subscription,
    //          delivery : snapshot.val().DeliveryCharges,
    //          packing : snapshot.val().PackingCharges,
    //          base : snapshot.val().Base,
    //          price :snapshot.val().Price,
    //          price1 : snapshot.val().Price1,
    //          mfcash : snapshot.val().MFCash,
    //          minimum : snapshot.val().Min,
    //          maximum: snapshot.val().Max,
    //          status: snapshot.val().Status
    //           })
    // document.getElementById("submitbtn").style.visibility = "hidden";
    // document.getElementById("updatebtn").style.visibility = "visible";
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (state.name.length == 0) {
      alert("Enter City Name");
      // state.name.focus();
      return;
    }

    if (state.commision.length == 0) {
      alert("Enter Commision Percentage");
      //  state.commision.focus();
      return;
    }

    if (state.radius.length == 0) {
      alert("Enter Radius");
      //  state.radius.focus();
      return;
    }

    if (state.subscription.length == 0) {
      alert("Enter Subscription");
      //  state.subscription.focus();
      return;
    }

    if (state.delivery.length == 0) {
      alert("Enter Delivery Charges");
      //  state.delivery.focus();
      return;
    }

    if (state.packing.length == 0) {
      alert("Enter Packing Charges ");
      //  state.packing.focus();
      return;
    }

    if (state.base.length == 0) {
      alert("Enter Delivery Base");
      //  state.base.focus();
      return;
    }

    if (state.price.length == 0) {
      alert("Enter Delivery Base Km ");
      //  state.price.focus();
      return;
    }

    if (state.price1.length == 0) {
      alert("Enter Delivery Extra Price per Km ");
      //  state.price1.focus();
      return;
    }

    if (state.mfcash.length == 0) {
      alert("Enter MF Cash Utilisation ");
      //  state.mfcash.focus();
      return;
    }

    if (state.minimum.length == 0) {
      alert("Enter Minimum Scratch Card Amount ");
      //  state.minimum.focus();
      return;
    }

    if (state.maximum.length == 0) {
      alert("Enter Maximum Scratch Card Amount ");
      //  state.maximum.focus();
      return;
    }
    var firebaseref = app
      .database()
      .ref()
      .child("Masters")
      .child("City")
      .push();
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
    state.name = "";
    state.commision = "";
    state.radius = "";
    state.subscription = "";
    state.delivery = "";
    state.packing = "";
    state.base = "";
    state.price = "";
    state.price1 = "";
    state.mfcash = "";
    state.minimum = "";
    state.maximum = "";
    state.status = "";

    // document.getElementById("submitbtn").style.visibility = "visible";
    // document.getElementById("updatebtn").style.visibility = "hidden";

    return (
      <h1>"Good job!", "You have successfully added the city!", "success"</h1>
    );
  };

  const updateHandler = (event) => {
    try {
      event.preventDefault();
      if (state.pushId !== null) {
        //     if(state.scity=="Select"){
        //       alert("Selete City");
        //       // city.focus();
        //       return;
        //   }

        //   if(state.name.length==0){
        //     alert('Enter City Name');
        //     // state.name.focus();
        //     return;
        // }

        // if(state.commision.length==0){
        //    alert('Enter Commision Percentage');
        //   //  state.commision.focus();
        //    return;
        // }

        // if(state.radius.length==0){
        //    alert('Enter Radius');
        //   //  state.radius.focus();
        //    return;
        // }

        // if(state.subscription.length==0){
        //    alert('Enter Subscription');
        //   //  state.subscription.focus();
        //    return;
        // }

        // if(state.delivery.length==0){
        //    alert('Enter Delivery Charges');
        //   //  state.delivery.focus();
        //    return;
        // }

        // if(state.packing.length==0){
        //    alert('Enter Packing Charges ');
        //   //  state.packing.focus();
        //    return;
        // }

        // if(state.base.length==0){
        //    alert('Enter Delivery Base');
        //   //  state.base.focus();
        //    return;
        // }

        // if(state.price.length==0){
        //    alert('Enter Delivery Base Km ');
        //   //  state.price.focus();
        //    return;
        // }

        // if(state.price1.length==0){
        //    alert('Enter Delivery Extra Price per Km ');
        //   //  state.price1.focus();
        //    return;
        // }

        // if(state.mfcash.length==0){
        //    alert('Enter MF Cash Utilisation ');
        //   //  state.mfcash.focus();
        //    return;
        // }

        // if(state.minimum.length==0){
        //    alert('Enter Minimum Scratch Card Amount ');
        //   //  state.minimum.focus();
        //    return;
        // }

        // if(state.maximum.length==0){
        //    alert('Enter Maximum Scratch Card Amount ');
        //   //  state.maximum.focus();
        //    return;
        // }

        console.log("CityId when i click update", event.target.value);
        console.log(state.name);
        // console.log(state.pushId[event.target.value])
        // var firebaseref = app
        //   .database()
        //   .ref()
        //   .child("Masters")
        //   .child("City")
        //   .child(state.scity);

        // firebaseref.child("Name").update(String(state.name));
        // firebaseref.child("Name").update(String(state.name));
        // firebaseref.child("Commision").update(String(state.commision));
        // firebaseref.child("Radius").update(String(state.radius));
        // firebaseref.child("Subscription").update(String(state.subscription));
        // firebaseref.child("DeliveryCharges").update(String(state.delivery));
        // firebaseref.child("PackingCharges").update(String(state.packing));
        // firebaseref.child("Base").update(String(state.base));
        // firebaseref.child("Price").update(String(state.price));
        // firebaseref.child("Price1").update(String(state.price1));
        // firebaseref.child("MFCash").update(String(state.mfcash));
        // firebaseref.child("Min").update(String(state.minimum));
        // firebaseref.child("Max").update(String(state.maximum));
        // firebaseref.child("PushId").update(firebaseref.getKey());
        // firebaseref.child("Status").update(state.status);

        // state.name="";
        // state.commision="";
        // state.radius="";
        // state.subscription="";
        // state.delivery="";
        // state.packing="";
        // state.base="";
        // state.price="";
        // state.price1="";
        // state.mfcash="";
        // state. minimum="";
        // state.maximum="";
        // state.status=""

        // document.getElementById("submitbtn").style.visibility = "visible";
        // document.getElementById("updatebtn").style.visibility = "hidden";
      } else {
        console.log("data is empty");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      {/* <BreadCrumb parent={<Home/>} subparent="City Management" title="Add City"/>  */}
      {/* <Container fluid={true}> */}
      <label className="col-form-label col-sm-2 text-sm-right">
        Select City
      </label>
      <div className="col-sm-8">
        <select
          className="form-control"
          id="scity"
          name="scity"
          value={state.scity}
          onChange={onChangeCityHandler}
        >
          {/* {
                    state.scity.on('change',function(){
  app.database().ref().child("Masters").child("City").child(state.pushId[setState(state.scity)[0].selectIndex])
   .once('value').then(function(snapshot) {
                if(snapshot.exists()){

               state.name= snapshot.val().Name;
               state.commision= snapshot.val().Commision;
               state.radius= snapshot.val().Radius;
               state.subscription= snapshot.val().Subscription;
               state.delivery= snapshot.val().DeliveryCharges;
               state.packing= snapshot.val().PackingCharges;
               state.base= snapshot.val().Base;
               state.price= snapshot.val().Price;
               state.price1= snapshot.val().Price1;
               state.mfcash= snapshot.val().MFCash;
               state.minimum= snapshot.val().Min;
               state.maximum= snapshot.val().Max;
               state.status= snapshot.val().Status;
 
               document.getElementById("submitbtn").style.visibility="hidden"; 
              document.getElementById("updatebtn").style.visibility="visible";
           
 
           }
       })
                    })
      } */}
          <option value="Select">Select</option>
          <option value="PushId">City Name</option>
          <option value="PushId1">City Name 1</option>
          <option value="PushId2">City Name 2</option>
          {city.map((item,id)=>{
                   return(<option key={id} value={item.PushId}>{item.Name}</option> )})}
        </select>
        <div className="clearfix"></div>
      </div>

      <input type="text" name="name" id="name" onChange={onChangeHandler} />

      <div className="col-sm-10 ml-sm-auto">
        {/* <button
          type="submit"
          id="submitbtn"
          onClick={(event) => onSubmit(event)}
          color="warning"
        >
          Submit
        </button> */}
        <button
          type="submit"
          id="updatebtn"
          onClick={updateHandler}
          color="warning"
        >
          Update
        </button>
      </div>
    </Fragment>
  );
};
export default AddCity1;