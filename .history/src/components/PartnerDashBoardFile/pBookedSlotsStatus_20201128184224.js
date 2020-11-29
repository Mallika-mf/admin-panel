import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Button} from "reactstrap";
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
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
const PBookedSlotsStatus = (props) => {
      const history = useHistory();
      const [show,setShow] = useState(true)

    const [users,setUsers] = useState([])
    const [search, setSearch] = useState("");
    const [sdate,setSdate] = useState("")
    const [edate,setEdate] = useState("")
    const [scity,setScity] = useState("")
    const [status,setStatus] = useState("")
    const [paymentstatus,setPaymentStatus] = useState("")
    const [reason,setReason] = useState("")
    const [paymentmode,setPaymentMode] = useState("")

        const [name,setName] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);

           
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
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
app.database().ref().child("Date").set("Time");

            var database = app.database();
            database.ref().child("SlotsReport")
            .orderByChild("Date").startAt(today)   
            // .startAt("today")    
            .on('value', function(snapshot){
                setUsers([])
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
            if(snap.val().Assigned===together){ 
                content.push(snap.val());
            }
              });
              content.map(item=>{
                  if(item.Chef===undefined){
                      item.Chef = ""
                  }
                  return item
              })
              setUsers(content);
              setShow(false)

            }else{
                    setShow(false)
            }
        
    })
    app.database().ref().child("Masters").child("City")
    .once('value').then(function(snapshot) {
        var content=[]
        snapshot.forEach(snap=>{
        // var val = snap.val(); 
        //     pushid.push(val.PushId);
        //     content.push(val.Name)
        content.push(snap.val())
    });
    setName(content)
})
  
 }catch(err){
     console.log(err)
 }
 return () => {
    window.removeEventListener('message', handleMessage);
  };
},[history])
    
const onChangeScity = (event) =>{
    setScity(event.target.value)
   
}

const onChangePaymentMode = (event) =>{
    setPaymentMode(event.target.value)
    users.map(item =>{
        if(event.target.id === item.PushId){
            item.PaymentMode = event.target.value
        }
        return item
    })
}

const onChangePaymentStatus = (event) =>{
    setPaymentStatus(event.target.value)
    users.map(item =>{
        if(event.target.id === item.PushId){
            item.PaymentStatus = event.target.value
        }
        return item
    })
}

const onChangeReason = (event) =>{
    setReason(event.target.value)
    users.map(item =>{
        if(event.target.id === item.PushId){
            item.Reason = event.target.value
        }
        return item
    })
}

