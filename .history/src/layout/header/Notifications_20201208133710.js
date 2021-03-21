import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import { Container, Row, Col, Card, CardHeader, CardBody, Table, FormGroup, Button } from "reactstrap";
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { TablePagination} from '@material-ui/core'

import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const OrdersReport = (props) => {
  const pages = [10, 30, 100,200]
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(pages[page])
  const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
  
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [sdate, setSdate] = useState("")
  const [edate, setEdate] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(true)
  const [showTable,setShowTable] = useState(true)
  const [orderDate,setOrderDate] = useState([])

  useEffect(() => {
    try {
      window.addEventListener('message', handleMessage);

      app.database().ref().child("Notifications").limitToLast(10)
      .on('value',function(snapshot){
        if(snapshot.exists()){
        const content=[]
        snapshot.forEach(snap=>{
          let val = snap.val()
          content.push(val)
        })
        setUsers(content)
            setShow(false)
          }
           else {
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

//   const onSdateChangeHandler = (event) => {
//     setSdate(event.target.value)
//   }
//   const onEdateChangeHandler = (event) => {
//     setEdate(event.target.value)
//   }
//   // setSearchTerm(event.target.value)


//   const onChangeStateSearch = (event) => {
//     setSearch(event.target.value)

//   }

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

//     if (sdate !== "" && edate !== "") {
//       var database = app.database();

//       database.ref().child("Orders")
//         .orderByChild("DeliveryDate").startAt(sdate).endAt(edate)
//         .once('value', function (snapshot) {
//           setOrderDate([])
//           if (snapshot.exists()) {
//             // $('#datatable').empty();
//             var content = [];

//             snapshot.forEach(snap => {
//               if(snap.hasChild("Pushid")){
//               let val = snap.val()
//               if (val.Status === "5") {

//                 var totalprod = "";
//                 snap.child('Cart').forEach(function (data1) {
//                   var val1 = data1.val();
//                   totalprod += val1.Name + " - " + val1.Qty + " / " + val1.Price + ",";
//                   val.totalProd = totalprod
//                 });
//                 let locker = {
//                   DeliveryDate: val.DeliveryDate,
//                   DeliveryPartner: val.DeliveryPartner,
//                   Payment: val.Payment,
//                   Address: val.Address,
//                   Total: val.Total,
//                   Discount: val.Discount,
//                   Packing: val.Packing,
//                   DeliveryCharges: val.DeliveryCharges,
//                   Subtotal: val.Subtotal,
//                   totalProd: val.totalProd,
//                   OrderType: val.OrderType,
//                   Number: val.Number,
//                   CName: val.CName,
//                   OrderNo: val.OrderNo,
//                   OrderDateTime: val.OrderDateTime,
//                   OrderDate: val.OrderDate
       
  
//                 }
  
//                 content.push(locker); 
//                             }
//             }
//             });
//             content.reverse()
//             content.map(item=>{
//               if(item.OrderNo===undefined){
//                 item.OrderNo=""
//               }
//               if(item.Number===undefined){
//                 item.Number=""
//               }
             
//               if(item.CName===undefined){
//                 item.CName=""
//               }
//               return item
//             })

//             setOrderDate(content);
//           }
//           })

//     } else if (sdate !== "" && edate === "") {
//       var database = app.database();
//       database.ref().child("Orders")
//         .orderByChild("DeliveryDate").equalTo(sdate)
//         .once('value', function (snapshot) {
//           setOrderDate([])
//           if (snapshot.exists()) {
//             // $('#datatable').empty();
//             var content = [];

//             snapshot.forEach(snap => {
//               if(snap.hasChild("Pushid")){
//               let val = snap.val()
//               if (val.Status === "5") {

//                 var totalprod = "";
//                 snap.child('Cart').forEach(function (data1) {
//                   var val1 = data1.val();
//                   totalprod += val1.Name + " - " + val1.Qty + " / " + val1.Price + ",";
//                   val.totalProd = totalprod
//                 });
//                 let locker = {
//                   DeliveryDate: val.DeliveryDate,
//                   DeliveryPartner: val.DeliveryPartner,
//                   Payment: val.Payment,
//                   Address: val.Address,
//                   Total: val.Total,
//                   Discount: val.Discount,
//                   Packing: val.Packing,
//                   DeliveryCharges: val.DeliveryCharges,
//                   Subtotal: val.Subtotal,
//                   totalProd: val.totalProd,
//                   OrderType: val.OrderType,
//                   Number: val.Number,
//                   CName: val.CName,
//                   OrderNo: val.OrderNo,
//                   OrderDateTime: val.OrderDateTime,
//                   OrderDate: val.OrderDate
       
  
//                 }
  
//                 content.push(locker); 
//                             }
//             }
//             });
//             content.reverse()
//             content.map(item=>{
//               if(item.OrderNo===undefined){
//                 item.OrderNo=""
//               }
//               if(item.Number===undefined){
//                 item.Number=""
//               }
             
//               if(item.CName===undefined){
//                 item.CName=""
//               }
//               return item
//             })
         
//             setOrderDate(content);
     
//           }
//         })
      
//     } else {
//       database = app.database();

//       database.ref().child("Orders")
//         .orderByChild("DeliveryDate").equalTo(edate)
//         .once('value', function (snapshot) {
//           setOrderDate([])
//           if (snapshot.exists()) {
//             // $('#datatable').empty();
//             var content = [];

//             snapshot.forEach(snap => {
//               if(snap.hasChild("Pushid")){
//               let val = snap.val()
//               if (val.Status === "5") {

//                 var totalprod = "";
//                 snap.child('Cart').forEach(function (data1) {
//                   var val1 = data1.val();
//                   totalprod += val1.Name + " - " + val1.Qty + " / " + val1.Price + ",";
//                   val.totalProd = totalprod
//                 });
//                 let locker = {
//                   Name: val.Name,
                 
       
  
//                 }
  
//                 content.push(locker); 
//                             }
//             }
//             });
//             content.reverse()
//             // content.map(item=>{
//             //   if(item.OrderNo===undefined){
//             //     item.OrderNo=""
//             //   }
//             //   if(item.Number===undefined){
//             //     item.Number=""
//             //   }
             
//             //   if(item.CName===undefined){
//             //     item.CName=""
//             //   }
//             //   return item
//             // })
          
//             setOrderDate(content);
   
//   }
// })
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
        pdf.save("Notifications.pdf");
      });
  }
  const handleChangePage = (event, newPage) =>{
    setPage(newPage)
}
const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
} 
let excludeSearch = ["DeliveryDate", "DeliveryPartner", "Payment","Address","Total","Discount","Packing","DeliveryCharges","Subtotal","totalProd","OrderType","OrderDateTime","OrderDate"] 


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
const recordsAfterDateShow = () => {
  return filterfn.fn(orderDate)
}
  return (
    <Fragment>
      <BreadCrumb parent={<Home />} subparent = "Notification" title="All" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h6>All Notifications</h6>
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


              {/* <div className="col-md-5" style={{ margin: "1%" }}>
                                <div className="form-group col-md-10">
                                    <label className="form-label">Search </label>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                                    <div className="clearfix"></div>
                                </div>
                            </div> */}
              <div className="col-md-11 text-right" style={{ marginTop: "-5%", marginBottom: "3%" }}>
                <div className="dt-buttons btn-group">
                  <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button>
                  <ReactHTMLTableToExcel
                    className="btn btn-info"
                    table="datatable"
                    filename="Notifications"
                    sheet="Notifications"
                    buttonText="Excel" />
                  <iframe
                    id="iDatatable"
                    src="/notifications/all-notifications"
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
                      <th>SL.No</th>
                  <th>Name</th>

                    </tr>
                  </thead>
                  {/* {showTable===true? */}
                  <tbody> 
                  {users.map((item, id) => {
                      return (
                        <tr key={id}>
                            <td>{id+1}</td>
                      <td>{item.Name}</td>
                        </tr>
                      )
                  })
                  }
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

export default OrdersReport;