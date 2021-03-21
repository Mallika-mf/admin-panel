import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import { Container, Row, Col, CardBody, Input, Button } from "reactstrap";
import app from '../../data/base'
import axios from 'axios'


const PartialRefund = (props) => {
    const [cID, setCid] = useState([])
    const [cNO, setCno] = useState([])
    const [balanced, setBalance] = useState([])
    const [cash, setCash] = useState("")
    const [password, setPassword] = useState([])
    // const [name,setName] = useState([])
    const [sname, setSname] = useState("")
    const [desc, setDesc] = useState("")
    const [trigger, setTrigger] = useState("0")
    const [select, setSelect] = useState("")
    const [orderNo,setOrderNo] = useState("")
    const [dispatchDate,setDispatchDate] = useState('')
    var cid = [];
    var cno = [];
    var balance = [];
    // var amount=-1;


    useEffect(() => {
        app.database().ref().child("CloudKitchen")
            .once('value').then(function (snapshot) {
                // cno=[];
                // cid=[];
                // let balance=[];
                snapshot.forEach(function (data) {
                    var val = data.val();
                    if (val.UserId !== "" && val.UserId !== null) {
                        cid.push(val.UserId);
                        cno.push(val.Name);
                        balance.push(val.Cash);
                    }
                    // setName(data.val())
                });
                setCid(cid)
                setCno(cno)
                setBalance(balance)

                // document.getElementById("#sname").autocomplete({
                //     source: cid

                //   });
            });
    }, [])

    const onChangeIdHandler = (event) => {
        setSname(event.target.value)
    }

    const onChangeSearchHandler = (event) => {
        // var sname=document.getElementById("sname");
        var balance = document.getElementById('balance');

        var temp = -1;
        for (var i = 0; i < cID.length; i++) {
            if (cID[i] === sname) {
                temp = i;
                break;
            }
        }

        if (temp === -1) {
            alert('Enter Valid Chef Id');
            return;
        }
        window.uid = cID[temp]
        window.amount = balanced[temp];
        balance.innerHTML = "Chef Cash Balance : " + balanced[temp];
        setTrigger("1")
    }
    const onChangedescription = (event) => {
        setDesc(event.target.value)
    }

    const onSelectHandler = (event) => {
        setSelect(event.target.value)
    }

    const onChangeAmountHandler = (event) => {
        setCash(event.target.value)
    }

    const onSubmit = (event) => {
        // var sname=document.getElementById('sname');
        // var amount=document.getElementById('amount');
        // var desc=document.getElementById('desc');
        // var type=document.getElementById('type');
        var balance = document.getElementById('balance');

        if (sname === "") {
            alert("Enter Chef Id");
            return;
        }

        console.log(window.amount)


        if (trigger === "0") {
            alert("Verify Chef Id By Click search icon");
            return;
        }

        if (cash <= 0) {
            alert("Enter Amount / Amount Should be Greater Than 0");
            return;
        }

        if (desc === "") {
            alert("Enter Description");
            return;
        }



        if (select === "Select") {
            alert("Select Transction Type");
            return;
        }

        // var i = 0;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        var today1 = dd + mm + yyyy;

        var tno = today1 + Math.floor(10000 + Math.random() * 90000);
        console.log(window.uid)
        setPassword("5889");
        var person = prompt("Please enter your Password:", "****");

        if (person === "5889") {


            var firebaseref1 = app.database().ref().child("CloudKitchen").child(window.uid).child("Cash");

            var a = 0;
            firebaseref1.transaction(function (currentstock) {
                if (select === "Cr") {
                    currentstock = currentstock + +cash;
                }
                else {
                    currentstock = currentstock - +cash;
                    console.log(currentstock)

                }
                return currentstock;
            },
                function (error, committed, snapshot) {
                    a = snapshot.val();
                    console.log(a);
                    var ref = app.database().ref().child("CloudKitchen").child(window.uid).child("Transactions").push();
                    ref.child("PushId").set(ref.getKey());
                    ref.child("Amount").set(String(cash));
                    ref.child("Date").set(today);
                    ref.child("Generated").set("WebAdmin");
                    ref.child("Status").set("Pending");
                    ref.child("TransactionId").set(String(tno));
                    ref.child("TransactionName").set(desc);
                    ref.child("TransactionType").set(select);
                    ref.child("UserBalance").set(String(a));
                    ref.child("UserId").set(String(window.uid));
                    if(select === "Dr"){
                        app.database().ref().child("CloudKitchen").child(window.uid)
                        .once('value').then(function (snapshot) {
                            axios.post(`https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles=`+snapshot.val().MobileNumber+`&sms=Hello Chef `+snapshot.val().Name+`!%0aThis is regarding order ${orderNo} dispatched on ${dispatchDate}. %0aIn the order sent an amount of ₹ ${cash} has been deducted from your account due to ${desc} . %0aKindly avoid this in future to prevent permanent suspension of account. %0aRegards  %0a- Team MothersFood&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=`)
                            .then((res) => {
                              console.log(res);
                              return null;
                          }).catch((err) => {
                              console.log(err);
                              return null;
                          });
                        })
                    }
                   
                 
                    if (select === "Cr")
                        alert("Partial Refund Cash Added Succesfully!!!");
                    else
                        alert("Partial Refund Cash Deducted Succesfully!!!");
                    setCash("")
                    setSelect("Select");
                    setSname("")
                    setDesc("")
                    balance.innerHTML = "Chef Cash Balance : ";
                    window.amount = -1;

                    app.database().ref().child("CloudKitchen")
                        .once('value').then(function (snapshot) {
                            window.cno = [];
                            window.cid = [];
                            window.balance = [];
                            snapshot.forEach(function (data) {
                                var val = data.val();
                                if (val.UserId !== "" && val.UserId !== null) {
                                    window.cid.push(val.UserId);
                                    window.cno.push(val.Name);
                                    window.balance.push(val.Cash);
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

    const onChnageOrderNo=(event)=>{
        setOrderNo(event.target.value)
    }

    const onChangeDispatchDate=(event)=>{
        setDispatchDate(event.target.value)
    }

    return (
        <Fragment>
            <BreadCrumb parent={<Home />} subparent="Settings" title=" Partial Refund Amount" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">

                        <h6> Topup</h6>
                        {/* <span> Use a class <code> table </code> to any table.</span> */}


                        <CardBody>
                            <Row className="form-group row">
                                <label className="col-form-label col-sm-2 text-sm-right">Enter Chef Id <span style={{ color: "red" }}>*</span></label>
                                <div className="form-group col-md-6">
                                    <Row>
                                        <div className="col-lg-6 col-md-5 col-sm-5">
                                            <Input type="text" className="form-control" id="sname" value={sname} onChange={onChangeIdHandler} autoComplete={cID} placeholder="Chef Id" />
                                            <p style={{ color: "red", margin: "1%" }} id="balance">Chef Cash Balance : </p>
                                        </div>
                                        <div className="col-sm-1 col-md-2">
                                            <span id="search" onClick={onChangeSearchHandler}><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
                                        </div>
                                    </Row>
                                    <div className="clearfix"></div>
                                </div>
                            </Row>
                            <Row className="form-group row">
                                <label className="col-form-label col-sm-2 text-sm-right">Amount <span style={{ color: "red" }}>*</span></label>
                                <div className="col-sm-8">
                                    <Input type="number" className="form-control" value={cash} onChange={onChangeAmountHandler} id="amount" placeholder="Amount" />
                                    <div className="clearfix"></div>
                                </div>
                            </Row>
                            <Row className="form-group row">
                                <label className="col-form-label col-sm-2 text-sm-right" style={{ marginTop: "1%" }}>Dispatch Date <span style={{ color: "red" }}>*</span></label>
                                <div className="col-sm-8">
                                    <Input type="date" className="form-control" value={dispatchDate} onChange={onChangeDispatchDate} id="dispatchdate" placeholder="date of dispatch" />
                                    <div className="clearfix"></div>
                                </div>
                            </Row>
                            <Row className="form-group row">
                                <label className="col-form-label col-sm-2 text-sm-right" style={{ marginTop: "1%" }}>Order Number <span style={{ color: "red" }}>*</span></label>
                                <div className="col-sm-8">
                                    <Input type="text" className="form-control" value={orderNo} onChange={onChnageOrderNo} id="orderNo" placeholder="Order Number" />
                                    <div className="clearfix"></div>
                                </div>
                            </Row>
                            <Row className="form-group row">
                                <label className="col-form-label col-sm-2 text-sm-right" style={{ marginTop: "1%" }}>Description <span style={{ color: "red" }}>*</span></label>
                                <div className="col-sm-8">
                                    <Input type="text" className="form-control" value={desc} onChange={onChangedescription} id="desc" placeholder="description" />
                                    <div className="clearfix"></div>
                                </div>
                            </Row>
                            <Row className="form-group row">
                                <label className="col-form-label col-sm-2 text-sm-right">Transaction Type <span style={{ color: "red" }}>*</span></label>
                                <div className="col-sm-8">
                                    <select id="type" value={select} onChange={onSelectHandler} className="form-control">
                                        <option value="Select">Select</option>
                                        <option value="Cr">Cr</option>
                                        <option value="Dr">Dr</option>
                                    </select>
                                    <p style={{ color: "red", margin: "1%" }}>Cr to add MF CASH, Dr to Deduct MF CASH</p>
                                    <div className="clearfix"></div>
                                </div>
                            </Row>
                            <Row className="form-group row">
                                <div className="col-sm-10 ml-sm-auto">
                                    <Button type="submit" id="submit" onClick={onSubmit} className="warning">Submit</Button>
                                </div>
                            </Row>
                        </CardBody>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default PartialRefund