import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Dropdown,Accordion,Button,Form,Spinner} from 'react-bootstrap';
import Icofont from 'react-icofont';
import PageTitle from './common/PageTitle';
import CardItem from './common/CardItem';
import CategoriesCarousel from './common/CategoriesCarousel';
import firebase from './Firebase'
import { AppContext } from "./home/context/appContext";
import { get } from "lodash";
import $ from "jquery";

class List extends React.Component {
	static contextType = AppContext;
  previousContext;
  constructor() {
    super();
    this.limit = 9;
    this.filter = [];
    this.allProducts = [];
  }

  state = {
    product: { items: [], loading: false },
    cusines: { items: [], loading: false },
    banners: { items: [], bannerloading: false },
    filter: { cusines: [], search: "", sort: "" },
    availableChefs: [],
    nonAvailableChefs: [],
    count: 0,
    page: 1,
    pages: 0,
  };
  componentDidMount() {
    // $(document).ready(() => {
    //   //Range slider light
    //   $("#slider-range1").slider({
    //     range: true,
    //     min: 0,
    //     max: 500,
    //     values: [0, 500],
    //     slide: function (event, ui) {
    //       $("#amount1").val("₹​" + ui.values[0] + " - ₹​" + ui.values[1]);
    //     },
    //   });

    //   $("#amount1").val(
    //     "₹​" +
    //       $("#slider-range1").slider("values", 0) +
    //       " - ₹​" +
    //       $("#slider-range1").slider("values", 1)
    //   );
    // });

    this.loadVendors();
    // this.loadCusines();
    // this.loadBanners();
    this.previousContext = this.context;
  }
  deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }
  getRadiusBetweenTwoLocations = async (vendor) => {
    let vendorLatLng = vendor.Location.split(",").map(Number);
    //console.log('vendorLatLng', vendorLatLng[0], vendorLatLng[1])
    let lat1 = vendorLatLng[0];
    let lon1 = vendorLatLng[1];
    // let radiusDiff = 0;

    let lat2 = localStorage.getItem('lat');
    let lon2 = localStorage.getItem('lng');

    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    console.log(d)
    return d;
    // await Geocode.fromAddress(localStorage.getItem("formattedAddress"))
    //   .then((response) => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     //console.log(lat, lng);
    //     var p1 = new window.google.maps.LatLng(lat, lng);
    //     var p2 = new window.google.maps.LatLng(vendorLat, vendorLng);
    //     radiusDiff = (
    //       window.google.maps.geometry.spherical.computeDistanceBetween(p1, p2) /
    //       1000
    //     ).toFixed(0);
    //     //console.log('radiusDiff', radiusDiff);
    //   })
    //   .catch((error) => console.log("Geocode ERROR", error));
    // return radiusDiff;
  };

	loadVendors = async () => {
		//const cityId = this.context.appState.cityinfo.PushId;
		const cityId = localStorage.getItem("pushid");
		this.setState({ product: { ...this.state.product, loading: true } });
	
		if (!cityId) {
		  this.setState({ product: { item: [], loading: false } });
		  console.log("i m here")
		  return false;
		}
		let availableChefs = [];
		let nonAvailableChefs = [];
		this.allProducts = [];
		try {
		  const vendors = await firebase
			.database()
			.ref()
			.child(cityId)
			.orderByChild("City")
			.equalTo(cityId)
			.once("value");
	
		  if (vendors.exists()) {
			  console.log(vendors.val())
			let records = Object.values(vendors.val());
			let currentRedius = localStorage.getItem("radius");
			var today = new Date();
			var CurrentTime = today.getHours() + ":" + today.getMinutes();
			var regExp = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;
		   
			for (let vendor of records) {
			  // console.log('CurrentTime check', parseInt(vendor.Open.replace(regExp, "$1$2$3")) <=  parseInt(CurrentTime.replace(regExp, "$1$2$3")) && parseInt(vendor.Close.replace(regExp, "$1$2$3")) >= parseInt(CurrentTime.replace(regExp, "$1$2$3")))
			  if(vendor.Location !== "") { 
				if (
				  (await this.getRadiusBetweenTwoLocations(vendor)) < currentRedius  &&
				  vendor.AStatus === "Active" &&
				  vendor.Status === "Active" &&
				  parseInt(vendor.Open.replace(regExp, "$1$2$3")) <=  parseInt(CurrentTime.replace(regExp, "$1$2$3")) &&
				  parseInt(vendor.Close.replace(regExp, "$1$2$3")) >= parseInt(CurrentTime.replace(regExp, "$1$2$3"))
				) {
				  availableChefs.push(vendor);
				  console.log('availableChefs', availableChefs);
				} else if(vendor.AStatus === "Active" && ( (await this.getRadiusBetweenTwoLocations(vendor)) < currentRedius) ){
				  nonAvailableChefs.push(vendor);
				  console.log('notavailable', nonAvailableChefs);
				}
				 else { continue; }
			  }
			}
			console.log('availableChefs', availableChefs);
			console.log('nonAvailableChefs', nonAvailableChefs);
			this.setState({availableChefs: availableChefs});
			this.setState({nonAvailableChefs: nonAvailableChefs});
			this.setState({ product: { items: availableChefs.concat(nonAvailableChefs), loading: false } });
	
			this.setState({
			  pages:
				this.limit < records.length
				  ? Math.ceil(records.length / this.limit)
				  : 1,
			});
			this.allProducts = records;
		  } else {
			this.setState({availableChefs: availableChefs});
			this.setState({nonAvailableChefs: nonAvailableChefs});
			this.setState({ product: { items: availableChefs.concat(nonAvailableChefs), loading: false } });
		  }
		}
		 catch (e) {
		//   this.setState({availableChefs: availableChefs});
		//   this.setState({nonAvailableChefs: nonAvailableChefs});
		//   this.setState({ product: { items: availableChefs.concat(nonAvailableChefs), loading: false } });
		console.log(e)
		}
	  };
	  paginate = (page) => {
		let offset = (page - 1) * this.limit;
		 return get(this.state, 'product.items', []).slice(offset, offset + this.limit);
		//return get(this.state, 'nonAvailableChefs', []).slice(offset, offset + this.limit);
	  };
	
	  paginateAvailableChefs = (page) => {
		let offset = (page - 1) * this.limit;
		// return get(this.state, 'product.items', []).slice(offset, offset + this.limit);
		return get(this.state, 'availableChefs', []).slice(offset, offset + this.limit);
	  };
	render() {
		const { availableChefs } = this.state

    	return (
    		<>
	    		<PageTitle 
	    			title="Offers Near You"
	    			subTitle="Best deals at your favourite restaurants"
	    		/>
	    		<section className="section pt-5 pb-5 products-listing">
			         <Container>
			            <Row className="d-none-m">
			               <Col md={12}>
			               		<Dropdown className="float-right">
								  <Dropdown.Toggle variant="outline-info">
								    Sort by: <span className="text-theme">Distance</span> &nbsp;&nbsp;
								  </Dropdown.Toggle>
								  <Dropdown.Menu className='dropdown-menu-right shadow-sm border-0'>
								    <Dropdown.Item href="#/distance">Distance</Dropdown.Item>
								    <Dropdown.Item href="#/no-of-coupons">No Of Offers</Dropdown.Item>
								    <Dropdown.Item href="#/rating">Rating</Dropdown.Item>
								  </Dropdown.Menu>
								</Dropdown>
								<h4 className="font-weight-bold mt-0 mb-3">OFFERS <small className="h6 mb-0 ml-2">299 restaurants
								 </small>
								</h4>
			               </Col>
			            </Row>
			            <Row>
			               <Col md={3}>
			                  <div className="filters shadow-sm rounded bg-white mb-4">
			                     <div className="filters-header border-bottom pl-4 pr-4 pt-3 pb-3">
			                        <h5 className="m-0">Filter By</h5>
			                     </div>
			                     <div className="filters-body">
			                     	<Accordion defaultActiveKey="0">
									    <div className="filters-card border-bottom p-4">
											<div className="filters-card-header" id="headingOne">
												<h6 className="mb-0">
													<Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="0">
														Location <Icofont icon='arrow-down' className='ml-auto'/>
													</Accordion.Toggle>
												</h6>
											</div>
										    <Accordion.Collapse eventKey="0">
										      <div className="filters-card-body card-shop-filters">
											      <Form.Check 
											        custom
											        type='checkbox'
											        defaultChecked={true}
											        id='custom-cb1'
											        label={<React.Fragment>Ludhiana Junction <small className="text-black-50">230</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb2'
											        label={<React.Fragment>Model Town <small className="text-black-50">95</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb3'
											        label={<React.Fragment>Civil Lines <small className="text-black-50">35</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb4'
											        label={<React.Fragment>Dugri <small className="text-black-50">46</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb5'
											        label={<React.Fragment>PAU <small className="text-black-50">20</small></React.Fragment>}
											      />
			                                    <div className="mt-2"><Link to="#" className="link">See all</Link></div>
			                                  </div>
										    </Accordion.Collapse>
			                            </div>
			                            <div className="filters-card border-bottom p-4">
										    <div className="filters-card-header" id="headingTwo">
				                                <h6 className="mb-0">
				                                    <Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="1">
														All cuisines <Icofont icon='arrow-down' className='ml-auto'/>
													</Accordion.Toggle>
				                                </h6>
			                                </div>

										    <Accordion.Collapse eventKey="1">
										      <div className="filters-card-body card-shop-filters">
											        <form className="filters-search mb-3">

													  <Form.Group>
													    <Icofont icon='search'/>
													    <Form.Control type="text" placeholder="Start typing to search..." />
													  </Form.Group>
				                                    </form>
											      <Form.Check 
											        custom
											        type='checkbox'
											        defaultChecked={true}
											        id='custom-cb6'
											        label={<React.Fragment>American <small className="text-black-50">156</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb7'
											        label={<React.Fragment>Pizza <small className="text-black-50">120</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb8'
											        label={<React.Fragment>Healthy <small className="text-black-50">130</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb9'
											        label={<React.Fragment>Vegetarian <small className="text-black-50">120</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb10'
											        label={<React.Fragment>Chinese <small className="text-black-50">111</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb11'
											        label={<React.Fragment>Hamburgers <small className="text-black-50">95</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb12'
											        label={<React.Fragment>Dessert <small className="text-black-50">50</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb13'
											        label={<React.Fragment>Chicken <small className="text-black-50">32</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb14'
											        label={<React.Fragment>Indian <small className="text-black-50">156</small></React.Fragment>}
											      />
			                                    <div className="mt-2"><Link to="#" className="link">See all</Link></div>
			                                  </div>
										    </Accordion.Collapse>
									    </div>
									    <div className="filters-card border-bottom p-4">
											<div className="filters-card-header" id="headingOne">
												<h6 className="mb-0">
													<Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="2">
														Feature <Icofont icon='arrow-down' className='ml-auto'/>
													</Accordion.Toggle>
												</h6>
											</div>
										    <Accordion.Collapse eventKey="2">
										      <div className="filters-card-body card-shop-filters">
											      <Form.Check 
											        custom
											        type='checkbox'
											        defaultChecked={true}
											        id='custom-cb15'
											        label={<React.Fragment>Free Delivery <small className="text-black-50">156</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb16'
											        label={<React.Fragment>Coupons <small className="text-black-50">120</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb17'
											        label={<React.Fragment>Open Now [1:31am] <small className="text-black-50">85</small></React.Fragment>}
											      />
			                                  </div>
										    </Accordion.Collapse>
			                            </div>
									    <div className="filters-card border-bottom p-4">
											<div className="filters-card-header" id="headingOne">
												<h6 className="mb-0">
													<Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="3">
														Delivery time <Icofont icon='arrow-down' className='ml-auto'/>
													</Accordion.Toggle>
												</h6>
											</div>
										    <Accordion.Collapse eventKey="3">
										      <div className="filters-card-body card-shop-filters">
											      <Form.Check 
											        custom
											        type='checkbox'
											        defaultChecked={true}
											        id='custom-cb18'
											        label='Any Time'
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb19'
											        label='25 min'
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb20'
											        label='30 min'
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb21'
											        label='40 min'
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb22'
											        label='45 min'
											      />
			                                    <div className="mt-2"><Link to="#" className="link">See all</Link></div>
			                                  </div>
										    </Accordion.Collapse>
			                            </div>
									    <div className="filters-card border-bottom p-4">
											<div className="filters-card-header" id="headingOne">
												<h6 className="mb-0">
													<Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="4">
														Category <Icofont icon='arrow-down' className='ml-auto'/>
													</Accordion.Toggle>
												</h6>
											</div>
										    <Accordion.Collapse eventKey="4">
										      <div className="filters-card-body card-shop-filters">
											      <Form.Check 
											        custom
											        type='checkbox'
											        defaultChecked={true}
											        id='custom-cb23'
											        label={<React.Fragment>Delivery <small className="text-black-50">156</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb24'
											        label={<React.Fragment>Dine-out <small className="text-black-50">120</small></React.Fragment>}
											      />

											      <Form.Check 
											        custom
											        type='checkbox'
											        id='custom-cb25'
											        label={<React.Fragment>Cafés<small className="text-black-50">85</small></React.Fragment>}
											      />
			                                  </div>
										    </Accordion.Collapse>
			                            </div>
									</Accordion>
			                     </div>
			                  </div>
			                  <div className="filters pt-2">
			                     <div className="filters-body rounded shadow-sm bg-white">
			                        <div className="filters-card p-4">
			                           <div>
			                              <div className="filters-card-body card-shop-filters pt-0">
		                              		<Form.Check 
										        custom
										        type='radio'
										        name='partner'
										        defaultChecked={true}
										        id='custom-cb26'
										        label='Gold Partner'
										      />
		                              		<Form.Check 
										        custom
										        type='radio'
										        name='partner'
										        id='custom-cb27'
										        label='Order Food Online'
										      />
		                              		<Form.Check 
										        custom
										        type='radio'
										        name='partner'
										        id='custom-cb28'
										        label='Osahan Eat'
										      />
			                                 <hr />
			                                 <small className="text-success">Use code OSAHAN50 to get 50% OFF (up to $30) on first 5 orders. T&Cs apply.</small>
			                              </div>
			                           </div>
			                        </div>
			                     </div>
			                  </div>
			               </Col>
			               <Col md={9}>
			               	  <CategoriesCarousel />
			                  <Row>{console.log(this.paginate(this.state.page))}
								  {
							  this.paginate(this.state.page).map((item,index) => {
								  console.log(item)
                        if(availableChefs.find(chef => chef.UserId === item.UserId)) {
							let profileImage = item.PP ? item.PP : "../assets/img/chef.png";
							if(profileImage === "https://firebasestorage.googleapis.com/v0/b/mothersfood-a1de8.appspot.com/o/CloudKitchen%2F1599912088639-add.png?alt=media&token=60561b4b-af5d-489c-bbc8-28e8de47851f") {
								profileImage = "../assets/img/chef.png";
							  }
                          return(
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title={item.Name}
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image= {profileImage}
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating={item.Ratings !== undefined? Math.trunc(item.Ratings*10)/10: "5"}
								   	/>
			                     </Col>
						  )
						}else{
							let profileImage = item.PP ? item.PP : "../assets/img/chef.png";
							if(profileImage === "https://firebasestorage.googleapis.com/v0/b/mothersfood-a1de8.appspot.com/o/CloudKitchen%2F1599912088639-add.png?alt=media&token=60561b4b-af5d-489c-bbc8-28e8de47851f") {
								profileImage = "../assets/img/chef.png";
							  }
                          return(
			                     <Col md={4} sm={6} className="mb-4 pb-2" style={{ border: "none", opacity: '0.7' }}>
			                        <CardItem 
								   		title={item.Name}
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image= {profileImage}
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating={item.Ratings !== undefined? Math.trunc(item.Ratings*10)/10: "5"}
								   	/>
			                     </Col>
						  )
						}
						})}
			                     {/* <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/2.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/3.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/4.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/5.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/6.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/7.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/8.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col>
			                     <Col md={4} sm={6} className="mb-4 pb-2">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/9.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
								   	/>
			                     </Col> */}
			                     <Col md={12} className="text-center load-more">
			                        <Button variant="primary" type="button" disabled="">
			                        	<Spinner animation="grow" size="sm" className='mr-1' />
				                        Loading...
			                        </Button>  
			                     </Col>
			                  </Row>
			               </Col>
			            </Row>
			         </Container>
			         
			    </section>
	    	</>
    	);
    }
}


export default List;