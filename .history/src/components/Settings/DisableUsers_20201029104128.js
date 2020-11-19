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
const DisableUser = () => {
    const [users,setUsers] = useState([])
    const [show,setShow] = useState(true)


    useEffect(()=>{
        try{
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            var database = app.database();
            database.ref().child("Users").orderByChild("JoiningDate").equalTo(today)
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
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Disable User"/> 
        <Container fluid={true}>
        <Row>
        <Col className="col-xl-12">
            <Card>
                <CardHeader>
                    <h6>Users Report</h6>
                </CardHeader>
                <Col sm="12">
                        <Card>
                           <CardBody>
                            <div className="table-responsive">
                                <Table className="datatables-demo table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">UserId </th>
                                            <th scope="col">UserName</th>
                                            <th scope="col">User Number</th>
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
                                           if(item.Reason != null){
                                            if(set==="YES"){
                                                    return(
                                                        <tr key={id}> 
                                                        <td>{id+1}</td>                                                                                                            
                                                       <td className="item_locality">{item.UserName}</td>
                                                       <td className="">{item.Name}</td>
                                                       <td className="">{item.Number}</td>
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
                                                           <td className="item_locality">{item.UserName}</td>
                                                           <td className="">{item.Name}</td>
                                                           <td className="">{item.Number}</td>
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
                                                               <td className="item_locality">{item.UserName}</td>
                                                               <td className="">{item.Name}</td>
                                                               <td className="">{item.Number}</td>
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
                                                                   <td className="item_locality">{item.UserName}</td>
                                                                   <td className="">{item.Name}</td>
                                                                   <td className="">{item.Number}</td>
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
                                                }
                                                     )}
                                    </tbody>
                                    </Table>
                                    </div>
                                    </CardBody>
                                    </Card>
                                    </Col>
                                    </Card>
                                    </Col>
        </Row>
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} className="sweet-loading">
                                     <BeatLoader
                                         css={override}
                                        size={30}
                                        margin={5}
                                        color={"#F10542"}
                                        loading={show}
                                        />
                                    </div>
        </Container>
        </Fragment>
    )}
    export default DisableUser;