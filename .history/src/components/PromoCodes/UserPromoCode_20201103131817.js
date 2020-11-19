import React, {useState,Fragment, useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'

import {Home} from 'react-feather';
import { Container } from 'reactstrap'
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent} from 'react-feather';
import app from '../../data/base'
import { set } from 'lodash';

const UserPromoCodes = () => {
    const [sname,setSname] = useState("")
    const[city,setCity] = useState("")
const [promoCode,setPromoCode] = useState("")
const [promoCodeValid,setPromoCodeValid] = useState("")
const [promoCodeRedeem,setPromoCodeRedeem] = useState("")

const [disc,setDisc] = useState("")
const [status,setStatus] = useState("Active")
const [pushId,setPushId] = useState([])
const [promoo,setPromo] = useState([])
const [user,setUser] = useState([])
const [typeSelect,setTypeSelect] = useState("")
const [count,setCount] = useState(0)

const [show,setShow] = useState(false)

var pushid=[];
var promo=[];
var cityname=[];
// var selectedpushid=""; 
// var ppushid=[];
    useEffect(()=>{
        app.database().ref().child("Masters").child("City")
        .orderByChild("Status").equalTo("Active")
        .once('value').then(function(snapshot) {
            var content = []; 
            snapshot.forEach(snap=>{
                content.push(snap.val());
                pushid.push(snap.val().PushId);
                cityname.push(snap.val().Name)
                 
              });
            //   setPushID(pushid)
            //   setCityName(cityname)
              setUser(content);
            })
        var promo=[];
        var ppushid=[];
        app.database().ref().child("Promocode").child("User")
        .once('value').then(function(snapshot) {
            snapshot.forEach(function(data){
                var val = data.val(); 
                if(val.UserId!==""){
                    promo.push(val.Name);
                    ppushid.push(val.PushId)
                }
            });
            setPromo(promo)
            setPushId(ppushid)
          
        });
},[])

const nameChangeHandler=(event)=>{
console.log(event.target.value)
setSname(event.target.value)
 
}
const onChangeSelectionBox = (event) =>{
    setTypeSelect(event.target.value)
}
const onChangeCountValue = (event) =>{
    setCount(event.target.value)
}
const cityChangeHandler=(event)=>{
    setCity(event.target.value)
   }

const onChangeDiscountHandler=(event)=>{
 setDisc(event.target.value)
}

const promoCodeChangeHandler=(event)=>{
 setPromoCode(event.target.value)
}

const validPromoCodeChangeHandler=(event)=>{
    setPromoCodeValid(event.target.value)
   }

   const redeemPromoCodeChangeHandler=(event)=>{
    setPromoCodeRedeem(event.target.value)
   }
   
const statusChangeHandler=(event)=>{
 setStatus(event.target.value)
}

const onSearchSubmitHnadler=(event)=>{
    try{
    console.log(sname)
    if(sname===""){
        alert("Enter Promocode Name");
        return;
    }
    // // for(var i=0;i<pushId.length;i++) {
    //     if(sname!====app.database().ref().child("Promocode").child("User").child(pushId[promoo.indexOf(sname)]))
    //     {
    //         alert("Promo Code not Exists!!!");
    //         return;
    //     }
    // //   }
      
      app.database().ref().child("Promocode").child("User").child(pushId[promoo.indexOf(sname)])
    .once('value').then(function(snapshot) {
        if(snapshot.exists()){
            setPromoCode(snapshot.val().Name)
            setDisc(snapshot.val().Discount) 
            setPromoCodeValid(snapshot.val().MinAmount)
            setPromoCodeRedeem(snapshot.val().MaxAmount)
            setStatus(snapshot.val().Status) 
            setCity(snapshot.val().City) 
            setCount(snapshot.val().Count)
            setTypeSelect(snapshot.val().Type)      
        }
    });
    
    // cityName[pushID.indexOf
    setShow(true)
}catch(err){
    alert("Promo Code not Exists!!!")
}
}

const onSubmitHandler=(event)=>{
    if(city==="Select"){
        alert('Select City');
        return;
    }
    if(promoCode===""){
        alert('Enter PromoCode');
        return;
    }

    if(disc==="0"){
        alert('Enter Discount Percentage');
        return;
    }

    if(promoCodeRedeem==="0"){
        alert('Enter Maximum Amount');
        return;
    }

    if(promoCodeValid==="0"){
        alert('Enter Minimum Amount');
        return;
    }
    if(typeSelect==="Select"){
        alert("Please Select Type")
        return;
    }
    if(count === ""){
        alert("Please Enter Count Value ")
        return;
    }
      


    var firebaseref=app.database().ref().child("Promocode").child("User").push();
    firebaseref.child("PushId").set(firebaseref.getKey());
    firebaseref.child("Name").set(String(promoCode.toUpperCase()));
    firebaseref.child("Discount").set(String(disc));
    firebaseref.child("MinAmount").set(String(promoCodeValid));
    firebaseref.child("MaxAmount").set(String(promoCodeRedeem));
    firebaseref.child("Status").set(String(status));
    firebaseref.child("City").set(String(city));
    firebaseref.child("Type").set(String(typeSelect));
    firebaseref.child("Count").set(String(count));


    alert("Successfully Created!!");
   setPromoCode("")
    setDisc("")
    setPromoCodeValid("")
    setPromoCodeRedeem("")
    setCount(0)
    setTypeSelect("Select")
    promo=[];
    pushid=[];
    app.database().ref().child("Promocode").child("Name")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            if(val.UserId!==""){
                pushid.push(val.PushId);
                promo.push(val.Name);
            }
        });
        setPushId(pushid)
        setPromo(promo)
    })
    setShow(false)
}

