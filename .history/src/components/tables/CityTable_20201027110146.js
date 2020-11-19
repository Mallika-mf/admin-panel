import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button} from "reactstrap";
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const CityTable = () => {
    const [show,setShow] = useState(true)
   const [state,setState] = useState({city:[]})
   const [searchTerm, setSearchTerm]=useState("")
   const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);

        app.database().ref().child("Date").set("Time");

        // $('#datatable').empty();
        var database = app.database();
        database.ref().child("Masters").child("City")
        .once('value', function(snapshot){
            if(snapshot.exists()){
                var content = [];
               
                snapshot.forEach(snap=>{
                   
                    content.push(snap.val());
                     
                  });
                  setState({ city: content });      
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
            console.log(err.message)
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
            // var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            // var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            // var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("CityList.pdf");  
          });  
      } 
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Order Management" title="City List"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h5>Current City List</h5>
                                {/* <span> Use a className <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text" value={searchTerm} onChange={onChangeHandler}  required=""  className="form-control" placeholder="Search for City" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="CityList"  
                sheet="CityList"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/city-table"
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
                                
                                <Table id="datatable" className="table table-striped " >
                                    <thead >
                                        <tr >
                                            <th >SL.NO</th>
                                            <th >Cities</th>
                                            <th >Commision</th>
                                            <th >Radius( in KM's)</th>
                                            <th >Delivery (User)</th>
                                            <th >Packing(User)</th>
                                            <th >Del Base Price</th>
                                            <th >Del Base KM</th>
                                            <th  >Del Price Extra KM</th>
                                            <th >MFCash</th>
                                            <th >SC Min</th>
                                            <th >SC Max</th>
                                            <th >Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            state.city.filter(orders =>
                                                orders.Name.includes(searchTerm)).map((item,id)=>{
                                                if(item.Status==="InActive"){
                                                    return(
                                                        <tr key={id}>
                                                        <td> {id+1}</td>
                                                        <td> {item.Name}</td>   
                                                        <td> {item.Commision}</td>
                                                        <td> {item.Radius}</td>  
                                                        <td> {item.DeliveryCharges}</td>   
                                                        <td> {item.PackingCharges}</td>  
                                                        <td> {item.Price}</td> 
                                                        <td> {item.Base}</td> 
                                                        <td> {item.Price1}</td>  
                                                        <td> {item.MFCash}</td>
                                                        <td> {item.Min}</td>  
                                                        <td> {item.Max}</td> 
                                                        <td className="text-primary"><b>{item.Status}</b></td>
                                                        </tr> 
                                                    )
                                                }else{
                                                    return(
                                                        <tr key={id}>
                                                        <td> {id+1}</td>
                                                        <td> {item.Name}</td>   
                                                        <td> {item.Commision}</td>
                                                        <td> {item.Radius}</td>  
                                                        <td> {item.DeliveryCharges}</td>   
                                                        <td> {item.PackingCharges}</td>  
                                                        <td> {item.Price}</td> 
                                                        <td> {item.Base}</td> 
                                                        <td> {item.Price1}</td>  
                                                        <td> {item.MFCash}</td>
                                                        <td> {item.Min}</td>  
                                                        <td> {item.Max}</td> 
                                                        <td className="text-success"><b>{item.Status}</b></td>
                                                        </tr> 
                                                    )
                                                }
                                             
                                                
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
        
export default CityTable;