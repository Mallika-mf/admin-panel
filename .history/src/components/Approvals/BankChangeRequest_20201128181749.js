import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import app from '../../data/base'
import { Container, Row, Col, Card, CardHeader, Table, Button } from "reactstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const BankChangeRequest = () => {
    const [show, setShow] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    useEffect(() => {
        try {
            window.addEventListener('message', handleMessage);
            var database = app.database();
            database.ref().child("Requests")
                .orderByChild("RequestType").equalTo("Bank")
                .on('value', function (snapshot) {
                    setUsers([])
                    if (snapshot.exists()) {
                        var content = [];
                        snapshot.forEach(function (snap) {
                            var val = snap.val();
                            var data = snap.key
                            let locker = {
                                UserId: val.UserId,
                                Name: val.Name,
                                Number: val.Number,
                                ANumber: val.ANumber,
                                AName: val.AName,
                                AIfsc: val.AIfsc,
                                BName: val.BName,
                                BAddress: val.BAddress,
                                Statement: val.Statement,
                                data: data

                            }
                            content.push(locker)
                        })
                        setUsers(content)
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
    const SearchHandler = (event) => {
        setSearch(event.target.value)
    }
    const onSaveHandler = (event) => {
        var arrData = event.target.id.split("+")
        console.log(arrData)
        var pushid = arrData[0];
        var userid = arrData[1];
        var accountNumber = arrData[2];
        var accountName = arrData[3];
        var ifsc = arrData[4];
        var bankName = arrData[5];
        var bankAddress = arrData[6];
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
  
        today = yyyy + '-' + mm + '-' + dd;
        var time = new Date();
        var dd1 = String(time.getDate()).padStart(2, '0');
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  var mm1 = String(monthNames[time.getMonth() ]).padStart(2, '0'); //January is 0!
  var yyyy1 = time.getFullYear();
        var hh = time.getHours()
        var minute = time.getMinutes()
  
        time = dd1 + ', ' + mm1 + ' ' + yyyy1 + ' ' + hh + ':' + minute;

        console.log(ifsc)
        console.log(userid)
        console.log(pushid)
        // 0: "-MMPQWga9VvWct_W06T_"
        // 1: "MFCK31273"
        // 2: "39086694830"
        // 3: "state bank of india"
        // 4: "SBIN0016293"
        // 5: "SANJEEVAREDDY NAGAR BRANCH"
        // 6: "SANJEEVAREDDY NAGAR BRANCH PLOT NO 19-B"
        // 7: " H NO:7-1-397/136"
        var firebaseref1 = app.database().ref().child("CloudKitchen").child(userid);
        firebaseref1.child("AccountNumber").set(accountNumber)
        firebaseref1.child("AccountName").set(accountName)
        firebaseref1.child("BranchAddress").set(bankAddress)
        firebaseref1.child("BranchName").set(bankName)
        firebaseref1.child("IFSC").set(ifsc)
        firebaseref1.child("BankApprovalDate").set(today)  
        firebaseref1.child("BankApprovalDateTime").set(time)


        app.database().ref().child("Requests").child(pushid).remove();

        Swal.fire({
            icon: "success",
            title: "Approved!"
        });
    }

    const onDeleteHandler = (event) => {
        var pushid = event.target.id
        Swal.fire({
            title: "Are you sure?",
            text: "Once Deleted, Cannot be changed!",
            icon: "warning",
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'gray'
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    app.database().ref().child("Requests").child(pushid).remove();
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!"
                    });
                }
            });
    }
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
                pdf.save("BankChangeApproval.pdf");
            });
    }
    return (
        <Fragment>
            <BreadCrumb parent={<Home />} subparent="Settings" title=" Approvals" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <CardHeader>
                            <h6> Bank Change Request</h6>
                            {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                    </Col>
                    <div className="col-md-5" style={{ margin: "1%" }}>
                        <div className="form-group col-md-8">
                            <label className="form-label">Search </label>
                            <input type="text" id="myInput" className="form-control" value={search} onChange={SearchHandler} placeholder="Search for ChefId" title="Type in a name" />
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{ margin: "3%" }}>
                        <div className="dt-buttons btn-group">
                            <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button>
                            <ReactHTMLTableToExcel
                                className="btn btn-info"
                                table="datatable"
                                filename="BankChangeApproval"
                                sheet="BankChangeApproval"
                                buttonText="Excel" />
                            <iframe
                                id="iDatatable"
                                src="/approvals/BankChange-Requests"
                                style={{ display: 'none' }}
                                title="Receipt"
                            />
                            <Button className="warning" onClick={() => printIframe('iDatatable')}>
                                {isLoading ? 'Print' : 'Print Receipt'}
                            </Button>
                        </div>
                    </div>
                    <Col sm="12">
                        <Card>
                            <div className="table-responsive text-nowrap" style={{ overflowX: "scroll" }}   >

                                <Table id="datatable" data-toolbar="#bootstrap-table-toolbar" className="datatables-demo table table-striped table-bordered" style={{ tablelayout: "auto;" }}>
                                    <thead >
                                        <tr>
                                            <th>SL.No</th>
                                            <th>ChefId</th>
                                            <th>Name</th>
                                            <th>Number</th>
                                            <th>Account No</th>
                                            <th>Account Name</th>
                                            <th>IFSC Code</th>
                                            <th>Branch Name</th>
                                            <th>Branch Address</th>
                                            <th>Statement</th>
                                            <th>Action</th>
                                            <th>Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.filter(orders => orders.UserId.includes(search)).map((item, id) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{id + 1}</td>
                                                    <td>{item.UserId}</td>
                                                    <td>{item.Name}</td>
                                                    <td>{item.Number}</td>
                                                    <td>{item.ANumber}</td>
                                                    <td>{item.AName}</td>
                                                    <td>{item.AIfsc}</td>
                                                    <td>{item.BName}</td>
                                                    <td>{item.BAddress}</td>
                                                    <td style={{ fontSize: "25px", fontWeight: "bold" }}><a href={item.Statement} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-primary btn-md">View</button></a></td>
                                                    <td style={{ fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.data + "+" + item.UserId + "+" + item.ANumber + "+" + item.AName + "+" + item.AIfsc + "+" + item.BName + "+" + item.BAddress} onClick={onSaveHandler} className="btn btn-primary btn-md">Save</button></td>
                                                    <td style={{ fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.data} onClick={onDeleteHandler} className="btn btn-primary btn-md">Delete</button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>

                            </div>
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

export default BankChangeRequest;