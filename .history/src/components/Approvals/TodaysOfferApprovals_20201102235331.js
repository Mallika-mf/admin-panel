import React, { Fragment,useEffect,useState } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,CardBody,Button,Input} from "reactstrap";
import app from '../../data/base'
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { TablePagination } from '@material-ui/core'

import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const TodayOfferApprovals = () => {
  const pages = [10, 25, 30]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [filterfn, setFilterFn] = useState({ fn: items => { return items; } })

    const [show,setShow]=useState(true)
    const [isLoading, setIsLoading] = useState(true);

    const [users,setUsers] = useState([])
    const [comment,setComment] = useState("")

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
            // app.database().ref().child("Date").set("Time");

        var database = app.database();
        database.ref().child("Preorders")
        .orderByChild("AStatus").equalTo("InActive")
        .on('value', function(snapshot){
            if(snapshot.exists()){
                var content = [];
                snapshot.forEach(function(data){
                    var val = data.val();   
                    var locker = {
                      ChefName : val.ChefName,
                      Name : val.Name,
                      Image : val.Image,
                      OrderDate : val.OrderDate,
                      OrderEndDate : val.OrderEndDate,
                      EndDate : val.EndDate,
                      Settlement : val.Settlement,
                      PushId : val.PushId,
                      Chef : val.Chef,

                    }
                    content.push(locker)
                })
                content.reverse()
                content.map(item=>{
                  item.comment=""
                  return item;
  
               })
                setUsers(content)
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
          }
        }catch(err){
            console.log(err)
        }
        },[])
        
   

       const approvalHandler=(event)=>{
           let pushid=event.target.id
           console.log(pushid)
           Swal.fire({
            title: "Are you sure?",
            text: "Once Approved, Cannot be changed!",
            icon: "warning",
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor:'gray'
          })
          .then((willDelete) => {
            if (willDelete.value) {
                var firebaseref=app.database().ref().child("Preorders").child(pushid);      
                firebaseref.child("AStatus").set("Active");
              Swal.fire( {
                title: "Successfully Approved!",
                 text: "",
                 icon: "success",
               
              });
            }
          });   
          var database = app.database();
          database.ref().child("Preorders")
          .orderByChild("AStatus").equalTo("InActive")
          .on('value', function(snapshot){
              if(snapshot.exists()){
                  var content = [];
                  snapshot.forEach(function(data){
                      var val = data.val();   
                      content.push(val)
                  })
                  content.reverse()
                  content.map(item=>{
                    item.comment=""
                    return item;
    
                 })
                  setUsers(content)
                }
              })
       }

       const deleteHandler=(event)=>{
        let pushid=event.target.id
        Swal.fire({
            title: "Are you sure want to delete this order?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor:'gray'
          })
          .then((willDelete) => {
            if (willDelete.value) {
                app.database().ref().child("Preorders").child(pushid).remove();      
              Swal.fire("Deleted Successfully!", {
                icon: "success",
              });
            }
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
            pdf.save("PreOrderApproval.pdf");  
          });  
      }
      const textAreaChangeHandler=(event)=>{
        users.map(item=>{
            if(event.target.id===item.PushId){
                item.comment=event.target.value;
                setComment(event.target.value)
            }
            return item;
      
        })
      }
      
      const saveCommentHandler=(event)=>{
          let arrData = event.target.id.split(",")
        // let pushid = arrData[0]
        let chefid = arrData[1]
        console.log(chefid)

         var database = app.database().ref().child("Requests").child(chefid).push()
         database.child("Address").set(comment)
         database.child("RequestType").set("Changes")
         database.child("PushId").set(database.getKey())
         database.child("SupportReason").set("")
         database.child("Reason").set("Admin")
      
         Swal.fire({
            title: "Successfully Updated!",
            text: "",
            icon: "success"
         })
      }
      const handleChangePage = (event, newPage) =>{
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }
    let excludeSearch = ["ChefName"]
    const handleSearch = (e)=>{
      let target = e.target.value.toLowerCase().trim()
      setFilterFn({
          fn: items =>{
              if(target === ""){
              return items;
              }
              else{
              return items.filter(x =>{
                return Object.keys(x).some(key =>
                  excludeSearch.includes(key) ?false: x[key].toString().toLowerCase().includes(target)
                  )
              })
  
              }
          }
  
         
      })
  }
    const recordsAfterPagingAndSorting = ()=>{
        return filterfn.fn(users).slice(page*rowsPerPage,(page+1)*rowsPerPage)
    }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title="Preorder Approvals"/>
            <Container fluid={true}>
            <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h6> Preorder Approvals</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                    <CardBody>
                    <Row>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-8">
                         <label className="form-label">Search </label>
                         <Input type="text"   placeholder="Search..." onChange={handleSearch}  required=""  className="form-control"  />
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename=""  
                sheet="ChefApproval"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/approvals/TodaysOffer-approvals"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatable')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
                </div>
                </div>
                </Row>
                </CardBody>
                    <Col sm="12">
                        <Card>
                            <div className="table-responsive text-nowrap" style={{ overflowX:"scroll"}}   >
                                
                                <Table id="datatable"  data-toolbar="#bootstrap-table-toolbar" className="datatables-demo table table-striped table-bordered" style={{tablelayout: "auto"}}>
                                    <thead >
                                        <tr>
                                        <th>SL.No</th>
                                        <th>Chef Name</th>
                                        <th>Item Name</th>
                                        <th>Image</th>
                                        <th>Delivery Start Date</th>
                                        <th>Delivery End Date</th>
                                        <th>Preorder Start Date</th>
                                        <th>Preorder End Date</th>
                                        <th>Settlement</th>
                                        <th>Comment</th>
                                            <th>Save</th>
                                        <th>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {recordsAfterPagingAndSorting().map((item,id)=>{
                                                // for (var i=0;i<driverNumber.length;i++){
                                                    return(
                                                        <tr key={id}>
                                                          <td>{id+1}</td>
                                                       <td class="item_locality" >{item.ChefName}</td>
                                                       <td class="">{item.Name}</td>
                                                       <td class="actions" style={{fontSize: "25px", fontWeight: "bold"}}><a href={item.Image} target="_blank" rel="noopener noreferrer"><button type="button" id="savebtn" className="btn btn-success btn-md">View</button></a></td>                                                       
                                                       <td class="item_price">{item.OrderDate}</td>
                                                       <td class="item_kid" >{item.OrderEndDate}</td>
                                                       <td class="item_kid" >{item.StartDate}</td>
                                                       <td class="item_kid" >{item.EndDate}</td>
                                                       <td className="">{item.Settlement}</td>
                                                       <td><textarea id={item.PushId} value={item.comment} onChange={textAreaChangeHandler}></textarea></td>
                                                           <td><Button type="submit" id={item.PushId+","+item.Chef} onClick={saveCommentHandler}>Save</Button></td>
                                                       <td className="actions" style={{fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.PushId} onClick={approvalHandler} className="btn btn-danger btn-sm">Approval</button><button type="button" id={item.PushId} onClick={deleteHandler} className="btn btn-danger btn-sm">Delete</button></td>
                                         
                                                     </tr> 
                                                    )
                                                   
                                                     })}
                                       
                                       
                                    </tbody>
                                </Table>
                                
                            </div>
                            <TablePagination
                                    // className={classes.pageContent}
                                    component = "div"
                                    page = {page}
                                    rowsPerPageOptions = {pages}
                                    rowsPerPage = {rowsPerPage}
                                    count = {users.length}
                                    onChangePage = {handleChangePage}
                                    onChangeRowsPerPage = {handleChangeRowsPerPage}
                                    />
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
        
export default TodayOfferApprovals;