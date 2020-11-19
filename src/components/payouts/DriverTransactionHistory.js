import React, { Fragment } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
// import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup} from "reactstrap";


const DriverTransactionHistory = () => {
     
      return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Setting" title="Disabled Chef "/>
        </Fragment>
      )
      }
      export default DriverTransactionHistory;