const onUpdateHandler=(event)=>{
    if(city==="Select"){
        alert('Select City');
        return;
    }
    if(promoCode===""){
        alert('Enter PromoCode');
        return;
    }

    if(disc==="0"){
        alert('Enter Discount Percentage');
        return;
    }

    if(promoCodeRedeem==="0"){
        alert('Enter Maximum Amount');
        return;
    }
    if(typeSelect==="Select"){
        alert("Please Select Type")
        return;
    }
    if(count ==="" ){
        alert("Please Enter Count Value ")
        return;
    }
    if(promoCodeValid==="0"){
        alert('Enter Minimum Amount');

        return;
    }
    if(sname === ""){
        alert("Please enter a promocode");
        return;
    }


    var firebaseref=app.database().ref().child("Promocode").child("User").child(pushId[promoo.indexOf(sname)])
    firebaseref.child("PushId").set(firebaseref.getKey());
    firebaseref.child("Name").set(String(promoCode.toUpperCase()));
    firebaseref.child("Discount").set(String(disc));
    firebaseref.child("MinAmount").set(String(promoCodeValid));
    firebaseref.child("MaxAmount").set(String(promoCodeRedeem));
    firebaseref.child("Status").set(String(status));
    firebaseref.child("City").set(String(city));
    firebaseref.child("Type").set(String(typeSelect));
    firebaseref.child("Count").set(String(count));


    alert("Successfully Updated!!");
    setPromoCode("")
    setDisc("")
    setPromoCodeValid("")
    setPromoCodeRedeem("")
   setTypeSelect("Select")
   setCount(0)
    promo=[];
    pushid=[];
    app.database().ref().child("Promocode").child("User")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            if(val.UserId!==""){
                pushid.push(val.PushId);
                promo.push(val.Name);
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

const DeleteHandler=(event)=>{
    if(sname === ""){
        alert("Select PromoCode to delete");
        return;
    }


    app.database().ref().child("Promocode").child("User").child(pushId[promoo.indexOf(sname)]).remove();
   


    alert("Successfully Deleted!!");
    setPromoCode("")
    setDisc("")
    setPromoCodeValid("")
    setPromoCodeRedeem("")
   setCity("Select")
   setTypeSelect("Select")
   setCount(0)

   promo=[];
   pushid=[];
   app.database().ref().child("Promocode").child("User")
   .once('value').then(function(snapshot) {
       snapshot.forEach(function(data){
           var val = data.val(); 
           if(val.UserId!==""){
               pushid.push(val.PushId);
               promo.push(val.Name);
           }
       });
       setPushId(pushid)
       setPromo(promo)
   })
    setShow(false)
}
   
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Create PromoCode"/> 
        <Container fluid={true}>
        <div className="row">
                            <div className="col-md-12">
                        
                                <div className="card mb-4">
                                        <h6 className="card-header">Create Promocode</h6>
                                    
                                                <div className="card-body">


                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <div className="clearfix"></div>
                                                            <h4>Alter PromoCode</h4>
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
                                                                <span id="search"  onClick={onSearchSubmitHnadler}><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt=""/></span>
                                                            </div>
                                                            </div> 
         
                                                             
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>


                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <div className="clearfix"></div>
                                                            <h4>PromoCode Details</h4>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                          
                                                    <div className="form-row">
                                               
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label">City <span style={{color: "red"}}>*</span></label>
                                                            <select id="city100" value={city} onChange={cityChangeHandler} className="form-control">
                                                                <option value="Select">Select</option>
                                                                {user.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                                                            </select>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                      
                                                    </div>

                                                    <div className="form-group row">
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label">Promocode <span style={{color: "red"}}>*</span></label>
                                                            <input type="text" id="t3" value={promoCode} onChange={promoCodeChangeHandler} style={{textTransform:"uppercase"}} className="form-control" placeholder="Enter Promocode"/>
                                                            <div className="clearfix"></div>
                                                        </div>
        
                                                    </div>

                                                    <div className="form-group row">
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label">Discount Percentage <span style={{color: "red"}}>*</span></label>
                                                            <input type="number" id="t4" value={disc} onChange={onChangeDiscountHandler} className="form-control" placeholder="Discount Percentage"/>
                                                            <div className="clearfix"></div>
                                                        </div>
        
                                                    </div>

                                                    <div className="form-group row">
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label">Minimum Amount <span style={{color: "red"}}>*</span></label>
                                                            <input type="number" id="t5" value={promoCodeValid} onChange={validPromoCodeChangeHandler} className="form-control" placeholder="Enter Minimum Amount Required for Promocode to be Valid"/>
                                                            <div className="clearfix"></div>
                                                        </div>
        
                                                    </div>


                                                    <div className="form-group row">
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label">Maximum Amount <span style={{color: "red"}}>*</span></label>
                                                            <input type="number" id="t6" value={promoCodeRedeem} onChange={redeemPromoCodeChangeHandler} className="form-control" placeholder="Enter Maximum Discount Amount  for Promocode to be Redeemed"/>
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

                                                        <div className="form-group col-md-4">
                                                            <label className="form-label">Count <span style={{color: "red"}}>*</span></label>
                                                            <input type="number"  value={count} onChange={onChangeCountValue} className="form-control" placeholder=""/>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        </div>
                                                            <div className="form-group row">

                                               <div className="form-group col-md-4">
                                                   <label className="form-label">Type <span style={{color: "red"}}>*</span></label>
                                                  <select className="form-control" value={typeSelect} onChange={onChangeSelectionBox} >
                                                      <option value="Select">Select</option>
                                                      <option value="Percentage">Percentage</option>
                                                      <option value="Delivery">Delivery</option>
                                                      <option value="Flat">Flat</option>

                                                  </select>
                                                   <div className="clearfix"></div>
                                               </div>
                                                </div>

                                             
                                                    <div className="form-group row">
                                                    { show===false?
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
export default UserPromoCodes