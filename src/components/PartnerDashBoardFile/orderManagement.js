import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import ChartistGraph from 'react-chartist';
import Chart from 'react-apexcharts'
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, CardFooter } from 'reactstrap'
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent} from 'react-feather';
import {lineChart1, lineChart2, lineChart3, barChart, radialChart, radialChartLive, progress1, progress2, progress3, progress4, progress5, columnChart, browserUses, product, turnOver, monthlySale, uses} from '../widgets/chartsData/charts-data'



import app from '../../data/base'
import {useHistory} from 'react-router-dom'

// import { timeDeltaFormatOptionsDefaults } from 'react-countdown/dist/utils';

const OrderManagement = (props) => {
   
 
    const [state, setState] = useState({
      latestOrder:[]
    
    })
    const [state1, setState1] = useState({
     
      location:[]
    })
    const [user, setUser] = useState()
    const [user1, setUser1] = useState()
    const [user2, setUser2] = useState()
    const [user3, setUser3] = useState()
    const [user4, setUser4] = useState()
    const [user5, setUser5] = useState()
    const [user6, setUser6] = useState()
    const [user7, setUser7] = useState()
    const [user8, setUser8] = useState()
    const [user9, setUser9] = useState()
      const history = useHistory();



    useEffect(()=>{
         var username=window.localStorage.getItem('name');
                if(username===null){                      
                    username=window.sessionStorage.getItem('name');
                    if(username===null){
          history.push(`${process.env.PUBLIC_URL}/login`);
                    } 
                }
       var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
      app.database().ref().child("CloudKitchen")
            .orderByChild("Franchise").equalTo(username)
            .on("value", function(snapshot) {
                  setUser(snapshot.numChildren());      
            });

        
      app.database().ref().child("Franchise")
            .child(username).child("Cash")
                .on("value", function(snapshot) {
                    setUser1("₹"+parseFloat(snapshot.val()).toFixed(2));    
                }); 

        var total=0;
            app.database().ref().child("Orders").orderByChild("OrderDate").equalTo(today).on("value", function(snapshot) {
                if(snapshot.exists()){
                    total=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.Franchise!=null&&val.Franchise!=""){
                            if(val.Franchise==username){
                                total=total + +parseFloat(val.Total);
                            }
                        }
                    }); 
                  setUser2("₹"+parseFloat(total).toFixed(2));
                }   
            }); 
               app.database().ref().child("Orders").orderByChild("Franchise").equalTo(username).on("value", function(snapshot) {
                if(snapshot.exists()){
                    total=0;
                snapshot.forEach(function(data){
                    var val = data.val();
                    if(val.Total!=null)
                    total=total + +parseFloat(val.Total);
                  }); 
                  setUser3("₹"+parseFloat(total).toFixed(2));
                }   
            }); 
           
 

            app.database().ref().child("Orders")
            .orderByChild('Franchise').equalTo(username)
            .limitToLast(10)
            .once("value", function(snapshot) {
            if(snapshot.exists()){
                var contents = [];
                snapshot.forEach(snap=>{
                  contents.push(snap.val());
                   
                });
                setState({ latestOrder: contents });
            }   
        }); 
  
    },[])
    
    return (
      <Fragment>
        {/* <BreadCrumb parent="Home" subparent="Dashboard" title="Hospital"/> */}
        <Container fluid={true}>
            <Row>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><User/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                         <h3 className="d-inline-block f-w-600" >{user ||"0"}</h3>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Total Chefs</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1"></div>
                          <div className="flower2"></div>
                          <div className="flower3"></div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><Truck/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                       <h3 className="d-inline-block f-w-600">{user1 ||"0"}</h3>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Partner Commision</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1 flower-primary"></div>
                          <div className="flower2 flower-primary"></div>
                          <div className="flower3 flower-primary"></div>
                        </div>
                      </div>
                    </div>
                </CardBody>
              </Card>
              </Col>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><UserPlus/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           <h4 className="d-inline-block f-w-600">{user2 ||"₹0.00"}</h4>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Todays Total</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1"></div>
                          <div className="flower2"></div>
                          <div className="flower3"></div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3" className="xl-50 col-6 hospital-patients box-col-6">
                <Card className="o-hidden">
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-primary"><BarChart/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                        <h3 className="d-inline-block f-w-600">{user3 ||"₹0.00"}</h3>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Total Turnover</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1 flower-primary"></div>
                          <div className="flower2 flower-primary"></div>
                          <div className="flower3 flower-primary"></div>
                        </div>
                      </div>
                    </div>
                </CardBody>
              </Card>
              </Col>
             
              <Row className="row-xl-12">
              <Col xl="8" className="xl-80 box-col-12">
                <Card>
                <CardHeader>
                    <h5>Monthly Sales</h5>
                </CardHeader>
                <CardBody>
                    <div className="apex-chart-container chart-data">
                    <div id="column-chart">
                    <Chart options={columnChart.options} series={columnChart.series} height="350" type="bar" />                  
                    </div>
                    </div>
                </CardBody>
                </Card>
                </Col>
                <Col  className="xl-20 box-col-12">
                <Row className="row-sm-6">
               
                  <Col>
              <Card className="o-hidden" style={{height:"240px"}}>
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><DollarSign/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           <h3 className="d-inline-block f-w-600">₹0.00</h3>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Earned this month</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1"></div>
                          <div className="flower2"></div>
                          <div className="flower3"></div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              
              <Col  className="xl-20 box-col-12">
             
              <Card className="o-hidden" style={{height:"240px"}} >
          
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><ShoppingBag/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           <h3 className="d-inline-block f-w-600">₹0.00</h3>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <h6 className="m-t-5 mb-0 f-w-600">Monthly Orders</h6>
                        </div>
                        <div className="flowers">
                          <div className="flower1"></div>
                          <div className="flower2"></div>
                          <div className="flower3"></div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
               
                </Card>
            
                
              </Col>
              </Row>
              </Col>
              </Row>
              
              
             
              <Col xl="7" className="xl-70 box-col-6">
                <Card className="height-equal">
                  <CardHeader>
                    <h5>Latest Order</h5>
                  </CardHeader>
                  <CardBody className="p-0">
                  <div className="sales-product-table table-responsive booked-table">
                      <Table borderless className="text-nowrap">
                        <thead>
                          <tr>
                            <th scope="col">Customer	</th>
                            <th scope="col">Order ID</th>
                            <th scope="col">Chef Id</th>
                            <th scope="col">Products	</th>
                            <th scope="col">Total	</th>
                            <th scope="col">Payment Mode		</th>
                            <th scope="col">Status	</th>

                          </tr>
                        </thead>
                        <tbody>
                        {state.latestOrder.map((order,i) => {
                         return (
                           <tr key={i}>
                           <td >
                             {order.CName} </td>
                             <td>{order.OrderNo}</td>
                             <td>{order.Chef}</td>
                             <td>{order.ItemsDetails}</td>
                             <td>{order.Total}</td>
                             <td>{order.Payment}</td>
                             <td>{order.Status}</td>

                           </tr>
                         );
                       })}
                   
                           
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
  
                                     
            </Row>
            </Container>
            </Fragment>
    )
}

export default OrderManagement;
