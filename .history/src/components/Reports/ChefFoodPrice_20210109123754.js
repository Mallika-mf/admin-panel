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
  const [city, setCity] = useState([])
  const [users, setUsers] = useState([])
  const [foodPrice, setFoodPrice] = useState([])

  const [showFoodPrice, setShowFoodPrice] = useState(false)

  const [show, setShow] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  
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

  const onCickCity = (event) =>{
    setCity(event.target.value)
    app.database().ref().child('CloudKitchen').orderByChild('City').equalTo(event.target.value)
    .on('value',function(snapshot){
        const content= []
        snapshot.forEach(snap=>{
            let val = snap.val()
            let fooditems = {
                UserId: val.UserId,
                Name: val.Name,
                CityName:val.CityName
            }
            content.push(fooditems)
        })
        content.map(item=>{
            if(item.UserId===undefined){
                item.UserId = ""
            }
            if(item.Name===undefined){
                item.Name = ""
            }
            if(item.CityName===undefined){
                item.CityName = ""
            }
        })
        setUsers(content)
    })
  }
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
  let excludeSearch = ["Price"]

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
    const onClickFoodPrice=(event)=>{
        setShowFoodPrice(false)
        let userid = event.target.id
      app.database().ref().child("CloudKitchen").child(event.target.id).child("FoodItems")
      .once('value').then(function(snapshot){
        if(snapshot.exists()){
          const content=[]
          snapshot.forEach(snap=>{
            let val = snap.val()
            let locker={
              Name: val.Name,
              Price: val.Price
            }
            content.push(locker)
          })
          content.reverse()

          setFoodPrice(content)
        }
      })
    }
    const onClickFoodPriceBack =()=>{
      setShowFoodPrice(true)
    }
    return (
      <Fragment>
        <BreadCrumb parent={<Home />} subparent="Chef Partner" title="Chef List" />
        <Container fluid={true}>
         <select value = {citySelect} onChange={onCickCity}>
             {city.map((item,index)=>{
                 return(
                     <option key={index} value={item.PushId}>{item.Name}</option>
                 )
             })}
             </select> 
             {showFoodPrice===false?
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
                      
                       <TableCell className="">{item.CityName}</TableCell>
                       <TableCell className=""><button tye='submit' id={item.UserId} onClick={onClickFoodPrice}></button></TableCell>


                     </TableRow>
                   )

                 })}


               </TableBody>
             </Table>
           </div>:
           <>
           <div data-toolbar="#bootstrap-table-toolbar" className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
           <Table id="datatable" className={classes.table} >
             <TableHead>
               <TableRow>
                 <TableCell scope="col">SL.NO</TableCell>
                 <TableCell scope="col"> Food Name </TableCell>
                 


               </TableRow>
             </TableHead>
             <TableBody>
               {foodPrice.map((item, id) => {
                 return (
                   <TableRow key={id}>
                     <TableCell>{id + 1}</TableCell>
                     <TableCell className="">{item.Name}</TableCell>
                     <TableCell className="">{item.Price}</TableCell>
                     

                   </TableRow>
                 )

               })}


             </TableBody>
           </Table>
         </div>
         <button type="submit" onClick={onClickFoodPriceBack}>Back</button>
         </>
            }
        

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