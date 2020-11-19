import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home, Trash} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Input} from "reactstrap";
// import {Check,Trash} from 'react-feather';
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
    const [searchComplimentory,setSearchComplimentory ] = useState([]);
    const [foodType,setFoodType ] = useState([]);
    const [cuisineName,setCuisineName ] = useState("");
    const [addonList,setAddonList ] = useState([]);
    const [selectAddonName,setSelectAddonName ] = useState([]);
    const [selectAddonId,setSelectAddonId ] = useState([]);

    const [foodTypeList,setFoodTypeList ] = useState([]);
    const [selectFoodTypeName,setSelectFoodTypeName ] = useState([]);
    const [selectFoodTypeId,setSelectFoodTypeId ] = useState([]);

    const [chefCommision,setChefCommision] = useState([])
    const [ statecid,setStatecid] = useState([])
    const history = useHistory()
    const [textName,setTextName] = useState("")
    useEffect(() => {
        setShow(true)
        var cid=[];
        var chefcommision=[];
        var rcityname=[];
        var database = app.database();
        database.ref().child("Masters").child("Addons")
          .once('value', function (snapshot) {
            if (snapshot.exists()) {
              var content = [];
                let addonPushid = []
                let addonName = []
              snapshot.forEach(snap => {
                let val = snap.val()
                addonPushid.push(val.PushId)
                addonName.push(val.Name)
                const locker = {
                  PushId: val.PushId,
                  Name: val.Name,                 
                }
                content.push(locker);
              });

              // content.reverse()
              setSelectAddonName(addonName)
              setSelectAddonId(addonPushid)
              setAddonName(content);
              setShow(false)
    
            } 
          });
       
          database.ref().child("Masters").child("Complimentary")
          .once('value', function (snapshot) {
            if (snapshot.exists()) {
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
              setSearchComplimentory(content);
    
            } 
          });

          app.database().ref().child("CloudKitchen")
          .once('value').then(function(snapshot) {
              snapshot.forEach(function(data){
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

      database.ref().child("CloudKitchen").child(search).child("FoodType")
      .once('value', function (snapshot) {
        if (snapshot.exists()) {
          var content = [];
          let pushid = [];
          let name = []
          snapshot.forEach(snap => {
            let val = snap.val()
            pushid.push(val.PushId)
            name.push(val.Name)
            const locker = {
             PushId: val.PushId,
             Name: val.Name
            }
            content.push(locker);
          });
          setFoodType(content)
          setSelectFoodTypeName(name)
          setSelectFoodTypeId(pushid)
        }
    })
    }
    
    
    const onChangeFoodName = (event) =>{
        setFoodName(event.target.value)
        var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(event.target.value);
    return firebaseref.once('value').then(function (snapshot) {
      if (snapshot.exists()) {
        document.getElementById("price").innerHTML = snapshot.val().Settlement;
        setItemName(snapshot.val().Name)
        setDetail(snapshot.val().Details)
        setCuisine(snapshot.val().CuisinePushId)
        setComplimentory(snapshot.val().ComplimentaryName)
        setVeg(snapshot.val().Category)
        setQuantity(snapshot.val().Grams)
        setItemPrice(snapshot.val().Mrp)
        setSettlementPrice(snapshot.val().Price)
        setStartTime(snapshot.val().STime)
        setCloseTime(snapshot.val().ETime)
        setImageAsUrl(snapshot.val().Image)
        firebaseref.child("ADDONS").on('value',function (snap){
          setAddonList([])
            if(snap.exists()){
                let content  = []
                snap.forEach(data1=>{
                   let val = data1.val()
                   let data = data1.key
                   let locker = {
                       data: data,
                       pushid: val 
                   }
                    content.push(locker);
                  });

                  setAddonList(content)

            }
        })
        firebaseref.child("FOODTYPE").on('value',function (snap){
          setFoodTypeList([])
            if(snap.exists()){
                let content  = []
                snap.forEach(data1=>{
                   let val = data1.val()
                   let data = data1.key
                   let locker = {
                       data: data,
                       pushid: val 
                   }
                    content.push(locker);
                  });
                  
                  setFoodTypeList(content)

            }
        })
        if(snapshot.val().Signature==="Yes"){
            setSignatureDish(true)
        }else{
            setSignatureDish(false)

        }


      }})
    }

    const onChangeItemName = (event) =>{
        setItemName(event.target.value)
    }

    const onChangeDetail = (event) =>{
        setDetail(event.target.value)
    }

    const onChangeCusinie = (event) =>{
        setCuisine(event.target.value)
        searchCuisines.filter(item=>{
            if(item.PushId===event.target.value){
              setCuisineName(item.Name)
            }
            return item
          })
    }

    const onChangeAddon = (event) =>{
        setAddon(event.target.value)
    }

    const onChangeAddonPrice = (event) =>{
        setPrice(event.target.value)
    }

    const onClickAddon = (event) =>{
       if(addon===""){
         alert("Select Addon")
       }
       if(price===""){
        alert("Enter Payment")
       }
        let addonItem = []
        
        let locker = {
          data: addon,
          pushid: price
        }
        addonItem.push(locker)
        console.log(addonItem)
        setAddonList(addonItem)
      
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
        var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(foodName);
        firebaseref.on('value',function(snapshot){
          let val = snapshot.val()
          var bprice=+event.target.value;
          var total=+bprice;
          var rcommision=chefCommision[statecid.indexOf(search)];
          var rcommisionrate=(rcommision*total)/100;
          var gst=(rcommisionrate*0.18);
          var ftotal=((+total - +rcommisionrate - +gst)*100)/100;
          document.getElementById("price").innerHTML = ftotal
        })

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
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
      };

    const uploadTask = storage.ref(`FoodItems/${name}`).put(image,metadata)
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
        searchValue.map((item,id)=>{
            if(event.target.id===item.PushId){
                item.Name=event.target.value
            }
            return item
        })
    }

    const onUpdateHandler=(event)=>{
        const pushId=event.target.id
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
    const onClickAddonDelete = (event) =>{
        let pushid = event.target.id
        console.log(pushid)
        app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(foodName).child("ADDONS").child(pushid).remove();

    }
    const onDeleteFoodType = (event) =>{
        let pushid = event.target.id
        app.database().ref().child("CloudKitchen").child("search").child("FoodItems").child(foodName).child("FOODTYPE").child(pushid).remove();

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
<span onClick={onClickAddon}  ><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
<div className="clearfix"></div>
 
</Col>
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
        {addonList.map((item,id)=>{
            return(
            <tr key = {id}>
                <td>{selectAddonName[selectAddonId.indexOf(item.data)]}</td>
        <td>{item.pushid}</td>
        <td><Trash id={item.data} onClick={onClickAddonDelete} size={15}/></td>

            </tr>
            )
        })}
    </tbody>
</Table>
</div>
              </Row>
              <Row className="form-row">
                    <Col className="form-group col-md-3">
                        <label className="form-label">Complimentory</label>
                    <select value={complimentory} onChange={onChangeComplimentory}   className="form-control">
                        <option value="Select">Select</option>
                        {searchComplimentory.map((item,id)=><option key={id} value={item.Name}>{item.Name}</option>)}

                    </select>
                <div className="clearfix"></div>
              </Col>
              </Row>

              <Row className="form-row">
                    <Col className="form-group col-md-3">
                        <label className="form-label">Food Category</label>
                    <select value={foodCategory} onChange={onChangeFoodCategory}  className="form-control">
                        <option value="Select">Select</option>
                        {foodType.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}

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
        {foodTypeList.map((item,id)=>{
            return(
            <tr key = {id}>
                <td>{selectFoodTypeName[selectFoodTypeId.indexOf(item.data)]}</td>
                 <td><Trash id={item.data} onClick={onDeleteFoodType} size={15}/></td>
            </tr>
            )
        })}
    </tbody>
</Table>   
</div>           


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


                    <h5 style={{color:"red"}}>Settlement Amount after deduction :Rs <span style={{color:"red"}} id = "price"></span> </h5>
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
<div className="col-sm-1">
                  {imageAsUrl === "" ?
                    <></> :
                    <a href={imageAsUrl} target="_blank" rel="noopener noreferrer">View</a>}
                </div>
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