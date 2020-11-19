import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home} from 'react-feather';
import { Container, Row, Col, Button, CardHeader, Input } from "reactstrap";
// import {Check,Trash} from 'react-feather';
import app from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const AddTodaysOffer = () => {
  const [date,setDate] = useState("")
  const [searchValue, setSearchValue] = useState([]);
  const [search, setSearch] = useState("");
  const [foodName, setFoodName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [settlementPrice, setSettlementPrice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [chefCommision, setChefCommision] = useState([])
  const [statecid, setStatecid] = useState([])
 
  useEffect(() => {
    var cid = [];
    var chefcommision = [];
    var rcityname = [];

    app.database().ref().child("CloudKitchen")
      .once('value').then(function (snapshot) {
        snapshot.forEach(function (data) {
          var val = data.val();
          cid.push(val.UserId);
          chefcommision.push(val.Commision);
          rcityname.push(val.City);
        });
        setStatecid(cid)
        setChefCommision(chefcommision)

      });

  }, [])

  const onChangeSearchHandler = (event) => {
    setSearch(event.target.value)
  }

  const onClickSearchHandler = (event) => {
    var database = app.database();
    database.ref().child("CloudKitchen").child(search).child("FoodItems")
      .once('value', function (snapshot) {
        if (snapshot.exists()) {
          var content = [];

          snapshot.forEach(snap => {
            let val = snap.val()
            const locker = {
              PushId: val.PushId,
              Name: val.Name
            }
            content.push(locker);
          });
          setSearchValue(content)
        }
      })
  }


  const onChangeFoodName = (event) => {
    setFoodName(event.target.value)
    var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(event.target.value);
    return firebaseref.once('value').then(function (snapshot) {
      if (snapshot.exists()) {
        var foodId = snapshot.val().PushId
        window.foodId = foodId
        setItemName(snapshot.val().Name)
        setItemPrice(snapshot.val().Price)
     setStartTime(snapshot.val().STime)
        setCloseTime(snapshot.val().ETime)



       }
    })
  }


  const onChangeDate = (event) => {
    setDate(event.target.value)
  }

  const onChangeItemPrice = (event) => {
    setItemPrice(event.target.value)
  }

  const onChangeSettlemetPrice = (event) => {
    if (search === "") {
      alert("Please Enter Chef Id")
      return
    }
    setSettlementPrice(event.target.value)

    var bprice = +event.target.value;
    var total = +bprice;
    var rcommision = chefCommision[statecid.indexOf(search)];
    var rcommisionrate = (rcommision * total) / 100;
    var gst = (rcommisionrate * 0.18);
    var ftotal = ((+total - +rcommisionrate - +gst) * 100) / 100;
    window.ftotal = ftotal
    document.getElementById("price").innerHTML = ftotal
    // })

  }
  const onChangeStartTime = (event) => {
    setStartTime(event.target.value)
  }

  const onChangeCloseTime = (event) => {
    setCloseTime(event.target.value)
  }

  const onSubmitHandler = (event) => {
    if (search === "") {
      alert("Please Enter Chef Id")
    }
    if (itemName === "") {
      alert("Please Enter Item Name")
      return
    }

    if (itemPrice === "") {
      alert("Please Enter Mrp Price")
      return
    }
    if (settlementPrice === "") {
      alert("Please Enter Offer Price")
      return
    }
    if (startTime === "") {
      alert("Please Select Start Time of Item Availablity")
      return
    }
    if (closeTime === "") {
      alert("Please Select End Time of Item Availablity")
      return
    }

    var firebaseref = app.database().ref().child("TodaysOffer").child(date).push()

     app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(window.foodId).once("value").then(function (snapshot){
        firebaseref.child("PushId").set(firebaseref.getKey());
        firebaseref.child("Name").set(snapshot.val().Name)
        firebaseref.child("Details").set(snapshot.val().Details)
        firebaseref.child("CuisinePushId").set(snapshot.val().CuisinePushId)
        firebaseref.child("CuisineName").set(snapshot.val().CuisineName)
        firebaseref.child("ComplimentaryPushId").set(snapshot.val().ComplimentaryPushId)
        firebaseref.child("ComplimentaryName").set(snapshot.val().ComplimentaryName)
        firebaseref.child("FOODTYPE").set(snapshot.val().FOODTYPE)
        firebaseref.child("Category").set(snapshot.val().Category)
        firebaseref.child("FoodType").set(snapshot.val().FoodType)
        firebaseref.child("ADDONS").set(snapshot.val().ADDONS)
        firebaseref.child("Addons").set(snapshot.val().Addons)
        firebaseref.child("ETime").set(closeTime)
        firebaseref.child("STime").set(startTime)
        firebaseref.child("Grams").set(snapshot.val().Grams)
        firebaseref.child("Image").set(snapshot.val().Image)
        firebaseref.child("Mrp").set(itemPrice)
        firebaseref.child("Price").set(settlementPrice)
        firebaseref.child("RCommision").set("13.20")
        firebaseref.child("Settlement").set(String(window.ftotal))
          firebaseref.child("Signature").set(snapshot.val().Signature)
        
        firebaseref.child("Status").set(snapshot.val().Status)
        firebaseref.child("AStatus").set(snapshot.val().AStatus)
        firebaseref.child("Chef").set(search)

    });
 
    app.database().ref().child("CloudKitchen").child(search).once("value").then(function (snapshot){
        firebaseref.child("ChefName").set(snapshot.val().Name)
        firebaseref.child("ChefNumber").set(snapshot.val().MobileNumber)
        firebaseref.child("City").set(snapshot.val().City)
        firebaseref.child("Location").set(snapshot.val().Location)
        firebaseref.child("AStatus").set(snapshot.val().AStatus)

    })
 


    Swal.fire({
      title: "Successfully Created!",
      icon: "success",
      confirmButtonText: "Ok"
    });
      document.getElementById("price").innerHTML = "0.00"
      
        setItemName("")
        setItemPrice("")
        setSettlementPrice("")
        setStartTime("")
        setCloseTime("")

  }
 
  return (
    <Fragment>
      <BreadCrumb parent={<Home />} subparent="Food Management" title=" Todays Offer Items " />
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
              <h5>Todays Offer Items </h5>
              {/* <span> Use a className <code> table </code> to any table.</span> */}
            </CardHeader>
          </Col>

        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Select Item</label>
            <select value={foodName} onChange={onChangeFoodName} className="form-control">
              <option value="Select">Select</option>
              {searchValue.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}
            </select>
            <div className="clearfix"></div>
          </Col>

          <Col className="form-group col-md-3">
            <label className="form-label">Price <span style={{ color: "red" }}>*</span></label>
            <Input type="number" value={itemPrice} onChange={onChangeItemPrice} disabled className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>

        <p>Todays Offer Price (Including Tax,Commision,Packing)</p>
        <h5 style={{ color: "red" }}>Settlement Amount after deduction :Rs <span style={{ color: "red" }} id="price"></span> </h5>
        <Input type="number" value={settlementPrice} onChange={onChangeSettlemetPrice} className="form-control" />

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Valid For<span style={{ color: "red" }}>*</span></label>
            <Input type="date" value={date} onChange={onChangeDate} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Start Time <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={startTime} onChange={onChangeStartTime} max={new Date()} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">End Time <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={closeTime} onChange={onChangeCloseTime} min={new Date()} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>
 
          <Button type="submit" onClick={onSubmitHandler} className="warning">Submit</Button> 
      </Container>
    </Fragment>
  );
};

export default AddTodaysOffer;