import React, { Fragment } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,CardBody} from "reactstrap";

const BankChangeRequest = () => {
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Approvals" title="Subscriptions Approvals"/>
            <Container fluid={true}>
                 {/* <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h6> Subscriptions Approvals</h6>
                           {/* <span> Use a class <code> table </code> to any table.</span> */}
                            {/* </CardHeader>
                    </Col>
                    <CardBody>
                    <div class="form-group row">
                     <label className="col-form-label col-sm-2 text-sm-right">Enter Home Chef Id</label>
                    <div className="col-sm-8">
                    <div className="row">
                     <div className="col-lg-6 col-md-5 col-sm-5">
                    <input type="text" id="city" className="form-control"/>
                    </div>
                    <div className="col-sm-1 col-md-2">
                    <span id="search"><img src="https://img.icons8.com/ios-filled/24/000000/search.png"/></span>
                    </div>
                    </div>
                     <div className="clearfix"></div>
                    </div>
                    </div>
                    <Row>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-8">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text" id="myInput"  className="form-control" placeholder="Search for Item Name" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <a className="btn btn-danger "  id="pdf" href="#"><span style={{color:"white"}}>PDF</span></a>
                <a className="btn btn-danger " id="excel"  href="#"><span style={{color:"white"}}>Excel</span></a>
                <a className="btn btn-danger "  id="print"  href="#"><span style={{color:"white"}}>Print</span></a>
                </div>
                </div>
                </Row>
                </CardBody>
                    <Col sm="12">
                        <Card>
                            <div className="table-responsive" style={{ overflowX:"scroll"}}   >
                                
                                <Table id="data-table"  data-toolbar="#bootstrap-table-toolbar" className="datatables-demo table table-striped table-bordered" style={{tablelayout: "auto;"}}>
                                    <thead >
                                        <tr>
                                            <th scop="col">SL.NO</th>
                                            <th scop="col">Item Name</th>
                                            <th scop="col">  Item Description			</th>
                                            <th scop="col" >Commision (%)	 </th>
                                            <th scop="col">Original Price</th>
                                            <th scop="col"> Offer Price			</th>
                                            <th scop="col"> Commision Amount		 </th>
                                            <th scop="col">Gst</th>
                                            <th scop="col">Settlement Value	</th>
                                            <th scop="col">Image</th>
                                            <th scop="col">Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>  */}
                                        {/* <tr>
                                            <th scope="row">1</th>
                                            <td>Alexander</td>
                                            <td>Orton</td>
                                            <td>@mdorton</td>
                                            <td>Admin</td>
                                            <td>USA</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>John Deo</td>
                                            <td>Deo</td>
                                            <td>@johndeo</td>
                                            <td>User</td>
                                            <td>USA</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Randy Orton</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td>admin</td>
                                            <td>UK</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Randy Mark</td>
                                            <td>Ottandy</td>
                                            <td>@mdothe</td>
                                            <td>user</td>
                                            <td>AUS</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Ram Jacob</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>admin</td>
                                            <td>IND</td>
                                        </tr> */}
                                    {/* </tbody>
                                </Table>
                                
                            </div>
                        </Card>
                    </Col> */}
                    {/* <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Inverse Table</h5>
                                <span> Use a class <code> table-inverse </code> inside table element.</span>
                            </CardHeader>
                            <div className="table-responsive">
                                <Table className="table-inverse">
                                    <thead>
                                        <tr>
                                            <th >#</th>
                                            <th >First Name</th>
                                            <th >Last Name</th>
                                            <th >Username</th>
                                            <th >Role</th>
                                            <th >Country</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Alexander</td>
                                            <td>Orton</td>
                                            <td>@mdorton</td>
                                            <td>Admin</td>
                                            <td>USA</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>John Deo</td>
                                            <td>Deo</td>
                                            <td>@johndeo</td>
                                            <td>User</td>
                                            <td>USA</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Randy Orton</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td>admin</td>
                                            <td>UK</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Randy Mark</td>
                                            <td>Ottandy</td>
                                            <td>@mdothe</td>
                                            <td>user</td>
                                            <td>AUS</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Ram Jacob</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>admin</td>
                                            <td>IND</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    </Col>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Inverse Table with Primary background</h5>
                                <span> Use a class <code> .bg-info, .bg-success, .bg-warning and .bg-danger classes. </code> with light text on dark backgrounds inside table element. <span className="d-block"> To set the light background color use .bg-[color] class where [color] is the value of your selected color from stack color palette. So for teal color background class will be .bg-teal </span></span>
                            </CardHeader>
                                <div className="table-responsive">
                                    <Table striped className="bg-primary">
                                        <thead className="tbl-strip-thad-bdr">
                                            <tr>
                                                <th >#</th>
                                                <th >First Name</th>
                                                <th >Last Name</th>
                                                <th >Username</th>
                                                <th >Role</th>
                                                <th >Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Alexander</td>
                                                <td>Orton</td>
                                                <td>@mdorton</td>
                                                <td>Admin</td>
                                                <td>USA</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>John Deo</td>
                                                <td>Deo</td>
                                                <td>@johndeo</td>
                                                <td>User</td>
                                                <td>USA</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Randy Orton</td>
                                                <td>the Bird</td>
                                                <td>@twitter</td>
                                                <td>admin</td>
                                                <td>UK</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td>Randy Mark</td>
                                                <td>Ottandy</td>
                                                <td>@mdothe</td>
                                                <td>user</td>
                                                <td>AUS</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">5</th>
                                                <td>Ram Jacob</td>
                                                <td>Thornton</td>
                                                <td>@twitter</td>
                                                <td>admin</td>
                                                <td>IND</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Hoverable rows</h5>
                                    <span>Use a class <code> table-hover </code> to enable a hover state on table rows within a <code>tbody</code>.</span>
                                </CardHeader>
                                <div className="table-responsive">
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th >#</th>
                                                <th >First Name</th>
                                                <th >Last Name</th>
                                                <th >Username</th>
                                                <th >Role</th>
                                                <th >Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Alexander</td>
                                                <td>Orton</td>
                                                <td>@mdorton</td>
                                                <td>Admin</td>
                                                <td>USA</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>John Deo</td>
                                                <td>Deo</td>
                                                <td>@johndeo</td>
                                                <td>User</td>
                                                <td>USA</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Randy Orton</td>
                                                <td>the Bird</td>
                                                <td>@twitter</td>
                                                <td>admin</td>
                                                <td>UK</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td>Randy Mark</td>
                                                <td>Ottandy</td>
                                                <td>@mdothe</td>
                                                <td>user</td>
                                                <td>AUS</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">5</th>
                                                <td>Ram Jacob</td>
                                                <td>Thornton</td>
                                                <td>@twitter</td>
                                                <td>admin</td>
                                                <td>IND</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Contextual classes</h5>
                                    <span>Use contextual classes to color table rows or individual cells. you may use Classes <code>table-primary</code>,<code>table-secondary</code>,<code>table-success</code>,<code>table-info</code>,<code>table-warning</code>,<code>table-danger</code>,<code>table-light</code>,<code>table-active</code> in<code>tr</code></span>
                                </CardHeader>
                                <div className="table-responsive">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th >Class</th>
                                                <th >Heading</th>
                                                <th >Heading</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-primary">
                                                <th scope="row">Primary</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <th scope="row">Secondary</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-success">
                                                <th scope="row">Success</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-info">
                                                <th scope="row">Info</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-warning">
                                                <th scope="row">Warning</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-danger">
                                                <th scope="row">Danger</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-light">
                                                <th scope="row">Light</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                            <tr className="table-active">
                                                <th scope="row">Active</th>
                                                <td>Cell</td>
                                                <td>Cell</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Text or background utilities</h5>
                                    <span>Regular table background variants are not available with the inverse table, however, you may use Classes <code>bg-dark</code>,<code>bg-warning</code>,<code>bg-success</code>,<code>bg-info</code>,<code>bg-danger</code>,<code>bg-primary</code>,<code>bg-secondary</code>,<code>bg-light</code> in<code>td</code></span>
                                </CardHeader>
                                <div className="table-responsive">
                                    <Table className="table-borderedfor">
                                        <thead>
                                            <tr>
                                                <th >#</th>
                                                <th >Heading</th>
                                                <th >Heading</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-active">
                                                <td className="bg-primary">1</td>
                                                <td className="bg-primary">primary</td>
                                                <td className="bg-primary">primary</td>
                                            </tr>
                                            <tr className="table-active">
                                                <td className="bg-secondary">2</td>
                                                <td className="bg-secondary">secondary</td>
                                                <td className="bg-secondary">secondary</td>
                                            </tr>
                                            <tr>
                                                <td className="bg-success">3</td>
                                                <td className="bg-success">success</td>
                                                <td className="bg-success">success</td>
                                            </tr>
                                            <tr>
                                                <td className="bg-info">4</td>
                                                <td className="bg-info">info</td>
                                                <td className="bg-info">info</td>
                                            </tr>
                                            <tr>
                                                <td className="bg-warning">5</td>
                                                <td className="bg-warning">warning</td>
                                                <td className="bg-warning">warning</td>
                                            </tr>
                                            <tr>
                                                <td className="bg-danger">6</td>
                                                <td className="bg-danger">danger</td>
                                                <td className="bg-danger">danger</td>
                                            </tr>
                                            <tr className="table-active">
                                                <td className="bg-light">7</td>
                                                <td className="bg-light">light</td>
                                                <td className="bg-light">light</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Table head options</h5>
                                    <span>Similar to tables and dark tables, use the modifier classes <code>.thead-dark</code>  to make <code>thead</code> appear light or dark gray.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table>
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th >#</th>
                                                        <th >First Name</th>
                                                        <th >Last Name</th>
                                                        <th >Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Table head options</h5>
                                    <span>Similar to tables and dark tables, use the modifier classes <code>.bg-*</code>and  <code>.thead-light</code> to make <code>thead</code> appear light or dark gray.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th >#</th>
                                                        <th >First Name</th>
                                                        <th >Last Name</th>
                                                        <th >Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Striped Row </h5>
                                    <span>Use <code>.table-striped</code> to add zebra-striping to any table row within the <code></code>. This styling doesn't work in IE8 and below as :nth-child CSS selector isn't supported.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table striped>
                                                <thead>
                                                    <tr>
                                                        <th >#</th>
                                                        <th >First Name</th>
                                                        <th >Last Name</th>
                                                        <th >Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Striped Row with Inverse Table</h5>
                                    <span>Use <code>.table-striped</code> to add zebra-striping to any table row within the <code></code>. This styling doesn't work in IE8 and below as :nth-child CSS selector isn't supported.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table className="table-inverse" striped>
                                                <thead>
                                                    <tr>
                                                        <th >#</th>
                                                        <th >First Name</th>
                                                        <th >Last Name</th>
                                                        <th >Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Caption</h5>
                                    <span>A <code>&lt;caption&gt;</code> functions like a heading for a table. It helps users with screen readers to find a table and understand what it’s about and decide if they want to read it.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table>
                                                <caption>List of users</caption>
                                                <thead>
                                                    <tr>
                                                        <th >#</th>
                                                        <th >First Name</th>
                                                        <th >Last Name</th>
                                                        <th >Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Responsive Tables</h5>
                                    <span>A <code>&lt;caption&gt;</code> functions like a heading for a table. It helps users with screen readers to find a table and understand what it’s about and decide if they want to read it.</span>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th >#</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Breckpoint Specific</h5>
                                </CardHeader>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <Table className="table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th >#</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </div>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <table className="table table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th >#</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </div>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <table className="table table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th >#</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </div>
                                <div className="card-block row">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <table className="table table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th >#</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                        <th >Table heading</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                        <td>Table cell</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </div>
                            </Card>
                        </Col>*/}
                    {/* </Row>*/} 
                </Container>  
        </Fragment>
            );
        };
        
export default BankChangeRequest;