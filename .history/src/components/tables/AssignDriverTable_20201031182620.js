import React, { Fragment,useState,useEffect} from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table,Button} from "reactstrap";
import {app,database} from '../../data/base'
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';

const AssignDriverTable = () => {
    const [users,setUsers] = useState([])
    const [driverId,setDriverId] = useState([])
    const [driverLocality,setDriverLocality] = useState([])
    const [driverName,setDriverName] = useState([])
    const [driverNumber,setDriverNumber] = useState([])

    const [localityPushId,setLocalityPushId] = useState([])
    const [localityName,setLocalityName] = useState([])
    const [cityPushId,setCityPushId] = useState([])
    const [cityName,setCityName] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    const [searchTerm, setSearchTerm]=useState("")
    useEffect(()=>{
        try{
        window.addEventListener('message', handleMessage);
       var driverid=[];
       var  driverlocality=[];
       var drivername=[];
       var drivernumber=[];
       var driverlocality=[];
       var localityname=[];
       var localitypushid=[];
       var citypushid=[];
       var cityname=[];
       database.ref().child("Masters").child("City")
        .once('value').then(function(snapshot) {
            
            snapshot.forEach(function(data){
                var val = data.val(); 
                citypushid.push(val.PushId);
                cityname.push(val.Name);
            });
            setCityPushId(citypushid)
            setCityName(cityname)
        });
     database.ref().child("DeliveryPartner").orderByChild("Status").equalTo("Active")
        .once('value').then(function(snapshot) {
            driverid=[];
                driverlocality=[];
                drivername=[];
                driverlocality=[];
                localityname=[];
                localitypushid=[];
            
        snapshot.forEach(function(data){
            var val = data.val(); 
            driverid.push(val.UserId);    
            drivername.push(val.Name);
            drivernumber.push(val.MobileNumber);
            driverlocality.push(val.Locality);
        });
        setDriverId(driverid)
        setDriverName(drivername)
        setDriverNumber(drivernumber)
        setDriverLocality(driverlocality)

        // pushid1[$("#zone")[0].selectedIndex]
      
      database.ref().child("Masters").child("Localities")
        .once('value').then(function(snapshot) {
            snapshot.forEach(function(data){
                var val = data.val(); 
                localitypushid.push(val.PushId);
                localityname.push(val.Name);
            });
            setLocalityPushId(localitypushid)
            setLocalityName(localityname)
            database.ref().child("Orders")
            .orderByChild("Status").startAt("2").endAt("3")
            .on('value', function(snapshot){
                if(snapshot.exists()){
                // $('#datatable').empty();
                var content = [];
                
                snapshot.forEach(snap=>{
                    content.push(snap.val());
                     
                  });
                  setUsers(content);
                }
            });    
        });
        })
        return () => {
            window.removeEventListener('message', handleMessage);
          };
    }
    catch(err){
        console.log(err)
    }
        },[])

        // const onChangeSelectHandler=(event)=>{
        //     setOption(event.target.value)
        //     users.map((item,id)=>{
        //         if(event.target.id===item.PushId){
        //             item.Status = event.target.value
        //         }
        //     })
        // }

        const  onChangeHandler=(event)=>{
            setSearchTerm(event.target.value);
           }
           const handleMessage = (event) => {
            if (event.data.action === 'receipt-loaded') {
              setIsLoading(false);
            }
          };
           const printIframe = (id) => {
            const iframe = document.frames
              ? document.frames[id]
              : document.getElementById(id);
            const iframeWindow = iframe.contentWindow || iframe;
        
            iframe.focus();
            iframeWindow.print();
        
            return false;
          };
         const printDocument=(event)=> {  
            const input = document.getElementById('datatable');  
            html2canvas(input)  
              .then((canvas) => {  
                var imgWidth = 200;  
                var pageHeight = 290;  
                var imgHeight = canvas.height * imgWidth / canvas.width;  
                var heightLeft = imgHeight;  
                const imgData = canvas.toDataURL('image/png');  
                const pdf = new jsPDF('p', 'mm', 'a4')  
                var position = 0;  
                var heightLeft = imgHeight;  
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
                pdf.save("AssignDriver.pdf");  
              });  
          }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Driver Management" title="Assign Driver"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h6> Assign Driver</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-8">
                         <label className="form-label">Search </label>
                             <input type="text" value={searchTerm} onChange={onChangeHandler}  required="" className="form-control" placeholder="Search for Delivery Partner ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-6 text-right" style={{margin: "3%"}}>
                <div className="dt-buttons btn-group">       
                <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="AssignDriver"  
                sheet="AssignDriver"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/AssignDriver-table"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatable')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
                </div>
                </div>
                    <Col sm="12">
                        <Card>
                            <div className="table-responsive text-nowrap" style={{ overflowX:"scroll"}}   >
                                
                                <Table id="datatable"  data-toolbar="#bootstrap-table-toolbar" className="datatables-demo table table-striped table-bordered" style={{tablelayout: "auto"}}>
                                    <thead >
                                        <tr>
                                            <th scop="col">SL.NO</th>
                                            <th scop="col">Order Date	</th>
                                            <th scop="col">Order Number	</th>
                                            <th scop="col">Customer Name	</th>
                                            <th scop="col">Customer Number	</th>
                                            <th scop="col">Location</th>
                                            <th scop="col">Cloud Kitchen Id		</th>
                                            <th scop="col">CK Locality	</th>
                                            <th  scop="col">CK City	</th>
                                            <th scop="col">Delivery Partner	</th>
                                            <th scop="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(orders =>
                                            orders.OrderNo.includes(searchTerm)).map((item,id)=>{
                                                // for (var i=0;i<driverNumber.length;i++){
                                                    console.log(item)
                                                    for (var i=0;i<driverNumber.length;i++){

                                                     if(driverLocality[i] === item.ChefLocality){
                                                    return(
                                                        <tr key={id}>
                                                            
                                                            <td>{id+1}</td>
                                                            <td className="">{item.OrderDateTime}</td>
                                                            <td className="">{item.OrderNo}</td>
                                                            <td className="">{item.CName}</td>
                                                            <td className="">{item.Number}</td>
                                                            <td className="">{item.Address}</td>
                                                            <td className="">{item.Chef}</td>
                                                            <td className="">{localityName[localityPushId.indexOf(item.ChefLocality)]}</td>
                                                            <td className="">{cityName[cityPushId.indexOf(item.ChefCity)]}</td>
                                                            <td className="item_delivery"><select className="form" id="items"><option>Select</option>
                                                            <option value={driverId[i]}>{ driverName[i]}{" - "} {driverNumber[i]}</option>
                                                            </select></td>
                                                           <td className="item_pushid" style={{display:"none"}}><textarea type="text" className="name" rows="1" cols="30">{item.Pushid}</textarea></td>
                                                           <td className="actions" style={{textAlign:"center"}}><a href="#" className="update-row"><button type="button" className="btn btn-success btn-sm"><Check size={15}/></button></a></td>                                                            <td className="">{item.LocalityName}</td>

                                                        </tr>
                                                    )}}
                                                    // else{
                                                    //     return(
                                                    //         <tr key={id}>
                                                            
                                                    //         <td>{id+1}</td>
                                                    //         <td className="">{item.OrderDateTime}</td>
                                                    //         <td className="">{item.OrderNo}</td>
                                                    //         <td className="">{item.CName}</td>
                                                    //         <td className="">{item.Number}</td>
                                                    //         <td className="">{item.Address}</td>
                                                    //         <td className="">{item.Chef}</td>
                                                    //         <td className="">{localityName[localityPushId.indexOf(item.ChefLocality)]}</td>
                                                    //         <td className="">{cityName[cityPushId.indexOf(item.ChefCity)]}</td>
                                                    //         <td className="item_delivery">
                                                    //             <select className="form" id="items">
                                                    //                 <option>Select</option>
                                                    //                 <option value={driverId}>{ driverName}{" - "} {driverNumber}</option>
                                                    //         </select></td>
                                                    //        <td className="item_pushid" style={{display:"none"}}><textarea type="text" className="name" rows="1" cols="30">{item.Pushid}</textarea></td>
                                                    //        <td className="actions" style={{textAlign:"center"}}><a href="#" className="update-row"><button type="button" className="btn btn-success btn-sm"><Check size={15}/></button></a></td>                                                            <td className="">{item.LocalityName}</td>

                                                    //     </tr>
                                                    //     )
                                                    // }
                                                    
                                              
                                                }
                                                    
                                                // }
                                                )}
                                
                                    </tbody>
                                </Table>
                                
                            </div>
                        </Card>
                    </Col>
                   
                    </Row>
                </Container> 
        </Fragment>
            );
        };
        
export default AssignDriverTable;