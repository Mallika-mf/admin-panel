import React, {useState,Fragment,useEffect } from 'react'
import Chart from 'react-apexcharts'
import { Container, Row, Col, Card, CardBody, CardHeader, Table } from 'reactstrap'
import {  ShoppingBag, User,UserPlus, Truck,BarChart,DollarSign} from 'react-feather';



import app from '../../data/base'
import {useHistory} from 'react-router-dom'

// import { timeDeltaFormatOptionsDefaults } from 'react-countdown/dist/utils';

const OrderManagement = (props) => {
   
 
    const [state, setState] = useState({
      latestOrder:[]
    
    })
    const [user, setUser] = useState()
    const [user1, setUser1] = useState()
    const [user2, setUser2] = useState()
    const [user3, setUser3] = useState()
    const [jan,setJan] = useState(0)
    const [feb,setFeb] = useState(0)
    const [march,setMarch] = useState(0)
    const [april,setApril] = useState(0)
    const [may,setMay] = useState(0)
    const [june,setJune] = useState(0)
    const [july,setJuly] = useState(0)
    const [august,setAugust] = useState(0)
    const [september,setSeptember] = useState(0)
    const [october,setOctober] = useState(0)
    const [november,setNovember] = useState(0)
    const [december,setDecember] = useState(0)
    const [monthlyEarning,setMonthlyEarning] = useState()
    const [monthlyOrders,setMonthlyOrders] = useState()
      const history = useHistory();



    useEffect(()=>{
         var username=window.localStorage.getItem('name');
                if(username===null){                      
                    username=window.sessionStorage.getItem('name');
                    if(username===null){
          history.push(`${process.env.PUBLIC_URL}/login`);
                    } 
                }
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
      app.database().ref().child("CloudKitchen")
            .orderByChild("Franchise").equalTo(username)
            .on("value", function(snapshot) {
                  setUser(snapshot.numChildren());
                  console.log(snapshot.val())      
            });

        
   

        var total=0;
            app.database().ref().child("Orders").orderByChild("WorkingPartner").equalTo(username).on("value", function(snapshot) {
                if(snapshot.exists()){
                    total=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate===today)
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                total=total + +parseFloat(val.Total);
                            }
                        }
                    }); 
                    
                  setUser2("₹"+parseFloat(total).toFixed(2));
                }   
            }); 
           
               app.database().ref().child("Orders").orderByChild("WorkingPartner").equalTo(username).on("value", function(snapshot) {
                if(snapshot.exists()){
                    total=0;
                snapshot.forEach(function(data){
                    var val = data.val();
                    if(val.Total!==null)
                    total=total + +parseFloat(val.SubTotal);
                    
                  }); 
                  console.log(total)
                  setUser3("₹"+parseFloat(total).toFixed(2));
                  window.total = parseFloat(total).toFixed(2)
                }   
            });

            app.database().ref().child("Franchise")
            .child(username)
                .on("value", function(snapshot) {
                    let partnerCommision = window.total * (parseFloat(snapshot.val().Commision)/100)
                    setUser1("₹"+parseFloat(partnerCommision).toFixed(2));    
                });
            // var year=yyyy;
            var fyear=yyyy;
            console.log(fyear)
            // if(mm<=3){
            //     fyear=yyyy;
            // }
            // else{
            //     fyear=yyyy;
            // }
            

            // console.log(fyear);

            var tot=[0,0,0,0,0,0,0,0,0,0,0,0];
            var percentage=[0,0,0,0,0,0,0,0,0,0,0,0];
            var max=0;
           


            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                       
                        
                         if(val.OrderDate > fyear+"-01-01" && val.OrderDate < fyear+"-01-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setJan(parseFloat(total).toFixed(2));
                    tot[0]=parseFloat(total).toFixed(2);
                    
          
                    if(mm==="01"){
                     setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                }   
            }); 

            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
            .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        
                        if(val.OrderDate > fyear+"-02-01" && val.OrderDate < fyear+"-02-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setFeb(parseFloat(total).toFixed(2));
                    tot[1]=parseFloat(total).toFixed(2);
                  
          
                    if(mm==="02"){
                      setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                }   
            }); 


            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate > fyear+"-03-01" && val.OrderDate < fyear+"-03-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setMarch(parseFloat(total).toFixed(2));
                    tot[2]=parseFloat(total).toFixed(2);
                    
          
                    if(mm==="03"){
                      setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                }   
            }); 


            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate > fyear+"-04-01" && val.OrderDate < fyear+"-04-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setApril(parseFloat(total).toFixed(2));
                    tot[3]=parseFloat(total).toFixed(2);
                  
          
                    if(mm==="04"){
                      setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                }   
            }); 


            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate > fyear+"-05-01" && val.OrderDate < fyear+"-05-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setMay(parseFloat(total).toFixed(2));
          tot[4]=parseFloat(total).toFixed(2);
          

          if(mm==="05"){
            setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
            setMonthlyOrders(parseInt(number));
          }

                }   
            }); 


            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate > fyear+"-06-01" && val.OrderDate < fyear+"-06-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setJune(parseFloat(total).toFixed(2));
                    tot[5]=parseFloat(total).toFixed(2);
                    
          
                    if(mm==="06"){
                      setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                }   
            }); 

            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate > fyear+"-07-01" && val.OrderDate < fyear+"-07-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                        }
                    }); 
                    setJuly(parseFloat(total).toFixed(2));
                    tot[6]=parseFloat(total).toFixed(2);
                    
          
                    if(mm==="07"){
                      setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                }   
            }); 


            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate > fyear+"-08-01" && val.OrderDate < fyear+"-08-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setAugust("₹"+parseFloat(total).toFixed(2));
          tot[7]=parseFloat(total).toFixed(2);
          

          if(mm==="08"){
            setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
            setMonthlyOrders(parseInt(number));
          }

                }   
            }); 



            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate > fyear+"-09-01" && val.OrderDate < fyear+"-09-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setSeptember(parseFloat(total).toFixed(2));
                    tot[8]=parseFloat(total).toFixed(2);
                    
          
                    if(mm==="09"){
                      setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                }   
            });  


            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                      
                        if(val.OrderDate > fyear+"-10-01" && val.OrderDate < fyear+"-10-30"){
                        console.log("inside if")
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    console.log(parseFloat(total).toFixed(2))
                    setOctober(parseFloat(total).toFixed(2));
                    tot[9]=parseFloat(total).toFixed(2);
                    
          
                    if(mm==="10"){
                      setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                }   
            }); 


            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate > fyear+"-11-01" && val.OrderDate < fyear+"-11-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setNovember(parseFloat(total).toFixed(2));
                    tot[10]=parseFloat(total).toFixed(2);
                    
          
                    if(mm==="11"){
                      setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                }   
            }); 


            app.database().ref().child("Orders")
            .orderByChild("WorkingPartner").equalTo(username)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var total=0;
                    var number=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.OrderDate > fyear+"-12-01" && val.OrderDate < fyear+"-12-31"){
                        if(val.WorkingPartner!==null&&val.WorkingPartner!==""){
                            if(val.WorkingPartner===username){
                                if(val.Total!==null){
                                    total=total + +parseFloat(val.Total);
                                    number++;
                                }
                            }
                        }
                      }
                    }); 
                    setDecember(parseFloat(total).toFixed(2));
                    tot[11]=parseFloat(total).toFixed(2);
                   
          
                    if(mm==="12"){
                      setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
                      setMonthlyOrders(parseInt(number));
                    }

                 }   
            }); 

            setTimeout(function()
            { 
               for(var i=0;i<12;i++){
                   if(tot[i]>=max){
                        max=tot[i];
                    }
                }

                for( i=0;i<12;i++){
                  if(tot[i]>0){
                      percentage[i]=parseInt(tot[i]/max*100);
                  }
              }

               
             }, 3000);

            app.database().ref().child("Orders")
            .orderByChild('WorkingPartner').equalTo(username)
            .limitToLast(10)
            .once("value", function(snapshot) {
            if(snapshot.exists()){
                var contents = [];
                snapshot.forEach(snap=>{
                  contents.push(snap.val());
                   
                });
                contents.reverse()
                setState({ latestOrder: contents });
            }   
        }); 
  
    },[])
    const columnChart = {
      options: {
          chart: {
              toolbar: {
                  show: true
              }
          },
          legend: {
              show: false
          },
          colors: ["#158df7", "#fb2e63"],
          dataLabels: {
              enabled: false
          },
          plotOptions: {
              bar: {
                  radius: 10,
                  horizontal: false,
                  columnWidth: '55%'
              }
          },
          stroke: {
              show: true,
              colors: ['transparent'],
              curve: 'smooth',
              lineCap: 'butt',
          },
          xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yaxis: {
              title: {
                  text: '$ (thousands)'
              }
          },
          fill: {
              colors: ["#158df7"]
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return "$ " + val + " thousands"
                  }
              }
          },
          grid: {
              show: false,
              padding: {
                  left: 0,
                  right: 0
              }
          }
      },
      series: [
          {
              // data: [200, 250, 330, 390, 420, 500, 580, 620, 700,888,666,555]
              data: [jan,feb,march,april,may,june,july,august,september,october,november,december]
          }
      ]
  }
    
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
                        <div className="hospital-content">{user2}
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
                           <h3 className="d-inline-block f-w-600">{monthlyEarning||"₹0.00"}</h3>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
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
                           <h3 className="d-inline-block f-w-600">{monthlyOrders||"₹0.00"}</h3>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
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
