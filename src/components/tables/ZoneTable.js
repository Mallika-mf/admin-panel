import React, { Fragment, useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button} from "reactstrap";
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const ZoneTable = () => {
    const history = useHistory();
    const [show,setShow] = useState(false)
    const [searchTerm, setSearchTerm]=useState("")
    const [users,setUsers] = useState([])
    // const [pushId,setPushId] = useState([])
    const [name,setName] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    var pushid=[];
    // var cityname=[]
    useEffect((event)=>{
        try{
            async function fetchMyAPI() {

            window.addEventListener('message', handleMessage);
            await app.database().ref().child("Masters").child("City")
            .once('value').then(function(snapshot) {
                var content=[]
                snapshot.forEach(snap=>{
               
                content.push(snap.val())
            });
         
    
                  setName(content)
                  
            });
            return () => {
                window.removeEventListener('message', handleMessage);
              };
            }
            fetchMyAPI()

        }
        catch(ex){
            console.log(ex)
        }
        

    },[app])
    
    const  onChangeHandler=(event)=>{
        setShow(true)
        setSearchTerm(event.target.value);
        var database = app.database();
        database.ref().child("Masters").child("Localities")
        .orderByChild("City").equalTo(event.target.value)
          .on('value', function(snapshot){
            if(snapshot.exists()){
                // document.getElementById('#datatable').empty();
                var content = [];
               
                snapshot.forEach(snap=>{
                    content.push(snap.val());
                    pushid.push(snap.val())

                  });
                      
                    // setPushId(pushid)
                   setUsers(content);
                   setShow(false)
                }else{
                    const timeout = setTimeout(() => {
                        setShow(false)
                      }, 3000);
                      return ()=>{clearTimeout(timeout);}
    
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
            pdf.save("LocalityList.pdf");  
          });  
      } 

const onClickDeleteHandler=(event)=>{
    console.log(event.target.id)
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
                     app.database().ref().child("Masters").child("Localities").child(localityId).remove();
                    Swal.fire({
                    icon: "success",
                    text:"Deleted!"
                });
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
            <BreadCrumb parent={<Home/>} subparent="Order Management" title="Zone List"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h5>Zone List</h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                    <div className="col-md-5  text-left" style={{margin: "1%"}}>
                <div className="form-group row">
                 <label className="col-form-label col-sm-3 text-sm-right">Select City</label>
                 <div className="col-sm-8">
                 <select className="form-control" value={searchTerm} onChange={onChangeHandler} id="city">
                 <option  value="Select">Select</option>
                  {name.map((item,id)=>{ 
                     return  (<option key={id} value={item.PushId}>{item.Name}</option>)
                     })}
                 </select>
                <div className="clearfix"></div>
                 </div>
                </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                  
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="LocalityList"  
                sheet="LocalityList"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/zone-table"
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
                            <div className="table-responsive" style={{ overflowX:"scroll"}}   >
                                
                                <Table id="datatable">
                                    <thead >
                                        <tr>
                                            <th >SL.NO</th>
                                            <th >Zone</th>
                                            <th >Delete</th>
                                           

                                        </tr>
                                    </thead>
                                    <tbody id="database" >
                                    {users.map((item,id)=>{
                                                    return(
                                                        <tr key={id}>
                                                            <td>{id+1}</td>
                                                            <td className="item_cityname">{item.Name}</td>
                                                            <td className="" style={{textAlign:"center", fontSize: "25px", fontWeight: "bold"}}><button type="button" id={item.PushId} onClick={onClickDeleteHandler} className="btn btn-danger btn-sm">{"Delete"}</button></td>
                                                           {/* <td className="item_pushid" style={{display:"none"}}><textarea type="text" defaultValue="" className="crop" rows="1" cols="30">{item.PushId}</textarea></td> */}
                                                        </tr>
                                                    )
                                                }
                                                )}
                                       
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
        
export default ZoneTable;