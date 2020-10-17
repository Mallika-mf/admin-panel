import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Input,Button} from "reactstrap";
import {useHistory} from 'react-router-dom'
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

const AdminUserReport = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users,setUsers] = useState([])
    const [searchTerm, setSearchTerm]=useState("")
    const [show,setShow] = useState(true)

    useEffect(()=>{
        window.addEventListener('message', handleMessage);

        var database = app.database();
        // pushid1[$("#zone")[0].selectedIndex]
        database.ref().child("WebUser")
        .once('value', function(snapshot){
            if(snapshot.exists()){
                // $('#datatable').empty();
                var content = [];
                
                snapshot.forEach(snap=>{
                    content.push(snap.val());
                     
                  });
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
                pdf.save("AdminUserReport.pdf");  
              });  
          }
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>}  title="Admin User Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6> Admin Data</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                      
                        <div className="col-md-5" style={{margin: "0%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text"  value={searchTerm} onChange={onChangeHandler}  required=""   className="form-control" placeholder="Search for number" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="AdminUserReport"  
                sheet="AdminUserReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/admin-user-report"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatable')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
                      </div>
                      </div>
                     
                            <div className="table-responsive">
                                <Table id="datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col"> Name	</th>
                                            <th scope="col"> User Name		</th>
                                            <th scope="col"> Password		</th>
                                            <th scope="col"> Role	</th>
                                                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(orders =>
                                            orders.Name.includes(searchTerm)).map((item,id)=>{
                                                    return(
                                                        <tr key={id}>
                                                            <td>{id+1}</td>
                                                            <td className="item_cityname">{item.Name}</td>
                                                            <td className="" >{item.UserName}</td>
                                                            <td className="" >{item.Password}</td>
                                                            <td className="" >{item.Role}</td>

                                                        </tr>
                                                    )
                                                }
                                                )}
                                       
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
        
export default AdminUserReport;