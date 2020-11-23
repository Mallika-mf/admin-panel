import React, {Fragment } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {NavLink} from 'react-router-dom'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import {
    Archive,
    Activity,
    PieChart,
    Paperclip,
    Briefcase,
    DollarSign,
    UserPlus,
    Truck,

    FolderPlus,
    File,
   Image, UserCheck, Layers, HelpCircle, Database, Headphones,  User} from 'react-feather';
    // import {useHistory} from 'react-router-dom'

const Reports = (props) => {

    // // eslint-disable-next-line
    // const [doctorListState, setDoctorList] = useState(doctorList);
    // // eslint-disable-next-line
    // const [bookedAppoinmentState, setbookedAppoinment] = useState(bookedAppoinment);
    // // eslint-disable-next-line
    // const [admitPatientState, setadmitPatientState] = useState(patients);
    // const history = useHistory();
  
 
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Reports"/> 
        <Container fluid={true}>
        <Row>
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">Mothers Food Users</h5>
                </Col>
             </Row>
            <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-3">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/user-reports`)} style={{color:"black"}}>
                  <CardBody >
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><User/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600"> User Reports</h6>
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
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-3">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/chef-reports`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><UserPlus/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Chef Reports</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/working-partner-report`)} style={{color:"black"}}>
                  <CardBody >
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><DollarSign/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600"> Working Partner Reports</h6>
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
                  <NavLink to={(`${process.env.PUBLIC_URL}/reports/delivery-partner-reports`)} style={{color:"black"}}>
                  <CardBody  >
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Truck/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Delivery Partner Reports</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/agency-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><    Briefcase/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Agency Reports</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/admin-user-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Activity/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Admin User Reports</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/chef-download-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Activity/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Chef Report Download</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/chef-profiles-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Activity/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Chef Profiles</h6>
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
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/chef-inactive-report`)} style={{color:"black"}}>
                  <CardBody >
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><DollarSign/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600"> InActive Chef Report</h6>
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
              </Row>
              <Row>
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">Payment Reports</h5>
                </Col>
             </Row>
             <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/susbcription-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><FolderPlus/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Subscription Reports</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/paymentReport`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><DollarSign/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Payment Reports</h6>
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
              </Row><Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/settlement-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><File/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Settlement Reports</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/working-partner-settlement`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><UserCheck/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Working Partner Settlement</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/agency-settlement`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><Archive/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Agency Settlement</h6>
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
              </Row>
              <Row>
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">Pending Reports & Requests</h5>
                </Col>
             </Row>
              <Row>
              {/* <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/PendingChef`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><Image/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          {/* <h6 className="m-t-5 mb-0 f-w-600">Pending Chef's</h6> */}
                        {/* </div>
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
              </Col> */} 
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/request-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Paperclip/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Requests Reports</h6>
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
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">Order Reports</h5>
                </Col>
             </Row>
              <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/order-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><Headphones/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Order Reports</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/cancelled-order-status`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Database/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Cancelled Order Reports</h6>
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
              {/* <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/corporate-order-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><Layers/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          {/* <h6 className="m-t-5 mb-0 f-w-600">Corporate Order Reports</h6>
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
              </Row>  */}
              <Row>
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">Partner Reports</h5>
                </Col>
             </Row>
              <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/partner-with-us-chef`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><HelpCircle/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Partner With Us <br/>(chef's)</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/partner-with-us-deliver`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Truck/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Partner With Us <br/>(Delivery)</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/career-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><PieChart/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Career Reports</h6>
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
            </Row>
            {/* <Row>
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">Visit Slots</h5>
                </Col>
             </Row>
            <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/add-slots`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><Plus/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          {/* <h6 className="m-t-5 mb-0 f-w-600">Add Slots</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/partner-slots-booking-reports`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><BookOpen/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          {/* <h6 className="m-t-5 mb-0 f-w-600">Partner Slot Booking Report</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/booked-slots-status`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><Smile/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          {/* <h6 className="m-t-5 mb-0 f-w-600">Booked Slot Status</h6>
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
              </Row> */}
              <Row>
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">Membership Payments</h5>
                </Col>
             </Row>
              <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/payment`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><DollarSign/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Payments</h6>
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
              </Row> 
              <Row>
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">MF Cash</h5>
                </Col>
             </Row>
              <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/topup-mf-cash`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><DollarSign/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Topup MF cash</h6>
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
              </Row>
              <Row>
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">Chef Description</h5>
                </Col>
             </Row>
            <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-3">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/chef-description-report`)} style={{color:"black"}}>
                  <CardBody >
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><User/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Chef Description</h6>
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
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-3">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/chef-requests-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><UserPlus/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Chef Requests</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/chef-videos-report`)} style={{color:"black"}}>
                  <CardBody >
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><DollarSign/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600"> Chef Video</h6>
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
                  <NavLink to={(`${process.env.PUBLIC_URL}/reports/bulk-orders-report`)} style={{color:"black"}}>
                  <CardBody  >
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Truck/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Bulk Orders</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/inactive-chef-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger">< Briefcase/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">InActive Chef</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/active-chef`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Activity/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Active Chef</h6>
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
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/approval-change-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger">< Briefcase/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Chef Approval Changes</h6>
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
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/chef-reject-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Activity/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Order Rejected</h6>
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
              <Col className="col-sm-6" style={{marginTop:"-2%",marginBottom:"2%"}}>
                    <h5 className="m-t-5 mb-0 f-w-600">User Cart Report</h5>
                </Col>
             </Row>
              <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                <NavLink to={(`${process.env.PUBLIC_URL}/reports/user-cart-report`)} style={{color:"black"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><DollarSign/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           {/* <h3 className="d-inline-block f-w-600">0</h3><span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">User Cart Report</h6>
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
              </Row>

              </Container>
              </Fragment>
              )
              }
              export default Reports
