import React, { Fragment } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Mail,Bell,Settings,Music,AlertTriangle,AlertCircle,DollarSign,Headphones,Link,GitHub,Award,Activity,Heart} from 'react-feather'
import {Container,Row,Col,Card,CardHeader,CardBody,Button,Badge} from 'reactstrap'
const TagAndPills = (props) => {
    return (
      <Fragment>
        <BreadCrumb parent="Home" subparent="Base" title="Tag & Pills"/>
        <Container fluid={true}>
            <Row>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Contextual variations</h5>
                  </CardHeader>
                  <CardBody className="card-body">
                      <Badge color="primary">Primary</Badge><Badge color="secondary">Secondary</Badge>
                      <Badge color="success">Success</Badge><Badge color="info">Info</Badge>
                      <Badge color="warning">Warning</Badge><Badge color="danger">Danger</Badge>
                      <Badge color="light">Light</Badge><Badge color="dark tag-pills-sm-mb">Dark</Badge>
                </CardBody>
                </Card>
              </Col>
              <Col  sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Contextual variations</h5>
                  </CardHeader>
                  <CardBody className="card-body">
                    <Badge color="primary" pill>Primary</Badge>
                    <Badge color="secondary" pill>Secondary</Badge>
                    <Badge color="success" pill>Success</Badge>
                    <Badge color="info" pill>Info</Badge>
                    <Badge color="warning" pill>Warning</Badge>
                    <Badge color="danger" pill>Danger</Badge>
                    <Badge color="light" pill>Light</Badge>
                    <Badge color="dark tag-pills-sm-mb" pill>Dark</Badge>
                  </CardBody>
                </Card>
              </Col>
              <Col  sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Tags with number</h5>
                  </CardHeader>
                  <CardBody className="card-body digits">
                      <Badge color="primary" href="#javascript">1</Badge>
                      <Badge color="secondary" href="#javascript">2</Badge>
                      <Badge color="success" href="#javascript">3</Badge>
                      <Badge color="info" href="#javascript">4</Badge>
                      <Badge color="warning" href="#javascript">5</Badge>
                      <Badge color="danger" href="#javascript">6</Badge>
                      <Badge color="light" href="#javascript">7</Badge>
                      <Badge color="dark" href="#javascript">8</Badge>
                </CardBody>
                </Card>
              </Col>
              <Col  sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Pills with number</h5>
                  </CardHeader>
                  <CardBody className="card-body digits">
                      <Badge color="primary" pill>1</Badge>
                      <Badge color="secondary" pill>2</Badge>
                      <Badge color="success" pill>3</Badge>
                      <Badge color="info" pill>4</Badge>
                      <Badge color="warning" pill>5</Badge>
                      <Badge color="danger" pill>6</Badge>
                      <Badge color="light" pill>7</Badge>
                      <Badge color="dark" pill>8</Badge>
                  </CardBody>
                </Card>
              </Col>
              <Col  sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Tags With icon</h5>
                  </CardHeader>
                  <CardBody className="card-body">
                      <Badge color="primary" href="#javascript" pill><DollarSign/></Badge>
                      <Badge color="secondary" href="#javascript" pill><Headphones/></Badge>
                      <Badge color="success" href="#javascript" pill><Link/></Badge>
                      <Badge color="info" href="#javascript" pill><GitHub/></Badge>
                      <Badge color="warning" href="#javascript" pill><Award/></Badge>
                      <Badge color="danger" href="#javascript" pill><Activity/></Badge>
                      <Badge color="light" href="#javascript" pill><Heart/></Badge>
                      <Badge color="dark" href="#javascript" pill><Mail/></Badge>
                  </CardBody>
                </Card>
              </Col>
              <Col  sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Pills with Icon</h5>
                  </CardHeader>
                  <CardBody className="card-body">
                      <Badge color="primary" href="#javascript" pill><DollarSign/></Badge>
                      <Badge color="secondary" href="#javascript" pill><Headphones/></Badge>
                      <Badge color="success" href="#javascript" pill><Link/></Badge>
                      <Badge color="info" href="#javascript" pill><GitHub/></Badge>
                      <Badge color="warning" href="#javascript" pill><Award/></Badge>
                      <Badge color="danger" href="#javascript" pill><Activity/></Badge>
                      <Badge color="light" href="#javascript" pill><Heart/></Badge>
                      <Badge color="dark" href="#javascript" pill><Mail/></Badge>
                  </CardBody>
                </Card>
              </Col>
              <Col  sm="12" xl="6">
                <Card className="height-equal">
                  <CardHeader>
                    <h5>Badges Example</h5>
                  </CardHeader>
                  <CardBody className="card-body">
                    <h1>heading <Badge color="primary">New</Badge></h1>
                    <h2>heading <Badge color="primary">New</Badge></h2>
                    <h3>heading <Badge color="primary">New</Badge></h3>
                    <h4>heading <Badge color="primary">New</Badge></h4>
                    <h5>heading <Badge color="primary">New</Badge></h5>
                    <h6>heading <Badge color="primary">New</Badge></h6>
                  </CardBody>
                </Card>
              </Col>
              <Col  sm="12" xl="6">
                <div className="card height-equal">
                  <CardHeader>
                    <h5>Badges as part buttons</h5>
                  </CardHeader>
                  <CardBody className="card-body">
                    <div className="mb-3">
                      <Button color="primary">
                        Messages <Badge color="light" pill><Mail/></Badge>
                      </Button>
                    </div>
                    <div className="mb-3">
                      <Button color="secondary" type="button">
                        Notifications <Badge color="light" pill><Bell/></Badge></Button>
                    </div>
                    <div className="mb-3">
                      <Button color="success">Update available <Badge color="light" pill><Settings/></Badge></Button>
                    </div>
                    <div className="mb-3">
                      <Button color="info">Playing Now <Badge color="light" pill><Music/></Badge></Button>
                    </div>
                    <div className="mb-3">
                      <Button color="warning">1.2 GB Used <Badge color="light" pill><AlertTriangle/></Badge></Button>
                    </div>
                    <div>
                      <Button color="danger">Alert <Badge color="light" pill><AlertCircle/></Badge></Button>
                    </div>
                  </CardBody>
                </div>
              </Col>
            </Row>
          </Container>
          </Fragment>
    );
}

export default TagAndPills;