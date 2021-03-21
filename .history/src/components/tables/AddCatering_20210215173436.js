import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home, Trash, PlusCircle } from 'react-feather';
import { Container, Row, Col, Button, CardHeader, Table, Input } from "reactstrap";
// import {Check,Trash} from 'react-feather';
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const AddCatering = (props) => {
    const [show, setShow] = useState(false)

    const [search,setSearch] = useState('')
    const [searchValue,setSearchValue] = useState([])
    const [activeSuggestion,setActiveSuggestions] = useState(0)
    const [showSuggestion,setShowSuggestion] = useState(false)
    const [filterSuggestion,setFilterSuggestion] = useState([])
    const [packageNameId,setPackageNameId] = useState("")
    const [packageName,setPackageName] = useState("")
    const [packageItemName,setPackageItemName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [packageType,setPackageType] = useState("")
    const [imageAsUrl,setImageAsUrl] = useState("")

    const onChangeSearchHandler = (event) =>{
        setSearch(event.target.value)
    }

    const onClickSearchHandler = (event) =>{
        app.database().ref().child('CloudKitchen').child(search).child('Packages').once('value',function(snapshot){
            if (snapshot.exists()) {
                var content = [];
                let contentFood = []
                snapshot.forEach(snap => {
                  let val = snap.val()
                  const locker = {
                    PushId: val.PushId,
                    Name: val.Name
                  }
                  content.push(locker); 
                  contentFood.push(val.Name)
                });
                setSearchValue(content)
              }
        })
    }

    const onClickPackageItems = (event)=>{
        setShow(true)
        setActiveSuggestions(0)
        setFilterSuggestion([])
        setShowSuggestion(false)
        setPackageName(event.target.innerText)
        setPackageNameId(event.target.id)
        var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("Packages").child(event.target.id);
        return firebaseref.on('value',function (snapshot) {
          if (snapshot.exists()) {
            let snap = snapshot.val()
            setPackageItemName(snap.Name)
            setDescription(snap.Description)
            setPrice(snap.StartingPrice)
            setPackageType(snap.Type)
            setImageAsUrl(snapshot.val().Image)
          }})}

          const onChangePackageName = (event) => {
            // setShow(true)
            // setShowTable(true)
            // setShowPortionTable(true)
            const filterSuggestions = searchValue.filter(suggestion=>suggestion.Name.toLowerCase().includes(event.target.value.toLowerCase() ))
        
            setActiveSuggestions(0)
            setFilterSuggestion(filterSuggestions)
            setShowSuggestion(true)
            setPackageName(event.target.value)
        
            
          }

          const onChangePackageItemName = (event) =>{
            setPackageItemName(event.target.value)
          }

          const onChangeDescription = (event) =>{
            setDescription(event.target.value)
          }

          const onChangePackageType = (event) =>{
            setPackageType(event.target.value)
          }

          const onChangePrice = (event) =>{
            setPrice(event.target.value)
          }

          const onChangeImage = (event) =>{
            const image = event.target.files[0]
            // setPassportImageAsFile(imageFile => (image))
            if (image === '') {
              console.error(`not an image, the image file is a ${typeof (image)}`)
            }
            const name = (+new Date()) + '-' + image.name;
            const metadata = {
              contentType: image.type
            };
        
            const uploadTask = storage.ref(`Packages/${name}`).put(image, metadata)
            uploadTask.on('state_changed',
              (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
              }, (err) => {
                //catches the errors
                console.log(err)
              }, () => {
                storage.ref("Packages/").child(name).getDownloadURL()
                  .then(fireBaseUrl => {
                    setImageAsUrl(fireBaseUrl)
                    window.temp++
                  })
        
        
              })           
               }

               const onUpdateHandler = (event) => {
    
                if (search === "") {
                  alert("Please Enter Chef Id")
                }
                if (packageItemName === "") {
                  alert("Please Enter Package Name")
                  return
                }
                // if (detail === "") {
                //   alert("Please Enter Item Detail")
                //   return
                // }
                if (description === "") {
                  alert("Please Enter Package Description")
                  return
                }
                // if ( foodTypeList.length===0) {
                //   alert("Select Food Category")
                //   return
                // }
            
                // if (quantity === "") {
                //   alert("Please Enter Approx Grams")
                //   return
                // }
                // if (itemPrice === "") {
                //   alert("Please Enter Mrp Price")
                //   return
                // }
                if (price === "") {
                  alert("Please Enter Package Starting Price")
                  return
                }
                if (packageType === "" || packageType === "Select") {
                  alert("Please Select Package Type")
                  return
                }
                
                if (imageAsUrl === "") {
                  alert("Please Upload Image")
                  return
                }

                var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("Packages").child(packageNameId);
                firebaseref.child("PushId").set(firebaseref.getKey());
                firebaseref.child("Name").set(packageItemName)
                firebaseref.child("Description").set(description)
                firebaseref.child("StartingPrice").set(price)
                firebaseref.child("Type").set(packageType)
                firebaseref.child("Image").set(imageAsUrl)
              
                setPackageItemName("")
                setDescription("")
                setPrice('')
                setPackageType('')
                setImageAsUrl("")
                setSearch("")
                setShow(false)

               
              }
              const onAddCatering = (event) =>{
                if (search === "") {
                    alert("Please Enter Chef Id")
                  }
                  if (packageItemName === "") {
                    alert("Please Enter Package Name")
                    return
                  }
                  // if (detail === "") {
                  //   alert("Please Enter Item Detail")
                  //   return
                  // }
                  if (description === "") {
                    alert("Please Enter Package Description")
                    return
                  }
                  // if ( foodTypeList.length===0) {
                  //   alert("Select Food Category")
                  //   return
                  // }
              
                  // if (quantity === "") {
                  //   alert("Please Enter Approx Grams")
                  //   return
                  // }
                  // if (itemPrice === "") {
                  //   alert("Please Enter Mrp Price")
                  //   return
                  // }
                  if (price === "") {
                    alert("Please Enter Package Starting Price")
                    return
                  }
                  if (packageType === "" || packageType === "Select") {
                    alert("Please Select Package Type")
                    return
                  }
                  
                  if (imageAsUrl === "") {
                    alert("Please Upload Image")
                    return
                  }
  
                  var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("Packages").push();
                  firebaseref.child("PushId").set(firebaseref.getKey());
                  firebaseref.child("Name").set(packageItemName)
                  firebaseref.child("Description").set(description)
                  firebaseref.child("StartingPrice").set(price)
                  firebaseref.child("Type").set(packageType)
                  firebaseref.child("Image").set(imageAsUrl)
                
                  setPackageItemName("")
                  setDescription("")
                  setPrice('')
                  setPackageType('')
                  setImageAsUrl("")
                  setSearch("")
                  setShow(false)

              }

              const onClickDeleteHandler = (event) => {
                setShow(false)
                Swal.fire({
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover it!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Cancel',
                  cancelButtonColor: 'gray'
                })
                  .then((willDelete) => {
                    if (willDelete.value) {
                      app.database().ref().child("CloudKitchen").child(search).child("Packages").child(packageNameId).remove();
                      Swal.fire({
                        icon: "success",
                        text: "Deleted!"
                      });
                    } else if (willDelete.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        'Cancelled',
                        'error'
                      )
                    }
                  });
                  setPackageItemName("")
                  setDescription("")
                  setPrice('')
                  setPackageType('')
                  setImageAsUrl("")
                  setSearch("")
                  setShow(false)
              }
    const onKeyDown = e => {
        if (e.keyCode === 13) {
          setActiveSuggestions(0)
          setShowSuggestion(false)
          setPackageName(filterSuggestion[activeSuggestion])
        }else if (e.keyCode === 38){
          if (activeSuggestion === 0) {
            return;
          }
          setActiveSuggestions(activeSuggestion - 1)
        }else if (e.keyCode === 40) {
          if (activeSuggestion - 1 === filterSuggestion.length) {
            return;
          }
          setActiveSuggestions(activeSuggestion + 1)
    
      }
    }
    
    let suggestionListComponent;
    
    if (showSuggestion && packageName) {
      if (filterSuggestion.length) {
        suggestionListComponent = (
          <ul className="suggestions">
            {filterSuggestion.map((suggestion, index) => {
              let className;
    
              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={index} id={suggestion.PushId}  onClick={onClickPackageItems}>
                  {suggestion.Name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionListComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

  
        
    return(
        <Fragment>
 <BreadCrumb parent={<Home />} subparent="Food Management" title=" Add Food Items " />
      <Container fluid={true}>
        
        <Row className="form-row" style={{ marginTop: "3%" }}>
          <Col className="form-group col-md-6">
            <label className="form-label">Enter Home Chef registration Number</label>
            <Row>
              <Col className="col-lg-6 col-md-5 col-sm-5">
                <Input type="text" value={search} onChange={onChangeSearchHandler} className="form-control" />
              </Col>
              <Col className="col-sm-1 col-md-2">
                <span id="search" onClick={onClickSearchHandler} ><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
              </Col>
            </Row>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <CardHeader>
              <h5>Add Catering Packages </h5>
              {/* <span> Use a className <code> table </code> to any table.</span> */}
            </CardHeader>
          </Col>

        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Select Packages (To Edit)</label>
            <input
          type="text"
          className="form-control"
          onChange={onChangePackageName}
          onKeyDown={onKeyDown}
          value={packageName}
        />
        {suggestionListComponent}
            {/* <select value={foodName} onChange={onChangeFoodName} className="form-control">
              <option value="Select">Select</option>
              {searchValue.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}
            </select> */}
            <div className="clearfix"></div>
          </Col>
        </Row>


        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Package Name <span style={{ color: "red" }}>*</span></label>
            <Input type="text" value={packageItemName} onChange={onChangePackageItemName} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">Package Description </label>
            <Input type="text" value={description} onChange={onChangeDescription} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Starting from (Price)</label>
            <input value={price} onChange={onChangePrice} className="form-control"/>
            
            <div className="clearfix"></div>
          </Col>
        </Row> 
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Package Type</label>
            <select value={packageType} onChange={onChangePackageType} className="form-control">
              <option value="Select">Select</option>
                <option value="Veg">Veg</option>
                <option value="NonVeg">NonVeg</option>
                <option value="Egg">Egg</option>

            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>    
        <Row className="form-row">
          <Col className="form-group col-md-6">
            <label className="form-label">Upload Package Image <span style={{ color: "red" }}>*</span></label>
            <Input type="file" onChange={onChangeImage} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <div className="col-sm-1">
            {imageAsUrl === "" ?
              <></> :
              <a href={imageAsUrl} target="_blank" rel="noopener noreferrer">View</a>}
          </div>
        </Row>  
        {show === false ?
          <Button type="submit" onClick={onAddCatering} className="warning">Submit</Button> :
          <>
            <Button type="submit" onClick={onUpdateHandler} className="warning">Update</Button>

            <Button type="submit" onClick={onClickDeleteHandler} className="warning">Delete</Button>
          </>

        }
        </Container>
         </Fragment>
    )
}
export default AddCatering;
