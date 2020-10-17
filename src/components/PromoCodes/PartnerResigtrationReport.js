import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import ChartistGraph from 'react-chartist';
import Chart from 'react-apexcharts'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, CardFooter } from 'reactstrap'
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent} from 'react-feather';
import app from '../../data/base'
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
const PartnerRegistrationReport = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [show,setShow] = useState(true)

    const [city,setCity] = useState([])
    const [searchTerm, setSearchTerm]=useState("")
 
     useEffect(()=>{
         try{
            window.addEventListener('message', handleMessage);
         app.database().ref().child("Date").set("Time");
 
         // $('#datatable').empty();
         var database = app.database();
         database.ref().child("Promocode").child("Chef")
         .once('value', function(snapshot){
             if(snapshot.exists()){
                 var content = [];
                
                 snapshot.forEach(snap=>{
                     content.push(snap.val());
                      
                   });
                   setCity( content );      
                   setShow(false)

             }else{
                const timeout = setTimeout(() => {
                    setShow(false)
                  }, 3000);
                  return ()=>{clearTimeout(timeout);}

            }
         })}catch(err){
             console.log(err.message)
         }
        
     },[])
     const  onChangeHandler=(event)=>{
         setSearchTerm(event.target.value);
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
                pdf.save("PartnerPromoCodeReport.pdf");  
              });  
          }
     return (
         <Fragment>
             <BreadCrumb parent={<Home/>} subparent="Settings" title="Promocode Report"/>
             <Container fluid={true}>
                 <Row>
                     <Col sm="12">
                     <CardHeader>
                                 <h5>PartnerPromoCode Reports</h5>
                                 {/* <span> Use a class <code> table </code> to any table.</span> */}
                             </CardHeader>
                     </Col>
                 <div className="col-md-5" style={{margin: "1%"}}>
                     <div className="form-group col-md-6">
                          <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                              <input type="text" value={searchTerm} onChange={onChangeHandler}  required=""  className="form-control" placeholder="Search for City" title="Type in a name"/>
                              <div className="clearfix"></div>
                         </div>
                     </div>
                     <div className="col-md-6 text-right" style={{margin: "3%"}}>
                 <div className="dt-buttons btn-group">       
                 <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="PartnerPromoCodeReport"  
                sheet="PartnerPromoCodeReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/promo-code/partner-registration-report"
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
                             <div className="table-responsive text-nowrap" style={{ overflowX:"scroll"}}   >
                                 
                                 <Table id="datatable"  className="table table-striped " >
                                     <thead >
                                         <tr >
                                             <th >SL.NO</th>
                                             <th >PromoCode</th>
                                             <th >Discount(%)</th>
                                             <th >Status</th>
                                             
 
                                         </tr>
                                     </thead>
                                     <tbody>
                                         {
                                           city.filter(orders =>
                                                 orders.PromoCode.includes(searchTerm)).filter(orders =>
                                                    orders.Disc.includes(searchTerm)).filter(orders =>
                                                        orders.Status.includes(searchTerm)).map((item,id)=>{
                                                 
                                                     return(
                                                         <tr key={id}>
                                                         <td> {id+1}</td>
                                                         <td> {item.PromoCode}</td>   
                                                         <td> {item.Disc}</td>
                                                         <td> {item.Status}</td>  
                                                        </tr>
                                                     )
                                                 
                                             })
                                         }
                                     
                                     </tbody>
                                 </Table>
                                 
                             </div>
                         </Card>
                     </Col>
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
                     )
}
export default PartnerRegistrationReport;