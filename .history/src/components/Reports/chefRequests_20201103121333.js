import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button} from "reactstrap";
import { TablePagination} from '@material-ui/core'

// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import {useHistory} from 'react-router-dom'
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
const ChefRequest = () => {
  const pages = [5,10,25]
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(pages[page])
  const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
  
    const history = useHistory()
  const [show,setShow] = useState(true)
    const [users,setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [search,setSearch] = useState("")
    

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
            var database = app.database();
            database.ref().child("Requests")
            .orderByChild("Status").equalTo("Open")
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
    users.map(item=>{
        if(event.target.id===item.UserId){
          item.Details=event.target.value
        }
        return item
    })
  }
  const idClickHandler=(event)=>{
       var userid=event.target.id
       sessionStorage.setItem("chefidapproval",userid);
       history.push(`${process.env.PUBLIC_URL}/approvals/FoodItems-approvals`);
    
  }

  const CloseHandler=(event)=>{
    var userid=event.target.id    
    var firebaseref=app.database().ref().child("Requests").child(userid);
    firebaseref.child("Status").set("Close");

    Swal.fire({
        title: "Successfully Updated!",
        icon: "success",
        confirmButtonText: "Ok" 
       });
    
  }
   
  const openHandler=(event)=>{
    var userid = event.target.id
    var firebaseref=app.database().ref().child("Requests").child(userid);
    firebaseref.child("Status").set("Open");

    Swal.fire({
        title: "Successfully Updated!",
        icon: "success",
        confirmButtonText: "Ok" 
       });
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
        pdf.save("ChefRequestReport.pdf");  
      });  
  }
  
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title=" Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6>Chef Requests</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>        
                        <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label">Search </label>
                             <input type="text"  value={search} onChange={onChangeStateSearch}  required="" className="form-control" placeholder="Search for chef Id" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="ChefRequestReport"  
                sheet="ChefRequestReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/chef-request-report"
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
                                            <th scope="col"> KitchenID </th>
                                            <th scope="col">	Request	</th>
                                            <th scope="col"> 	Status	</th>
                                            <th scope="col">  Actions</th>
                                        </tr>
                                    </thead>
                            
                                    <tbody>
                                    {users.filter(order=>order.UserId.includes(search)).map((item,id)=>{
                                         
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                                                                                                            
                                                       <td  id={item.UserId} onClick={idClickHandler} style={{color:"darkorange",fontWeight:"bold",cursor:"pointer" }}> {item.UserId}</td>
                                                       <td className="">{item.RequestType}</td>
                                                       <td className="">{item.Status}</td>
                                                       {item.Status==="Open"?
                                                       <td style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.UserId} onClick={CloseHandler}  className="btn btn-danger btn-md">{"Close"}</button></td>
                                                        :
                                                        <td style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.UserId} onClick={openHandler}  className="btn btn-success btn-md">{"Open"}</button></td>
                                                       }
                                                     </tr>
                                                    )
                                                  
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
        
export default ChefRequest;