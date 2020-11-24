import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button,Modal,ModalBody,ModalFooter,ModalHeader,Input} from "reactstrap";
import { ShoppingBag, User, Truck,Headphones,Phone} from 'react-feather';
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import {useHistory} from 'react-router-dom'
import 'sweetalert2/src/sweetalert2.scss'
import { TablePagination} from '@material-ui/core'

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
    useEffect(() => {
        let isCancelled = false;
        async function fetchMyAPI() {
            if (!isCancelled) {

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
        setCityName(cityname)
        setCityPushId(citypushid)
    });

   await  app.database().ref().child("Masters").child("Localities")
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
    }
        fetchMyAPI()
        return ()=>{
            isCancelled = true;
          };
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
                || (x.ChefName.includes(target.value))|| (x.Chef.includes(target.value)) || (x.CName.includes(target.value)))

                }
            }
           
        })
    }
    const recordsAfterPagingAndSorting = ()=>{
        return filterfn.fn(searchValue).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
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
    return (
        <Fragment >
            <BreadCrumb parent={<Home/>} subparent="Order Management" title="Delivered Orders"/>
            <Container  fluid={true}>
                <Row >
                <Col sm ="12">
                    <Card>
               <CardHeader>
               <h6>Delivered  Order Report</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                            </Card>
               </Col>
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
                table="datatable"  
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
                            <div className="table-responsive text-nowrap">
                                <Table id="datatable">
                             
                                    <thead>
                                        <tr>
                                        <th>SL</th>
                                        <th>Order Date</th>
                                        <th>Order Number</th>
                                        <th>Customer Details</th>
                                        <th>Chef Details</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Remarks</th>
                                        <th>DeliveryPartner</th>
                                        <th>Delivered</th>
                                        <th>Actions</th>
                                        <th>Payment Id</th>
                                        <th>Order Details</th>
                                        </tr>
                                    </thead>
                                    <tbody id = "data-table">
                                    { recordsAfterPagingAndSorting().map((item,id) => {
                                         return(
                                        <tr key={id}>
                                        <td>  {id+1}  </td>
                                        <td>{(item.OrderDateTime).substring(0, 11)}<br/>{(item.OrderDateTime).substring(11, item.OrderDateTime.length)}</td>
                                       <td style={{color:"#FFA501"}}>{item.OrderNo}</td>
                                         <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.CName}<br/><Headphones aria-hidden="true" style={{color:"#0000FF"}} size={15}/>&nbsp;{item.Number}</td>
                                         {item.ChefNumber !== undefined?
                                       <td>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>:
                                    //    <td><User style={{color:"#0000FF"}} size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>
                                       <td>< ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>
                                       }
                                       <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">{"View"}</button></td>
                                       <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler1} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal1">{"View"}</button></td>
                                        <td>{item.Remarks}</td>
                                        {item.DeliveryName!==undefined && item.DeliveryNumber!==undefined?
                                        <td><Truck style={{color:"#0000FF"}}size={15}/>&nbsp;{item.DeliveryName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{ item.DeliveryNumber }</td>:
                                       <td>{"Not Assigned"}</td>
                                       }
                                       {item.Remark===undefined || item.Remark===""?
                                       <td>{item.DeliveryApiRemarks}</td>:
                                      <td>{item.Remark}</td>
                                    }
                                       <td >{item.DeliveredDateTime}</td>
                                       <td><b><font color="green">{"Completed"}</font></b></td>               
                                       <td>{item.RazorpayId}</td>
                                       <td><Button className="warning" id={item.Pushid} onClick={viewDetailHandler}>{"View"}</Button></td>

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