import React, {Fragment } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'

import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { User, Truck} from 'react-feather';
import {NavLink} from 'react-router-dom'

const PromoCodes = () => {

    // // eslint-disable-next-line
    // const [doctorListState, setDoctorList] = useState(doctorList);
    // // eslint-disable-next-line
    // const [bookedAppoinmentState, setbookedAppoinment] = useState(bookedAppoinment);
    // // eslint-disable-next-line
    // const [admitPatientState, setadmitPatientState] = useState(patients);
   
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Create PromoCode"/> 
        <Container fluid={true}>
            <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/promo-code/userpromo-code`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><User/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600"> User PromoCode</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1"></div>
                          <div className="flower2"></div>
                          <div className="flower3"></div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  </NavLink>
                </Card>
                <Row>
              <Col className="col-sm-3" style={{marginTop:"-2%",marginBottom:"2%"}}>                   
                 <h3>Reports</h3>                       
                 </Col>               
                </Row>
              </Col>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/promo-code/partner-registration`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Truck/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Partner Resigtration</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1 flower-primary"></div>
                          <div className="flower2 flower-primary"></div>
                          <div className="flower3 flower-primary"></div>
                        </div>
                      </div>
                    </div>
                </CardBody>
                </NavLink>
              </Card>
              </Col>
              </Row>
              <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/promo-code/userpromo-code-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><User/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600"> User PromoCode</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1"></div>
                          <div className="flower2"></div>
                          <div className="flower3"></div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  </NavLink>
                </Card>
              </Col>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/promo-code/partner-registration-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Truck/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Partner Resigtration</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1 flower-primary"></div>
                          <div className="flower2 flower-primary"></div>
                          <div className="flower3 flower-primary"></div>
                        </div>
                      </div>
                    </div>
                </CardBody>
                </NavLink>
              </Card>
              </Col>
              </Row>
           
              </Container>
              </Fragment>
              )
              }
              export default PromoCodes
