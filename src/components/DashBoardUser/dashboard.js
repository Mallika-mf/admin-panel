import React, {useState,Fragment,useEffect } from 'react'
import ChartistGraph from 'react-chartist';
import Chart from 'react-apexcharts'
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, CardFooter } from 'reactstrap'
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent} from 'react-feather';



import app from '../../data/base'

// import { timeDeltaFormatOptionsDefaults } from 'react-countdown/dist/utils';
import {useHistory} from 'react-router-dom'

const DashBoard = (props) => {
   
 
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
          var city=window.localStorage.getItem('city');
                if(city===null){                      
                    city=window.sessionStorage.getItem('city');
                    if(city===null){
            history.push(`${process.env.PUBLIC_URL}/login`);
                    } 
                }
      
     var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
          

            app.database().ref().child("CloudKitchen").orderByChild("City").equalTo(city).once("value", function(snapshot) {
                 setUser(snapshot.numChildren());      
            }); 
        
      app.database().ref().child("Orders").orderByChild("City").equalTo(city).once("value", function(snapshot) {
                if(snapshot.exists()){
                    var count=0;
                snapshot.forEach(function(data){
                    var val = data.val();
                    if(val.OrderDate==today){
                         count++;
                     }
                  }); 
                  setUser1(count);
                }   
            }); 

       var total=0;
            app.database().ref().child("Orders").orderByChild("OrderDate").equalTo(today).once("value", function(snapshot) {
                if(snapshot.exists()){
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.City==city){
                            if(val.Total!=null)
                            total=total + +parseFloat(val.Total);
                        }
                    }); 
                  setUser2("₹"+parseFloat(total).toFixed(2));
                }     
            });  
             
             

                  
               app.database().ref().child("Orders").orderByChild('City').equalTo(city).once("value", function(snapshot) {
                if(snapshot.exists()){
                   var total1=0;
                snapshot.forEach(function(data){
                    var val = data.val();
                    if(val.Total!=null)
                     total1=total1 + +parseFloat(val.Total);
                  }); 
                  setUser3("₹"+parseFloat(total1).toFixed(2));
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
                          <h6 className="m-t-5 mb-0 f-w-600">Todays Orders</h6>
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
                          <h6 className="m-t-5 mb-0 f-w-600">Order Total</h6>
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
                          <h6 className="m-t-5 mb-0 f-w-600">Total Revenue</h6>
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
              
  
            </Row>
            </Container>
            </Fragment>
    )
}

export default DashBoard;
