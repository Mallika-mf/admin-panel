 import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Button} from "reactstrap";
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'
// import {useHistory} from 'react-router-dom'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const PChefPayouts = () => {
    const [show,setShow] = useState(true)
    const [state, setState] = useState({sdate:new Date(),edate:new Date(),city:""});
    const [searchTerm, setSearchTerm]=useState("")
    // const [users,setUsers] = useState([])
    // const [cName,setcName] = useState([])
    // const [cPushId,setcPushid] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    // const [city,setCity] = useState([])
    // const history = useHistory()
          useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
            var cpushid=[];
            var cname=[];
            // var lname=[];
            // var lpushid=[];
            var content=[]
        app.database().ref().child("Masters").child("City")
        .once('value').then(function(snapshot) {
            if(snapshot.exists()){
        snapshot.forEach(function(data){
            var val = data.val(); 
                cpushid.push(val.PushId);
                cname.push(val.Name); 
                content.push(val)  
        });
        // setcPushid(cpushid)
        // setcName(cname)
        // setCity(content)
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
            pdf.save("ChefPayouts.pdf");  
          });  
      }
       const onChnage = (event) =>{
        const {id, value} = event.target
        setState(prevState =>({
          ...prevState,
          [id]: value
        }))
      }
       const onSubmit =  (event) => {
        event.preventDefault();
        if(state.city.options[state.city.selectedIndex].value==="Select")
    {
        alert("Select City");
    
        return;
    }

    if(state.sdate.value.length===0)
    {
        alert("Select Start Date");
        
        return;
    }

    if(state.edate.value.length===0)
    {
        alert("Select End Date");
        
        return;
    }
       }
 return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Payouts" title=" Chefs Payouts"/>
            <Container fluid={true}>
                <Row>
               <CardBody>
                                               <Row>
                                <Form className="theme-form">
                                        <FormGroup className="col-md-12">
                                        <label className="form-label">From Date <span style={{color: "red"}}>*</span></label>
                                        <div className="input-group">
                                        <input type="date" id="sdate" className="form-control"value={state.sdate} onChange={onChnage} />
                          </div>
                                        </FormGroup>
                                        </Form>
                      <FormGroup className="col-md-3">
                      
                        <label className="form-label">To Date <span style={{color: "red"}}>*</span></label>
                          <div className="input-group">
                          <input type="date" id="edate" className="form-control"value={state.edate} onChange={onChnage} />
                          </div>
                      </FormGroup>
                     
                      
                                    {/* <div className="col-md-3">
                                        <div className="form-group col-md-12">
                                            <label className="form-label">To Date <span style={{color: "red;"}}>*</span></label>
                                            <input type="date" id="edate" className="form-control"/>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div> */}
                                    <div className="col-md-3">
                                       
                                            <input className="btn btn-primary mr-1" style={{marginTop: "24px", padding: "10px 15px"}} type="button" name="filter" value="Filter"   onClick={(event) => onSubmit(event)} id="filter"/>
                                   
                                    </div>
                                  
                                </Row>
                    </CardBody>
                                        
               
                    <Col sm="12">
                        <Card>
                       <CardHeader>
                        <h6>Chef Payouts</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                        <div className="col-md-5" style={{margin: "0%"}}>
                    <div className="form-group col-md-9">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text" value={searchTerm} onChange={onChangeHandler}  required=""  className="form-control" placeholder="Search for Chef ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="ChefPayouts"  
                sheet="ChefPayouts"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/partner-pchef-transaction-history"
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
                                            <th scope="col">Chef ID</th>
                                            <th scope="col">Chef Name	</th>
                                            <th scope="col">Mobile Number</th>
                                            <th scope="col">Orders ID</th>
                                            <th scope="col">Settlement Amount</th>
                                            <th scope="col">Actions	</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                   
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
        
export default PChefPayouts;