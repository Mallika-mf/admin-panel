import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home, Trash, ChevronRight, ArrowDownLeft, ArrowLeft } from 'react-feather';
import { Container, Row, Col, Button, CardHeader, CardBody, Input,Table, Card } from "reactstrap";
// import {Check,Trash} from 'react-feather';
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Image, Badge, Modal } from "react-bootstrap";

const CateringList = (props) => {
    const [search, setSearch] = useState('')
    const [searchValue, setSearchValue] = useState([])
    const [catering, setCatering] = useState('')
    const [itemMenu,setItemMenu] = useState([])
    const [showCustomize, setShowCustomize] = useState(false)
    const [show, setShow] = useState(false);
    const [pushId,setPushId] = useState('')
    const [menu,setMenu] = useState('')
    const [menuName,setMenuName] = useState('')
    const [addMenu,setAddMenu] = useState('')
    const [addPrice,setAddPrice] = useState('')
    const [menuList,setMenuList] = useState([])

    const [showMenu,setShowMenu] = useState(false)


   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const onChangeMenu = (event)=>{
        setMenu(event.target.value)
    }
    const onAddMenu = (event) => {
        console.log(pushId)
        app.database().ref().child('CloudKitchen').child(search).child("Packages").child(pushId).child('ItemMenu').set([...itemMenu, menu].join())
        setShow(false)

    };

    const onDeleteMenu = (index) => {
        const newData = itemMenu.filter((_, item) => {
          return (
            item !== index
          )
    
        })
        setItemMenu(newData)
        app.database().ref().child('CloudKitchen').child(search).child('Packages').child(pushId).child('ItemMenu').set(newData.join())
    
      }
    const onChangeSearchHandler = (event) => {
        setSearch(event.target.value)
    }

    

    const onClickSearchHandler = (event) => {
        // for(var i=0;i<cNO.length;i++){
        //     if(cNO[i]===search){
        app.database().ref().child("CloudKitchen").child(search).once('value', function (snapshot1) {
            if (snapshot1.exists()) {
                if (snapshot1.val().Catering === "Yes") {
                    setCatering(snapshot1.val().Catering)
                    app.database().ref().child('CloudKitchen').child(search).child('Packages').once('value', function (snapshot) {
                        if (snapshot.exists()) {
                            var content = [];
                            let contentFood = []
                            snapshot.forEach(snap => {
                                let val = snap.val()
                                const locker = {
                                    PushId: val.PushId,
                                    Name: val.Name,
                                    Description: val.Description,
                                    Price: val.StartingPrice,
                                    Image: val.Image,
                                    Type: val.Type,
                                    itemMenu: val.itemMenu
                                }
                                content.push(locker);
                                contentFood.push(val.Name)
                            });
                            setSearchValue(content)
                        }
                    })
                } else {
                    Swal.fire({
                        icon: "warning",
                        text: "Please Add Chef into Catering List First !"
                    });
                    return;
                }
            }
        })
    }

    const onCustomize=(event)=>{
        setShowCustomize(true)
        setShowMenu(true)
        setPushId(event.target.id)
        app.database().ref().child('CloudKitchen').child(search).child('Packages').child(event.target.id)
        .on('value',function(snapshot){
            let content=[]
           let itemMenu = snapshot.val().ItemMenu.split(',')
           itemMenu.forEach(snap=>{
               
               content.push(snap)
           })
           console.log(content)
           setItemMenu(content)
        })
    }
    const onBack=(event)=>{
        setShowCustomize(false)
        setShowMenu(false)
    }
    const onClickAddMenuItem = (event) =>{
        setMenuName(event.target.id)
        setShowMenu(true)
        setShowCustomize(false)
        app.database().ref().child("CloudKitchen").child(search).child("Packages").child(pushId).child("Items").orderByChild("Menu").equalTo(event.target.id)
        .on('value',function(snapshot){
            if(snapshot.exists()){
                let content=[]
                snapshot.forEach(snap=>{
                    content.push(snap.val())
                })
                setMenuList(content)
            }
        })
    }
    const onBackToCustomize=()=>{
        setShowMenu(true)
        setShowCustomize(true)
    }

    const onChangeAddMenu=(event)=>{
        setAddMenu(event.target.value)
    }

    const onChangeMenuPrice=(event)=>{
        setAddPrice(event.target.value)
    }
   const  onClickSaveMenu=(event)=>{
    if(event.key==="Enter"){
        if(addMenu===""){
           alert('please add the name of item')
           return;
       }
       if(addPrice===""){
        alert('please add the price of item')
        return;
    }
       let firebaseref = app.database().ref().child("CloudKitchen").child(search).child("Packages").child(pushId).child("Items").push()
       firebaseref.child('PushId').set(firebaseref.getKey())
       firebaseref.child('Menu').set(menuName)
       firebaseref.child('Name').set(addMenu)
       firebaseref.child('Price').set(addPrice)
       setAddPrice('')
       setAddMenu('')
      
    }
    }
    const onClickMenuDelete = (event) =>{
        app.database().ref().child("CloudKitchen").child(search).child("Packages").child(pushId).child("Items").child(event.target.id).remove()

    }
    return (
        <Fragment>
            {showCustomize===false && showMenu===false?
            <>
            <BreadCrumb parent={<Home />} subparent="Food Management" title=" Show Packages " />
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
                            <h5>Show Catering Packages </h5>
                            {/* <span> Use a className <code> table </code> to any table.</span> */}
                        </CardHeader>
                    </Col>

                </Row>
                <Row>
                    {searchValue.map((item, index) => {
                        return (
                            <Col className="form-group col-md-6">
                            <Card>
                                {/* <Row> */}

                                    <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">

                                        <div className="list-card-image">

                                            <div
                                                className={`favourite-heart position-absolute ${item.Type === "Veg" ? "text-green" : item.Type === "NonVeg" ? "text-red" : "text-yellow"}` } style={{color:`${item.Type === "Veg" ? "green" : item.Type === "NonVeg" ? "red" : "yellow"}`}}
                                            >
                                                <i className="fa fa-circle"></i>
                                            </div>

                                            <div
                                                className="card-img-top img-responsive"
                                                style={{
                                                    height: "200px",
                                                    width: "100%",
                                                    overflow: "hidden",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Image
                                                    src={item.Image}
                                                    style={{
                                                        maxWidth: "100%",
                                                        width: "150px",
                                                        objectFit: "cover",
                                                    }}
                                                    className="img-fluid item-img"
                                                    alt="img"
                                                />
                                                
                                            </div>
                                            
                                        </div>
                                        <div className="p-3 position-relative">
                                            <div className="list-card-body">
                                                <h6 className="mb-1">
                                                    {item.Name}
                                                </h6>
                                                {item.Description ? (
                                                    <p className="text-gary mb-3"  style={{color:"gray"}}>{item.Description}</p>
                                                ) : (
                                                        ""
                                                    )}
                                                {item.Price ? (
                                                    <p className="text-black mb-3 time" style={{color:"black"}}>
                                                        {item.Price ? (
                                                            <span className="float-right text-black-50" >
                                                                {"Starting from Rs. "}
                                                                {item.Price}
                                                            </span>
                                                        ) : (
                                                                ""
                                                            )}
                                                    </p>
                                                ) : (
                                                        ""
                                                    )}
                                            </div>


                                        </div>
                                        
                                    </div>
                                    <Button id={item.PushId} onClick={onCustomize}>Customize</Button>

                                    {/* <img src={item.Image} alt="img"/>
                    <h6>{item.Name}</h6>
                    <p style={{color:"gray"}}>{item.Description}</p>
                    <p>Starting from</p>
                    <p>Rs. {item.Price}</p> */}
                                {/* </Row> */}
                            </Card>
                            </Col>

                        )
                    })}
                </Row>
                    
            </Container></>:showCustomize===true && showMenu===true?
                    <>
                    <BreadCrumb parent={<Home />} subparent="Food Management" title=" Add Menu to Highly Delicius " />
            <Container fluid={true}>
                <Card>
                    <CardHeader>
                <Button className="success" onClick={onBack}>Back</Button>
                </CardHeader>
                </Card>
                    {itemMenu.map((item,index)=>{
                        if(item!==""){
                            return(
                                <Card style={{width:"1000px",height:"50px"}}>
                                <Row style={{marginTop:"1%",marginLeft:"5%"}}>
                                <div className="col-9">
                                <h6>{item}</h6>
                                </div>
                                <div className="col-3" style={{textAlign:"left"}}><Button color="primary" size="sm" id={item} onClick={onClickAddMenuItem} >Show Menu</Button>&nbsp;&nbsp;<Button color="warning" size="sm"onClick={() =>onDeleteMenu(index)} >Delete</Button></div>
                                </Row>
                                </Card>
                            )
                        }
                      
                    })}
                    <Button className="warning" onClick={handleShow}>Add Menu</Button>
                </Container>  
    

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body> <input type="text" value={menu} onChange={onChangeMenu} className="form-control" placeholder="Enter Menu Name"/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="primary" onClick={onAddMenu}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
                    </>:
                    <>
                    <Card>
                        <CardHeader><ArrowLeft onClick={onBackToCustomize}/><h6>Add Item To {menuName}</h6></CardHeader>
                        <CardBody>
                        <Row className="form-row">
                            <Col>
                            <p>Add Menu</p>
                            </Col>
                        </Row>
                        <Row className="form-row">
          <Col className="form-group col-md-3">
                                <input type="text" value={addMenu} onChange={onChangeAddMenu} className="form-control" placeholder="Eg:Jeera Rice"/>
                            </Col>
                            <Col className="form-group col-md-3">
                                <input type="number" value={addPrice} onChange={onChangeMenuPrice} className="form-control" onKeyPress={onClickSaveMenu} placeholder="Eg:150"/>
                            </Col>
                        </Row>
                        
          <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
          <Table>
            <thead>
              <tr>
                <th> items</th>
                <th>Price </th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {menuList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td>{item.Price}</td>
                    <td><Trash style={{ color: "orange" }} id={item.PushId} onClick={onClickMenuDelete} size={15} /></td>

                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
                        </CardBody>
                    </Card>
                    </>
}

        </Fragment>
    )
}

export default CateringList;