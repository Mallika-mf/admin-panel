import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import ChartistGraph from 'react-chartist';
import Chart from 'react-apexcharts'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, CardFooter } from 'reactstrap'
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent} from 'react-feather';
import { StepAxis } from 'chartist';
import app from '../../data/base'

const PartnerRegistration = () => {
const [sname,setSname] = useState("")
const [promoCode,setPromoCode] = useState("")
const [disc,setDisc] = useState("")
const [status,setStatus] = useState("")
const [pushId,setPushId] = useState([])
const [promoo,setPromo] = useState([])
const [show,setShow] = useState(false)

var pushid=[];
var promo=[];
    useEffect(()=>{

        promo=[];
        pushid=[];
        app.database().ref().child("Promocode").child("Chef")
        .once('value').then(function(snapshot) {
            snapshot.forEach(function(data){
                var val = data.val(); 
                if(val.UserId!=""){
                    pushid.push(val.PushId);
                    promo.push(val.PromoCode);
                }
            });
            setPushId(pushid)
            setPromo(promo)
            // $("#sname").autocomplete({
            //     source: promo
            //   });
        });
},[])

const nameChangeHandler=(event)=>{
 setSname(event.target.value)
}
const onChangeDiscountHandler=(event)=>{
 setDisc(event.target.value)
}

const promoCodeChangeHandler=(event)=>{
 setPromoCode(event.target.value)
}
   
const statusChangeHandler=(event)=>{
 setStatus(event.target.value)
}

const onSearchSubmitHnadler=(event)=>{
    try{
    if(sname==""){
        alert("Enter Promocode Name");
        return;
    }
    // for(var i=0;i<pushId.length;i++) {
    //     if(sname!==promoo[i])
    //     {
    //         alert("Promo Code not Exists!!!");
    //         return;
    //     }
    //   }
    app.database().ref().child("Promocode").child("Chef").child(pushId[promoo.indexOf(sname)])
    .once('value').then(function(snapshot) {
        if(snapshot.exists()){
            setPromoCode(snapshot.val().PromoCode)
            setDisc(snapshot.val().Disc) 
            setStatus(snapshot.val().Status)        
        }
    });
   
    setShow(true)
}catch(err){
    alert("Promo Code not Exists!!!")
}
}

const onSubmitHandler=(event)=>{
    if(promoCode==""){
        alert('Enter PromoCode');
        return;
    }

    if(disc=="0"){
        alert('Enter Discount Percentage');
        return;
    }


    for(var i=0;i<pushId.length;i++) {
        if(promoCode===promoo[i])
        {
            alert("Promo Code already Exists!!!");
            return;
        }
      }
      


    var firebaseref=app.database().ref().child("Promocode").child("Chef").push();
    firebaseref.child("PushId").set(firebaseref.getKey());
    firebaseref.child("PromoCode").set(String(promoCode.toUpperCase()));
    firebaseref.child("Disc").set(String(disc));
    firebaseref.child("Status").set(String(status));


    alert("Successfully Created!!");
   setPromoCode("")
    setDisc("")
   
    promo=[];
    pushid=[];
    app.database().ref().child("Promocode").child("Chef")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            if(val.UserId!=""){
                pushid.push(val.PushId);
                promo.push(val.PromoCode);
            }
        });
        setPushId(pushid)
        setPromo(promo)
        // $("#sname").autocomplete({
        //     source: promo
        //   });
    });
    setShow(false)
}

const onUpdateHandler=(event)=>{
    if(promoCode==""){
        alert('Enter PromoCode');
        return;
    }

    if(disc=="0"){
        alert('Enter Discount Percentage');
        return;
    }



    var firebaseref=app.database().ref().child("Promocode").child("Chef").child(pushId[promoo.indexOf(sname)]);
    firebaseref.child("PushId").set(firebaseref.getKey());
    firebaseref.child("PromoCode").set(String(promoCode.toUpperCase()));
    firebaseref.child("Disc").set(String(disc));
    firebaseref.child("Status").set(String(status));


    alert("Successfully Updated!!");
    setPromoCode("")
   setDisc("")

    promo=[];
    pushid=[];
    app.database().ref().child("Promocode").child("Chef")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            if(val.UserId!=""){
                pushid.push(val.PushId);
                promo.push(val.PromoCode);
            }
        });
        // $("#sname").autocomplete({
        //     source: promo
        //   });
        setPromo(promo)
        setPushId(pushid)
    });
    setShow(false)
}

