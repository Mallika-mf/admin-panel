import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,CardBody,Button} from "reactstrap";
import app from '../../data/base'
import {Check,Trash} from 'react-feather'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const FoodItemApprovals = () => {
    const [show,setShow]=useState(false)
    const [name,setName] = useState("")
    const [detail,setDetail] = useState("")
    const [searchTerm, setSearchTerm]=useState("")
    const [users,setUsers] = useState([])
    const [chefCommision,setChefCommision] = useState([])
    // const [cPushid,setcPushid] = useState([])
    const [ statecid,setStatecid] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [search,setSearch] = useState("")
    const [comment,setComment] = useState("")
    // const [rcityName,setRcityName] = useState("")
    // const [request,setRequest] = useState([])
    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
        var cid=[];
        var chefcommision=[];
        var rcityname=[];
        var cpushid=[];
        var ccommision=[];
        var database = app.database();
       
        app.database().ref().child("CloudKitchen")
        .once('value').then(function(snapshot) {
            snapshot.forEach(function(data){
                var val = data.val(); 
                cid.push(val.UserId);
                chefcommision.push(val.Commision);
                rcityname.push(val.City);
            });
               setStatecid(cid)
                setChefCommision(chefcommision)
                // setRcityName(rcityname)
        
        });
        app.database().ref().child("Masters").child("City")
        .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
                cpushid.push(val.PushId);
                ccommision.push(val.Commision);
        });
        // setcPushid(cpushid)
    });

    var chefid=sessionStorage.getItem('chefidapproval');
    setSearch(chefid)
            database.ref().child("CloudKitchen")
          .child("FoodItems")
         .orderByChild("AStatus").equalTo("InActive")
        .on('value', function(snapshot){
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
                content.push(snap.val());
              });
              content.map(item=>{
                  setName(item.Name)
                  setDetail(item.Details)
                  return item;
              })
             
              console.log(content)
              setUsers(content);
            }
        
    })

    
    return () => {
        window.removeEventListener('message', handleMessage);
      };
 }catch(err){
     console.log(err)
 }
    },[])
    const onChangeNameHandler=(event)=>{
        setName(event.target.value)
        users.map((item,id)=>{
            if(event.target.id===item.PushId){
                item.Name=event.target.value
            }
            return item;

        })
    }
    const onChangeDetailsHandler=(event)=>{
        setDetail(event.target.value)
        users.map((item,id)=>{
            if(event.target.id===item.PushId){
                item.Details=event.target.value
            }
            return item;

        })
    }
    const onDeleteHandler=(event)=>{
        let arrData = event.target.id.split(",")
        let userid = arrData[0]
        let pushid = arrData[1]
        console.log(arrData)
    Swal.fire({
        title: "Are you sure want to delete the food item?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        cancelButtonColor:'gray'
      })
      .then((willDelete) => {
        if (willDelete.value) {
            app.database().ref().child("CloudKitchen").child(userid).child("FoodItems").child(pushid).remove()
        Swal.fire({
            title: "Food Item Deleted Successfully!",
            text: "",
            icon: "success",
    });
}

});
    }
    const onUpdateHandler=(event)=>{
        
        var arrData= event.target.id.split(",")
        console.log(arrData)
       let pushid=arrData[1]
        let userid=arrData[0]
        // let name1=arrData[2]
        // let details=arrData[3]
        let ftotal=arrData[4]

        let firebaseref=app.database().ref().child("CloudKitchen").child(userid).child("FoodItems").child(pushid);
    firebaseref.child("AStatus").set("Active");
    // if(name1 !== name) {
        firebaseref.child("Name").set(String(name));       

    // }
    // if(details !== detail) {
        firebaseref.child("Details").set(String(detail));       

    // }


    firebaseref.child("Settlement").set(ftotal);

    Swal.fire({
        title: "Successfully Updated!",
        text: "",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        cancelButtonColor:'gray'
       });
    }
    const onChangeSearchHandler=(event)=>{
        setSearch(event.target.value)
    }
    const  onChangeHandler=(event)=>{
        setSearchTerm(event.target.value);
       }
       const handleMessage = (event) => {
        if (event.data.action === 'receipt-loaded') {
          setIsLoading(false);
        }
      };
      const onSearchHandler=()=>{
          console.log("im clicking")
          setShow(true)
        if(search===""){
            alert("Enter Cloud Kitchen ID");
            return;
        }
        var database = app.database();
        database.ref().child("CloudKitchen")
        .child(search)
        .child("FoodItems")
        .orderByChild("AStatus").equalTo("InActive")
        .on('value', function(snapshot){
            if(snapshot.exists()){
                var content = [];
                
                snapshot.forEach(function(data){
                 content.push(data.val())
                })
                content.map(item=>{
                   item.comment=""
                   return item;

                })
                console.log(content)
                setUsers(content)
                setShow(false)

            }else{
                const timeout = setTimeout(() => {
                    setShow(false)
                  }, 3000);
                  return ()=>{clearTimeout(timeout);}
  
            }
        })
        app.database().ref().child("Requests").child(search)
    .once('value', function(snapshot){
        if(snapshot.exists()){
        // $('#datatable').empty();
        var content = [];
        
        snapshot.forEach(snap=>{
        //    snap.child("PushId").forEach(data=>{
        //         content.push(data.val());
        //     })
          content.push(snap.val());

          })
          console.log(content)
          content.map(item=>{
            if(window.pushid===item.PushId){
            setComment(item.Address)
            }
            return item;

        })
        //   setRequest(content)

        }
     } )
      }
      const textAreaChangeHandler=(event)=>{
        console.log(event.target.value)
        console.log(event.target.id)
        users.map(item=>{
            if(event.target.id===item.PushId){
                item.comment=event.target.value;
                setComment(event.target.value)
            }
            return item;

        })
      }

      const saveCommentHandler=(event)=>{
          let arrData = event.target.id.split("-")
          window.pushid=arrData[1]
          console.log(arrData)
          let item_pushid = arrData[1]
          let userid= arrData[2]
          console.log(comment)
          console.log(item_pushid)
         var database = app.database().ref().child("Requests").child(userid).child(item_pushid)
         database.child("Address").set(comment)
         database.child("RequestType").set("Changes")
         database.child("PushId").set(item_pushid)
         database.child("SupportReason").set("")
         database.child("Reason").set("Admin")

         Swal.fire({
            title: "Successfully Updated!",
            text: "",
            icon: "success"
         })
      }
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
            pdf.save("FoodItemApprovals.pdf");  
          });
        }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Approvals" title="Food Item Approvals"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h6> Food Item Approvals</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                    <CardBody>
                    <div className="form-group row">
                     <label className="col-form-label col-sm-2 text-sm-right">Enter Home Chef Id</label>
                    <div className="col-sm-8">
                    <div className="row">
                     <div className="col-lg-6 col-md-5 col-sm-5">
                    <input type="text" value={search|| ""} onChange={onChangeSearchHandler}  className="form-control"/>
                    </div>
                    <div className="col-sm-1 col-md-2">
                    <span id="search" onClick={onSearchHandler}><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine"/></span>
                    </div>
                    </div>
                     <div className="clearfix"></div>
                    </div>
                    </div>
                    <Row>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-8">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text" value={searchTerm} onChange={onChangeHandler}  required="" className="form-control" placeholder="Search for Item Name" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="FoodItemApprovals"  
                sheet="FoodItemApprovals"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/approvals/FoodItems-approvals"
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
                                            <th scop="col">SL.NO</th>
                                            <th scop="col">Item Name</th>
                                            <th scop="col">  Item Description			</th>
                                            <th scop="col" >Commision (%)	 </th>
                                            <th scop="col">Original Price</th>
                                            <th scop="col"> Offer Price			</th>
                                            <th>Comment</th>
                                            <th>Save</th>
                                            <th scop="col"> Commision Amount		 </th>
                                            <th scop="col">Gst</th>
                                            <th scop="col">Settlement Value	</th>
                                            <th scop="col">Image</th>
                                            <th scop="col">Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(orders =>
                                            orders.Name.includes(searchTerm)).map((item,id)=>{
                                                // for (var i=0;i<driverNumber.length;i++){
                                                    var bprice=+item.Price;
                                                    var total=+bprice;
                                                    var rcommision=chefCommision[statecid.indexOf(search)];
                                                    var rcommisionrate=(rcommision*total)/100;
                                                    var gst=(rcommisionrate*0.18);
                                                    var ftotal=((+total - +rcommisionrate - +gst)*100)/100;
                                                             return(
                                                            <tr key={id}>
                                                                <td>{id+1}</td>
                                                           <td className=""><input type="text" id={item.PushId} onChange={onChangeNameHandler} className="name" value={item.Name} /></td>
                                                           <td className=""><input type="text" id={item.PushId} onChange={onChangeDetailsHandler}className="details" value={item.Details} /></td>
                                                           <td className="">{chefCommision[statecid.indexOf(search)]}</td>
                                                           <td className="">{item.Mrp}</td>
                                                           <td className="item_price">{item.Price}</td>
                                                           <td><textarea id={item.PushId} value={item.comment} onChange={textAreaChangeHandler}></textarea></td>
                                                           <td><Button type="submit" id={item.PushId+"-"+search} onClick={saveCommentHandler}>Save</Button></td>
                                                           <td className="item_price">{((chefCommision[statecid.indexOf(search)])*item.Price)/100}</td>
                                                           <td className="item_price">{parseFloat((((chefCommision[statecid.indexOf(search)])*item.Price)/100)*0.18).toFixed(2)}</td>
                                                           <td>{ftotal}</td>
                                                            {item.Image!==undefined?
                                                         <td className=""><a href={item.Image} target="_blank" rel="noopener noreferrer" >View</a></td>:
                                                         <td className="">{"None"}</td>
                                                         

                                                        }
                                                           <td className="actions" style={{textAlign:"center"}}><button type="button" className="btn btn-success btn-sm"><Check id={search+","+item.PushId+","+item.Name+","+item.Details+","+(ftotal)}  onClick={onUpdateHandler} size={15}/></button><button type="button" className="btn btn-danger btn-sm"><Trash id={search+","+item.PushId} onClick={onDeleteHandler} size={15}/></button></td>
                                             
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
        
export default FoodItemApprovals;