import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button} from "reactstrap";
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather';
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {useHistory} from 'react-router-dom'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const AddonTable = () => {

    const history = useHistory()
    const [show,setShow] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState([]);
    useEffect(()=>{
        async function fetchMyAPI() {

        window.addEventListener('message', handleMessage);
        var database = app.database();
    database.ref().child("Masters").child("Addons")
    .on('value', function(snapshot){
        if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            snapshot.forEach(snap=>{
                content.push(snap.val());
              });
              setSearchValue(content);
              setShow(false)

            }else{
                const timeout = setTimeout(() => {
                    setShow(false)
                  }, 3000);
                  return ()=>{clearTimeout(timeout);}

            }
               
            });
        
        

            return () => {
                window.removeEventListener('message', handleMessage);
              };
            }
              fetchMyAPI()

    },[])
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
            pdf.save("Addons.pdf");  
          });  
      }
      const onClickDeleteHandler=(event)=>{
        const localityId=event.target.id
        var superadmin=window.localStorage.getItem('superadmin');
        if(superadmin===null){                      
            superadmin=window.sessionStorage.getItem('superadmin');
            if(superadmin===null){
                history.push(`${process.env.PUBLIC_URL}/login`);
            } 
        }
    
        
    
        if(superadmin==="Yes"){
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
                         app.database().ref().child("Masters").child("Addons").child(localityId).remove();
                        Swal.fire({
                        icon: "success",
                        text:"Deleted!"
                    });
                }else if (willDelete.dismiss === Swal.DismissReason.cancel){
                Swal.fire(
                    'Cancelled',
                    'error'
                  )
                }
            });
        }
        else{
            Swal.fire({
                title: "Disabled",
                text: "The option has been disabled!",
                icon: "warning",
                dangermode: true,
              });
        }
    }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Food Management" title=" Addons List "/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                <CardHeader>
                                <h6>Addons List </h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                         </CardHeader>
                    </Col>
                    </Row>
                    <Row >
                    <div className="col-md-11 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="Addons"  
                sheet="Addons"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/addon-table"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatable')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
                </div>
                </div>
                  </Row>
                   <Row >
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                                <h5>Cusines </h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                            <div className="table-responsive">
                                <Table id="datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Addons</th>
                                            <th scope="col">Delete</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                   {searchValue.map((item,id)=>{
                                       return(
                                           <tr key={id}>
                                               <td>{id+1}</td>
                                               <td className="item_cityname">{item.Name}</td>
                                               <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.PushId} onClick={onClickDeleteHandler} className="btn btn-danger btn-md">Delete</button></td>
         
                                               {/* <td className="item_pushid" style={{display:"none"}}><textarea type="text" className="crop" rows="1" cols="30">{item.PushId}</textarea></td>'; */}
                                           </tr>
                                       )
                                   })}
                                                     
                                    </tbody>
                                </Table>
                            </div>
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
        
export default AddonTable;