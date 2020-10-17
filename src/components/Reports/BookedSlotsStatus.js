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
const BookedSlotsStatus = (props) => {
    const [users,setUsers] = useState([])
    const [state, setState] = useState({sdate:"",edate:"",search:"",scity:""});
    const [name,setName] = useState([])
    const [isLoading, setIsLoading] = useState(true);
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
                   
                      
                        <div className="col-md-5" style={{margin: "1%"}}>
                        <Row>
                        <div className="form-group col-md-6">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                         <input type="text" id="search"  value={state.search} onChange={onChangeHandler}  required=""     className="form-control" placeholder="Search for Chef ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                        
                    <div className="form-group col-md-6">
                         <label className="form-label">Select City <span style={{color: "red"}}>*</span></label>
                         <select id="scity" value={state.scity} onChange={onChangeHandler}  className="form-control">
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
                    src="/reports/booked-slots-status"
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
                                            orders.Chef.includes(state.search)).filter(orders =>
                                                orders.City.includes(state.scity)).map((item,id)=>{
                                                if(item.Status==""||item.Status==null){
                                                  
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>         
                                                        <td className="">{item.Chef}</td>   
                                                        <td className="">{item.Locality}</td>
                                                        <td className="">{item.Date}</td>
                                                        <td className="">{item.Slot}</td>

                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.Number}</td>
                                                       <td className="">{item.City}</td>
                                                       <td className="">{item.Address}</td>
                                                       <td className="status"><select className="form-control" id="items">
                                                           <option value="Select">{"Select"}</option>
                                                           <option value="Paid">{"Paid"}</option>
                                                           <option value="Hold">{"Hold"}</option>
                                                           <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                           </td>
                                                           <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                           <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="save-row"><button type="button" id="savebtn" className="btn btn-success btn-md">{"Save"}</button></a></td>

                                                       
                                                     </tr> 
                                                    )
                                                    }else if(item.Status=="Paid"){
                                                        return(
                                                            <tr key={id}> 
                                                            <td>{id+1}</td>         
                                                            <td className="">{item.Chef}</td>   
                                                            <td className="">{item.Locality}</td>
                                                            <td className="">{item.Date}</td>
                                                            <td className="">{item.Slot}</td>
    
                                                           <td className="">{item.Name}</td>
                                                           <td className="">{item.Number}</td>
                                                           <td className="">{item.City}</td>
                                                           <td className="">{item.Address}</td>
                                                           <td className="status"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               <option value="Paid">{"Paid"}</option>
                                                               <option value="Hold">{"Hold"}</option>
                                                               <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                               </td>
                                                               <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                               <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="save-row"><button type="button" id="savebtn" className="btn btn-success btn-md">{"Save"}</button></a></td>
    
                                                           
                                                         </tr>
                                                        )
                                                    }else if(item.Status=="Hold"){
                                                        return(
                                                            <tr key={id}> 
                                                            <td>{id+1}</td>         
                                                            <td className="">{item.Chef}</td>   
                                                            <td className="">{item.Locality}</td>
                                                            <td className="">{item.Date}</td>
                                                            <td className="">{item.Slot}</td>
    
                                                           <td className="">{item.Name}</td>
                                                           <td className="">{item.Number}</td>
                                                           <td className="">{item.City}</td>
                                                           <td className="">{item.Address}</td>
                                                           <td className="status"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               <option value="Hold">{"Hold"}</option>
                                                                <option value="Paid">{"Paid"}</option>
                                                               <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                               </td>
                                                               <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                               <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="save-row"><button type="button" id="savebtn" className="btn btn-success btn-md">{"Save"}</button></a></td>
    
                                                           
                                                         </tr>
                                                        )
                                                    }
                                                    else if(item.Reason==""||item.Reason==null){
                                                        return(
                                                            <tr key={id}> 
                                                            <td>{id+1}</td>         
                                                            <td className="">{item.Chef}</td>   
                                                            <td className="">{item.Locality}</td>
                                                            <td className="">{item.Date}</td>
                                                            <td className="">{item.Slot}</td>
    
                                                           <td className="">{item.Name}</td>
                                                           <td className="">{item.Number}</td>
                                                           <td className="">{item.City}</td>
                                                           <td className="">{item.Address}</td>
                                                           <td className="status"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               <option value="Hold">{"Hold"}</option>
                                                                <option value="Paid">{"Paid"}</option>
                                                               <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                               </td>
                                                               <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                               <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="save-row"><button type="button" id="savebtn" className="btn btn-success btn-md">{"Save"}</button></a></td>
                                                               <td className="reason"><input className="reason" type="text" value=""/></td>
                                                           
                                                         </tr>
                                                        )
                                                    }if(item.PaymentStatus==""||item.PaymentStatus==null){
                                                        return(
                                                            <tr key={id}> 
                                                            <td>{id+1}</td>         
                                                            <td className="">{item.Chef}</td>   
                                                            <td className="">{item.Locality}</td>
                                                            <td className="">{item.Date}</td>
                                                            <td className="">{item.Slot}</td>
    
                                                           <td className="">{item.Name}</td>
                                                           <td className="">{item.Number}</td>
                                                           <td className="">{item.City}</td>
                                                           <td className="">{item.Address}</td>
                                                           <td className="status"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               <option value="Hold">{"Hold"}</option>
                                                                <option value="Paid">{"Paid"}</option>
                                                               <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                               </td>
                                                               <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                               <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="save-row"><button type="button" id="savebtn" className="btn btn-success btn-md">{"Save"}</button></a></td>
                                                        <td className="reason"><input className="reason" type="text" value=""/>{item.Reason}</td>
                                                        <td className="item_route"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               <option value="Paid">{"Paid"}</option>
                                                                <option value="Not Paid">{"Not Paid"}</option></select>
                                                                </td>
                                                         </tr>
                                                        )
                                                    }if(item.PaymentMode==""||item.PaymentMode==null){
                                                        return(
                                                            <tr key={id}> 
                                                            <td>{id+1}</td>         
                                                            <td className="">{item.Chef}</td>   
                                                            <td className="">{item.Locality}</td>
                                                            <td className="">{item.Date}</td>
                                                            <td className="">{item.Slot}</td>
    
                                                           <td className="">{item.Name}</td>
                                                           <td className="">{item.Number}</td>
                                                           <td className="">{item.City}</td>
                                                           <td className="">{item.Address}</td>
                                                           <td className="status"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               <option value="Hold">{"Hold"}</option>
                                                                <option value="Paid">{"Paid"}</option>
                                                               <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                               </td>
                                                               <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                               <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="save-row"><button type="button" id="savebtn" className="btn btn-success btn-md">{"Save"}</button></a></td>
                                                        <td className="reason"><input className="reason" type="text" value=""/>{item.Reason}</td>
                                                        <td className="item_route"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               
                                                                <option value="Not Paid">{"Not Paid"}</option>
                                                                <option value="Paid">{"Paid"}</option></select>
                                                                <td className="reason"><input className="paymentid" type="text" value=""/></td>
                                                                </td>
                                                         </tr>
                                                        )
                                                    }
                                                    else{
                                                        return(
                                                            <tr key={id}> 
                                                            <td>{id+1}</td>         
                                                            <td className="">{item.Chef}</td>   
                                                            <td className="">{item.Locality}</td>
                                                            <td className="">{item.Date}</td>
                                                            <td className="">{item.Slot}</td>
    
                                                           <td className="">{item.Name}</td>
                                                           <td className="">{item.Number}</td>
                                                           <td className="">{item.City}</td>
                                                           <td className="">{item.Address}</td>
                                                           <td className="status"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               <option value="Hold">{"Hold"}</option>
                                                                <option value="Paid">{"Paid"}</option>
                                                               <option value="Not Intrested">{"Not Intrested"}</option></select>
                                                               </td>
                                                               <td className="item_pushid" style={{display:"none"}}>{item.PushId}</td>
                                                               <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><a href="#" className="save-row"><button type="button" id="savebtn" className="btn btn-success btn-md">{"Save"}</button></a></td>
                                                        <td className="reason"><input className="reason" type="text" value=""/>{item.Reason}</td>
                                                        <td className="item_route"><select className="form-control" id="items">
                                                               <option value="Select">{"Select"}</option>
                                                               
                                                                <option value="Not Paid">{"Not Paid"}</option>
                                                                <option value="Paid">{"Paid"}</option></select>
                                                        <td className="reason"><input className="paymentid" type="text" value=""/>{item.PaymentMode}</td>
                                                                </td>
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
        
export default BookedSlotsStatus;