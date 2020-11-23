import React, { Fragment,useEffect,useState } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table} from "reactstrap";
import app,{storage}from '../../data/base'

const AddChefPhoto = () => {
    const [imageAsFile, setImageAsFile] = useState('')
    const [name,setName] = useState("")
    const [imageAsUrl, setImageAsUrl] = useState({imgUrl:""})
    const [Cid,setCid] = useState([])
    useEffect(() => {
        async function  fileAsSave(){
        var cid=[]
        var firebaseref1= await app.database().ref().child("CloudKitchen");
        return firebaseref1.once('value').then(function(snapshot) {
            snapshot.forEach(function(data){
                var val = data.val(); 
                cid.push(val.UserId);
            });
        //     $("#city").autocomplete({
        //         source: cid
        //       });
              setCid(cid)
        });
    }
    fileAsSave()
        
    }, [app])
    console.log(imageAsFile)
    const onChangeHandler=(event)=>{
     setName(event.target.value)
    }
     const onDrop = (event) => {
 
         const image = event.target.files[0]
         setImageAsFile(imageFile => (image))
     }
 
     const onSubmitHandler=(event)=>{
         event.preventDefault()
         if(imageAsFile==''){
            alert("Add Passport Size photo");
            return;
        }
         if(name==""){
            alert('Enter Chef Id');
            return;
        }

        if(imageAsUrl==''){
            alert('Wait for the Image to Upload');
            return;
        }
         console.log('start of upload')
         if(imageAsFile === '' ) {
             console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
           }
           const uploadTask = storage.ref(`/${name}/${imageAsFile.name}`).put(imageAsFile)
           uploadTask.on('state_changed', 
           (snapShot) => {
             //takes a snap shot of the process as it is happening
             console.log(snapShot)
           }, (err) => {
             //catches the errors
             console.log(err)
           }, () => {
             // gets the functions from storage refences the image storage in firebase by the children
             // gets the download url then sets the image from firebase as the value for the imgUrl key:
             storage.ref(name).child(imageAsFile.name).getDownloadURL()
              .then(fireBaseUrl => {
                 var firebaseref=app.database().ref().child("CloudKitchen").child(name);
                 firebaseref.child("PP").set(fireBaseUrl);
                 setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
             
              })
              .then(()=>{setImageAsUrl({imgUrl:""})})
              
           })
           
           
           setName("")
     
     }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Chef Management" title="Add Chef Profile Photo"/>
            <Container fluid={true}>
                <Row>
                <Col sm ="12">
               <CardHeader>
               <h6>Add Profile Pic</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                 </CardHeader>
               </Col>
               <CardBody>
               <div class="form-group row">
                     <label className="col-form-label col-sm-2 text-sm-right">Enter Chef Id</label>
                    <div className="col-sm-8">
                    <div className="row">
                     <div className="col-lg-6 col-md-5 col-sm-5">
                    <input type="text" id="city" value={name} onChange={onChangeHandler} className="form-control"/>
                    </div>
                    </div>
                     <div className="clearfix"></div>
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-form-label col-sm-2 text-sm-right">Enter Profile Photo</label>
                    <div className="col-sm-8">
                     <input type="file" name="file" onChange={onDrop} className="form-control" id="image" />
                    <div className="clearfix"></div>
                    </div>
                   </div>
                   <Row style={{margin:"0%"}}>
                    <div className="col-sm-10 ml-sm-auto">
                    <button type="submit" id="submit" onClick={onSubmitHandler} className="btn btn-primary">Submit</button>
                    </div>
                    </Row>
                    </CardBody>
                    </Row>
                    </Container>
                    </Fragment>
                    );
                 };
            export default AddChefPhoto;
                                        
               