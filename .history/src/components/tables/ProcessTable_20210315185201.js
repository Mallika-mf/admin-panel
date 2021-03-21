import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import app from '../../data/base'
import {useHistory} from 'react-router-dom'
import {  ShoppingBag,User,Headphones,Phone} from 'react-feather';
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

const ProcessTable = (props) => {
    const history = useHistory()
    const [show,setShow] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm]=useState("")
    const [searchValue, setSearchValue] = useState([]);
    const [cityName,setCityName] = useState([])
    const[cityPushId,setCityPushId] = useState([])
    const [localityName,setLocalityName] = useState([])
    const[localityPushId,setLocalityPushId] = useState([])
    const [viewItem,setViewItem] = useState([])
    const [viewItem1,setViewItem1] = useState([])
    const [showModel, setShowModel] = useState(false);
    const [showModel1, setShowModel1] = useState(false);
    const [chefDescription, setChefDiscription] = useState("")

    useEffect(() => {
        window.addEventListener('message', handleMessage);
        var cityname=[];
        var citypushid=[];
        var localityname=[];
        var localitypushid=[];

        app.database().ref().child("Masters").child("City")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            citypushid.push(val.PushId);
            cityname.push(val.Name);
        });
        setCityName(cityname)
        setCityPushId(citypushid)
    });


    app.database().ref().child("Masters").child("Localities")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            localitypushid.push(val.PushId);
            localityname.push(val.Name);
        });
            setLocalityName(localityname)
            setLocalityPushId(localitypushid)
    })
            // $('#datatable').empty();
            var database = app.database();
            database.ref().child("Orders")
            .orderByChild("Status").equalTo("2")
            .on('value', function(snapshot){
                setSearchValue([])
                if(snapshot.exists()){
                    var content = [];
                    snapshot.forEach(snap=>{
                        var val= snap.val()
                        if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {      
                        content.push(snap.val());
                        }
                      });
                      content.reverse()
                      setSearchValue(content);
                      setShow(false)
                    }else{
                       setShow(false)

                    }
                    
            })
            
            
              
            return () => {
                window.removeEventListener('message', handleMessage);

              };
      }, []);

      const viewDetailHandler=(event)=>{
       
        var pushid=event.target.id
        sessionStorage.setItem("chefidapproval",pushid);
        history.push(`${process.env.PUBLIC_URL}/View-details`);
     

}

      const onClickReassigned=(event)=>{
        var pushId=event.target.id
         Swal.fire({
             title: "Are you sure want to reassign the delivery boy?",
             text: "",
             icon: "warning",
             showCancelButton: true,
                 confirmButtonText: 'OK',
                 cancelButtonText: 'Cancel',
                 cancelButtonColor:'gray'
           })
           .then((willDelete) => {
             if (willDelete.value) {
                 var firebaseref = app.database().ref().child("Orders").child(pushId)
                 firebaseref.child("DeliveryName").remove();
                 firebaseref.child("DeliveryNumber").remove();
                 firebaseref.child("Rapido").remove();
             
                 app.database().ref().child("Orders").child(pushId).child("Rapido").set("Yes");
         Swal.fire({
             title: "Reassigned Delivery Boy Successfully!",
             text: "",
             icon: "success",
         });
         }
     });
     }
     const onClickDunzo=(event)=>{
        var pushId=event.target.id
         Swal.fire({
             title: "Are you sure want to reassign the Dunzo?",
             text: "",
             icon: "warning",
             showCancelButton: true,
                 confirmButtonText: 'OK',
                 cancelButtonText: 'Cancel',
                 cancelButtonColor:'gray'
           })
           .then((willDelete) => {
             if (willDelete.value) {
                 var firebaseref = app.database().ref().child("Orders").child(pushId)
                 firebaseref.child("DeliveryName").remove();
                 firebaseref.child("DeliveryNumber").remove();
                 firebaseref.child("Dunzo").remove();
             
                 app.database().ref().child("Orders").child(pushId).child("Dunzo").set("Yes");
         Swal.fire({
             title: "Reassigned Dunzo Successfully!",
             text: "",
             icon: "success",
         });
         }
     });
     }
     const onClickWeFast=(event)=>{
        var pushId=event.target.id
         Swal.fire({
             title: "Are you sure want to reassign the WeFast?",
             text: "",
             icon: "warning",
             showCancelButton: true,
                 confirmButtonText: 'OK',
                 cancelButtonText: 'Cancel',
                 cancelButtonColor:'gray'
           })
           .then((willDelete) => {
             if (willDelete.value) {
                 var firebaseref = app.database().ref().child("Orders").child(pushId)
                 firebaseref.child("DeliveryName").remove();
                 firebaseref.child("DeliveryNumber").remove();
                 firebaseref.child("WeFast").remove();
             
                 app.database().ref().child("Orders").child(pushId).child("WeFast").set("Yes");
         Swal.fire({
             title: "Reassigned WeFast Successfully!",
             text: "",
             icon: "success",
         });
         }
     });
     }
     const onClickDeleteHandler=(event)=>{
         var pushId = event.target.id
         Swal.fire({
             title: "Are you sure want to cancel the order?",
             text: "",
             icon: "warning",
             showCancelButton: true,
             confirmButtonText: 'OK',
             cancelButtonText: 'Cancel',
             cancelButtonColor:'gray'
           })
           .then((willDelete) => {
             if (willDelete.value) {
                 app.database().ref().child("Orders").child(pushId).child("Status").set("10");
         Swal.fire({
             title: "Order Cancelled Successfully!",
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
        console.log(pushId)
        app.database().ref().child("Orders").child(pushId).on(
          'value', function(snapshot1){
            setChefDiscription(snapshot1.val().ChefInstructions)
            if(snapshot1.exists()){
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
              })           }
          }
        )
  
          
      }

     const onShowModal1=()=>{setShowModel1(false)}
     const onClickViewItemHandler1=(event)=>{
        setShowModel1(true)

         var pushId = event.target.id
         console.log(pushId)
         app.database().ref().child("Orders").child(pushId)
         .on('value', function(snapshot){
             if(snapshot.exists()){
                 var content = [];   
                 var val=snapshot.val(); 
                 content.push(val)
                 setViewItem1(content)
             }
         })
     }
     const changeStatusHandler = (event)=>{
        var pushId = event.target.id
        Swal.fire({
            title: "Are you sure ?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor:'gray'
          })
          .then((willDelete) => {
            if (willDelete.value) {
                app.database().ref().child("Orders").child(pushId).child("Status").set("3");
       
      }
      
      });
      }
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
            // var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            // var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            // var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("ProcessingOrders.pdf");  
          });  
      }
      
    const myFunction = () => {
        var input, filter, table, tr, td1,td2,td3,td4,td5,td6,td7,td8,td9,td10;
        var i,txtValue1,txtValue2,txtValue3,txtValue4,txtValue5,txtValue6,txtValue7,txtValue8,txtValue9,txtValue10;
        input = document.getElementById("search1");
        filter = input.value.toUpperCase();
        table = document.getElementById("datatable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];
        td3 = tr[i].getElementsByTagName("td")[3];
        td4 = tr[i].getElementsByTagName("td")[4];
        td5 = tr[i].getElementsByTagName("td")[5];
        td6 = tr[i].getElementsByTagName("td")[6];
        td7 = tr[i].getElementsByTagName("td")[7];
        td8 = tr[i].getElementsByTagName("td")[8];
        td9 = tr[i].getElementsByTagName("td")[9];
        td10 = tr[i].getElementsByTagName("td")[10];
        if (td1) {
          txtValue1 = td1.textContent || td1.innerText;
          txtValue2 = td2.textContent || td2.innerText;
          txtValue3 = td3.textContent || td3.innerText;
          txtValue4 = td4.textContent || td4.innerText;
          txtValue5 = td5.textContent || td5.innerText;
          txtValue6 = td6.textContent || td6.innerText;
          txtValue7 = td7.textContent || td7.innerText;
          txtValue8 = td8.textContent || td8.innerText;
          txtValue9 = td9.textContent || td9.innerText;
          txtValue10 = td10.textContent || td10.innerText;
        
         var main = txtValue1+ txtValue2+txtValue3+txtValue4+txtValue5+txtValue6+txtValue7+txtValue8+txtValue9+txtValue10;
           if (main.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
      }  
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Order Management" title="Processing Orders"/>
            <Container fluid={true}>
                <Row>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-9">
                         <label className="form-label">Search </label>
                             <input type="text" onKeyUp={myFunction}  required="" id = "search1" className="form-control" placeholder="Search for Name, Number..."/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "2%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="ProcessingOrders"  
                sheet="ProcessingOrders"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/processing-order"
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
                            <CardHeader>
                                <h5>Processing Order Report</h5>
                                {/* <span> Use a className <code> table </code> to any table.</span> */}
                            </CardHeader>
                            <div className="table-responsive text-nowrap">
                                <Table id="datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Order Date</th>
                                            <th scope="col">Delivery Date,Time	</th>
                                            <th scope="col">Order Number</th>
                                            <th scope="col">Customer Details	</th>
                                            <th scope="col">Chef Details	</th>
                                            <th scope="col">Items</th>
                                            <th scope="col">Payment</th>
                                            {/* <th scope="col">Rapido</th>
                                            <th scope="col">Dunzo</th>
                                            <th scope="col">WeFast</th> */}
                                            <th scope="col">Actions</th>
                                            <th>Distance</th>
                                            <th scope="col">Payment Id</th>
                                            <th>Order Details</th>
                                            <th scope="col">Change Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    { searchValue.map((item,id) => {
                                                // let chefcoord = item.ChefLoc
                                                // let latlng = chefcoord.split(",")
                                                // let lat1 = latlng[0]
                                                // let lon1 = latlng[1]
                                                // let usercoord = item.LocationCoordinates
                                                // let latlng2 = usercoord.split(",")
                                                // let lat2 = latlng2[0]
                                                // let lon2 = latlng2[1]
                                                // // console.log(lat1+lon1)
                                                // // console.log(lat1+lon1)
          
                                                //  var R = 6371; // Radius of the earth in km
                                                //  var dLat = deg2rad(lat2-lat1);  // deg2rad below
                                                //  var dLon = deg2rad(lon2-lon1); 
                                                //  var a = 
                                                //    Math.sin(dLat/2) * Math.sin(dLat/2) +
                                                //    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                                                //    Math.sin(dLon/2) * Math.sin(dLon/2)
                                                //    ; 
                                                //  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                                                //  var d = R * c;
                                       
                                        return(
                                      <tr key={id}>
                                                   <td>  {id+1}  </td>
                                                   <td>{(item.OrderDateTime).substring(0, 11)}<br/>{(item.OrderDateTime).substring(11, item.OrderDateTime.length)}</td>
                                                {item.DeliveryTime === "Immediately"?
                                                    <td >{"Instant Delivery"}</td>:
                                                     <td>{item.DeliveryTime+","+item.DeliveryDate}</td>
                                                }
                                                <td style={{color:"#FFA501"}}>{item.OrderNo}</td>
                                                  <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.CName}<br/><Headphones aria-hidden="true" style={{color:"#0000FF"}} size={15}/>&nbsp;{item.Number}</td>
                                                  {item.ChefNumber !== undefined?
                                       <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{item.ChefNumber}</td>:
                                       //    <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>
                                          <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}</td>
                                                }
                                                <td className="actions-view" style={{textAlign:"center"}}><Button type="button" id={item.Pushid} onClick={onClickViewItemHandler} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">{"View"}</Button></td>
                                                <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler1} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal1">{"View"}</button></td>
                                                
                                                {/* <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickReassigned} className="btn btn-primary btn-md">{"Reassign"}</button></td> */}
                                                {/* <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickDunzo} className="btn btn-primary btn-md">{"Reassign"}</button></td> */}
                                                {/* <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickWeFast} className="btn btn-primary btn-md">{"Reassign"}</button></td> */}

                                                <td><b><font color="blue">{"Order Accepted"}</font></b><br/><button id={item.Pushid} onClick={onClickDeleteHandler} className="btn btn-info btn-sm">{"Cancel"}</button></td>               
                                                <td>{parseFloat(item.Distance).toFixed(2)}Km</td>                                                           

                                                <td>{item.RazorpayId}</td>
                                                <td><Button className="warning" id={item.Pushid} onClick={viewDetailHandler}>{"View"}</Button></td>
                                                <td><Button className="warning" id={item.Pushid} onClick={changeStatusHandler}>{"Status"}</Button></td>

                                                 </tr>
                                                 )
                                        })}
                                       
                                    </tbody>
                                </Table>
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
                            <h6 style={{marginLeft:"4%"}}><b>Chef Instructions:</b></h6>
  <p style={{fontSize: "15px",marginLeft:"6%"}}><b>{chefDescription}</b></p>
                            <Button variant="secondary" onClick={onShowModal}>
                            Close
                            </Button>
                            </ModalFooter>
                            </Modal>

                            <Modal isOpen={showModel1} >
                            <ModalHeader>
                            </ModalHeader>
                            <ModalBody>
                            <div className="table-responsive text-nowrap">
                                <Table >
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Sub Total</th>
                                            <th scope="col">Delivery</th>
                                            <th scope="col">Packing</th>
                                            <th scope="col">Taxes</th>
                                            <th scope="col">Discount</th>
                                            <th scope="col">Total</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { viewItem1.map((item,id) => {
                                        return(
                                      <tr key={id}>
                                                   <td>  {id+1}  </td>
                                                    <td>{item.Subtotal}</td>
                                                    <td>{item.DeliveryCharges}</td>
                                                     <td >{item.Packing}</td>
                                                     <td >{item.Taxes}</td>
                                                     <td >{item.Discount}</td>
                                                     <td >{item.Total}</td>

                                                 </tr>
                                                 )
                                        })}
                                       
                                    </tbody>
                                </Table>
                            </div>
                            </ModalBody>
                            <ModalFooter>
                            <Button variant="secondary" onClick={onShowModal1}>
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
        
export default ProcessTable;