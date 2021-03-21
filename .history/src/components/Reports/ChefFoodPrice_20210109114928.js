import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home } from 'react-feather';
import { Container, Row, Col, Card, CardHeader, CardBody, Input, Button } from "reactstrap";
import { Table, TableBody, TableCell, TableRow, TableHead, makeStyles, TablePagination } from '@material-ui/core'

// import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useHistory } from 'react-router-dom'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore'
import axios from 'axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
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
const ChefFoodPrice = () => {

  const classes = useStyles()

  const pages = [10, 30, 100,200]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [filterfn, setFilterFn] = useState({ fn: items => { return items; } })

  
  useEffect(() => {
    try {
      window.addEventListener('message', handleMessage);

      var database = app.database();
      database.ref().child("CloudKitchen")
        .once('value', function (snapshot) {
          if (snapshot.exists()) {
            // $('#datatable').empty();
            var content = [];

            snapshot.forEach(snap => {
              if(snap.val().UserId!==undefined){
              var val = snap.val()
              let locker = {
                UserId: val.UserId,
                Name: val.Name,
                Gender: val.Gender,
                MobileNumber: val.MobileNumber,
                CityName: val.CityName,
                LocalityName: val.LocalityName,
                Commision: val.Commision,
                AStatus: val.AStatus,
                Passed: val.Passed,
                Catering: val.Catering,
                Membership: val.Membership,
                Coins: val.Coins,
                CoinsTransactions:val.CoinsTransactions
                            }
                          
              content.push(locker);
                          }
            });

            content.map(item => {
              if (item.Name === undefined) {
                item.Name = ""
              }
              if (item.UserId === undefined) {
                item.UserId = ""
              }
              if (item.MobileNumber === undefined) {
                item.MobileNumber = ""
              }

            })
            setUsers(content);
            setShow(false)

          } else {
            const timeout = setTimeout(() => {
              setShow(false)
            }, 3000);
            return () => { clearTimeout(timeout); }

          }

        })
      app.database().ref().child("Masters").child("City")
        .once('value').then(function (snapshot) {
          if (snapshot.exists()) {
            // $('#datatable').empty();
            var content = [];

            snapshot.forEach(snap => {
              content.push(snap.val());

            });

            content.map(item => {
              if (item.PushId === undefined) {
                item.PushId = ""
              }
            })

            setCity(content);
          }
        })
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    } catch (err) {
      console.log(err)
    }
  }, [])
  
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
        pdf.save("ChefReport.pdf");
      });
  }
  const printDocument1 = (event) => {
    const input = document.getElementById('datatable1');
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
        pdf.save("MF Cash Report(chef).pdf");
      });
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  let excludeSearch = ["Gender", "CityName", "LocalityName", "Commision", "AStatus", "Passed","Membership","Catering","Coins","CoinsTransactions"]

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
    const onClickMfCash=(event)=>{
      setShowMfCash(false)
      app.database().ref().child("CloudKitchen").child(event.target.id).child("CoinsTransactions")
      .once('value').then(function(snapshot){
        if(snapshot.exists()){
          const content=[]
          snapshot.forEach(snap=>{
            let val = snap.val()
            let locker={
              Amount: val.Amount,
              Date: val.Date,
              Generated: val.Generated,
              Status: val.Status,
              TransactionName:val.TransactionName,
              TransactionType:val.TransactionType,
              UserId: val.UserId
            }
            content.push(locker)
          })
          content.reverse()

          setMFCash(content)
        }
      })
    }
    const onClickMfCashBack =()=>{
      setShowMfCash(true)
    }
    return (
      <Fragment>
        <BreadCrumb parent={<Home />} subparent="Chef Partner" title="Chef List" />
        <Container fluid={true}>
         
        <div data-toolbar="#bootstrap-table-toolbar" className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
                      <Table id="datatable" className={classes.table} >
                        <TableHead>
                          <TableRow>
                            <TableCell scope="col">SL.NO</TableCell>
                            <TableCell scope="col"> MFID </TableCell>
                            <TableCell scope="col"> Name	</TableCell>
                            <TableCell scope="col"> Gender	</TableCell>
                            <TableCell scope="col">  Number</TableCell>
                            <TableCell scope="col"> City</TableCell>
                            <TableCell scope="col"> Zone	</TableCell>
                            <TableCell scope="col"> Package	</TableCell>
                            <TableCell scope="col"> Status	</TableCell>
                            <TableCell scope="col"> TA		</TableCell>
                            <TableCell scope="col"> CA		</TableCell>
                             <TableCell scope="col"> Coins	</TableCell>
                             <TableCell scope="col"> MF Cash History	</TableCell>
                            <TableCell scope="col"> View		</TableCell>
                            <TableCell scope="col"> Delete		</TableCell>


                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recordsAfterPagingAndSorting().map((item, id) => {
                            return (
                              <TableRow key={id}>
                                <TableCell>{id + 1}</TableCell>
                                <TableCell className="">{item.UserId}</TableCell>
                                <TableCell className="">{item.Name}</TableCell>
                                <TableCell className="">{item.Gender}</TableCell>
                                <TableCell className="">{item.MobileNumber}</TableCell>
                                <TableCell className="">{item.CityName}</TableCell>
                                <TableCell className="">{item.LocalityName}</TableCell>
                                <TableCell className="">{item.Commision}</TableCell>
                                {item.AStatus === "InActive" ?
                                  <TableCell className="text-primary" >{item.AStatus}</TableCell> :
                                  <TableCell className="text-success" >{item.AStatus}</TableCell>
                                }
                                {item.Passed !== "" && item.Passed !== null ?
                                  <TableCell className="text-primary"><b>{item.Passed}</b></TableCell> :
                                  <TableCell className="text-primary"><b>{""}</b></TableCell>
                                }
                                {item.Catering !== "" && item.Catering !== null ?
                                  <TableCell className="text-primary"><b>{item.Catering}</b></TableCell> :
                                  <TableCell className="text-primary"><b>{""}</b></TableCell>
                                }
                                {item.Coins!==undefined?
                                 <TableCell >{item.Coins}</TableCell>:
                                 <TableCell >0</TableCell>
                                }
                               
                                {item.CoinsTransactions!==undefined?
                                <TableCell className="" style={{ fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.UserId} onClick={onClickMfCash} className="btn btn-success btn-md">{"Show"}</button></TableCell>:
                                <TableCell className="" >{""}</TableCell>

                                }
                                <TableCell className="" style={{ fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.UserId} onClick={onClickSearchHandler} className="btn btn-success btn-md">{"View"}</button></TableCell>
                                <TableCell className="" style={{ fontSize: "25px", fontWeight: "bold" }}><button type="button" id={item.UserId} onClick={onClickDeleteHandler} className="btn btn-danger btn-md">{"Delete"}</button></TableCell>

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
                   
        </Container>
      </Fragment>
    );
  };

  export default ChefFoodPrice;