const DeleteHandler=(event)=>{
    if(sname == ""){
        alert("Select PromoCode to delete");
        return;
    }


    app.database().ref().child("Promocode").child("Chef").child(pushId[promoo.indexOf(sname)]).remove();
   


    alert("Successfully Deleted!!");
    alert("Successfully Updated!!");
    setPromoCode("");
    setDisc("")
   
    promo=[];
    pushid=[];
    app.database().ref().child("Promocode").child("Chef")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            if(val.UserId!=""){
                pushid.push(val.PushId);
                promo.push(val.PromoCode);
            }
        });
        // $("#sname").autocomplete({
        //     source: promo
        //   });
        setPushId(pushid)
        setPromo(promo)
    });
    setShow(false)
    
}
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Create PromoCode"/> 
        <Container fluid={true}>
        <div className="row">
                            <div className="col-md-12">
                        
                                <div className="card mb-4">
                                        <h6 color="black" className="card-header">Create Promocode</h6>
                                    
                                                <div className="card-body">


                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <div className="clearfix"></div>
                                                            <h5 color="black">Alter PromoCode</h5>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                       <div className="form-group col-md-6">
                                                            <label className="form-label">Enter PromoCode</label>
                                                            <div className="row">
                                                                <div className="col-lg-6 col-md-5 col-sm-5">
                                                                      <input type="text" id="sname" value={sname} onChange={nameChangeHandler} className="form-control"/>
                                                            </div>
                                                            <div className="col-sm-1 col-md-2">
                                                                <span id="search" onClick={onSearchSubmitHnadler}><img src="https://img.icons8.com/ios-filled/24/000000/search.png"/></span>
                                                            </div>
                                                            </div> 
         
                                                             
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>


                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <div className="clearfix"></div>
                                                            <h5>PromoCode Details</h5>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>


                                                    <div className="form-group row">
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label">Promocode <span style={{color: "red"}}>*</span></label>
                                                            <input type="text" id="t3"  value={promoCode} onChange={promoCodeChangeHandler} style={{textTransform:"uppercase"}} className="form-control" placeholder="Enter Promocode"/>
                                                            <div className="clearfix"></div>
                                                        </div>
        
                                                    </div>

                                                    <div className="form-group row">
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label">Discount Percentage <span style={{color: "red"}}>*</span></label>
                                                            <input type="number" id="t4" className="form-control" value={disc} onChange={onChangeDiscountHandler} placeholder="Discount Percentage"/>
                                                            <div className="clearfix"></div>
                                                        </div>
        
                                                    </div>
                                                    <div className="form-row">
                                               
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label">Status <span style={{color: "red"}}>*</span></label>
                                                           <select className="form-control" value={status} onChange={statusChangeHandler} id="t7">
                                                               <option value="Active">Active</option>
                                                               <option value="InActive">InActive</option>
                                                           </select>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                      
                                                    </div>
                                                    <div className="form-group row">
                                                          { show==false?
                                                            <div className="col-sm-12 ml-sm-auto">
                                                                 <button type="submit" id="submit" className="btn btn-primary" onClick={onSubmitHandler}>Submit</button>
                                                            </div>:
                                                        <div className="col-sm-12 ml-sm-auto">
                                                            
                                                            <button type="submit" id="update" className="btn btn-primary" onClick={onUpdateHandler} >Update</button>
                                                                <button type="submit" id="delete" className="btn btn-primary" onClick={DeleteHandler} >Delete</button>
                                                        </div>
                                                     }
                                                        </div>
                                        

                                    </div>

                                

                                </div>

                            </div>


                        </div>
        </Container>
        </Fragment>
    )
}
export default PartnerRegistration;