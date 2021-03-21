import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'

import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardHeader, Button, Table } from 'reactstrap'
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent} from 'react-feather';
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {useHistory} from 'react-router-dom'

import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const UserPromoCodeReport = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true);
    const [cityName,setCityName] = useState([])
    const [pushId,setPushId] = useState([])
   const [searchTerm, setSearchTerm]=useState("")
   const [city,setCity] = useState([])
   const [show,setShow] = useState(true)

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
            var pushid=[];
             var cityname=[];
             var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();

                        today = yyyy + '-' + mm + '-' + dd;
            app.database().ref().child("Masters").child("City")
            .once('value').then(function(snapshot) {
                snapshot.forEach(function(data){
                    var val = data.val(); 
                       cityname.push(val.Name);
                       pushid.push(val.PushId);
                     });
                     setPushId(pushid)
                     setCityName(cityname)
                    })
        // $('#datatable').empty();
        var database = app.database();
        database.ref().child("Promocode").child("User")
        .on('value', function(snapshot){
            setCity([])
            if(snapshot.exists()){
                var content = [];
               
                snapshot.forEach(snap=>{
                    content.push(snap.val());
                     console.log(content)
                  });
                setCity(content)
                setShow(false)

                }else{
                    const timeout = setTimeout(() => {
                        setShow(false)
                      }, 3000);
                      return ()=>{clearTimeout(timeout);}
    
                }           
        
    })
    database.ref().child("Promocode").child("User").orderByChild('EndDate').equalTo(today)
    .on('value', function(snapshot){
        setCity([])
        if(snapshot.exists()){
            var content = [];
           
            snapshot.forEach(snap=>{
                snap.child("Status").set("InActive")
              });
            
            }
           
        })
    return () => {
        window.removeEventListener('message', handleMessage);
      }
    }catch(err){
            console.log(err.message)
        }
       
    },[])
    const  onChangeHandler=(event)=>{
        setSearchTerm(event.target.value);
       }

       const onStatusChange=(event)=>{
       
            var pushid=event.target.id
            sessionStorage.setItem("promocodeStatus",pushid);
            history.push(`${process.env.PUBLIC_URL}/promo-code/userpromo-code`);
         
        
      
        //        Swal.fire({
        //         title: "Are you sure?",
        //         text: "Once deleted, you will not be able to recover it!",
        //         icon: "warning",
        //         showCancelButton: true,
        //     confirmButtonText: 'OK',
        //     cancelButtonText: 'Cancel',
        //     cancelButtonColor:'gray'
        //       })
        //       .then((willDelete) => {
        //         if (willDelete.value) {
        //             app.database().ref().child("Promocode").child("User").child(event.target.id).child("Status").set("InActive")
        //             Swal.fire({
        //         icon: "success",
        //         text:"Deleted!"
        //     });
        // }
        //    })
       }

    const deleteHandler = (event) =>{
        let pshid = event.target.id
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "warning",
            showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        cancelButtonColor:'gray'
          })
          .then((willDelete) => {
            if (willDelete.value) {
        app.database().ref().child("Promocode").child("User").child(pshid).remove()
        Swal.fire({
            icon: "success",
            text:"Deleted!"
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
            // var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            // var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            // var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("UserPromoCodeReport.pdf");  
          });  
      }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Setting" title="Promocode Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h5>User PromoCode Reports</h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label">Search </label>
                             <input type="text" value={searchTerm} onChange={onChangeHandler}  required=""  className="form-control" placeholder="Search.." title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="UserPromoCodeReport"  
                sheet="UserPromoCodeReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/promo-code/userpromo-code-report"
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
                            <div className="table-responsive text-nowrap" style={{ overflowX:"scroll"}}   >
                                
                                <Table id="datatable" className="table table-striped " >
                                    <thead >
                                        <tr >
                                        <th>SL</th>
                                        <th>City</th>
                                        <th>Promocode</th>
                                        <th>Discount</th>
                                        <th>Min Amount</th>
                                        <th>Max Amount</th>
                                        <th>Status</th>
                                        <th>Change Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            
                                            city
                                            .filter(orders =>orders.Name.includes(searchTerm))
                                            // .filter(orders =>orders.City.includes(searchTerm))
                                            // .filter(orders =>orders.Discount.includes(searchTerm))
                                            // .filter(orders =>orders.MinAmount.includes(searchTerm))
                                            // .filter(orders =>orders.MaxAmount.includes(searchTerm))
                                            // .filter(orders =>orders.Status.includes(searchTerm))
                                            .map((item,id)=>{
                                                    return(
                                                        <tr key={id}>
                                                        <td> {id+1}</td>
                                                        <td> {cityName[pushId.indexOf(item.City)]}</td>   
                                                        <td> {item.Name}</td>
                                                        <td> {item.Discount}</td>  
                                                        <td> {item.MinAmount}</td>   
                                                        <td> {item.MaxAmount}</td>  
                                                        <td> {item.Status}</td> 
                                                        <td><Button type="button" id={item.Name} onClick={onStatusChange}>InActive</Button></td>
                                                        </tr> 
                                                    )
                                            })
                                        }
                                    
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
                    )
}
export default UserPromoCodeReport;