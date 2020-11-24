import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Input,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import { Database, ShoppingBag, User, Truck,Headphones,Phone} from 'react-feather';
import app from '../../data/base'
import {useHistory,Redirect} from 'react-router-dom'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import { TablePagination} from '@material-ui/core'
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const ChefProfile = () => {
    const pages = [10, 30, 100,200]
    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(pages[page])
    const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
    
  const history = useHistory()
    const [show,setShow] = useState(true)
    const [foodItems, setFoodItems] = useState([]);
 

useEffect(()=>{
    var database = app.database();
    database.ref().child("CloudKitchen")
    .on('value', function(snapshot){
        setFoodItems([])
        if(snapshot.exists()){
            var content = [];
            var sn;
            sn=0;
            snapshot.forEach(function(data){
                if(data.hasChild("UserId")){
                    let val = data.val()
                    let locker = {
                      UserId : val.UserId,
                      Name : val.Name,
                      MobileNumber : val.MobileNumber,
                      CityName : val.CityName
                    }
                  content.push(locker);              
                  }
            })
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
            setFoodItems(content)
            setShow(false)

        }else{
            const timeout = setTimeout(() => {
                setShow(false)
              }, 3000);
              return ()=>{clearTimeout(timeout);}

        }
    })
},[])
 
   const downloadHandler=(event)=>{
      let sname =event.target.id;
      var colorCodes = { userId: ''}
    window.colorCodes = {userId: sname}

    sessionStorage.setItem("ID", sname);  
    window.open(`${process.env.PUBLIC_URL}/reports/page-invoice`, "_blank");
    // return(<Redirect  to={`${process.env.PUBLIC_URL}/reports/page-invoice`}  />)

}
  
const handleChangePage = (event, newPage) =>{
    setPage(newPage)
}
const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
}
let excludeSearch = ["CityName"]

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
    return filterfn.fn(foodItems).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
}

    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Report" title="Chef Profile Report"/>
            <Container fluid={true}>
                
                <div className="row" id="chefapprovals">
                            <div className="col-md-12">
                        
                                <div className="card mb-4">
                                        <h6 className="card-header">Chef List</h6>
                                    
                                                <div className="card-body">
                                                    <div className="card-body">
                                                    <div className="col-md-5" style={{ margin: "1%" }}>
                                <div className="form-group col-md-10">
                                    <label className="form-label">Search </label>
                                    <input type="text" placeholder="Search..." onChange={handleSearch} required="" className="form-control" />
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                                               <div id="tablepdf">
                                                <div className="table-responsive">
                                                    <table className="datatables-demo table table-striped table-bordered" id="data-table">
                                                        
                                                        <thead>
                                                            <tr>
                                                                <th>SL.No</th>
                                                                <th>Chef ID</th>
                                                                <th>Full Name</th>
                                                                <th>Mobile Number</th>
                                                                <th>City</th>
                                                                <th>Download</th>
                                                               
                                                            </tr>
                                                        </thead>
                                                        <tbody id="datatable">
                                                            {recordsAfterPagingAndSorting().map((item,id)=>{
                                                                return(
                                                                    <tr key={id}>
                                                                        <td> {id+1} </td>
                                                                        <td> {item.UserId} </td>
                                                                        <td> {item.Name} </td>
                                                                        <td> {item.MobileNumber} </td>
                                                                        <td> {item.CityName} </td>
                                                                        <td> <button className="btn btn-primary" id={item.UserId} onClick={downloadHandler}>Download</button> </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                    </div>
                                                    <TablePagination
                    // className={classes.pageContent}
                    component="div"
                    page={page}
                    rowsPerPageOptions={pages}
                    rowsPerPage={rowsPerPage}
                    count={foodItems.length}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                                                    </div>

                                        

                                    </div>

                                

                                          </div>

                                 </div>
                                 </div>
                    </div>
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
            );
        };
        
export default ChefProfile;