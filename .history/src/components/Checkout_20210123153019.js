import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Row, Col, Container, Form, InputGroup, Button, Tab, Nav, ButtonToolbar, ToggleButton, ToggleButtonGroup, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import ChooseAddressCard from './common/ChooseAddressCard';
import CheckoutItem from './common/CheckOutCartItem';
import { connect } from 'react-redux';
import { Cart } from "./Store/action/cartActions"

// import AddAddressModal from './modals/AddAddressModal';
import Icofont from 'react-icofont';
import firebase from './Firebase'
import { message } from "antd";
import Moment from 'moment';
import $ from 'jquery';
import SweetAlert from "react-bootstrap-sweetalert";
import { Modal} from 'antd';
import MapAutoComplete from './common/Map/MapAutoComplete';
import SingleMap from './common/Map/SingleMap';
import Geocode from "react-geocode";
import { get, isEmpty } from "lodash";
const APIKEY = "AIzaSyCPhxfpptoIc1yca5U8mXIigIajoERQCdE"
Geocode.setApiKey(APIKEY);
Geocode.setLanguage("en");
class Checkout extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			showAddressModal: false,
			product: this.props.product,
			cate: this.props.product,
			count: 0,
			activeHomeAddress: false,
			activeOfficeAddress: false,
			name: '',
			flat: '',
			cities: [],
			lat: '',
			lng: '',
			cityName: '',
			address: '',
			addressError: '',
			packingCharges: '0',
			deliveryCharges: '0',
			pushid: '',
			radius: '',
			userCart: [],
			userAddresses: [],
			subTotal: 0,
			taxes: '0',
			total: 0,
			discount1: 0,
			ActiveCashOnDelivery: false,
			showCashOnDeliveryOption: false,
			location: { city: '', query: '', lat: '', lng: '' },
			searchedPlaceAPIData: '',
			userAddressSelected: '',
			deliveryDate: '',
			deliveryTime: '',
			showAddress: false,
			promocode: '',
			promocodeFail: false,
			promocodeSuccess: false,
			promocodeNotExits: false,
			promocodeRemoved: false,
			removeDiscount: "",
			showPromocode: true,
			promocodeDisplay: [],
			selectedLocation: ""
		};
	}




	//     const rdiusResponse = await fetch(RACES).then(res => res.json())
	//     const classesResponse = await fetch(CLASSES).then(res =>   
	//     res.json())
	//   const races = racesResponse.results
	//   const classes = classesResponse.results
	//   this.setState({ races, classes })



	handleInputChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}


	handleActiveCashOnDelivery = () => {
		this.setState({ ActiveCashOnDelivery: !this.state.ActiveCashOnDelivery })
	}

	getCoordinates = (position) => {

		this.setState({ lat: position.coords.latitude });
		this.setState({ lng: position.coords.longitude });

		const { cities, subTotal, discount1 } = this.state
		Geocode.fromLatLng(get(position, 'coords.latitude'), get(position, 'coords.longitude'))
			.then(response => {

				this.setState({ address: response.results[0].formatted_address });

				// let cityInfo = '';
				for (let city of cities) {

					if (response.results[0].formatted_address.includes(city.Name)) {
						//if ("Bengaluru".includes(city.Name)) {
						this.setState({ showCashOnDeliveryOption: true });
						// cityInfo = city;
						this.setState({ cityName: city.Name });
						this.setState({ pushid: city.PushId });
						this.setState({ radius: city.Radius });
						this.setState({ packingCharges: city.PackingCharges });
						this.setState({ deliveryCharges: city.DeliveryCharges });
						this.setState({ taxes: (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges)) + (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges) * 0.18) });
						this.setState({ total: subTotal + (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges)) + (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges) * 0.18) - parseFloat(discount1) });
						this.setState({ addressError: '' });

						return false;
					} else {
						this.setState({ addressError: 'not serviceable in this area' });
						//return false;
						// alert('not serviceable in this area');
					}
				}
				// const address = response.results[0].formatted_address;
				// setAddress(address);
			}).catch(error => console.log('Geocode ERROR', error));

	}


	handleAddressSelect = (address) => {
		this.setState({ userAddressSelected: address });
		this.setState({ selectedLocation: address.Coord })
		const { cities, subTotal, discount1 } = this.state;
		for (let city of cities) {
			if (address.Address.includes(city.Name)) {
				//if ("Bengaluru".includes(city.Name)) {
				this.setState({ cityName: city.Name });
				this.setState({ pushid: city.PushId });
				this.setState({ radius: city.Radius });
				this.setState({ packingCharges: city.PackingCharges });
				this.setState({ deliveryCharges: city.DeliveryCharges });
				this.setState({ taxes: (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges)) * 0.18 });
				this.setState({ total: subTotal + (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges)) + (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges) * 0.18) - parseFloat(discount1) });
				this.setState({ addressError: '' });


				return false;
			} else {
				this.setState({ addressError: 'not serviceable in this area' });
				//return false;
				// alert('not serviceable in this area');
			}
		}
	}

	handleHomeAddressSelect = () => {
		this.setState({ activeHomeAddress: true });
		this.setState({ activeOfficeAddress: false });

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getCoordinates)
		}
	}

	handleOfficeAddressSelect = () => {
		this.setState({ activeHomeAddress: false });
		this.setState({ activeOfficeAddress: true });
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getCoordinates)
		}
	}

	componentDidMount() {

		this.fetchAllLocation();
		this.getUserCart();
		this.fetchAllPromocode()
	}

	clearCart = () => {
		let userName = localStorage.getItem('UserName');
		console.log(userName)
		if (window.reload()) {
			firebase.database().ref().child("Users").child(userName).child("Cart").remove();
		}
	}


	fetchAllPromocode = () => {
		let unmount = false
		firebase.database().ref('Promocode').child('User')
			.once('value', function (snapshot) {
				if (snapshot.exists()) {
					const content = []
					snapshot.forEach(snap => {
						content.push(snap.val())
					})
					if (!unmount) {
						this.setState({ promocodeDisplay: content })

					}
				}
			}.bind(this))
		return () => {
			unmount = true
		}
	}

	fetchAllLocation = () => {
		let unmount = false
		firebase.database().ref('Masters').child('City').once('value', (snapshot) => {
			if (snapshot.exists()) {
				if (!unmount) {
					this.setState({ cities: Object.values(snapshot.val()) })

				}
			}
		}, () => {

		})
		return () => {
			unmount = true
		}
		// setFetchlocation({cities:[], loading:false});
	}

	getUserCart = async () => {
		let unmount = false
		let userName = localStorage.getItem('UserName');
		const user = await firebase
			.database()
			.ref("Users")
			.orderByChild("UserName")
			.equalTo(userName)
			.once("value");

		if (user.exists()) {

			let subTotal = 0;
			if (!unmount) {
				this.setState({ userCart: Object.values(get(user.val()[userName], 'Cart', [])) });
				this.setState({ userAddresses: Object.values(get(user.val()[userName], 'Address', [])) });
			}


			Object.values(get(user.val()[userName], 'Cart', [])).map((cart) => subTotal += parseInt(get(cart, 'Total', 0)));
			if (!unmount) {
				this.setState({ subTotal: subTotal });
				this.setState({ total: subTotal });
			}


		}
		return () => {
			unmount = true
		}
	}

	handleDecreaseQuantity = async (cartItem) => {
		let userName = localStorage.getItem('UserName');
		// const { userCart } = this.state
		const user = await firebase
			.database()
			.ref("Users")
			.orderByChild("UserName")
			.equalTo(userName)
			.once("value");
		if (user.Cart) {

		} else {
			if (get(cartItem, 'Qty', 0) > 0) {
				// console.log('cartItem2', cartItem)
				cartItem.quantity = parseInt(cartItem.Qty) - 1;

				this.props.setCart(cartItem);
			}

			this.getUserCart();

			//this.setState({ userCart: foodItemsUpdated });
		}
	}

	handleIncreaseQuantity = async (cartItem) => {
		let userName = localStorage.getItem('UserName');
		// const { userCart } = this.state
		const user = await firebase
			.database()
			.ref("Users")
			.orderByChild("UserName")
			.equalTo(userName)
			.once("value");

		if (user.Cart) {

		} else {
			//   let foodItemsUpdated = [...userCart];
			//   let foodItemUpdated = foodItemsUpdated.find(foodItem => foodItem.PushId === cartItem.PushId);
			//     foodItemUpdated.quantity++;
			if (cartItem) {
				// console.log('cartItem2', cartItem)
				cartItem.quantity = parseInt(cartItem.Qty) + 1;

				this.props.setCart(cartItem);
			}

			this.getUserCart();

			//this.setState({ userCart: foodItemsUpdated });
		}
	}

	handleAddressSelectionSubmit = (e) => {
		e.preventDefault();
		this.setState({ showAddressModal: true });
		// const { activeHomeAddress, activeOfficeAddress, address, cityName, pushid, lat, lng, flat, name } = this.state;
		// if (!activeHomeAddress && !activeOfficeAddress) {
		//     return;
		// }

		// const Address = {
		//     Address: address,
		//     CityName: cityName,
		//     Coord: `${lat},${lng}`,
		//     PushId: pushid,
		//     Flat: flat,
		//     Name: name,
		// };
		// let userName = localStorage.getItem('UserName');
		// console.log('Address', Address);
		// console.log('userName', userName);
		// try{
		//     var firebaseref = firebase.database().ref().child("Users").child(userName);
		//     firebaseref.child("Address").child(pushid).set(Address);
		//     message.success('Address added successfully!')
		// }catch(error){
		//     message.error('something error occured');
		// }
		let userName = localStorage.getItem('UserName');
		console.log(userName)

	}

	// handleAddressSelectionSubmitAdd = (e) => {
	//     e.preventDefault();
	//     let userName = localStorage.getItem('UserName');
	//     const { searchedPlaceAPIData, cityName, pushid, lat, lng, flat, name } = this.state;
	//     const Address = {
	//         Address: searchedPlaceAPIData[0].formatted_address,
	//         CityName: cityName,
	//         Coord: `${lat},${lng}`,
	//         PushId: pushid,
	//         Flat: flat,
	//         Name: name,
	//     };

	//     try{
	//         var firebaseref = firebase.database().ref().child("Users").child(userName);
	//         firebaseref.child("Address").child(pushid).set(Address);
	//         message.success('Address added successfully!')
	//     }catch(error){
	//         message.error('something error occured');
	//     }


	// }


	handleOk = e => {
		//e.preventDefault();
		let userName = localStorage.getItem('UserName');
		const { searchedPlaceAPIData, cityName, pushid, lat, lng, flat, name, addressError } = this.state;
		if (!flat) {
			message.warning('Please Enter Flat No');
			return;
		}
		if (!name) {
			message.warning('Please Enter Save Address As');
			return;
		}

		if (addressError) {
			message.error('not serviceable in this area');
			return;
		}

		const Address = {
			Address: searchedPlaceAPIData[0].formatted_address,
			CityName: cityName,
			Coord: `${lat},${lng}`,
			PushId: pushid,
			Flat: flat,
			Name: name,
		};

		this.setState({ userAddressSelected: Address })

		try {
			var firebaseref = firebase.database().ref().child("Users").child(userName);
			firebaseref.child("Address").child(pushid).set(Address);
			message.success('Address added successfully!')
		} catch (error) {
			message.error('something error occured');
		}

		this.setState({
			showAddressModal: false,
		});

		window.location.reload()

	};

	handleCancel = e => {
		this.setState({
			showAddressModal: false,
		});
	};

	onDeliveryDateChange = (dateString) => {
		this.setState({ deliveryDate: Moment(new Date(dateString)).format('YYYY-MM-DD') })
	}

	onDeliveryTimeChange = (time, timeString) => {
		console.log(time, timeString);
		this.setState({ deliveryTime: timeString })
	}

	getRadiusBetweenTwoLocations = async (vendor) => {
		let vendorLatLng = vendor.Location.split(",").map(Number);
		//console.log('vendorLatLng', vendorLatLng[0], vendorLatLng[1])
		let vendorLat = vendorLatLng[0];
		let vendorLng = vendorLatLng[1];
		let radiusDiff = 0;
		const { userAddressSelected } = this.state;
		let userLatLng = userAddressSelected.Coord.split(",").map(Number);
		// await Geocode.fromAddress(get(userAddressSelected, 'Address', ''))
		//   .then((response) => {
		//     const { lat, lng } = response.results[0].geometry.location;
		let lat = userLatLng[0];
		let lng = userLatLng[1];
		var p1 = new window.google.maps.LatLng(lat, lng);
		var p2 = new window.google.maps.LatLng(vendorLat, vendorLng);
		radiusDiff = (
			window.google.maps.geometry.spherical.computeDistanceBetween(p1, p2) /
			1000
		).toFixed(0);
		//console.log('radiusDiff', radiusDiff);
		// })
		//   .catch((error) => console.log("Geocode ERROR", error));
		return radiusDiff;
	};

	disabledDate = (current) => {
		// Can not select days before today and today
		const preOrder = get(this.props, 'location.state.preorder', '');
		// console.log('disabledDate', current)
		return current.valueOf() > new Date(preOrder.OrderEndDate).valueOf() && current.valueOf() < new Date(preOrder.OrderDate).valueOf();
	}

	deg2rad = (deg) => {
		return deg * (Math.PI / 180)
	}

	redirecttoprofile = () => {
		this.props.history.push('/profile');
	}

	getRadiusBetweenTwoLocations1 = async (vendor1) => {
		let vendorLatLng = vendor1.split(",")
		//console.log('vendorLatLng', vendorLatLng[0], vendorLatLng[1])
		let lat1 = vendorLatLng[0];
		let lon1 = vendorLatLng[1];
		// let radiusDiff = 0;

		let lat2 = localStorage.getItem('lat');
		let lon2 = localStorage.getItem('lng');

		var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
		var dLon = this.deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2)
			;
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		// console.log(d)
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
	getUserRadiusBetweenTwoLocations1 = (vendor1) => {
		let vendorLatLng = vendor1.split(",")
		let lat = localStorage.getItem('lat');
		let lng = localStorage.getItem('lng');
		let location = ""
		if (location === undefined || location === null || location === "") {
			location = lat + "," + lng

		} else {
			location = localStorage.getItem("chefLoc")

		}

		let cheflocation = location.split(",")
		let lat1 = vendorLatLng[0];
		let lon1 = vendorLatLng[1];
		// let radiusDiff = 0;

		// let lat2 = localStorage.getItem('lat');
		let lat2 = cheflocation[0]
		// let lon2 = localStorage.getItem('lng');
		let lon2 = cheflocation[1]
		var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
		var dLon = this.deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2)
			;
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		// console.log(d)
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

	setStateFromInput = (event) => {
		var obj = {};
		// this.setState({
		//     // total: parseFloat(this.state.total) + parseFloat(this.state.discount1)
		// })
		obj[event.target.name] = event.target.value.toUpperCase();
		this.setState(obj);
		// this.setState({
		//     discount1: ''
		// })
	}
	promocodeHandler = (event) => {
		this.setState({ promocode: event.target.value })
	}

	handlePromo = async () => {

		this.setState({
			discount1: '',
			promocode: '',
			showPromocode: false
		})

		const { subTotal, total, packingCharges, deliveryCharges, promocode } = this.state;
		// const { userAddressSelected, subTotal, total, taxes, packingCharges, deliveryCharges, address, addressError, cityName, pushid, lat, lng, flat, name, userCart, deliveryTime, deliveryDate, promocode } = this.state;

		let comp = this

		comp.setState({
			total: parseFloat(subTotal) + (parseInt(packingCharges) + parseInt(deliveryCharges)) + (parseInt(packingCharges) + parseInt(deliveryCharges) * 0.18)
		})
		if (!promocode) {
			message.warning('Please Enter PromoCode');
			return;
		}
		if (parseFloat(subTotal) <= 0) {
			message.warning('Please add items to your cart');
			return;
		}


		firebase.database().ref().child("Promocode").child("User").orderByChild("Name")
			.equalTo(promocode)
			.once("value", function (snapshot) {
				if (snapshot.exists()) {
					var disc = 0, max = 0, min = 0, type = "";
					// var status = ""
					snapshot.forEach(function (snap) {
						disc = snap.val().Discount;
						max = snap.val().MaxAmount;
						min = snap.val().MinAmount;
						// status = snap.val().Status;
						type = snap.val().Type;
					});
					if (type === "Delivery") {
						if (parseFloat(subTotal) > parseFloat(min)) {
							var finalMax = max;
							var b = parseFloat(finalMax);
							var discount = parseFloat(b).toFixed(2);
							if (discount > parseFloat(finalMax))
								discount = parseFloat(finalMax);

							comp.setState({
								discount1: discount,
								total: total - discount,
								promocodeSuccess: true,
								removeDiscount: discount
							});
							// message.warning('Promo Applied Successfully!');
						}
						else {
							// message.warning('Minimum Order Amount is less that required');
							comp.setState({
								promocodeFail: true

							});

						}
					}
					else if (type === "Percentage") {
						if (parseFloat(subTotal) > parseFloat(min)) {
							let finalMaxp = max;
							let b = parseFloat(subTotal) * (parseFloat(disc) / 100.0);
							let discount = parseFloat(b).toFixed(2);
							if (discount > parseFloat(finalMaxp)) {
								discount = parseFloat(finalMaxp);
								// console.log("inside if", discount);
							}

							comp.setState({
								discount1: discount,
								total: total - discount,
								promocodeSuccess: true,
								removeDiscount: discount

							});

							// message.warning('Promo Applied Successfully!');
						}
						else {
							// message.warning('Minimum Order Amount is less that required');
							comp.setState({
								promocodeFail: true
							})

							return;
						}
					}
					else if (type === "Flat") {
						if (parseFloat(subTotal) > parseFloat(min)) {
							let finalMaxF = max;

							let b = parseFloat(disc);
							let discount = parseFloat(b).toFixed(2);
							if (discount > parseFloat(finalMaxF))
								discount = parseFloat(finalMaxF);
							comp.setState({
								discount1: discount,
								total: total - discount,
								promocodeSuccess: true,
								removeDiscount: discount

							});

							// message.warning('Promo Applied Successfully!');
						}
						else {
							comp.setState({
								promocodeFail: true
							})
							// message.warning('Minimum Order Amount is less that required');

							return;
						}
					}
					else {
						comp.setState({
							promocodeNotExits: true
						})

						// message.warning('Promocode Not Exists');
						return;
					}
				}
				else {
					comp.setState({
						promocodeNotExits: true
					})

					// message.warning('Promocode Not Exists');
					return;
				}
			});
		//   this.setState({prmocode:""});//this is function i made

		//   console.log("cityChange", parseFloat(subTotal) + (parseInt(packingCharges) + parseInt(deliveryCharges)) + (parseInt(packingCharges) + parseInt(deliveryCharges) * 0.18))
		//   console.log("subTotal",subTotal)
		//   console.log("city.PackingCharges",packingCharges)
		//   console.log("city.DeliveryCharges",deliveryCharges)
		//   console.log("city.PackingCharges",packingCharges)
		//   console.log("city.DeliveryCharges",deliveryCharges)
		//   console.log("discount1",this.state.removeDiscount)
		//   console.log("discount1",this.state.total)

		//   firebase.database().ref().child("Promocode").child("User").orderByChild("Name")
		//                         .equalTo(promocode)
		//                         .once("value",function(snapshot){
		//                             if(snapshot.exists()){
		//                                 var disc=0,max=0,min=0,status="",type="";
		//                                 snapshot.forEach(function(snap){
		//                                     disc = snap.val().Discount;
		//                                     max = snap.val().MaxAmount;
		//                                     min = snap.val().MinAmount;
		//                                     status = snap.val().Status;
		//                                     type = snap.val().Type;
		//                                 });

		//                                 if(type.equals("Delivery")){
		//                                     if (parseFloat(subTotal)>parseFloat(min)) {
		//                                         var finalMax = max;
		//                                         var b = parseFloat(finalMax);
		//                                         discount =  parseFloat(b).toFixed(2);
		//                                         if(discount > parseFloat(finalMax))
		//                                             discount = parseFloat(finalMax);
		//                                     }
		//                                 }
		//                                 else if(type.equals("Percentage")) {
		//                                     if (parseFloat(subTotal)>parseFloat(min)) {
		//                                         var b = (parseFloat(subTotal) * parseFloat(dis)) / 100.0;
		//                                         discount = form.format(Math.round(b * 100.0) / 100.0);
		//                                         if (Double.parseDouble(discount.getText().toString().substring(1)) > Double.parseDouble(max))
		//                                             discount.setText("\u20b9" + form.format(Double.parseDouble(max)));
		//                                         double tot = Double.parseDouble(total.getText().toString().substring(1)) + Double.parseDouble(delivery.getText().toString().substring(1)) + Double.parseDouble(packing.getText().toString().substring(1)) + Double.parseDouble(taxes.getText().toString().substring(1)) - Double.parseDouble(discount.getText().toString().substring(1)) - Double.parseDouble(discount1.getText().toString().substring(1));
		//                                         grandtotal.setText("\u20b9" + form.format(Math.round(tot * 100.0) / 100.0));
		//                                         proceed.setText("PAY " + grandtotal.getText().toString());
		//                                     }
		//                                 }
		//                                 else if(type.equals("Flat")){
		//                                     if (Double.parseDouble(total.getText().toString().substring(1)) >= Double.parseDouble(min)) {
		//                                         double b = Double.parseDouble(dis);
		//                                         discount.setText("\u20b9" + form.format(Math.round(b * 100.0) / 100.0));
		//                                         if (Double.parseDouble(discount.getText().toString().substring(1)) > Double.parseDouble(max))
		//                                             discount.setText("\u20b9" + form.format(Double.parseDouble(max)));
		//                                         double tot = Double.parseDouble(total.getText().toString().substring(1)) + Double.parseDouble(delivery.getText().toString().substring(1)) + Double.parseDouble(packing.getText().toString().substring(1)) + Double.parseDouble(taxes.getText().toString().substring(1)) - Double.parseDouble(discount.getText().toString().substring(1)) - Double.parseDouble(discount1.getText().toString().substring(1));
		//                                         grandtotal.setText("\u20b9" + form.format(Math.round(tot * 100.0) / 100.0));
		//                                         proceed.setText("PAY " + grandtotal.getText().toString());
		//                                     }
		//                                 }
		//                             }
		//                             else{
		//                                 message.warning('Promocode Not Exists');
		//                                 return;
		//                             }
		//                           });

	}

	handleRemovePromo = async () => {

		this.setState({
			discount1: '',
			removeDiscount: '',
			showPromocode: true
		})

		const { subTotal, total, packingCharges, deliveryCharges, removeDiscount } = this.state;
		// const { userAddressSelected, subTotal, total, taxes, packingCharges, deliveryCharges, address, addressError, cityName, pushid, lat, lng, flat, name, userCart, deliveryTime, deliveryDate, promocode, removeDiscount } = this.state;

		let comp = this

		comp.setState({
			total: parseFloat(subTotal) + (parseInt(packingCharges) + parseInt(deliveryCharges)) + (parseInt(packingCharges) + parseInt(deliveryCharges) * 0.18)
		})
		if (removeDiscount === "" || removeDiscount === "0") {
			message.warning('Please Enter PromoCode');
			return;
		}

		if (parseFloat(subTotal) <= 0) {
			message.warning('Please add items to your cart');
			return;
		}
		comp.setState({
			discount1: "0",
			total: total + parseInt(removeDiscount),

			promocodeRemoved: true
		});
		// console.log(removeDiscount)
		// console.log(total, "After remove")

		//   firebase.database().ref().child("Promocode").child("User").orderByChild("Name")
		//                         .equalTo(promocode)
		//                         .once("value",function(snapshot){
		//                             if(snapshot.exists()){
		//                                 var disc=0,max=0,min=0,status="",type="";
		//                                 snapshot.forEach(function(snap){
		//                                     disc = snap.val().Discount;
		//                                     max = snap.val().MaxAmount;
		//                                     min = snap.val().MinAmount;
		//                                     status = snap.val().Status;
		//                                     type = snap.val().Type;
		//                                 });
		//                                 console.log(type);
		//                                 if(type === "Delivery" ){
		//                                     if (parseFloat(subTotal)>parseFloat(min)) {
		//                                         var finalMax = max;
		//                                         var b = parseFloat(finalMax);
		//                                        var discount =  parseFloat(b).toFixed(2);
		//                                         if(discount > parseFloat(finalMax))
		//                                             discount = parseFloat(finalMax);

		//                                         comp.setState({
		//                                             discount1: discount,
		//                                             total : total - discount,
		//                                             promocodeSuccess: true
		//                                         });
		//                                         // message.warning('Promo Applied Successfully!');
		//                                     }
		//                                     else{
		//                                         // message.warning('Minimum Order Amount is less that required');
		//                                         comp.setState({
		//                                             promocodeFail: true
		//                                         });
		//                                     }
		//                                 }
		//                                 else if(type === "Percentage") {
		//                                     if (parseFloat(subTotal)>parseFloat(min)) {
		//                                         let finalMaxp=max;
		//                                         let b = parseFloat(subTotal) * (parseFloat(disc) / 100.0);
		//                                         let discount = parseFloat(b).toFixed(2);
		//                                         if(discount > parseFloat(finalMaxp)){
		//                                             discount = parseFloat(finalMaxp);
		//                                             console.log("inside if",discount);
		//                                         }

		//                                              comp.setState({
		//                                                 discount1: discount,
		//                                                 total : total - discount,
		//                                                 promocodeSuccess: true
		//                                             });
		//                                             // message.warning('Promo Applied Successfully!');
		//                                     }
		//                                     else{
		//                                         // message.warning('Minimum Order Amount is less that required');
		//                                         comp.setState({
		//                                             promocodeFail: true
		//                                         })
		//                                         return;
		//                                     }
		//                                 }
		//                                 else if(type === "Flat" ){
		//                                     if (parseFloat(subTotal)>parseFloat(min)) {
		//                                         let finalMaxF=max;

		//                                         let b = parseFloat(disc);
		//                                         let discount = parseFloat(b).toFixed(2);
		//                                         if(discount > parseFloat(finalMaxF))
		//                                             discount = parseFloat(finalMaxF);
		//                                             comp.setState({
		//                                                 discount1: discount,
		//                                                 total : total - discount,
		//                                                 promocodeSuccess: true
		//                                             });
		//                                             // message.warning('Promo Applied Successfully!');
		//                                     }
		//                                     else{
		//                                         comp.setState({
		//                                             promocodeFail: true
		//                                         })
		//                                         // message.warning('Minimum Order Amount is less that required');
		//                                         return;
		//                                     }
		//                                 }
		//                                 else{
		//                                     comp.setState({
		//                                         promocodeNotExits: true
		//                                     })
		//                                     // message.warning('Promocode Not Exists');
		//                                     return;
		//                                 }
		//                             }
		//                             else{
		//                                 comp.setState({
		//                                     promocodeNotExits: true
		//                                 })
		//                                 // message.warning('Promocode Not Exists');
		//                                 return;
		//                             }
		//                           });
	}
	handlePlaceOrder = async () => {

		const { userAddressSelected, subTotal, total, taxes, packingCharges, deliveryCharges, addressError, selectedLocation, deliveryTime, deliveryDate, discount1 } = this.state;
		// const { userAddressSelected, subTotal, total, taxes, packingCharges, deliveryCharges, address, addressError, cityName, pushid, lat, lng, flat, name, userCart,selectedLocation, deliveryTime, deliveryDate, discount1 } = this.state;

		// window.axios.defaults.headers = {
		//     'Content-Type': 'application/json',
		// }
		// var orderid = + new Date();
		// window.axios.post('https://liveyumfoods.xyz/Paytm/test1.php?code=https://securegw.paytm.in/theia/paytmCallback?ORDER_ID='+orderid+'&MID=MOTHER88276112838117&ORDER_ID='+orderid+'&AMOUNT='+parseFloat((100)))
		//         .then(function (response) {
		//             $('#loading').hide();
		//             $('#loadingweb').hide();
		//             $('#loadingmob').hide();                    
		//                     var config = {
		//                         "root": "",
		//                         "flow": "DEFAULT",
		//                         "data": {
		//                         "orderId": orderid, 
		//                         "token": response.data.body["txnToken"],
		//                         "tokenType": "TXN_TOKEN",
		//                         "amount": parseFloat(100)
		//                         },
		//                         "handler": {
		//                         "notifyMerchant": function(eventName,data){
		//                             console.log("notifyMerchant handler function called");
		//                             console.log("eventName => ",eventName);
		//                             console.log("data => ",data);
		//                         } 
		//                       }
		//                     }                            
		//                     console.log(window.Paytm)
		//                     console.log(window.Paytm.CheckoutJS)
		//                         window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
		//                             // initialze configuration using init method 
		//                             window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
		//                                 // after successfully updating configuration, invoke JS Checkout
		//                                 window.Paytm.CheckoutJS.invoke();
		//                             }).catch(function onError(error){
		//                                 console.log("error => ",error);
		//                             });
		//                         });
		//         })
		//         .catch(function (error) {
		//             console.log(error);
		//             $('#loading').hide();
		//             $('#loadingweb').hide();
		//             $('#loadingmob').hide();
		//         });


		if (parseFloat(subTotal) <= 0) {
			message.warning('Please add items to your cart');
			return;
		}

		if (!userAddressSelected) {
			message.warning('Please Select Your Address First');
			return;
		}

		// const location = localStorage.getItem("chefLoc")
		let currentRedius = localStorage.getItem("radius");


		// if (currentRedius < (await this.getRadiusBetweenTwoLocations1(String(location)))) {
		if (currentRedius < this.getUserRadiusBetweenTwoLocations1(String(selectedLocation))) {
			this.setState({ showAddress: true })
			return;
		}



		if (addressError) {
			// message.warning('not serviceable in this area');
			this.setState({ showAddress: true })
			return;
		}


		const preOrder = get(this.props, 'location.state.preorder', '');

		// if (!deliveryTime) {
		//     message.warning('Please Select Delivery Time!');
		//     return;
		// }
		const DeliveryTime = preOrder ? deliveryTime : 'Immediately';


		const date1 = Moment(new Date()).format('ddMMyy');
		const date2 = Moment(new Date()).format('YYYY-MM-DD');
		const date3 = Moment(new Date()).format('DD,MMM YYYY HH:mm');
		const DeliveryDate = preOrder ? deliveryDate : date2;
		// let pushId = localStorage.getItem('pushid');
		let userId = localStorage.getItem('UserName');
		let chefId = localStorage.getItem('chefId');
		let cityRadius = localStorage.getItem('radius');
		let userNumber = localStorage.getItem('phoneNumber');
		let userName = localStorage.getItem('Name');
		const orderNo = userName.substring(3, 6) + date1 + Math.floor(Math.random() * 10000);

		// console.log(total)

		if (chefId === null || chefId === '') { return; }

		const user = await firebase
			.database()
			.ref("Users")
			.child(userId)
			.once("value");


		if (user.exists()) {
			const vendor = await firebase
				.database()
				.ref("CloudKitchen")
				.child(chefId)
				.once("value");

			if (vendor.exists()) {
				// console.log('')
				const distance = await this.getRadiusBetweenTwoLocations(vendor.val());
				// console.log(vendor.val())
				// console.log(cityRadius)
				// console.log('getRadiusBetweenTwoLocations', distance, cityRadius, distance > cityRadius)
				if (distance > parseInt(cityRadius)) {
					this.setState({ showAddress: true })
					// this.setState({ addressError: 'not serviceable in this area' });
					return;
				}

				window.axios.defaults.headers = {
					'Content-Type': 'application/json',
				}





				window.axios.post('https://liveyumfoods.xyz/ordersmothers.php?amount=' + parseFloat((total) * 100).toFixed(0))
					.then(function (response) {
						// console.log(response.data);
						$('#loading').hide();
						$('#loadingweb').hide();
						$('#loadingmob').hide();
						var options = {
							"key": "rzp_live_hixZG1ClXcmfK5", // Enter the Key ID generated from the Dashboard
							"amount": parseFloat((total) * 100).toFixed(0), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
							"currency": "INR",
							"name": "Mothers Food",
							"description": "",
							"image": "../assets/img/logo.png",
							"order_id": response.data,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
							"handler": function (response) {
								try {
									var firebaseref = firebase.database().ref().child("Orders").push();
									firebaseref.child("Pushid").set(firebaseref.getKey());
									firebaseref.child("UserId").set(userId);
									firebaseref.child("Payment").set("ONLINE");
									firebaseref.child("Status").set("1");
									firebaseref.child("Subtotal").set(`${subTotal}`);
									firebaseref.child("Total").set(`${total}`);
									firebaseref.child("DeliveryCharges").set(`${deliveryCharges}`);
									firebaseref.child("Discount").set(`${discount1}`);
									firebaseref.child("Packing").set(`${packingCharges}`);
									firebaseref.child("Taxes").set(`${taxes}`);
									firebaseref.child("Number").set(userNumber);
									firebaseref.child("Flat").set(get(userAddressSelected, 'Flat', ''));
									firebaseref.child("LocationCoordinates").set(get(userAddressSelected, 'Coord', ''));
									firebaseref.child("Address").set(get(userAddressSelected, 'Address', ''));
									firebaseref.child("CName").set(userName);
									firebaseref.child("OrderNo").set(orderNo);
									firebaseref.child("OrderDate").set(date2);
									firebaseref.child("OrderDateTime").set(date3);
									firebaseref.child("RazorpayId").set(response.razorpay_payment_id);
									firebaseref.child("OrderType").set("Regular");
									// firebaseref.child("Chef").set(get(vendor.val(), 'Name', ''));
									firebaseref.child("Chef").set("MFCK28977");
									// firebaseref.child("ChefStatus").set(get(vendor.val(), 'Status', ''));
									firebaseref.child("ChefStatus").set(get(vendor.val(), 'Status', ''));
									firebaseref.child("ChefName").set(get(vendor.val(), 'Name', ''));
									firebaseref.child("ChefImage").set(get(vendor.val(), 'PP', ''));
									firebaseref.child("ChefLoc").set(get(vendor.val(), 'Location', ''));
									firebaseref.child("ChefCity").set(get(vendor.val(), 'City'));
									firebaseref.child("ChefLocality").set(get(vendor.val(), 'Locality', ''));
									firebaseref.child("ChefCommision").set(get(vendor.val(), 'Commision', ''));
									firebaseref.child("DeliveryPrice").set('');   // TODO:?
									firebaseref.child("Distance").set(distance);
									firebaseref.child("DeliveryDate").set(DeliveryDate);
									firebaseref.child("DeliveryTime").set(DeliveryTime);
									firebaseref.child("ChefDeliveryCharges").set("0");

									firebaseref.child("RazorpayOrderID").set(response.razorpay_order_id);
									firebaseref.child("RazorpaySignature").set(response.razorpay_signature);



									firebase.database().ref().child("Users").child(userId).child("Cart")
										.once("value", function (snapshot) {
											firebaseref.child("Cart").set(snapshot.val());
											firebase.database().ref().child("Users").child(userId).child("Cart").remove();

											message.success('Order Completed Successfully!');

											localStorage.removeItem('chefId');
											localStorage.removeItem('chefLoc');
											localStorage.removeItem('chefAddress');
											localStorage.removeItem('chefName');
											localStorage.removeItem('chefPhoto')
											localStorage.removeItem('KitchenName')
											localStorage.removeItem('Local')
											window.location = "/profile"
										});



									//var firebaserefUser = firebase.database().ref().child("Users").child(userName);
									// userCart.map((cartItem) => {
									//     console.log('cartItem Deleted', cartItem.PushId)
									//     cartItem.Qty = 0;
									//     this.props.setCart(cartItem);
									//     //firebaserefUser.child("Cart").child(cartItem.PushId).remove().then((res)=> console.log('cart removed successfullt')).caatch((err) => console.log('cart remoed error', err))
									// });

								} catch (error) {
									console.log(error);
									message.error('something error happen');
								}
								alert("Submitted Successfully!");
							},
							//   "prefill": {
							//       "name": data.name,
							//       "email": data.email,
							//       "contact": data.number
							//   },
							"notes": {
								"address": "Begumpet, Hyderabad"
							},
							"theme": {
								"color": "#295A274"
							}
						};
						var rzp1 = new window.Razorpay(options);
						rzp1.open();
					})
					.catch(function (error) {
						console.log(error);
						$('#loading').hide();
						$('#loadingweb').hide();
						$('#loadingmob').hide();
					});


			}
		}

	}

	updatevalueFunc = (event) => {
		const { searchedPlaceAPIData } = event;
		const { cities, subTotal, discount1 } = this.state;
		this.setState({ lat: '' });
		this.setState({ lng: '' });
		// console.log('searchedPlaceAPIData', searchedPlaceAPIData);
		if (!isEmpty(searchedPlaceAPIData)) {
			this.setState({ searchedPlaceAPIData: searchedPlaceAPIData });
			Geocode.fromAddress(searchedPlaceAPIData[0].formatted_address).then(response => {
				const { lat, lng } = response.results[0].geometry.location;
				this.setState({ lat: lat });
				this.setState({ lng: lng });
				for (let city of cities) {
					if (response.results[0].formatted_address.includes(city.Name)) {
						//if ("Bengaluru".includes(city.Name)) {
						this.setState({ cityName: city.Name });
						this.setState({ pushid: city.PushId });
						this.setState({ radius: city.Radius });
						this.setState({ packingCharges: city.PackingCharges });
						this.setState({ deliveryCharges: city.DeliveryCharges });
						this.setState({ taxes: (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges)) * 0.18 });
						this.setState({ total: subTotal + (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges)) + (parseInt(city.PackingCharges) + parseInt(city.DeliveryCharges) * 0.18) - parseFloat(discount1) });
						this.setState({ addressError: '' });
						return false;
					} else {
						this.setState({ addressError: 'not serviceable in this area' });
						//return false;
						// alert('not serviceable in this area');
					}
				}
			})
		}

	};
	isDate = (val) => {
		// Cross realm comptatible
		return Object.prototype.toString.call(val) === '[object Date]'
	}

	isObj = (val) => {
		return typeof val === 'object'
	}

	stringifyValue = (val) => {
		if (this.isObj(val) && !this.isDate(val)) {
			return JSON.stringify(val)
		} else {
			return val
		}
	}

	buildForm = ({ action, params }) => {
		const form = document.createElement('form')
		form.setAttribute('method', 'post')
		form.setAttribute('action', action)

		Object.keys(params).forEach(key => {
			const input = document.createElement('input')
			input.setAttribute('type', 'hidden')
			input.setAttribute('name', key)
			input.setAttribute('value', this.stringifyValue(params[key]))
			form.appendChild(input)
		})

		return form
	}

	post = (details) => {
		const form = this.buildForm(details)
		document.body.appendChild(form)
		form.submit()
		form.remove()
	}
	handlePaytm = (event) => {
		event.preventDefault()
		window.axios.defaults.headers = {
			'Content-Type': 'application/json',
		}
		var orderid = new Date().getTime();
		window.axios.post('https://liveyumfoods.xyz/Paytm/test1.php?code=https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=' + orderid + '&MID=MOTHER88276112838117&ORDER_ID=' + orderid + '&AMOUNT=' + parseFloat((100)))
			.then(function (response) {
				// console.log(response.data)

				var config = {
					"root": "",
					"flow": "DEFAULT",
					"data": {
						"orderId": orderid,
						"token": response.data.body["txnToken"],
						"tokenType": "TXN_TOKEN",
						"amount": parseFloat(100)


					},
					"handler": {
						"notifyMerchant": function (eventName, data) {
							// console.log("notifyMerchant handler function called");
							// console.log("eventName => ",eventName);
							// console.log("data => ",data);
						}
					}
				}
				// console.log(window.Paytm)
				window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
					// initialze configuration using init method 
					window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
						// after successfully updating configuration, invoke JS Checkout
						window.Paytm.CheckoutJS.invoke();
					}).catch(function onError(error) {
						console.log("error => ", error);
					});
				});
				// console.log(window.Paytm.CheckoutJS)
				let details = {
					action: "https://securegw-stage.paytm.in/order/process",
					params: response.data
				}
				this.post(details)
			})
			.catch(function (error) {
				console.log(error);

			});

	}

	onShowImage = () => {
		let image = localStorage.getItem('chefPhoto')
		let kitchenName = localStorage.getItem('KitchenName')
		let localFood = localStorage.getItem('Local')
		let chefName = localStorage.getItem('chefName')
		// console.log(image)
		if (localFood === "Yes") {
			return (

				<div className="row">
					<div className="col-3 text-left"><img src={String(image)} style={{ width: "50px" }} alt="" /></div>
					<div className="col-9 " style={{ marginTop: "4%" }}><h6 className="text-left" alt="">{kitchenName}</h6></div>
				</div>
			)
		} else {
			return (

				<div className="row">
					<div className="col-3 text-left"><img src={String(image)} style={{ width: "50px" }} alt="" /></div>
					<div className="col-9 " style={{ marginTop: "4%" }}><h6 className="text-left">{chefName}</h6></div>
				</div>
			)
		}

	}

	//START TEMPLATE CODE

	hideAddressModal = () => this.setState({ showAddressModal: false });
	getQty = ({ id, quantity }) => {
		//console.log(id);
		//console.log(quantity);
	}
	//End TEMPLATE CODE


	render() {
		const { deliveryDate, deliveryTime, userCart, userAddresses, showAddressModal, packingCharges, deliveryCharges, subTotal, total, addressError, lat, lng, userAddressSelected, taxes, discount1 } = this.state;
        // const { deliveryDate, deliveryTime, userCart, userAddresses, showAddressModal, packingCharges, deliveryCharges, subTotal, total, addressError, showCashOnDeliveryOption, ActiveCashOnDelivery, lat, lng, userAddressSelected, taxes, discount1 } = this.state;

        const preOrder = get(this.props, 'location.state.preorder', '');
		return (
			<section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
				           {this.state.showAddress ? (
                    <SweetAlert
                        title="Warning!"
                        warning
                        confirmBtnBsStyle="success"
                        onConfirm={() => this.setState({ showAddress: false })}
                    >
                        The Order cannot be delivered to this location.
                    </SweetAlert>
                ) : null}
                {this.state.promocodeSuccess ? (
                    <SweetAlert
                        title="Success!"
                        success
                        confirmBtnBsStyle="success"
                        onConfirm={() => this.setState({ promocodeSuccess: false })}
                    >
                        Promo Code applied Successfully.
                    </SweetAlert>
                ) : null}
                {this.state.promocodeFail ? (
                    <SweetAlert
                        title="Warning!"
                        warning
                        confirmBtnBsStyle="success"
                        onConfirm={() => this.setState({ promocodeFail: false })}
                    >
                        Minimum Order Amount is less that required.
                    </SweetAlert>
                ) : null}
                {this.state.promocodeNotExits ? (
                    <SweetAlert
                        title="Warning!"
                        warning
                        confirmBtnBsStyle="success"
                        onConfirm={() => this.setState({ promocodeNotExits: false })}
                    >
                        Promcode not exists.
                    </SweetAlert>
                ) : null}
                {this.state.promocodeRemoved ? (
                    <SweetAlert
                        title="Success!"
                        success
                        confirmBtnBsStyle="success"
                        onConfirm={() => this.setState({ promocodeRemoved: false })}
                    >
                        Promo Code removed Successfully.
                    </SweetAlert>
                ) : null}
                <Modal
                    title="Add New Address"
                    visible={showAddressModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="card-body">
                        <form >
                            <div className="form-group" >
                                <div >
                                    <MapAutoComplete updatevalue={(value) => this.updatevalueFunc(value)} />                                {/* <button onClick={getLocation}  style={{ background: "white", color: "#EA6767",border: 'none', margin: "auto", position: 'absolute', left: '65%', cursor: 'pointer'  }} type="button">
                                    <CurrentLocation size={24} style={{marginRight: '5px'}}/>Locate Me</button> */}

                                    {lat && lng ?
                                        <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '30px' }}>
                                            <SingleMap latitude={lat} longitude={lng} />
                                        </div> : null}
                                    {/* <form onSubmit={this.handleAddressSelectionSubmitAdd}> */}
                                    <form>
                                        <div className="form-group">
                                            <input type="text" name="flat" placeholder="HOUSE/FLAT NO" className="form-control" onChange={this.handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="name" placeholder="SAVE ADDRESS AS" className="form-control" onChange={this.handleInputChange} required />
                                        </div>
                                        {/* <button type="submit"  className="btn float-right" style={{ background: "#FFEFED", color: "#EA6767", border: "solid 1px #EA6767", marginRight: "0%", marginTop: "5%" }} >Add</button> */}
                                    </form>
                                </div>
                                {/* {error?
                                <div className="error">{error}</div>:null} */}
                            </div>

                            <div className="form-group text-center m-bottom-20">
                                {/* <button onClick={changeLocation}className="btn btn-secondary" style={{ background: "#EA6767", color: "white", border: "#EA6767", margin: "auto" }} type="button">Locate</button> */}
                            </div>
                        </form>

                    </div>
                </Modal>
				{/* <AddAddressModal show={this.state.showAddressModal} onHide={this.hideAddressModal} /> */}
				<Container>
					<Row>
						<Col md={8}>
							<div className="offer-dedicated-body-left">
								<div className="bg-white rounded shadow-sm p-4 mb-4">
									<h6 className="mb-3">You may also like</h6>
									<ItemsCarousel />
								</div>
								<div className="pt-2"></div>
								<div className="bg-white rounded shadow-sm p-4 mb-4">
									<h4 className="mb-1">Choose a delivery address</h4>
									<h6 className="mb-3 text-black-50">Multiple addresses in this location</h6>
									<Row>
										<Col md={6}>
											<ChooseAddressCard
												boxclassName="border border-success"
												title='Work'
												icoIcon='briefcase'
												iconclassName='icofont-3x'
												address='NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
											/>
										</Col>
										<Col md={6}>
											<ChooseAddressCard
												title='Work'
												icoIcon='briefcase'
												iconclassName='icofont-3x'
												address='NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
											/>
										</Col>
										<Col md={6}>
											<ChooseAddressCard
												title='Work'
												icoIcon='briefcase'
												iconclassName='icofont-3x'
												address='NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
											/>
										</Col>
										<Col md={6}>
											<ChooseAddressCard
												title='Work'
												icoIcon='briefcase'
												iconclassName='icofont-3x'
												type="newAddress"
												address='NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
												onAddNewClick={() => this.setState({ showAddressModal: true })}
											/>
										</Col>
									</Row>
								</div>
								<div className="pt-2"></div>
								<div className="bg-white rounded shadow-sm p-4 osahan-payment">
									<h4 className="mb-1">Choose payment method</h4>
									<h6 className="mb-3 text-black-50">Credit/Debit Cards</h6>
									<Tab.Container id="left-tabs-example" defaultActiveKey="first">
										<Row>
											<Col sm={4} className="pr-0">
												<Nav variant="pills" className="flex-column">
													<Nav.Link eventKey="first"><Icofont icon="credit-card" /> Credit/Debit Cards</Nav.Link>
													<Nav.Link eventKey="second"><Icofont icon="id-card" /> Food Cards</Nav.Link>
													<Nav.Link eventKey="third"><Icofont icon="card" /> Credit</Nav.Link>
													<Nav.Link eventKey="fourth"><Icofont icon="bank-alt" /> Netbanking</Nav.Link>
													<Nav.Link eventKey="fifth"><Icofont icon="money" /> Pay on Delivery</Nav.Link>
												</Nav>
											</Col>
											<Col sm={8} className="pl-0">
												<Tab.Content className='h-100'>
													<Tab.Pane eventKey="first">
														<h6 className="mb-3 mt-0 mb-3">Add new card</h6>
														<p>WE ACCEPT <span className="osahan-card">
															<Icofont icon="visa-alt" /> <Icofont icon="mastercard-alt" /> <Icofont icon="american-express-alt" /> <Icofont icon="payoneer-alt" /> <Icofont icon="apple-pay-alt" /> <Icofont icon="bank-transfer-alt" /> <Icofont icon="discover-alt" /> <Icofont icon="jcb-alt" />
														</span>
														</p>
														<Form>
															<div className="form-row">
																<Form.Group className="col-md-12">
																	<Form.Label>Card number</Form.Label>
																	<InputGroup>
																		<Form.Control type="number" placeholder="Card number" />
																		<InputGroup.Append>
																			<Button variant="outline-secondary" type="button" id="button-addon2"><Icofont icon="card" /></Button>
																		</InputGroup.Append>
																	</InputGroup>
																</Form.Group>
																<Form.Group className="col-md-8">
																	<Form.Label>Valid through(MM/YY)
	                                             </Form.Label>
																	<Form.Control type="number" placeholder="Enter Valid through(MM/YY)" />
																</Form.Group>
																<Form.Group className="col-md-4">
																	<Form.Label>CVV
	                                             </Form.Label>
																	<Form.Control type="number" placeholder="Enter CVV Number" />
																</Form.Group>
																<Form.Group className="col-md-12">
																	<Form.Label>Name on card
	                                             </Form.Label>
																	<Form.Control type="text" placeholder="Enter Card number" />
																</Form.Group>
																<Form.Group className="col-md-12">
																	<Form.Check
																		custom
																		type="checkbox"
																		id="custom-checkbox1"
																		label="Securely save this card for a faster checkout next time."
																	/>
																</Form.Group>
																<Form.Group className="col-md-12 mb-0">
																	<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY $1329
	                                             	<Icofont icon="long-arrow-right" />
																	</Link>
																</Form.Group>
															</div>
														</Form>
													</Tab.Pane>
													<Tab.Pane eventKey="second">
														<h6 className="mb-3 mt-0 mb-3">Add new food card</h6>
														<p>WE ACCEPT  <span className="osahan-card">
															<i className="icofont-sage-alt"></i> <i className="icofont-stripe-alt"></i> <i className="icofont-google-wallet-alt-1"></i>
														</span>
														</p>
														<Form>
															<div className="form-row">
																<Form.Group className="col-md-12">
																	<Form.Label>Card number</Form.Label>
																	<InputGroup>
																		<Form.Control type="number" placeholder="Card number" />
																		<InputGroup.Append>
																			<Button variant="outline-secondary" type="button" id="button-addon2"><Icofont icon="card" /></Button>
																		</InputGroup.Append>
																	</InputGroup>
																</Form.Group>
																<Form.Group className="col-md-8">
																	<Form.Label>Valid through(MM/YY)
	                                             </Form.Label>
																	<Form.Control type="number" placeholder="Enter Valid through(MM/YY)" />
																</Form.Group>
																<Form.Group className="col-md-4">
																	<Form.Label>CVV
	                                             </Form.Label>
																	<Form.Control type="number" placeholder="Enter CVV Number" />
																</Form.Group>
																<Form.Group className="col-md-12">
																	<Form.Label>Name on card
	                                             </Form.Label>
																	<Form.Control type="text" placeholder="Enter Card number" />
																</Form.Group>
																<Form.Group className="col-md-12">
																	<Form.Check
																		custom
																		type="checkbox"
																		id="custom-checkbox"
																		label="Securely save this card for a faster checkout next time."
																	/>
																</Form.Group>
																<Form.Group className="col-md-12 mb-0">
																	<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY $1329
	                                             	<Icofont icon="long-arrow-right" />
																	</Link>
																</Form.Group>
															</div>
														</Form>
													</Tab.Pane>
													<Tab.Pane eventKey="third">
														<div className="border shadow-sm-sm p-4 d-flex align-items-center bg-white mb-3">
															<Icofont icon="apple-pay-alt" className="mr-3 icofont-3x" />
															<div className="d-flex flex-column">
																<h5 className="card-title">Apple Pay</h5>
																<p className="card-text">Apple Pay lets you order now & pay later at no extra cost.</p>
																<Link to="#" className="card-link font-weight-bold">LINK ACCOUNT <Icofont icon="link-alt" /></Link>
															</div>
														</div>
														<div className="border shadow-sm-sm p-4 d-flex bg-white align-items-center mb-3">
															<Icofont icon="paypal-alt" className="mr-3 icofont-3x" />
															<div className="d-flex flex-column">
																<h5 className="card-title">Paypal</h5>
																<p className="card-text">Paypal lets you order now & pay later at no extra cost.</p>
																<Link to="#" className="card-link font-weight-bold">LINK ACCOUNT <Icofont icon="link-alt" /></Link>
															</div>
														</div>
														<div className="border shadow-sm-sm p-4 d-flex bg-white align-items-center">
															<Icofont icon="diners-club" className="mr-3 icofont-3x" />
															<div className="d-flex flex-column">
																<h5 className="card-title">Diners Club</h5>
																<p className="card-text">Diners Club lets you order now & pay later at no extra cost.</p>
																<Link to="#" className="card-link font-weight-bold">LINK ACCOUNT <Icofont icon="link-alt" /></Link>
															</div>
														</div>
													</Tab.Pane>
													<Tab.Pane eventKey="fourth">
														<h6 className="mb-3 mt-0 mb-3">Netbanking</h6>
														<Form>
															<ButtonToolbar>
																<ToggleButtonGroup className="d-flex w-100" type="checkbox" name="options" defaultValue={1}>
																	<ToggleButton variant='info' value={1}>
																		HDFC <Icofont icon="check-circled" />
																	</ToggleButton>
																	<ToggleButton variant='info' value={2}>
																		ICICI <Icofont icon="check-circled" />
																	</ToggleButton>
																	<ToggleButton variant='info' value={3}>
																		AXIS <Icofont icon="check-circled" />
																	</ToggleButton>
																</ToggleButtonGroup>
															</ButtonToolbar>
															<hr />
															<div className="form-row">
																<Form.Group className="col-md-12">
																	<Form.Label>Select Bank
	                                             </Form.Label>
																	<br />
																	<Form.Control as="select" className="custom-select">
																		<option>Bank</option>
																		<option>One</option>
																		<option>Two</option>
																		<option>Three</option>
																	</Form.Control>
																</Form.Group>
																<Form.Group className="col-md-12 mb-0">
																	<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY $1329
	                                             <Icofont icon="long-arrow-right" /></Link>
																</Form.Group>
															</div>
														</Form>
													</Tab.Pane>
													<Tab.Pane eventKey="fifth">
														<h6 className="mb-3 mt-0 mb-3">Cash</h6>
														<p>Please keep exact change handy to help us serve you better</p>
														<hr />
														<Form>
															<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY $1329
	                                       <Icofont icon="long-arrow-right" /></Link>
														</Form>
													</Tab.Pane>
												</Tab.Content>
											</Col>
										</Row>
									</Tab.Container>
								</div>
							</div>
						</Col>
						<Col md={4}>
							<div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
								<div className="d-flex mb-4 osahan-cart-item-profile">
									<Image fluid className="mr-3 rounded-pill" alt="osahan" src="/img/2.jpg" />
									<div className="d-flex flex-column">
										<h6 className="mb-1 text-white">Spice Hut Indian Restaurant
                           </h6>
										{/* <p className="mb-0 text-white"><Icofont icon="location-pin" /> 2036 2ND AVE, NEW YORK, NY 10029</p> */}
									</div>
								</div>
								<div className="bg-white rounded shadow-sm mb-2">
									{get(userCart, 'length', 0) > 0 ?
										<>
											{this.onShowImage()}
											{userCart.map((cartItem, index) => {
												return (
													<>
														<CheckoutItem
														key={index}
															itemName={cartItem.Name}
															price={314}
															priceUnit="$"
															id={1}
															qty={2}
															show={true}
															minValue={0}
															maxValue={7}
															getValue={this.getQty}
															onDecrement={() => this.handleDecreaseQuantity(cartItem)}
															onIncrement={() => this.handleIncreaseQuantity(cartItem)}
															quantity={get(cartItem, 'Qty', '3')}
														/>
														{/* <CheckoutItem
															itemName="Cheese corn Roll"
															price={260}
															priceUnit="$"
															id={1}
															qty={1}
															show={true}
															minValue={0}
															maxValue={7}
															getValue={this.getQty}
														/>
														<CheckoutItem
															itemName="Mixed Veg"
															price={122}
															priceUnit="$"
															id={1}
															qty={1}
															show={true}
															minValue={0}
															maxValue={7}
															getValue={this.getQty}
														/>
														<CheckoutItem
															itemName="Black Dal Makhani"
															price={652}
															priceUnit="$"
															id={1}
															qty={1}
															show={true}
															minValue={0}
															maxValue={7}
															getValue={this.getQty}
														/>
														<CheckoutItem
															itemName="Mixed Veg"
															price={122}
															priceUnit="$"
															id={1}
															qty={1}
															show={true}
															minValue={0}
															maxValue={7}
															getValue={this.getQty}
														/> */}
													</>
												)
											})}</> : ''}

								</div>
								<div className="mb-2 bg-white rounded p-2 clearfix">
									<InputGroup className="input-group-sm mb-2">
										<Form.Control type="text" placeholder="Enter promo code" />
										<InputGroup.Append>
											<Button variant="primary" type="button" id="button-addon2"><Icofont icon="sale-discount" /> APPLY</Button>
										</InputGroup.Append>
									</InputGroup>
									<InputGroup className="mb-0">
										<InputGroup.Prepend>
											<InputGroup.Text><Icofont icon="comment" /></InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control as="textarea" placeholder="Any suggestions? We will pass it on..." aria-label="With textarea" />
									</InputGroup>
								</div>
								<div className="mb-2 bg-white rounded p-2 clearfix">
									<p className="mb-1">Item Total <span className="float-right text-dark">$3140</span></p>
									<p className="mb-1">Restaurant Charges <span className="float-right text-dark">$62.8</span></p>
									<p className="mb-1">Delivery Fee
                    		<OverlayTrigger
											key="top"
											placement="top"
											overlay={
												<Tooltip id="tooltip-top">
													Total discount breakup
						        </Tooltip>
											}
										>
											<span className="text-info ml-1">
												<Icofont icon="info-circle" />
											</span>
										</OverlayTrigger>
										<span className="float-right text-dark">$10</span>

									</p>
									<p className="mb-1 text-success">Total Discount
                           <span className="float-right text-success">$1884</span>
									</p>
									<hr />
									<h6 className="font-weight-bold mb-0">TO PAY  <span className="float-right">$1329</span></h6>
								</div>
								<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY $1329
                 	<Icofont icon="long-arrow-right" /></Link>
							</div>
							<div className="pt-2"></div>
							<div className="alert alert-success" role="alert">
								You have saved <strong>$1,884</strong> on the bill
	                  </div>
							<div className="pt-2"></div>
							<div className="text-center pt-2">
								<Image fluid src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads" />
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
}
const mapStateToProps = (state) => {
    return {
        product: state.product,
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCart: (cartItem) => dispatch(Cart(cartItem)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
