import React, { Fragment } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
// import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup} from "reactstrap";
// import DatePicker from "react-datepicker";


const AgencyPayouts = () => {
   

    
      return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title=" Approvals  "/>
        </Fragment>
      )
      }
      export default AgencyPayouts;