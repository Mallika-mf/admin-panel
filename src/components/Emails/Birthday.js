import React, {Fragment } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container} from 'reactstrap'
const Birthday = () => {
   
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Master Creation" title="Birthday Reminders"/> 
        <Container fluid={true}>
       </Container>
       </Fragment>
    )}
    export default Birthday
               