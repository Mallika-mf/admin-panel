import React, { Fragment,useState,useEffect} from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Input,Button} from "reactstrap";
import DatePicker from "react-datepicker";
import {useHistory} from 'react-router-dom'
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
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
const WorkingPartnerReports = (props) => {
    const [users,setUsers] = useState([])
    const [sdate,setSdate]=useState("")
    const [edate,setEdate]=useState("")
    const [search,setSearch]=useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [show,setShow] = useState(true)

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);

            var database = app.database();
            database.ref().child("Franchise")
        .once('value', function(snapshot){
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
                content.push(snap.val());
                 
              });
              content.reverse()
              content.map(item=>{
                if(item.Number===undefined){
                  item.Number="undefined"
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
    return () => {
        window.removeEventListener('message', handleMessage);
      };
 }catch(err){
     console.log(err)
 }
},[])
    
const onChangeSdateHandler=(event)=>{
  setSdate(event.target.value)
}

const onChangeEdateHandler=(event)=>{
  setEdate(event.target.value)
}
const onChangeSearchHandler=(event)=>{
  setSearch(event.target.value)
}
  
  const onSubmit =  (event) => {
    event.preventDefault();
// state.sdate=""
// state.edate=""
if(sdate!==""&&edate!==""){

var database = app.database();
database.ref().child("Franchise").orderByChild("Created").startAt(sdate).endAt(edate)
.once('value', function(snapshot){
if(snapshot.exists()){
// $('#datatable').empty();
var content = [];

snapshot.forEach(snap=>{
    content.push(snap.val());
     
  });
  content.reverse()
  content.map(item=>{
    if(item.Number===undefined){
      item.Number="undefined"
    }
  })
  setUsers([])
  setUsers(content);
  setShow(false)

}else{
    const timeout = setTimeout(() => {
        setShow(false)
      }, 3000);
      return ()=>{clearTimeout(timeout);}

}

})
}else if(sdate!==""&&edate===""){
  var database = app.database();
  database.ref().child("Franchise").orderByChild("Created").equalTo(sdate)
.once('value', function(snapshot){
  if(snapshot.exists()){
  // $('#datatable').empty();
  var content = [];
  
  snapshot.forEach(snap=>{
      content.push(snap.val());
       
    });
    content.reverse()
    content.map(item=>{
      if(item.Number===undefined){
        item.Number="undefined"
      }
    })
    setUsers(content);
    setShow(false)

  }else{
    setUsers([])
      const timeout = setTimeout(() => {
          setShow(false)
        }, 3000);
        return ()=>{clearTimeout(timeout);}

  }

})
}else if(sdate===""&&edate!==""){
  var database = app.database();
  database.ref().child("Franchise").orderByChild("Created").equalTo(edate)
.once('value', function(snapshot){
  if(snapshot.exists()){
  // $('#datatable').empty();
  var content = [];
  
  snapshot.forEach(snap=>{
      content.push(snap.val());
       
    });
    content.reverse()
    content.map(item=>{
      if(item.Number===undefined){
        item.Number="undefined"
      }
    })
    setUsers(content);
    setShow(false)

  }else{
    setUsers([])
      const timeout = setTimeout(() => {
          setShow(false)
        }, 3000);
        return ()=>{clearTimeout(timeout);}

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
        pdf.save("PartnerPromoCodeReport.pdf");  
      });  
  }
 
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>}  title="Working Partner Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6> Working Partner Data</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                       
                       <CardBody>
                       <Row>
                                        <FormGroup className="col-md-3">
                                        <label className="form-label">From Date <span style={{color: "red"}}>*</span></label>
                                        <div className="input-group">
                                        <input type="date" id="sdate" className="form-control"value={sdate} onChange={onChangeSdateHandler} />
                          </div>
                                        </FormGroup>
                      <FormGroup className="col-md-3">
                      
                        <label className="form-label">To Date <span style={{color: "red"}}>*</span></label>
                          <div className="input-group">
                          <input type="date" id="edate" className="form-control"value={edate} onChange={onChangeEdateHandler} />
                          </div>
                      </FormGroup>
                    
                                    <div className="col-md-3">
                                       
                                            <input className="btn btn-primary mr-1" style={{marginTop: "22px", padding: "10px 15px;"}} type="button" name="filter" onClick={(event) => onSubmit(event)} value="Filter" id="filter"/>
                                   
                                    </div>
                                  
                                    </Row>
                    </CardBody>
                   
                      
                    <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-6">
                         <label className="form-label" for="search">Search <span style={{color: "red"}}>*</span></label>
                             <input type="number"  defaultValue={search} id="search" onChange={onChangeSearchHandler}  required="" className="form-control" placeholder="Search for Number" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="WorkingPartnerReport"  
                sheet="WorkingPartnerReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/working-partner-report"
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
                                            <th scope="col"> User Id </th>
                                            <th scope="col"> Name	</th>
                                            <th scope="col"> Email	</th>
                                            <th scope="col"> Mobile Number		</th>
                                            <th scope="col"> Alternate Number	</th>
                                            <th scope="col"> Created	</th>
                                            <th scope="col"> Status 	</th>
                                            <th scope="col"> Address	</th>
                                            <th scope="col"> City 	</th>
                                            <th scope="col"> State	</th>
                                            <th scope="col"> ZipCode	</th>
                                            <th scope="col"> Account Name		</th>
                                            <th scope="col"> Account Number		</th>
                                            <th scope="col"> Branch Name		</th>
                                            <th scope="col"> Branch Address		</th>
                                            <th scope="col"> IFSC	</th>
                                            <th scope="col"> Cash	</th>
                                            <th scope="col"> Commision	</th>
                                            <th scope="col"> Updated	</th>
                                            <th scope="col"> AStatus	</th>
                                            <th scope="col"> City 1		</th>
                                            <th scope="col"> Doc 1		</th>
                                            <th scope="col"> Doc 2		</th>
                                            <th scope="col"> Doc 3		</th>
                                            <th scope="col"> Doc 4		</th>                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((item,id)=>{
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                                                                                                            
                                                        <td className="">{item.UserId}</td>                                                                                                        
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.Email}</td>
                                                       <td className="">{item.MobileNumber}</td>
                                                       <td className="">{item.AlternateNumber}</td>
                                                       <td className="">{item.Created}</td>
                                                       <td className="">{item.Status}</td>
                                                       <td className="">{item.Address}</td>
                                                       <td className="">{item.City}</td>
                                                       <td className="">{item.State}</td>
                                                       <td className="">{item.Zipcode}</td>
                                                       <td className="">{item.AccountName}</td>
                                                       <td className="">{item.AccountNumber}</td>
                                                       <td className="">{item.BranchName}</td>
                                                       <td className="">{item.BranchAddress}</td>
                                                       <td className="">{item.IFSC}</td>
                                                       <td className="">{item.Cash}</td>
                                                       <td className="">{item.Commision}</td>
                                                       <td className="">{item.Updated}</td>
                                                       <td className="">{item.AStatus}</td>
                                                       <td className="">{item.City1}</td>
                                                       <td className="">{item.Doc1}</td>
                                                       <td className="">{item.Doc2}</td>
                                                       <td className="">{item.Doc3}</td>
                                                       <td className="">{item.Doc4}</td>

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
        
export default WorkingPartnerReports;