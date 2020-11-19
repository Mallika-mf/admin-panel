import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Input,Button} from "reactstrap";
import { TablePagination} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import app from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const PaymentReport = (props) => {
  const pages = [10,20,30]
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(pages[page])
  const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
  
    const [users,setUsers] = useState([])
    const [searchTearm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [show,setShow] = useState(true)

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);

            var database = app.database();
            database.ref().child("CloudKitchen")
        .once('value', function(snapshot){
          setUsers([])
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            snapshot.forEach(data=>{
              if(data.hasChild("UserId")){
                var val = data.val();      
                if(val.Paid != undefined) {} else {
                  let locker = {
                  LocalityName: val.LocalityName,
                  CityName: val.CityName,
                  PP: val.PP,
                  Email: val.Email,
                  MobileNumber: val.MobileNumber,
                  Name: val.Name,
                  UserId: val.UserId
                }
                content.push(locker);             
                 }             
               } 
              });
              content.reverse()
              content.map(item=>{
              if(item.Name===undefined){
                item.Name=""
              }
              if(item.UserId===undefined){
                item.UserId=""
              }
             
              if(item.MobileNumber===undefined){
                item.MobileNumber=""
              }
              if(item.Email===undefined){
                item.Email=""
              }
              return item
            })
              setUsers(content);
              setShow(false)

            }else{
              const timeout = setTimeout(() => {
                  setShow(false)
                }, 3000);
                return ()=>{clearTimeout(timeout);}

          }
        
    })
  
    return () => {
        window.removeEventListener('message', handleMessage);
      };
   
      
 }catch(err){
     console.log(err)
 }
},[])
    
const onChangeHandler = (event) =>{
   
   
setSearchTerm(event.target.value)

  }
  
const onClickPaidHandler=(event)=>{
  let userid = event.target.id
  var firebaseref=app.database().ref().child("CloudKitchen").child(userid);
  Swal.fire({
    title: "Are you sure want to mark this chef as paid?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    cancelButtonColor:'gray'
  })
  .then((willDelete) => {
    if (willDelete.value) {
      app.database().ref().child("CloudKitchen").child(userid).child("Paid").set("Yes");      
      Swal.fire("Paid Sucessfully!", {
        icon: "success",
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
 const printDocument=(event)=> {  
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
        pdf.save("PaymentReport.pdf");  
      });  
  }
  const handleChangePage = (event, newPage) =>{
    setPage(newPage)
}
const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
}
let excludeSearch = ["LocalityName", "CityName", "PP"] 

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
            <BreadCrumb parent={<Home/>}  title="User Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6> Payment Data</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                       
                  </Card>
                  </Col>
                  </Row>
                  <Row>
                   
                  <div className="col-md-5" style={{ margin: "1%" }}>
                                <div className="form-group col-md-10">
                                    <label className="form-label">Search </label>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="PaymentReport"  
                sheet="PaymentReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/paymentReport"
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
                                        <th>User Id</th>
                                        <th>Name</th>
                                        <th>Number</th>
                                        <th>Email</th>
                                        <th>Image</th>
                                        <th>City</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                            

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {recordsAfterPagingAndSorting().map((item,id)=>{
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>       
                                                        <td className="">{item.UserId}</td>                                                                                                     
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.MobileNumber}</td>
                                                       <td className="">{item.Email}</td>
                                                       <td className="actions" style={{ fontSize: "25px", fontWeight: "bold"}}><a href={ item.PP } target="_blank"><button type="button"  className="btn btn-success btn-md">{"View"}</button></a></td>
                                                       <td className="">{item.CityName}</td>
                                                       <td className="">{item.LocalityName}</td>
                                                       <td className="actions" style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.UserId} onClick={onClickPaidHandler} className="btn btn-primary btn-md">Paid</button></td>                                                       
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
                    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} className="sweet-loading">
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
        
export default PaymentReport;