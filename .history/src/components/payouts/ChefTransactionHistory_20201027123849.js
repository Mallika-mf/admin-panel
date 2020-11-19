import React, { Fragment } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
// import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup} from "reactstrap";


const ChefTransactionHistory = () => {
    
      return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Payouts" title="Chef Payouts"/>
        </Fragment>
      )
      }
      export default ChefTransactionHistory;