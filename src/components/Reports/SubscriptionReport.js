import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Input,Button} from "reactstrap";
import DatePicker from "react-datepicker";
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
const SubscriptionReport = (props) => {
    const [users,setUsers] = useState([])
    const [sdate,setSdate]=useState("")
    const [edate,setEdate]=useState("")
    const [search,setSearch]=useState("")    
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
    
const onChangeSdateHandler=(event)=>{
    setSdate(event.target.value)
  }
  
  const onChangeEdateHandler=(event)=>{
    setEdate(event.target.value)
  }
  const onChangeSearchHandler=(event)=>{
    setSearch(event.target.value)
  }
  const onSubmit =  (event) => {
    event.preventDefault();
  // state.sdate=""
  // state.edate=""
  if(sdate!==""&&edate!==""){
  
  var database = app.database();
  database.ref().child("Users").orderByChild("Created").startAt(sdate).endAt(edate)
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
  setUsers([])
  setUsers(content);
  setShow(false)
  
  }else{
    const timeout = setTimeout(() => {
        setShow(false)
      }, 3000);
      return ()=>{clearTimeout(timeout);}
  
  }
  
  })
  }else if(sdate!==""&&edate===""){
  var database = app.database();
  database.ref().child("Users").orderByChild("Created").equalTo(sdate)
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
    setUsers([])
      const timeout = setTimeout(() => {
          setShow(false)
        }, 3000);
        return ()=>{clearTimeout(timeout);}
  
  }
  
  })
  }else if(sdate===""&&edate!==""){
  var database = app.database();
  database.ref().child("Users").orderByChild("Created").equalTo(edate)
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
    setUsers([])
      const timeout = setTimeout(() => {
          setShow(false)
        }, 3000);
        return ()=>{clearTimeout(timeout);}
  
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
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 0;  
        var heightLeft = imgHeight;  
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
        pdf.save("SubscriptionReport.pdf");  
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
                        <h6> Payment Data</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                       
                       <CardBody>
                       <Row>
                       <FormGroup className="col-md-3">
                                        <label className="form-label">From Date <span style={{color: "red"}}>*</span></label>
                                        <div className="input-group">
                                        <input type="date" id="sdate" className="form-control"value={sdate} onChange={onChangeSdateHandler} />
                          </div>
                                        </FormGroup>
                      <FormGroup className="col-md-3">
                      
                        <label className="form-label">To Date <span style={{color: "red"}}>*</span></label>
                          <div className="input-group">
                          <input type="date" id="edate" className="form-control"value={edate} onChange={onChangeEdateHandler} />
                          </div>
                      </FormGroup>
                    
                                    <div className="col-md-3">
                                       
                                            <input className="btn btn-primary mr-1" style={{marginTop: "30px", padding: "10px 15px;"}} type="button" name="filter" onClick={(event) => onSubmit(event)} value="Filter" id="filter"/>
                                   
                                    </div>
                                  
                                    </Row>
                    </CardBody>
                   
                      
                    <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label" htmlFor="searchSubscription">Search <span style={{color: "red"}}>*</span></label>
                             <input type="number"  defaultValue={search} id="searchSubscription" onChange={onChangeSearchHandler}  required="" className="form-control" placeholder="Search for Number" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="SubscriptionReport"  
                sheet="SubscriptionReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/susbcription-report"
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
                                            orders.Number.includes(search)).map((item,id)=>{
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
                     {/*<Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Inverse Table</h5>
                                <span> Use a class <code> table-inverse </code> inside table element.</span>
                            </CardHeader>
                            <div className="table-responsive">
                                <Table className="table-inverse">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Country</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Alexander</td>
                                            <td>Orton</td>
                                            <td>@mdorton</td>
                                            <td>Admin</td>
                                            <td>USA</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>John Deo</td>
                                            <td>Deo</td>
                                            <td>@johndeo</td>
                                            <td>User</td>
                                            <td>USA</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Randy Orton</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td>admin</td>
                                            <td>UK</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Randy Mark</td>
                                            <td>Ottandy</td>
                                            <td>@mdothe</td>
                                            <td>user</td>
                                            <td>AUS</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Ram Jacob</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>admin</td>
                                            <td>IND</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                        </Col>*/}
                    {/*<Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Inverse Table with Primary background</h5>
                                <span> Use a class <code> .bg-info, .bg-success, .bg-warning and .bg-danger classes. </code> with light text on dark backgrounds inside table element. <span className="d-block"> To set the light background color use .bg-[color] class where [color] is the value of your selected color from stack color palette. So for teal color background class will be .bg-teal </span></span>
                            </CardHeader>
                                <div className="table-responsive">
                                    <Table striped className="bg-primary">
                                        <thead className="tbl-strip-thad-bdr">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Alexander</td>
                                                <td>Orton</td>
                                                <td>@mdorton</td>
                                                <td>Admin</td>
                                                <td>USA</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>John Deo</td>
                                                <td>Deo</td>
                                                <td>@johndeo</td>
                                                <td>User</td>
                                                <td>USA</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Randy Orton</td>
                                                <td>the Bird</td>
                                                <td>@twitter</td>
                                                <td>admin</td>
                                                <td>UK</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td>Randy Mark</td>
                                                <td>Ottandy</td>
                                                <td>@mdothe</td>
                                                <td>user</td>
                                                <td>AUS</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">5</th>
                                                <td>Ram Jacob</td>
                                                <td>Thornton</td>
                                                <td>@twitter</td>
                                                <td>admin</td>
                                                <td>IND</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>*/}
                        {/*<Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Hoverable rows</h5>
                                    <span>Use a class <code> table-hover </code> to enable a hover state on table rows within a <code>tbody</code>.</span>
                                </CardHeader>
                                <div className="table-responsive">
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Alexander</td>
                                                <td>Orton</td>
                                                <td>@mdorton</td>
                                                <td>Admin</td>
                                                <td>USA</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>John Deo</td>
                                                <td>Deo</td>
                                                <td>@johndeo</td>
                                                <td>User</td>
                                                <td>USA</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Randy Orton</td>
                                                <td>the Bird</td>
                                                <td>@twitter</td>
                                                <td>admin</td>
                                                <td>UK</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td>Randy Mark</td>
                                                <td>Ottandy</td>
                                                <td>@mdothe</td>
                                                <td>user</td>
                                                <td>AUS</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">5</th>
                                                <td>Ram Jacob</td>
                                                <td>Thornton</td>
                                                <td>@twitter</td>
                                                <td>admin</td>
                                                <td>IND</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>*/}
                        {/*<Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Contextual classes</h5>
                                    <span>Use contextual classes to color table rows or individual cells. you may use Classes <code>table-primary</code>,<code>table-secondary</code>,<code>table-success</code>,<code>table-info</code>,<code>table-warning</code>,<code>table-danger</code>,<code>table-light</code>,<code>table-active</code> in<code>tr</code></span>
                                </CardHeader>
                                <div className="table-responsive">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th scope="col">Class</th>
                                                <th scope="col">Heading</th>
                                                <th scope="col">Heading</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-primary">
                                                <th scope="row">Primary</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <th scope="row">Secondary</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-success">
                                                <th scope="row">Success</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-info">
                                                <th scope="row">Info</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-warning">
                                                <th scope="row">Warning</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-danger">
                                                <th scope="row">Danger</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-light">
                                                <th scope="row">Light</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-active">
                                                <th scope="row">Active</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Text or background utilities</h5>
                                    <span>Regular table background variants are not available with the inverse table, however, you may use Classes <code>bg-dark</code>,<code>bg-warning</code>,<code>bg-success</code>,<code>bg-info</code>,<code>bg-danger</code>,<code>bg-primary</code>,<code>bg-secondary</code>,<code>bg-light</code> in<code>td</code></span>
                                </CardHeader>
                                <div className="table-responsive">
                                    <Table className="table-borderedfor">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Heading</th>
                                                <th scope="col">Heading</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-active">
                                                <td className="bg-primary">1</td>
                                                <td className="bg-primary">primary</td>
                                                <td className="bg-primary">primary</td>
                                            </tr>
                                            <tr className="table-active">
                                                <td className="bg-secondary">2</td>
                                                <td className="bg-secondary">secondary</td>
                                                <td className="bg-secondary">secondary</td>
                                            </tr>
                                            <tr>
                                                <td className="bg-success">3</td>
                                                <td className="bg-success">success</td>
                                                <td className="bg-success">success</td>
                                            </tr>
                                            <tr>
                                                <td className="bg-info">4</td>
                                                <td className="bg-info">info</td>
                                                <td className="bg-info">info</td>
                                            </tr>
                                            <tr>
                                                <td className="bg-warning">5</td>
                                                <td className="bg-warning">warning</td>
                                                <td className="bg-warning">warning</td>
                                            </tr>
                                            <tr>
                                                <td className="bg-danger">6</td>
                                                <td className="bg-danger">danger</td>
                                                <td className="bg-danger">danger</td>
                                            </tr>
                                            <tr className="table-active">
                                                <td className="bg-light">7</td>
                                                <td className="bg-light">light</td>
                                                <td className="bg-light">light</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Table head options</h5>
                                    <span>Similar to tables and dark tables, use the modifier classes <code>.thead-dark</code>  to make <code>thead</code> appear light or dark gray.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table>
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">First Name</th>
                                                        <th scope="col">Last Name</th>
                                                        <th scope="col">Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Table head options</h5>
                                    <span>Similar to tables and dark tables, use the modifier classes <code>.bg-*</code>and  <code>.thead-light</code> to make <code>thead</code> appear light or dark gray.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">First Name</th>
                                                        <th scope="col">Last Name</th>
                                                        <th scope="col">Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Striped Row </h5>
                                    <span>Use <code>.table-striped</code> to add zebra-striping to any table row within the <code></code>. This styling doesn't work in IE8 and below as :nth-child CSS selector isn't supported.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table striped>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">First Name</th>
                                                        <th scope="col">Last Name</th>
                                                        <th scope="col">Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Striped Row with Inverse Table</h5>
                                    <span>Use <code>.table-striped</code> to add zebra-striping to any table row within the <code></code>. This styling doesn't work in IE8 and below as :nth-child CSS selector isn't supported.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table className="table-inverse" striped>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">First Name</th>
                                                        <th scope="col">Last Name</th>
                                                        <th scope="col">Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Caption</h5>
                                    <span>A <code>&lt;caption&gt;</code> functions like a heading for a table. It helps users with screen readers to find a table and understand what it’s about and decide if they want to read it.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table>
                                                <caption>List of users</caption>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">First Name</th>
                                                        <th scope="col">Last Name</th>
                                                        <th scope="col">Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Responsive Tables</h5>
                                    <span>A <code>&lt;caption&gt;</code> functions like a heading for a table. It helps users with screen readers to find a table and understand what it’s about and decide if they want to read it.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Breckpoint Specific</h5>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table className="table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <table className="table table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </div>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <table className="table table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </div>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <table className="table table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                        <th scope="col">Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>*/}
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
        
export default SubscriptionReport;