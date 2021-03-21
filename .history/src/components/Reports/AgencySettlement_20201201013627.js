import React, { Fragment,useState ,useEffect} from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup,Input,Button} from "reactstrap";
import DatePicker from "react-datepicker";
import app from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'
import { TablePagination} from '@material-ui/core'

import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const AgencySettlement = () => {
  const pages = [10, 30, 100,200]
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(pages[page])
  const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
  
    const [isLoading, setIsLoading] = useState(true);
    const [users,setUsers] = useState([])
    const [sdate,setSdate]=useState("")
    const [edate,setEdate]=useState("")
    const [search,setSearch]=useState("") 
    const [show,setShow] = useState(true)

    useEffect(()=>{
        try{
            window.addEventListener('message', handleMessage);
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            var database = app.database();
            database.ref().child("Users").orderByChild("JoiningDate").equalTo(today)
        .once('value', function(snapshot){
          setUsers([])
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
              if(snap.hasChild("UserName")){
                let val = snap.val()
                let locker = {
                  Name : val.Name,
                  UserName : val.UserName,
                  Email : val.Email,
                  Number : val.Number,
                  JoiningDate : val.JoiningDate,
                  Role : val.Role,
                  Status : val.Status,
                  Wallet : val.Wallet
                }
              content.push(locker);              }                 
              });
              content.reverse()
              content.map(item=>{
                if(item.Name===undefined){
                  item.Name=""
                }
                if(item.UserName===undefined){
                  item.UserName=""
                }
                if(item.Number===undefined){
                  item.Number=""
                }
                if(item.Email===undefined){
                  item.Email=""
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
database.ref().child("Users").orderByChild("JoiningDate").startAt(sdate).endAt(edate)
.once('value', function(snapshot){
  setUsers([])

if(snapshot.exists()){
// $('#datatable').empty();
var content = [];

snapshot.forEach(snap=>{
  if(snap.hasChild("UserName")){
    let val = snap.val()
    let locker = {
      Name : val.Name,
      UserName : val.UserName,
      Email : val.Email,
      Number : val.Number,
      JoiningDate : val.JoiningDate,
      Role : val.Role,
      Status : val.Status,
      Wallet : val.Wallet
    }
  content.push(locker);  }   
});
content.reverse()
content.map(item=>{
  if(item.Name===undefined){
    item.Name=""
  }
  if(item.UserName===undefined){
    item.UserName=""
  }
  if(item.Number===undefined){
    item.Number=""
  }
  if(item.Email===undefined){
    item.Email=""
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
var database = app.database();
database.ref().child("Users").orderByChild("JoiningDate").equalTo(sdate)
.once('value', function(snapshot){
  setUsers([])

if(snapshot.exists()){
// $('#datatable').empty();
var content = [];

snapshot.forEach(snap=>{
  if(snap.hasChild("UserName")){
    let val = snap.val()
    let locker = {
      Name : val.Name,
      UserName : val.UserName,
      Email : val.Email,
      Number : val.Number,
      JoiningDate : val.JoiningDate,
      Role : val.Role,
      Status : val.Status,
      Wallet : val.Wallet
    }
  content.push(locker);  }     
  });
  content.reverse()
  content.map(item=>{
    if(item.Name===undefined){
      item.Name=""
    }
    if(item.UserName===undefined){
      item.UserName=""
    }
    if(item.Number===undefined){
      item.Number=""
    }
    if(item.Email===undefined){
      item.Email=""
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
var database = app.database();
database.ref().child("Users").orderByChild("JoiningDate").equalTo(edate)
.once('value', function(snapshot){
  setUsers([])

if(snapshot.exists()){
// $('#datatable').empty();
var content = [];

snapshot.forEach(snap=>{
  if(snap.hasChild("UserName")){
    let val = snap.val()
    let locker = {
      Name : val.Name,
      UserName : val.UserName,
      Email : val.Email,
      Number : val.Number,
      JoiningDate : val.JoiningDate,
      Role : val.Role,
      Status : val.Status,
      Wallet : val.Wallet
    }
  content.push(locker);  }     
  });
  content.reverse()
  content.map(item=>{
    if(item.Name===undefined){
      item.Name=""
    }
    if(item.UserName===undefined){
      item.UserName=""
    }
    if(item.Number===undefined){
      item.Number=""
    }
    if(item.Email===undefined){
      item.Email=""
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
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 0;  
        var heightLeft = imgHeight;  
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
        pdf.save("AgencySettelment.pdf");  
      });  
  }
  const handleChangePage = (event, newPage) =>{
    setPage(newPage)
}
const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
}
let excludeSearch = ["JoiningDate", "Role", "Status", "Wallet"]

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
            <BreadCrumb parent={<Home/>}  title="User Report"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                        <h6> Agency Settlement Data</h6>
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
                filename="AgencySettelment"  
                sheet="AgencySettelment"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/reports/agency-settlement"
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
                                            <th scope="col"> Name	</th>
                                            <th scope="col"> User Name </th>
                                            <th scope="col"> Email		</th>
                                            <th scope="col">  Number	</th>
                                            <th scope="col"> Joining Date	 	</th>
                                            <th scope="col"> Role	</th>
                                            <th scope="col"> Reason	</th>
                                            <th scope="col"> Status	</th>
                                            <th scope="col"> Wallet	</th>
                                                                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {recordsAfterPagingAndSorting().filter(orders =>
                                            orders.Number.includes(search)).map((item,id)=>{
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                                                                                                            
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.UserName}</td>
                                                       <td className="">{item.Email}</td>
                                                       <td className="">{item.Number}</td>
                                                       <td className="">{item.JoiningDate}</td>
                                                       <td className="">{item.Role}</td>
                                                       <td className="">{item.Reason}</td>

                                                       <td className="">{item.Status}</td>
                                                       <td className="">{item.Wallet}</td>

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
        
export default AgencySettlement;