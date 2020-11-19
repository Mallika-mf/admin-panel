import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,CardBody,Input,Button} from "reactstrap";
import app from '../../data/base'



const UserMFCash = (props) => {
    const [cID,setCid] = useState([])
    const [cNO,setCno] = useState([])
    const [balanced,setBalance] = useState([])
    const [cash,setCash] = useState("")
    const [password,setPassword] = useState([])
    // const [name,setName] = useState([])
    const[sname,setSname] = useState("")
     const[desc,setDesc] = useState("")
     const[select,setSelect] = useState("")

var cid=[];
var cno=[];
var balance=[];
// var amount=-1;

    
useEffect(()=>{
    app.database().ref().child("Users")
    .once('value').then(function(snapshot) {
        // cno=[];
        // cid=[];
        // let balance=[];
        snapshot.forEach(function(data){
            var val = data.val(); 
            if(val.UserName!==""&&val.UserName!==null){
                cid.push(val.UserName);
                cno.push(val.Number);
                balance.push(val.Wallet);
            }
            // setName(data.val())
        });
        setCid(cid)
        setCno(cno)
        setBalance(balance)
        
        // document.getElementById("#sname").autocomplete({
        //     source: cid
            
        //   });
          console.log(document.getElementById("#sname"))
    });
},[])

const onChangeIdHandler=(event)=>{
    setSname(event.target.value)
}

const onChangeSearchHandler=(event)=>{
    // var sname=document.getElementById("sname");
    var balance=document.getElementById('balance');

    var temp=-1;
    for(var i=0;i<cNO.length;i++){
        if(cID[i]===sname){
            temp=i;
            break;
        }
    }

    if(temp===-1){
        alert('Enter Valid ID');
        return;
    }

    window.amount=balanced[temp];
    balance.innerHTML="MF Cash Balance : "+balanced[temp];
}
const onChangedescription=(event)=>{
    setDesc(event.target.value)
}

const onSelectHandler=(event)=>{
    setSelect(event.target.value)
}

const onChangeAmountHandler=(event)=>{
    setCash(event.target.value)
}

const onSubmit=(event)=>{
    // var sname=document.getElementById('sname');
    // var amount=document.getElementById('amount');
    // var desc=document.getElementById('desc');
    // var type=document.getElementById('type');
    var balance=document.getElementById('balance');

    if(sname===""){
        alert("Enter User Id");
        return;
    }


    if(window.amount===-1){
        alert("Verify User Id By Click search icon");
        return;
    }

    if(cash<=0){
        alert("Amount Should be Greater Than 0");
        return;
    }
    
    if(desc===""){
        alert("Enter desc");
        return;
    }
    
 

    if(select==="Select")
    {
     alert("Select Transction Type");
     return;
    }

    // var i = 0;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var today1=dd+mm+yyyy;

    var tno=today1+Math.floor(10000 + Math.random() * 90000);

    setPassword("5889");
    var person = prompt("Please enter your Password:", "****");

    if (person === password) {
        

        var firebaseref1=app.database().ref().child("Users").child(sname).child("Wallet");
        
        var a=0;
        firebaseref1.transaction(function(currentstock) {
                if(select==="Cr"){
                    currentstock=currentstock + +cash;
                }
                else{
                    currentstock=currentstock - +cash;
                }
           return currentstock;
            },
             function(error, committed, snapshot) {
                a=snapshot.val();
                console.log(a);
                var ref=app.database().ref().child("Users").child(sname).child("Transactions").push();
                ref.child("PushId").set(ref.getKey());
                ref.child("Amount").set(String(cash));
                ref.child("Date").set(today);
                ref.child("Generated").set("WebAdmin");
                ref.child("Status").set("Approved");
                ref.child("TransactionId").set(String(tno));
                ref.child("TransactionName").set(desc);
                ref.child("TransactionType").set(select);
                ref.child("UserBalance").set(String(a));
                ref.child("UserId").set(String(sname));


                if(select==="Cr")
                    alert("MF Cash Added Succesfully!!!");
                else
                    alert("MF Cash Deducted Succesfully!!!");

                setCash("")
               setSelect("Select");
                setSname("")
                setDesc("")
                balance.innerHTML="MF Cash Balance : ";
                window.amount=-1;

                app.database().ref().child("Users")
                .once('value').then(function(snapshot) {
                    window.cno=[];
                    window.cid=[];
                    window.balance=[];
                    snapshot.forEach(function(data){
                        var val = data.val(); 
                        if(val.UserName!==""&&val.UserName!==null){
                            window.cid.push(val.UserName);
                            window.cno.push(val.Number);
                            window.balance.push(val.Wallet);
                        }
                    });
                    // document.getElementById("#sname").autocomplete({
                    //     source: window.cid
                    //   });
                });

                

              });
            } 
            else {
              alert("Invalid Password");
              return;
            }
            
}
     
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title=" MF Cash"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                       
                        <h6> Topup</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        
                       
                       <CardBody>
                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Enter User Id <span style={{color: "red"}}>*</span></label>
                        <div className="form-group col-md-6">
                         <Row>
                        <div className="col-lg-6 col-md-5 col-sm-5">
                     <Input type="text" className="form-control" id="sname" value={sname} onChange={onChangeIdHandler}  autoComplete={cID} placeholder="Chef ID"/>
                        <p style={{color:"red",margin: "1%"}} id="balance">User Cash Balance : </p>
                         </div>
                        <div className="col-sm-1 col-md-2">
                        <span id="search" onClick={onChangeSearchHandler}><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine"/></span>
                         </div>
                         </Row> 
                         <div className="clearfix"></div>
                         </div>
                        </Row>
                        <Row className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Amount <span style={{color: "red"}}>*</span></label>
                        <div className="col-sm-8">
                         <Input type="number" className="form-control" value={cash} onChange={onChangeAmountHandler} id="amount"  placeholder="Amount"/>
                        <div className="clearfix"></div>
                        </div>
                        </Row>
                         <Row class="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right"  style={{marginTop:"1%"}}>desc <span style={{color: "red"}}>*</span></label>
                             <div className="col-sm-8">
                                 <Input type="text" className="form-control" value={desc} onChange={onChangedescription} id="desc" placeholder="description"/>
                                 <div className="clearfix"></div>
                             </div>
                         </Row>
                        <Row class="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right">Transaction Type <span style={{color: "red"}}>*</span></label>
                            <div className="col-sm-8">
                            <select id="type" value={select} onChange={onSelectHandler} className="form-control">
                                    <option value="Select">Select</option>
                                    <option value="Cr">Cr</option>
                                     <option value="Dr">Dr</option>
                                </select> 
                            <p style={{color:"red",margin: "1%"}}>Cr to add MF CASH, Dr to Deduct MF CASH</p>
                                <div class="clearfix"></div>
                            </div>
                        </Row>
                        <Row class="form-group row">
                            <div class="col-sm-10 ml-sm-auto">
                                <Button type="submit" id="submit" onClick={onSubmit} class="warning">Submit</Button>
                             </div>
                        </Row>
                         </CardBody>
                        </Col>
                        </Row>
                        </Container>
                        </Fragment>
       )}
                       export default UserMFCash