import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Button,Input} from "reactstrap";
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app,{storage} from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import {useHistory,NavLink} from 'react-router-dom'
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const ChefInActive = () => {
    const history = useHistory()
  const [show,setShow] = useState(true)
    const [users,setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [search,setSearch] = useState("")
    

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
            var database = app.database();
            database.ref().child("CloudKitchen")
            .on('value', function(snapshot){
            // $('#datatable').empty();
            if(snapshot.exists()){
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
  const onChangeStateSearch=(event)=>{
    setSearch(event.target.value)
  }

  const onUpdateHandler=(event)=>{
      var userid=event.target.id
      app.database().ref().child("CloudKitchen").child(userid)
    .on("value", function(snapshot) {
        if(snapshot.exists()) {

            app.database().ref().child("CloudKitchenInActive").child(userid).set(snapshot.val());

            app.database().ref().child("CloudKitchen").child(userid).remove();
            var database = app.database();
            database.ref().child("CloudKitchen")
            .on('value', function(snapshot){
            // $('#datatable').empty();
            if(snapshot.exists()){
            var content = [];
            
            snapshot.forEach(snap=>{
              
              content.push(snap.val());
              });
              setUsers(content)
              setShow(false)
            }else{
                const timeout = setTimeout(() => {
                    setShow(false)
                  }, 3000);
                  return ()=>{clearTimeout(timeout);}
  
            }
        })
        Swal.fire("Submitted Successfully!", {
            icon: "success",
          });
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
        pdf.save("ChefInActive.pdf");  
      });  
  }
  
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Report" title=" Chef InActive"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6>Chef InActive</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>        
                        {/* <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text"  value={search} onChange={onChangeStateSearch}  required="" className="form-control" placeholder="Search for chef Id" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div> */}
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="ChefInActive"  
                sheet="ChefInActive"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/inactive-chef-report"
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
                                            <th scope="col"> MFID </th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Number</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Zone</th>
                                            <th scope="col">Package</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>

                                        </tr>
                                    </thead>
                            
                                    <tbody>
                                    {users.map((item,id)=>{
                                                            if(item.AStatus=="InActive"){
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                                                                                                            
                                                       <td > {item.UserId}</td>
                                                       <td > {item.Name}</td>
                                                       <td > {item.Gender}</td>
                                                       <td > {item.MobileNumber}</td>
                                                       <td > {item.CityName}</td>
                                                       <td > {item.LocalityName}</td>
                                                       <td > {item.Membership}</td>
                                                       <td className="text-primary"><b>{item.AStatus}</b></td>
                                                       <td  style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.UserId} onClick={onUpdateHandler} class="btn btn-primary btn-md">{"InActive"}</button></td>        

                                                     </tr>
                                                    )
                                                            }else{
                                                                return(
                                                                    <tr key={id}> 
                                                                    <td>{id+1}</td>                                                                                                            
                                                                   <td > {item.UserId}</td>
                                                                   <td > {item.Name}</td>
                                                                   <td > {item.Gender}</td>
                                                                   <td > {item.MobileNumber}</td>
                                                                   <td > {item.CityName}</td>
                                                                   <td > {item.LocalityName}</td>
                                                                   <td > {item.Membership}</td>
                                                                   <td className="text-success"><b>{item.AStatus}</b></td>
                                                                   <td  style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.UserId} onClick={onUpdateHandler} class="btn btn-primary btn-md">{"InActive"}</button></td>        

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
        
export default ChefInActive;