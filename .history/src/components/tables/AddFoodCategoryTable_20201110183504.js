import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,Table} from "reactstrap";
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather';
import app from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {useHistory} from 'react-router-dom'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";
const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
const AddFoodCategoryTable = () => {
    const [searchValue, setSearchValue] = useState([]);
    const [name, setName] = useState("");
    const history = useHistory()
    const [textName,setTextName] = useState("")
    const [show,setShow] = useState(true)

    useEffect(()=>{
        var database = app.database();
        database.ref().child("Masters").child("FoodType")
        .on('value', function(snapshot){
            if(snapshot.exists()){
                // $('#datatable').empty();
                var content = [];
                
                snapshot.forEach(snap=>{
                    content.push(snap.val());
                  });
                //   content.map(item=>setTextName(item.Name))
                  setSearchValue(content);
                  setShow(false)

                }else{
                    const timeout = setTimeout(() => {
                        setShow(false)
                      }, 3000);
                      return ()=>{clearTimeout(timeout);}
    
                }
                   
                });
    },[])
    const onChangeHandler=(event)=>{
        setName(event.target.value)
    }

    const onSubmitHandler=(event)=>{
       
        if(name.length==0){
            alert('Enter Food Type');
            return;
        }
       
        var firebaseref=app.database().ref().child("Masters").child("FoodType").push();
        firebaseref.child("Name").set(String(name))
        firebaseref.child("PushId").set(firebaseref.getKey());
         
   
   
           Swal.fire({
               title: "Successfully Created!",
               icon: "success",
               confirmButtonText: "Ok" 
              });
              setName("")
    }
    const onChangeTextHandler = (event) =>{
        setTextName(event.target.value)
        console.log(event.target.value)
        searchValue.map((item,id)=>{
            if(event.target.id===item.PushId){
                item.Name=event.target.value
            }
        })
    
    }

    const onClickUpdateHandler=(event)=>{
        const pushId=event.target.id

        var firebaseref=app.database().ref().child("Masters").child("FoodType").child(pushId);
        if(textName!==""){
        firebaseref.child("Name").set(textName);
                    }    
        Swal.fire({
            title: "Successfully Updated!",
            icon: "success",
            confirmButtonText: "Ok" 
           });
    }
    const onClickDeleteHandler=(event)=>{
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
                    console.log(localityId)
                         app.database().ref().child("Masters").child("FoodType").child(localityId).remove();
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
    }
    
   
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Food Management" title=" Add Food Category "/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                <CardHeader>
                                <h6>Add Food Category </h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                         </CardHeader>
                    </Col>
                    </Row>
                    <Row style={{margin:"1%"}}>
                    <label className="col-form-label  text-md-right">Enter Food Category Name</label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" id="name" value={name} onChange={onChangeHandler} placeholder="Food Category Name"/>
                     <div className="clearfix"></div>
                    </div>
                    </Row>
                    <Row style={{margin:"1%"}}>
                    <div className="col-sm-10 ml-sm-auto">
                     <button type="submit" id="submit" onClick={onSubmitHandler} className="btn btn-primary">Submit</button>
                     </div>
                     </Row>
                   <Row >
                    <Col sm="12">
                        <Card>
                        <CardHeader>
                                <h6>Food Category </h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                            </CardHeader>
                            <div className="table-responsive">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Food Category</th>
                                            <th scope="col">Action</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {searchValue.map((item,id) => {
                                                return(
                                                    <tr  key={id}>
                                                     <td>  {id+1}  </td>
                                                    <td className="item_Cuisinesname"><textarea id={item.PushId} value={item.Name} onChange={onChangeTextHandler} type="text" className="name" rows="1" cols="30">{item.Name}</textarea></td>
                                                    {/* <td className="item_pushid" style={{display:"none"}}><textarea type="text" class="name" rows="1" cols="30">{item.PushId}</textarea></td> */}
                                                    <td className="actions" style={{textAlign:"center"}}><button  type="button" className="btn btn-success btn-xs"><Check id={item.PushId} onClick={onClickUpdateHandler} size={15}/></button><button type="button"  className="btn btn-danger btn-xs"><Trash id={item.PushId} onClick={onClickDeleteHandler} size={15}/></button></td>
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
                    </Row>
                </Container> 
        </Fragment>
            );
        };
        
export default AddFoodCategoryTable;