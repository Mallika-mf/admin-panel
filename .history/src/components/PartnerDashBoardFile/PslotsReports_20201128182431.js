import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Button} from "reactstrap";
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'
import {useHistory} from 'react-router-dom'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const PSlotBookingReports = (props) => {
    const [show,setShow] = useState(true)
        const history = useHistory()
    const [users,setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sdate,setSdate] = useState("")
    const [edate,setEdate] = useState("")

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);

            var name=window.localStorage.getItem('nam');
if(name===null){                      
    name=window.sessionStorage.getItem('nam');
    if(name===null){
                history.push(`${process.env.PUBLIC_URL}/login`);
    } 
}

var number=window.localStorage.getItem('number');
if(number===null){                      
    number=window.sessionStorage.getItem('number');
    if(number===null){
                history.push(`${process.env.PUBLIC_URL}/login`);
    } 
}
var together=number+"-"+name; 

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

app.database().ref().child("Date").set("Time")

            var database = app.database();
            database.ref().child("SlotsReport")
            .orderByChild("Date").startAt(today)   
            // .startAt("today")    
            .on('value', function(snapshot){
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
             if(snap.val().Assigned===together){ 
                content.push(snap.val());
             }
              });
              setUsers(content);
              setShow(false)

            }else{
                    setShow(false)
               
            }
        
    })
    return () => {
        window.removeEventListener('message', handleMessage);
      };
  
 }catch(err){
     console.log(err)
 }
},[])
    
const onChangeSearchHandler = (event) =>{
  setSearch(event.target.value)

  }
  const onChangeSdate = (event) =>{
      setSdate(event.target.value)
  }

  const onChangeEdate = (event) =>{
    setEdate(event.target.value)
}
  
  const onSubmit =  (event) => {
    event.preventDefault();
    var name=window.localStorage.getItem('nam');
    if(name===null){                      
        name=window.sessionStorage.getItem('nam');
        if(name===null){
                    history.push(`${process.env.PUBLIC_URL}/login`);
        } 
    }
    
    var number=window.localStorage.getItem('number');
    if(number===null){                      
        number=window.sessionStorage.getItem('number');
        if(number===null){
                    history.push(`${process.env.PUBLIC_URL}/login`);
        } 
    }
    var together=number+"-"+name; 
if(sdate!==""&&edate!=="")
{  
           

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
var database = app.database();
database.ref().child("SlotsReport")
            .orderByChild("Date").startAt(sdate).endAt(edate)
      .on('value', function(snapshot){
          setUsers([])
          if(snapshot.exists()){
                 
                var content = [];
                
                snapshot.forEach(snap=>{
                    if(snap.val().Assigned!=""){
                if(snap.val().Assigned===together){
                    content.push(snap.val());
                }
                    }
                  });
                  setUsers(content);
                }
            
        })
    }else if(sdate!==""&&edate==="")
    {
         database = app.database();
database.ref().child("SlotsReport")
            .orderByChild("Date").equalTo(sdate)
      .on('value', function(snapshot){
          setUsers([])
          if(snapshot.exists()){
                 
                var content = [];
                
                snapshot.forEach(snap=>{
                    if(snap.val().Assigned!=""){
                if(snap.val().Assigned===together){
                    content.push(snap.val());
                }
                    }
                  });
                  setUsers(content);
                }
            
        })
    }else if(sdate===""&&edate!=="")
    {
         database = app.database();
database.ref().child("SlotsReport")
            .orderByChild("Date").equalTo(edate)
      .on('value', function(snapshot){
          setUsers([])
          if(snapshot.exists()){
                 
                var content = [];
                
                snapshot.forEach(snap=>{
                    if(snap.val().Assigned!==""){
                if(snap.val().Assigned===together){
                    content.push(snap.val());
                }
                    }
                  });
                  setUsers(content);
                }
            
        })
    }
    
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
                                        <input type="date" id="sdate" className="form-control"value={sdate} onChange={onChangeSdate} />
                          </div>
                                        </FormGroup>
                                        </Form>
                      <FormGroup className="col-md-4">
                      
                        <label className="form-label">To Date <span style={{color: "red"}}>*</span></label>
                          <div className="input-group">
                          <input type="date" id="edate" className="form-control"value={edate} onChange={onChangeEdate} />
                          </div>
                      </FormGroup>
                    
                                    <div className="col-md-3">
                                       
                                    <input className="btn btn-primary mr-1" style={{marginTop: "24px", padding: "10px 15px"}} type="button" name="filter"  onClick={(event) => onSubmit(event)} value="Filter" id="filter"/>
                                   
                                    </div>
                                  
                                    </Row>
                    </CardBody>
                   
                      
                        <div className="col-md-5" style={{margin: "0%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label">Search </label>
                             <input type="text" id="search"  value={search} onChange={onChangeSearchHandler}  required=""     className="form-control" placeholder="Search for Chef ID" title="Type in a name"/>
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
                    src="/partner-pSlots-reports"
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
                                        <th>No</th>
                                                                <th>Chef Id</th>
                                                                <th>Name</th>
                                                                <th>Number</th>
                                                                <th>Address</th>
                                                                <th>Date</th>
                                                                <th>Slot</th>
                                            
                                            
                                                                                      
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(orders =>
                                            orders.Chef.includes(search)).map((item,id)=>{
                                             var len=item.Address.length;


                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>         
                                                        <td className="">{item.Chef}</td>                                                                                                   
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.Number}</td>
                                                       <td className="">{item.Address.substr(0,len/2)}<br/>{item.Address.substr(len/2)}</td>
                                                      <td className="">{item.Date}</td>
                                                           <td className="">{item.Slot}</td>
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
        
export default PSlotBookingReports;