import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button} from "reactstrap";
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import { TablePagination} from '@material-ui/core'
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
const ChefActive = () => {
  const pages = [10, 30, 100,200]
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(pages[page])
  const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
  
    // const history = useHistory()
  const [show,setShow] = useState(true)
    const [users,setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    // const [search,setSearch] = useState("")
    

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
            var database = app.database();
            database.ref().child("CloudKitchenInActive")
            .on('value', function(snapshot){
              setUsers([])
              if(snapshot.exists()){
            var content = [];
            
            snapshot.forEach(snap=>{
              
              if(snap.hasChild("UserName")){
                var val = snap.val()
                var locker = {
                  UserId : val.UserId,
                  Name : val.Name,
                  Gender : val.Gender,
                  MobileNumber : val.MobileNumber,
                  CityName : val.CityName,
                  LocalityName : val.LocalityName,
                  Membership : val.Membership,
                  AStatus : val.AStatus,
                }
                content.push(locker);              
              } 
               });
               content.map(item=>{
                if(item.Name===undefined){
                  item.Name=""
                }
                if(item.UserId===undefined){
                  item.UserId=""
                }
                if(item.Number===undefined){
                  item.Number=""
                }
                return item
              })
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
  // const onChangeStateSearch=(event)=>{
  //   setSearch(event.target.value)
  // }

  const onUpdateHandler=(event)=>{
      var userid=event.target.id
      app.database().ref().child("CloudKitchenInActive").child(userid)
    .on("value", function(snapshot) {
      setUsers([])
        if(snapshot.exists()) {

            app.database().ref().child("CloudKitchen").child(userid).set(snapshot.val());

            app.database().ref().child("CloudKitchenInActive").child(userid).remove();
            Swal.fire("Activated Successfully!", {
                icon: "success",
              });
            var database = app.database();
            database.ref().child("CloudKitchenInActive")
            .on('value', function(snapshot){
              setUsers([])
              if(snapshot.exists()){
            var content = [];
            
            snapshot.forEach(snap=>{
              
              if(snap.hasChild("UserName")){
                var val = snap.val()
                var locker = {
                  UserId : val.UserId,
                  Name : val.Name,
                  Gender : val.Gender,
                  MobileNumber : val.MobileNumber,
                  CityName : val.CityName,
                  LocalityName : val.LocalityName,
                  Membership : val.Membership,
                  AStatus : val.AStatus,
                }
                content.push(locker);
              } 
               }); 
               content.map(item=>{
                if(item.Name===undefined){
                  item.Name=""
                }
                if(item.UserId===undefined){
                  item.UserId=""
                }
                if(item.Number===undefined){
                  item.Number=""
                }
                return item
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
        pdf.save("ChefActive.pdf");  
      });  
  }
  const handleChangePage = (event, newPage) =>{
    setPage(newPage)
}
const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
}
let excludeSearch = ["Gender", "CityName", "LocalityName","Membership","AStatus"]

const handleSearch = (e) => {
    let target = e.target.value.toLowerCase().trim()
    setFilterFn({
        fn: items => {
            if (target === "") {
                return items;
            }
            else {
                return items.filter(x => {
                    return Object.keys(x).some(key =>
                        excludeSearch.includes(key) ? false : x[key].toString().toLowerCase().includes(target)
                    )
                })

            }
        }


    })
}
const recordsAfterPagingAndSorting = () => {
    return filterfn.fn(users).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
}
  
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Report" title=" Chef Active"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6>Chef Active</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>    
                        <div className="input-group col-md-11" style={{margin:"1.5%"}}>            
                        {/* <div className="col-md-5" style={{ margin: "1%" }}>
                                <div className="form-group col-md-10"> */}
                                    {/* <label className="form-label">Search </label> */}
                                    <input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                                    <div className="clearfix"></div>
                                    <span className="input-group-btn" 
            style={{width:"50%",marginLeft:"-30px"}}></span>
                                {/* </div>
                                {/* </div>
                            </div> */}
                        {/* <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}> */}
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="ChefActive"  
                sheet="ChefActive"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/active-chef"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatable')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
                      </div>
                      </div>
                     
                            <div className="table-responsive text-nowrap">
                                <Table className="datatables-demo table table-striped table-bordered" id="datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col"> MFID </th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Number</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Zone</th>
                                            <th scope="col">Package</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>

                                        </tr>
                                    </thead>
                            
                                    <tbody>
                                    {recordsAfterPagingAndSorting().map((item,id)=>{
                                                            if(item.AStatus==="InActive"){
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                                                                                                            
                                                       <td > {item.UserId}</td>
                                                       <td > {item.Name}</td>
                                                       <td > {item.Gender}</td>
                                                       <td > {item.MobileNumber}</td>
                                                       <td > {item.CityName}</td>
                                                       <td > {item.LocalityName}</td>
                                                       <td > {item.Membership}</td>
                                                       <td className="text-primary"><b>{item.AStatus}</b></td>
                                                       <td  style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.UserId} onClick={onUpdateHandler} class="btn btn-primary btn-md">{"Active"}</button></td>        

                                                     </tr>
                                                    )
                                                            }else{
                                                                return(
                                                                    <tr key={id}> 
                                                                    <td>{id+1}</td>                                                                                                            
                                                                   <td > {item.UserId}</td>
                                                                   <td > {item.Name}</td>
                                                                   <td > {item.Gender}</td>
                                                                   <td > {item.MobileNumber}</td>
                                                                   <td > {item.CityName}</td>
                                                                   <td > {item.LocalityName}</td>
                                                                   <td > {item.Membership}</td>
                                                                   <td className="text-success"><b>{item.AStatus}</b></td>
                                                                   <td  style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.UserId} onClick={onUpdateHandler} class="btn btn-primary btn-md">{"Active"}</button></td>        

                                                                 </tr>
                                                                )
                                                                   }
                                                            
                                                     })}

                                       
                                    </tbody>
                                   
                                </Table>
                            </div>
                            <TablePagination
                    // className={classes.pageContent}
                    component="div"
                    page={page}
                    rowsPerPageOptions={pages}
                    rowsPerPage={rowsPerPage}
                    count={users.length}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
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
        
export default ChefActive;