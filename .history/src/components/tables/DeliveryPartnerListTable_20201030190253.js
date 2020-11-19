import React, { Fragment,useState,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather'
import {Container,Row,Col,Card,CardHeader,Table,Button} from "reactstrap";
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import {BeatLoader}  from "react-spinners";
import {TablePagination,Toolbar} from '@material-ui/core'

import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const DeliveryPartnerListTable = () => {

    const pages = [10,25,30]
    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(pages[page])
    const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
    const [show,setShow] = useState(true)
    const [users,setUsers] = useState([])
    const [searchTerm, setSearchTerm]=useState("")
    const [isLoading, setIsLoading] = useState(true);

   useEffect(()=>{
    window.addEventListener('message', handleMessage);

    var database = app.database();
    // pushid1[$("#zone")[0].selectedIndex]
    database.ref().child("DeliveryPartner")
.once('value', function(snapshot){
    if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
                let val = snap.val()
                let locker ={
                    UserId:val.UserId,
                    FName: val.FName,
                    Age: val.Age,
                    Gender : val.Gender,
                    Working: val.Working,
                    Maritial: val.Maritial,
                    MobileNumber: val.MobileNumber,
                    AlternateNumber: val.AlternateNumber,
                    Address: val.Address,
                    CityName: val.CityName,
                    LocalityName: val.LocalityName,
                    State : val.Status,
                    Zipcode: val.Zipcode,
                    Password: val.Password,
                    CPassword: val.CPassword,
                    AccountName: val.AccountName,
                    AccountNumber: val.AccountNumber,
                    IFSC: val.IFSC,
                    BranchName: val.BranchName,
                    BranchAddress: val.BranchAddress,
                    Remarks: val.Remarks,
                    VName: val.VName,
                    VNumber: val.VNumber,
                    INumber: val.INumber,
                    RCNumber: val.RCNumber,
                    Amount: val.Amount,
                    PaymentType: val.PaymentType,
                    Reciept: val.Reciept,
                    Doc1: val.Doc1,
                    Doc2: val.Doc2,
                    Doc3: val.Doc3,
                    Doc4: val.Doc4,
                    Doc5: val.Doc5,
                    Doc6: val.Doc6,
                    Doc7: val.Doc7,
                    Status: val.Status

                } 
                content.push(locker);
                 
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

        
 
    const handleChangePage = (event, newPage) =>{
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }
    const handleSearch = (e)=>{
        let target = e.target.value.toLowerCase().trim()
        setFilterFn({
            fn: items =>{
                if(target === ""){
                return items;
                }
                else{
                return items.filter(x =>{
                  return Object.keys(x).some(key =>
                    users.includes(key) ?false: x[key]. toString().toLowerCase().includes(target)
                    )
                })
    
                }
            }
    
           
        })
    }
    const recordsAfterPagingAndSorting = ()=>{
        return filterfn.fn(users).slice(page*rowsPerPage,(page+1)*rowsPerPage)
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
                // var pageHeight = 290;  
                var imgHeight = canvas.height * imgWidth / canvas.width;  
                // var heightLeft = imgHeight;  
                const imgData = canvas.toDataURL('image/png');  
                const pdf = new jsPDF('p', 'mm', 'a4')  
                var position = 0;  
                // var heightLeft = imgHeight;  
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
                pdf.save("DeliveryPartnerList.pdf");  
              });  
          }
    
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Driver Management" title="Delivery Partner List"/>
            <Container fluid={true}>
 <Row>
 <Col sm="12">
 <CardHeader>
             <h5> Delivery Partner</h5>
             {/* <span> Use a class <code> table </code> to any table.</span> */}
         </CardHeader>
 </Col>
<div className="col-md-5" style={{margin: "1%"}}>
 <div className="form-group col-md-12">
      <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
          <input type="text" placeholder="Search..." onChange={handleSearch} required=""  className="form-control" placeholder="Search for Delivery Partner ID" title="Type in a name"/>
          <div className="clearfix"></div>
     </div>
 </div>
 <div className="col-md-6 text-right" style={{margin: "3%"}}>
<div className="dt-buttons btn-group">       
<Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
<ReactHTMLTableToExcel  
className="btn btn-info"  
table="datatable"  
filename="DeliveryPartnerList"  
sheet="DeliveryPartnerList"  
buttonText="Excel" />
<iframe
 id="iDatatable"
 src="/table/DeliveryPartnerList-table"
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
             
             <Table id='datatable'  className="datatables-demo table table-striped table-bordered" style={{tablelayout: "auto;"}}>
                 <thead >
                     <tr>
                         <th scop="col">SL.NO</th>
                         <th scop="col">Delivery Partner ID Number</th>
                         <th scop="col">Full Name	</th>
                         <th scop="col" >Father Name</th>
                         <th scop="col">Age</th>
                         <th scop="col">Gender</th>
                         <th scop="col">Working Hours	</th>
                         <th scop="col">Maritial Status</th>
                         <th  scop="col">Mobile Number	</th>
                         <th scop="col">Alternature Number	</th>
                         <th scop="col">Address	</th>
                         <th scop="col">City</th>
                         <th scop="col">Locality</th>
                         <th scop="col">State</th>
                         <th scop="col">Zip</th>
                         <th scop="col">Password</th>
                         <th scop="col">Confirm Password	</th>
                         <th scop="col">Bank Account Name	</th>
                         <th scop="col">Bank Account Number	</th>
                         <th scop="col">Bank IFSC Code	</th>
                         <th scop="col">Branch Name	</th>
                         <th scop="col" >Branch Address	</th>
                         <th scop="col">Branch Remarks	</th>
                         <th scop="col">Vehicle Name	</th>
                         <th scop="col">Vehicle Number	</th>
                         <th scop="col">Insurance Number</th>
                         <th scop="col">RC Number</th>
                         <th scop="col">Amount</th>
                         <th scop="col">Payment Type</th>
                         <th scop="col">Receipt</th>
                         <th scop="col">Passport Size Photo</th>
                         <th scop="col">Aadhar Card</th>
                         <th scop="col">Pan/Voter	</th>
                         <th scop="col">Passbook/Bank	</th>
                         <th scop="col" >RC Book</th>
                         <th scop="col" >Driving License</th>
                         <th scop="col" > Insurance Copy</th>
                         <th scop="col"> Status</th>

                     </tr>
                 </thead>
                 <tbody color="gray">
                 {recordsAfterPagingAndSorting().map((item,id)=>{
                                 return(
                                     <tr key={id}>
                                         
                                         <td>{id+1}</td>
                                         <td className="">{item.UserId}</td>
                                         <td className="">{item.Name}</td>
                                         <td className="">{item.FName}</td>
                                         <td className="">{item.Age}</td>
                                         <td className="">{item.Gender}</td>
                                         <td className="">{item.Working}</td>
                                         <td className="">{item.Maritial}</td>
                                         <td className="">{item.MobileNumber}</td>
                                         <td className="">{item.AlternateNumber}</td>
                                         <td className="">{item.Address}</td>
                                         <td className="">{item.CityName}</td>
                                         <td className="">{item.LocalityName}</td>
                                         <td className="">{item.State}</td>
                                         <td className="">{item.Zipcode}</td>
                                         <td className="">{item.Password}</td>
                                         <td className="">{item.CPassword}</td>
                                         <td className="">{item.AccountName}</td>
                                         <td className="">{item.AccountNumber}</td>
                                         <td className="">{item.IFSC}</td>
                                         <td className="">{item.BranchName}</td>
                                         <td className="">{item.BranchAddress}</td>
                                         <td className="">{item.Remarks}</td>
                                         <td className="">{item.VName}</td>
                                         <td className="">{item.VNumber}</td>
                                         <td className="">{item.INumber}</td>
                                         <td className="">{item.RCNumber}</td>
                                         <td className="">{item.Amount}</td>
                                         <td className="">{item.PaymentType}</td>
                                         <td className="">{item.Reciept}</td>
                                         <td className=""><img src={item.Doc1}  width="50px" height="50px" alt="doc1"/></td>
                                         <td className=""><img src={item.Doc2}  width="50px" height="50px" alt="doc1"/></td>
                                         <td className=""><img src={item.Doc3}  width="50px" height="50px" alt="doc1"/></td>
                                         <td className=""><img src={item.Doc4}  width="50px" height="50px" alt="doc1"/></td>
                                         <td className=""><img src={item.Doc5}  width="50px" height="50px" alt="doc1"/></td>
                                         <td className=""><img src={item.Doc6}  width="50px" height="50px" alt="doc1"/></td>
                                         <td className=""><img src={item.Doc7}  width="50px" height="50px" alt="doc1"/></td>
                                         <td className="">{item.Status}</td>
                                     </tr>
                                 )
                             }
                             )}
                    
                                 </tbody>
                                    </Table>
             
                                </div>
                                <TablePagination
                                    // className={classes.pageContent}
                                    component = "div"
                                    page = {page}
                                    rowsPerPageOptions = {pages}
                                    rowsPerPage = {rowsPerPage}
                                    count = {users.length}
                                    onChangePage = {handleChangePage}
                                    onChangeRowsPerPage = {handleChangeRowsPerPage}
                                    />
                            </Card>
                        </Col>
 
                        </Row>
        
                        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} className="sweet-loading">
                                     <BeatLoader
                                         css={override}
                                        size={30}
                                        margin={5}
                                        color={"#F10542"}
                                        loading={show}
                                        />
                                    </div>
                </Container> 
        </Fragment>
            );
        };
        
export default DeliveryPartnerListTable;