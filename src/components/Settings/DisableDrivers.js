import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Table } from 'reactstrap'
import {Save} from 'react-feather'
import app from '../../data/base'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const DisableDriver = () => {
    const [users,setUsers] = useState([])
    const [cName,setCname] = useState([])
    const [cPushId,setcPushid] = useState([])
    const [show,setShow] = useState(true)

    useEffect(()=>{
        try{
            var cpushid=[];
            var cname=[];
            app.database().ref()
            .child("Masters").child("City")
            .once('value', function(snapshot){
                if(snapshot.exists()){
                    // var content = '';
                    // var sn;
                    // sn=0;
                    snapshot.forEach(function(data){
                        var val = data.val();      
                        cpushid.push(val.PushId);   
                        cname.push(val.Name);   
                    });
                }
               setcPushid(cpushid)
                setCname(cname)
        
        });
       
            var database = app.database();
            database.ref().child("DeliveryPartner")
        .orderByChild("AStatus")
            .once('value', function(snapshot){
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
                content.push(snap.val());
                 
              });
              setUsers(content);
              setShow(false)

            }else{
                const timeout = setTimeout(() => {
                    setShow(false)
                  }, 3000);
                  return ()=>{clearTimeout(timeout);}

            }
        
    })
 }catch(err){
     console.log(err)
 }
    },[])
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Disable Delivery Partner"/> 
        <Container fluid={true}>
        <Row>
        <Col className="col-xl-12">
            <Card>
                <CardHeader>
                    <h6>Delivery Report</h6>
                </CardHeader>
                <Col sm="12">
                        <Card>
                           <CardBody>
                            <div className="table-responsive text-nowrap">
                                <Table className="datatables-demo table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">City </th>
                                            <th scope="col">Delivery Partner ID	</th>
                                            <th scope="col">Delivery Partner Name	</th>
                                            <th scope="col">Delivery Partner Number	</th>
                                            <th scope="col">Reason for Disable	</th>
                                            <th scope="col">Status	</th>
                                            <th scope="col">Action	</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((item,id)=>{
                                        var set=0;
                                        if(item.AStatus==="Active")
                                        set="YES";
                                        else
                                        set="NO"; 
                                        if(item.UserId===null || item.Name===null ||item.MobileNumber===null || item.City===null ){
                                            if(item.Reason != null){
                                                if(set==="YES"){
                                                        return(
                                                            <tr key={id}> 
                                                            <td>{id+1}</td>                                                                                                            
                                                            <td className="item_locality">{"undefined"}</td>
                                                                       <td className="">{"undefined"}</td>
                                                                       <td className="">{"undefined"}</td>
                                                                       <td className="item_locality">{"undefined"}</td>
                                                           <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30">{item.Reason}</textarea></td>
                                                           <td className="item_activate"><select className="form" id="status">
                                                               <option value="Active">{"Enabled"}</option>
                                                               <option value="InActive">{"Disabled"}</option>
                                                           </select>&nbsp;</td>
                                                           <td className="actions" style={{textAlign:"center"}}><Save size={15}/></td>
                                                         </tr> 
                                                        )
                                                        }else {
                                                            return(
                                                                <tr key={id}> 
                                                                <td>{id+1}</td>                                                                                                            
                                                                <td className="item_locality">{"undefined"}</td>
                                                                       <td className="">{"undefined"}</td>
                                                                       <td className="">{"undefined"}</td>
                                                                       <td className="item_locality">{"undefined"}</td>
                                                               <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30">{item.Reason}</textarea></td>
                                                               <td className="item_activate"><select className="form" id="status">
                                                               <option value="Active">{"Disabled"}</option>
                                                               <option value="InActive">{"Enabled"}</option>
                                                           </select>&nbsp;</td>
                                                               <td className="actions" style={{textAlign:"center"}}><Save size={15}/></td>
                                                             </tr> 
                                                            )
                                                        } }else{
                                                            if(set==="YES"){
                                                                return(
                                                                    <tr key={id}> 
                                                                    <td>{id+1}</td>                                                                                                            
                                                                    <td className="item_locality">{"undefined"}</td>
                                                                       <td className="">{"undefined"}</td>
                                                                       <td className="">{"undefined"}</td>
                                                                       <td className="item_locality">{"undefined"}</td>
                                                                <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30"></textarea></td>
                                                                   <td className="item_activate"><select className="form" id="status">
                                                                       <option value="Active">{"Enabled"}</option>
                                                                       <option value="InActive">{"Disabled"}</option>
                                                                   </select>&nbsp;</td>
                                                                   <td className="actions" style={{textAlign:"center"}}><Save size={15}/></td>
                                                                 </tr> 
                                                                )
                                                                }else {
                                                                    return(
                                                                        <tr key={id}> 
                                                                        <td>{id+1}</td>                                                                                                            
                                                                       <td className="item_locality">{"undefined"}</td>
                                                                       <td className="">{"undefined"}</td>
                                                                       <td className="">{"undefined"}</td>
                                                                       <td className="item_locality">{"undefined"}</td>
                                                                       <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30"></textarea></td>
                                                                       <td className="item_activate"><select className="form" id="status">
                                                                       <option value="Active">{"Disabled"}</option>
                                                                       <option value="InActive">{"Enabled"}</option>
                                                                   </select>&nbsp;</td>
                                                                       <td className="actions" style={{textAlign:"center"}}><Save size={15}/></td>
                                                                     </tr> 
                                                                    )
                                                                } 
                                                        }
                                                         
                                                        
                                        }else{
                                        if(item.Reason != null){
                                            if(set==="YES"){
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                           
                                                        <td className="item_locality">{cName[cPushId.indexOf(item.City)]}</td>                                                                                                                    
                                                       <td className="item_locality">{item.UserId}</td>
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.MobileNumber}</td>
                                                       <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30">{item.Reason}</textarea></td>
                                                       <td className="item_activate"><select className="form" id="status">
                                                           <option value="Active">{"Enabled"}</option>
                                                           <option value="InActive">{"Disabled"}</option>
                                                       </select>&nbsp;</td>
                                                       <td className="actions" style={{textAlign:"center"}}><Save size={15}/></td>
                                                     </tr> 
                                                    )
                                                    }else {
                                                        return(
                                                            <tr key={id}> 
                                                            <td>{id+1}</td>              
                                                        <td className="item_locality">{cName[cPushId.indexOf(item.City)]}</td>                                   
                                                           <td className="item_locality">{item.UserId}</td>
                                                           <td className="">{item.Name}</td>
                                                           <td className="">{item.MobileNumber}</td>
                                                           <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30">{item.Reason}</textarea></td>
                                                           <td className="item_activate"><select className="form" id="status">
                                                           <option value="Active">{"Disabled"}</option>
                                                           <option value="InActive">{"Enabled"}</option>
                                                       </select>&nbsp;</td>
                                                           <td className="actions" style={{textAlign:"center"}}><Save size={15}/></td>
                                                         </tr> 
                                                        )
                                                    } }else{
                                                        if(set==="YES"){
                                                            return(
                                                                <tr key={id}> 
                                                                <td>{id+1}</td>        
                                                                <td className="item_locality">{cName[cPushId.indexOf(item.City)]}</td>                                                                                                                                       
                                                               <td className="item_locality">{item.UserId}</td>
                                                               <td className="">{item.Name}</td>
                                                               <td className="">{item.MobileNumber}</td>
    
                                                            <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30"></textarea></td>
                                                               <td className="item_activate"><select className="form" id="status">
                                                                   <option value="Active">{"Enabled"}</option>
                                                                   <option value="InActive">{"Disabled"}</option>
                                                               </select>&nbsp;</td>
                                                               <td className="actions" style={{textAlign:"center"}}><Save size={15}/></td>
                                                             </tr> 
                                                            )
                                                            }else {
                                                                return(
                                                                    <tr key={id}> 
                                                                    <td>{id+1}</td>         
                                                                    <td className="item_locality">{cName[cPushId.indexOf(item.City)]}</td>                                                                                                                                      
                                                                   <td className="item_locality">{item.UserId}</td>
                                                                   <td className="">{item.Name}</td>
                                                                   <td className="">{item.MobileNumber}</td>
                
                                                                   <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30"></textarea></td>
                                                                   <td className="item_activate"><select className="form" id="status">
                                                                   <option value="Active">{"Disabled"}</option>
                                                                   <option value="InActive">{"Enabled"}</option>
                                                               </select>&nbsp;</td>
                                                                   <td className="actions" style={{textAlign:"center"}}><Save size={15}/></td>
                                                                 </tr> 
                                                                )
                                                            } 
                                                    }
                                                     }}
                                                     )}
                                    </tbody>
                                    </Table>
                                    </div>
                                    </CardBody>
                                    </Card>
                                    </Col>
                                    </Card>
                                    </Col>
                                    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} className="sweet-loading">
                                     <BeatLoader
                                         css={override}
                                        size={30}
                                        margin={5}
                                        color={"#F10542"}
                                        loading={show}
                                        />
                                    </div>
        </Row>
        </Container>
        </Fragment>
    )}
    export default DisableDriver;