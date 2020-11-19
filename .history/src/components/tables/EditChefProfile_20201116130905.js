// import React, { Fragment, useState, useEffect } from 'react';
// import BreadCrumb from '../../layout/Breadcrumb'
// import { Home, Trash, PlusCircle } from 'react-feather';
// import { Container, Row, Col, Button, CardHeader, Table, Input } from "reactstrap";
// // import {Check,Trash} from 'react-feather';
// import app, { storage } from '../../data/base'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

// import { css } from "@emotion/core";

// const override = css`
//   display: flex;
//   margin: 0 auto; 
//   border-color: red;
// `;

// const AddFoodItems = () => {
 
//   return (
//     <Fragment>
//       <BreadCrumb parent={<Home />} subparent="Food Management" title=" Add Food Items " />
//       <Container fluid={true}>
//         <Row className="form-row" style={{ marginTop: "3%" }}>
//           <Col className="form-group col-md-6">
//             <label className="form-label">Enter Home Chef registration Number</label>
//             <Row>
//               <Col className="col-lg-6 col-md-5 col-sm-5">
//                 <Input type="text" value={search} onChange={onChangeSearchHandler} className="form-control" />
//               </Col>
//               <Col className="col-sm-1 col-md-2">
//                 <span id="search" onClick={onClickSearchHandler} ><img src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search engine" /></span>
//               </Col>
//             </Row>
//             <div className="clearfix"></div>
//           </Col>
//         </Row>
//         <Row>
//           <Col sm="12">
//             <CardHeader>
//               <h5>Add Food Items </h5>
//               {/* <span> Use a className <code> table </code> to any table.</span> */}
//             </CardHeader>
//           </Col>

//         </Row>
//         <Row className="form-row">
//           <Col className="form-group col-md-3">
//             <label className="form-label">Name</label>
//             <input value={foodName} onChange={onChangeFoodName} className="form-control"/>
//             <div className="clearfix"></div>
//           </Col>
//         </Row>


//         <Row className="form-row">
//           <Col className="form-group col-md-3">
//             <label className="form-label">Mobile Number <span style={{ color: "red" }}>*</span></label>
//             <Input type="number" value={itemName} onChange={onChangeItemName} className="form-control" />
//             <div className="clearfix"></div>
//           </Col>
//           <Col className="form-group col-md-3">
//             <label className="form-label">EmailId <span style={{ color: "red" }}>*</span></label>
//             <Input type="text" value={detail} onChange={onChangeDetail} className="form-control" />
//             <div className="clearfix"></div>
//           </Col>
//         </Row>
//         <Row className="form-row">
//           <Col className="form-group col-md-3">
//             <label className="form-label">Delivery Time</label>
//             <input type="number" value={deliveryTime} onChange={onChangeDeliveryTime} className="form-control"/>
//             <div className="clearfix"></div>
//           </Col>
//         </Row>
//         <Row className="form-row">
//           <Col className="form-group col-md-3">
//             <label className="form-label">Cost for Two</label>
//             <input type="number"  value={costForTwo} onChange={onChangeCostForTow} className="form-control"/>
//             <div className="clearfix"></div>
//           </Col>
//         </Row>
//         <Row className="form-row">
//           <Col className="form-group col-md-3">
//             <label className="form-label">Cuisine</label>
//             <select value={cuisine} onChange={onChangeCuisine} className="form-control">
//               <option value="Select">Select</option>
//               {cuisineName.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}
//             </select>
//             <div className="clearfix"></div>
//           </Col>
//           {showTable===true?
//           <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
//           <Table>
//             <thead>
//               <tr>
//                 <th>cuisines Name</th>
//                 <th>Price </th>
//                 <th>Delete</th>

//               </tr>
//             </thead>
//             <tbody>
//               {cuisineList.map((item, index) => {
//                 return (
//                   <tr key={index}>
//                     <td>{selectcuisineName[selectcuisineId.indexOf(item.data)]}</td>
//                     <td>{item.price}</td>
//                     <td><Trash style={{ color: "orange" }} onClick={() => {
//                       onClickCuisineDelete(index);
//                     }} size={15} /></td>

//                   </tr>
//                 )
//               })}
//             </tbody>
//           </Table>
//         </div>:
//         <></>
//           }
          
//         </Row>

//         <Row className="form-row">
//           <Col className="form-group col-md-3">
//             <label className="form-label">Food Type</label>
//             <select value={foodCategory} onChange={onChangeFoodCategory} className="form-control">
//               <option value="Select">Select</option>
//               {foodType.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}

//             </select>
//             <div className="clearfix"></div>
//           </Col>
//         </Row>
//         <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
//           <Table>
//             <thead>
//               <tr>
//                 <th>Food Category</th>
//                 <th>Delete</th>

//               </tr>
//             </thead>
//             <tbody>
//               {foodTypeList.map((item, index) => {
//                 return (
//                   <tr key={index}>
//                     <td>{selectFoodTypeName[selectFoodTypeId.indexOf(item.data)]}</td>
//                     <td><Trash id={index} onClick={() => {
//                       onDeleteFoodType(index);
//                     }} size={15} /></td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </Table>
//         </div>

//         <Row className="form-row">
//           <Col className="form-group col-md-3">
//             <label className="form-label">Open Time <span style={{ color: "red" }}>*</span></label>
//             <Input type="time" value={openTime} onChange={onChangeStartTime} className="form-control" />
//             <div className="clearfix"></div>
//           </Col>
//           <Col className="form-group col-md-3">
//             <label className="form-label">Close Time <span style={{ color: "red" }}>*</span></label>
//             <Input type="time" value={closeTime} onChange={onChangeCloseTime} className="form-control" />
//             <div className="clearfix"></div>
//           </Col>
//         </Row>
//         <Row>
//         <Col className="form-group col-md-3">
//             <label className="form-label">Location <span style={{ color: "red" }}>*</span></label>
//             <Input type="time" value={closeTime} onChange={onChangeCloseTime} className="form-control" />
//             <div className="clearfix"></div>
//           </Col>
//         </Row>
//         <Row className="form-row">
//           <Col className="form-group col-md-6">
//             <label className="form-label">Chef Photo <span style={{ color: "red" }}>*</span></label>
//             <Input type="file" onChange={onChangeImage} className="form-control" />
//             <div className="clearfix"></div>
//           </Col>
//           <div className="col-sm-1">
//             {imageAsUrl === "" ?
//               <></> :
//               <a href={imageAsUrl} target="_blank" rel="noopener noreferrer">View</a>}
//           </div>
//         </Row>

//             <Button type="submit" onClick={onUpdateHandler} className="warning">Update</Button>

//       </Container>
//     </Fragment>
//   );
// };

// export default AddFoodItems;