import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import { Container, Row, Col, Card, CardHeader, CardBody, Table, FormGroup, Button } from "reactstrap";
import { TablePagination } from '@material-ui/core'
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const UserComments = () => {
    const pages = [10, 30, 100, 200]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [filterfn, setFilterFn] = useState({ fn: items => { return items; } })

    const [show, setShow] = useState(true)
    const [showMfCash, setShowMfCash] = useState(true)
    const [showMyCash, setShowMyCash] = useState(true)

    const [users, setUsers] = useState([])
    const [usersShow, setUsersShow] = useState([])
    const [mfCash, setMfCash] = useState([])
    const [myCash, setMyCash] = useState([])

    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("")
    const [sdate, setSdate] = useState("")
    const [edate, setEdate] = useState("")
    const [showTable, setShowTable] = useState(true)
    useEffect(() => {
        try {
            window.addEventListener('message', handleMessage);
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            var database = app.database();
            database.ref().child("Users").orderByChild("JoiningDate").equalTo(today)
                .once('value', function (snapshot) {
                    setUsers([])
                    if (snapshot.exists()) {
                        var content = [];

                        snapshot.forEach(snap => {
                            if (snap.hasChild("UserName")) {
                                let val = snap.val()
                                let locker = {
                                    Chef: val.Chef,
                                    Comments: val.Comments,
                                    OrderId: val.OrderId,
                                    OrderPushId: val.OrderPushId,
                                    PushId: val.PushId,

                                }
                                content.push(locker);
                            }
                        });
                        content.reverse()
                        content.map(item => {
                            if (item.Chef === undefined) {
                                item.Chef = ""
                            }
                            if (item.Comments === undefined) {
                                item.Comments = ""
                            }
                            if (item.OrderId === undefined) {
                                item.OrderId = ""
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
            };
        } catch (err) {
            console.log(err)
        }
    }, [])



    //   const onSubmit = (event) => {
    //     event.preventDefault();
    //     setShowTable(false)
    //     // state.sdate=""
    //     // state.edate=""
    //     if (sdate === "" && edate === "") {
    //       alert("Select Start Date");
    //       // state.sdate.focus();
    //       return;
    //     }

    //     if (sdate.length !== 0 && edate.length !== 0) {
    //       var database = app.database();

    //       database.ref().child("Users")
    //         // back here
    //         .orderByChild("JoiningDate").startAt(sdate).endAt(edate)
    //         .once('value', function (snapshot) {
    //           setUsersShow([])
    //           if (snapshot.exists()) {
    //             // $('#datatable').empty();
    //             var content = [];

    //             snapshot.forEach(snap => {
    //               if (snap.hasChild("UserName")) {
    //                 let val = snap.val()
    //                 let locker = {
    //                   Name: val.Name,
    //                   UserName: val.UserName,
    //                   Email: val.Email,
    //                   Number: val.Number,
    //                   JoiningDate: val.JoiningDate,
    //                   Role: val.Role,
    //                   Status: val.Status,
    //                   Wallet: val.Wallet,
    //                   WalletInsta: val.WalletInsta,
    //                   Transactions: val.Transactions,
    //                   TransactionsInsta: val.TransactionsInsta
    //                 }
    //                 content.push(locker);
    //               }
    //             });
    //             content.map(item => {
    //               if (item.Name === undefined) {
    //                 item.Name = ""
    //               }
    //               if (item.UserName === undefined) {
    //                 item.UserName = ""
    //               }
    //               if (item.Email === undefined) {
    //                 item.Email = ""
    //               }
    //               if (item.Number === undefined) {
    //                 item.Number = ""
    //               }
    //               return item
    //             })
    //             setUsersShow(content);
    //           }

    //         })
    //     } else if (sdate.length !== 0 && edate.length === 0) {
    //       database = app.database();

    //       database.ref().child("Users")
    //         // back here
    //         .orderByChild("JoiningDate").equalTo(sdate)
    //         .once('value', function (snapshot) {
    //           setUsersShow([])
    //           if (snapshot.exists()) {
    //             // $('#datatable').empty();
    //             var content = [];

    //             snapshot.forEach(snap => {
    //               if (snap.hasChild("UserName")) {
    //                 let val = snap.val()
    //                 let locker = {
    //                   Name: val.Name,
    //                   UserName: val.UserName,
    //                   Email: val.Email,
    //                   Number: val.Number,
    //                   JoiningDate: val.JoiningDate,
    //                   Role: val.Role,
    //                   Status: val.Status,
    //                   Wallet: val.Wallet,
    //                   WalletInsta: val.WalletInsta,
    //                   Transactions: val.Transactions,
    //                   TransactionsInsta: val.TransactionsInsta
    //                 }
    //                 content.push(locker);
    //               }
    //             });
    //             content.map(item => {
    //               if (item.Name === undefined) {
    //                 item.Name = ""
    //               }
    //               if (item.UserName === undefined) {
    //                 item.UserName = ""
    //               }
    //               if (item.Email === undefined) {
    //                 item.Email = ""
    //               }
    //               if (item.Number === undefined) {
    //                 item.Number = ""
    //               }
    //               return item
    //             })
    //             setUsersShow(content);
    //           }

    //         })
    //     } else {
    //       database = app.database();

    //       database.ref().child("Users")
    //         // back here
    //         .orderByChild("JoiningDate").equalTo(edate)
    //         .once('value', function (snapshot) {
    //           setUsersShow([])
    //           if (snapshot.exists()) {
    //             // $('#datatable').empty();
    //             var content = [];

    //             snapshot.forEach(snap => {
    //               if (snap.hasChild("UserName")) {
    //                 let val = snap.val()
    //                 let locker = {
    //                   Name: val.Name,
    //                   UserName: val.UserName,
    //                   Email: val.Email,
    //                   Number: val.Number,
    //                   JoiningDate: val.JoiningDate,
    //                   Role: val.Role,
    //                   Status: val.Status,
    //                   Wallet: val.Wallet,
    //                   WalletInsta: val.WalletInsta,
    //                   Transactions: val.Transactions,
    //                   TransactionsInsta: val.TransactionsInsta
    //                 }
    //                 content.push(locker);
    //               }
    //             });
    //             content.reverse()
    //             content.map(item => {
    //               if (item.Name === undefined) {
    //                 item.Name = ""
    //               }
    //               if (item.UserName === undefined) {
    //                 item.UserName = ""
    //               }
    //               if (item.Email === undefined) {
    //                 item.Email = ""
    //               }
    //               if (item.Number === undefined) {
    //                 item.Number = ""
    //               }
    //               return item
    //             })
    //             setUsersShow(content);
    //           }

    //         })
    //     }

    //   }
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

        iframe.focus();
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
                pdf.save("OrderRatings.pdf");
            });
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    let excludeSearch = ["OrderPushId", "PushId", "Ratings"]

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
            <BreadCrumb parent={<Home />} subparent="Settings" title="User Report" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h6> User Data</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                            
                                    {/* <CardBody>
                                        <Row>
                                            <FormGroup className="col-md-3">
                                                <label className="form-label">From Date <span style={{ color: "red" }}>*</span></label>
                                                <div className="input-group">
                                                    <input type="date" id="sdate" className="form-control" value={sdate} onChange={onSdateChangeHandler} />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="col-md-3">

                                                <label className="form-label">To Date <span style={{ color: "red" }}>*</span></label>
                                                <div className="input-group">
                                                    <input type="date" id="edate" className="form-control" value={edate} onChange={onEdateChangeHandler} />
                                                </div>
                                            </FormGroup>


                                            <div className="col-md-4">

                                                <input className="btn btn-primary mr-1" style={{ marginTop: "30px", padding: "10px 15px" }} type="button" name="filter" value="Filter" onClick={(event) => onSubmit(event)} id="filter" />

                                            </div>

                                        </Row>
                                    </CardBody> */}

                                    <div className="input-group col-md-11" style={{ margin: "1.5%" }}>
                                        {/* <div className="col-md-5" style={{ margin: "1%" }}> */}
                                        {/* <div className="form-group "> */}
                                        {/* <label className="form-label">Search </label> */}
                                        <input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                                        <div className="clearfix"></div>
                                        <span className="input-group-btn"
                                            style={{ width: "50%", marginLeft: "-30px" }}></span>
                                        {/* </div>
                  </div> */}

                                        {/* <div className="col-md-11 text-right" style={{ marginTop: "-5%", marginBottom: "3%" }}> */}
                                        <div className="dt-buttons btn-group">
                                            <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button>
                                            <ReactHTMLTableToExcel
                                                className="btn btn-info"
                                                table="datatable"
                                                filename="OrderRatings"
                                                sheet="OrderRatings"
                                                buttonText="Excel" />
                                            <iframe
                                                id="iDatatable"
                                                src="/reports/order-rating-reports"
                                                style={{ display: 'none' }}
                                                title="Receipt"
                                            />
                                            <Button className="warning" onClick={() => printIframe('iDatatable')}>
                                                {isLoading ? 'Print' : 'Print Receipt'}
                                            </Button>
                                        </div>
                                    </div>
                                    <div style={{ overflowX: "scroll" }}>
                                        <div className="table-responsive text-nowrap">
                                            <Table className="datatables-demo table table-striped table-bordered" id="datatable">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">SL.NO</th>
                                                        <th scope="col"> Chef ID </th>
                                                        <th scope="col">Order ID	</th>
                                                        <th scope="col"> User Comments	</th>
                                                        <th scope="col">Ratings</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recordsAfterPagingAndSorting().map((item, id) => {
                                                        return (
                                                            <tr key={id}>
                                                                <td>{id + 1}</td>
                                                                <td className="">{item.Chef}</td>
                                                                <td className="">{item.OrderId}</td>
                                                                <td className="">{item.Comments}</td>
                                                                <td className="">{item.Ratings}</td>
                                                                

                                                            </tr>
                                                        )

                                                    })}

                                                </tbody>


                                            </Table>
                                        </div>
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
      </Container>
    </Fragment>
  );
};

export default UserComments;