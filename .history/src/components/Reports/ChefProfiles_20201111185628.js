import React, { Fragment,useState } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home, Trash} from 'react-feather';
import {Container,Row,Button} from "reactstrap";
import { Check} from 'react-feather';
import app from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";
import "./ChefProfile.css"
import { TablePagination} from '@material-ui/core'

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const ChefProfile = () => {
    const pages = [5,10,25]
    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(pages[page])
    const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
    const [local,setLocal]= useState("")
    const [show,setShow] = useState(false)
    const [sname,setSname]=useState("")
    const [cityStatus,setCityStatus]=useState("")
    const [foodItems, setFoodItems] = useState([]);
    const [todaysOffer,setTodaysOffer] = useState([])
    const[preOrder,setPreOrders] = useState([])

    const [status,setStatus] = useState(false)
    const [,setDishStatus] = useState(false)
    const [,setFoodStatus] = useState(false)
    const [,setPreOrderStatus] = useState(false)
    const [price,setPrice] = useState("")
    const [offerPrice,setOfferPrice] = useState("")
    const [picImage,setPicImage] = useState('')

   const onChangeSearchHandler=(event)=>{
       setSname(event.target.value)
   }
   const onClickSearchHandler=(event)=>{
     console.log("search is enterig")
     setShow(true)
    var database = app.database();
    database.ref().child("CloudKitchen")
    .orderByChild("UserId").equalTo(sname)
    .on('value', function(snapshot){
        setFoodItems([])
        if(snapshot.exists()){
            var content = [];

            snapshot.forEach(function(data){
                console.log(data.val())
                let userVal = data.val();
                // let image = userVal.PP;
                let openTime = userVal.Open;
                let closeTime = userVal.Close;
                let name = userVal.Name;
                setCityStatus(userVal.City)
                setLocal(userVal.Local)
                if(userVal.Status==="Active"){
                    setStatus(true)
                  }else{
                    setStatus(false)
                 }
                document.getElementById("chefName").innerHTML = name;
                document.getElementById("openTime").innerHTML = openTime;
                document.getElementById("closeTime").innerHTML = closeTime;
                // document.getElementById("view").innerHTML = "view";


                 setPicImage(userVal.PP)
                data.child("FoodItems").forEach(childSnapshot => {
                    var foodVal = childSnapshot.val()
                    console.log(data.val())
                   
                    content.push(foodVal)
                })
            })
            content.reverse()
            content.map(item=>{
                if(item.Status==="Active"){
                    setFoodStatus(true)
                  }else{
                    setFoodStatus(false)
                 }
                 return item;
                })
            setFoodItems(content)
            setShow(false)

        }else{
            const timeout = setTimeout(() => {
                setShow(false)
              }, 3000);
              return ()=>{clearTimeout(timeout);}

        }
    })
   
   function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

var date = new Date()
    var todaysDate = formatDate(date)
    console.log(todaysDate)
     database = app.database();
    database.ref().child("TodaysOffer").child(todaysDate)
    .orderByChild("Chef").equalTo(sname)
    .on('value', function(snapshot){
        setTodaysOffer([])
        if(snapshot.exists()){
            var content = [];
            
            snapshot.forEach(function(data){
                console.log(data.val())
                console.log(todaysDate)
                var todaysOfferVal = data.val();
                
                if(todaysOfferVal.Status==="Active"){
                    setDishStatus(true)
                  }else{
                    setDishStatus(false)
                 }
                content.push(todaysOfferVal)
            })
            content.reverse()
            // content.map()
            setTodaysOffer(content)
            setShow(false)

        }else{
            const timeout = setTimeout(() => {
                setShow(false)
              }, 3000);
              return ()=>{clearTimeout(timeout);}

        }
    })
     database = app.database();
    database.ref().child("Preorders")
    .orderByChild("Chef").equalTo(sname)
    .on('value', function(snapshot){
        setPreOrders([])
        if(snapshot.exists()){
            var content = [];
           
            snapshot.forEach(function(data){
                console.log(data.val())
                var preOrderVal = data.val();
               
                content.push(preOrderVal)
            })
            content.reverse()
           content.map(item=>{
            if(item.Status==="Active"){
                setPreOrderStatus(true)
              }else{
                setPreOrderStatus(false)
             }
             return item;
           })
            setPreOrders(content)
            setShow(false)

        }else{
            const timeout = setTimeout(() => {
                setShow(false)
              }, 3000);
              return ()=>{clearTimeout(timeout);}

        }
    })
}
const onChangeStatusHandler=(event)=>{
    if(sname===""){
        alert("Please enter Chef Id")
    }
    setStatus(event.target.checked)
    if(local==="Yes"&& local!== undefined){
        if(event.target.checked===true){
            var database = app.database();
            database.ref().child("CloudKitchen").child(sname).child("Status")
            .set("Active")
            console.log(local)
            console.log(cityStatus)
            database.ref().child("LocalFood").child(cityStatus).child(sname).child("Status").set("Active")
        }else{
             database = app.database();
            database.ref().child("CloudKitchen").child(sname).child("Status")
            .set("InActive")
            database.ref().child("LocalFood").child(cityStatus).child(sname).child("Status").set("InActive")
    
            }
    }else{
        if(event.target.checked===true){
             database = app.database();
            database.ref().child("CloudKitchen").child(sname).child("Status")
            .set("Active")
            console.log(cityStatus)
            database.ref().child(cityStatus).child(sname).child("Status").set("Active")
        }else{
             database = app.database();
            database.ref().child("CloudKitchen").child(sname).child("Status")
            .set("InActive")
            database.ref().child(cityStatus).child(sname).child("Status").set("InActive")
    
            }
    }

    
}

const onChangeDishStatus=(event)=>{
       
   function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

var date = new Date()
    var todaysDate = formatDate(date)
   let pushid= event.target.id
    setDishStatus(event.target.checked)
    if(event.target.checked===true){
        var database = app.database();
        database.ref().child("TodaysOffer").child(todaysDate).child(pushid).child("Status")
        .set("Active")
    }else{
         database = app.database();
        database.ref().child("TodaysOffer").child(todaysDate).child(pushid).child("Status")
        .set("InActive")
        }
}

const onChangeFoodStatus=(event)=>{
    let pushid = event.target.id
    setFoodStatus(event.target.checked)
    if(event.target.checked===true){
        var database = app.database();
        database.ref().child("CloudKitchen").child(sname).child("FoodItems").child(pushid).child("Status")
        .set("Active")
    }else{
         database = app.database();
        database.ref().child("CloudKitchen").child(sname).child("FoodItems").child(pushid).child("Status")
        .set("InActive")
        }
}

const onChangePreOrderStatus=(event)=>{
    let pushid = event.target.id
    setPreOrderStatus(event.target.checked)
    console.log(event.target.checked)
    if(event.target.checked===true){
        var database = app.database();
        database.ref().child("Preorders").child(pushid).child("Status")
        .set("Active")
    }else{
         database = app.database();
        database.ref().child("Preorders").child(pushid).child("Status")
        .set("InActive")
        }
}
const onClickDeleteFoodItemHandler=(event)=>{
    setShow(true)

    var pushId = event.target.id
    Swal.fire({
        title: "Are you sure want to delete this food item?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        cancelButtonColor:'gray'
      })
      .then((willDelete) => {
        if (willDelete.value) {
            app.database().ref().child("CloudKitchen").child(sname).child("FoodItems").child(pushId).remove();      
    Swal.fire({
        title: "Deleted Successfully!",
        text: "",
        icon: "success",
    });
}

});
var database = app.database();
database.ref().child("CloudKitchen")
.orderByChild("UserId").equalTo(sname)
.on('value', function(snapshot){
    setFoodItems([])
    if(snapshot.exists()){
        var content = [];
        
        snapshot.forEach(function(data){
            if(data.hasChild("UserId")){
            var val = data.val();
            // let image = val.PP;
            let openTime = val.Open;
            let closeTime = val.Close;
            let name = val.Name;
            document.getElementById("chefName").innerHTML = name;
            document.getElementById("openTime").innerHTML = openTime;
            document.getElementById("closeTime").innerHTML = closeTime;
            // document.getElementById("view").innerHTML = "view";


            setPicImage(val.PP)

            data.child("FoodItems").forEach(childSnapshot => {
                var val = childSnapshot.val()
                content.push(val)
            })
        }
        })
        content.reverse()
        setFoodItems(content)
        setShow(false)

    }else{
        const timeout = setTimeout(() => {
            setShow(false)
          }, 3000);
          return ()=>{clearTimeout(timeout);}

    }
})
}
const onClickDeleteTodaysOfferHandler=(event)=>{
    setShow(true)
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    var date = new Date()
        var todaysDate = formatDate(date)
    var pushId = event.target.id
    Swal.fire({
        title: "Are you sure want to delete this food item?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        cancelButtonColor:'gray'
      })
      .then((willDelete) => {
        if (willDelete.value) {
            app.database().ref().child("TodaysOffer").child(todaysDate).child(pushId).remove();      
    Swal.fire({
        title: "Deleted Successfully!",
        text: "",
        icon: "success",
    });
}

});

var database = app.database();
database.ref().child("TodaysOffer").child(todaysDate)
.orderByChild("Chef").equalTo(sname)
.on('value', function(snapshot){
    setTodaysOffer([])
    if(snapshot.exists()){
        var content = [];
        
        snapshot.forEach(function(data){
            var val = data.val();
            content.push(val)
        })
        content.reverse()
        setTodaysOffer(content)
        setShow(false)

    }else{
        const timeout = setTimeout(() => {
            setShow(false)
          }, 3000);
          return ()=>{clearTimeout(timeout);}

    }
})
}
const onClickDeletePreOrderHandler=(event)=>{
    setShow(true)

    var pushId = event.target.id
    Swal.fire({
        title: "Are you sure want to delete this food item?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        cancelButtonColor:'gray'
      })
      .then((willDelete) => {
        if (willDelete.value) {
            app.database().ref().child("Preorders").child(pushId).remove();      
    Swal.fire({
        title: "Deleted Successfully!",
        text: "",
        icon: "success",
    });
}

});
var database = app.database();
database.ref().child("Preorders")
.orderByChild("Chef").equalTo(sname)
.once('value', function(snapshot){
    setPreOrders([])
    if(snapshot.exists()){
        var content = [];
        
        snapshot.forEach(function(data){
            var val = data.val();
            content.push(val)
        })
        content.reverse()
        setPreOrders(content)
        setShow(false)

    }else{
        const timeout = setTimeout(() => {
            setShow(false)
          }, 3000);
          return ()=>{clearTimeout(timeout);}

    }
})
}
     
const onChangePriceHandler=(event)=>{
    setPrice(event.target.value)
    foodItems.map((item,id)=>{
        if(event.target.id===item.PushId){
            item.Price=event.target.value
        }
        return item;
    })
}

const onSaveHandler=(event)=>{
    let pushId = event.target.id
    
    app.database().ref().child("CloudKitchen").child(sname).child("FoodItems").child(pushId).child("Price").set(price)
    Swal.fire({
        title: "Successfully Save!",
        icon: "success",
        confirmButtonText: "Ok" 
       });
    
}
const onChangeOfferPriceHandler=(event)=>{
    setOfferPrice(event.target.value)
    todaysOffer.map((item)=>{
        if(event.target.id===item.PushId){
            item.Price=event.target.value
        }
        return item;
    })
}

const onOfferSaveHandler=(event)=>{
    let pushId = event.target.id
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    var date = new Date()
    var todaysDate = formatDate(date)
    app.database().ref().child("TodaysOffer").child(todaysDate).child(pushId).child("Price").set(offerPrice)
        Swal.fire({
        title: "Successfully Save!",
        icon: "success",
        confirmButtonText: "Ok" 
       });
}
const imageDeleteHandler=(event)=>{
    let userid = event.target.id
    console.log(userid)

    console.log(sname)
    console.log(local)
    console.log(cityStatus)

    if(local === "Yes" && local !== undefined){
        app.database().ref().child("CloudKitchen").child(userid).child("PP").set("")
        app.database().ref().child("LocalFood").child(cityStatus).child(sname).child("PP").set("")
    }else
    app.database().ref().child("CloudKitchen").child(userid).child("PP").set("")
    app.database().ref().child(cityStatus).child(sname).child("PP").set("")
}
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Report" title="Chef Profile Report"/>
            <Container fluid={true}>
                <div style={{ position: "relative"}}>
                 <label style={{position:"relative" ,marginLeft:"90%"}} className="switch">
                <input  type="checkbox" checked={status} onChange={onChangeStatusHandler}/>
                <span className="slider round"></span>
                </label>
                </div>
                <Row>
               {/* <Col sm ="12">
               <CardHeader>
                                <h5>Pickup Order Report</h5>
                                {/* <span> Use a className <code> table </code> to any table.</span> */}
                            {/* </CardHeader>
               </Col> */} 
                            <div className="col-md-12">
                        
                                <div className="card mb-4">
                                        <h5 className="card-header">Chef Profiles</h5>
                                    
                                                <div className="card-body">
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                             <label className="form-label">Chef ID</label>
                                                             <div className="row">
                                                                 <div className="col-lg-6 col-md-5 col-sm-5">
                                                                       <input type="text" id="sname" value={sname} onChange={onChangeSearchHandler} className="form-control"/>
                                                             </div>
                                                             <div className="col-sm-1 col-md-2">
                                                                 <span id="search" onClick={onClickSearchHandler} ><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
                                                             </div>
                                                             </div> 
          
                                                              
                                                             <div className="clearfix"></div>
                                                         </div>
                                                     </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-3">
                                                            <label className="form-label">Chef Name: <span id = "chefName"></span></label>
                                                        </div>
                                                        <div className="form-group col-md-3">{console.log(picImage)}
                                                         <label className="form-label">Image: {picImage===""||picImage===null||picImage===undefined?<></>:<><a href={picImage} target="_blank" rel="noopener noreferrer" >View</a><Button style={{marginLeft:"5px"}}><Trash id={sname} size={15} onClick={imageDeleteHandler}/></Button></>}</label>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label className="form-label">Open Time: <span id = "openTime"></span></label>
                                                        </div>
                                                        
                                                        <div className="form-group col-md-3">
                                                            <label className="form-label">Close Time: <span id = "closeTime"></span></label>

                                                        </div>
                                                   </div>
                                                        <h6 className="card-header" style={{textAlign: "center", color: "#ff4a00"}}><b>Food Items</b></h6>
                                                        <div id="tablepdf">
                                                            <div className="table-responsive text-nowrap">
                                                             <table className="datatables-demo table table-striped table-bordered" id="data-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Dish Image</th>
                                                                        <th>Food Name</th>
                                                                        <th>Category</th>
                                                                        <th>Cuisine Name</th>
                                                                        <th>Description</th>
                                                                        <th>Price</th>
                                                                        <th>Save</th>
                                                                        <th>Start Time</th>
                                                                        <th>End Time</th>
                                                                        <th>Signature</th>
                                                                        <th>Status</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="datatable-food">
                                                                    {foodItems.map((items,id)=>{
                                                                        return(
                                                                            <tr key={id}>
                                                                            <td style={{ fontSize: "25px", fontWeight: "bold"}}><a href={items.Image} target="_blank" rel="noopener noreferrer"><button type="button"  className="btn btn-success btn-md">{"View"}</button></a></td>
                                                                            <td>{items.Name}</td>
                                                                            <td>{items.Category}</td>
                                                                            <td>{items.CuisineName}</td>
                                                                            <td>{items.Details}</td>
                                                                            <td><input type="number" id={items.PushId} value={items.Price} onChange={onChangePriceHandler} className="price"  /></td>
                                                                            <td><Button type="button" className="warning"><Check id={items.PushId} onClick={onSaveHandler} size={20}/></Button></td>
                                                                            <td>{items.STime}</td>
                                                                            <td>{items.ETime}</td>
                                                                            <td>{items.Signature}</td>
                                                                            {items.Status==="Active"?
                                                                            <td><div style={{position:"relative",maxWidth:"50%",maxHeight:"50%"}}>
                                                                            <label style={{position:"relative" ,marginLeft:"20%"}} className="switch">
                                                                            <input  type="checkbox" id={items.PushId}  checked={true} onChange={onChangeFoodStatus}/>
                                                                            <span className="slider round"></span>
                                                                            </label>
                                                                            </div>
                                                                            </td>:
                                                                             <td><div style={{position:"relative",maxWidth:"50%",maxHeight:"50%"}}>
                                                                             <label style={{position:"relative" ,marginLeft:"20%"}} className="switch">
                                                                             <input  type="checkbox" id={items.PushId}  checked={false} onChange={onChangeFoodStatus}/>
                                                                             <span className="slider round"></span>
                                                                             </label>
                                                                             </div>
                                                                             </td>
                                                                        }
                                                                            
                                                                            <td style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={items.PushId} onClick={onClickDeleteFoodItemHandler} className="btn btn-info btn-md">{"Delete"}</button></td>
                                                                            </tr>
                                                                             
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            </div>
                                                            </div>

                                                   <div className="row">
                                                       <div className="col-md-6">
                                                        <h6 className="card-header" style={{textAlign: "center", color:" #ff4a00"}}><b>Todays Offer</b></h6>
                                                        <div id="tablepdf">
                                                            <div className="table-responsive text-nowrap">
                                                                <table className="datatables-demo table table-striped table-bordered" id="data-table" style = {{display:"block", height:"300px", overflow:"auto"}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Category</th>
                                                                        <th>Cuisine Name</th>
                                                                        <th>Description</th>
                                                                        <th>Price</th>
                                                                        <th>Save</th>
                                                                        <th>Start Time</th>
                                                                        <th>End Time</th>
                                                                        <th>Status</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="datatable-today">
                                                                {todaysOffer.map((items,id)=>{

                                                                        return(
                                                                            <tr key={id}>
                                                                                {items!==undefined?
                                                                                <>
                                                                                  <td>{items.Name}</td>
                                                                                  <td>{items.Category}</td>
                                                                                  <td>{items.CuisineName}</td>
                                                                                  <td>{items.Details}</td>
                                                                                  <td><input type="number" id={items.PushId} value={items.Price} onChange={onChangeOfferPriceHandler} className="price"  /></td>
                                                                                 <td><Button type="button" className="warning"><Check id={items.PushId} onClick={onOfferSaveHandler} size={20}/></Button></td>
                                                                                  <td>{items.STime}</td>
                                                                                 <td>{items.ETime}</td>
                                                                                 {items.Status==="Active"?
                                                                                  <td><div style={{position:"relative",maxWidth:"50%",maxHeight:"50%"}}>
                                                                                  <label style={{position:"relative" ,marginLeft:"20%"}} className="switch">
                                                                                  <input  type="checkbox" id={items.PushId}  checked={true} onChange={onChangeDishStatus}/>
                                                                                  <span className="slider round"></span>
                                                                                  </label>
                                                                                  </div>
                                                                                  </td>:
                                                                                  <td><div style={{position:"relative",maxWidth:"50%",maxHeight:"50%"}}>
                                                                                  <label style={{position:"relative" ,marginLeft:"20%"}} className="switch">
                                                                                  <input  type="checkbox" id={items.PushId}  checked={false} onChange={onChangeDishStatus}/>
                                                                                  <span className="slider round"></span>
                                                                                  </label>
                                                                                  </div>
                                                                                  </td>
                                                                                }
                                                                                
                                                                                 <td style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><button type="button" id={items.PushId} onClick={onClickDeleteTodaysOfferHandler} className="btn btn-info btn-md">{"Delete"}</button></td>
                                                                                </>
                                                                                :
                                                                                <td>{"Not available"}</td>}

                                                                            </tr>
                                                                             
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            </div>
                                                            </div>
                                                       </div>

                                                       <div className="col-md-6">
                                                        <h6 className="card-header" style={{textAlign: "center", color: "#ff4a00"}}><b>Preorders</b></h6>
                                                        <div id="tablepdf">
                                                            <div className="table-responsive text-nowrap">
                                                                <table className="datatables-demo table table-striped table-bordered" id="data-table" style = {{display:"block",height:"300px", overflow:"auto"}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Chef Name</th>
                                                                        <th>Item Name</th>
                                                                        <th>Delivery Date</th>
                                                                        <th>Delivery End Date</th>
                                                                        <th>Preorder Date</th>
                                                                        <th>Settlement</th>
                                                                        <th>Status</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="datatable-pre">
                                                                {preOrder.map((items,id)=>{
                                                                   
                                                                        return(
                                                                            <tr key={id}>
                                                                            <td>{items.ChefName}</td>
                                                                            <td>{items.Name}</td>
                                                                            <td>{items.OrderDate}</td>
                                                                            <td>{items.OrderEndDate}</td>
                                                                            <td>{items.StartDate}</td>
                                                                            <td>{items.Settlement}</td>
                                                                            {items.Status==="Active"?
                                                                            <td><div style={{position:"relative",maxWidth:"50%",maxHeight:"50%"}}>
                                                                            <label style={{position:"relative" ,marginLeft:"20%"}} className="switch">
                                                                            <input  type="checkbox" id={items.PushId}  checked={true} onChange={onChangePreOrderStatus}/>
                                                                            <span className="slider round"></span>
                                                                            </label>
                                                                            </div>
                                                                            </td>:
                                                                            <td><div style={{position:"relative",maxWidth:"50%",maxHeight:"50%"}}>
                                                                            <label style={{position:"relative" ,marginLeft:"20%"}} className="switch">
                                                                            <input  type="checkbox" id={items.PushId}  checked={false} onChange={onChangePreOrderStatus}/>
                                                                            <span className="slider round"></span>
                                                                            </label>
                                                                            </div>
                                                                            </td>
                                                                        }
                                                                            
                                                                            <td style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={items.PushId} onClick={onClickDeletePreOrderHandler} className="btn btn-info btn-md">{"Delete"}</button></td>
                                                                            </tr>
                                                                             
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            </div>
                                                            </div>
                                                       </div>
                                                   </div>
                                        

                                    </div>

                                

                                </div>

                            </div>


                        </Row>
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
        
export default ChefProfile;