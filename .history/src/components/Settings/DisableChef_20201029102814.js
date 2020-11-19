import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Table } from 'reactstrap'
import { Save} from 'react-feather'
import app from '../../data/base'
import Pagination from "react-js-pagination";

import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const DisableChef = () => {
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
            database.ref().child("CloudKitchen")
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
    const todosPerPage = 10;
    const [ activePage, setCurrentPage ] = useState( 1 );
    
    // Logic for displaying current todos
    const indexOfLastTodo  = activePage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos     = users.slice( indexOfFirstTodo, indexOfLastTodo );
    
    const renderTodos =   currentTodos.map((item,id)=>{
        var set=0;
        if(item.AStatus==="Active")
        set="YES";
        else
        set="NO"; 
        return(
            <tr key={id}> 
            <td>{id+1}</td>                                                                                                            
           <td className="item_locality">{item.UserId}</td>
           <td className="">{item.Name}</td>
           <td className="">{item.MobileNumber}</td>
           <td className="item_locality">{cName[cPushId.indexOf(item.City)]}</td>
           <td className="item_locality">{item.LocalityName}</td>
           {item.Reason !== null?
            <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30">{item.Reason}</textarea></td>:
            <td className="item_reason"><textarea type="text" className="crop" rows="1" cols="30">{""}</textarea></td>

            }
           <td className="item_activate"><select className="form" id="status">
               {set=="YES"?
               <>
               <option value="Active">{"Enabled"}</option>
               <option value="InActive">{"Disabled"}</option>
               </>:
               <>
               <option value="Active">{"Disabled"}</option>
               <option value="InActive">{"Enabled"}</option>
               </>
               }    
           </select>&nbsp;</td>
           <td className="actions" style={{textAlign:"center"}}><Save size={15}/></td>
         </tr> 
        )
            })
        
         const handlePageChange = ( pageNumber ) => {
          console.log( `active page is ${ pageNumber }` );
          setCurrentPage( pageNumber )
       };
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Disable Chef"/> 
        <Container fluid={true}>
        <Row>
        <Col className="col-xl-12">
            <Card>
                <CardHeader>
                    <h6>Chefs Report</h6>
                </CardHeader>
                <Col sm="12">
                        <Card>
                           <CardBody>
                            <div className="table-responsive text-nowrap">
                                <Table className="datatables-demo table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Chef ID		</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Number</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Zone</th>
                                            <th scope="col">Reason for Disable	</th>
                                            <th scope="col">Status	</th>
                                            <th scope="col">Action	</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {renderTodos}
                                    </tbody>
                                    </Table>
                                    </div>
                                    <div className="pagination">
                                   <Pagination
                                      activePage={ activePage }
                                      itemsCountPerPage={ 10 }
                                      totalItemsCount={ users.length }
                                      pageRangeDisplayed={ 10 }
                                      onChange={ handlePageChange }
                                   />
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
    export default DisableChef;