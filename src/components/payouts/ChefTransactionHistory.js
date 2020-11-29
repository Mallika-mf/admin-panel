import React, { Fragment, useState } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import { Container, Row, Col, Card, CardHeader, Button, Input } from "reactstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import app from '../../data/base'
import { Table, TableBody, TableCell, TableRow, TableHead, makeStyles, TablePagination } from '@material-ui/core'

import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.black,
      backgroundColor: theme.palette.primary.gray
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}))
const ChefTransactionHistory = () => {
  const [name, setName] = useState('')
  const [show, setShow] = useState(false)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles()

  const pages = [10, 30, 100,200]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [filterfn, setFilterFn] = useState({ fn: items => { return items; } })
  const [searchBox, setSearchBox] = useState("")


  const onChangeSearchBox = (event) => {
    setSearchBox(event.target.value)
  }
  const onClickSearchBox = (event) => {
    setShow(true)
    window.addEventListener('message', handleMessage);
    app.database().ref().child("CloudKitchen").orderByChild("UserId").equalTo(searchBox)
      .on('value', function (snapshot) {
        if (snapshot.exists()) {
          // document.getElementById('#datatable').empty();
          var content = [];
          let transactionData, userData;

          snapshot.forEach(snap => {
            userData = snap.val()
            // let TransactionName = ""
            snap.child('Transactions').forEach(function (data1) {
              transactionData = data1.val()
              content.push(transactionData);
            })
            
          });
          setName(userData.Name)
          content.map(item => {
            if (item.TransactionName === undefined) {
              item.TransactionName = ""
            }
            if (item.Date === undefined) {
              item.Date = ""
            }
            if (item.TransactionType === undefined) {
              item.TransactionType = ""
            }
            if (item.Date === undefined) {
              item.Date = ""
            }

            return item
          })
          setUsers(content)
          setShow(false)
        } else {
          setShow(false)
        }
      })

    return () => {
      window.removeEventListener('message', handleMessage);
    };
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
  const printDocument = (event) => {
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
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
              users.includes(key) ? false : x[key].toString().toLowerCase().includes(target)
            )
          })

        }
      }


    })
  }
  const recordsAfterPagingAndSorting = () => {
    return filterfn.fn(users).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  const myFunction = () => {
    var input, filter, table, tr, td1,td2,td3,td4,td5,td6,td7;
    var i,txtValue1,txtValue2,txtValue3,txtValue4,txtValue5,txtValue6,txtValue7;
    input = document.getElementById("search1");
    filter = input.value.toUpperCase();
    table = document.getElementById("data-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
    td1 = tr[i].getElementsByTagName("td")[1];
    td2 = tr[i].getElementsByTagName("td")[2];
    td3 = tr[i].getElementsByTagName("td")[3];
    td4 = tr[i].getElementsByTagName("td")[4];
    td5 = tr[i].getElementsByTagName("td")[5];
    td6 = tr[i].getElementsByTagName("td")[6];
    td7 = tr[i].getElementsByTagName("td")[7];
    // td8 = tr[i].getElementsByTagName("td")[8];
    if (td1) {
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      txtValue3 = td3.textContent || td3.innerText;
      txtValue4 = td4.textContent || td4.innerText;
      txtValue5 = td5.textContent || td5.innerText;
      txtValue6 = td6.textContent || td6.innerText;
      txtValue7 = td7.textContent || td7.innerText;
      // txtValue8 = td8.textContent || td8.innerText;
    
     var main = txtValue1+ txtValue2+txtValue3+txtValue4+txtValue5+txtValue6+txtValue7;
       if (main.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
  } 
  return (
    <Fragment>
      <BreadCrumb parent={<Home />} subparent="Payouts" title="Chef Transaction History" />
      <Container fluid={true}>
        <Row className="form-row" style={{ marginTop: "3%" }}>
          <Col className="form-group col-md-6">
            <label className="form-label">Enter Home Chef registration Number</label>
            <Row>
              <Col className="col-lg-6 col-md-5 col-sm-5">
                <Input type="text" id="sname" value={searchBox} onChange={onChangeSearchBox} className="form-control" />
              </Col>
              <Col className="col-sm-1 col-md-2">
                <span id="search" onClick={onClickSearchBox}><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
              </Col>
            </Row>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <CardHeader>
              <h6> Vendor Transaction History</h6>
              {/* <span> Use a className <code> table </code> to any table.</span> */}
            </CardHeader>
          </Col>
        </Row>
        <div className="col-md-11 text-right" style={{ margin: "2%" }}>
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
          <div className="col-md-5" style={{ margin: "1%" }}>
            <div className="form-group col-md-9">
              <label className="form-label">Search </label>
              <input type="text" onKeyUp={myFunction}  required="" id = "search1" className="form-control" placeholder="Search..."/>
              <div className="clearfix"></div>
            </div>
          </div>
          <Card>
            <div data-toolbar="#bootstrap-table-toolbar" className="table-responsive text-nowrap datatables-demo table table-striped table-bordered" style={{ overflowX: "scroll" }}   >

              <Table id="data-table" className={classes.table}  >
                <TableHead >
                  <TableRow>
                    <TableCell scop="col">SL.NO</TableCell>
                    <TableCell scop="col">Vendor Id</TableCell>
                    <TableCell scop="col">Vendor Name</TableCell>
                    <TableCell scop="col">Txn Date</TableCell>
                    <TableCell scop="col">Amount</TableCell>
                    <TableCell scop="col"> Txn Status		</TableCell>
                    <TableCell scop="col" >Status </TableCell>
                    {/* <TableCell scop="col"> Transaction Type	</TableCell> */}
                    <TableCell scop="col"> Bank Transaction Id	</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody id="datatable">
                  {recordsAfterPagingAndSorting().map((item, id) => {
                    // for (var i=0;i<driverNumber.length;i++){
                    return (
                      <TableRow key={id}>
                        <TableCell>{id + 1}</TableCell>
                        <TableCell>{item.UserId}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{item.Date}</TableCell>
                        <TableCell>{item.Amount}</TableCell>
                        <TableCell>{item.TransactionName}</TableCell>
                        <TableCell>{item.Status}</TableCell>
                        {/* <TableCell>{item.TransactionType}</TableCell> */}
                        <TableCell>{item.Cms}</TableCell>


                      </TableRow>
                    )


                  })}

                </TableBody>
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

        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} className="sweet-loading">
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