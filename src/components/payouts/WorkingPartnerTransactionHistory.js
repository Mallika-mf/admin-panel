import React, { Fragment,useState } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup} from "reactstrap";
import DatePicker from "react-datepicker";


const WorkingPartnerTransactionHistory = () => {
    const [startDate,setstartDate] = useState(new Date())
    const [endDate,setendDate] = useState(new Date())

    const handleChange = date => {
        setstartDate(date);
      };

    const addDays = date => {
        setstartDate(date,4);
      };
    
    // eslint-disable-next-line
    const setEndDate = date => {
       setendDate(date);
      };    
      return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Payouts" title="Disable Chefs  "/>
        </Fragment>
      )
      }
      export default WorkingPartnerTransactionHistory;