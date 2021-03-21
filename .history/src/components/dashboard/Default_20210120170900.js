import React, {useState,Fragment,useEffect } from 'react'
import Chart from 'react-apexcharts'
import { Container, Row, Col, Card, CardBody, CardHeader, Table } from 'reactstrap'
import {  ShoppingBag, User,UserPlus, Pocket, Monitor, Truck,BarChart,DollarSign,Percent} from 'react-feather';
// import { columnChart} from '../widgets/chartsData/charts-data'


import app from '../../data/base'

// import { timeDeltaFormatOptionsDefaults } from 'react-countdown/dist/utils';

const Hospital = (props) => {
   
 
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
    const [user10, setUser10] = useState()
    const [user11, setUser11] = useState()
    const [user12, setUser12] = useState(0)
    const [user13, setUser13] = useState(0)

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



    useEffect(()=>{
      
      app.database().ref().child("UniqueId").once("value", function(snapshot){
        setUser(snapshot.val())
      })
        
      app.database().ref().child("DPID").once("value", function(snapshot) {
        var tot=parseInt(snapshot.val())-19822;
          setUser1(tot)

      })

      var cactive=0;
      var cinactive=0;
      app.database().ref().child("CloudKitchen")
      .orderByChild("AStatus").equalTo("Active")
      .once("value", function(snapshot) {
           cactive=snapshot.numChildren();    
           app.database().ref().child("CloudKitchen")
              .orderByChild("AStatus").equalTo("InActive")
              .once("value", function(snapshot1) {
                  cinactive=snapshot1.numChildren();    
                  setUser2("Ac - "+cactive +" In - "+cinactive)
               }); 
              })

              var lactive=0;
              var linactive=0;
              app.database().ref().child("CloudKitchen")
              .orderByChild("AStatus").equalTo("Active")
              .once("value", function(snapshot) {
                      snapshot.forEach(snap=>{
                        if(snap.val().Local==="Yes"){
                          lactive=snap.numChildren();   
                        }
                      })
                    
                   app.database().ref().child("CloudKitchen")
                      .orderByChild("AStatus").equalTo("InActive")
                      .once("value", function(snapshot1) {
                        snapshot1.forEach(snap1=>{
                          if(snap1.val().Local==="Yes"){
                            linactive=snap1.numChildren();   
                          }
                        })
                            
                          setUser12("Ac - "+lactive +" In - "+linactive)
                          // setUser12("Ac - "+lactive )

                       }); 
                      
                      })

                      var hactive=0;
              var hinactive=0;
              app.database().ref().child("CloudKitchen")
              .orderByChild("AStatus").equalTo("Active")
              .once("value", function(snapshot) {
                console.log(snapshot.numChildren())
                      snapshot.forEach(snap=>{
                        if(snap.val().Local!=="Yes"){
                          hactive=snap.numChildren();   
                        }
                      })
                    
                   app.database().ref().child("CloudKitchen")
                      .orderByChild("AStatus").equalTo("InActive")
                      .once("value", function(snapshot1) {
                        snapshot1.forEach(snap1=>{
                          if(snap1.val().Local!=="Yes"){
                            hinactive=snap1.numChildren();   
                          }
                        })
                            
                          setUser13("Ac - "+hactive +" In - "+hinactive)
                          // setUser12("Ac - "+lactive )

                       }); 
                      
                      })

              var cheftotal=0;
              app.database().ref().child("CloudKitchen").once("value", function(snapshot) {
                  if(snapshot.exists()){
                 
                  snapshot.forEach(function(data){
                      var val = data.val();
                      if(val.Earnings!=null)
                      cheftotal=cheftotal + +parseFloat(val.Earnings);
                    }); 
                  //   document.getElementById('card4').innerHTML="₹"+parseFloat(cheftotal).toFixed(2);
                  }   
              }); 
              var total=0;
              app.database().ref().child("Orders").once("value", function(snapshot) {
                  if(snapshot.exists()){
                  snapshot.forEach(function(data){
                      var val = data.val();
                      if(val.Total!=null)
                      total=total + +parseFloat(val.Total);
                    }); 
                    setUser3("₹"+parseFloat(total).toFixed(2));
                  }   
              }); 

              var deliverytotal=0;
              app.database().ref().child("DeliveryPartner").once("value", function(snapshot) {
                   if(snapshot.exists()){
                  
                   snapshot.forEach(function(data){
                       var val = data.val();
                       if(val.Earnings!=null)
                       deliverytotal=deliverytotal + +parseFloat(val.Earnings);
                     }); 
                     setUser5("₹"+parseFloat(deliverytotal).toFixed(2));
                    //  var temp=total-cheftotal-deliverytotal;
                    //  setUser4("₹"+parseFloat(temp).toFixed(2));
   
                   } 
                  })

                  var d = new Date();
                  var a = d.getHours()
                  var b = d.getMinutes()
                  var c = a + ":" + b


                  app.database().ref().child("CloudKitchen")
                  .orderByChild("Status").equalTo("Active")
                  .once("value", function(snapshot) {
                      if(snapshot.exists()) {
                          var count = 0;
                          var open;
                          snapshot.forEach(function(snapshot) {
                            if(snapshot.val().AStatus === "Active") {
                              // console.log(c)
                              if((snapshot.val().Open) < c) {
                                if((snapshot.val().Close) > c) {
                                // console.log(snapshot.val().Open)
                                // console.log(snapshot.val().Close)
                                count = count + 1
                                setUser4(count) ;
                                }
                              }
                            }
                          })

                      }
                  })
            var wallet=0;
            app.database().ref().child("Users").once("value", function(snapshot) {
                if(snapshot.exists()){
               
                snapshot.forEach(function(data){
                    var val = data.val();
                    if(val.Wallet!=null)
                    wallet=wallet + +parseFloat(val.Wallet);
                  }); 
                  setUser6("₹"+parseFloat(wallet).toFixed(2));

                }   
            });

            
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;


           
           app.database().ref().child("Orders")
                .orderByChild('OrderDate').equalTo(today)
                .once("value", function(snapshot) {
                if(snapshot.exists()){
                    var wallet=0;
                    snapshot.forEach(function(data){
                        var val = data.val();
                        if(val.Total!=null)
                        wallet=wallet + +parseFloat(val.Total);
                    }); 
                  setUser7("₹"+parseFloat(wallet).toFixed(2));
                }   
            });
            
            app.database().ref().child("Users")
            .once("value", function(snapshot) {
            if(snapshot.exists()){
                var wallet=0;
                snapshot.forEach(function(data){
                    var val = data.val();
                    if(val.WalletInsta!=null) {
                    wallet=wallet + +parseFloat(val.WalletInsta);
                    }
                }); 
              setUser11("₹"+parseFloat(wallet).toFixed(2));
            }   
        });
        
        app.database().ref().child("Users")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var wallet=0;
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Wallet!=null)
                wallet=wallet + +parseFloat(val.Wallet);
            }); 
          setUser10("₹"+parseFloat(wallet).toFixed(2));
        }   
    });

            app.database().ref().child("Orders")
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
        app.database().ref().child("Masters").child("City")
        .orderByChild("Status").equalTo("Active")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var contents = [];
            snapshot.forEach(snap=>{
              contents.push(snap.val());
               
            });
            setState1({ location: contents });
        }   
        
    }); 
    var year=yyyy;
    var fyear=yyyy+1;
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
        .orderByChild('OrderDate').startAt(fyear+"-01-01").endAt(fyear+"-01-31")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(fyear+"-02-01").endAt(fyear+"-02-28")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(year+"-03-01").endAt(year+"-03-31")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(year+"-04-01").endAt(year+"-04-30")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(year+"-05-01").endAt(year+"-05-31")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(year+"-06-01").endAt(year+"-06-30")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(year+"-07-01").endAt(year+"-07-31")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(year+"-08-01").endAt(year+"-08-31")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(year+"-09-01").endAt(year+"-09-30")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(year+"-10-01").endAt(year+"-10-31")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
            }); 
         setOctober(parseFloat(total).toFixed(2));
          tot[9]=parseFloat(total).toFixed(2);
          

          if(mm==="10"){
            setMonthlyEarning("₹"+parseFloat(total).toFixed(2));
            setMonthlyOrders(parseInt(number));
          }

        }   
    }); 


    app.database().ref().child("Orders")
        .orderByChild('OrderDate').startAt(year+"-11-01").endAt(year+"-11-30")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
        .orderByChild('OrderDate').startAt(year+"-12-01").endAt(year+"-12-31")
        .once("value", function(snapshot) {
        if(snapshot.exists()){
            var total=0;
            var number=snapshot.numChildren();
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.Total!=null)
                total=total + +parseFloat(val.Total);
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
                  text: '₹ (thousands)'
              }
          },
          fill: {
              colors: ["#158df7"]
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return "₹ " + val + " thousands"
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
                
                <Card className="o-hidden" >
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><User/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                         <h5 className="d-inline-block f-w-600" >{user ||"0"}</h5>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Total User</p>
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
                       <h5 className="d-inline-block f-w-600">{user1 ||"0"}</h5>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Total Delivery Partners</p>
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
                           <h5 className="d-inline-block f-w-600">{user2 ||"Ac - 0 In - 0"}</h5>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                        <p className="m-t-5 mb-0 f-w-600">Total Chefs</p>
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
                      <div className="hospital-box light-bg-primary"><h3>₹</h3></div>
                      <div className="media-body">
                        <div className="hospital-content">
                          <div className="row">
                          <div className="col-6">
                          <h5 className="d-inline-block f-w-600">{user13||"Ac - 0 In - 0"}</h5>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Total Home Chef</p>{console.log(user13)}
                          </div>
                          <div className="col-6">
                          <h5 className="d-inline-block f-w-600">{user12 ||"Ac - 0 In - 0"}</h5>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Total Local Chef</p>{console.log(user13)}
                          </div>
                          </div>
                       
                          
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
                      <div className="hospital-box light-bg-primary"><BarChart/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                        <h5 className="d-inline-block f-w-600">{user3 ||"₹0.00"}</h5>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Total Turnover</p>
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
                      <div className="hospital-box light-bg-danger"><Pocket/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                       <h5 className="d-inline-block f-w-600">{user4 ||"₹0.00"}</h5>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Chef Accepting Orders</p>
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
                      <div className="hospital-box light-bg-primary"><Monitor/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                        <h5 className="d-inline-block f-w-600">{user5 ||"₹0.00"}</h5>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Total Delivery Payouts</p>
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
              <Col>
              <Card className="o-hidden">
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><Percent/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           <h5 className="d-inline-block f-w-600">{user6||"₹0.00"}</h5>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Total Scratch Discounts</p>
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
                      <div className="hospital-box light-bg-primary"><h3>₹</h3></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           <h5 className="d-inline-block f-w-600">{user7||"₹0.00"}</h5>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Todays Earnings</p>
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
                      <div className="hospital-box light-bg-primary"><h3>₹</h3></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           <h5 className="d-inline-block f-w-600">{user10||"₹0.00"}</h5>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Total MF Cash</p>
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
                      <div className="hospital-box light-bg-primary"><h3>₹</h3></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           <h5 className="d-inline-block f-w-600">{user11||"₹0.00"}</h5>{/*<span className="badge flat-badge-primary m-l-10">OPD</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Total My Cash</p>
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
             
              
              <Row >
              <Col xl="6" className="xl-90 box-col-6">
                <Card style={{width:"700px"}}>
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
                <Col xl="6" className="xl-40 box-col-12">
                <Row >
               
                  <Col >
              <Card className="o-hidden"style={{width:"300px",height:"auto",marginLeft:"200px"}} >
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><h3>₹</h3></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           <h5 className="d-inline-block f-w-600">{monthlyEarning||"₹0.00"}</h5>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Monthly Sales</p>
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
             
              <Card className="o-hidden" style={{width:"300px",height:"auto",marginLeft:"200px"}} >
          
                  <CardBody>
                    <div className="hospital-widgets media">
                      <div className="hospital-box light-bg-danger"><ShoppingBag/></div>
                      <div className="media-body">
                        <div className="hospital-content">
                           <h5 className="d-inline-block f-w-600">{monthlyOrders||"₹0.00"}</h5>{/*<span className="badge flat-badge-secondary m-l-10">New</span> */}
                          <p className="m-t-5 mb-0 f-w-600">Monthly Orders</p>
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
                    <h6>Latest Order</h6>
                  </CardHeader>
                  <CardBody className="p-0">
                  <div className="table-responsive text-nowrap">
                      <Table >
                        <thead>
                          <tr>
                            <th scope="col">Customer	</th>
                            <th scope="col">	Order ID</th>
                            <th scope="col">	Chef Id</th>
                            {/* <th scope="col">Products	</th> */}
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
      {/* <td>{order.ItemsDetails}</td> */}
      <td>{order.Total}</td>
      <td>{order.Payment}</td>
      
      {order.Status==="1"?
        <td style={{color:"orange"}} >{"New Oder"}</td>: order.Status==="2"?
        <td style={{color:"	#FFFF00"}}>{"Processing Order"}</td>:order.Status==="3"?
        <td style={{color:"red"}}>{"Waiting For Pickup"}</td>:order.Status==="4"?
        <td style={{color:"gray"}}>{"Pickedup"}</td> :order.Status==="5"?
        <td style={{color:"green"}}>{"Delivered Order"}</td>: order.Status==="10"?
        <td style={{color:"lightgreen"}}>{"Cancelled Order"}</td> : 
        <td style={{color:"blue"}}>{"Refunded Order"}</td>
  
    }
   

    </tr>
  );
})}
                   
                           
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="5" className="xl-30 box-col-6">
                <Card>
                  <CardHeader>
                    <h6>Serviceable Locations</h6>
                  </CardHeader>
                  <CardBody className="p-0">
                    <div className="table-responsive text-nowrap">
                      <Table>
                        <thead>
                          <tr>
                            <th scope="col">Location Name	</th>
                            <th scope="col">Radius</th>
                            <th scope="col">Delivery</th>
                            <th scope="col">Packing</th>
                         
                          </tr>
                        </thead>
                        <tbody>
                        {state1.location.map((order,i) => {
  return (
    <tr key={i}>
    <td >
      {order.Name} </td>
      <td>{order.Radius}</td>
      <td>{order.DeliveryCharges}</td> 
      <td>{order.PackingCharges}</td>
    </tr>
  );
})}
                          {/* {bookedAppoinmentState.map(data => (
                            <tr key={data.id}>
                              <td>{data.id}</td>
                              <td>
                                <div className="d-inline-block align-middle">
                                  <div className="d-inline-block"><span className="f-w-600">{data.name}</span></div>
                                </div>
                              </td>
                              <td><span>{data.doctor}</span></td>
                              <td><span>{data.date}</span></td>
                              <td><span>{data.time}</span></td>
                              <td><span className={`badge badge-pill pill-badge-${data.className}`}>Action</span></td>
                          </tr>
                          ))} */}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col xl="5" className="xl-100 box-col-12">
                <Card>
                  <CardHeader>
                    <h5>Admit patient list</h5>
                  </CardHeader>
                  <CardBody className="p-0">
                    <div className="sales-product-table table-responsive hospital-table">
                      <Table borderless  className="text-center">
                        <thead>
                          <tr>
                            <th scope="col">Pateint Name</th>
                            <th scope="col">Diseases</th>
                            <th scope="col">Admit Date</th>
                            <th scope="col">Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admitPatientState.map(data => (
                               <tr key={data.id}>
                               <td>
                                <h6 className="f-w-600 mb-0">{data.name}</h6>
                               </td>
                               <td><span className="hospital-diseases"><span className={`circle-small-${data.className}`}> </span>{data.diseases}</span></td>
                               <td><span>{data.date}</span></td>
                               <td><span className="icofont icofont-ui-delete"></span></td>
                             </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card> */}
              {/* </Col> */}
            </Row>
            </Container>
            </Fragment>
    )
}

export default Hospital;
