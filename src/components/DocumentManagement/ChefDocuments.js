import React, { Fragment ,useState,useEffect} from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Pagination,PaginationItem,PaginationLink} from "reactstrap";
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather'
import app from '../../data/base'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const ChefDocuments = () => {
    const [searchTerm, setSearchTerm]=useState("")
    const [users,setUsers] = useState([])
    const [show,setShow] = useState(true)

    useEffect(()=>{
  try{
            var database = app.database();
            database.ref().child("CloudKitchen")
        .once('value', function(snapshot){
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
                if(snap.val().Doc1===""){
                    snap.val().Doc1="Not Uploaded"
                }
                if(snap.val().Doc2===""){
                    snap.val().Doc2="Not Uploaded"
                }
                if(snap.val().Doc3===""){
                    snap.val().Doc3="Not Uploaded"
                }
                if(snap.val().Doc4===""){
                    snap.val().Doc4="Not Uploaded"
                }
                if(snap.val().Doc5===""){
                    snap.val().Doc5="Not Uploaded"
                }
                if(snap.val().Doc6===""){
                    snap.val().Doc6="Not Uploaded"
                }
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
}catch(err){console.log(err)}
    },[])
    const  onChangeHandler=(event)=>{
        setSearchTerm(event.target.value);
       }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Document Manager" title="Chef Documents"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                <CardHeader>
                                <h6>Chef Documents</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                            </Col>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-9">
                         <label className="form-label">Search <span style={{color: "red"}}>*</span></label>
                             <input type="text" value={searchTerm} onChange={onChangeHandler}  required=""  className="form-control" placeholder="Search for Chef ID" title="Type in a name"/>
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    <Col sm="12">
                        <Card>
                           
                            <div className="table-responsive text-nowrap">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Chef ID</th>
                                            <th scope="col">Chef Name</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Passport Photo</th>
                                            <th scope="col">Adhar Card</th>
                                            <th scope="col">Pan/Voter</th>
                                            <th scope="col">Passbook/Bank</th>
                                            <th scope="col">FSSAI Certificate</th>
                                            <th scope="col">GST</th>
                 
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {users.map((item,id)=>{  
                                                            return(
                                                                <tr key={id}>
                                                                <td>{id+1}</td>
                                                           <td className="item_userid">{item.UserId}</td>
                                                           <td className="item_locality">{item.Name}</td>
                                                           <td>{item.AStatus}</td>
                                                           <td><a href={item.Doc1} target="_blank">{"View"}</a></td>
                                                           <td><a href={item.Doc2} target="_blank">{"View"}</a></td>
                                                           <td><a href={item.Doc3} target="_blank">{"View"}</a></td>
                                                           <td><a href={item.Doc4} target="_blank">{"View"}</a></td>
                                                           <td><a href={item.Doc5} target="_blank">{"View"}</a></td>
                                                           <td><a href={item.Doc6} target="_blank">{"View"}</a></td>
                                                         </tr> 
                                                                
                                                            )
                                                        
                                                    
                                                
                                                     })}
                                    </tbody>
                    
                                </Table>
                             
                            </div>
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
            );
        };
        
export default ChefDocuments;