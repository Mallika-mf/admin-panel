import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,FormGroup,Row,Col,Card,CardHeader,Table,Button,Modal,ModalBody,ModalFooter,ModalHeader,Input} from "reactstrap";
import {  ShoppingBag,  User,Headphones,Phone} from 'react-feather';
import app from '../../data/base'
import {useHistory} from 'react-router-dom'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import { TablePagination} from '@material-ui/core'
import axios from 'axios'

// import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const RefundOrderTable = () => {
    const pages = [20,30,50]
    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(pages[page])
    const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})

    const history = useHistory()
    const [chefDescription, setChefDiscription] = useState("")

    const [show,setShow] = useState(true)
    const [searchValue, setSearchValue] = useState([]);
    const [cityName,setCityName] = useState([])
    const[cityPushId,setCityPushId] = useState([])
    const [localityName,setLocalityName] = useState([])
    const[localityPushId,setLocalityPushId] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [viewItem,setViewItem] = useState([])
    const [sdate, setSdate] = useState("")
    const [edate, setEdate] = useState("")
    const [accountanceTable,setAccountanceTable] = useState([])
    const [showAccountanceTable,setShowAccountTable] = useState(false)
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
    });


    
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
        // $('#datatable').empty();
        var database = app.database();
        database.ref().child("Orders")
        .orderByChild("Status").equalTo("100")
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
                  content.map(item=>{
                    if(item.ChefName===undefined ){
                        item.ChefName = ""
                      }
                      if(item.ChefNumber===undefined ){
                        item.ChefNumber = ""
                      }
                      if(item.Chef===undefined ){
                        item.Chef = ""
                      }
                      if(item.CName===undefined ){
                        item.CName = ""
                      }
                      if(item.OrderNo===undefined ){
                        item.OrderNo = ""
                      }
                      if(item.Number===undefined ){
                        item.Number = ""
                      }
                      if(item.KitchenName===undefined ){
                        item.KitchenName = ""
                      }
                      if(item.OrderType===undefined ){
                        item.OrderType = ""
                      }
                  })
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
    },[])

    const viewDetailHandler=(event)=>{
       
        var pushid=event.target.id
        sessionStorage.setItem("chefidapproval",pushid);
        history.push(`${process.env.PUBLIC_URL}/View-details`);
     

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
            pdf.save("RefundedOrders.pdf");  
          });  
      }  
      const handleChangePage = (event, newPage) =>{
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value,20))
        setPage(0)
    }
    const handleSearch = (e)=>{
        let target = e.target
        setFilterFn({
            fn: items =>{
                if(target.value === ""){
                return items;
                }
                else{
                return items.filter(x =>(x.OrderNo.includes(target.value))||(x.Number.includes(target.value))
                || (x.ChefName.includes(target.value))|| (x.Chef.includes(target.value)) || (x.ChefNumber.includes(target.value)) || (x.CName.includes(target.value))|| (x.KitchenName.includes(target.value))|| (x.OrderType.includes(target.value)))

                }
            }
           
        })
    }
    const recordsAfterPagingAndSorting = ()=>{
        return filterfn.fn(searchValue).slice(page*rowsPerPage,(page+1)*rowsPerPage)
    }
    const recordsAfterDateFiltering = ()=>{
      return filterfn.fn(accountanceTable)
  }
    const onChangeStartingDate=(event)=>{
      setSdate(event.target.value)
  }
  const onChangeEndDate=(event)=>{
      setEdate(event.target.value)
  }
  const onSubmit = (event) =>{
      event.preventDefault();
      setShowAccountTable(true)
      // state.sdate=""
      // state.edate=""
      if (sdate === "" && edate === "") {
        alert("Select Start Date");
        // state.sdate.focus();
        return;
      }
  
      if (sdate.length !== 0 && edate.length !== 0) {
          let database = app.database();
          database.ref().child("Orders")
          .orderByChild("OrderDate").startAt(sdate).endAt(edate)
          .on('value', function(snapshot){
              setAccountanceTable([])
              if(snapshot.exists()){
                var content = [];
                snapshot.forEach(snap=>{
                    var  val=snap.val()
                    if(val.Status==="100"){
                      if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {  
                          content.push(snap.val());
                          
                          }
                    }
                 
                });
                content.map(item=>{
                    if(item.KitchenName===undefined){
                        item.KitchenName=""
                    }
                    if(item.OrderType===undefined){
                      item.OrderType=""
                  }
                })
                setAccountanceTable(content)
              }
          }) 
        } else if (sdate.length !== 0 && edate.length === 0) {
          let database = app.database();
          database.ref().child("Orders")
          .orderByChild("OrderDate").equalTo(sdate)
          .on('value', function(snapshot){
              setAccountanceTable([])
                 if(snapshot.exists()){
                var content = [];
                snapshot.forEach(snap=>{
                    var  val=snap.val()
                    if(val.Status==="100"){
                      if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {  
                          content.push(snap.val());
                          
                          }
                    }
                });
                content.map(item=>{
                    if(item.KitchenName===undefined){
                        item.KitchenName=""
                    }
                    if(item.OrderType===undefined){
                      item.OrderType=""
                  }
                })
                setAccountanceTable(content)
              }
          }) 
        } else {
          let database = app.database();
          database.ref().child("Orders")
          .orderByChild("OrderDate").equalTo(edate)
          .on('value', function(snapshot){
              setAccountanceTable([])
              if(snapshot.exists()){
                var content = [];
                snapshot.forEach(snap=>{
                    var  val=snap.val()
                    if(val.Status==="100"){
                      if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {  
                          content.push(snap.val());
                          
                          }
                    }
                });
                content.map(item=>{
                    if(item.KitchenName===undefined){
                        item.KitchenName=""
                    }
                    if(item.OrderType===undefined){
                      item.OrderType=""
                  }
                })
                setAccountanceTable(content)
              }
          }) 
        }
    
  }
    // function deg2rad(deg) {
    //   return deg * (Math.PI/180)
    // }
  
    // const getDistanceFromLatLonInKm =(lat1,lon1,lat2,lon2) =>{
     
    // }
    // axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${item.ChefLoc}&destinations=${item.LocationCoordinates}&key=AIzaSyCPhxfpptoIc1yca5U8mXIigIajoERQCdE`)
    // .then(response=>{
    //   distance = response
    //   console.value(distance)
    // })
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Order Management" title="Refunded Order"/>
            <Container fluid={true}>
               <Col sm ="12">
               <CardHeader>
                                <h5>Refunded Order Report</h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
               </Col>
               <Row>
                      <FormGroup className="col-md-3">
                        <label className="form-label">From Date <span style={{ color: "red" }}>*</span></label>
                        <div className="input-group">
                          <input type="date" id="sdate" className="form-control" value={sdate} onChange={onChangeStartingDate} />
                        </div>
                      </FormGroup>
                      <FormGroup className="col-md-3">

                        <label className="form-label">To Date <span style={{ color: "red" }}>*</span></label>
                        <div className="input-group">
                          <input type="date" id="edate" className="form-control" value={edate} onChange={onChangeEndDate} />
                        </div>
                      </FormGroup>


                      <div className="col-md-4">

                        <input className="btn btn-primary mr-1" style={{ marginTop: "30px", padding: "10px 15px" }} type="button" name="filter" value="Filter" onClick={(event) => onSubmit(event)} id="filter" />

                      </div>

                    </Row>
                    <Row>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-9">
                    <label className="form-label">Search <span style={{color:"red"}}>*</span></label>
                    <Input type="text"   placeholder="Search for Name, Number, OrderId..." onChange={handleSearch}  required=""  className="form-control"  />
                    <div className="clearfix"></div>
                    </div>
                 </div>
                 <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="RefundedOrders"  
                sheet="RefundedOrders"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/refunded-order"
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
                            {showAccountanceTable===false?
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
                                            <th>Payment</th>
                                            <th>Actions</th>
                                            <th>Distance</th>
                                            <th>Payment Id</th>
                                            <th>Refund Date</th>
                                            <th>Order Details</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    { recordsAfterPagingAndSorting().map((item,id) => {
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
                                      //  var d = R * c; // Distance in km
                                      //  return d;
                                      // console.log(d)

                                                        return(
                                                            <tr  key={id}>
                                                             <td>  {id+1}  </td>
                                                             <td>{(item.OrderDateTime).substring(0, 11)}<br/>{(item.OrderDateTime).substring(11, item.OrderDateTime.length)}</td>
                                       <td style={{color:"#FFA501"}}>{item.OrderNo}</td>
                                         <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.CName}<br/><Headphones aria-hidden="true" style={{color:"#0000FF"}} size={15}/>&nbsp;{item.Number}</td>
                                         {item.ChefNumber !== undefined?
                                       <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{item.ChefNumber}</td>:
                                       //    <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>
                                          <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}</td>
                                       }
                                       <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">{"View"}</button></td>
                                        <td className="text-success"><b>{"₹"+item.Total}</b></td>
                                        <td className="text-info">{item.Payment}</td>
                                        <td color="orange">{"Refunded"}</td>  
                                        <td>{parseFloat(item.Distance).toFixed(2)}Km</td>                                                           
                                        <td>{item.RazorpayId}</td>
                                        {item.RefundDateTime !== undefined ?
                                        <td>{item.RefundDateTime}</td>
                                        : <td></td>}
                                        <td><Button className="warning" id={item.Pushid} onClick={viewDetailHandler}>{"View"}</Button></td>

                                        </tr>
                                         )
                                                    
                                             
                                       
                                        })}
                                       
                                    </tbody>
                                </table>
                            </div>:
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
                                         <th>Payment</th>
                                         <th>Actions</th>
                                         <th>Distance</th>
                                         <th>Payment Id</th>
                                         <th>Refund Date</th>
                                         <th>Order Details</th>

                                     </tr>
                                 </thead>
                                 <tbody>
                                 { recordsAfterDateFiltering().map((item,id) => {
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
                                   //  var d = R * c; // Distance in km
                                   //  return d;
                                   // console.log(d)

                                                     return(
                                                         <tr  key={id}>
                                                          <td>  {id+1}  </td>
                                                          <td>{(item.OrderDateTime).substring(0, 11)}<br/>{(item.OrderDateTime).substring(11, item.OrderDateTime.length)}</td>
                                    <td style={{color:"#FFA501"}}>{item.OrderNo}</td>
                                      <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.CName}<br/><Headphones aria-hidden="true" style={{color:"#0000FF"}} size={15}/>&nbsp;{item.Number}</td>
                                      {item.ChefNumber !== undefined?
                                    <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{item.ChefNumber}</td>:
                                    //    <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>
                                       <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}</td>
                                    }
                                    <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">{"View"}</button></td>
                                     <td className="text-success"><b>{"₹"+item.Total}</b></td>
                                     <td className="text-info">{item.Payment}</td>
                                     <td color="orange">{"Refunded"}</td>  
                                     <td>{parseFloat(item.Distance).toFixed(2)}Km</td>                                                           
                                     <td>{item.RazorpayId}</td>
                                     {item.RefundDateTime !== undefined ?
                                     <td>{item.RefundDateTime}</td>
                                     : <td></td>}
                                     <td><Button className="warning" id={item.Pushid} onClick={viewDetailHandler}>{"View"}</Button></td>

                                     </tr>
                                      )
                                                 
                                          
                                    
                                     })}
                                    
                                 </tbody>
                             </table>
                         </div>
}
                            <TablePagination
                                    // className={classes.pageContent}
                                    component = "div"
                                    page = {page}
                                    rowsPerPageOptions = {pages}
                                    rowsPerPage = {rowsPerPage}
                                    count = {searchValue.length}
                                    onChangePage = {handleChangePage}
                                    onChangeRowsPerPage = {handleChangeRowsPerPage}
                                    />
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
        
export default RefundOrderTable;