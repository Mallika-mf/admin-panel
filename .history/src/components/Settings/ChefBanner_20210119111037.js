
import React, { Fragment,useState } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,CardHeader,CardBody,Button} from "reactstrap";
import app,{storage}from '../../data/base'


const ChefBanner = () => {
    const [imageAsFile, setImageAsFile] = useState('')
   const [name,setName] = useState("")
   const [imageAsUrl, setImageAsUrl] = useState("")

   console.log(imageAsFile)
   const onChangeHandler=(event)=>{
    setName(event.target.value)
   }
    const onDrop = (event) => {

        const image = event.target.files[0]
        setImageAsFile(imageFile => (image))
        console.log('start of upload')
        if(image === '' ) {
          alert("Add Chef Baner Image");
        }
          const metadata = {
            contentType: image.type
            };
          const uploadTask = storage.ref("/ChefDetailsBanners/").child(name).put(image,metadata)
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
            storage.ref("/ChefDetailsBanners/").child(name).getDownloadURL()
             .then(fireBaseUrl => {
                setImageAsUrl(fireBaseUrl)
            
             })             
          })
          
    }

    const onSubmitHandler=(event)=>{
        // event.preventDefault()
        if(name===""){
          alert("Select  Baner Name");
          return;
        }
        if(imageAsUrl==""){
          alert("Please Wait for image to upload");
          return;
      }
      var firebaseref=app.database().ref().child("AppContent").child("ChefDetailsBanners")
      firebaseref.child(name).set(imageAsUrl);
          
          setImageAsUrl("")
          setName("")
          alert("Successfully Added");

    
    }

  
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title="ChefBanners"/>
            <Container fluid={true}>
                <CardHeader>
                    <h6>Chef/Local ChefBanners</h6>
                </CardHeader>
                <Row>
               <CardBody>
              
              <div class="form-group row">
              <label class="col-form-label col-sm-2 text-sm-right">ChefBanner Number</label>
             <div class="col-sm-4">
              <select id="ChefBanner" value={name} onChange={onChangeHandler} class="form-control">
            <option value="Select">Select</option>
            <option value="Chef">Chef</option>
            <option value="Local">Local</option>
            
                        </select>
                         <div class="clearfix"></div>
                          </div>
                          </div>


                   <div class="form-group row">
                  <label class="col-form-label col-sm-2 text-sm-right">Upload Image</label>
                  <div class="col-sm-10">
                  <input type="file"  onChange={onDrop} required/>
                  <p>ChefBanner Size: 320 * 150</p>
                  {/* <img src={imageAsUrl.imgUrl} alt="image tag" /> */}
                     <div class="clearfix"></div>
                          </div>
                              </div>
                                <div class="form-group row">
                                 <div class="col-sm-10 ml-sm-auto">
                                 <Button color="warning" onClick={onSubmitHandler} >Submit</Button> 
                               </div>
                       </div>
                  
                   {/* */}
              </CardBody>
                    </Row>
                </Container> 
        </Fragment>
            );
        };
        
export default ChefBanner;