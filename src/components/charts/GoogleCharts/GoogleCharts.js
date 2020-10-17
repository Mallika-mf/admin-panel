import React,{Fragment} from 'react';
import BreadCrumb from '../../../layout/Breadcrumb'
import {Container,Col,Row,Card,CardHeader,CardBody} from "reactstrap";
import {GooglePieChart1,
        GooglePieChart2,
        GoogleDonutChart,
        GoogleRotatingPieChart1,
        GoogleRotatingPieChart2,
        GoogleSliceCharts,
        GoogleAreaChart,
        GoogleStackingChart,
        GoogleGhantChart,
        GoogleBasicbarChart,
        GoogleMaterialDesignChart,
        GoogleLineChart,
        GoogleComboChart,
        GoogleBarChart2,
        GoogleTreeChart} from "./GooglechartData";
const GoogleCharts = (props) => {
    return (
        <Fragment>
        <BreadCrumb parent="Home" subparent="Charts" title="Google Chart"/>
        <Container fluid={true}>
            <Row>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Pie Chart <span className="digits">1</span></h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <div className="chart-overflow" id="pie-chart1">
                        <GooglePieChart1/>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Pie Chart <span className="digits">2</span></h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                        <GooglePieChart2/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Donut Chart</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleDonutChart/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Rotating A Pie Chart <span className="digits">1</span></h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleRotatingPieChart1/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Rotating A Pie Chart <span className="digits">2</span></h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleRotatingPieChart2/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Slice Visibility Threshold</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleSliceCharts/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Area Chart</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleAreaChart/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Stacking Area Chart</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleStackingChart/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Basic bar Chart</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleBasicbarChart/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Material Design</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleMaterialDesignChart/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Gantt Chart</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleGhantChart/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Line Chart</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleLineChart/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Combo Chart</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleComboChart/>
                  </CardBody>
                </Card>
              </Col>  

              <Col sm="12" xl="6 box-col-12 xl-100">
                <Card>
                  <CardHeader>
                    <h5>bar-chart2</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                  <GoogleBarChart2/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6 box-col-12 xl-100">
                <Card>
                  <CardHeader>
                    <h5>Word tree</h5>
                  </CardHeader>
                  <CardBody className="chart-block">
                    <GoogleTreeChart/>
                  </CardBody>
                </Card>
              </Col>
              
            </Row>
          </Container>
          </Fragment>
        );
}

export default GoogleCharts;