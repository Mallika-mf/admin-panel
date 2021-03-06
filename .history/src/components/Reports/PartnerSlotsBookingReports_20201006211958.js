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
const PartnerSlotBookingReports = (props) => {
    const [users,setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState({sdate:"",edate:"",search:""});
    const [show,setShow] = useState(true)

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);

            var today = String(new Date());
            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            // var yyyy = today.getFullYear();

            var database = app.database();
            database.ref().child("SlotsReport")
            .orderByChild("Date")   
            // .startAt("today")    
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
   
// setSearchTerm(event.target.value);;

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
database.ref().child("SlotsReport")
            .orderByChild("Date").startAt(state.sdate).endAt(state.edate)
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
        pdf.save("PartnerSlotBookingReport.pdf");  
      });  
  }
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>}  title="Review Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6>Chef Data</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                       
                       <CardBody>
                       <Row>
                                <Form className="theme-form">
                                        <FormGroup className="col-md-12">
                                        <label className="form-label">From Date <span style={{color: "red"}}>*</span></label>
                                        <div className="input-group">
                                        <input type="date" id="sdate" className="form-control"value={state.sdate} onChange={onChangeHandler} />
                          </div>
                                        </FormGroup>
                                        </Form>
                      <FormGroup className="col-md-4">
                      
                        <label className="form-label">To Date <span style={{color: "red"}}>*</span></label>
                          <div className="input-group">
                          <input type="date" id="edate" className="form-control"value={state.edate} onChange={onChangeHandler} />
                          </div>
                      </FormGroup>
                    
                                    <div className="col-md-3">
                                       
                                    <input className="btn btn-primary mr-1" style={{marginTop: "24px", padding: "10px 15px"}} type="button" name="filter"  onClick={(event) => onSubmit(event)} value="Filter" id="filter"/>
                                   
                                    </div>
                                  
                                    </Row>
                    </CardBody>
                   
                      
                        <div className="col-md-5" style={{margin: "0%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text" id="search"  value={state.search} onChange={onChangeHandler}  required=""     className="form-control" placeholder="Search for Chef ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="PartnerSlotBookingReport"  
                sheet="PartnerSlotBookingReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/partner-slots-booking-reports"
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
                                        <th scope="col"> Chef Id		</th>
                                            <th scope="col"> Name	</th>
                                            <th scope="col">  Number	</th>
                                            <th scope="col"> Zone	</th>
                                            <th scope="col"> Date	</th>
                                            <th scope="col">Slot </th>
                                            <th scope="col">Executive	 </th>
                                            <th scope="col">Assign Zone	 </th>
                                            <th scope="col">Assign	 </th>
                                            <th scope="col">Delete	 </th>
                                            
                                            
                                                                                      
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(orders =>
                                            orders.Chef.includes(state.search)).map((item,id)=>{
                                             if(item.Assigned!=null){
                                                var a=item.Assigned.split("-");

                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>         
                                                        <td className="">{item.Chef}</td>                                                                                                   
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.Number}</td>
                                                       <td className="">{item.City}</td>
                                                       <td className="">{item.Locality}</td>
                                                       <td className="">{item.Address}</td>
                                                       <td className="">{item.Date}</td>

                                                       <td className="">{item.Slot}</td>
                                                       <td className="">{item.Zone}</td>
                                                       <td className="">{item.Food}</td>
                                                        <td >{a[1]}<br/>{a[0]}</td>
                                                        <td className="aname" style={{display:"none"}}>{a[1]}</td>
                                                        <td className="anumber" style={{display:"none"}}>{a[1]}</td>
                                                       <td className="item_route"><select className="form-control" id="items">
                                                           <option value="Select">{"Select"}</option>
                                                           <option value="1">{"Bang - North & East"}</option>
                                                           <option value="2">{"Bang - West & South & Central"}</option>
                                                           <option value="3">{"Navi Mumbai"}</option>
                                                           <option value="4">{"Mumbai - Thane"}</option>
                                                           <option value="5">{"Mumbai -South"} </option>
                                                           <option value="6">{"Mumbai - East"}</option>
                                                           <option value="7">{"Mumbai - West "}</option>
                                                           <option value="8">{"Mumbai - Harbour"}</option>
                                                           <option value="9">{"Pune - South & Central"}</option>
                                                           <option value="10">{"Pune - East & North"}</option>
                                                           <option value="11">{"Gurugram - All Zones"}</option>
                                                           <option value="12">{"Delhi - All Zones"}</option>
                                                           <option value="13">{"Hyd - West & North"}</option>
                                                           <option value="14">{"Hyd - East"}</option>
                                                           <option value="15">{"Hyd - Central"}</option>
                                                           <option value="16">{"Hyd - Northeast & South"}</option></select>
                                                           </td>
                                                           <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                           <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="save-row"><button type="button" id="savebtn" className="btn btn-success btn-md">{"Assign"}</button></a><br/><a href="#" className="update-row">{"Reschedule"}</a></td>
                                                           <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="delete-row"><button type="button" id="deletebtn" className="btn btn-danger btn-md">{"Cancel"}</button></a></td>
                                                     </tr> 
                                                    )
                                                    }else{
                                                        return(
                                                            <tr key={id}> 
                                                            <td>{id+1}</td>         
                                                            <td className="">{item.Chef}</td>                                                                                                   
                                                           <td className="">{item.Name}</td>
                                                           <td className="">{item.Number}</td>
                                                           <td className="">{item.City}</td>
                                                           <td className="">{item.Locality}</td>
                                                           <td className="">{item.Address}</td>
                                                           <td className="">{item.Date}</td>
    
                                                           <td className="">{item.Slot}</td>
                                                           <td className="">{item.Zone}</td>
                                                           <td className="">{item.Food}</td>
                                                           <td ></td>
                                                           <td className="aname" style={{display:"none"}}></td>
                                                           <td className="anumber" style={{display:"none"}}></td>
                                                           <td className="item_route"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               <option value="1">{"Bang - North & East"}</option>
                                                               <option value="2">{"Bang - West & South & Central"}</option>
                                                               <option value="3">{"Navi Mumbai"}</option>
                                                               <option value="4">{"Mumbai - Thane"}</option>
                                                               <option value="5">{"Mumbai -South"} </option>
                                                               <option value="6">{"Mumbai - East"}</option>
                                                               <option value="7">{"Mumbai - West "}</option>
                                                               <option value="8">{"Mumbai - Harbour"}</option>
                                                               <option value="9">{"Pune - South & Central"}</option>
                                                               <option value="10">{"Pune - East & North"}</option>
                                                               <option value="11">{"Gurugram - All Zones"}</option>
                                                               <option value="12">{"Delhi - All Zones"}</option>
                                                               <option value="13">{"Hyd - West & North"}</option>
                                                               <option value="14">{"Hyd - East"}</option>
                                                               <option value="15">{"Hyd - Central"}</option>
                                                               <option value="16">{"Hyd - Northeast & South"}</option></select>
                                                               </td>
                                                               <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                               <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="save-row"><button type="button" id="savebtn" className="btn btn-success btn-md">{"Assign"}</button></a><br/><a href="#" className="update-row">{"Reschedule"}</a></td>
                                                               <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="delete-row"><button type="button" id="deletebtn" className="btn btn-danger btn-md">{"Cancel"}</button></a></td>
                                                         </tr> 
                                                        )
                                                    }
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
        
export default PartnerSlotBookingReports;