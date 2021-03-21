import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import { Container, Row, Col, Card, CardHeader, CardBody, Table, Form, FormGroup, Button, Input } from "reactstrap";
import { Database, ShoppingBag, MessageCircle, User, UserPlus, Layers, ShoppingCart, ArrowDown, Pocket, Monitor, Truck, BarChart, DollarSign, Percent, Headphones, Check, Trash } from 'react-feather'
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import { TablePagination } from '@material-ui/core'

import html2canvas from 'html2canvas'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const ChefDescriptions = () => {
  const pages = [10, 30, 100,200]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [filterfn, setFilterFn] = useState({ fn: items => { return items; } })
  const [cityStatus, setCityStatus] = useState("")
  const [localFood, setLocalFood] = useState("")
  const [show, setShow] = useState(true)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("")
  const [details, setDetails] = useState("")
  const [brands, setBrands] = useState("")

  useEffect(() => {
    try {
      window.addEventListener('message', handleMessage);
      var database = app.database();
      database.ref().child("CloudKitchen")
        .orderByChild("AStatus").equalTo("Active")
        .on('value', function (snapshot) {
          setUsers([])
          if (snapshot.exists()) {
            var content = [];

            snapshot.forEach(snap => {
              if(snap.hasChild("UserId")){
                let val = snap.val()
                let locker = {
                  UserId : val.UserId,
                  Name : val.Name,
                  MobileNumber : val.MobileNumber,
                  CityName : val.CityName,
                  Details : val.Details,
                  Brand : val.Brand,
                  City : val.City,
                  Local : val.Local,
  
  
                }
              content.push(locker);           
                 
              }
            });
            content.map(item => {
                if(item.UserId===undefined){
                  item.UserId=""
                }
                if(item.Name===undefined){
                  item.Name=""
                }
               
                if(item.MobileNumber===undefined){
                  item.MobileNumber=""
                }
             
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
  const onChangeDetailsName = (event) => {
    setDetails(event.target.value)
    users.map(item => {
      if (event.target.id === item.UserId) {
        item.Details = event.target.value
      }
    })
  }
  const onChangeBrandsName = (event) => {
    setBrands(event.target.value)
    users.map(item => {
      if (event.target.id === item.UserId) {
        item.Brand = event.target.value
      }
    })
  }

  const onChangeStateSearch = (event) => {
    setSearch(event.target.value)

  }

  const onSaveHandler = (event) => {
    var arrData = event.target.id.split(",")
    var userid = arrData[0]
    var localfood = arrData[1]
    var citypushid = arrData[2]
    var firebaseref = app.database().ref().child("CloudKitchen").child(userid);
    console.log(details)
    console.log(brands)
    if (details !== "" && brands !== "") {
      firebaseref.child("Details").set(details);
      firebaseref.child("Brand").set(brands);
    console.log(localFood)
    console.log(localfood)
      if (localfood === "Yes" && localfood !== undefined) {
        app.database().ref().child("LocalFood").child(citypushid).child(userid).child("Brand").set(brands)
        app.database().ref().child("LocalFood").child(citypushid).child(userid).child("Details").set(details)
      } else {
        app.database().ref().child(citypushid).child(userid).child("Brand").set(brands)
        app.database().ref().child(citypushid).child(userid).child("Details").set(details)
      }
    } else if (details !== "" && brands === "") {
      firebaseref.child("Details").set(details);
      if (localfood === "Yes" && localfood !== undefined) {
        app.database().ref().child("LocalFood").child(citypushid).child(userid).child("Details").set(details)
      } else {
        app.database().ref().child(citypushid).child(userid).child("Details").set(details)
      }
    } else if (brands !== "" && details === "") {
      firebaseref.child("Brand").set(brands);

      if (localfood === "Yes" && localfood !== undefined) {
        app.database().ref().child("LocalFood").child(citypushid).child(userid).child("Brand").set(brands)
      } else {
        app.database().ref().child(citypushid).child(userid).child("Brand").set(brands)
      }
    }else{
      return;
    }
    setBrands("")
    setDetails("")

    Swal.fire({
      title: "Successfully Updated!",
      icon: "success",
      confirmButtonText: "Ok"
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
        pdf.save("ChefDesciptionReport.pdf");
      });
  }
  const handleChangePage = (event, newPage) =>{
    setPage(newPage)
}
const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
}
let excludeSearch = ["CityName", "Details", "Brand","City","Local"] 

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
      <BreadCrumb parent={<Home />} subparent="Settings" title=" Report" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h6>Chef Descriptions</h6>
                {/* <span> Use a class <code> table </code> to any table.</span> */}
              </CardHeader>
              <div className="input-group col-md-11" style={{margin:"1.5%"}}>
              {/* <div className="col-md-5" style={{ margin: "1%" }}>
                                <div className="form-group col-md-10"> */}
                                    {/* <label className="form-label">Search </label> */}
                                    <input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                                    <div className="clearfix"></div>
                                    <span className="input-group-btn" 
            style={{width:"50%",marginLeft:"-30px"}}></span>
                                {/* </div>
                            </div> */}
              {/* <div className="col-md-11 text-right" style={{ marginTop: "-5%", marginBottom: "3%" }}> */}
                <div className="dt-buttons btn-group">
                  <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button>
                  <ReactHTMLTableToExcel
                    className="btn btn-info"
                    table="datatable"
                    filename="ChefDesciptionReport"
                    sheet="ChefDesciptionReport"
                    buttonText="Excel" />
                  <iframe
                    id="iDatatable"
                    src="/reports/chef-description-report"
                    style={{ display: 'none' }}
                    title="Receipt"
                  />
                  <Button className="warning" onClick={() => printIframe('iDatatable')}>
                    {isLoading ? 'Print' : 'Print Receipt'}
                  </Button>
                </div>
              </div>

              <div className="table-responsive text-nowrap">
                <Table className="datatables-demo table table-striped table-bordered" id="datatable">
                  <thead>
                    <tr>
                      <th scope="col">SL.NO</th>
                      <th scope="col"> Kitchen ID </th>
                      <th scope="col"> Full Name	</th>
                      <th scope="col"> Mobile Number	</th>
                      <th scope="col">  City</th>
                      <th scope="col"> Description	</th>
                      <th scope="col"> Brand Ingredient	</th>
                      <th scope="col"> Action	</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recordsAfterPagingAndSorting().map((item, id) => {
                      return (
                        <tr key={id}>
                          <td>{id + 1}</td>
                          <td className="">{item.UserId}</td>
                          <td className="">{item.Name}</td>
                          <td className="">{item.MobileNumber}</td>
                          <td className="">{item.CityName}</td>
                          <td className=""><textarea type="text" id={item.UserId} value={item.Details} onChange={onChangeDetailsName} className="details" rows="1" cols="30">{item.Details}</textarea></td>
                          <td className=""><textarea type="text" id={item.UserId} value={item.Brand} onChange={onChangeBrandsName} className="brand" rows="1" cols="30">{item.Brand}</textarea></td>
                          <td style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.UserId + "," + item.Local + "," + item.City} onClick={onSaveHandler} className="btn btn-success btn-md">{"Save"}</button></td>

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

export default ChefDescriptions;