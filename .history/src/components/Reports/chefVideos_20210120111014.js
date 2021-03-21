import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button} from "reactstrap";
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app,{storage} from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
// import { TablePagination} from '@material-ui/core'

// import {useHistory} from 'react-router-dom'
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
const ChefVideos = () => {
  // const pages = [10, 30, 100,200]
  // const [page,setPage] = useState(0)
  // const [rowsPerPage,setRowsPerPage] = useState(pages[page])
  // const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
  
    // const history = useHistory()
  const [show,setShow] = useState(true)
    const [users,setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    // const [search,setSearch] = useState("")
    
    const [active,setActive] = useState([])

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
            var database = app.database();
            database.ref().child("Videos")
        .on('value', function(snapshot){
          setUsers([])
          
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

useEffect(()=>{
 

 
// app.database().ref().child('Masters').child('City').on('value',snapshot1=>{
//   let content = []
//   let citysnap
//   snapshot1.forEach(snap1=>{
//     app.database().ref().child(snap1.val().PushId).orderByChild("Status").equalTo("Active")
//     .on('value', function(snapshot){
//       setActive([])
      
//       if(snapshot.exists()){
//         var content = [];
        
//         snapshot.forEach(snap=>{
//           citysnap = snap.val()
//           content.push(citysnap);
    
//           });
//           console.log(content)
//           setActive(content);
//         }
      
//       })
//   })
  

// })

app.database().ref().child('-M9w7zRHJvL27CSyE7eC').orderByChild('Status').equalTo('Active').on('value',snapshot=>{
  let content = []
  let citysnap
  
      
      if(snapshot.exists()){
       
        
        snapshot.forEach(snap=>{
          if(snap.val().UserId!==undefined){
            citysnap = snap.val()
            content.push(citysnap);
          }
          
    
          });
          console.log(content)
        }
        setActive(content);

      })
 


 
},[])
  // const onChangeStateSearch=(event)=>{
  //   setSearch(event.target.value)
  //   users.map(item=>{
  //       if(event.target.id===item.UserId){
  //         item.Details=event.target.value
  //       }
  //       return item
  //   })
  // }
  const DownLoadHandler=(event)=>{
      //  var userid=event.target.id
       Swal.fire({
        title: "Please user Firebse Console to Download!",
        text: "",
        icon: "success",
        confirmButtonText: "Ok" 
       });
    
  }

  const DeleteHandler=(event)=>{
      var arrData = event.target.id.split("-")
    var userid=arrData[0]  
    var pushid = arrData[1]
    Swal.fire({
        title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                cancelButtonColor:'gray'
      }) .then((willDelete) => {
        if (willDelete.value) {

            var storageRef =storage;
            var desertRef = storageRef.ref('videos/'+userid);

            // Delete the file
            desertRef.delete().then(function() {
                app.database().ref().child("Videos").child(pushid).remove();

                Swal.fire({
                    title: "Successfully Deleted!",
                    text: "",
                    icon: "success",
                    confirmButtonText: "Ok" 
                });

            }).catch(function(error) {
            // Uh-oh, an error occurred!
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
        pdf.save("ChefVideos.pdf");  
      });  
  }
  
  const ApprovedChefHandler=(event)=>{
  // let arrData = event.target.id.split(",")
  // console.log(arrData)
  let userid = event.target.id
  console.log(userid)
    app.database().ref().child("-M9w7zRHJvL27CSyE7eC").child(userid).child("Status").set("InActive")
    // app.database().ref().child('CloudKitchen').child(userid).child('Status').set('InActive')
  }
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title=" Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6>Chef Videos</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>        
                        {/* <div className="col-md-5" style={{ margin: "1%" }}>
                                <div className="form-group col-md-10">
                                    <label className="form-label">Search </label>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                                    <div className="clearfix"></div>
                                </div>
                            </div> */}
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="ChefVideos"  
                sheet="ChefVideos"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/chef-videos-report"
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
                                            <th scope="col"> KitchenID </th>
                                            <th scope="col">Download Video</th>
                                            <th scope="col">Delete Video</th>
                                        </tr>
                                    </thead>
                            
                                    <tbody>
                                    {users.map((item,id)=>{
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                                                                                                            
                                                       <td > {item.ChefId}</td>
                                                       <td style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.ChefId} onClick={DownLoadHandler}  className="btn btn-danger btn-md">{"DownLoad"}</button></td>
                                                       <td style={{ fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.ChefId+"-"+item.PushId} onClick={DeleteHandler}  className="btn btn-danger btn-md">{"Delete"}</button></td>
                                                     </tr>
                                                    )
                                                    
                                                     })}

                                       
                                    </tbody>
                                   
                                  </Table>
                               <Table className="datatables-demo table table-striped table-bordered" id="datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col"> UserId </th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Status</th>
                                            <th scope>Local </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                            
                                    <tbody>{console.log(active)}
                                    {active.map((item,id)=>{
                                      console.log(item)
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                                                                                                            
                                                       <td >{item.UserId}</td>
                                                       <td >{item.Name}</td>
                                                       <td >{item.Status}</td>
                                                       <td >{item.Local}</td>

                                                       {/* <td ><button id={item.UserId+","+item.PushId} onClick={ApprovedChefHandler}>Approved</button></td> */}
                                                       <td ><button id={item.UserId} onClick={ApprovedChefHandler}>Approved</button></td>

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
        
export default ChefVideos;