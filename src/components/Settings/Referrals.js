import React, {Fragment } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table } from 'reactstrap'
const Referrals = () => {
   
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Create PromoCode"/> 
        <Container fluid={true}>
        <Row>
            <Col className="col-xl-12">
            <Card>
                <CardHeader>
                    <h6>Create PromoCode</h6>
                </CardHeader>
                <CardBody>
                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Title</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="name" placeholder="Full Name"/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row" >
                <label className="col-form-label col-sm-2 text-sm-right">Description</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="surname" placeholder="Full Name"/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Promocode</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="fname" placeholder="Full Name"/>
                <div className="clearfix"></div>
                </div>
                </Row>


                <Row className="form-group row">
                 <label className="col-form-label col-sm-2 text-sm-right">Discount Percentage</label>
                 <div className="col-sm-10">
                <input type="number" className="form-control" id="mobilenumber" placeholder="Mobile Number"/>
                 <div className="clearfix"></div>
                </div>
                </Row>
                

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Minimum Amount</label>
                <div className="col-sm-10">
                <input type="email" className="form-control" id="emailid" placeholder="Email Id"/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Maximum Amount</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="address" placeholder="Full Address"/>
                <div className="clearfix"></div>
                </div>
                </Row>


                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Status</label>
                <div className="col-sm-10">
                 <select id="gender" className="form-control">
                 <option value="Active">Active</option>
                 <option value="InActive">InActive</option>
                </select>
                <div className="clearfix"></div>
                </div>
                 </Row>

                <Row className="form-group row">
               <div className="col-sm-10 ml-sm-auto">
             <Button type="submit" id="submit" color="warning">Submit</Button>
            </div>
            </Row>
              </CardBody>
            </Card>
            </Col>
        </Row>
            <Row>
            <Col sm="12">
                        <Card>
                           <CardHeader>
                               <h6>Promocode Report</h6>
                           </CardHeader>
                           <CardBody>
                            <div className="table-responsive">
                                <Table className="datatables-demo table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">PromoCode	</th>
                                            <th scope="col">Discount Percentage	</th>
                                            <th scope="col">Minimum Amount	</th>
                                            <th scope="col">Maximum Amount	</th>
                                            <th scope="col">Status	</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                    </Table>
                                    </div>
                                    </CardBody>
                                    </Card>
                                    </Col>

            </Row>
        </Container>
        </Fragment>
    )}
    export default Referrals