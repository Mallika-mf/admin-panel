import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Input} from "reactstrap";
import {Check,Trash} from 'react-feather';
import app from '../../data/base'
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
    const [name, setName] = useState("");
    const history = useHistory()
    const [textName,setTextName] = useState("")
    useEffect(()=>{
        async function fetchMyAPI() {
        var database = await app.database();
        database.ref().child("Masters").child("Cuisines")
        .on('value', function(snapshot){
            if(snapshot.exists()){
                // $('#datatable').empty();
                var content = [];
                
                snapshot.forEach(snap=>{
                    content.push(snap.val());
                  });
                  content.map(item=>setTextName(item.Name))
                  setSearchValue(content);
                  setShow(false)

                }else{
                    const timeout = setTimeout(() => {
                        setShow(false)
                      }, 3000);
                      return ()=>{clearTimeout(timeout);}
    
                }
                   
                });
            }
            fetchMyAPI()
    },[])

    const onChangeHandler=(event)=>{
        setName(event.target.value)
    }

    const onSubmitHandler=(event)=>{
       
        if(name.length===0){
            alert('Enter Locality Name');
            return;
        }
       
      var firebaseref=app.database().ref().child("Masters").child("Cuisines").push();
           firebaseref.child("Name").set(String(name));
           firebaseref.child("PushId").set(firebaseref.getKey());
         
   
   
           Swal.fire({
               title: "Successfully Created!",
               icon: "success",
               confirmButtonText: "Ok" 
              });
              setName("")
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
                    <Input type="text" id="sname"  className="form-control" />
                  </Col>
                  <Col className="col-sm-1 col-md-2">
                    <span id="search" ><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
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
                    <Row style={{margin:"1%"}}>
                    <label className="col-form-label  text-md-right">Select Item</label>
                    <div className="col-sm-9">
                    <select type="text" className="form-control">
                        <option value="Select">Select</option>
                    </select>
                     <div className="clearfix"></div>
                    </div>
                    </Row>
                    <Row className="form-row">

{/* <!-- <div class="form-group col-md-6">
             <label class="form-label">Could Kitchen Name <span style="color: red;">*</span> </label>
             <input type="text" id="kitchenname" class="form-control" placeholder="Cloud Kitchen Name">
              <div class="clearfix"></div>
              </div> --> */}
<Col className="form-group col-md-5">
  <label className="form-label">Item Name <span style={{ color: "red" }}>*</span></label>
  <Input type="text"  className="form-control"  />
  <div className="clearfix"></div>
</Col>
<Col className="form-group col-md-5">
  <label className="form-label">Item Details <span style={{ color: "red" }}>*</span></label>
  <Input type="text" className="form-control"  />
  <div className="clearfix"></div>
</Col>
</Row>
                    <Row style={{margin:"1%"}}>
                    <label className="col-form-label  text-md-right">Cuisine</label>
                    <div className="col-sm-9">
                    <select type="text" className="form-control">
                        <option value="Select">Select</option>
                    </select>
                     <div className="clearfix"></div>
                    </div>
                    </Row>
                    <Row style={{margin:"1%"}}>
                    <label className="col-form-label  text-md-right">Addons</label>
                    <div className="col-sm-9">
                    <select type="text" className="form-control">
                        <option value="Select">Select</option>
                    </select>
                     <div className="clearfix"></div>
                    </div>

                    <label className="col-form-label  text-md-right">Price</label>
                    <div className="col-sm-9">
                    <select type="text" className="form-control">
                        <option value="Select">Select</option>
                    </select>
                     <div className="clearfix"></div>
                    </div>
                    <span id="search" ><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
                    </Row>

                    <Row style={{margin:"1%"}}>
                    <label className="col-form-label  text-md-right">Complimentory</label>
                    <div className="col-sm-9">
                    <select type="text" className="form-control">
                        <option value="Select">Select</option>
                    </select>
                     <div className="clearfix"></div>
                    </div>
                    </Row>

                    <Row style={{margin:"1%"}}>
                    <label className="col-form-label  text-md-right">Food Category</label>
                    <div className="col-sm-9">
                    <select type="text" className="form-control">
                        <option value="Select">Select</option>
                    </select>
                     <div className="clearfix"></div>
                    </div>
                    </Row>

                    <Row style={{margin:"1%"}}>
                    <label className="col-form-label  text-md-right">Veg/NonVeg/Eggeterian</label>
                    <div className="col-sm-9">
                    <select type="text" className="form-control">
                        <option value="Veg">Veg</option>
                        <option value="NonVeg">NonVeg</option>
                        <option value="Egg">Egg</option>
                    </select>
                     <div className="clearfix"></div>
                    </div>
                    </Row>

                    <Row style={{margin:"1%"}}>
                    <label className="col-form-label  text-md-right">Total Gram/Quantity</label>
                    <div className="col-sm-9">
                    <input type="number" className="form-control"/>
                     <div className="clearfix"></div>
                    </div>
                    </Row>

                    <Row style={{margin:"1%"}}>
                    <label className="col-form-label  text-md-right">Price</label>
                    <div className="col-sm-9">
                    <input type="number" className="form-control"/>
                     <div className="clearfix"></div>
                    </div>
                    </Row>
                    <p>Offer Price (Including Tax,Commission,Packing)</p>

                    <h5 style={{color:"red"}}>Settlement Amount after deduction</h5>

                    <Row style={{margin:"1%"}}>
                     <div className="col-sm-10 ml-sm-auto">
                     <button type="submit" id="submit"  className="btn btn-primary">Submit</button>
                     </div>
                   </Row>
                 
                   
                </Container> 
        </Fragment>
            );
        };
        
export default AddFoodItems;