import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Input,Button} from "reactstrap";
import { TablePagination} from '@material-ui/core'
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const Payment = (props) => {
  const pages = [5,10,25]
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(pages[page])
  const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
  
    const [users,setUsers] = useState([])
    const[chefId,setChefId] = useState([])
    const[zone,setZone] = useState([])
    const[city,setCity] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [show,setShow] = useState(true)

    const [search,setSearch] = useState("")
    const [sdate,setSdate] = useState("")
    const [edate,setEdate] = useState("")   
     useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);

            var today = String(new Date());
            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            // var yyyy = today.getFullYear();
            var chefid=[]
            var city=[]
            var zone=[]

            var database = app.database();
            database.ref().child("CloudKitchen")
            .orderByChild("Paid").equalTo("Yes")
            .once('value').then(function(snapshot) {
                snapshot.forEach(function(data){
                    var val = data.val(); 
                    if(val.UserId!=""&&val.UserId!=null){
                        chefid.push(val.UserId);
                        city.push(val.CityName);
                        zone.push(val.LocalityName);
                    }
              });
              setChefId(chefid)
                setCity(city)
                setZone(zone)

                var database = app.database();
                database.ref().child("MembershipPayment")
                .orderByChild("Date")
                .on('value', function(snapshot){
                    if(snapshot.exists()){
                        var content = [];
            
                        snapshot.forEach(snap=>{
                            content.push(snap.val());
                             
                          });
                          content.reverse()
              content.map(item=>{
                if(item.ChefId===undefined){
                  item.ChefId="undefined"
                }
                if(item.Date===undefined){
                  item.Date="undefined"
                }
                if(item.Name===undefined){
                  item.Name="undefined"
                }
                if(item.Number===undefined){
                  item.Number="undefined"
                }
                if(item.Membership===undefined){
                  item.Membership="undefined"
                }
                if(item.Amount===undefined){
                  item.Amount="undefined"
                }
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
        })
        return () => {
            window.removeEventListener('message', handleMessage);
          };
  
 }catch(err){
     console.log(err)
 }
},[])
    
const onSdateChangeHandler=(event)=>{
  setSdate(event.target.value)
}
const onEdateChangeHandler=(event)=>{
  setEdate(event.target.value)
}
// setSearchTerm(event.target.value)

  
  const onChangeStateSearch=(event)=>{
    setSearch(event.target.value)
    
  }
  const onSubmit =  (event) => {
    event.preventDefault();
// state.sdate=""
// state.edate=""
if(sdate==""&&edate=="")
{
    alert("Select Start Date");
    // state.sdate.focus();
    return;
}

if(sdate.length!=0&&edate.length!=0){
  var database = app.database();

      database.ref().child("SlotsReport")
      .orderByChild("Date").startAt(sdate).endAt(edate)
      .once('value', function(snapshot){
          if(snapshot.exists()){
                // $('#datatable').empty();
                var content = [];
                
                snapshot.forEach(snap=>{
                    content.push(snap.val());
                     
                  });
                  setUsers(content);
                }
            
        })
      }else if(sdate.length!==0&&edate.length===0){
        var database = app.database();

        database.ref().child("SlotsReport")
        .orderByChild("Date").equalTo(sdate)
        .once('value', function(snapshot){
            if(snapshot.exists()){
                  // $('#datatable').empty();
                  var content = [];
                  
                  snapshot.forEach(snap=>{
                      content.push(snap.val());
                       
                    });
                    setUsers(content);
                  }
              
          })
        } else{
          var database = app.database();

          database.ref().child("SlotsReport")
          .orderByChild("Date").equalTo(edate)
          .once('value', function(snapshot){
              if(snapshot.exists()){
                    // $('#datatable').empty();
                    var content = [];
                    
                    snapshot.forEach(snap=>{
                        content.push(snap.val());
                         
                      });
                      content.reverse()
                    
                      setUsers(content);
                    }
                
            })
          }
    
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
        pdf.save("PaymentReport.pdf");  
      });  
  }
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>}  title="Payments Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6> Payments Report</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                       
                       <CardBody>
                       <Row>
                       <FormGroup className="col-md-3">
                                        <label className="form-label">From Date <span style={{color: "red"}}>*</span></label>
                                        <div className="input-group">
                                        <input type="date" id="sdate" className="form-control"value={sdate} onChange={onSdateChangeHandler} />
                          </div>
                                        </FormGroup>
                      <FormGroup className="col-md-3">
                      
                        <label className="form-label">To Date <span style={{color: "red"}}>*</span></label>
                          <div className="input-group">
                          <input type="date" id="edate" className="form-control"value={edate} onChange={onEdateChangeHandler} />
                          </div>
                      </FormGroup>
                     
                      
                                    <div className="col-md-4">
                                       
                                            <input className="btn btn-primary mr-1" style={{marginTop: "30px", padding: "10px 15px;"}} type="button" name="filter" value="Filter" onClick={(event) => onSubmit(event)} id="filter"/>
                                   
                                    </div>
                                  
                                    </Row>
                    </CardBody>
                   
                      
                    <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label" htmlFor="searchNumber">Search </label>
                             <input type="number"  defaultValue={search} id="searchNumber" onChange={onChangeStateSearch}  required="" className="form-control" placeholder="Search for Number" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="PaymentReport"  
                sheet="PaymentReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/payment"
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
                                            <th scope="col"> Date </th>
                                            <th scope="col"> Chef Id </th>
                                            <th scope="col"> City&Zone </th>
                                            <th scope="col"> Name	</th>
                                            <th scope="col">  Number		</th>
                                            <th scope="col"> Membership</th>
                                            <th scope="col"> Amount	</th>
                                            <th scope="col"> Payment Id 	</th>
                                                                                
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users
                                    .filter(orders =>orders.Date.includes(search))
                                    .filter(orders =>orders.ChefId.includes(search))
                                    .filter(orders =>orders.Name.includes(search))
                                    .filter(orders =>orders.Number.includes(search))
                                    .filter(orders =>orders.Membership.includes(search))
                                    .filter(orders =>orders.Amount.includes(search))

                                    .map((item,id)=>{
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>         
                                                        <td className="">{item.Date}</td>                                                                                                   
                                                       <td className="">{item.ChefId}</td>
                                                    <td className="">{city[chefId.indexOf(item.ChefId)]}{<br/>}{zone[chefId.indexOf(item.ChefId)]}</td>
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.Number}</td>
                                                       <td className="">{item.Membership}</td>
                                                       <td className="">{item.Amount}</td>

                                                       <td className="">{item.PaymentId}</td>
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
        
export default Payment;