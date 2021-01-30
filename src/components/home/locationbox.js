/* eslint-disable no-unused-vars */

// import MediaQuery from 'react-responsive'
import React, { Fragment, useState } from "react";
import Script from "react-load-script";
import Geocode from "react-geocode";
import firebase from "../Firebase";
import "./style.css";
// import {useAppContext} from './context/appContext';
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icofont from "react-icofont";

// import { geolocated } from "react-geolocated";
import { get } from "lodash";
import { CurrentLocation } from "@styled-icons/boxicons-regular";
// import '../../../styles/center.css'
import { message } from "antd";
// import { FormatListNumbered } from 'styled-icons/material-twotone';

Geocode.setApiKey("AIzaSyCPhxfpptoIc1yca5U8mXIigIajoERQCdE");
Geocode.setLanguage("en");

const APIKEY = "AIzaSyCPhxfpptoIc1yca5U8mXIigIajoERQCdE";
const googleUrl = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&libraries=places`;
var autocomplete;

const LocationBox = (props) => {
  // const innerRef = useRef();
  // const {appState,setAppLocation} = useAppContext();
  const [error, setError] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [allCities, setFetchlocation] = useState({ cities: [], loading: true });
  const [userlocation, setLocation] = useState({
    city: "",
    query: "",
    lat: "",
    lng: "",
  });

  React.useEffect(() => {
    let isUnmount = false;

    firebase
      .database()
      .ref("Masters")
      .child("City")
      .once(
        "value",
        (snapshot) => {
          if (snapshot.exists()) {
            if (!isUnmount) {
              setFetchlocation({
                cities: Object.values(snapshot.val()),
                loading: false,
              });
            }
            return false;
          }
        },
        () => {}
      );
    if (!isUnmount) {
      setFetchlocation({ cities: [], loading: false });
    }

    // if(!isUnmount){
    //     // fetchAllLocation();

    // }

    return () => {
      isUnmount = true;
    };
  }, []);

  const handleScriptLoad = () => {
    const options = {
      types: [],
      componentRestrictions: { country: "in" },
    };

    autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    autocomplete.setFields(["address_components", "formatted_address"]);
    autocomplete.addListener("place_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    setError("");
    const addressObject = autocomplete.getPlace();
    const address = addressObject.address_components;
    if (address) {
      localStorage.setItem("formattedAddress", addressObject.formatted_address);
      setLocation({
        city: address[0]["long_name"],
        query: addressObject.formatted_address,
        lat: "",
        lng: "",
      });
    }
  };

  // const fetchAllLocation = ()=>{
  //     firebase.database().ref('Masters').child('City').once('value',(snapshot)=>{
  //         if(snapshot.exists()){
  //             setFetchlocation({cities:Object.values(snapshot.val()), loading: false});
  //             return false;
  //         }
  //     },()=>{

  //     })
  //     setFetchlocation({cities:[], loading:false});
  // }

  const getCoordinates = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    localStorage.setItem("lat", position.coords.latitude);
    localStorage.setItem("lng", position.coords.longitude);
    Geocode.fromLatLng(
      get(position, "coords.latitude"),
      get(position, "coords.longitude"),
      console.log()
    )
      .then((response) => {
        localStorage.setItem(
          "formattedAddress",
          response.results[0].formatted_address
        );
        setLocation({
          city: response.results[0].address_components[0]["long_name"],
          query: response.results[0].formatted_address,
        });

        let cityInfo = "";
        for (let city of allCities.cities) {
          if (response.results[0].formatted_address.includes(city.Name)) {
            cityInfo = city;
            localStorage.setItem("cityname", city.Name);
            localStorage.setItem("pushid", city.PushId);
            localStorage.setItem("radius", city.Radius);

            // setAppLocation(cityInfo);
            setError("");
            if (props.updateLocation) {
              props.updateLocation();
            }
          } else {
            setError("not serviceable in this area");
            //message.error('Not serviceable in this area');
          }
        }
        if (!cityInfo || cityInfo === "") {
          //setError("not serviceable in this area");

          message.error("Not serviceable in this area");
        }
        // const address = response.results[0].formatted_address;
        // setAddress(address);
      })
      .catch((error) => console.log("Geocode ERROR", error));
  };

  const getLocation = (event) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    }
  };

  const changeLocation = async (event) => {
    event.preventDefault();
    if (allCities.loading) {
      setError("Error While Fetching Cities");
      return false;
    }
    let cityInfo = "";
    for (let city of allCities.cities) {
      if (userlocation.query.includes("Secunderabad")) {
        localStorage.setItem("cityname", "Hyderabad");
        localStorage.setItem("pushid", "-M7Rt3hrXVXrmglMhgMb");
        localStorage.setItem("radius", "4");
        cityInfo = allCities.cities.find(
          (city) => city.PushId === "-M7Rt3hrXVXrmglMhgMb"
        );
        // setAppLocation(cityInfo);
        await Geocode.fromAddress(userlocation.query)
          .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
          })
          .catch((error) => console.log("Geocode ERROR", error));
        if (props.updateLocation) {
          props.updateLocation();
        }
      } else if (
        userlocation.query.includes("Delhi") ||
        userlocation.query.includes("Gurugram") ||
        userlocation.query.includes("New Delhi") ||
        userlocation.query.includes("Noida") ||
        userlocation.query.includes("Ghaziabad") ||
        userlocation.query.includes("Faridabad") ||
        userlocation.query.includes("gurgaon")
      ) {
        localStorage.setItem("cityname", "Delhi");
        localStorage.setItem("pushid", "-M9w7qfvWoy4sRUCqcGQ");
        localStorage.setItem("radius", "5");
        cityInfo = allCities.cities.find(
          (city) => city.PushId === "-M9w7qfvWoy4sRUCqcGQ"
        );
        // setAppLocation(cityInfo);
        await Geocode.fromAddress(userlocation.query)
          .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
          })
          .catch((error) => console.log("Geocode ERROR", error));
        if (props.updateLocation) {
          props.updateLocation();
        }
      } else if (userlocation.query.includes(city.Name)) {
        cityInfo = city;
        localStorage.setItem("cityname", city.Name);
        localStorage.setItem("pushid", city.PushId);
        localStorage.setItem("radius", city.Radius);
        // setAppLocation(cityInfo);
        console.log(cityInfo);
        setError("");
        await Geocode.fromAddress(userlocation.query)
          .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
          })
          .catch((error) => console.log("Geocode ERROR", error));
        if (props.updateLocation) {
          props.updateLocation();
        }
        return false;
      }
    }

    if (!cityInfo) {
      //setError("not serviceable in this area");
      message.error("Not serviceable in this area");
    }
    return false;
  };

  return (
    <Fragment>
      <Script url={googleUrl} onLoad={handleScriptLoad} />

      {/*<div className="login-form d-flex align-items-center">
                <div className="container" style={{ margin: "5%" }}>
                    <div className="row">
                        <div className="col-lg-12 offset-lg-12 col-xl-12 offset-xl-12">
                            <div className="form-wrapper">
                                <div className="card card-shadow">
                                    <div className="card-header OverrideCenter" style={{ background: 'rgb(228, 28, 57)'}}>
                                        <h4 className="text-center NoMargin" style={{ color: "white" }}>Enter Your Location</h4>
                                    </div>
                                    <div className="card-body">
                                        <form >
                                            <div className="form-group" >
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                    <input placeholder="location" className="form-control" id="autocomplete"  />
                                                    <button onClick={getLocation}  style={{ background: "white", color: "#EA6767",border: 'none', margin: "auto", position: 'absolute', left: '65%', cursor: 'pointer'  }} type="button">
                                                         <CurrentLocation size={24} style={{marginRight: '5px'}}/>Locate Me</button>
                                                </div>
                                                {error?
                                                <div className="error">{error}</div>:null}
                                            </div>
                                           
                                            <div className="form-group text-center m-bottom-20">
                                                <button onClick={changeLocation}className="btn btn-danger btn-icon icon-right" style={{ background: "#E41C39", color: "white", margin: "auto" }} type="button">Locate</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            /div> */}
      {/* <<<<<<< Updated upstream

      <Form.Group className="col-lg-7 col-md-7 col-sm-12">
        <Form.Control
          type="text"
          placeholder="Enter your delivery location"
          size="lg"
          id="autocomplete"
        />
        {userlocation.city === "" ? (
          <button
            className="locate-me"
            onClick={getLocation}
            style={{ borderRadius: "50px", marginTop: "-4px", border: "none" }}
          >
            <Icofont icon="ui-pointer" /> Locate Me
          </button>
        ) : (
          ""
        )}
        {error ? <div className="error">{error}</div> : null}
      </Form.Group>
      <Form.Group className="col-lg-2 col-md-2 col-sm-12">
        <Link>
          <button
            onClick={changeLocation}
            className="btn btn-danger btn-block btn-lg btn-round"
          >
            Search
          </button>
        </Link>
      </Form.Group>
      {/* <form >
======= */}

      <Form.Group className="col-lg-7 col-md-7 col-sm-12">
        <Form.Control
          style={{ backgroundColor: "transparent", borderRadius: "12px" }}
          type="text"
          placeholder="Enter your delivery location"
          size="lg"
          id="autocomplete"
        />
        {userlocation.city === "" ? (
          <button
            className="locate-me"
            onClick={getLocation}
            style={{
              borderRadius: "50px",
              marginTop: "-5px",
              border: "none",
              color: "red",
              backgroundColor: "transparent",
            }}
          >
            <Icofont icon="location-pin" size="1" />
            Locate me
          </button>
        ) : (
          ""
        )}
        {error ? (
          <div
            className="card"
            style={{ height: "40px", backgroundColor: "pink" }}
          >
            {error}
          </div>
        ) : null}
      </Form.Group>
      <Form.Group className="col-lg-2 col-md-2 col-sm-12">
        <button
          style={{ borderRadius: "12px" }}
          onClick={changeLocation}
          className="btn btn-danger btn-block btn-lg btn-round"
        >
          Search
        </button>
      </Form.Group>
      {/* <form >
>>>>>>> Stashed changes
                <div className="form-group mt-4" >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input placeholder="Location" style = {{textAlign: "left"}} className="form-control theme-rounded" id="autocomplete"  />
                        {(userlocation.city === '') ? 
                        <button onClick={getLocation}  style={{ background: "white", color: "#E41C39",border: 'none', margin: "auto", position: 'absolute', left: '65%', cursor: 'pointer'  }} type="button">
                                <CurrentLocation size={24} style={{marginRight: '5px'}}/>Locate Me</button>
                                :''}
                    </div>
                    {error?
                    <div className="error">{error}</div>:null}
                </div>
                
                <div className="form-group text-center m-bottom-20">
                    <button onClick={changeLocation} className="btn btn-danger btn-icon icon-right theme-rounded" style={{ background: "#E41C39", color: "white", margin: "auto" }} type="button">Find Food <span className="la la-arrow-right"></span></button>
                </div>
            </form> */}
    </Fragment>
  );
};

// export default geolocated({
//     positionOptions: {
//         enableHighAccuracy: false,
//     },
//     userDecisionTimeout: 5000,
// })(LocationBox);

export default LocationBox;
