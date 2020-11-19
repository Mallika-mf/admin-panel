import React, { Fragment,useState,useEffect} from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import app from '../../data/base'
import {useHistory} from 'react-router-dom'
import {  ShoppingBag,  User,Headphones,Phone} from 'react-feather';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { css } from "@emotion/core";
import {BeatLoader}  from "react-spinners";
const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const BasicTable = () => {
  const history = useHistory()
    const [searchTerm, setSearchTerm]=useState("")
    const [searchValue, setSearchValue] = useState([]);
    const [cityName,setCityName] = useState([])
    const[cityPushId,setCityPushId] = useState([])
    const [localityName,setLocalityName] = useState([])
    const[localityPushId,setLocalityPushId] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [show,setShow] = useState(true)
    const [viewItem,setViewItem] = useState([])
    const [viewItem1,setViewItem1] = useState([])
    const [showModel, setShowModel] = useState(false);
    const [showModel1, setShowModel1] = useState(false);
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
            // state.order.empty();

            var database = app.database();
            database.ref().child("Orders")
            
            .on('value', function(snapshot){
              console.log(snapshot.val().Status)
              setSearchValue([])
              if(snapshot.exists()){
                    var contents = [];
                 
                    snapshot.forEach(snap=>{
                      var val = snap.val()
                      if(val.OrderDateTime !== '' || val.OrderDateTime !== undefined || val.OrderDateTime !== null) {           
                        contents.push(snap.val());
                      }
                      });
                      console.log(contents)
                     contents.map((item)=>{
                         if(item.OrderNo===undefined){
                             item.OrderNo=""
                         }
                         return item;

                     })
                     contents.reverse()
                      setSearchValue(contents);
                      setShow(false)
                  }else{
                        setShow(false)
                  }

                }) 
            })
           
        
            return () => {
                window.removeEventListener('message', handleMessage);
                // clearTimeout(timeout);

              };
       
      }, []);
    
      const viewDetailHandler=(event)=>{
       
        var pushid=event.target.id
        sessionStorage.setItem("chefidapproval",pushid);
        history.push(`${process.env.PUBLIC_URL}/View-details`);
     

}

  const  onChangeHandler=(event)=>{
    setSearchTerm(event.target.value);
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
          app.database().ref().child("Orders").child(pushId).child("Status").set("2");
          Swal.fire({
            text: "",
            icon: "success",
        });
}


});


}
    const handleMessage = (event) => {
        if (event.data.action ==='receipt-loaded') {
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
            pdf.save("NewOrder.pdf");  
          });  
      }  
    
      
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Order Management" title="New Orders"/>
            <Container fluid={true}>
                <Row>
                <Col sm ="12">
               <CardHeader>
               <h5>New Order Report</h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                 </CardHeader>
               </Col>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-8">
                         <label className="form-label">Search </label>
                             <input type="number"  value={searchTerm} onChange={onChangeHandler}  required="" className="form-control" placeholder="Search for Order ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="NewOrder"  
                sheet="NewOrder"  
                buttonText="Excel" />
                <iframe
                    id="iDatatableFrame"
                    src="/table/basic"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatableFrame')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
                </div>
                </div>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>New Order Report</h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
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
                                            <th scope="col">	Chef Details	</th>
                                            <th scope="col">Items</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Actions</th>
                                            <th scope="col">Payment Id</th>
                                            <th scope="col">Order Details</th>
                                            <th scope="col">Change Status</th>


                                        </tr>
                                    </thead>
                                    <tbody id="data-table">
                                    { searchValue.filter(orders =>
                                            orders.OrderNo.includes(searchTerm)).map((item,id) => {
                                       
                                       
                                        return(
                                      <tr key={id}>
                                                   <td>  {id+1}  </td>
                                                   <td>{(item.OrderDateTime).substring(0, 11)}<br/>{(item.OrderDateTime).substring(11, item.OrderDateTime.length)}</td>
                                                {item.DeliveryTime ==="Immediately"?
                                                    <td >{"Instant Delivery"}</td>:
                                                     <td>{item.DeliveryTime+","+item.DeliveryDate}</td>
                                                }
                                                <td style={{color:"#FFA501"}}>{item.OrderNo}</td>
                                                  <td><User style={{color:"#0000FF"}}size={15}/>&nbsp;{item.CName}<br/><Headphones aria-hidden="true" style={{color:"#0000FF"}}size={15}/>&nbsp;{item.Number}</td>
                                                  {item.ChefNumber !== undefined?
                                                <td><User style={{color:"#0000FF"}}size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{item.ChefNumber}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>:
                                                <td><User style={{color:"#0000FF"}}size={15}/>&nbsp;{item.ChefName}<br/><Phone style={{color:"#0000FF"}}size={15}/>&nbsp;{""}<br/> < ShoppingBag style={{color:"#0000FF"}}size={15}/>&nbsp;{localityName[localityPushId.indexOf(item.ChefLocality)]}{","}{cityName[cityPushId.indexOf(item.ChefCity)]}</td>
                                                }
                                                <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">{"View"}</button></td>
                                                <td className="actions-view" style={{textAlign:"center"}}><button type="button" id={item.Pushid} onClick={onClickViewItemHandler1} className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal1">{"View"}</button></td>
                                                <td><b><font color="blue">{"Order Accepted"}</font></b><br/><button id={item.Pushid} onClick={onClickDeleteHandler} className="btn btn-info btn-sm">{"Cancel"}</button></td>               
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
        
export default BasicTable;