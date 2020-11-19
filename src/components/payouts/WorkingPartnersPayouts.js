import React, { Fragment } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
// import {Container,Row,Col,Card,CardHeader,CardBody,Table,Form,FormGroup} from "reactstrap";


const WorkingPartnerPayouts = () => {
  ;    
      return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Payouts" title="DeliveryPartner Payouts "/>
        </Fragment>
      )
      }
      export default WorkingPartnerPayouts;