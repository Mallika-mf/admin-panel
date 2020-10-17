
import React, { Fragment,useState } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,CardHeader,CardBody,Button} from "reactstrap";
import app,{storage}from '../../data/base'


const Banner = () => {
    const [imageAsFile, setImageAsFile] = useState('')
   const [name,setName] = useState("")
   const [imageAsUrl, setImageAsUrl] = useState({imgUrl:""})

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
                var firebaseref=app.database().ref().child("AppContent").child("HomePage").child("Banner");
                firebaseref.child(name).set(fireBaseUrl);
                setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            
             })
             .then(()=>{setImageAsUrl({imgUrl:""})})
             
          })
          
          
          setName("")
    
    }

  
       return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Settings" title="Banners"/>
            <Container fluid={true}>
                <CardHeader>
                    <h6>HomePage Banners</h6>
                </CardHeader>
                <Row>
               <CardBody>
              
              <div class="form-group row">
              <label class="col-form-label col-sm-2 text-sm-right">Banner Number</label>
             <div class="col-sm-10">
              <select id="banner" value={name} onChange={onChangeHandler} class="form-control">
            <option value="Select">Select</option>
            <option value="Baner1">Baner1</option>
            <option value="Baner2">Baner2</option>
            <option value="Baner3">Baner3</option>
            <option value="Baner4">Baner4</option>
                        </select>
                         <div class="clearfix"></div>
                          </div>
                          </div>


                   <div class="form-group row">
                  <label class="col-form-label col-sm-2 text-sm-right">Upload Image</label>
                  <div class="col-sm-10">
                  <input type="file" name="file" onChange={onDrop} required/>
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
        
export default Banner;