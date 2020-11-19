import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,FormGroup,Button} from "reactstrap";
import { TablePagination} from '@material-ui/core'
// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
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
const DeliveryPartnerReport = () => {
  const pages = [5,10,25]
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(pages[page])
  const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
  
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
            database.ref().child("DeliveryPartner")
        .once('value', function(snapshot){
          setUsers([])
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
              if(snap.hasChild("UserId")){
                var val = snap.val()
                var locker = {
                UserId : val.UserId,                                                                                                       
                Name : val.Name,
                MobileNumber : val.MobileNumber,
                AlternateNumber : val.AlternateNumber,
                Status : val.Status,
                Age : val.Age,
                Amount : val.Amount,
                Maritial : val.Maritial,
                Type : val.Type,
                PaymentType : val.PaymentType,
                Working : val.Working,
                Created : val.Created,
                State : val.State,
                AccountName : val.AccountName,
                AccountNumber : val.AccountNumber,
            
                Locality : val.Locality,
                VNumber : val.VNumber,
                CityName : val.CityName,
                LocalityName : val.LocalityName,
                Address : val.Address,
                IFSC : val.IFSC,
                BranchName : val.BranchName,
                BranchAddress : val.BranchAddress,
                Zipcode : val.Zipcode,
            
                FName : val.FName,
            
                FCash : val.FCash,
                INumber : val.INumber,
                RCNumber : val.RCNumber,
                Updated : val.Updated,
                Remarks : val.Remarks,
                VName : val.VName,
                Doc1 : val.Doc1,
                Doc2 : val.Doc2,
                Doc3 : val.Doc3,
                Doc4 : val.Doc4,
                Doc5 : val.Doc5,
                Doc6 : val.Doc6,
                Doc7 : val.Doc7
                }
                content.push(locker);
                               }                  
              });
              content.map(item => {
                if(item.Name===undefined){
                    item.Name=""
                  }
                  if(item.UserId===undefined){
                    item.UserId=""
                  }
                  if(item.MobileNumber===undefined){
                    item.MobileNumber=""
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
database.ref().child("DeliveryPartner").orderByChild("Created").startAt(sdate).endAt(edate)
.once('value', function(snapshot){
  setUsers([])
if(snapshot.exists()){
// $('#datatable').empty();
var content = [];

snapshot.forEach(snap=>{
  if(snap.hasChild("UserId")){
    var val = snap.val()
    var locker = {
    UserId : val.UserId,                                                                                                       
    Name : val.Name,
    MobileNumber : val.MobileNumber,
    AlternateNumber : val.AlternateNumber,
    Status : val.Status,
    Age : val.Age,
    Amount : val.Amount,
    Maritial : val.Maritial,
    Type : val.Type,
    PaymentType : val.PaymentType,
    Working : val.Working,
    Created : val.Created,
    State : val.State,
    AccountName : val.AccountName,
    AccountNumber : val.AccountNumber,

    Locality : val.Locality,
    VNumber : val.VNumber,
    CityName : val.CityName,
    LocalityName : val.LocalityName,
    Address : val.Address,
    IFSC : val.IFSC,
    BranchName : val.BranchName,
    BranchAddress : val.BranchAddress,
    Zipcode : val.Zipcode,

    FName : val.FName,

    FCash : val.FCash,
    INumber : val.INumber,
    RCNumber : val.RCNumber,
    Updated : val.Updated,
    Remarks : val.Remarks,
    VName : val.VName,
    Doc1 : val.Doc1,
    Doc2 : val.Doc2,
    Doc3 : val.Doc3,
    Doc4 : val.Doc4,
    Doc5 : val.Doc5,
    Doc6 : val.Doc6,
    Doc7 : val.Doc7
    }
    content.push(locker);    
     }   
});
content.reverse()
content.map(item => {
  if(item.Name===undefined){
      item.Name=""
    }
    if(item.UserId===undefined){
      item.UserId=""
    }
    if(item.MobileNumber===undefined){
      item.MobileNumber=""
    }
    return item
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
 database = app.database();
database.ref().child("DeliveryPartner").orderByChild("Created").equalTo(sdate)
.once('value', function(snapshot){
  setUsers([])
if(snapshot.exists()){
// $('#datatable').empty();
var content = [];

snapshot.forEach(snap=>{
  if(snap.hasChild("UserId")){
    var val = snap.val()
    var locker = {
    UserId : val.UserId,                                                                                                       
    Name : val.Name,
    MobileNumber : val.MobileNumber,
    AlternateNumber : val.AlternateNumber,
    Status : val.Status,
    Age : val.Age,
    Amount : val.Amount,
    Maritial : val.Maritial,
    Type : val.Type,
    PaymentType : val.PaymentType,
    Working : val.Working,
    Created : val.Created,
    State : val.State,
    AccountName : val.AccountName,
    AccountNumber : val.AccountNumber,

    Locality : val.Locality,
    VNumber : val.VNumber,
    CityName : val.CityName,
    LocalityName : val.LocalityName,
    Address : val.Address,
    IFSC : val.IFSC,
    BranchName : val.BranchName,
    BranchAddress : val.BranchAddress,
    Zipcode : val.Zipcode,

    FName : val.FName,

    FCash : val.FCash,
    INumber : val.INumber,
    RCNumber : val.RCNumber,
    Updated : val.Updated,
    Remarks : val.Remarks,
    VName : val.VName,
    Doc1 : val.Doc1,
    Doc2 : val.Doc2,
    Doc3 : val.Doc3,
    Doc4 : val.Doc4,
    Doc5 : val.Doc5,
    Doc6 : val.Doc6,
    Doc7 : val.Doc7
    }
    content.push(locker);    
     }     
  });
  content.reverse()
  content.map(item => {
    if(item.Name===undefined){
        item.Name=""
      }
      if(item.UserId===undefined){
        item.UserId=""
      }
      if(item.MobileNumber===undefined){
        item.MobileNumber=""
      }
      return item
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
 database = app.database();
database.ref().child("DeliveryPartner").orderByChild("Created").equalTo(edate)
.once('value', function(snapshot){
  setUsers([])
if(snapshot.exists()){
// $('#datatable').empty();
var content = [];

snapshot.forEach(snap=>{
  
  if(snap.hasChild("UserId")){
    var val = snap.val()
    var locker = {
    UserId : val.UserId,                                                                                                       
    Name : val.Name,
    MobileNumber : val.MobileNumber,
    AlternateNumber : val.AlternateNumber,
    Status : val.Status,
    Age : val.Age,
    Amount : val.Amount,
    Maritial : val.Maritial,
    Type : val.Type,
    PaymentType : val.PaymentType,
    Working : val.Working,
    Created : val.Created,
    State : val.State,
    AccountName : val.AccountName,
    AccountNumber : val.AccountNumber,

    Locality : val.Locality,
    VNumber : val.VNumber,
    CityName : val.CityName,
    LocalityName : val.LocalityName,
    Address : val.Address,
    IFSC : val.IFSC,
    BranchName : val.BranchName,
    BranchAddress : val.BranchAddress,
    Zipcode : val.Zipcode,

    FName : val.FName,

    FCash : val.FCash,
    INumber : val.INumber,
    RCNumber : val.RCNumber,
    Updated : val.Updated,
    Remarks : val.Remarks,
    VName : val.VName,
    Doc1 : val.Doc1,
    Doc2 : val.Doc2,
    Doc3 : val.Doc3,
    Doc4 : val.Doc4,
    Doc5 : val.Doc5,
    Doc6 : val.Doc6,
    Doc7 : val.Doc7
    }
    content.push(locker);
       }      
  });
  content.reverse()
  content.map(item => {
    if(item.Name===undefined){
        item.Name=""
      }
      if(item.UserId===undefined){
        item.UserId=""
      }
      if(item.MobileNumber===undefined){
        item.MobileNumber=""
      }
      return item
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
        // var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        // var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 0;  
        // var heightLeft = imgHeight;  
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
        pdf.save("DeliveryPartnerReport.pdf");  
      });  
  }
  const handleChangePage = (event, newPage) =>{
    setPage(newPage)
}
const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
}
let excludeSearch = ["AlternateNumber", "Status", "Age","Amount","Maritial","Type","PaymentType","Working","Created","State","AccountName","AccountNumber","Locality","VNumber","CityName","LocalityName","Address","IFSC","BranchName","BranchAddress","Zipcode","FName","FCash","INumber","RCNumber","Updated","Remarks","VName","Doc1","Doc2","Doc3","Doc4","Doc5","Doc6","Doc7"]


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
            <BreadCrumb parent={<Home/>}  title="Delivery Partner Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6> Delivery Partner Data</h6>
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
                                       
                                            <input className="btn btn-primary mr-1" style={{marginTop: "30px", padding: "10px 15px;"}} type="button" name="filter" onClick={(event) => onSubmit(event)} value="Filter" id="filter"/>
                                   
                                    </div>
                                  
                                    </Row>
                    </CardBody>
                   
                      
                    <div className="col-md-5" style={{ margin: "1%" }}>
                                <div className="form-group col-md-10">
                                    <label className="form-label">Search </label>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        <div className="col-md-11 text-right" style={{marginTop: "-5%",marginBottom:"3%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="DeliveryPartnerReport"  
                sheet="DeliveryPartnerReport"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/delivery-partner-reports"
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
                                            <th scope="col"> Mobile Number		</th>
                                            <th scope="col"> Alternate Number	</th>
                                            <th scope="col"> Status 	</th>
                                            <th scope="col"> Age	</th>
                                            <th scope="col"> Amount	</th>
                                            <th scope="col"> Maritial	</th>
                                            <th scope="col"> Type	</th>
                                            <th scope="col"> Payment Type	</th>
                                            <th scope="col"> Working	</th>
                                            <th scope="col"> Created	</th>
                                            <th scope="col"> Address	</th>
                                            <th scope="col"> Locality	</th>
                                            <th scope="col"> Locality Name	</th>
                                            <th scope="col"> City Name	</th>
                                            <th scope="col"> State	</th>
                                            <th scope="col"> ZipCode	</th>
                                            <th scope="col"> Account Name		</th>
                                            <th scope="col"> Account Number		</th>
                                            <th scope="col"> IFSC	</th>
                                            <th scope="col"> Branch Name		</th>
                                            <th scope="col"> Branch Address		</th>
                                            <th scope="col"> FName		</th>
                                            <th scope="col"> FCash	</th>
                                            <th scope="col"> INumber	</th>
                                            <th scope="col"> RC Number		</th>
                                            <th scope="col"> Remarks	</th>
                                            <th scope="col"> Updated	</th>
                                            <th scope="col"> VName		</th>
                                            <th scope="col"> VNumber	</th>
                                            <th scope="col"> Doc 1		</th>
                                            <th scope="col"> Doc 2		</th>
                                            <th scope="col"> Doc 3		</th>
                                            <th scope="col"> Doc 4		</th>
                                            <th scope="col"> Doc 5		</th>
                                            <th scope="col"> Doc 6		</th>
                                            <th scope="col"> Doc 7	</th>



                                        </tr>
                                    </thead>
                                    <tbody>
                                    {recordsAfterPagingAndSorting().map((item,id)=>{
                                                console.log(item.Address)
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>    
                                                        <td className="">{item.UserId}</td>                                                                                                        
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.MobileNumber}</td>
                                                       <td className="">{item.AlternateNumber}</td>
                                                       <td className="">{item.Status}</td>
                                                       <td className="">{item.Age}</td>
                                                       <td className="">{item.Amount}</td>
                                                       <td className="">{item.Maritial}</td>
                                                       <td className="">{item.Type}</td>
                                                       <td className="">{item.PaymentType}</td>
                                                       <td className="">{item.Working}</td>
                                                       <td className="">{item.Created}</td>
                                                       <td className="">{item.Address}</td>
                                                       <td className="">{item.Locality}</td>
                                                       <td className="">{item.LocalityName}</td>
                                                       <td className="">{item.CityName}</td>
                                                       <td className="">{item.State}</td>
                                                       <td className="">{item.Zipcode}</td>
                                                       <td className="">{item.AccountName}</td>
                                                       <td className="">{item.AccountNumber}</td>
                                                       <td className="">{item.IFSC}</td>
                                                       <td className="">{item.BranchName}</td>
                                                       <td className="">{item.BranchAddress}</td>
                                                       <td className="">{item.FName}</td>
                                                       <td className="">{item.FCash}</td>
                                                       <td className="">{item.INumber}</td>
                                                       <td className="">{item.RCNumber}</td>
                                                       <td className="">{item.Remarks}</td>
                                                       <td className="">{item.Updated}</td>
                                                       <td className="">{item.VName}</td>
                                                       <td className="">{item.VNumber}</td>
                                                       <td className="">{item.Doc1}</td>
                                                       <td className="">{item.Doc2}</td>
                                                       <td className="">{item.Doc3}</td>
                                                       <td className="">{item.Doc4}</td>
                                                       <td className="">{item.Doc5}</td>
                                                       <td className="">{item.Doc6}</td>
                                                       <td className="">{item.Doc7}</td>

                                                     </tr> 
                                                    )
                                                
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
        
export default DeliveryPartnerReport;