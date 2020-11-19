import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import { Container, Row, Col, Card, CardHeader, CardBody, Table, Form, FormGroup, Input, Button } from "reactstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { TablePagination } from '@material-ui/core'

import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const ChefProfilePhotoApproval = () => {
    const pages = [10, 20, 30]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [filterfn, setFilterFn] = useState({ fn: items => { return items; } })

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [show, setShow] = useState(true)

    useEffect(() => {
        window.addEventListener('message', handleMessage);

        var database = app.database();
        // pushid1[$("#zone")[0].selectedIndex]
        database.ref().child("PhotoRequest")
            .on('value', function (snapshot) {
                setUsers([])
                if (snapshot.exists()) {
                    // $('#datatable').empty();
                    var content = [];

                    snapshot.forEach(snap => {
                        if (snap.hasChild("UserId")) {
                            let val = snap.val()
                            let locker = {
                                UserId: val.UserId,
                                PP: val.PP,
                                Reason: val.Reason,
                            }
                            content.push(locker);
                        }
                    });
                    content.map(item => {

                        if (item.UserId === undefined) {
                            item.UserId = ""
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
    }, [])
    const onClickApprovalHandler = (event) => {
        let userid = event.target.id
        let pp = ""
        app.database().ref().child("PhotoRequest").child(userid)
            .once("value", function (snapshot) {
                if (snapshot.exists()) {
                    pp = snapshot.val().PP

                    var firebaseref1 = app.database().ref().child("CloudKitchen").child(userid);
                    firebaseref1.child("PPApproval").set("Yes");
                    firebaseref1.child("PP").set(pp)

                    app.database().ref().child("PhotoRequest").child(userid).remove();

                    Swal({
                        icon: "success",
                        text: "Approved!"

                    });
                }
            })
    }
    const onClickDeleteHandler = (event) => {
        let userid = event.target.id
        Swal({
            title: "Are you sure?",
            text: "Once Deleted, Cannot be changed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'gray'
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    app.database().ref().child("PhotoRequest").child(userid).remove();
                    Swal({
                        icon: "success",
                        text: "Deleted!"
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
                var pageHeight = 290;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4')
                var position = 0;
                var heightLeft = imgHeight;
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                pdf.save("ChefPPApproval.pdf");
            });
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    let excludeSearch = ["PP", "Reason"]

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
            <BreadCrumb parent={<Home />} title="Admin User Report" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h6> Admin Data</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
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
                                        table="datatable"
                                        filename="ChefPPApproval"
                                        sheet="ChefPPApproval"
                                        buttonText="Excel" />
                                    <iframe
                                        id="iDatatable"
                                        src="/approvals/chef-pp-approval"
                                        style={{ display: 'none' }}
                                        title="Receipt"
                                    />
                                    <Button className="warning" onClick={() => printIframe('iDatatable')}>
                                        {isLoading ? 'Print' : 'Print Receipt'}
                                    </Button>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <Table className="datatables-demo table table-striped table-bordered" id="datatable">
                                    <thead>
                                        <tr>
                                            <th>SL.No</th>
                                            <th>ChefId</th>
                                            <th>Profile Photo</th>
                                            <th>Reason</th>
                                            <th>Save</th>
                                            <th>Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recordsAfterPagingAndSorting().map((item, id) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{id + 1}</td>
                                                    <td className="item_cityname">{item.UserId}</td>
                                                    <td className="actions" style={{ fontSize: "25px", fontWeight: "bold" }}><a href={item.PP} target="_blank"><button type="button" id="savebtn" className="btn btn-success btn-md">View</button></a></td>
                                                    <td className="" >{item.Reason}</td>
                                                    <td className="actions" style={{ fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.UserId} onClick={onClickApprovalHandler} className="btn btn-primary btn-md">Approve</button></td>
                                                    <td className="actions" style={{ fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.UserId} onClick={onClickDeleteHandler} className="btn btn-secondary btn-md">Delete</button></td>
                                                </tr>
                                            )
                                        }
                                        )}

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

export default ChefProfilePhotoApproval;