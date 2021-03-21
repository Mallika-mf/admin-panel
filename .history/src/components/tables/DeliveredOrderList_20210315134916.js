import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Button,Modal,ModalBody,ModalFooter,FormGroup,ModalHeader,Input} from "reactstrap";
import { ShoppingBag, User, Truck,Headphones,Phone} from 'react-feather';
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import {useHistory} from 'react-router-dom'
import 'sweetalert2/src/sweetalert2.scss'
import { Table, TableBody, TableCell, TableRow, TableHead, makeStyles, TablePagination } from '@material-ui/core'

import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const DeliveredOrderTable = () => {
    const [show,setShow] = useState(true)
    const pages = [20,30,50]
    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(pages[page])
    const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
    const [sdate, setSdate] = useState("")
    const [edate, setEdate] = useState("")
    const [commision, setCommision] = useState("")
    const [chefDescription, setChefDiscription] = useState("")

    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState([]);
    const [cityName,setCityName] = useState([])
    const[cityPushId,setCityPushId] = useState([])
    const [localityName,setLocalityName] = useState([])
    const[localityPushId,setLocalityPushId] = useState([])
    const [showModel, setShowModel] = useState(false);
    const [showModel1, setShowModel1] = useState(false);
    const [viewItem,setViewItem] = useState([])
    const [viewItem1,setViewItem1] = useState([])
    const [dateTable,setDateTable] = useState([])
    const [accountanceTable,setAccountanceTable] = useState([])
    const [showAccountanceTable,setShowAccountTable] = useState(false)

    useEffect(() => {
        // let isCancelled = false;
        // async function fetchMyAPI() {
        //     if (!isCancelled) {

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
            .orderByChild("Status").equalTo("5")
            .on('value', function(snapshot){
                setSearchValue([])
                if(snapshot.exists()){
                  var content = [];
                  snapshot.forEach(snap=>{
                      var  val=snap.val()
                    if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {  
                    content.push(snap.val());
                    }
                  });
                  content.reverse()
                  content.map(item=>{
                      if(item.KitchenName===undefined){
                          item.KitchenName=""
                      }
                      if(item.OrderType===undefined){
                        item.OrderType=""
                    }
                  })
                  setSearchValue(content);
                  setShow(false)

                }else{
                        setShow(false)
                      

                }
            }) 
        
        return () => {
            window.removeEventListener('message', handleMessage);
          };
        // }
    // }
        // fetchMyAPI()
        // return ()=>{
        //     isCancelled = true;
        //   };
    },[localityName])

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
            pdf.save("DeliveredOrders.pdf");  
          });  
      }  
      const handleChangePage = (event, newPage) =>{
        setPage(newPage)
        console.log(newPage)
    }
    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
        console.log(parseInt(event.target.value, 10))

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
                || (x.KitchenName.includes(target.value))|| (x.Chef.includes(target.value)) || (x.CName.includes(target.value))|| (x.OrderType.includes(target.value)))

                }
            }
           
        })
    }
    const recordsAfterPagingAndSorting = ()=>{
        return filterfn.fn(searchValue).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const recordsAfterDateFiltering = ()=>{
        return filterfn.fn(dateTable)
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
                setDateTable([])
                setAccountanceTable([])
                if(snapshot.exists()){
                  var content = [];
                  snapshot.forEach(snap=>{
                      var  val=snap.val()
                      if(val.Status==="5"){
                        if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {  
                            content.push(snap.val());
                            app.database().ref().child("CloudKitchen").child(val.Chef)
                            .on('value',function(snapshot1){
                                setCommision(snapshot1.val().Commision)
                            })
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
                  setDateTable(content);
                  setAccountanceTable(content)
                }
            }) 
          } else if (sdate.length !== 0 && edate.length === 0) {
            let database = app.database();
            database.ref().child("Orders")
            .orderByChild("OrderDate").equalTo(sdate)
            .on('value', function(snapshot){
                setDateTable([])
                setAccountanceTable([])
                   if(snapshot.exists()){
                  var content = [];
                  snapshot.forEach(snap=>{
                      var  val=snap.val()
                      if(val.Status==="5"){
                        if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {  
                            content.push(snap.val());
                            app.database().ref().child("CloudKitchen").child(val.Chef)
                            .on('value',function(snapshot1){
                                setCommision(snapshot1.val().Commision)
                            })
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
                  setDateTable(content);
                  setAccountanceTable(content)
                }
            }) 
          } else {
            let database = app.database();
            database.ref().child("Orders")
            .orderByChild("OrderDate").equalTo(edate)
            .on('value', function(snapshot){
                setDateTable([])
                setAccountanceTable([])
                if(snapshot.exists()){
                  var content = [];
                  snapshot.forEach(snap=>{
                      var  val=snap.val()
                      if(val.Status==="5"){
                        if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {  
                            content.push(snap.val());
                            app.database().ref().child("CloudKitchen").child(val.Chef)
                            .on('value',function(snapshot1){
                                setCommision(snapshot1.val().Commision)
                            })
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
                  setDateTable(content);
                  setAccountanceTable(content)
                }
            }) 
          }
      
    }

    // const myFunction = () => {
    //     var input, filter, table, tr, td1,td2,td3,td4,td5,td6,td7,td8,td9,td10;
    //     var i,txtValue1,txtValue2,txtValue3,txtValue4,txtValue5,txtValue6,txtValue7,txtValue8,txtValue9,txtValue10;
    //     input = document.getElementById("search1");
    //     filter = input.value.toUpperCase();
    //     // table = document.getElementById("datatable");
    //     tr = table.getElementsByTagName("tr");
    //     for (i = 0; i < tr.length; i++) {
    //     td1 = tr[i].getElementsByTagName("td")[1];
    //     td2 = tr[i].getElementsByTagName("td")[2];
    //     td3 = tr[i].getElementsByTagName("td")[3];
    //     td4 = tr[i].getElementsByTagName("td")[4];
    //     td5 = tr[i].getElementsByTagName("td")[5];
    //     td6 = tr[i].getElementsByTagName("td")[6];
    //     td7 = tr[i].getElementsByTagName("td")[7];
    //     td8 = tr[i].getElementsByTagName("td")[8];
    //     td9 = tr[i].getElementsByTagName("td")[9];
    //     td10 = tr[i].getElementsByTagName("td")[10];
    //     if (td1) {
    //       txtValue1 = td1.textContent || td1.innerText;
    //       txtValue2 = td2.textContent || td2.innerText;
    //       txtValue3 = td3.textContent || td3.innerText;
    //       txtValue4 = td4.textContent || td4.innerText;
    //       txtValue5 = td5.textContent || td5.innerText;
    //       txtValue6 = td6.textContent || td6.innerText;
    //       txtValue7 = td7.textContent || td7.innerText;
    //       txtValue8 = td8.textContent || td8.innerText;
    //       txtValue9 = td9.textContent || td9.innerText;
    //       txtValue10 = td10.textContent || td10.innerText;
        
    //      var main = txtValue1+ txtValue2+txtValue3+txtValue4+txtValue5+txtValue6+txtValue7+txtValue8+txtValue9+txtValue10;
    //        if (main.toUpperCase().indexOf(filter) > -1) {
    //         tr[i].style.display = "";
    //       } else {
    //         tr[i].style.display = "none";
    //       }
    //     }       
    //   }
    //   }  
    //   function deg2rad(deg) {
    //     return deg * (Math.PI/180)
    //   }
    return (
        <Fragment >
            <BreadCrumb parent={<Home/>} subparent="Order Management" title="Delivered Orders"/>
            <Container  fluid={true}>
                <Col sm ="12">
               <CardHeader>
               <h6>Delivered  Order Report</h6>
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
                    <Row >

                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-6">
                    <label className="form-label">Search </label>
                    <Input type="text"   placeholder="Search for Name, Number, OrderId..." onChange={handleSearch}  required=""  className="form-control"  />
                    <div className="clearfix"></div>
                    </div>
                </div>
                <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable2"  
                filename="DeliveredOrders"  
                sheet="DeliveredOrders"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/delivered-order"
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
                            <Table id="datatable"  className="table table-striped "  >
                             
                                    <TableHead>
                                        <TableRow>
                                        <TableCell scope="col">SL</TableCell>
                                        <TableCell scope="col">Order Date</TableCell>
                                        <TableCell scope="col">Order Number</TableCell>
                                        <TableCell scope="col">Customer Details</TableCell>
                                        <TableCell scope="col">Chef Details</TableCell>
                                        <TableCell scope="col">Items</TableCell>
                                        <TableCell scope="col">Total</TableCell>
                                        <TableCell scope="col">Remarks</TableCell>
                                        <TableCell scope="col">DeliveryPartner</TableCell>
                                        <TableCell scope="col">Delivered</TableCell>
                                        <TableCell scope="col">Deliverd Date</TableCell>
                                        <TableCell scope="col">Status</TableCell>
                                        <TableCell scope="col">Distance</TableCell>
                                        <TableCell scope="col">Payment Id</TableCell>
                                        <TableCell scope="col">Order Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { recordsAfterPagingAndSorting().map((item,id) => {
                                     
                                         return(
                                        <TableRow key={id}>
                                        <TableCell>  {id+1}  </TableCell>
                                        <TableCell>{(item.OrderDateTime).substring(0, 11)}<br/>{(item.OrderDateTime).substring(11, item.OrderDateTime.length)}</TableCell>
                                       <TableCell style={{color:"#FFA501"}}>{item.OrderNo}</TableCell>
                                         <TableCell><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.CName}<br/><Headphones aria-hidden="true" style={{color:"#0000FF"}} size={15}/>&nbsp;{item.Number}</TableCell>
                                         {item.ChefNumber !== undefined?
                                       <TableCell><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{item.ChefNumber}</TableCell>:
                                    //    <TableCell><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</TableCell>
                                       <TableCell><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}</TableCell>
                                       }
                                       <TableCell className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">{"View"}</button></TableCell>
                                       <TableCell className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler1} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal1">{"View"}</button></TableCell>
                                        <TableCell>{item.Remarks}</TableCell>
                                        {item.DeliveryName!==undefined && item.DeliveryNumber!==undefined?
                                        <TableCell><Truck style={{color:"#0000FF"}}size={15}/>&nbsp;{item.DeliveryName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{ item.DeliveryNumber }</TableCell>:
                                       <TableCell>{"Not Assigned"}</TableCell>
                                       }
                                       {item.Remark===undefined || item.Remark===""?
                                       <TableCell>{item.DeliveryApiRemarks}</TableCell>:
                                      <TableCell>{item.Remark}</TableCell>
                                    }
                                       <TableCell >{item.DeliveryDateTime}</TableCell>
                                       <TableCell><b><font color="green">{"Completed"}</font></b></TableCell>  
                                       <TableCell>{parseFloat(item.Distance).toFixed(2)}Km</TableCell>
             
                                       <TableCell>{item.RazorpayId}</TableCell>
                                       <TableCell><Button className="warning" id={item.Pushid} onClick={viewDetailHandler}>{"View"}</Button></TableCell>

                                                         </TableRow>
                                                         )
                                                
                                              
                                })}
                            
                                    </TableBody>
                                    
                                </Table>
                            </div>:
                            <div className="table-responsive text-nowrap">
                            <Table   className="table table-striped "  >
                             
                                    <TableHead>
                                        <TableRow>
                                        <TableCell scope="col">SL</TableCell>
                                        <TableCell scope="col">Order Date</TableCell>
                                        <TableCell scope="col">Order Number</TableCell>
                                        <TableCell scope="col">Customer Details</TableCell>
                                        <TableCell scope="col">Chef Details</TableCell>
                                        <TableCell scope="col">Items</TableCell>
                                        <TableCell scope="col">Total</TableCell>
                                        <TableCell scope="col">Remarks</TableCell>
                                        <TableCell scope="col">DeliveryPartner</TableCell>
                                        <TableCell scope="col">Delivered</TableCell>
                                        <TableCell scope="col">Deliverd Date</TableCell>
                                        <TableCell scope="col">Status</TableCell>
                                        <TableCell scope="col">Distance</TableCell>
                                        <TableCell scope="col">Payment Id</TableCell>
                                        <TableCell scope="col">Order Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { recordsAfterDateFiltering().map((item,id) => {
                                     
                                         return(
                                        <TableRow key={id}>
                                        <TableCell>  {id+1}  </TableCell>
                                        <TableCell>{(item.OrderDateTime).substring(0, 11)}<br/>{(item.OrderDateTime).substring(11, item.OrderDateTime.length)}</TableCell>
                                       <TableCell style={{color:"#FFA501"}}>{item.OrderNo}</TableCell>
                                         <TableCell><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.CName}<br/><Headphones aria-hidden="true" style={{color:"#0000FF"}} size={15}/>&nbsp;{item.Number}</TableCell>
                                         {item.ChefNumber !== undefined?
                                       <TableCell><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{item.ChefNumber}</TableCell>:
                                    //    <TableCell><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</TableCell>
                                       <TableCell><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.OrderType==="Local" ?item.KitchenName:item.ChefName}<br/>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{cityName[cityPushId.indexOf(item.ChefCity)]}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}</TableCell>
                                       }
                                       <TableCell className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">{"View"}</button></TableCell>
                                       <TableCell className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler1} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal1">{"View"}</button></TableCell>
                                        <TableCell>{item.Remarks}</TableCell>
                                        {item.DeliveryName!==undefined && item.DeliveryNumber!==undefined?
                                        <TableCell><Truck style={{color:"#0000FF"}}size={15}/>&nbsp;{item.DeliveryName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{ item.DeliveryNumber }</TableCell>:
                                       <TableCell>{"Not Assigned"}</TableCell>
                                       }
                                       {item.Remark===undefined || item.Remark===""?
                                       <TableCell>{item.DeliveryApiRemarks}</TableCell>:
                                      <TableCell>{item.Remark}</TableCell>
                                    }
                                       <TableCell >{item.DeliveryDateTime}</TableCell>
                                       <TableCell><b><font color="green">{"Completed"}</font></b></TableCell>  
                                       <TableCell>{parseFloat(item.Distance).toFixed(2)}Km</TableCell>
             
                                       <TableCell>{item.RazorpayId}</TableCell>
                                       <TableCell><Button className="warning" id={item.Pushid} onClick={viewDetailHandler}>{"View"}</Button></TableCell>

                                                         </TableRow>
                                                         )
                                                
                                              
                                })}
                            
                                    </TableBody>
                                    
                                </Table>
                            </div>
}
                            <div className="table-responsive text-nowrap" style={{display:"none"}}>
                            <Table id="datatable2"  className="table table-striped "  >
                             
                                    <TableHead>
                                        <TableRow>
                                        {/* <TableCell scope="col">SL</TableCell> */}
                                        <TableCell scope="col">Order Date</TableCell>
                                        <TableCell scope="col">Over Value</TableCell>
                                        <TableCell scope="col">C.A.V</TableCell>
                                        <TableCell scope="col">Percentage</TableCell>
                                        <TableCell scope="col">MF.Comm</TableCell>
                                        <TableCell scope="col">Chef Name</TableCell>
                                        <TableCell scope="col">Chef MFCK ID</TableCell>
                                        <TableCell scope="col">Chef.Comm</TableCell>
                                        <TableCell scope="col">Delivery</TableCell>
                                        <TableCell scope="col">Pack.Chrg</TableCell>
                                        <TableCell scope="col">Taxes</TableCell>
                                        <TableCell scope="col">Discount</TableCell>
                                        <TableCell scope="col">Total</TableCell>
                                        <TableCell scope="col">Profit/Loss</TableCell>
                                        <TableCell scope="col">Payment Id</TableCell>

                                        </TableRow>
                                    </TableHead>
                            <TableBody>
                                        {accountanceTable.map((item,index)=>{
                                           let overValue = parseFloat(item.Subtotal)+parseFloat(item.DeliveryCharges)+parseFloat(item.Packing)+parseFloat(item.Taxes)
                                            // let percentage = parseFloat(item.Subtotal).toFixed(2)*(parseFloat(commision)/100)
                                            let mfComm = parseFloat(item.Subtotal)*(parseFloat(commision)/100)
                                            let chComm = parseFloat(item.Subtotal) - mfComm
                                            let total = overValue- parseFloat(item.Discount)
                                            let profitLoss = mfComm - parseFloat(item.Discount)
                                            return(

                                                                   <TableRow key={index}>
                                        {/* <TableCell>  {index+1}  </TableCell> */}
                                        <TableCell>{item.OrderDate}</TableCell>
                                        <TableCell>{parseFloat(overValue).toFixed(2)}</TableCell>
                                        <TableCell>{item.Subtotal}</TableCell>
                                       <TableCell style={{color:"#FFA501"}}>{commision}%</TableCell>
                                       <TableCell>{parseFloat(mfComm).toFixed(2)}%</TableCell>
                                       <TableCell>{item.OrderType==="Local" ?item.KitchenName:item.ChefName}</TableCell>
                                        <TableCell>{item.Chef}</TableCell>
                                        <TableCell>{parseFloat(chComm).toFixed(2)}</TableCell>
                                        <TableCell>{item.DeliveryCharges}</TableCell>
                                        <TableCell>{item.Packing}</TableCell>
                                        <TableCell>{item.Taxes}</TableCell>
                                        <TableCell>{item.Discount}</TableCell>
                                        <TableCell>{parseFloat(total).toFixed(2)}</TableCell>
                                        <TableCell>{parseFloat(profitLoss).toFixed(2)}</TableCell>
                                        <TableCell>{item.RazorpayId}</TableCell>

                                                         </TableRow>
                                                         )
                                        })}
                                    </TableBody>
                                    </Table>
                            </div>

                            <TablePagination
                    // className={classes.pageContent}
                    component="div"
                    page={page}
                    rowsPerPageOptions={pages}
                    rowsPerPage={rowsPerPage}
                    count={searchValue.length}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                            <Modal isOpen={showModel} >
                            <ModalHeader>
                            </ModalHeader>
                            <ModalBody>
                            <div className="table-responsive text-nowrap">
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="col">SL.NO</TableCell>
                                            <TableCell scope="col">Name</TableCell>
                                            <TableCell scope="col">Quantity	</TableCell>
                                            <TableCell scope="col">Price</TableCell>
                                            <TableCell scope="col">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { viewItem.map((item,id) => {
                                        console.log(item)
                                        return(
                                      <TableRow key={id}>
                                                   <TableCell>  {id+1}  </TableCell>
                                                    <TableCell>{item.Name}</TableCell>
                                                    <TableCell>{item.Qty}</TableCell>
                                                     <TableCell>{item.Price}</TableCell>
                                                     <TableCell >{item.Total}</TableCell>
                                                 </TableRow>
                                                 )
                                        })}
                                       
                                    </TableBody>
                                </Table>
                            </div>
                           
  {/* <Card  style={{height:"150px"}}>
  <div className="row" style={{marginTop:"2%",marginBottom:"2%",marginLeft:"2%"}} >
  <div className="col-xl-11 col-lg-10 col-md-11">
  <h4>Chef Instructions: </h4>
  <h5><span><b>{chefDescription}</b></span></h5>
  </div>
  </div>
  </Card> */}
      
                          
                            </ModalBody>
                            <ModalFooter>
                            <h4>Chef Instructions: </h4>
  <h5><span><b>{chefDescription}</b></span></h5>
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
                                <Table style={{overflowX:"scroll"}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="col">SL.NO</TableCell>
                                            <TableCell scope="col">Sub Total</TableCell>
                                            <TableCell scope="col">Delivery</TableCell>
                                            <TableCell scope="col">Packing</TableCell>
                                            <TableCell scope="col">Taxes</TableCell>
                                            <TableCell scope="col">Discount</TableCell>
                                            <TableCell scope="col">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { viewItem1.map((item,id) => {
                                        return(
                                      <TableRow key={id}>
                                                   <TableCell>  {id+1}  </TableCell>
                                                    <TableCell>{item.Subtotal}</TableCell>
                                                    <TableCell>{item.DeliveryCharges}</TableCell>
                                                     <TableCell >{item.Packing}</TableCell>
                                                     <TableCell >{item.Taxes}</TableCell>
                                                     <TableCell >{item.Discount}</TableCell>
                                                     <TableCell >{item.Total}</TableCell>

                                                 </TableRow>
                                                 )
                                        })}
                                       
                                    </TableBody>
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
        
export default DeliveredOrderTable;