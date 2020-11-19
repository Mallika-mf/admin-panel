import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home, Save } from 'react-feather';
import { Container, Row, Col, Card, CardHeader, CardBody, Table, FormGroup, Button } from "reactstrap";
import { TablePagination } from '@material-ui/core'
// import { Database, ShoppingBag, MessageCircle, User,UserPls, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const ChefPayouts = () => {
    const [filterfn, setFilterFn] = useState({ fn: items => { return items; } })
    const pages = [10, 30, 100,200]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [state, setState] = useState({ sdate: new Date(), edate: new Date(), city: "" });
    // const [searchTerm, setSearchTerm]=useState("")
    const [users, setUsers] = useState([])
    const [cName, setcName] = useState([])
    const [cPushId, setcPushid] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState([])
    const [show, setShow] = useState(true)
    const [view, setView] = useState([])
    // const[counT,setCount] = useState([])
    // const [amounT,setAmount] = useState('')
    const [date, setDate] = useState([])
    const [tableShow, setTableShow] = useState(true)
    const [hide, setHide] = useState(false)
    useEffect(() => {
        try {
            window.addEventListener('message', handleMessage);
            var cpushid = [];
            var cname = [];
            // var lname=[];
            // var lpushid=[];
            var content = []
            app.database().ref().child("Masters").child("City")
                .once('value').then(function (snapshot) {
                    snapshot.forEach(function (data) {
                        var val = data.val();
                        cpushid.push(val.PushId);
                        cname.push(val.Name);
                        content.push(val)
                    });
                    setcPushid(cpushid)
                    setcName(cname)
                    setCity(content)
                });
            var database = app.database();
            database.ref().child("CloudKitchen")
                .orderByChild("Cash")
                .on('value', function (snapshot) {
                    setUsers([])
                    if (snapshot.exists()) {
                        var content = [];

                        snapshot.forEach(snap => {
                            if (snap.hasChild("UserId")) {
                                var val = snap.val();

                                var set = 0;
                                snap.child('Transactions').forEach(function (data1) {
                                    var val1 = data1.val();
                                    if (val1.Status === "Pending") {
                                        set += 1
                                        val.totalOrder = set
                                    }
                                });

                                if (parseFloat(val.Cash) > 0) {
                                    let locker = {
                                        UserId: val.UserId,
                                        Name: val.Name,
                                        totalOrder: val.totalOrder,
                                        MobileNumber: val.MobileNumber,
                                        City: val.City,
                                        Cash: val.Cash,

                                    }
                                    content.push(locker);
                                }
                            }
                        });
                        content.map(item => {
                            if (item.UserId === undefined) {
                                item.UserId = ""
                            }
                            if (item.Name === undefined) {
                                item.Name = ""
                            }
                            if (item.MobileNumber === undefined) {
                                item.MobileNumber = ""
                            }
                            if (item.City === undefined) {
                                item.City = ""
                            }
                            if (item.Cash === undefined) {
                                item.Cash = ""
                            }
                            if (item.totalOrder === undefined) {
                                item.totalOrder = ""
                            }

                            return item
                        })

                        setUsers(content);
                        setShow(false)

                    } else {
                        const timeout = setTimeout(() => {
                            setShow(false)
                        }, 3000);
                        return () => { clearTimeout(timeout); }

                    }

                })
            return () => {
                window.removeEventListener('message', handleMessage);
            }
        } catch (err) {
            console.log(err)
        }
    }, [])


    // const  onChangeHandler=(event)=>{
    //     setSearchTerm(event.target.value);
    //    }
    const handleMessage = (event) => {
        if (event.data.action === 'receipt-loaded') {
            setIsLoading(false);
        }
    };
    const printIframe = (id) => {
        const iframe = document.frames
            ? document.frames[id]
            : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;
        iframeWindow.print();

        return false;
    };
    const printDocument = (event) => {
        const input = document.getElementById('datatable');
        html2canvas(input)
            .then((canvas) => {
                var imgWidth = 200;
                // var pageHeight = 290;  
                var imgHeight = canvas.height * imgWidth / canvas.width;
                // var heightLeft = imgHeight;  
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4')
                var position = 0;
                // var heightLeft = imgHeight;  
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                pdf.save("ChefPayouts.pdf");
            });
    }
    const onChnage = (event) => {
        const { id, value } = event.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const onSubmit = (event) => {
        event.preventDefault();
        //     if(state.city==="Select")
        // {
        //     alert("Select City");

        //     return;
        // }

        if (state.sdate === "") {
            alert("Select Start Date");

            return;
        }

        if (state.edate === "") {
            alert("Select End Date");

            return;
        }
        app.database().ref().child("CloudKitchen")
            .orderByChild("Cash")
            .once('value', function (snapshot) {
                if (snapshot.exists()) {
                    var content = [];
                    snapshot.forEach(function (data) {
                        var val = data.val();
                        var set = 0
                        var amount = 0
                        data.child('Transactions').forEach(function (data1) {
                            var val1 = data1.val();
                            if (val1.Status === "Pending") {
                                if (val1.Date >= state.sdate && val1.Date <= state.edate) {
                                    set += 1
                                    val.totalOrder = set
                                    amount = amount + parseFloat(val1.Amount)
                                    val.totalAmount = amount
                                    val.date = val1.Date

                                }
                            }
                        });
                        if (parseFloat(val.Cash) > 0 && val.totalOrder > 0) {
                            content.push(val)
                        }
                    })
                    setDate(content);
                }
            });


        setTableShow(false)
    }


    const viewCashHandler = (event) => {
        const pushid = event.target.id
        var database = app.database();
        database.ref().child("CloudKitchen").child(pushid).child("Transactions")
            .once('value', function (snapshot) {
                if (snapshot.exists()) {
                    var content = [];

                    snapshot.forEach(function (data) {
                        var val = data.val();
                        if (val.Status === "Pending") {
                            content.push(val)
                        }
                    })
                    setView(content)
                } else {
                    setView('<tr><td colspan="10" style="text-align:center; className="center">No data available</td></tr>');
                }
            });
        setHide(true)

    }

    const backHandler = () => {
        setHide(false)
    }
    //   const onChangeCash=(event)=>{
    //       setAmount(event.target.value)
    //       console.log(event.target.value)
    //   }
    const updateCashHandler = (event) => {
        var arrData = event.target.id.split(",");
        var userid = arrData[0]
        var amount = arrData[1]
        // const amount = event.target.id.Cash
        var person = prompt("Please enter your cms number:", "****");
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
if(format.test(person) ){
  alert("Please enter check the cms number ")
} else {
    if(person.length!==13){
        alert("length should not be less then 13")
    }else{

        console.log(person)
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
        // console.log(userid)
        // console.log(amount)
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        if (parseFloat(amount) < 1) {
            alert("Amount not sufficient for settlement");
            return;
        }

        var firebaseref1 = app.database().ref().child("CloudKitchen").child(userid).child("Cash");
        firebaseref1.transaction(function (currentstock) {
            return currentstock - parseFloat(amount);
        },
            function (error, committed, snapshot) {
                if (error) {
                    console.log('Transaction failed abnormally!', error);
                } else if (committed) {

                    var number = parseInt(snapshot.val());
                    console.log(number)
                    var d = new Date();
                    var n = d.getTime();

                    var username = window.localStorage.getItem('name');
                    if (username === null) {
                        username = window.sessionStorage.getItem('name');
                    }
                    console.log(person)
                    console.log(userid)
                    var firebaseref = app.database().ref().child("CloudKitchen").child(userid).child("Transactions").push();
                    firebaseref.child("Amount").set(amount);
                    firebaseref.child("Date").set(today);
                    firebaseref.child("Generated").set("Online");
                    firebaseref.child("PushId").set(firebaseref.getKey());
                    firebaseref.child("Status").set(String("Approved"));
                    firebaseref.child("TransactionId").set("" + n);
                    firebaseref.child("TransactionName").set("Settlement");
                    firebaseref.child("TransactionType").set("Dr");
                    firebaseref.child("UserBalance").set("" + number);
                    firebaseref.child("UserId").set(userid);
                    firebaseref.child("Cms").set(person)

                    var database = app.database();
                    database.ref().child("CloudKitchen").child(userid).child("Transactions")
                        .orderByChild("Status").equalTo("Pending")
                        .once('value', function (snapshot) {
                            if (snapshot.exists()) {

                                snapshot.forEach(function (data) {
                                    var val = data.val();
                                    app.database().ref().child("CloudKitchen").child(userid).child("Transactions").child(val.PushId).child("Status").set("Approved");
                                })
                            }
                            Swal.fire({
                                title: "Transaction Successfully Approved!",
                                text: "Chef Id : " + userid,
                                icon: "success"
                            });
                            var database = app.database();
                            database.ref().child("CloudKitchen")
                                .orderByChild("Cash")
                                .once('value', function (snapshot) {
                                    if (snapshot.exists()) {
                                        var content = [];

                                        snapshot.forEach(function (data) {
                                            var val = data.val();
                                            var set = 0;
                                            data.child('Transactions').forEach(function (data1) {
                                                var val1 = data1.val();
                                                if (val1.Status === "Pending") {
                                                    set += 1
                                                    val.totalOrder = set

                                                }
                                            });

                                            if (parseFloat(val.Cash) > 0) {
                                                content.push(val)
                                            }
                                        });
                                        setUsers(content)
                                    }
                                });
                        })
                }
            })
        }
    })
}
}
    }

    const viewAmountHandler = (event) => {

        const pushid = event.target.id
        var database = app.database();
        database.ref().child("CloudKitchen").child(pushid).child("Transactions")
            .once('value', function (snapshot) {
                if (snapshot.exists()) {
                    var content = [];

                    snapshot.forEach(function (data) {
                        var val = data.val();
                        if (val.Status === "Pending") {
                            if (val.Date >= state.sdate && val.Date <= state.edate) {
                                content.push(val)
                            }
                        }
                    })
                    setView(content)
                } else {
                    setView('<tr><td colspan="10" style="text-align:center; className="center">No data available</td></tr>');
                }
            });
        setHide(true)
    }

    const updateAmountHandler = (event) => {
        const userid = event.target.id
        var amount = 0
        var database = app.database();
        database.ref().child("CloudKitchen").child(userid).child("Transactions")
            .once('value', function (snapshot) {
                if (snapshot.exists()) {
                    // var content=[]
                    snapshot.forEach(function (data) {
                        var val = data.val();
                        if (val.Status === "Pending") {
                            if (val.Date >= state.sdate && val.Date <= state.edate) {
                                amount = amount + parseFloat(val.Amount);
                                val.totAmount = amount
                            }
                        }
                    });
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();

                    today = yyyy + '-' + mm + '-' + dd;
                    if (parseFloat(amount) < 1) {
                        alert("Amount not sufficient for settlement");
                        return;
                    }

                    var firebaseref1 = app.database().ref().child("CloudKitchen").child(userid).child("Cash");
                    firebaseref1.transaction(function (currentstock) {
                        return currentstock - parseFloat(amount);
                    },
                        function (error, committed, snapshot) {
                            if (error) {
                                console.log('Transaction failed abnormally!', error);
                            } else if (committed) {

                                var number = parseInt(snapshot.val());

                                var d = new Date();
                                var n = d.getTime();



                                var firebaseref = app.database().ref().child("CloudKitchen").child(userid).child("Transactions").push();
                                firebaseref.child("Amount").set(String(amount));
                                firebaseref.child("Date").set(today);
                                firebaseref.child("Generated").set("Online");
                                firebaseref.child("PushId").set(firebaseref.getKey());
                                firebaseref.child("Status").set(String("Approved"));
                                firebaseref.child("TransactionId").set("" + n);
                                firebaseref.child("TransactionName").set("Settlement");
                                firebaseref.child("TransactionType").set("Dr");
                                firebaseref.child("UserBalance").set("" + number);
                                firebaseref.child("UserId").set(userid);


                                var database = app.database();
                                database.ref().child("CloudKitchen").child(userid).child("Transactions")
                                    .orderByChild("Status").equalTo("Pending")
                                    .once('value', function (snapshot) {
                                        if (snapshot.exists()) {

                                            snapshot.forEach(function (data) {
                                                var val = data.val();
                                                if (val.Date >= state.sdate && val.Date <= state.edate) {
                                                    app.database().ref().child("CloudKitchen").child(userid).child("Transactions").child(val.PushId).child("Status").set("Approved");
                                                }
                                            })
                                        }
                                        Swal.fire({
                                            title: "Transaction Successfully Approved!",
                                            text: "Chef Id : " + userid,
                                            icon: "success"
                                        });
                                        var database = app.database();
                                        database.ref().child("CloudKitchen")
                                            .once('value', function (snapshot) {
                                                if (snapshot.exists()) {
                                                    var content = [];
                                                    snapshot.forEach(function (data) {
                                                        var val = data.val();
                                                        var set = 0;
                                                        data.child('Transactions').forEach(function (data1) {
                                                            var val1 = data1.val();
                                                            if (val1.Status === "Pending") {
                                                                set += 1
                                                                val.totalOrder = set

                                                            }
                                                        });

                                                        if (parseFloat(val.PendingAmount) > 0 && val.totalOrder > 0) {
                                                            content.push(val)
                                                        }
                                                    });
                                                    setDate(content)
                                                }
                                            });
                                    })
                            }
                        })
                }
            })
    }
    const handleChangePage = (event, newPage) =>{
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }
    let excludeSearch = ["totalOrder", "City", "Cash"]

    const handleSearch = (e) => {
        let target = e.target.value.toLowerCase().trim()
        setFilterFn({
            fn: items => {
                if (target === "") {
                    return items;
                }
                else {
                    return items.filter(x => {
                        return Object.keys(x).some(key =>
                            excludeSearch.includes(key) ? false : x[key].toString().toLowerCase().includes(target)
                        )
                    })

                }
            }


        })
    }
    const recordsAfterPagingAndSorting = () => {
        return filterfn.fn(users).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return (
        <Fragment>
            <BreadCrumb parent={<Home />} subparent="Settings" title="Disable Chefs" />
            <Container fluid={true}>
                <Row>
                    <CardBody>

                        {/* <div className="row">
                                
                                    <div className="form-group col-md-6">
                                        <label className="form-label">Select City <span style={{color: "red"}}>*</span></label>
                                       <select id="city" className="form-control"  value={state.city} onChange={onChnage}>
                                           <option value="Select">Select</option>
                                            {city.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
                                       </select>
                                        <div className="clearfix"></div>
                                    </div>
                              
                                </div> */}
                        <Row>
                            <FormGroup className="col-md-3">
                                <label className="form-label">From Date <span style={{ color: "red" }}>*</span></label>
                                <div className="input-group">
                                    <input type="date" id="sdate" className="form-control" value={state.sdate} onChange={onChnage} />
                                </div>
                            </FormGroup>
                            <FormGroup className="col-md-3">

                                <label className="form-label">To Date <span style={{ color: "red" }}>*</span></label>
                                <div className="input-group">
                                    <input type="date" id="edate" className="form-control" value={state.edate} onChange={onChnage} />
                                </div>
                            </FormGroup>



                            <div className="col-md-3">

                                <input className="btn btn-primary mr-1" style={{ marginTop: "30px", padding: "10px 15px" }} type="button" name="filter" value="Filter" onClick={(event) => onSubmit(event)} id="filter" />

                            </div>

                        </Row>
                    </CardBody>


                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h6>Chef Payouts</h6>
                                {/* <span> Use a className <code> table </code> to any table.</span> */}
                            </CardHeader>
                            <div className="col-md-5" style={{ margin: "1%" }}>
                                <div className="form-group col-md-10">
                                    <label className="form-label">Search </label>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="col-md-11 text-right" style={{ marginTop: "-5%", marginBottom: "3%" }}>
                                <div className="dt-buttons btn-group">
                                    <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button>
                                    <ReactHTMLTableToExcel
                                        className="btn btn-info"
                                        table="data-table"
                                        filename="ChefPayouts"
                                        sheet="ChefPayouts"
                                        buttonText="Excel" />
                                    <iframe
                                        id="iDatatable"
                                        src="/payouts/chef-payouts"
                                        style={{ display: 'none' }}
                                        title="Receipt"
                                    />
                                    <Button className="warning" onClick={() => printIframe('iDatatable')}>
                                        {isLoading ? 'Print' : 'Print Receipt'}
                                    </Button>
                                </div>
                            </div>
                            {hide === false ?
                                <div className="table-responsive text-nowrap">
                                    <Table id="datatable">
                                        <thead>
                                            <tr>
                                                <th scope="col">SL.NO</th>
                                                <th scope="col"> City </th>
                                                <th scope="col"> Cloud Kitchen ID	</th>
                                                <th scope="col"> Cloud Kitchen Name	</th>
                                                <th scope="col"> Chef Number</th>
                                                <th scope="col"> Total Orders		</th>
                                                <th scope="col"> Settlement Amount	</th>
                                                <th scope="col"> Details	</th>
                                                <th scope="col"> Actions	</th>

                                            </tr>
                                        </thead>
                                        {tableShow === true ?
                                            <tbody>
                                                {recordsAfterPagingAndSorting().map((item, id) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td>{id + 1}</td>
                                                            <td className="item_locality">{cName[cPushId.indexOf(item.City)]}</td>
                                                            <td className="item_locality">{item.UserId}</td>
                                                            <td className="">{item.Name}</td>
                                                            <td className="">{item.MobileNumber}</td>
                                                            <td className="">{item.totalOrder}</td>
                                                            <td className="">{item.Cash}</td>
                                                            <td className="" style={{ textAlign: "center" }}><button type="button" id={item.UserId} onClick={viewCashHandler} className="btn btn-primary">{"View"}</button></td>
                                                            <td className="actions" style={{ textAlign: "center" }}><Save id={item.UserId + "," + item.Cash} onClick={updateCashHandler} size={15} /></td>
                                                        </tr>
                                                    )

                                                })}
                                            </tbody> :
                                            <tbody>
                                                {date.map((item, id) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td>{id + 1}</td>
                                                            <td className="item_locality">{cName[cPushId.indexOf(item.City)]}</td>
                                                            <td className="item_locality">{item.UserId}</td>
                                                            <td className="">{item.Name}</td>
                                                            <td className="">{item.MobileNumber}</td>
                                                            <td className="">{item.totalOrder}</td>
                                                            <td className="">{item.totalAmount}</td>
                                                            <td className="" style={{ textAlign: "center" }}><button type="button" id={item.UserId} onClick={viewAmountHandler} className="btn btn-primary">{"View"}</button></td>
                                                            <td className="actions" style={{ textAlign: "center" }}><Save id={item.UserId} onClick={updateAmountHandler} size={15} /></td>
                                                        </tr>
                                                    )

                                                })}
                                            </tbody>
                                        }
                                    </Table>

                                </div> :
                                <div>
                                    <div className="table-responsive text-nowrap">
                                        <Table id="datatable">
                                            <thead>
                                                <tr>
                                                    <th scope="col">SL.NO</th>
                                                    <th scope="col">UserId </th>
                                                    <th scope="col"> Amount	</th>
                                                    <th scope="col"> 	Date</th>
                                                    <th scope="col"> Transaction Id</th>
                                                    <th scope="col"> 	Transaction Name</th>
                                                    <th scope="col"> Transaction Type	</th>
                                                    <th scope="col"> Generated	</th>
                                                    <th scope="col"> Status	</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {view.map((item, id) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td>{id + 1}</td>
                                                            <td className="item_locality">{item.UserId}</td>
                                                            <td className="item_locality">{item.Amount}</td>
                                                            <td className="">{item.Date}</td>
                                                            <td className="">{item.TransactionId}</td>
                                                            <td className="">{item.TransactionName}</td>
                                                            <td className="">{item.TransactionType}</td>
                                                            <td className="">{item.Generated}</td>
                                                            <td className="">{item.Status}</td>
                                                        </tr>
                                                    )

                                                })}
                                            </tbody>

                                        </Table>

                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <Button type="button" onClick={backHandler} className="form-control">Back</Button>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Card>
                    </Col>
                    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} className="sweet-loading">
                        <BeatLoader
                            css={override}
                            size={30}
                            margin={5}
                            color={"#F10542"}
                            loading={show}
                        />
                    </div>
                </Row>
                <div style={{ display: "none" }} className="table-responsive text-nowrap">
                    <Table id="data-table">
                        <thead>
                            <tr>
                                <th>From A/C No.</th>
                                <th>A/C no. </th>
                                <th>Beneficiary Name</th>
                                <th>Amount</th>
                                <th>Payment Mode</th>
                                <th>Posting Date (Activation Date)</th>
                                <th>IFSC Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {date.map((item, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{112105001309}</td>
                                        <td>{item.AccountNumber}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Cash}</td>
                                        <td>{"I"}</td>
                                        <td>{item.date}</td>
                                        <td>{item.IFSC}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <TablePagination
                    // className={classes.pageContent}
                    component="div"
                    page={page}
                    rowsPerPageOptions={pages}
                    rowsPerPage={rowsPerPage}
                    count={users.length}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Container>
        </Fragment>
    );
};

export default ChefPayouts;