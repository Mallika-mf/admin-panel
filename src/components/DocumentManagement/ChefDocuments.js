import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import { Container, Row, Col, Card, CardHeader, Table, Input, Button } from "reactstrap";
import { TablePagination } from '@material-ui/core'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app from '../../data/base'
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const ChefDocuments = () => {
    const pages = [10, 30, 100,200, 500]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [filterfn, setFilterFn] = useState({ fn: items => { return items; } })
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(true)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            window.addEventListener('message', handleMessage);

            var database = app.database();
            database.ref().child("CloudKitchen")
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
        } catch (err) { console.log(err) }
    }, [])

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
                pdf.save("ChefDocuments.pdf");
            });
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    let excludeSearch = ["AStatus", "Doc1", "Doc2", "Doc3", "Doc4", "Doc5", "Doc6", "Doc7"]

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
        return filterfn.fn(users.reverse()).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const myFunction = () => {
        var input, filter, table, tr, td1,td2,td3,td4,td5,td6,td7,td8;
        var i,txtValue1,txtValue2,txtValue3,txtValue4,txtValue5,txtValue6,txtValue7,txtValue8;
        input = document.getElementById("search1");
        filter = input.value.toUpperCase();
        table = document.getElementById("datatable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];
        td3 = tr[i].getElementsByTagName("td")[3];
        td4 = tr[i].getElementsByTagName("td")[4];
        td5 = tr[i].getElementsByTagName("td")[5];
        td6 = tr[i].getElementsByTagName("td")[6];
        td7 = tr[i].getElementsByTagName("td")[7];
        td8 = tr[i].getElementsByTagName("td")[8];
        if (td1) {
          txtValue1 = td1.textContent || td1.innerText;
          txtValue2 = td2.textContent || td2.innerText;
          txtValue3 = td3.textContent || td3.innerText;
          txtValue4 = td4.textContent || td4.innerText;
          txtValue5 = td5.textContent || td5.innerText;
          txtValue6 = td6.textContent || td6.innerText;
          txtValue7 = td7.textContent || td7.innerText;
          txtValue8 = td8.textContent || td8.innerText;
        
         var main = txtValue1+ txtValue2+txtValue3+txtValue4+txtValue5+txtValue6+txtValue7+txtValue8;
           if (main.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
      } 
    return (
        <Fragment>
            <BreadCrumb parent={<Home />} subparent="Document Manager" title="Chef Documents" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <CardHeader>
                            <h6>Vendor Documents</h6>
                            {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                    </Col>
                   
                    <div className="col-md-5" style={{ margin: "1%" }}>
                        <div className="form-group col-md-9">
                            <label className="form-label">Search </label>
                            <input type="text" onKeyUp={myFunction}  required="" id = "search1" className="form-control" placeholder="Search..."/>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <Col sm="12">
                        <Card>
                        <div className="col-md-11 text-right" style={{ marginTop: "-5%", marginBottom: "3%" }}>
                                <div className="dt-buttons btn-group">
                                    <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button>
                                    <ReactHTMLTableToExcel
                                        className="btn btn-info"
                                        table="data-table"
                                        filename="ChefDocuments"
                                        sheet="ChefDocuments"
                                        buttonText="Excel" />
                                    <iframe
                                        id="iDatatable"
                                        src="/documentManagement/chef-documents"
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
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Vendor ID</th>
                                            <th scope="col">Vendor Name</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Passport Photo</th>
                                            <th scope="col">Adhar Card</th>
                                            <th scope="col">Pan/Voter</th>
                                            <th scope="col">Passbook/Bank</th>
                                            <th scope="col">FSSAI Certificate</th>
                                            <th scope="col">GST</th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        {recordsAfterPagingAndSorting().map((item, id) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{id + 1}</td>
                                                    <td className="item_userid">{item.UserId}</td>
                                                    <td className="item_locality">{item.Name}</td>
                                                    <td className="item_locality">{item.Number}</td>
                                                    {item.AStatus === "Active"?
                                                    <td style = {{color: "green"}}>{item.AStatus}</td>:
                                                    <td style = {{color: "red"}}>{item.AStatus}</td> 
                                                    }
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

export default ChefDocuments;