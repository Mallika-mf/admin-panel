import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home, Trash, PlusCircle } from 'react-feather';
import { Container, Row, Col, Button, CardHeader, Table, Input } from "reactstrap";
// import {Check,Trash} from 'react-feather';
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto; 
  border-color: red;
`;

const AddPreOrder = () => {
  const [show, setShow] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [searchValue, setSearchValue] = useState([]);
  const [search, setSearch] = useState("");
  const [foodName, setFoodName] = useState("");
  const [itemName, setItemName] = useState("");
  const [detail, setDetail] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [orderDeliveryDate, setOrderDeliveryDate] = useState("");
  const [number, setNumber] = useState("");

  const [cuisine, setCuisine] = useState("");
  const [addon, setAddon] = useState("");
  const [complimentory, setComplimentory] = useState("");
  const [price, setPrice] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [veg, setVeg] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [settlementPrice, setSettlementPrice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [signatureDish, setSignatureDish] = useState(false);
  const [searchCuisines, setSearchCuisines] = useState([]);
  const [searchComplimentory, setSearchComplimentory] = useState([]);
  const [complimentoryName, setComplimentoryName] = useState("")
  const [foodType, setFoodType] = useState([]);
  const [cuisineName, setCuisineName] = useState("");
  const [addonList, setAddonList] = useState([]);
  const [selectAddonName, setSelectAddonName] = useState([]);
  const [selectAddonId, setSelectAddonId] = useState([]);

  const [foodTypeList, setFoodTypeList] = useState([]);
  const [selectFoodTypeName, setSelectFoodTypeName] = useState([]);
  const [selectFoodTypeId, setSelectFoodTypeId] = useState([]);

  const [chefCommision, setChefCommision] = useState([])
  const [statecid, setStatecid] = useState([])
 
  useEffect(() => {
    var cid = [];
    var chefcommision = [];
    var rcityname = [];
    var database = app.database();
    // database.ref().child("Masters").child("Addons")
    //   .once('value', function (snapshot) {
    //     if (snapshot.exists()) {
    //       var content = [];
    //       let addonPushid = []
    //       let addonName = []
    //       snapshot.forEach(snap => {
    //         let val = snap.val()
    //         addonPushid.push(val.PushId)
    //         addonName.push(val.Name)
    //         const locker = {
    //           PushId: val.PushId,
    //           Name: val.Name,
    //         }
    //         content.push(locker);
    //       });

    //       // content.reverse()
    //       setSelectAddonName(addonName)
    //       setSelectAddonId(addonPushid)
    //     //   setAddonName(content);

    //     }
    //   });

    // database.ref().child("Masters").child("Complimentary")
    //   .once('value', function (snapshot) {
    //     if (snapshot.exists()) {
    //       var content = [];

    //       snapshot.forEach(snap => {
    //         let val = snap.val()
    //         const locker = {
    //           PushId: val.PushId,
    //           Name: val.Name,
    //         }
    //         content.push(locker);
    //       });

    //       // content.reverse()
    //       setSearchComplimentory(content);

    //     }
    //   });

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
        // setRcityName(rcityname)

      });

  }, [])

  const onChangeSearchHandler = (event) => {
    setSearch(event.target.value)
  }

  const onClickSearchHandler = (event) => {
    var database = app.database();
    database.ref().child("Preorders").orderByChild("Chef").equalTo(search)
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
    setShow(true)
    setShowTable(true)
    var firebaseref = app.database().ref().child("Preorders").child(event.target.value)
    return firebaseref.on('value',function (snapshot) {
      if (snapshot.exists()) {
        var foodId = snapshot.val().PushId
        window.foodId = foodId
        document.getElementById("price").innerHTML = snapshot.val().Settlement;
        setItemName(snapshot.val().Name)
        setDetail(snapshot.val().Details)
        setOrderDeliveryDate(snapshot.val().OrderDate)
        setNumber(snapshot.val().Days)
        setStartDate(snapshot.val().StartDate)
        setEndDate(snapshot.val().EndDate)
        setVeg(snapshot.val().Category)
        setQuantity(snapshot.val().Grams)
        setItemPrice(snapshot.val().Mrp)

        setSettlementPrice(snapshot.val().Price)
        setStartTime(snapshot.val().STime)
        setCloseTime(snapshot.val().ETime)
        setImageAsUrl(snapshot.val().Image)
      }
    })
  
  }

  const onChangeNumber = (event) => {
    setNumber(event.target.value)
  }

  const onChangeItemName = (event) => {
    setItemName(event.target.value)
  }

  const onChangeDetail = (event) => {
    setDetail(event.target.value)
  }



  const onChangeEndtDate = (event) => {
    setEndDate(event.target.value)
    searchComplimentory.filter(item => {
      if (item.PushId === event.target.value) {
        setComplimentoryName(item.Name)
      }
      return item
    })
  }

  const onChangeStartDate = (event) => {
    setStartDate(event.target.value)
   
  }

  const onChangeVeg = (event) => {
    setVeg(event.target.value)
  }

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value)
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

  const onChangeImage = (event) => {
    const image = event.target.files[0]
    // setPassportImageAsFile(imageFile => (image))
    if (image === '') {
      console.error(`not an image, the image file is a ${typeof (image)}`)
    }
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
    };

    const uploadTask = storage.ref(`FoodItems/${name}`).put(image, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storage.ref("FoodItems/").child(name).getDownloadURL()
          .then(fireBaseUrl => {
            setImageAsUrl(fireBaseUrl)
            window.temp++
          })


      })

  }

  const onChangeOrderDeliveryDate = (event) => {
    setOrderDeliveryDate(event.target.value)
  }

  const onSubmitHandler = (event) => {
    setShow(false)
    setShowTable(false)
    // if (search === "") {
    //   alert("Please Enter Chef Id")
    // }
    // if (itemName === "") {
    //   alert("Please Enter Item Name")
    //   return
    // }
    // if (detail === "") {
    //   alert("Please Enter Item Detail")
    //   return
    // }
    // if (startDate === "") {
    //   alert("Please Select Preorder Start Date")
    //   return
    // }

    // if (endDate === "") {
    //     alert("Please Select Preorder End Date")
    //     return
    //   }

    // if (orderDeliveryDate === "") {
    //   alert("Select Delivery Date")
    //   return
    // }

    // if (quantity === "") {
    //   alert("Please Enter Approx Grams")
    //   return
    // }
    // if (itemPrice === "") {
    //   alert("Please Enter Mrp Price")
    //   return
    // }
    // if (settlementPrice === "") {
    //   alert("Please Enter Offer Price")
    //   return
    // }
    // if (startTime === "") {
    //   alert("Please Select Start Time of Item Availablity")
    //   return
    // }
    // if (closeTime === "") {
    //   alert("Please Select End Time of Item Availablity")
    //   return
    // }
    // if (imageAsUrl === "") {
    //   alert("Please Upload Image")
    //   return
    // }

// var dateIncriment = parseInt(orderDeliveryDate)+number
// console.log(dateIncriment)
// console.log(veg)
    let orderEndDay = orderDeliveryDate.split('/')
    console.log(orderEndDay)
    orderEndDay[0] = Number(orderEndDay[0])+2
    console.log(orderEndDay.join('/'))
    
    // var firebaseref = app.database().ref().child("Preorders").push();
    // firebaseref.child("PushId").set(firebaseref.getKey());
    // firebaseref.child("Name").set(itemName)
    // firebaseref.child("Details").set(detail)
    // firebaseref.child("Chef").set(search)
    // firebaseref.child("Days").set(number)
    // firebaseref.child("EndDate").set(endDate)
    // firebaseref.child("OrderDate").set(orderDeliveryDate)
    // firebaseref.child("StartDate").set(startDate)
    // firebaseref.child("Category").set(veg)
    // firebaseref.child("ETime").set(closeTime)
    // firebaseref.child("STime").set(startTime)
    // firebaseref.child("Grams").set(quantity)
    // firebaseref.child("Image").set(imageAsUrl)
    // firebaseref.child("Mrp").set(itemPrice)
    // firebaseref.child("Price").set(settlementPrice)
    // firebaseref.child("RCommision").set("022")
    // firebaseref.child("Settlement").set(String(window.ftotal))
    // // firebaseref.child("OrderEndDate").set(dateIncriment)
    // firebaseref.child("Status").set("Active")
    // firebaseref.child("AStatus").set("InActive")

    // app.database().ref().child("CloudKitchen").child(search).once('value').then(function(snapshot){
    //     firebaseref.child("ChefName").set(snapshot.val().Name)
    //     firebaseref.child("ChefNumber").set(snapshot.val().MobileNumber)
    //     firebaseref.child("City").set(snapshot.val().City)
    //     firebaseref.child("Locality").set(snapshot.val().Locality)
    //     firebaseref.child("Location").set(snapshot.val().Location)
    // })


    Swal.fire({
      title: "Successfully Created!",
      icon: "success",
      confirmButtonText: "Ok"
    });
      document.getElementById("price").innerHTML = "0.00"
        setItemName("")
        setDetail("")
        setStartDate("")
        setEndDate("")
        setVeg("")
        setQuantity("")
        setItemPrice("")
        setNumber("")
        setOrderDeliveryDate("")
        setSettlementPrice("")
        setStartTime("")
        setCloseTime("")
        setImageAsUrl("")
        
  }


  const onUpdateHandler = (event) => {
    setShow(false)
    setShowTable(false)

    if (search === "") {
        alert("Please Enter Chef Id")
      }
      if (itemName === "") {
        alert("Please Enter Item Name")
        return
      }
      if (detail === "") {
        alert("Please Enter Item Detail")
        return
      }
      if (startDate === "") {
        alert("Please Select Preorder Start Date")
        return
      }
  
      if (endDate === "") {
          alert("Please Select Preorder End Date")
          return
        }
  
      if (orderDeliveryDate === "") {
        alert("Select Delivery Date")
        return
      }
  
      if (quantity === "") {
        alert("Please Enter Approx Grams")
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
      if (imageAsUrl === "") {
        alert("Please Upload Image")
        return
      }

      var dateIncrimentUpdate = document.getElementById("orderDate").stepUp(number)
      console.log(dateIncrimentUpdate)
console.log(veg)
    var firebaseref = app.database().ref().child("Preorders").child(window.foodId);
    firebaseref.child("Name").set(itemName)
    firebaseref.child("Details").set(detail)
    firebaseref.child("Chef").set(search)
    firebaseref.child("Days").set(number)
    firebaseref.child("EndDate").set(endDate)
    firebaseref.child("OrderDate").set(orderDeliveryDate)
    firebaseref.child("StartDate").set(startDate)
    firebaseref.child("Category").set(veg)
    firebaseref.child("ETime").set(closeTime)
    firebaseref.child("STime").set(startTime)
    firebaseref.child("Grams").set(quantity)
    firebaseref.child("Image").set(imageAsUrl)
    firebaseref.child("Mrp").set(itemPrice)
    firebaseref.child("Price").set(settlementPrice)
    firebaseref.child("RCommision").set("022")
    firebaseref.child("Settlement").set(String(window.ftotal))
    firebaseref.child("OrderEndDate").set(dateIncrimentUpdate)
    firebaseref.child("Status").set("Active")
    firebaseref.child("AStatus").set("InActive")

    app.database().ref().child("CloudKitchen").child(search).once('value').then(function(snapshot){
        firebaseref.child("ChefName").set(snapshot.val().Name)
        firebaseref.child("ChefNumber").set(snapshot.val().MobileNumber)
        firebaseref.child("City").set(snapshot.val().City)
        firebaseref.child("Locality").set(snapshot.val().Locality)
        firebaseref.child("Location").set(snapshot.val().Location)
    })

 

    Swal.fire({
      title: "Successfully Updated!",
      icon: "success",
      confirmButtonText: "Ok"
    });
    document.getElementById("price").innerHTML = "0.00"
    setItemName("")
    setDetail("")
    setStartDate("")
    setEndDate("")
    setVeg("")
    setQuantity("")
    setItemPrice("")
    setNumber("")
    setOrderDeliveryDate("")
    setSettlementPrice("")
    setStartTime("")
    setCloseTime("")
    setImageAsUrl("")
  }

  const onClickDeleteHandler = (event) => {
    setShow(false)
    setShowTable(false)
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'gray'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          app.database().ref().child("Preorders").child(window.foodId).remove();
          Swal.fire({
            icon: "success",
            text: "Deleted!"
          });
        } else if (willDelete.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'error'
          )
        }
      });
      document.getElementById("price").innerHTML = "0.00"
    setItemName("")
    setDetail("")
    setStartDate("")
    setEndDate("")
    setVeg("")
    setQuantity("")
    setItemPrice("")
    setNumber("")
    setOrderDeliveryDate("")
    setSettlementPrice("")
    setStartTime("")
    setCloseTime("")
    setImageAsUrl("")
  }

//   const onClickAddonDelete = (index) => {
//     console.log(index)

//     // app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(foodName).child("ADDONS").child(pushid).remove();
//     const newData = addonList.filter((_, item) => {
//       console.log(item)
//       return (
//         item !== index
//       )

//     })
//     console.log(newData)
//     setAddonList(newData)
//   }
//   const onDeleteFoodType = (index) => {
//     const newData = foodTypeList.filter((_, item) => {
//       console.log(item)
//       return (
//         item !== index
//       )

//     })
//     setFoodTypeList(newData)
//   }
  return (
    <Fragment>
      <BreadCrumb parent={<Home />} subparent="Food Management" title=" Add Food Items " />
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
              <h5>Add PreOrder Items </h5>
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
        </Row>


        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Item Name <span style={{ color: "red" }}>*</span></label>
            <Input type="text" value={itemName} onChange={onChangeItemName} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">Item Details <span style={{ color: "red" }}>*</span></label>
            <Input type="text" value={detail} onChange={onChangeDetail} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>
        {/* <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Cuisines</label>
            <select value={cuisine} onChange={onChangeCusinie} className="form-control">
              <option value="Select">Select</option>
              {searchCuisines.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}

            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Addon</label>
            <select value={addon} onChange={onChangeAddon} className="form-control">
              <option value="Select">Select</option>
              {addonName.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}
            </select>
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3" style={{position:"relative",marginTop:"7px"}}>
            <label className="form-label"></label>
            <Input type="number" value={price} onChange={onChangeAddonPrice} className="form-control" placeholder="Price" />
            <div className="clearfix"></div>

          </Col>
          <Col className="form-group col-md-3 " style={{position:"relative",marginTop:"30px"}}>
            <label className="form-label"></label>
            <PlusCircle size={25} style={{color:"blue"}} onClick={onClickAddon} />
            {/* <span onClick={onClickAddon}  ><img src="https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_960_720.png" alt="search engine" /></span> */}
            {/* <div className="clearfix"></div> /*} */}

          {/* </Col>
          {showTable===true?
          <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
          <Table>
            <thead>
              <tr>
                <th>Addons Name</th>
                <th>Price </th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {addonList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{selectAddonName[selectAddonId.indexOf(item.data)]}</td>
                    <td>{item.price}</td>
                    <td><Trash style={{ color: "orange" }} onClick={() => {
                      onClickAddonDelete(index);
                    }} size={15} /></td>

                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>:
        <></>
          } */}
          
        {/* </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Complimentory</label>
            <select value={complimentory} onChange={onChangeComplimentory} className="form-control">
              <option value="Select">Select</option>
              {searchComplimentory.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}

            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Food Category</label>
            <select value={foodCategory} onChange={onChangeFoodCategory} className="form-control">
              <option value="Select">Select</option>
              {foodType.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}

            </select>
            <div className="clearfix"></div>
          </Col>
        </Row> */}
        {/* // <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
        //   <Table>
        //     <thead>
        //       <tr>
        //         <th>Food Category</th>
        //         <th>Delete</th>

        //       </tr>
        //     </thead>
        //     <tbody>
        //       {foodTypeList.map((item, index) => { */}
        {/* //         return (
        //           <tr key={index}>
        //             <td>{selectFoodTypeName[selectFoodTypeId.indexOf(item.data)]}</td>
        //             <td><Trash id={index} onClick={() => {
        //               onDeleteFoodType(index);
        //             }} size={15} /></td>
        //           </tr>
        //         )
        //       })}
        //     </tbody>
        //   </Table>
        // </div>  */}


        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Veg/NonVeg/Eggeterian</label>
            <select value={veg} onChange={onChangeVeg} className="form-control">
              <option value="Veg">Veg</option>
              <option value="NonVeg">NonVeg</option>
              <option value="Egg">Egg</option>
            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Total Gram/Quantity <span style={{ color: "red" }}>*</span></label>
            <Input type="number" value={quantity} onChange={onChangeQuantity} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Price <span style={{ color: "red" }}>*</span></label>
            <Input type="number" value={itemPrice} onChange={onChangeItemPrice} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>

        <p>Todays Offer Price (Including Tax,Commision,Packing)</p>

        <h5 style={{ color: "red" }}>Settlement Amount after deduction :Rs <span style={{ color: "red" }} id="price"></span> </h5>
        <Input type="number" value={settlementPrice} onChange={onChangeSettlemetPrice} className="form-control" />

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Order Delivery Date <span style={{ color: "red" }}>*</span></label>
            <Input type="date" id="orderDate" value={orderDeliveryDate} onChange={onChangeOrderDeliveryDate} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Start Time <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={startTime} onChange={onChangeStartTime} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">End Time <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={closeTime} onChange={onChangeCloseTime} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>
        
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Number Of Days</label>
            <select value={number} onChange={onChangeNumber} className="form-control">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>

            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-6">
            <label className="form-label">Upload Image <span style={{ color: "red" }}>*</span></label>
            <Input type="file" onChange={onChangeImage} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <div className="col-sm-1">
            {imageAsUrl === "" ?
              <></> :
              <a href={imageAsUrl} target="_blank" rel="noopener noreferrer">View</a>}
          </div>
        </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">PreOrder Start Date <span style={{ color: "red" }}>*</span></label>
            <Input type="date" value={startDate} onChange={onChangeStartDate} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">PreOrder End Date <span style={{ color: "red" }}>*</span></label>
            <Input type="date" value={endDate} onChange={onChangeEndtDate} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          </Row>
        {show === false ?
          <Button type="submit" onClick={onSubmitHandler} className="warning">Submit</Button> :
          <>
            <Button type="submit" onClick={onUpdateHandler} className="warning">Update</Button>

            <Button type="submit" onClick={onClickDeleteHandler} className="warning">Delete</Button>
          </>

        }

      </Container>
    </Fragment>
  );
};

export default AddPreOrder;