import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Input,Button} from "reactstrap";
import DatePicker from "react-datepicker";
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
const OrdersReport = (props) => {
    const [users,setUsers] = useState([])
    const [state, setState] = useState({sdate:"",edate:"",search:""});
    const [isLoading, setIsLoading] = useState(true);
    const [show,setShow] = useState(true)

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);

            var database = app.database();
            database.ref().child("Users")
        .once('value', function(snapshot){
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
                content.push(snap.val());
                 
              });
              content.reverse()
              content.map(item=>{
                if(item.Number===undefined){
                  item.Number="undefined"
                }
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
    const {id, value} = event.target
    setState(prevState =>({
      ...prevState,
      [id]: value
    }))
   
// setSearchTerm(event.target.value)

  }
  
  const onSubmit =  (event) => {
    event.preventDefault();
// state.sdate=""
// state.edate=""
if(state.sdate.length==0&&state.edate.length==0)
{
    alert("Select Start Date");
    // state.sdate.focus();
    return;
} 
var database = app.database();
      database.ref().child("Users")
      // back here
      .orderByChild("JoiningDate").startAt(state.sdate).endAt(state.edate)
      .once('value', function(snapshot){
          if(snapshot.exists()){
                // $('#datatable').empty();
                var content = [];
                
                snapshot.forEach(snap=>{
                    content.push(snap.val());
                     
                  });
                  setUsers(content);
                }
            
        })
    
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
        pdf.save("OrderedReport.pdf");  
      });  
  }
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>}  title="User Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6> Order Data</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                       
                       <CardBody>
                       <Row>
                                        <FormGroup className="col-md-3">
                                        <label className="form-label">From Date <span style={{color: "red"}}>*</span></label>
                                        <div className="input-group">
                                        <input type="date" id="sdate" className="form-control"value={state.sdate} onChange={onChangeHandler} />
                          </div>
                                        </FormGroup>
                      <FormGroup className="col-md-3">
                      
                        <label className="form-label">To Date <span style={{color: "red"}}>*</span></label>
                          <input type="date" id="edate" className="form-control"value={state.edate} onChange={onChangeHandler} />
                      </FormGroup>
                    
                                    <div className="col-md-3">
                                       
                                    <input className="btn btn-primary mr-1" style={{marginTop: "24px", padding: "10px 15px"}} type="button" name="filter"  onClick={(event) => onSubmit(event)} value="Filter" id="filter"/>
                                   
                                    </div>
                                  
                                    </Row>
                    </CardBody>
                   
                      
                        <div className="col-md-5" style={{margin: "0%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                         <input type="text" id="search"  value={state.search} onChange={onChangeHandler}  required=""   className="form-control" placeholder="Search for number" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="OrderedReport"  
                sheet="OrderedReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/order-report"
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
                                            <th scope="col"> Name	</th>
                                            <th scope="col"> User Name </th>
                                            <th scope="col"> Email		</th>
                                            <th scope="col">  Number	</th>
                                            <th scope="col"> Joining Date	 	</th>
                                            <th scope="col"> Role	</th>
                                            <th scope="col"> Reason	</th>
                                            <th scope="col"> Status	</th>
                                            <th scope="col"> Wallet	</th>
                                                                                      
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(orders =>
                                            orders.Number.includes(state.search)).map((item,id)=>{
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                                                                                                            
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.UserName}</td>
                                                       <td className="">{item.Email}</td>
                                                       <td className="">{item.Number}</td>
                                                       <td className="">{item.JoiningDate}</td>
                                                       <td className="">{item.Role}</td>
                                                       <td className="">{item.Reason}</td>

                                                       <td className="">{item.Status}</td>
                                                       <td className="">{item.Wallet}</td>

                                                     </tr> 
                                                    )
                                                
                                                    })}
                                       
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
        
export default OrdersReport;