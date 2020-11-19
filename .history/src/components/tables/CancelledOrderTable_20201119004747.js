import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import { ShoppingBag, User  , Headphones,Phone} from 'react-feather';
import app from '../../data/base'
import {useHistory} from 'react-router-dom'
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
const CancelledOrderTable = () => {
    const history = useHistory()
    const [show,setShow] = useState(true)
    const [searchTerm, setSearchTerm]=useState("")
    const [searchValue, setSearchValue] = useState([]);
    const [cityName,setCityName] = useState([])
    const[cityPushId,setCityPushId] = useState([])
    const [localityName,setLocalityName] = useState([])
    const[localityPushId,setLocalityPushId] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [viewItem,setViewItem] = useState([])

    useEffect(() => {
        async function fetchMyAPI() {
        window.addEventListener('message', handleMessage);
        var cityname=[];
        var citypushid=[];
        var localityname=[];
        var localitypushid=[];
       await app.database().ref().child("Masters").child("City")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            citypushid.push(val.PushId);
            cityname.push(val.Name);
        });
    });


    
   await app.database().ref().child("Masters").child("City")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            citypushid.push(val.PushId);
            cityname.push(val.Name);
        });
         setCityName(cityname)
        setCityPushId(citypushid)
    });


   await app.database().ref().child("Masters").child("Localities")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            localitypushid.push(val.PushId);
            localityname.push(val.Name);
        });
        setLocalityName(localityname)
        setLocalityPushId(localitypushid)
        // $('#datatable').empty();
        var database = app.database();
        database.ref().child("Orders")
        .orderByChild("Status").equalTo("10")
        .on('value', function(snapshot){
            setSearchValue([])
            if(snapshot.exists()){
              var content = [];
                snapshot.forEach(snap=>{
                    var val=snap.val()
                    if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {       
                    content.push(snap.val());
                    }
                  });
                  content.reverse()
                  console.log(content)
                  setSearchValue(content);
                  setShow(false)

                }else{
                    const timeout = setTimeout(() => {
                        setShow(false)
                      }, 3000);
                      return ()=>{clearTimeout(timeout);}

                }
            }) 
        })
        return () => {
            window.removeEventListener('message', handleMessage);
          };   
        }
        fetchMyAPI()  
    },[app])

    const viewDetailHandler=(event)=>{
        var pushid=event.target.id
        sessionStorage.setItem("chefidapproval",pushid);
        history.push(`${process.env.PUBLIC_URL}/View-details`);
     

}
    const  onChangeHandler=(event)=>{
        setSearchTerm(event.target.value);
       }
       const onClickRefundHandler=(event)=>{
        var arrData = event.target.id.split(",")
        var pushId=arrData[0]
        var userid = arrData[1]
        var total = arrData[2]
                   Swal.fire({
            title: "Are you sure want to refund the order?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor:'gray'
          })
          .then((willDelete) => {
            if (willDelete.value) {
                // app.database().ref().child("Orders").child(pushId).child("Status").set("100");
                app.database().ref().child("Users").child(userid).once('value').then(function(snapshot){
                    let val = snapshot.val()
                    let myCash = parseInt(total)+parseInt(val.WalletInsta)
                    app.database().ref().child("Users").child(userid).child("WalletInsta").set(myCash)

                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
                    today = yyyy + '-' + mm + '-' + dd;

                    var today1=dd+mm+yyyy;
                    var tno=today1+Math.floor(10000 + Math.random() * 90000);
                    // var firebaseref1=app.database().ref().child("Users").child(userid).child("WalletInsta");
                    var tot = 0;
                    var a=0;
                    var stock = app.database().ref().child("TRID");
            //         firebaseref1.transaction(function(currentstock) {
            //             currentstock=currentstock + +total;
            //             console.log(currentstock)
            //    return currentstock;
            //     },
                    stock.transaction(function (currentstock) {
                      tot = currentstock + 1;
                      return tot;
                    },
                   
                   
                    function(error, committed, snapshot) {
                        a=snapshot.val();
                        var transid = "REF"+ tot;
                        console.log(transid)
                        console.log(a);
                        console.log(today)
                        console.log(tno)
                        console.log(userid)
                        console.log(myCash)
                        console.log(pushId)

                        var ref=app.database().ref().child("Users").child(userid).child("TransactionInsta").push();
                        ref.child("PushId").set(ref.getKey());
                        ref.child("Amount").set(String(total));
                        ref.child("Date").set(today);
                        ref.child("Generated").set("WebAdmin");
                        ref.child("Status").set("Approved");
                        ref.child("TransactionId").set(String(tno));
                        ref.child("TransactionName").set(transid);
                        ref.child("TransactionType").set("Cr");
                        ref.child("UserBalance").set(String(myCash));
                        ref.child("UserId").set(String(userid));
                    })
                
                })
                
            
        Swal.fire({
            title: "Order Refunded Successfully!",
            text: "",
            icon: "success",
        });
      }
      
      });
       }
       const onShowModal=()=>{setShowModel(false)}
       const onClickViewItemHandler=(event)=>{
         setShowModel(true)
         var pushId=event.target.id
         app.database().ref().child("Orders").child(pushId).child("Cart")
         .on('value', function(snapshot){
             if(snapshot.exists()){
                 var content = [];
                
                 snapshot.forEach(function(data){
                     var val = data.val(); 
                     content.push(val)
                 })
                 setViewItem(content)
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
            // var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            // var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            // var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("CancelledOrders.pdf");  
          });  
      }  
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Order Management" title="Cancelled Orders"/>
            <Container fluid={true}>
                <Row>
               <Col sm ="12">
               <CardHeader>
                                <h5>Cancelled Order Report</h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
               </Col>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-6">
                    <label className="form-label">Search <span style={{color:"red"}}>*</span></label>
                     <input type="text"   value={searchTerm} onChange={onChangeHandler}  required="" className="form-control" placeholder="Search for Order ID" title="Type in a name"/>
                    <div className="clearfix"></div>
                    </div>
                 </div>
                 <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="CancelledOrders"  
                sheet="CancelledOrders"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/cancelled-order"
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
                            
                            <div className="table-responsive text-nowrap">
                                <table id="datatable"  className="table table-striped "  >
                                    <thead >
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th>Order Date</th>
                                            <th>Order Number</th>
                                            <th>Customer Details</th>
                                            <th>Chef Details</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                            <th>Payment Id</th>
                                            <th>Order Details</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    { searchValue.filter(orders =>
                                            orders.OrderNo.includes(searchTerm)).map((item,id) => {
                                                
                                    return(
                                        <tr  key={id}>
                                         <td>  {id+1}  </td>
                                         <td>{(item.OrderDateTime).substring(0, 11)}<br/>{(item.OrderDateTime).substring(11, item.OrderDateTime.length)}</td>
                                       <td style={{color:"#FFA501"}}>{item.OrderNo}</td>
                                         <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.CName}<br/><Headphones aria-hidden="true" style={{color:"#0000FF"}} size={15}/>&nbsp;{item.Number}</td>
                                         {item.ChefNumber !== undefined?
                                       <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{item.ChefNumber}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>:
                                       <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>
                                       }
                                       <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">{"View"}</button></td>
                                        <td className="text-success"><b>{"₹"+item.Total}</b></td>
                                        <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid+","+item.UserId+","+item.Total} onClick={onClickRefundHandler} className="btn btn-primary btn-md" >{"Refund"}</button></td>
                                                             
                                        <td>{item.RazorpayId}</td>
                                        <td><Button className="warning" id={item.Pushid} onClick={viewDetailHandler}>{"View"}</Button></td>

                                        </tr>
                                         )
                                                    
                                             
                                       
                                        })}
                                       
                                    </tbody>
                                </table>
                            </div>
                            <Modal isOpen={showModel} >
                            <ModalHeader>
                            </ModalHeader>
                            <ModalBody>
                            <div className="table-responsive text-nowrap">
                                <Table >
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Quantity	</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { viewItem.map((item,id) => {
                                        console.log(item)
                                        return(
                                      <tr key={id}>
                                                   <td>  {id+1}  </td>
                                                    <td>{item.Name}</td>
                                                    <td>{item.Qty}</td>
                                                     <td>{item.Price}</td>
                                                     <td >{item.Total}</td>
                                                 </tr>
                                                 )
                                        })}
                                       
                                    </tbody>
                                </Table>
                            </div>
                            </ModalBody>
                            <ModalFooter>
                            <Button variant="secondary" onClick={onShowModal}>
                            Close
                            </Button>
                            </ModalFooter>
                            </Modal>
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
        
export default CancelledOrderTable;