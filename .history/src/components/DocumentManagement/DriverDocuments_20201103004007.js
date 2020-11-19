import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import { Container, Row, Col, Card, CardHeader, Table, Input } from "reactstrap";
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app from '../../data/base'
import { TablePagination } from '@material-ui/core'

import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const DriverDocuments = () => {
    const pages = [10, 25, 30]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [filterfn, setFilterFn] = useState({ fn: items => { return items; } })

    const [users, setUsers] = useState([])
    const [show, setShow] = useState(true)

    useEffect(() => {
        try {
            var database = app.database();
            database.ref().child("DeliveryPartner")
                .once('value', function (snapshot) {
                    setUsers([])
                    if (snapshot.exists()) {
                        // $('#datatable').empty();
                        var content = [];

                        snapshot.forEach(snap => {
                            if (snap.hasChild("UserId")) {
                                content.push(snap.val());
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
        } catch (err) { console.log(err) }
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    let excludeSearch = ["Doc1", "Doc2", "Doc3", "Doc4", "Doc5", "Doc6", "Doc7"]

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
            <BreadCrumb parent={<Home />} subparent="Document Manager" title="Delivery Partner  Documents" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <CardHeader>
                            <h6>Driver Documents</h6>
                            {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                    </Col>
                    <div className="col-md-6" style={{ margin: "1%" }}>
                        <div className="form-group col-md-6">
                            <label className="form-label">Search </label>
                            <Input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <Col sm="12">
                        <Card>

                            <div className="table-responsive text-nowrap" style={{ overflowX: "scroll" }}>
                                <Table style={{ scrollX: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Driver ID</th>
                                            <th scope="col">Driver Name</th>
                                            <th scope="col">Driver Number</th>
                                            <th scope="col">Passport Photoe</th>
                                            <th scope="col">Adhar Card</th>
                                            <th scope="col">Pan/Voter</th>
                                            <th scope="col">Passbook/Bank</th>
                                            <th scope="col">RC Book</th>
                                            <th scope="col">Driving License</th>
                                            <th scope="col">Insurance Copy</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recordsAfterPagingAndSorting().map((item, id) => {
                                            console.log(item)

                                            return (
                                                <tr key={id}>
                                                    <td>{id + 1}</td>
                                                    <td className="item_userid">{item.UserId}</td>
                                                    <td className="item_locality">{item.Name}</td>
                                                    <td>{item.MobileNumber}</td>
                                                    {item.Doc1 === "" ?
                                                        <td>Not Uploaded</td> :
                                                        <td><a href={item.Doc1} target="_blank" rel="noopener noreferrer">{"View"}</a></td>
                                                    }
                                                    {item.Doc2 === "" ?
                                                        <td>Not Uploaded</td> :
                                                        <td><a href={item.Doc2} target="_blank" rel="noopener noreferrer">{"View"}</a></td>
                                                    }
                                                    {item.Doc3 === "" ?
                                                        <td>Not Uploaded</td> :
                                                        <td><a href={item.Doc3} target="_blank" rel="noopener noreferrer">{"View"}</a></td>
                                                    }
                                                    {item.Doc4 === "" ?
                                                        <td>Not Uploaded</td> :
                                                        <td><a href={item.Doc4} target="_blank" rel="noopener noreferrer">{"View"}</a></td>
                                                    }
                                                    {item.Doc5 === "" ?
                                                        <td>Not Uploaded</td> :
                                                        <td><a href={item.Doc1} target="_blank" rel="noopener noreferrer">{"View"}</a></td>
                                                    }
                                                    {item.Doc6 === "" ?
                                                        <td>Not Uploaded</td> :
                                                        <td><a href={item.Doc6} target="_blank" rel="noopener noreferrer">{"View"}</a></td>
                                                    }
                                                    {item.Doc7 === "" ?
                                                        <td>Not Uploaded</td> :
                                                        <td><a href={item.Doc7} target="_blank" rel="noopener noreferrer">{"View"}</a></td>
                                                    }

                                                </tr>

                                            )
                                            //}


                                        })}

                                    </tbody>

                                </Table>

                            </div>
                            <TablePagination
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

export default DriverDocuments;