const onChangeStatus = (event) =>{
    setStatus(event.target.value)
    users.map(item =>{
        if(event.target.id === item.PushId){
            item.Status = event.target.value
        }
        return item
    })
}

  const onChangeSaveRow = (event) =>{
      let pushid = event.target.id
      var firebaseref=app.database().ref().child("SlotsReport").child(pushid);
      if(status==""){
        alert("Select Status");
        return;
      }
      if(paymentstatus==""){
        alert("Select Payment Status");
        return;
      }
      if(status!==""&& reason!==""&& paymentmode!==""&& paymentstatus!==""){
        firebaseref.child("Status").set(String(status));
        firebaseref.child("Reason").set(String(reason));
        firebaseref.child("PaymentStatus").set(String(paymentstatus));
        firebaseref.child("PaymentMode").set(String(paymentmode));
      }
      if(status!==""&& reason!==""&& paymentmode!==""&& paymentstatus===""){
      firebaseref.child("Status").set(String(status));
      firebaseref.child("Reason").set(String(reason));
      firebaseref.child("PaymentMode").set(String(paymentmode));
    }
    if(status!==""&& reason!==""&& paymentmode===""&& paymentstatus!==""){
        firebaseref.child("Status").set(String(status));
        firebaseref.child("Reason").set(String(reason));
        firebaseref.child("PaymentStatus").set(String(paymentstatus));
      }
      if(status!==""&& reason===""&& paymentmode!==""&& paymentstatus!==""){
        firebaseref.child("Status").set(String(status));
        firebaseref.child("PaymentMode").set(String(paymentmode));
        firebaseref.child("PaymentStatus").set(String(paymentstatus));
      }
      if(status===""&& reason!==""&& paymentmode!==""&& paymentstatus!==""){
        firebaseref.child("Reason").set(String(reason));
        firebaseref.child("PaymentMode").set(String(paymentmode));
        firebaseref.child("PaymentStatus").set(String(paymentstatus));
      }
      if(status===""&& reason===""&& paymentmode!==""&& paymentstatus!==""){
        firebaseref.child("PaymentMode").set(String(paymentmode));
        firebaseref.child("PaymentStatus").set(String(paymentstatus));
      }
      if(status===""&& reason!==""&& paymentmode===""&& paymentstatus!==""){
        firebaseref.child("Reason").set(String(reason));
        firebaseref.child("PaymentStatus").set(String(paymentstatus));
      }
      if(status===""&& reason!==""&& paymentmode!==""&& paymentstatus===""){
        firebaseref.child("Reason").set(String(reason));
        firebaseref.child("PaymentMode").set(String(paymentmode));
      }
      if(status!==""&& reason===""&& paymentmode===""&& paymentstatus!==""){
        firebaseref.child("Status").set(String(status));
        firebaseref.child("PaymentStatus").set(String(paymentstatus));
      }
      if(status!==""&& reason===""&& paymentmode!==""&& paymentstatus===""){
        firebaseref.child("Status").set(String(status));
        firebaseref.child("PaymentMode").set(String(paymentmode));
      }
      if(status!==""&& reason!==""&& paymentmode===""&& paymentstatus===""){
        firebaseref.child("Status").set(String(status));
        firebaseref.child("Reason").set(String(reason));
      }


                Swal.fire({
                    title: "Status Updated Successfully!",
                    icon: "success",
                    confirmButtonText: "Ok" 
                   });
  }
  
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
        pdf.save("BookedSlotStatus.pdf");  
      });  
  }
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>}  title="Slot Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6>Slot Data</h6>
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
                   
                      
                        <div className="col-md-5" style={{margin: "1%"}}>
                        <Row>
                        <div className="form-group col-md-6">
                         <label className="form-label">Search </label>
                         <input type="text" id="search"  value={search} onChange={onChangeSearchHandler}  required=""     className="form-control" placeholder="Search for Chef ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                        
                    <div className="form-group col-md-6">
                         <label className="form-label">Select City <span style={{color: "red"}}>*</span></label>
                         <select id="scity" value={scity} onChange={onChangeScity}  className="form-control">
                         <option value="Select">Select</option>
                         {name.map((item,id)=>{ console.log(item)
                     return  (<option key={id} value={item.Name}>{item.Name}</option>)
                     })}
                        </select>                             
                        <div className="clearfix"></div>
                        </div>
                       
                        </Row>
                        </div>
                   
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="BookedSlotStatus"  
                sheet="BookedSlotStatus"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/partner-pBooked-slots-status"
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
                                        <th scope="col"> Zone	</th>
                                        <th scope="col"> Date	</th>
                                            <th scope="col">Slot </th>
                                            <th scope="col"> Reason	</th>

                                            <th scope="col">PaymentStatus	 </th>
                                            <th scope="col">PaymentMode</th>
                                            <th scope="col">Save	 </th>
                                       
                                            
                                            
                                                                                      
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(orders =>
                                            orders.Chef.includes(search)).map((item,id)=>{                                                  
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>         
                                                        <td className="">{item.Chef}</td>   
                                                        <td className="">{item.Locality}</td>
                                                        <td className="">{item.Date}</td>
                                                        <td className="">{item.Slot}</td>

                                                        {
                                                        item.Status==""||item.Status==null||item.Status===undefined ?
                                                        <td className="status"><select  className="form-control" value={item.Status} onChange={onChangeStatus} id="items">
                                                           <option value="Select">{"Select"}</option>
                                                           <option value="Paid">{"Paid"}</option>
                                                           <option value="Hold">{"Hold"}</option>
                                                           <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                           </td> : item.Status=="Paid" ?
                                                           <td className="status"><select  className="form-control" value={item.Status} onChange={onChangeStatus} id="items">
                                                           <option value="Paid">{"Paid"}</option>
                                                           <option value="Hold">{"Hold"}</option>
                                                           <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                           </td> : item.Status=="Hold" ?
                                                            <td className="status"><select  className="form-control" value={item.Status} onChange={onChangeStatus} id="items">
                                                           <option value="Paid">{"Hold"}</option>
                                                           <option value="Hold">{"Paid"}</option>
                                                           <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                           </td> : 
                                                            <td className="status"><select  className="form-control" value={item.Status} onChange={onChangeStatus} id="items">
                                                            <option value="Paid">{"Not Intrested"}</option>
                                                            <option value="Hold">{"Hold"}</option>
                                                            <option value="Paid">{"Not Intrested"}</option></select>
                                                            </td> 
                                                }

                                                {
                                                item.Reason==""||item.Reason==null||item.Reason==undefined ?
                                                <td className="reason"><input className="reason" type="text" value={item.Reason} onChange={onChangeReason}/></td> :
                                                <td className="reason"><input className="reason" type="text" value={item.Reason} onChange={onChangeReason}/></td>
                                                
                                                }
                                                {
                                                    item.PaymentStatus==""||item.PaymentStatus==null||item.PaymentStatus==undefined ?
                                                    <td className="item_route"><select className="form-control payment" value = {paymentstatus} onChange={onChangePaymentStatus} id="items">
                                                        <option value="Select">Select</option>
                                                        <option value="Paid">Paid</option>
                                                        <option value="UnPaid">Not Paid</option></select>
                                                        </td>: item.PaymentStatus=="Paid" ?
                                                         <td className="item_route"><select className="form-control payment" value = {item.PaymentStatus} onChange={onChangePaymentStatus} id="items">
                                                         <option value="Paid">Paid</option>
                                                         <option value="UnPaid">Not Paid</option></select>
                                                         </td> : 
                                                          <td className="item_route"><select className="form-control payment" value = {item.PaymentStatus} onChange={onChangePaymentStatus} id="items">
                                                          <option value="UnPaid">Not Paid</option>
                                                          <option value="Paid">Paid</option></select>
                                                          </td>
                                                }
                                                {
                                                    item.PaymentMode==""||item.PaymentMode==null||item.PaymentMode==undefined ?
                                                    <td className="paymentid"><input className="paymentid" type="text" value={paymentmode} onChange={onChangePaymentMode}/></td> :
                                                <td className="paymentid"><input className="paymentid" type="text" value={item.PaymentMode} onChange={onChangePaymentMode}/></td>
                                                }
                                                       
                                                           <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                           <td className="" style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.PushId} onClick={onChangeSaveRow} className="btn btn-success btn-md">{"Save"}</button></td>

                                                       
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
        
export default PBookedSlotsStatus;