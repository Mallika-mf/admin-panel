import React, {useState,Fragment } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, CardFooter } from 'reactstrap'
const NewsLetter = () => {
   
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Master Creation" title="News Letter"/> 
        <Container fluid={true}>
       </Container>
       </Fragment>
    )}
    export default NewsLetter
               