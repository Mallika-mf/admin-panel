import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table } from 'reactstrap'
import {Save,Trash} from 'react-feather';
import app from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const CancellactiionReason = () => {
    const [textInput,setTextInput] = useState("")
   const [reason,setReason] = useState("")
   const [user,setUser] = useState([])
   
   useEffect(()=>{
    var database = app.database();
    database.ref().child("Masters").child("CancellationReasons")
    .on('value', function(snapshot){
        if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
                content.push(snap.val());
              });
              setUser(content);
            }
            });
           

},[])
const onChangeHandler=(event)=>{
    setReason(event.target.value)
}

const onChangeTextHandler=(event)=>{
    setTextInput(event.target.value)
    user.map((item,id)=>{
        if(event.target.id===item.PushId){
            item.Name=event.target.value
        }
        return item
    })
}

const onSubmitHandler=(event)=>{
   
    if(reason===''){
        alert('Enter Reason');
        return;
    }
   

    var firebaseref=app.database().ref().child("Masters").child("CancellationReasons").push();
    firebaseref.child("Name").set(String(reason))
    firebaseref.child("PushId").set(firebaseref.getKey());
     

       Swal.fire({
           title: "Successfully Submitted!",
           icon: "success",
           confirmButtonText: "Ok" 
          });
          setReason("")
}
    const onClickDeleteHandler=(event)=>{
        const id=event.target.id
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
                app.database().ref().child("Masters").child("CancellationReasons").child(id).remove();
                Swal.fire({
                    icon: "success",
                    text:"Deleted!"
                });
             }
         });
    
    
        var database = app.database();
        database.ref().child("Masters").child("CancellationReasons")
        .once('value', function(snapshot){
            if(snapshot.exists()){
                var content = [];
                
                snapshot.forEach(function(data){
                    var val = data.val();  
                    content.push(val)
                })
                setUser(content)
            }
        })    
    }
 const onClickSaveHandler=(event)=>{
     const id=event.target.id
     var firebaseref=app.database().ref().child("Masters").child("CancellationReasons").child(id);
     firebaseref.child("Name").set(textInput);
     firebaseref.child("PushId").set(firebaseref.getKey())
     alert('Successfully Updated!');
     var database = app.database();
    database.ref().child("Masters").child("CancellationReasons")
    .once('value', function(snapshot){
        if(snapshot.exists()){
            var content = [];
            
            snapshot.forEach(function(data){
                var val = data.val();  
                content.push(val)
            })
            setUser(content)
        }
    })    
 }
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Cancellation Reasons"/> 
        <Container fluid={true}>
        <Row>
            <Col className="col-xl-12">
            <Card>
                <CardHeader>
                    <h6>Create PromoCode</h6>
                </CardHeader>
                <CardBody>
                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Reason</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="name" value={reason} onChange={onChangeHandler} placeholder="Enter Reason"/>
                <div className="clearfix"></div>
                </div>
                </Row>

                

                <Row className="form-group row">
               <div className="col-sm-10 ml-sm-auto">
             <Button type="submit" id="submit" color="warning" onClick={onSubmitHandler}>Submit</Button>
            </div>
            </Row>
              </CardBody>
            </Card>
            </Col>
        </Row>
            <Row>
            <Col sm="12">
                        <Card>
                           <CardHeader>
                               <h6>Cancellation Reasons Report</h6>
                           </CardHeader>
                           <CardBody>
                            <div className="table-responsive">
                                <Table className="datatables-demo table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col">Reasons	</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {user.map((item,id) => {
                                                return(
                                                    <tr  key={id}>
                                                     <td>  {id+1}  </td>
                                                    <td className="item_Cuisinesname"><textarea id={item.PushId} value={item.Name} onChange={onChangeTextHandler} type="text" className="name" rows="1" cols="30">{item.Name}</textarea></td>
                                                    {/* <td className="item_pushid" style={{display:"none"}}><textarea type="text" class="name" rows="1" cols="30">{item.PushId}</textarea></td> */}
                                                    <td className="actions" style={{textAlign:"center"}}><button type="button" className="btn btn-success btn-xs"><Save id={item.PushId} onClick={onClickSaveHandler} size={15}/></button><button type="button" className="btn btn-danger btn-xs"><Trash id={item.PushId} onClick={onClickDeleteHandler} size={15}/></button></td>
                                                     </tr>
                                                )
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
    )}
    export default CancellactiionReason