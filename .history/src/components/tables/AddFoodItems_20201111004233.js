import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home, Search} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Input} from "reactstrap";
import {Check,Trash} from 'react-feather';
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {useHistory} from 'react-router-dom'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto; 
  border-color: red;
`;

const AddFoodItems = () => {
    const [show,setShow] = useState(true)
    const [searchValue, setSearchValue] = useState([]);
    const [search, setSearch] = useState("");
    const [foodName, setFoodName] = useState("");
    const [itemName,setItemName ] = useState("");
    const [detail,setDetail ] = useState("");
    const [cuisine,setCuisine ] = useState("");
    const [addon,setAddon ] = useState("");
    const [complimentory,setComplimentory ] = useState("");
    const [price,setPrice ] = useState("");
    const [foodCategory,setFoodCategory ] = useState("");
    const [veg,setVeg ] = useState("");
    const [quantity,setQuantity ] = useState("");
    const [itemPrice,setItemPrice ] = useState("");
    const [settlementPrice,setSettlementPrice ] = useState("");
    const [startTime,setStartTime ] = useState("");
    const [closeTime,setCloseTime ] = useState("");
    const [imageAsUrl,setImageAsUrl ] = useState("");
    const [signatureDish,setSignatureDish ] = useState(false);
    const [addonName,setAddonName ] = useState([]);
    const [searchCuisines,setSearchCuisines ] = useState([]);
    const [, ] = useState("");

    const history = useHistory()
    const [textName,setTextName] = useState("")
    useEffect(() => {
        setShow(true)

        var database = app.database();
        database.ref().child("Masters").child("Addons")
          .once('value', function (snapshot) {
            if (snapshot.exists()) {
              console.log(snapshot.val().size)
              var content = [];
    
              snapshot.forEach(snap => {
                let val = snap.val()
                const locker = {
                  PushId: val.PushId,
                  Name: val.Name,                 
                }
                content.push(locker);
              });
            
              // content.reverse()
              setAddonName(content);
              setShow(false)
    
            } 
          });
       
    
    
      }, [])

    const onChangeSearchHandler=(event)=>{
        setSearch(event.target.value)
    }

    const onClickSearchHandler = (event) =>{
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

        database.ref().child("CloudKitchen").child(search).child("Cuisines")
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
            setSearchCuisines(content)
          }
      })
    }
    
    const onChangeFoodName = (event) =>{
        setFoodName(event.target.value)

    }

    const onChangeItemName = (event) =>{
        setItemName(event.target.value)
    }

    const onChangeDetail = (event) =>{
        setDetail(event.target.value)
    }

    const onChangeCusinie = (event) =>{
        setCuisine(event.target.value)
    }

    const onChangeAddon = (event) =>{
        setAddon(event.target.value)
    }

    const onChangeAddonPrice = (event) =>{
        setPrice(event.target.value)
    }

    const onClickAddon = (event) =>{

    }

    const onChangeComplimentory = (event) =>{
        setComplimentory(event.target.value)
    }

    const onChangeFoodCategory = (event) =>{
        setFoodCategory(event.target.value)
    }

    const onChangeVeg= (event) =>{
        setVeg(event.target.value)
    }

    const onChangeQuantity = (event) =>{
        setQuantity(event.target.value)
    }

    const onChangeItemPrice = (event) =>{
        setItemPrice(event.target.value)
    }

    const onChangeSettlemetPrice = (event) =>{
        setSettlementPrice(event.target.value)
    }
    const onChangeStartTime = (event) =>{
        setStartTime(event.target.value)
    }

    const onChangeCloseTime = (event) =>{
        setCloseTime(event.target.value)
    }

    const onChangeImage = (event) => {
        const image = event.target.files[0]
        // setPassportImageAsFile(imageFile => (image))
        if (image === '') {
          console.error(`not an image, the image file is a ${typeof (image)}`)
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
                setImageAsUrl(fireBaseUrl)
                window.temp++
              })
    
    
          })
    
      }

      const onChangeSignatureDish = (event) =>{
        setSignatureDish(event.target.checked)
    }

    const onSubmitHandler=(event)=>{
       
        // if(name.length===0){
        //     alert('Enter Locality Name');
        //     return;
        // }
       
      var firebaseref=app.database().ref().child("Masters").child("Cuisines").push();
        //    firebaseref.child("Name").set(String(name));
           firebaseref.child("PushId").set(firebaseref.getKey());
         
   
   
           Swal.fire({
               title: "Successfully Created!",
               icon: "success",
               confirmButtonText: "Ok" 
              });
            //   setName("")
    }
    const onChangeTextHandler = (event) =>{
        setTextName(event.target.value)
        console.log(event.target.value)
        searchValue.map((item,id)=>{
            if(event.target.id===item.PushId){
                item.Name=event.target.value
            }
            return item
        })
    }

    const onUpdateHandler=(event)=>{
        const pushId=event.target.id
        console.log(pushId)
        var firebaseref=app.database().ref().child("Masters").child("Cuisines").child(pushId);

        firebaseref.child("Name").set(textName);
        firebaseref.child("PushId").set(firebaseref.getKey())
    
        Swal.fire({
            title: "Successfully Updated!",
            icon: "success",
            confirmButtonText: "Ok" 
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
                         app.database().ref().child("Masters").child("Cuisines").child(localityId).remove();
                        Swal.fire({
                        icon: "success",
                        text:"Deleted!"
                    });
                }else if (willDelete.dismiss === Swal.DismissReason.cancel){
                    Swal.fire(
                        'Cancelled',
                        'error'
                      )
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
        return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Food Management" title=" Add Food Items "/>
            <Container fluid={true}>
            <Row className="form-row" style={{ marginTop: "3%" }}>
              <Col className="form-group col-md-6">
                <label className="form-label">Enter Home Chef registration Number</label>
                <Row>
                  <Col className="col-lg-6 col-md-5 col-sm-5">
                    <Input type="text" value={search} onChange={onChangeSearchHandler}  className="form-control" />
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
                                <h5>Add Food Items </h5>
                                {/* <span> Use a className <code> table </code> to any table.</span> */}
                         </CardHeader>
                    </Col>
            
                    </Row>
                    <Row className="form-row">
                    <Col className="form-group col-md-3">
                        <label className="form-label">Select Item</label>
                    <select value={foodName} onChange={onChangeFoodName} className="form-control">
                        <option value="Select">Select</option>
                        {searchValue.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                    </select>
                <div className="clearfix"></div>
              </Col>
              </Row>


                    <Row className="form-row">
<Col className="form-group col-md-3">
  <label className="form-label">Item Name <span style={{ color: "red" }}>*</span></label>
  <Input type="text" value={itemName} onChange={onChangeItemName}  className="form-control"  />
  <div className="clearfix"></div>
</Col>
<Col className="form-group col-md-3">
  <label className="form-label">Item Details <span style={{ color: "red" }}>*</span></label>
  <Input type="text" value={detail} onChange={onChangeDetail}  className="form-control"  />
  <div className="clearfix"></div>
</Col>
</Row>
<Row className="form-row">
                    <Col className="form-group col-md-3">
                        <label className="form-label">Cuisines</label>
                    <select value={cuisine} onChange={onChangeCusinie}  className="form-control">
                        <option value="Select">Select</option>
                        {searchCuisines.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}

                    </select>
                <div className="clearfix"></div>
              </Col>
              </Row>
              <Row className="form-row">
                    <Col className="form-group col-md-3">
                        <label className="form-label">Addon</label>
                    <select value={addon} onChange={onChangeAddon}  className="form-control">
                        <option value="Select">Select</option>
                        {addonName.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                    </select>
                <div className="clearfix"></div>
              </Col>
              <Col className="form-group col-md-3">
              <label className="form-label"></label>
  <Input type="number" value={price} onChange={onChangeAddonPrice}  className="form-control" placeholder="Price" />
  <div className="clearfix"></div>
 
</Col>
<Col className="form-group col-md-3">
 <label className="form-label"></label>
<span id="search" ><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
<div className="clearfix"></div>
 
</Col>
              </Row>
              <Row className="form-row">
                    <Col className="form-group col-md-3">
                        <label className="form-label">Complimentory</label>
                    <select value={complimentory} onChange={onChangeComplimentory}   className="form-control">
                        <option value="Select">Select</option>
                    </select>
                <div className="clearfix"></div>
              </Col>
              </Row>

              <Row className="form-row">
                    <Col className="form-group col-md-3">
                        <label className="form-label">Food Category</label>
                    <select value={foodCategory} onChange={onChangeFoodCategory}  className="form-control">
                        <option value="Select">Select</option>
                    </select>
                <div className="clearfix"></div>
              </Col>
              </Row>
              <p>Food Category</p><hr/>


                    <Row className="form-row">
                    <Col className="form-group col-md-3">
                        <label className="form-label">Veg/NonVeg/Eggeterian</label>
                    <select value={veg} onChange={onChangeVeg}  className="form-control">
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
  <Input type="number" value={quantity} onChange={onChangeQuantity} className="form-control"  />
  <div className="clearfix"></div>
</Col>
</Row>

<Row className="form-row">
              <Col className="form-group col-md-3">
  <label className="form-label">Price <span style={{ color: "red" }}>*</span></label>
  <Input type="number" value={itemPrice} onChange={onChangeItemPrice}  className="form-control"  />
  <div className="clearfix"></div>
</Col>
</Row>


                    <h5 style={{color:"red"}}>Settlement Amount after deduction :</h5>
                    <Input type="number" value={settlementPrice} onChange={onChangeSettlemetPrice}  className="form-control"  />

                    <Row className="form-row">
              <Col className="form-group col-md-3">
  <label className="form-label">Start Time <span style={{ color: "red" }}>*</span></label>
  <Input type="time" value={startTime} onChange={onChangeStartTime}  className="form-control"  />
  <div className="clearfix"></div>
</Col>
              <Col className="form-group col-md-3">
  <label className="form-label">End Time <span style={{ color: "red" }}>*</span></label>
  <Input type="time" value={closeTime} onChange={onChangeCloseTime}  className="form-control"  />
  <div className="clearfix"></div>
</Col>
</Row>
<Row className="form-row">
              <Col className="form-group col-md-3">
  <label className="form-label">Upload Image <span style={{ color: "red" }}>*</span></label>
  <Input type="file" onChange={onChangeImage} className="form-control"  />
  <div className="clearfix"></div>
</Col>
</Row>

<Row className="form-row">
              <Col className="form-group col-md-3">
<Input type="checkbox" checked={signatureDish} onChange={onChangeSignatureDish}   className="form-control" />Add The Signature Dish
<div className="clearfix"></div>
</Col>
</Row>
<p>Only one item can be added as Signature Dish</p>

                    <Row style={{margin:"1%"}}>
                     <div className="col-sm-10 ml-sm-auto">
                     <button type="submit" id="submit"  className="btn btn-primary">Submit</button>
                     </div>
                   </Row>
                   <Row style={{margin:"1%"}}>
                     <div className="col-sm-10 ml-sm-auto">
                     <button type="submit" id="submit"  className="btn btn-primary">Update</button>
                     </div>
                   </Row>
                   <Row style={{margin:"1%"}}>
                     <div className="col-sm-10 ml-sm-auto">
                     <button type="submit" id="submit"  className="btn btn-primary">Delete</button>
                     </div>
                   </Row>

                 
                   
                </Container> 
        </Fragment>
            );
        };
        
export default AddFoodItems;