import React, { Fragment,useState} from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button} from "reactstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const LocationChangeApprovals = () => {
    const [show,setShow]=useState(true)
    const [isLoading, setIsLoading] = useState(true);
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
            pdf.save("FoodItemApprovals.pdf");  
          });
        }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Approvals" title="Agency Approvals"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h6> Location Change Request</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-8">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text" id="myInput"  className="form-control" placeholder="Search for Delivery Partner ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="LocationChangeRequest"  
                sheet="LocationChangeRequest"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/approvals/LocalityChange-Requests"
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
                                
                                <Table id="datatable"  data-toolbar="#bootstrap-table-toolbar" className="datatables-demo table table-striped table-bordered" style={{tablelayout: "auto;"}}>
                                    <thead >
                                        <tr>
                                            <th scop="col">SL.NO</th>
                                            <th scop="col">Date</th>
                                            <th scop="col">Delivery Partne  ID</th>
                                            <th scop="col"> Delivery Partner Name		</th>
                                            <th scop="col" >Delivery Partner Number </th>
                                            <th scop="col">Agency Id	</th>
                                            <th scop="col"> Total Amount			</th>
                                            <th scop="col"> Transaction ID		</th>
                                            <th scop="col"> Image	</th>
                                            <th scop="col">Remarks </th>
                                            <th scop="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                       
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
            );
        };
        
export default LocationChangeApprovals;