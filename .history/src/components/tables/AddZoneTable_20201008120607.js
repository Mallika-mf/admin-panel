import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table} from "reactstrap";
import app from '../../data/base'
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Trash,Save} from 'react-feather';
import Swal from 'sweetalert2/dist/sweetalert2.js'
 import {useHistory} from 'react-router-dom'
import 'sweetalert2/src/sweetalert2.scss'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const AddZoneTable = () => {
    const [show,setShow] = useState(false)
    const [users,setUsers] = useState([])
    const [name,setName] = useState([])
    const history = useHistory()
    const [input,setInput] = useState("")
    const [textName,setTextName] = useState("")
    const [textOption,setTextOption] = useState("")

    const [searchTearm,setSearchTerm] = useState("")
   
    useEffect(()=>{
        async function fetchMyAPI() {
        await app.database().ref().child("Masters").child("City")
            .once('value').then(function(snapshot) {
                var content=[]
                var name = []
                var status=[]
                snapshot.forEach(snap=>{
               
                content.push(snap.val())
                name.push(snap.val.Name)
                status.push(snap.val().Status)
            });
            
                  setName(content)
                  
            });
        }
        fetchMyAPI()
      
    },[app])
    const onChangeInputHandler=(event)=>{
        setInput(event.target.value)
    }
    const  onChangeHandler=(event)=>{
        setShow(true)
        setSearchTerm(event.target.value);
        var database = app.database();
        database.ref().child("Masters").child("Localities")
        .orderByChild("City").equalTo(event.target.value)
        .on('value', function(snapshot){
            if(snapshot.exists()){

                var content = [];
                 snapshot.forEach(snap=>{
                    content.push(snap.val());
                     
                  });
                  content.map(item=>{
                        setTextName(item.Name)
                  
                        setTextOption(item.Status)
                  
                    })
                  setUsers(content)
                  setShow(false)
                }else{
                    const timeout = setTimeout(() => {
                        setShow(false)
                      }, 3000);
                      return ()=>{clearTimeout(timeout);}
    
                }
            })
       }
      const onSubmit=(event)=>{
        event.preventDefault()
        event.preventDefault()
          
        if(searchTearm=="")
        {
            alert("Select City");
           
            return;
        }

        if(input.length==""){
             alert('Enter Zone Name');
             return;
         }
        
       var firebaseref=app.database().ref().child("Masters").child("Localities").push();
            firebaseref.child("Name").set(String(input));
            firebaseref.child("PushId").set(firebaseref.getKey());
            firebaseref.child("Status").set("Active");
            firebaseref.child("City").set(searchTearm);
           
    
            Swal.fire({
                title: "Successfully Created!",
                icon: "success",
                confirmButtonText: "Ok" 
               });
               setInput("")
       }
       const onChangeTextHandler = (event)=>{
        setTextName(event.target.value)
        console.log(event.target.value)
            users.map((item,id)=>{
                if(event.target.id===item.PushId){
                    item.Name=event.target.value
                }
                return(event.target.value)

            })
        }
        const onChangeOptionHandler =(event)=>{
            setTextOption(event.target.value)
            console.log(event.target.value)

            users.map((item,id)=>{
                if(event.target.id===item.PushId){
                    item.Status = event.target.value
                }
                return(event.target.value)
            })
        }
        const onUpdateHandler=(event)=>{
            try{
            var pushId=event.target.id
            console.log(pushId)
            var firebaseref=app.database().ref().child("Masters").child("Localities").child(pushId);
            firebaseref.child("Name").set(String(textName));
            firebaseref.child("PushId").set(firebaseref.getKey());
                firebaseref.child("Status").set(String(textOption));
                Swal.fire({
                    title: "Successfully Updated!",
                    icon: "success",
                    confirmButtonText: "Ok" 
                   });
                }catch(err){
                    console.log(err)
                }
        }
       const onClickDeleteHandler=(event)=>{
           try{
        console.log(event.target.id)
        const localityId=event.target.id
        var superadmin=window.localStorage.getItem('superadmin');
        if(superadmin===null){                      
            superadmin=window.sessionStorage.getItem('superadmin');
            if(superadmin===null){
                history.push(`${process.env.PUBLIC_URL}/login`);
            } 
        }
    
        
    
        if(superadmin=="Yes"){
            Swal.fire({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                cancelButtonColor:'gray'
              })
              .then((willDelete) => {
                if (willDelete.value) {
                         app.database().ref().child("Masters").child("Localities").child(localityId).remove();
                        Swal.fire({
                        icon: "success",
                        text:"Deleted!"
                    });
                 }
             });
        }
        else{
            Swal.fire({
                title: "Disabled",
                text: "The option has been disabled!",
                icon: "warning",
                dangermode: true,
              });
        }
    }catch(err){
        console.log(err)
    }
    }


    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="City Management" title="Add Zone"/>
            <Container fluid={true}>
                   <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h5>Add Zone</h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                    </Col>
                    </Row>
                    <div className="row">
                            <div className="col-md-12">
                                <div className="card mb-4">
                                                <div className="card-body">
                                                    <div className="form-group row">
                                                        <label className="col-form-label col-sm-2 text-sm-right">Select City</label>
                                                        <div className="col-sm-8">
                                                            <select className="form-control" id="city" value={searchTearm} onChange={onChangeHandler}>
                                                                <option value="Select">Select</option>
                                                                {name.map((item,id)=>{ 
                                                                 return  (<option key={id} value={item.PushId}>{item.Name}</option>)
                                                             })}
                                                            </select>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>

                                                        <div className="form-group row">
                                                            <label className="col-form-label col-sm-2 text-sm-right">Enter Zone Name</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" className="form-control" value={input} onChange={onChangeInputHandler}
                                                                 placeholder="Zone Name"/>
                                                                <div className="clearfix"></div>
                                                          </div>
                                                        </div>
  

                                                        <div className="form-group row">
                                                            <div className="col-sm-10 ml-sm-auto">
                                                                <button type="submit" onClick={onSubmit} className="btn btn-primary">
                                                                         Submit
                                                                     </button>
                                                            </div>
                                                        </div>
                                        

                                    </div>
                                </div>
                                </div>
                                </div>
                    <Row>
                    <Col sm="12">
                    <CardHeader>
                                <h5>Locality List</h5>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                        <Card>
                            <div className="table-responsive text-nowrap" style={{ overflowX:"scroll"}}   >
                                
                                <Table>
                                    <thead >
                                        <tr>
                                            <th >SL.NO</th>
                                            <th >Zone</th>
                                            <th >Status</th>
                                            <th >Active</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((item,id)=>{
                                         var set=0;
                                               
                                         
                                         if(item.Status=="Active")
                                         set="Active";
                                         else
                                         set="InActive"
                                         if(set=="Active"){
                                            return(
                                                <tr key={id}>
                                                    <td>{id+1}</td>
                                                   <td className="item_name"><textarea type="text" id={item.PushId} value={item.Name} onChange={onChangeTextHandler} className="crop" rows="1" cols="30">{item.Name}</textarea></td>
                                                   <td className="item_status"><select id={item.PushId} value={item.Status} onChange={onChangeOptionHandler} className="form-control">
                                                       <option value="Active">{"Active"}</option>
                                                       <option value="InActive">{"InActive"}</option>
                                                       </select>
                                                    </td>
                                                    <td className="actions" ><Save id={item.PushId} onClick={onUpdateHandler} size={15}/>&nbsp;&nbsp;<Trash id={item.PushId} onClick={onClickDeleteHandler} size={15}/></td>

                                                </tr>
                                            )
                                         }
                                         else{
                                                    return(
                                                        <tr key={id}>
                                                            <td>{id+1}</td>
                                                            <td className="item_name"><textarea type="text" id={item.PushId} value={item.Name} onChange={onChangeTextHandler} className="crop" rows="1" cols="30">{item.Name}</textarea></td>
                                                           {/* <td className="item_pushid" style={{display:"none"}}><textarea type="text" value={item.PushId} className="crop" rows="1" cols="30">{item.PushId}</textarea></td> */}
                                                           <td className="item_status"><select id={item.PushId} value={item.Status} onChange={onChangeOptionHandler} className="form-control">
                                                           <option value="InActive">{"InActive"}</option>
                                                           <option value="Active">{"Active"}</option>
                                                               </select></td>
                                                              <td className="actions" ><Save id={item.PushId} onClick={onUpdateHandler} size={15}/>&nbsp;&nbsp;<Trash id={item.PushId} onClick={onClickDeleteHandler} size={15} /></td>
                                                        </tr>
                                                    )
                                                    }
                                                }
                                                )}
                                       
                                    </tbody>
                                </Table>
                                
                            </div>
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
            );
        };
        
export default AddZoneTable;