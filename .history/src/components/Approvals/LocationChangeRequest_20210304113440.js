import React, { Fragment,useState,useEffect} from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import app from '../../data/base'
import {Container,Row,Col,Card,CardHeader,Table,Button,FormGroup} from "reactstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const LocationChangeApprovals = () => {
    const [show,setShow]=useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [users,setUsers] = useState([])
    const [search,setSearch] = useState("")
    const [localFood,setLocalFood] = useState("")
    const [cityId,setCityId] = useState("")
    const [latlng,setLatLng] = useState('')
    const [chefId,setChefId] = useState('')
    const [cID, setCid] = useState([])

    var cid = [];
    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
            var database = app.database();
            database.ref().child("Requests")
            .orderByChild("RequestType").equalTo("Locality")
            .on('value', function(snapshot){
                setUsers([])
                if(snapshot.exists()){
                    var content = [];
                  
                    snapshot.forEach(function(snap){
                        var val = snap.val(); 
                        var data = snap.key 
                        if (val.UserId !== "" && val.UserId !== null) {
                        var locker = {
                            UserId : val.UserId,
                            Name : val.Name,
                            Number : val.Number,
                            Address : val.Address,
                            Coord : val.Coord,
                            data : data
                        }
                        cid.push(val.UserId);

                        content.push(locker)
                    }
                    })
                    setUsers(content)
                    setShow(false)
                    setCid(cid)

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
    const SearchHandler = (event)=>{
        setSearch(event.target.value)
    }
    const onSaveHandler=(event)=>{
        var arrData=event.target.id.split("+")
        let userid = arrData[0]
        let pushid = arrData[1]
        let location = arrData[2]
        console.log(userid)
        console.log(pushid)
        console.log(location)
        // var firebaseref=app.database().ref().child("Requests").child(pushid);
        var database = app.database();
        database.ref().child("CloudKitchen").child(userid)
        .on('value', function(snapshot){
            if(snapshot.exists()){
                setLocalFood(snapshot.val().Local)
                setCityId(snapshot.val().City)
                if(snapshot.val().Local!==undefined&& snapshot.val().Local==="Yes"){
                    app.database().ref().child("LocalFood").child(snapshot.val().City).child(userid).child("Location").set(location);
                 }else{
                    app.database().ref().child(snapshot.val().City).child(userid).child("Location").set(location);
        
                 }
            }
        })
        
        app.database().ref().child("CloudKitchen").child(userid).child("Location").set(location);

        app.database().ref().child("Requests").child(pushid).remove();
       
        
          Swal.fire( {
              title:"Approved!",
            icon: "success",
          }); 
    }

    const onDeleteHandler=(event)=>{
        var pushid = event.target.id
        Swal.fire({
            title: "Are you sure?",
            text: "Once Deleted, Cannot be changed!",
            icon: "warning",
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor:'gray'
          })
          .then((willDelete) => {
            if (willDelete.value) {
                app.database().ref().child("Requests").child(pushid).remove();      
              Swal.fire( {
                icon: "success",
                title:"Deleted!",
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
            pdf.save("FoodItemApprovals.pdf");  
          });
        }
        const onChangeChefId = (event) =>{
            setChefId(event.target.value)
        }
        const onChangeLatLng = (event) =>{
            setLatLng(event.target.value.trim())
        }
        const onSubmitLocationCoordinates = (event) =>{
            for (var i = 0; i < cID.length; i++) {
                if (cID[i] === chefId) {
            app.database().ref().child('CloudKitchen').child(chefId).child('Location').set(latlng)
            app.database().ref().child('CloudKitchen').child(chefId).once('value',function(snapshot){
                let val = snapshot.val()
                if(val.Local==="Yes"){
                    app.database().ref().child('LocalFood').child(val.City).child(chefId).child('Location').set(latlng)

                }else{
                    app.database().ref().child(val.City).child(chefId).child('Location').set(latlng)

                }
            })
        }else{
            alert('Enter Valid Chef Id');
            return;
        }
    }
        }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title=" Approvals"/>
            <Container fluid={true}>
            <Row>
            <FormGroup className="col-md-6">
                        <label className="form-label">ChefId <span style={{ color: "red" }}>*</span></label>
                        <div className="input-group">
                          <input type="text" id="chefid" className="form-control" value={chefId} onChange={onChangeChefId} />
                        </div>
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <label className="form-label">Location Coordinates <span style={{ color: "red" }}>*</span></label>
                        <div className="input-group">
                          <input type="text" id="location" className="form-control" value={latlng} onChange={onChangeLatLng} />
                        </div>
                      </FormGroup>
           


                      <div className="col-md-4">

                        <input className="btn btn-primary mr-1" style={{ marginTop: "30px", padding: "10px 15px" }} type="button" name="Save" value="locationcord" onClick={(event) => onSubmitLocationCoordinates(event)} id="locationcord" />

                      </div>

                    </Row>
                <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h6> Location Change Request</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
             
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-8">
                         <label className="form-label">Search </label>
                             <input type="text" id="myInput"  className="form-control" value={search} onChange={SearchHandler} placeholder="Search for ChefId" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="LocationChangeRequest"  
                sheet="LocationChangeRequest"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/approvals/LocalityChange-Requests"
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
                                
                                <Table id="datatable"  data-toolbar="#bootstrap-table-toolbar" className="datatables-demo table table-striped table-bordered" style={{tablelayout: "auto"}}>
                                    <thead >
                                        <tr>
                                        <th>SL.No</th>
                                        <th>ChefId</th>
                                        <th>Name</th>
                                        <th>Number</th>
                                        <th>Address</th>
                                        <th>Location Coordinates</th>
                                        <th>Save</th>
                                        <th>Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                       {users.filter(orders=>orders.UserId.includes(search)).map((item,id)=>{
                                           return(
                                               <tr key={id}>
                                                   <td>{id+1}</td>
                                                   <td>{item.UserId}</td>
                                                   <td>{item.Name}</td>
                                                   <td>{item.Number}</td>
                                                   <td>{item.Address}</td>
                                                   <td>{item.Coord}</td>
                                                   <td style={{fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.UserId+"+"+item.data+"+"+item.Coord} onClick={onSaveHandler} className="btn btn-primary btn-md">Save</button></td>
                                                   <td style={{fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.data} onClick={onDeleteHandler} className="btn btn-primary btn-md">Delete</button></td>
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
        
export default LocationChangeApprovals;