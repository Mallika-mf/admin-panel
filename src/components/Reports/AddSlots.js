import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Input,Button} from "reactstrap";
import DatePicker from "react-datepicker";
import {useHistory} from 'react-router-dom'
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Trash,Save} from 'react-feather';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import app from '../../data/base'


const AddSlots = (props) => {
    const [selectSlot,setSelectSlot] = useState("")
    const [time,setTime] = useState("")
    const [numberSlot,setNumberSlot] = useState("")
    const [searchCity,setSearchCity] = useState([])
    const [searchCity1,setSearchCity1] = useState([])

    const [dataBySlot,setDataBySlot] = useState([])
   
    const [selectCity,setSelectCity] = useState("")
    const [selectCity1,setSelectCity1] = useState("")

    const [selectZone,setSelectZone] = useState("")
    const [selectZone1,setSelectZone1] = useState("")

    const [searchZone,setSearchZone] = useState([])
    const [searchZone1,setSearchZone1] = useState([])
useEffect(()=>{
    var firebaseref1=app.database().ref().child("Masters").child("City");
     firebaseref1.orderByChild("Status").equalTo("Active").once('value').then(function(snapshot) {
        
            var content = [];
            snapshot.forEach(snap=>{
                content.push(snap.val());
              });
              setSearchCity(content);
        });
        var firebaseref1=app.database().ref().child("Masters").child("City");
     firebaseref1.orderByChild("Status").equalTo("Active").once('value').then(function(snapshot) {
        
            var content = [];
            snapshot.forEach(snap=>{
                content.push(snap.val());
              });
              setSearchCity1(content);
        });
   
    },[])
    const onChangeCitySelectHandler=(event)=>{
        setSelectCity(event.target.value)
        var firebaseref1=app.database().ref().child("Masters").child("Localities")
        .orderByChild("City").equalTo(event.target.value)
         firebaseref1.once('value').then(function(snapshot) {
            var content = [];
            
            snapshot.forEach(snap=>{
                content.push(snap.val());
                 
              });
              setSearchZone(content);
            })
    
           
        }
        const onChangeZoneSelectHandler=(event)=>{
            console.log(event.target.value)
            setSelectZone(event.target.value)
            var database = app.database();
        }

        const onChangeSlotTime=(event)=>{
            setSelectSlot(event.target.value)
        }

        const onChangeTimeHandler = (event)=>{
            setTime(event.target.value)
        }

        const onChangeSlotNumber=(event)=>{
            setNumberSlot(event.target.value)
        }

        const onSubmit=(event)=>{
            event.preventDefault()
            if(selectCity=="Select")
        {
            alert("Select City Name");
            return;
        }

        if(selectZone=="Select")
        {
            alert("Select Zone Name");
            return;
        }
    
        if(time==""){
             alert('Enter Slot Date');
             return;
         }

         if(selectSlot=="Select")
         {
             alert("Select Slot");
             return;
         }
     

         if(numberSlot==0){
            alert('Enter Number of slots available');
            return;
        }

        if(numberSlot<=0){
            alert('Enter Number of slots available (>0)');
            return;
        }

        
       


        
       var firebaseref=app.database().ref().child("Slots")
                .child(selectCity)
                .child(selectZone)
                .child(time);
            firebaseref.child(selectSlot).set(parseInt(numberSlot));
            firebaseref.child("Date").set(time);

            // cname.value="Select";
            setNumberSlot("")
            // slot.value="Select";

    
            Swal.fire({
                title: "Successfully Created!",
                icon: "success",
                confirmButtonText: "Ok" 
               });
        }

    const onChnageCityHandler=(event)=>{
        setSelectCity1(event.target.value)
        var firebaseref1=app.database().ref().child("Masters").child("Localities")
        .orderByChild("City").equalTo(event.target.value)
         firebaseref1.once('value').then(function(snapshot) {
            var content = [];
            
            snapshot.forEach(snap=>{
                content.push(snap.val());
                 
              });
              setSearchZone1(content);
            })
    
           
        }
   const onChangeZoneHandler=(event)=>{
       console.log(event.target.value)
       setSelectZone1(event.target.value)
       var database = app.database();
       database.ref().child("Slots").child(selectCity1).child(event.target.value)
        .once('value', function(snapshot){
            if(snapshot.exists()){
            var contentArr = [];
            var date="";
            var slot="";
            var avlSlot="";
            var sn=0;
            var obj={
            'date':"",
            'sn':0,
            'slot':"",
            'avlSlot':""}        
                snapshot.forEach(function(data){
                    console.log(snapshot.val())
                            if(data.child("1000").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "10:00 Hrs";
                                avlSlot = data.child("1000").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1030").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "10:30 Hrs";
                                avlSlot = data.child("1030").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1100").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "11:00 Hrs";
                                avlSlot = data.child("1100").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1130").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "11:30 Hrs";
                                avlSlot = data.child("1130").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1200").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "12:00 Hrs";
                                avlSlot = data.child("1200").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1230").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "12:30 Hrs";
                                avlSlot = data.child("1230").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1300").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "13:00 Hrs";
                                avlSlot = data.child("1300").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1330").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "13:30 Hrs";
                                avlSlot = data.child("1330").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1400").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "14:00 Hrs";
                                avlSlot = data.child("1400").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1430").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "14:30 Hrs";
                                avlSlot = data.child("1430").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1500").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "15:00 Hrs";
                                avlSlot = data.child("1500").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1530").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "15:30 Hrs";
                                avlSlot = data.child("1530").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1600").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "16:00 Hrs";
                                avlSlot = data.child("1600").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1630").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "16:30 Hrs";
                                avlSlot = data.child("1630").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1700").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "17:00 Hrs";
                                avlSlot = data.child("1700").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1730").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "17:30 Hrs";
                                avlSlot = data.child("1730").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                            if(data.child("1800").exists()){
                                sn=sn+1;
                                date=data.child("Date").val();
                                slot= "18:00 Hrs";
                                avlSlot = data.child("1800").val();
                                obj={
                                    'date':date,
                                    'sn':sn,
                                    'slot':slot,
                                    'avlSlot':avlSlot 
                                }
                                contentArr.push(obj);
                            }
                           
                  });
                  setDataBySlot(contentArr)
                }
                });
            }
                
           
    const handleChange = (event) => {
       
      };

      
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title="Add Slots"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6>Add Slots</h6>
                        </CardHeader>
                       
                       <CardBody>
                       <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Select City Name <span style={{color: "red"}}>*</span></label>
                        <div className="col-sm-8">
                        <select value={selectCity} onChange={onChangeCitySelectHandler} className="form-control">
                            <option value="Select">Select</option>
                            {searchCity.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}

                        </select>
                        <div className="clearfix"></div>
                        </div>
                        </Row>
                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Select Zone Name <span style={{color: "red"}}>*</span></label>
                        <div className="col-sm-8">
                        <select value={selectZone} onChange={onChangeZoneSelectHandler} className="form-control">
                            <option value="Select">Select</option>
                            {searchZone.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                        </select>
                        <div className="clearfix"></div>
                        </div>
                        </Row>
                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Select Date <span style={{color: "red"}}>*</span></label>
                        <div className="col-sm-8">
                        <input type="date" className="form-control digits" value={time} onChange={onChangeTimeHandler} onChange={handleChange} />
                        <div className="clearfix"></div>
                        </div>
                        </Row>
                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Select Slot <span style={{color: "red"}}>*</span></label>
                        <div className="col-sm-8">
                        <select value={selectSlot} onChange={onChangeSlotTime} className="form-control">
                            <option value="Select">Select</option>
                            <option value="1000">10:00 Hrs</option> 
                            <option value="1030">10:30 Hrs</option> 
                            <option value="1100">11:00 Hrs</option> 
                            <option value="1130">11:30 Hrs</option> 
                            <option value="1200">12:00 Hrs</option> 
                            <option value="1230">12:30 Hrs</option> 
                            <option value="1300">13:00 Hrs</option> 
                            <option value="1330">13:30 Hrs</option> 
                            <option value="1400">14:00 Hrs</option> 
                            <option value="1430">14:30 Hrs</option> 
                            <option value="1500">15:00 Hrs</option> 
                            <option value="1530">15:30 Hrs</option> 
                            <option value="1600">16:00 Hrs</option> 
                            <option value="1630">16:30 Hrs</option> 
                            <option value="1700">17:00 Hrs</option> 
                            <option value="1730">17:30 Hrs</option> 
                            <option value="1800">18:00 Hrs</option>
                        </select>
                        <div className="clearfix"></div>
                        </div>
                        </Row>
                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Number of Slots <span style={{color: "red"}}>*</span></label>
                        <div className="col-sm-8">
                       <Input type="number" value={numberSlot} onChange={onChangeSlotNumber} className="form control" placeholder="Enter Number of slot available"/>
                        <div className="clearfix"></div>
                        </div>
                        </Row>
                        <Row class="form-group row">
                        <div class="col-sm-10 ml-sm-auto">
                         <Button type="submit" id="submit" onClick={onSubmit} class="warning">Submit</Button>
                         </div>
                         </Row>
                       </CardBody>
                       </Card>
                       <Card>
                           <CardHeader>
                               <h6>Available Slots</h6>
                           </CardHeader>
                           <CardBody>
                           <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Select City Name <span style={{color: "red"}}>*</span></label>
                        <div className="col-sm-8">
                        <select value={selectCity1} onChange={onChnageCityHandler} className="form-control">
                            <option value="Select">Select</option>
                             {searchCity1.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                        </select>
                        <div className="clearfix"></div>
                        </div>
                        </Row>
                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Select Zone Name <span style={{color: "red"}}>*</span></label>
                        <div className="col-sm-8">
                        <select  value={selectZone1} onChange={onChangeZoneHandler} className="form-control">
                            <option value="Select">Select</option>
                            {searchZone1.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}

                        </select>
                        <div className="clearfix"></div>
                        </div>
                        </Row>
                        <Card>
                            <CardBody>
                        <div className="table-responsive">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col"> Date </th>
                                            <th scope="col"> Slot </th>
                                            <th scope="col"> Available Slot </th>

                                                                                
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataBySlot.map((item,id)=>{                                              
                                                 var set=0;
                                                 return(
                                                    <tr key={id}>
                                                        <td>{item.sn}</td>
                                                        <td>{item.date}</td>
                                                        <td>{item.slot}</td>
                                                        <td>{item.avlSlot}</td>
                                                        </tr>
                                                       )
                                            })
                                               
                                        }
                                    </tbody>
                                    </Table>
                                    </div>
                                    </CardBody>
                                    </Card>
                                    
                           </CardBody>
                       </Card>
                       </Col>
                       </Row>
                       </Container>
                       </Fragment>
       )}
       export default AddSlots