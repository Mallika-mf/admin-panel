import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Button,Input} from "reactstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import app,{storage}from '../../data/base'
import {Table, TableBody, TableCell, TableRow, TableHead, makeStyles, TablePagination} from '@material-ui/core'

import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const useStyles = makeStyles(theme =>({
  table: {
      marginTop: theme.spacing(3),
      '& thead th': {
          fontWeight: '600',
          color : theme.palette.primary.black,
          backgroundColor: theme.palette.primary.gray 
      },
      '& tbody td':{
          fontWeight: '300',
  },
  '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
  },
},
}))
const ChefTransactionHistory = () => {
  const [show,setShow] = useState(true)
  const [users,setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles()

  const pages = [10,25,30]
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(pages[page])
  const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
  const [view,setView] = useState([])
  const [viewId,setViewId] = useState("")
  useEffect(()=>{
        var database = app.database();
        database.ref().child("CloudKitchen").orderByChild("Cash")
        .on('value', function(snapshot){
        if(snapshot.exists()){
        // document.getElementById('#datatable').empty();
        var content = [];
        
        snapshot.forEach(data=>{ 
          var val = data.val();      
                var set = 0
                var amount = 0
                    data.child('Transactions').forEach(function(data1){
                        var val1=data1.val();
                            if(val1.Status === "Pending") {
                                if(val1.Date >= state.sdate && val1.Date <= state.edate) {
                                    set+=1
                                    val.totalOrder=set
                                amount= amount + parseFloat(val1.Amount)
                                val.totalAmount=amount
                                val.date = val1.Date
                                
                            }
                        }
                });
                if(parseFloat(val.Cash)>0 && val.totalOrder > 0){
                    content.push(val)
                }
    })
    setUsers(content)
        }
      })
    
},[])
// useEffect(()=>{
//   window.addEventListener('message', handleMessage);
//   console.log(viewId)
//   app.database().ref().child("CloudKitchen").child(window.userid).child("Transactions")
//   .on('value', function(snapshot){
//     if(snapshot.exists()){
//     // document.getElementById('#datatable').empty();
//     var content = [];
    
//     snapshot.forEach(snap=>{         
//         content.push(snap.val().pushId);
  
//       });
    
//       setShow(false)
//     }else{
//           setShow(false)
//   }
// })

// return () => {
//   window.removeEventListener('message', handleMessage);
// };
// },[viewId])
  const handleMessage = (event) => {
    if (event.data.action ==='receipt-loaded') {
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
    const input = document.getElementById('data-table');  
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
        pdf.save("ChefTransectionHistory.pdf");  
      });  
  }
  const handleChangePage = (event, newPage) =>{
    setPage(newPage)
}
const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
}
  const handleSearch = (e)=>{
    let target = e.target
    setFilterFn({
        fn: items =>{
            if(target.value === ""){
            return items;
            }
            else{
            return items.filter(x =>x.UserId.includes(target.value))

            }
        }
       
    })
}
const recordsAfterPagingAndSorting = ()=>{
    return filterfn.fn(users).slice(page*rowsPerPage,(page+1)*rowsPerPage)
}
      return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Payouts" title="Chef Payout"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h6> Chef Transaction History</h6>
                                {/* <span> Use a className <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                    </Row>
            <div className="col-md-11 text-right" style={{margin: "2%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="data-table"  
                filename="ChefTransectionHistory"  
                sheet="ChefTransectionHistory"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/payouts/chef-transaction-history"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatable')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
                </div>
                </div>
                    <Col sm="12">
                    <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-9">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <Input type="text"   placeholder="Search..."
                             onChange={handleSearch}  required=""  className="form-control"  />
                             <div className="clearfix"></div>
                        </div>
                    </div>
                        <Card>
                            <div data-toolbar="#bootstrap-table-toolbar" className="table-responsive text-nowrap datatables-demo table table-striped table-bordered" style={{ overflowX:"scroll"}}   >
                                
                                <Table id="data-table" className={classes.table}  >
                                    <TableHead >
                                        <TableRow>
                                            <TableCell scop="col">SL.NO</TableCell>
                                            <TableCell scop="col">Transaction Date</TableCell>
                                            <TableCell scop="col">  Name		</TableCell>
                                            <TableCell scop="col" >Status </TableCell>
                                            <TableCell scop="col"> Transection Type	</TableCell>
                                          
                                        </TableRow>
                                    </TableHead>
                                    <TableBody id="datatable">
                                    {recordsAfterPagingAndSorting().map((item,id)=>{
                                                // for (var i=0;i<driverNumber.length;i++){
                                                    return(
                                                        <TableRow key={id}>
                                                            <TableCell>{id+1}</TableCell>
                                                            <TableCell>{item.Date}</TableCell>
                                                            <TableCell>{item.TransactionName}</TableCell>
                                                            <TableCell>{item.Status}</TableCell>
                                                           <TableCell>{item.TransactionType}</TableCell>


                                                     </TableRow> 
                                                    )
    
                                                
                                                     })}
                                       
                                    </TableBody>
                                </Table>
                                
                            </div>
                            <TablePagination
                                    // className={classes.pageContent}
                                    component = "div"
                                    page = {page}
                                    rowsPerPageOptions = {pages}
                                    rowsPerPage = {rowsPerPage}
                                    count = {users.length}
                                    onChangePage = {handleChangePage}
                                    onChangeRowsPerPage = {handleChangeRowsPerPage}
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
                </Container> 
        </Fragment>
      )
      }
      export default ChefTransactionHistory;