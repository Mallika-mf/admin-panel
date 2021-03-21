import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardBody,CardHeader,Table,Input,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import app from '../../data/base'
import { map } from 'lodash';

const ViewDetails=(props)=>{
    const [show,setShow] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm]=useState("")
    const [cartData, setCartData]=useState({})
    const [searchValue, setSearchValue] = useState([]);
    const [cityName,setCityName] = useState([])
    const[cityPushId,setCityPushId] = useState([])
    const [localityName,setLocalityName] = useState([])
    const[localityPushId,setLocalityPushId] = useState([])
    const [viewItem,setViewItem] = useState([])
    const [viewItem1,setViewItem1] = useState([])
    const [showModel, setShowModel] = useState(false);
    const [showModel1, setShowModel1] = useState(false);
    useEffect(() => {
        var cityname=[];
        var citypushid=[];
        var localityname=[];
        var localitypushid=[];

        app.database().ref().child("Masters").child("City")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            citypushid.push(val.PushId);
            cityname.push(val.Name);
        });
        setCityName(cityname)
        setCityPushId(citypushid)
    });


    app.database().ref().child("Masters").child("Localities")
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
            var val = data.val(); 
            localitypushid.push(val.PushId);
            localityname.push(val.Name);
        });
            setLocalityName(localityname)
            setLocalityPushId(localitypushid)
    })
            // $('#datatable').empty();
            var chefid=sessionStorage.getItem('chefidapproval');
            var database = app.database();
            console.log(chefid)
            database.ref().child("Orders").orderByChild("Pushid").equalTo(chefid)
            .on('value', function(snapshot){
                // $('#datatable').empty();
                if(snapshot.exists()){
                    var content = [];
                    var content1=[]
                    snapshot.forEach(snap=>{
                        var val= snap.val()
                        console.log(snap.val())
                        if(val.OrderDateTime != '' || val.OrderDateTime != undefined || val.OrderDateTime != null) {      
                            snap.child('Cart').forEach(function(data1){
                                content1.push(data1.val())
                                        
                            });
                            setCartData(content1);
                        content.push(val);
                        }
                      });
                      setSearchValue(content);
                      setShow(false)
                    }else{
                        const timeout = setTimeout(() => {
                            setShow(false)
                          }, 3000);
                          return ()=>{clearTimeout(timeout);}

                    }
                    
            })
            
      }, []);
    return(
            <Fragment>
            <Row style={{marginLeft:"10px"}}>
           <BreadCrumb  parent="Order" subparent="ORDER DASHBOARD" title="ORDER DETAILS"/>
           </Row>
         
        {searchValue.map((item,id)=>{
            return(
              
            <Container key={id} fluid={true}>
                <Card>
                <div className="card-header" key={id}>
                        <h5 className="card-title"><i className="la la-home"></i>{"Order Details "} 
                        <a href="https://v2admin.eatzilla.info/admin/generate_pdf/673" style={{float:"right",marginTop: "-20px"}} target="_blank" className="btn btn-primary btn-sm"><b style={{fontSize: "16px"}}> {"Invoice"} </b></a>
                        </h5>
                        <hr/><br/>
                      </div>
                      <div className="row order" style={{marginTop: "-40px",marginLeft:"20px"}}>
                      <div className="col-xl-12 col-lg-12 col-md-12">
                         <h4>{"Order ID : "}<span className="id-color">{item.OrderNo}</span></h4>
                         <p className="order-p"><span>{"Order Details"}</span></p>
                      </div>
                    </div>
                    </Card>
                    <Card style={{height:"200px"}}>
                      <div className="row" >
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <h4>Chef Instructions: </h4>
                      <h5><span><b>{item.ChefInstructions}</b></span></h5>
                      </div>
                      </div>
                      </Card>
                    <div className="row create">
                <div className="col-12">
                  <div className="card">
                    <div className="row" style={{marginLeft: "30px"}}>
                      <div className="col-xl-6 col-lg-6 col-md-6 pt-3 px-2">
                        <p>Delivery Date:{item.DeliveryDate+","+item.DeliveryTime}</p>
                        <h6>Status </h6>
                        {item.Status==="1"?
                         <h5 style={{color:"green"}}>{"New Order"} </h5>: item.Status==="2"?
                         <h5 style={{color:"green"}}>{"Processing Order"} </h5>:item.Status==="3"?
                         <h5 style={{color:"green"}}>{"Waiting For Pickup"} </h5>:item.Status==="4"?
                         <h5 style={{color:"green"}}>{" Order PickedUp"} </h5>:item.Status==="5"?
                         <h5 style={{color:"green"}}>{"Deliverd Order"} </h5>:item.Status==="10"?
                         <h5 style={{color:"green"}}>{"Cancelled Order"} </h5>:
                         <h5 style={{color:"green"}}>{"Refunded Order"} </h5>

                        }
                                <h6>{"Paid By"}</h6>
                    <h5 style={{color:"green"}}>{item.Payment}</h5>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 pt-3 px-2" style={{marginTop:"20px"}}>
                        <h6> {"CUSTOMER"} </h6>
                        <div className="row m-1">
                        <dt className="col-sm-3 order-txt p-0"> {"Name:"}</dt>
                              <dd className="col-sm-9 order-txt "><span> {item.CName} </span> </dd>
                        </div>   
                        <div className="row m-1">
                            <dt className="col-sm-3 order-txt p-0"> {"Phone Number:"} </dt>
                            <dd className="col-sm-9 order-txt "><span> {item.Number} </span> </dd>
                        </div>
                        {/* <div className="row m-1">
                            <dt className="col-sm-3 order-txt p-0"><b>Customer Instruction:</b> </dt>
                            <dd className="col-sm-9 order-txt "><b>{item.ChefInstructions} </b> </dd>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
                  <Card >
                    <div className="row card-padding-20">
                      <div className="col-xl-6 col-lg-6 col-md-6 pt-3 px-2">
                        <div >
                          <Card style={{width: "20rem",marginLeft:"30px",borderStyle: "groove"}}>
                            <CardHeader style={{backgroundColor:"rgb(39, 110, 145)",color:"white",height: "2rem"}}>
                    <h6 className="h6-design-1"><b><i className="la la-user"></i>&nbsp;&nbsp; {"User"}</b> {"Details"}</h6>
                            </CardHeader>
                            <CardBody  style={{overflowY: "scroll",height:"200px"}}>
                            <div className="row m-1" >
                    <dt className="col-sm-4 order-txt p-0"> {"Username"}</dt>
                              <dd className="col-sm-8 order-txt "><span>:  {item.CName}</span> </dd>
                            </div>   
                            {/* <div className="row m-1">
                              <dt className="col-sm-4 order-txt p-0"> {"Email"} </dt>
                              <dd className="col-sm-8 order-txt "><span>  {":  hike@gmail.com"} </span> </dd>
                            </div> */}
                            <div className="row m-1">
                              <dt className="col-sm-4 order-txt p-0"> {"Phone Number"}  </dt>
                              <dd className="col-sm-8 order-txt "><span> {item.Number} </span> </dd>
                            </div><br/>
                            <div className="row m-1">
                              <dt className="col-sm-4 order-txt p-0"> {"Delivery Address"}  </dt>
                              <dd className="col-sm-8 order-txt "><span> {item.Flat+","+item.Address} </span> </dd>
                            </div><br/>
                             {/* <div className="row m-1">
                              <dt className="col-sm-4 order-txt p-0"> {"Address "} </dt>
                              <dd className="col-sm-8 order-txt "><span> { item.Address} </span> </dd>
                            </div> <br/>  */}
                            {/* <div className="row m-1">
                              <dt className="col-sm-4 order-txt p-0"> Building  </dt>
                              <dd className="col-sm-8 order-txt "><span>:   27282  </span> </dd>
                            </div><br/>  
                            <div className="row m-1">
                              <dt className="col-sm-4 order-txt p-0"> Block Number  </dt>
                              <dd className="col-sm-8 order-txt "><span>:   1728  </span> </dd>
                            </div> <br/> */}
                            {/* <div className="row m-1">
                              <dt className="col-sm-4 order-txt p-0"> Flat Number  </dt>
                              <dd className="col-sm-8 order-txt "><span>{item.Flat} </span> </dd>
                            </div><br/>  */}
                             {/* <div className="row m-1">
                              <dt className="col-sm-4 order-txt p-0"> Landmark  </dt>
                              <dd className="col-sm-8 order-txt "><span>:   good  </span> </dd>
                            </div>  */}
                             <div className="row m-1">
                              <dt className="col-sm-4 order-txt p-0"> Address Direction  </dt>
                                <dd className="col-sm-8 order-txt "><span>{item.LocationCoordinates}</span> </dd>
                            </div> 
                            </CardBody>
                            </Card>
                            
                          
                        </div>
                      </div>
                      
                         <div className="col-xl-6 col-lg-6 col-md-6 pt-3 px-2" style={{border:"hidden"}}>
                        <div >
                        <Card style={{width: "20rem",marginLeft:"30px",borderStyle: "none"}}>
                            <CardHeader style={{backgroundColor:"rgb(39, 110, 145)",color:"white",height: "2rem"}}>
                            <h6 className="h4-design-2"><b><i className="la la-cutlery"></i>&nbsp;&nbsp;Chef</b> Details</h6>
                            </CardHeader>
                            <CardBody  style={{overflowY: "scroll",height:"200px"}}>
                            <div className="my-card">
                            <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Name</dt>
                             <dd className="col-sm-7 order-txt "><span>:{item.ChefName}</span> </dd>
                            </div>   
                            {/* <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Email </dt>
                              <dd className="col-sm-7 order-txt "><span>: Mcdonalds@gonotlob.com</span> </dd>
                            </div> */}
                            <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Phone Number </dt>
                        <dd className="col-sm-7 order-txt "><span>: {item.ChefNumber}</span> </dd>
                            </div> 
                            <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Address 1</dt>
                        <dd className="col-sm-7 order-txt "><span>: {item.ChefAddress}</span> </dd>
                            </div>        
                            {/* <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Suburb</dt>
                              <dd className="col-sm-7 order-txt "><span>:   Alfateh, Manama, Bahrain   A'ali   Al Bahair, Riffa, Bahrain   Al Eker, Bahrain   Alhajiyat, Riffa, Bahrain   Awali, Bahrain   Bu Kowarah, Riffa, Bahrain   East Riffa, Riffa, Bahrain   Hamala, Bahrain   Hoarat A'ali, Bahrain   Isa Town   Jary Al Shaikh, Riffa, Bahrain   Jid Ali, Bahrain   Jurdab, Bahrain   Ma'ameer, Bahrain   Hamad Town, Bahrain   Nuwaidrat, Bahrain   Riffa Alshamali, Riffa, Bahrain   Safreh, Riffa, Bahrain   Salmabad, Bahrain   Sanad, Bahrain   Wadi AlSail, Riffa, Bahrain   West Riffa, Riffa, Bahrain   Zallaq, Bahrain   Zayed Town, Bahrain   Adliya, Manama, Bahrain   Al Burhama, Bahrain   Al Hoora, Manama, Bahrain   Alcorniche, Manama, Bahrain   Alguful, Manama, Bahrain   AlJuffair, Manama, Bahrain   Alsalmaniya, Manama, Bahrain   Bahrain Financial Harbour, Manama, Bahrain   Bilad Al Qadeem, Bahrain   Bu Ashira, Manama, Bahrain   Bu Ghazal, Manama, Bahrain   Diplomatic Area, Manama, Bahrain   Mahooz, Manama, Bahrain   Manama Center, Manama, Bahrain   Mina Salman, Manama, Bahrain   Qudaibiya, Manama, Bahrain   Ras Rumman, Manama, Bahrain   Sea Front, Manama, Bahrain   Tubli, Bahrain   Umm Al Hassam, Manama, Bahrain   Zinj, Bahrain   Muharraq, Bahrain   Busaiteen, Bahrain   Hidd, Bahrain   Arad, Bahrain   Amwaj, Bahrain   Galali, Bahrain   Al Dair, Bahrain   Samaheej, Bahrain   Saar, Bahrain   Maqabah, Bahrain   Janabiyah, Bahrain   Bani Jamra, Bahrain   Abu Saiba, Bahrain   Shakhurah, Bahrain   Al Hajar, Bahrain   Al Qadam, Bahrain   Budaiya, Bahrain   Diraz, Bahrain   Barbar, Bahrain   Jannusan, Bahrain   Jid Al Haj, Bahrain   Al Maqsha, Bahrain   Karranah, Bahrain   Hillat Abdul Saleh, Bahrain   Karbabad, Bahrain   Seef, Bahrain   Al Qurayyah, Bahrain   Al Markh, Bahrain   Al Qalah, Bahrain   Daih, Bahrain   Sanabis, Bahrain   Alsuwayfiyah, Manama, Bahrain   Tashan, Bahrain   Salihiya, Bahrain   Al Musalla, Bahrain   Jid Hafs, Bahrain   South Sehla, Bahrain   Abu Baham, Bahrain   Khamis, Bahrain   North Sehla, Bahrain   Jeblat Hebshi, Bahrain   Al Jasra, Bahrain   Buri, Bahrain   Damistan, Bahrain   Karzakkan, Bahrain   Abu Alayash, Sitra, Bahrain   Wadiyan, Sitra, Bahrain   Al Lawzi, Bahrain   Al Malikiyah, Bahrain   Sadad, Bahrain   Shahrakkan, Bahrain   Dar Kulaib, Bahrain   Al Safriyah, Bahrain   Alhunayniyah, Riffa, Bahrain   Al Mazrowiah, Bahrain   Nabih Saleh, Bahrain   Industrial Area, Sitra, Bahrain   Mahaza, Sitra, Bahrain   Al Qaryah, Sitra, Bahrain   Murqoban, Sitra, Bahrain   Al Kharijiya, Sitra, Bahrain   Sufala, Sitra, Bahrain   Alnaim, Manama, Bahrain   Halat Seltah, Halat Naim, Bahrain   Palakkad, Kerala, India   Dubai - United Arab Emirates    </span> </dd>
                            </div>  */}
                            <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0">Address Direction</dt>
                              <dd className="col-sm-7 order-txt "><span>:{item.ChefLoc} </span> </dd>
                            </div> 
                          </div>
                            </CardBody>
                            </Card>
            
                        </div>
                      </div>                
                      </div>
                    <div className="row card-padding-20">
                    <div className="col-xl-6 col-lg-6 col-md-6 pt-3 px-2">
                        <div >
                        <Card style={{width: "20rem",marginLeft:"30px",borderStyle: "groove"}}>
                            <CardHeader style={{backgroundColor:"rgb(52, 32, 109)",color:"white",height: "2rem"}}>
                            <h6 className="h4-design-4"><b><i className="la la-suitcase"></i>&nbsp;&nbsp;Order</b> Details</h6>
                            </CardHeader>
                            <CardBody  style={{overflowY: "scroll",height:"200px"}}>
                            <div className="my-card">
                            <div className="table-responsive text-nowrap">
                                <Table >
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Quantity	</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {cartData.map((item,id)=>{
                                        return(
                                        <tr key={id} >
                                        <td>{item.Name}</td>
                                        <td>{item.Qty}</td>
                                          <td>{item.Price}</td>
                                          <td >{item.Total}</td>
                                      </tr>
                                        )
                                      })}
                                   
                                       
                                    </tbody>
                                </Table>
                            </div>
                          </div>
                            </CardBody>
                            </Card>
                
                        </div>
                      </div>    
                      <div className="row card-padding-20">
                    <div className="col-xl-6 col-lg-6 col-md-6 pt-3 px-2">
                        <div >
                        <Card style={{width: "20rem",marginLeft:"30px",borderStyle: "groove"}}>
                            <CardHeader style={{backgroundColor:"rgb(52, 32, 109)",color:"white",height: "2rem"}}>
                            <h6 className="h4-design-4"><b><i className="la la-suitcase"></i>&nbsp;&nbsp;Delivery</b> Details</h6>
                            </CardHeader>
                            <CardBody  style={{overflowY: "scroll",height:"200px"}}>
                            <div className="my-card">
                            <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Sub Total</dt>{console.log(item.Cart.Name)}
                        <dd className="col-sm-7 order-txt "><span>: {item.Subtotal}</span> </dd>
                            </div>
                            <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Delivery</dt>
                        <dd className="col-sm-7 order-txt "><span>: {item.DeliveryCharges}</span> </dd>
                            </div>
                            <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0">Packing</dt>
                            <dd className="col-sm-7 order-txt "><span>: {item.Packing} </span> </dd>
                              <dt className="col-sm-5 order-txt p-0" style={{fontWeight:"500"}}></dt>
                            </div>  
                            <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Taxes</dt>
                              <dd className="col-sm-7 order-txt "><span>: {item.Taxes} </span> </dd> 
                             </div>
                             <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Discount</dt>
                              <dd className="col-sm-7 order-txt "><span>: {item.Discount} </span> </dd> 
                             </div>
                             <div className="row m-1">
                              <dt className="col-sm-5 order-txt p-0"> Total</dt>
                              <dd className="col-sm-7 order-txt "><span>: {item.Total} </span> </dd> 
                             </div>
                          </div>
                            </CardBody>
                            </Card>
                
                        </div>
                      </div>          
                      </div>
                        </div>
                  </Card>
                  </Container>
            )
        })}
      
          
            
            </Fragment>
    )
}
export default ViewDetails