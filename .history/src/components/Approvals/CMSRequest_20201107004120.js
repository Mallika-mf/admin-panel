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
    const pages = [10, 25, 30]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [users, setUsers] = useState([])
    const [address, setAddress] = useState("")
    const [reason, setReason] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(true)

    useEffect(() => {
        try {
            window.addEventListener('message', handleMessage);

            var database = app.database();
            database.ref().child("Requests")
                .orderByChild("RequestType").equalTo("Description")
                .on('value', function (snapshot) {
                    setUsers([])
                    if (snapshot.exists()) {
                        // $('#datatable').empty();
                        var content = [];

                        snapshot.forEach(snap => {
                            if (snap.hasChild("UserId")) {
                                var val = snap.val();

                                let locker = {
                                    UserId: val.UserId,
                                    Name: val.Name,
                                    Number: val.Number,
                                    MobileNumber: val.MobileNumber,
                                    Address: val.Address,
                                    Reason: val.Reason,

                                }
                                content.push(locker);
                            }
                        });
                        content.map(item => {
                            if (item.UserId === undefined) {
                                item.UserId = ""
                            }
                            if (item.Name === undefined) {
                                item.Name = ""
                            }
                            if (item.Number === undefined) {
                                item.Number = ""
                            }
                            setReason(item.Reason)
                            setAddress(item.Address)
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

    const onChangeAddress=(event)=>{
        setAddress(event.target.value)
        users.map(item=>{
            if(event.target.id === item.UserId){
                event.target.value = item.Address
            }
        })
    }
    const onChangeReason=(event)=>{
        setReason(event.target.value)
        users.map(item=>{
            if(event.target.id === item.UserId){
                event.target.value = item.Address
            }
        })
    }

    const onSaveHandler = (event) =>{
        let userid = event.target.id
        var firebaseref1 = app.database().ref().child("CloudKitchen").child(userid);
        firebaseref1.child("Details").set(address);
        firebaseref1.child("Brand").set(reason)
        app.database().ref().child("Requests").child(userid).remove();
        Swal( {
            icon: "success",
            text: "Approved!"
          }); 

    }

    const onDeleteHandler = (event) =>{
        let userid = event.target.id
        Swal({
            title: "Are you sure?",
            text: "Once Deleted, Cannot be changed!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                app.database().ref().child("Requests").child(userid).remove();      
              Swal( {
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
                pdf.save("CMS request.pdf");
            });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    let excludeSearch = ["Address", "Reason"]

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
            <BreadCrumb parent={<Home />} subparent="Approvals" title="Description Change Requests" />
            <Container fluid={true}>
                <Row>
                    <CardBody>
                        <CardHeader>
                            <h6>Description Change Requests</h6>
                        </CardHeader>


                    </CardBody>


                    <Col sm="12">
                        <Card>

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
                                        filename="CMS request"
                                        sheet="CMS request"
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
                            <div className="table-responsive text-nowrap">
                                <Table id="datatable">
                                    <thead>
                                        <tr>
                                            <th>SL.No</th>
                                            <th>ChefId</th>
                                            <th>Name</th>
                                            <th>Number</th>
                                            <th>Description</th>
                                            <th>Brand Ingredients</th>
                                            <th>Save</th>
                                            <th>Delete</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recordsAfterPagingAndSorting().map((item, id) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{id + 1}</td>
                                                    <td className="item_locality">{item.UserId}</td>
                                                    <td className="item_locality">{item.Name}</td>
                                                    <td className="">{item.Number}</td>
                                                    <td className=""><textarea type="text" className="description" rows="2" cols="50">{item.Address}</textarea></td>
                                                    <td className=""><textarea type="text" className="description" rows="2" cols="50">{item.Reason}</textarea></td>
                                                    <td className="" style={{ fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.UserId} onClick={onSaveHandler} className="btn btn-primary btn-md">Save</button></td>
                                                    <td className="" style={{ fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.UserId} onClick={onDeleteHandler} className="btn btn-secondary btn-md">Delete</button></td>
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