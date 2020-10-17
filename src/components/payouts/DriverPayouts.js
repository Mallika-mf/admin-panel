import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Button} from "reactstrap";
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'
import app from '../../data/base'
import { Database,Save, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const DriverPayouts = () => {
    const [searchTerm, setSearchTerm]=useState("")
    const [users,setUsers] = useState([])
    const [cName,setcName] = useState([])
    const [cPushid,setcPushid] = useState([])
    const [ agency,setAgency] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [show,setShow] = useState(true)

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
        var cid=[];
        var chefcommision=[];
        var rcityname=[];
        var cpushid=[];
        var cname=[];
        var database = app.database();
       
        app.database().ref()
    .child("Masters").child("City")
    .once('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            var sn;
            sn=0;
            snapshot.forEach(function(data){
                var val = data.val();      
                cpushid.push(val.PushId);   
                cname.push(val.Name);   
            });
            setcPushid(cpushid)
            setcName(cname)
        }
        var database = app.database();
        database.ref().child("DeliveryPartner")
        .orderByChild("Cash")
        .once('value', function(snapshot){
            if(snapshot.exists()){
                var content = [];
                snapshot.forEach(snap=>{
                    content.push(snap.val());
                });
                setUsers(content)
                setShow(false)

            }else{
                const timeout = setTimeout(() => {
                    setShow(false)
                  }, 3000);
                  return ()=>{clearTimeout(timeout);}

            }
        });
  
    database.ref().child("Agency")
    .orderByChild("Cash")
    .once('value', function(snapshot){
        if(snapshot.exists()){
            var content = [];
            var sn;
            sn=0;
            snapshot.forEach(snap=>{
                content.push(snap.val());
            });
            setAgency(content)
        }
    });

})
    

    return () => {
        window.removeEventListener('message', handleMessage);
      }
 }catch(err){
     console.log(err)
 }
    },[])
    const  onChangeHandler=(event)=>{
        setSearchTerm(event.target.value);
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
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("AgencyPayouts.pdf");  
          });  
      }
      const onUpdateDriverHandler=(event)=>{
          var arrData=event.target.id.split('-')
          var userid = arrData[0]
          var amount= arrData[1]
          var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;
    if(parseFloat(amount)<1){
        alert("Amount not sufficient for settlement");
        return;
    }
    var firebaseref1=app.database().ref().child("DeliveryPartner").child(userid).child("Cash");
             firebaseref1.transaction(function(currentstock) {
                return currentstock - parseFloat(amount);
                },
                function(error, committed, snapshot) {
                if (error) {
                console.log('Transaction failed abnormally!', error);
                } else if (committed) {
    
                    var number = parseInt(snapshot.val());
    
    
                    var username=window.localStorage.getItem('name');
                    if(username===null){                      
                        username=window.sessionStorage.getItem('name');
                    } 
    
                   var firebaseref=app.database().ref().child("DeliveryPartner").child(userid).child("Transactions").push();
                    firebaseref.child("Amount").set(amount);
                    firebaseref.child("Date").set(today);
                    firebaseref.child("Generated").set("Online");
                    firebaseref.child("PushId").set(firebaseref.getKey());
                    firebaseref.child("Status").set(String("Approved"));
                    firebaseref.child("TransactionId").set(username);
                    firebaseref.child("TransactionName").set("Settlement");
                    firebaseref.child("TransactionType").set("Dr");
                    firebaseref.child("UserBalance").set(""+number);
                    firebaseref.child("UserId").set(userid);


                    var database = app.database();
                    database.ref().child("DeliveryPartner")
                    .orderByChild("Cash")
                    .once('value', function(snapshot){
                        if(snapshot.exists()){
                            var content = [];
                            
                            snapshot.forEach(function(data){
                                var val = data.val();      
                                    content.push(val)
            
                            });
                            setUsers(content)
                        }
                    });

    
                }
            });
        
      }

      const onUpdateAgencyHandler=(event)=>{
          var arrData=event.target.id.split('-')
          var userid=arrData[0]
          var amount = arrData[1]
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          
          today = yyyy + '-' + mm + '-' + dd;
      
          if(parseFloat(amount)<1){
              alert("Amount not sufficient for settlement");
              return;
          }
      
          var firebaseref1=app.database().ref().child("Agency").child(userid).child("Cash");
                   firebaseref1.transaction(function(currentstock) {
                      return currentstock - parseFloat(amount);
                      },
                      function(error, committed, snapshot) {
                      if (error) {
                      console.log('Transaction failed abnormally!', error);
                      } else if (committed) {
          
                          var number = parseInt(snapshot.val());
          
          
                          var username=window.localStorage.getItem('name');
                          if(username===null){                      
                              username=window.sessionStorage.getItem('name');
                          } 
          
                         var firebaseref=app.database().ref().child("Agency").child(userid).child("Transactions").push();
                          firebaseref.child("Amount").set(amount);
                          firebaseref.child("Date").set(today);
                          firebaseref.child("Generated").set("Online");
                          firebaseref.child("PushId").set(firebaseref.getKey());
                          firebaseref.child("Status").set(String("Approved"));
                          firebaseref.child("TransactionId").set(username);
                          firebaseref.child("TransactionName").set("Settlement");
                          firebaseref.child("TransactionType").set("Dr");
                          firebaseref.child("UserBalance").set(""+number);
                          firebaseref.child("UserId").set(userid);
      
      
                          var database = app.database();
                          database.ref().child("Agency")
                          .orderByChild("Cash")
                          .once('value', function(snapshot){
                              if(snapshot.exists()){
                                  var content = [];
                                  snapshot.forEach(function(data){
                                      var val = data.val();      
                                        content.push(val)
                                  });
                                  setAgency(content)
                                }
                          });
      
          
                      }
                  });
      }
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Payouts" title="DeliveryPartner Payouts"/>
            <Container fluid={true}>
                <Row>
                  <Col>
                    <Card>
                        <CardHeader>
                            <h6>Delivery Partner Payouts</h6>
                        </CardHeader>
                        <div className="table-responsive">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col"> City </th>
                                            <th scope="col"> Delivery Partner ID		</th>
                                            <th scope="col">Partner Name</th>
                                            <th scope="col"> Partner Number			</th>
                                            <th scope="col"> Settlement Amount	</th>
                                            <th scope="col"> Actions	</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                          users.map((item,id)=>{
                                              return(
                                                  <tr key={id}>
                                                      <td>{id+1}</td>
                                                      <td>{cName[cPushid.indexOf(item.City)]}</td>  
                                                      <td>{item.UserId}</td>
                                                      <td>{item.Name}</td>
                                                      <td>{item.MobileNumber}</td>
                                                      <td>{item.Cash}</td>
                                                      <td style={{textAlign:"center"}}><Save id={item.UserId+"-"+item.Cash} onClick={onUpdateDriverHandler} size={15}/></td>
                                                  </tr>
                                              )
                                          })
                                      }
                                    </tbody>
                                </Table>
                            </div>
                    </Card>
                    </Col>
                    </Row>
                        <Row>
                       <Col>
                       <Card>
                        <CardHeader>
                            <h6>Agency Payouts</h6>
                        </CardHeader>
                        
                        
                        <div className="col-md-5" style={{margin: "0%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text" id="myInput" value={setSearchTerm} onChange={onChangeHandler}  className="form-control" placeholder="Search for Chef ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="AgencyPayouts"  
                sheet="AgencyPayouts"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/payouts/driver-payouts"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatable')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
                      </div>
                      </div>
                            <div className="table-responsive">
                                <Table id='datatable'>
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col"> City </th>
                                            <th scope="col"> Agency ID	</th>
                                            <th scope="col"> Agency Name	</th>
                                            <th scope="col"> Agency Number</th>
                                            <th scope="col"> Total Orders		</th>
                                            <th scope="col"> Actions	</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                          agency.map((item,id)=>{
                                              return(
                                                  <tr key={id}>
                                                      <td>{id+1}</td>
                                                      <td>{cName[cPushid.indexOf(item.City1)]}</td>  
                                                      <td>{item.UserId}</td>
                                                      <td>{item.Name}</td>
                                                      <td>{item.MobileNumber}</td>
                                                      <td>{item.Cash}</td>
                                                      <td style={{textAlign:"center"}}><Save id={item.UserId+"-"+item.Cash} onClick={onUpdateAgencyHandler} size={15}/></td>
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
            );
        };
        
export default DriverPayouts;