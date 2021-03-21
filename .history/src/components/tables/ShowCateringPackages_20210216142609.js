import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home, Trash, PlusCircle } from 'react-feather';
import { Container, Row, Col, Button, CardHeader, Table, Input, Card } from "reactstrap";
// import {Check,Trash} from 'react-feather';
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Image, Badge } from "react-bootstrap";

const CateringList = (props) => {
    const [search, setSearch] = useState('')
    const [searchValue, setSearchValue] = useState([])
    const [catering, setCatering] = useState('')

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
                                    Type: val.Type
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
    return (
        <Fragment>
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
                                    <div className="p-3 position-relative"><p>HIE</p></div>

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
                                                    <p className="text-black mb-3 time">
                                                        {item.Price ? (
                                                            <span className="float-right text-black-50" style={{color:"black"}}>
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

            </Container>
        </Fragment>
    )
}

export default CateringList;