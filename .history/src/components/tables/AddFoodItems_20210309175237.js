import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import { Home, Trash, PlusCircle } from 'react-feather';
import { Container, Row, Col, Button, CardHeader, Table, Input } from "reactstrap";
// import {Check,Trash} from 'react-feather';
import app, { storage } from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto; 
  border-color: red;
`;

const AddFoodItems = (props) => {
  const [show, setShow] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [searchValue, setSearchValue] = useState([]);
  const [search, setSearch] = useState("");
  const [foodName, setFoodName] = useState("");
  const [itemName, setItemName] = useState("");
  const [detail, setDetail] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [addon, setAddon] = useState("");
  const [complimentory, setComplimentory] = useState("");
  const [price, setPrice] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [veg, setVeg] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [settlementPrice, setSettlementPrice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [signatureDish, setSignatureDish] = useState(false);
  const [addonName, setAddonName] = useState([]);
  const [searchCuisines, setSearchCuisines] = useState([]);
  const [searchComplimentory, setSearchComplimentory] = useState([]);
  const [complimentoryName, setComplimentoryName] = useState("")
  const [foodType, setFoodType] = useState([]);
  const [cuisineName, setCuisineName] = useState("");
  const [addonList, setAddonList] = useState([]);
  const [selectAddonName, setSelectAddonName] = useState([]);
  const [selectAddonId, setSelectAddonId] = useState([]);

  const [foodTypeList, setFoodTypeList] = useState([]);
  const [selectFoodTypeName, setSelectFoodTypeName] = useState([]);
  const [selectFoodTypeId, setSelectFoodTypeId] = useState([]);

  const [chefCommision, setChefCommision] = useState([])
  const [statecid, setStatecid] = useState([])
  const [portionList, setPortionList] = useState([])
  const [portion, setPortion] = useState("");
  const [portionPrice, setPortionPrice] = useState("");
  const [showPortionTable, setShowPortionTable] = useState("");
  const [itemsNo,setItemsNo] = useState([])

  const [menu,setMenu] = useState("")
  const [menuContent,setMenuContent] = useState([])
  const [menuShow,setMenuShow] = useState(false)
  const [selectMenu,setSelectMenu] = useState("")
  const [menuString,setMenuString] = useState("")
  const [activeSuggestion,setActiveSuggestions] = useState(0)
  const [showSuggestion,setShowSuggestion] = useState(false)
  const [filterSuggestion,setFilterSuggestion] = useState([])
  const [foodNameId,setFoodNameId] = useState("")


  useEffect(() => {
    var cid = [];
    var chefcommision = [];
    var rcityname = [];
    var database = app.database();
    database.ref().child("Masters").child("Addons")
      .once('value', function (snapshot) {
        if (snapshot.exists()) {
          var content = [];
          let addonPushid = []
          let addonName = []
          snapshot.forEach(snap => {
            let val = snap.val()
            addonPushid.push(val.PushId)
            addonName.push(val.Name)
            const locker = {
              PushId: val.PushId,
              Name: val.Name,
            }
            content.push(locker);
          });

          // content.reverse()
          setSelectAddonName(addonName)
          setSelectAddonId(addonPushid)
          setAddonName(content);

        }
      });

    database.ref().child("Masters").child("Complimentary")
      .once('value', function (snapshot) {
        if (snapshot.exists()) {
          var content = [];

          snapshot.forEach(snap => {
            let val = snap.val()
            const locker = {
              PushId: val.PushId,
              Name: val.Name,
            }
            content.push(locker);
          });

          // content.reverse()
          setSearchComplimentory(content);

        }
      });

    app.database().ref().child("CloudKitchen")
      .once('value').then(function (snapshot) {
        snapshot.forEach(function (data) {
          var val = data.val();
          cid.push(val.UserId);
          chefcommision.push(val.Commision);
          rcityname.push(val.City);
        });
        setStatecid(cid)
        setChefCommision(chefcommision)
        // setRcityName(rcityname)

      });

  }, [])

  const onChangeSearchHandler = (event) => {
    setSearch(event.target.value)
  }

  const onClickSearchHandler = (event) => {
    var database = app.database();
    database.ref().child("CloudKitchen").child(search).child("FoodItems")
      .once('value', function (snapshot) {
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
          content.map(item=>{
            if(item.Name===undefined){
              item.Name=""
            }
          })
          setSearchValue(content)
          setItemsNo(contentFood)
        }
      })
      database.ref().child("CloudKitchen").child(search)
      .once('value', function (snapshot) {
        if (snapshot.exists()) {
          if(snapshot.val().ItemMenu!==undefined && snapshot.val().ItemMenu!==""){
            let menuItem = snapshot.val().ItemMenu.split(",")
            setMenuContent(menuItem)
            }
        }
      })

      

    database.ref().child("CloudKitchen").child(search).child("Cuisines")
      .once('value', function (snapshot) {
        if (snapshot.exists()) {
          var content = [];

          snapshot.forEach(snap => {
            let val = snap.val()
            const locker = {
              PushId: val.PushId,
              Name: val.Name
            }
            content.push(locker);
          });
          setSearchCuisines(content)
        }
      })

    database.ref().child("CloudKitchen").child(search).child("FoodType")
      .once('value', function (snapshot) {
        if (snapshot.exists()) {
          var content = [];
          let pushid = [];
          let name = []
          snapshot.forEach(snap => {
            let val = snap.val()
            pushid.push(val.PushId)
            name.push(val.Name)
            const locker = {
              PushId: val.PushId,
              Name: val.Name
            }
            content.push(locker);
          });
          setFoodType(content)
          setSelectFoodTypeName(name)
          setSelectFoodTypeId(pushid)
        }
      })

  }


  const onChangeFoodName = (event) => {
    setShow(true)
    setShowTable(true)
    setShowPortionTable(true)
    // const filterSuggestions = searchValue.filter(suggestion=>suggestion.Name.toLowerCase().indexOf(event.target.value.toLowerCase() > -1))
    const filterSuggestions = searchValue.filter(suggestion=>suggestion.Name.toLowerCase().includes(event.target.value.toLowerCase() ))

    setActiveSuggestions(0)
    setFilterSuggestion(filterSuggestions)
    setShowSuggestion(true)
    setFoodName(event.target.value)
 
    
  }

  const onClickFoodItems = (event)=>{
    setActiveSuggestions(0)
    setFilterSuggestion([])
    setShowSuggestion(false)
    setFoodName(event.target.innerText)
    setFoodNameId(event.target.id)
    var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(event.target.id);
    return firebaseref.on('value',function (snapshot) {
      if (snapshot.exists()) {
        var foodId = snapshot.val().PushId
        window.foodId = foodId
        document.getElementById("price").innerHTML = snapshot.val().Settlement;
        setItemName(snapshot.val().Name)
        if(snapshot.val().Details!==undefined){
          setDetail(snapshot.val().Details)
        }
        setCuisine(snapshot.val().CuisinePushId)
        setComplimentory(snapshot.val().ComplimentaryPushId)
        setVeg(snapshot.val().Category)
        if(snapshot.val().Grams!==undefined){
          setQuantity(snapshot.val().Grams)
        }
        if(snapshot.val().Mrp!==undefined){
          setItemPrice(snapshot.val().Mrp)
        }
        setAddon(snapshot.val().Addons)
        if(snapshot.val().FoodType!==undefined && snapshot.val().FoodType!==""){
          setFoodCategory(snapshot.val().FoodType)

        }
       

        setSettlementPrice(snapshot.val().Price)
        setStartTime(snapshot.val().STime)
        setCloseTime(snapshot.val().ETime)
        setImageAsUrl(snapshot.val().Image)
        setComplimentoryName(snapshot.val().ComplimentaryName)
        setCuisineName(snapshot.val().CuisineName)
        firebaseref.child("ADDONS").once('value').then(function (snap) {
          setAddonList([])
          if (snap.exists()) {
            let content = []
            snap.forEach(data1 => {
              let val = data1.val()
              let data = data1.key
              let locker = {
                data: data,
                price: val
              }
              content.push(locker);
            });

            setAddonList(content)

          }
        })
        firebaseref.child("FOODTYPE").once('value').then( function (snap) {
          setFoodTypeList([])
          if (snap.exists()) {
            let content = []
            snap.forEach(data1 => {
              let val = data1.val()
              let data = data1.key
              let locker = {
                data: data,
                price: data1.val()
              }
              content.push(locker);
            });

            setFoodTypeList(content)

          }
        })
        firebaseref.child("Portions").once('value').then(function (snap) {
          setPortionList([])
          if (snap.exists()) {
            let content = []
            snap.forEach(data1 => {
              let val = data1.val()
              let data = data1.key
              let locker = {
                data: data,
                price: val
              }
              content.push(locker);
            });

            setPortionList(content)

          }
        })
        if (snapshot.val().Signature === "Yes") {
          setSignatureDish(true)
        } else {
          setSignatureDish(false)

        }
      if(snapshot.val().Menu!==undefined&& snapshot.val().Menu!==""){
        setSelectMenu(snapshot.val().Menu)
      }

      }
    })
  }

  const onEnterKey = (event) =>{
    if(event.key==="Enter"){
      setActiveSuggestions(0)
      setFilterSuggestion([])
      setShowSuggestion(false)
      setFoodName(event.target.innerText)
      setFoodNameId(event.target.id)
      var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(event.target.id);
      return firebaseref.on('value',function (snapshot) {
        if (snapshot.exists()) {
          var foodId = snapshot.val().PushId
          window.foodId = foodId
          document.getElementById("price").innerHTML = snapshot.val().Settlement;
          setItemName(snapshot.val().Name)
          if(snapshot.val().Details!==undefined){
            setDetail(snapshot.val().Details)
          }
          setCuisine(snapshot.val().CuisinePushId)
          setComplimentory(snapshot.val().ComplimentaryPushId)
          setVeg(snapshot.val().Category)
          if(snapshot.val().Grams!==undefined){
            setQuantity(snapshot.val().Grams)
          }
          if(snapshot.val().Mrp!==undefined){
            setItemPrice(snapshot.val().Mrp)
          }
          setAddon(snapshot.val().Addons)
          if(snapshot.val().FoodType!==undefined && snapshot.val().FoodType!==""){
            setFoodCategory(snapshot.val().FoodType)
  
          }
         
  
          setSettlementPrice(snapshot.val().Price)
          setStartTime(snapshot.val().STime)
          setCloseTime(snapshot.val().ETime)
          setImageAsUrl(snapshot.val().Image)
          setComplimentoryName(snapshot.val().ComplimentaryName)
          setCuisineName(snapshot.val().CuisineName)
          firebaseref.child("ADDONS").once('value').then(function (snap) {
            setAddonList([])
            if (snap.exists()) {
              let content = []
              snap.forEach(data1 => {
                let val = data1.val()
                let data = data1.key
                let locker = {
                  data: data,
                  price: val
                }
                content.push(locker);
              });
  
              setAddonList(content)
  
            }
          })
          firebaseref.child("FOODTYPE").once('value').then( function (snap) {
            setFoodTypeList([])
            if (snap.exists()) {
              let content = []
              snap.forEach(data1 => {
                let val = data1.val()
                let data = data1.key
                let locker = {
                  data: data,
                  price: data1.val()
                }
                content.push(locker);
              });
  
              setFoodTypeList(content)
  
            }
          })
          firebaseref.child("Portions").once('value').then(function (snap) {
            setPortionList([])
            if (snap.exists()) {
              let content = []
              snap.forEach(data1 => {
                let val = data1.val()
                let data = data1.key
                let locker = {
                  data: data,
                  price: val
                }
                content.push(locker);
              });
  
              setPortionList(content)
  
            }
          })
          if (snapshot.val().Signature === "Yes") {
            setSignatureDish(true)
          } else {
            setSignatureDish(false)
  
          }
        if(snapshot.val().Menu!==undefined&& snapshot.val().Menu!==""){
          setSelectMenu(snapshot.val().Menu)
        }
  
        }
      })
    }
  }
  

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      setActiveSuggestions(0)
      setShowSuggestion(false)
      setFoodName(filterSuggestion[activeSuggestion])
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

if (showSuggestion && foodName) {
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
            <li className={className} key={index} id={suggestion.PushId} onKeyPress={onEnterKey} onClick={onClickFoodItems}>
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

  const onChangeItemName = (event) => {
    setItemName(event.target.value)
  }

  const onChangeDetail = (event) => {
    setDetail(event.target.value)
  }

  const onChangeCusinie = (event) => {
    setCuisine(event.target.value)
    searchCuisines.filter(item => {
      if (item.PushId === event.target.value) {
        setCuisineName(item.Name)
      }
      return item
    })
  }

  const onChangeAddon = (event) => {
    setAddon(event.target.value)
  }

  const onChangeAddonPrice = (event) => {
    setPrice(event.target.value)
  }

  const onClickAddon = (event) => {
    setShowTable(true)
    if (addon === "") {
      alert("Select Addon")
      return
    }
    if (price === "") {
      alert("Enter Payment")
      return
    }

    let locker = {
      data: addon,
      price: price
    }
    // addonItem.add(locker)
    setAddonList([...addonList, locker])
    // setAddon("")
    // setPrice("")
  }

  const onChangePortion= (event) => {
    setPortion(event.target.value)
  }

  const onChangePortionPrice = (event) => {
    setPortionPrice(event.target.value)
  }

  const onClickPortion = (event) => {
    setShowPortionTable(true)
    if(event.key==="Enter"){
      if (portion === "") {
        alert("Enter the Portion")
        return
      }
      if (portionPrice === "") {
        alert("Enter Payment")
        return
      }
  
      let locker = {
        data: portion,
        price: portionPrice
      }
      // addonItem.add(locker)
      setPortionList([...portionList, locker])
      setPortionPrice('')
      setPortion('')
      // setAddon("")
      // setPrice("")
    }
   
  }

  const onChangeComplimentory = (event) => {
    setComplimentory(event.target.value)
    searchComplimentory.filter(item => {
      if (item.PushId === event.target.value) {
        setComplimentoryName(item.Name)
      }
      return item
    })
  }

  const onChangeFoodCategory = (event) => {
    setFoodCategory(event.target.value)
    let locker = {
      data: event.target.value,
    }
    // addonItem.add(locker)
    setFoodTypeList([...foodTypeList, locker])
  }

  const onChangeVeg = (event) => {
    setVeg(event.target.value)
  }

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value)
  }

  const onChangeItemPrice = (event) => {
    setItemPrice(event.target.value)
  }

  const onChangeSettlemetPrice = (event) => {
    if (search === "") {
      alert("Please Enter Chef Id")
      return
    }
    setSettlementPrice(event.target.value)

    var bprice = +event.target.value;
    var total = +bprice;
    var rcommision = chefCommision[statecid.indexOf(search)];
    var rcommisionrate = (rcommision * total) / 100;
    var gst = (rcommisionrate * 0.18);
    var ftotal = ((+total - +rcommisionrate - +gst) * 100) / 100;
    window.ftotal = ftotal
    document.getElementById("price").innerHTML = ftotal
    // })

  }
  const onChangeStartTime = (event) => {
    setStartTime(event.target.value)
  }

  const onChangeCloseTime = (event) => {
    setCloseTime(event.target.value)
  }

  const onChangeImage = (event) => {
    const image = event.target.files[0]
    // setPassportImageAsFile(imageFile => (image))
    if (image === '') {
      console.error(`not an image, the image file is a ${typeof (image)}`)
    }
    const name = (+new Date()) + '-' + image.name;
    const metadata = {
      contentType: image.type
    };

    const uploadTask = storage.ref(`FoodItems/${name}`).put(image, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        storage.ref("FoodItems/").child(name).getDownloadURL()
          .then(fireBaseUrl => {
            setImageAsUrl(fireBaseUrl)
            window.temp++
          })


      })

  }

  const onChangeSignatureDish = (event) => {
    setSignatureDish(event.target.checked)
  }

  const onSubmitHandler = (event) => {
    setShow(false)
    setShowTable(false)
    setShowPortionTable(false)
    if (search === "") {
      alert("Please Enter Chef Id")
      return;
    }
    if (itemName === "") {
      alert("Please Enter Item Name")
      return
    }
    // if (detail === "") {
    //   alert("Please Enter Item Detail")
    //   return
    // }
    if (cuisine === "") {
      alert("Please Select Cuisine")
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
    if (settlementPrice === "") {
      alert("Please Enter Offer Price")
      return
    }
    if (startTime === "") {
      alert("Please Select Start Time of Item Availablity")
      return
    }
    if (closeTime === "") {
      alert("Please Select End Time of Item Availablity")
      return
    }
    if (imageAsUrl === "") {
      alert("Please Upload Image")
      return
    }
    if (veg === "") {
      alert("Please Select Category")
      return
    }
    // if (selectMenu === "") {
    //   alert("Please Select Menu")
    //   return
    // }

    for(var i=0;i<itemsNo.length;i++){
      if(itemsNo[i]===itemName){
          alert("food item already exists please add another item")
          return;
      }
  }

    // const newAddonList=addonList.map((item)=>{
    //   return({[item.data]:item.price})
    // })
    // console.log(newAddonList)

    var newAddonList = [];
    for (var i = 0; i < addonList.length; i++) {
      newAddonList.push({ [addonList[i].data]: addonList[i].price });
    }

    var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("FoodItems").push();
    firebaseref.child("PushId").set(firebaseref.getKey());
    firebaseref.child("Name").set(itemName)
    firebaseref.child("Details").set(detail)
    firebaseref.child("CuisinePushId").set(cuisine)
    firebaseref.child("CuisineName").set(cuisineName)
    firebaseref.child("ComplimentaryPushId").set(complimentory)
    firebaseref.child("ComplimentaryName").set(complimentoryName)
    firebaseref.child("Menu").set(selectMenu)

    // firebaseref.child("FOODTYPE").set({ [foodCategory]: foodCategory })
    firebaseref.child("Category").set(veg)
    firebaseref.child("FoodType").set(foodCategory)
    //firebaseref.child("ADDONS").set(newAddonList)
    firebaseref.child("Addons").set(addon)
    firebaseref.child("ETime").set(closeTime)
    firebaseref.child("STime").set(startTime)
    firebaseref.child("Grams").set(quantity)
    firebaseref.child("Image").set(imageAsUrl)
    firebaseref.child("Mrp").set(itemPrice)
    firebaseref.child("Price").set(settlementPrice)
    firebaseref.child("RCommision").set("022")
    firebaseref.child("Settlement").set(String(window.ftotal))
    if (signatureDish === false) {
      firebaseref.child("Signature").set("No")
    } else {
      firebaseref.child("Signature").set("Yes")
    }
    firebaseref.child("Status").set("Active")
    firebaseref.child("AStatus").set("InActive")

    //    firebaseref.child("Name").set(String(name));
    // firebaseref.child("PushId").set(firebaseref.getKey());
    for (var index = 0; index < addonList.length; index++) {
  

      firebaseref.child("ADDONS").child(addonList[index].data).set(addonList[index].price)
    }
    for (var index1 = 0; index1 < foodTypeList.length; index1++) {
      firebaseref.child("FOODTYPE").child(foodTypeList[index1].data).set(foodTypeList[index1].data)
    }
    for (var index2 = 0; index2 < portionList.length; index2++) {
  

      firebaseref.child("Portions").child(portionList[index2].data).set(portionList[index2].price)
    }

    Swal.fire({
      title: "Successfully Created!",
      icon: "success",
      confirmButtonText: "Ok"
    });
    //   setName("")
      document.getElementById("price").innerHTML = "0.00"
        setItemName("")
        setDetail("")
        setCuisine("")
        setComplimentory("")
        setVeg("")
        setQuantity("")
        setItemPrice("")
        setAddon("")
        setFoodCategory("")
        setSettlementPrice("")
        setStartTime("")
        setCloseTime("")
        setImageAsUrl("")
        setComplimentoryName("")
        setCuisineName("")
        setSearch("")
        setAddonList([])
        setFoodTypeList([])
        setPortionList([])
        setFoodName([])
        setSelectMenu("")
  }


  const onUpdateHandler = (event) => {
    
    if (search === "") {
      alert("Please Enter Chef Id")
    }
    if (itemName === "") {
      alert("Please Enter Item Name")
      return
    }
    // if (detail === "") {
    //   alert("Please Enter Item Detail")
    //   return
    // }
    if (cuisine === "") {
      alert("Please Select Cuisine")
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
    if (settlementPrice === "") {
      alert("Please Enter Offer Price")
      return
    }
    if (startTime === "") {
      alert("Please Select Start Time of Item Availablity")
      return
    }
    if (closeTime === "") {
      alert("Please Select End Time of Item Availablity")
      return
    }
    if (imageAsUrl === "") {
      alert("Please Upload Image")
      return
    }
    if (veg === "") {
      alert("Please Select Category")
      return
    }

    // if (selectMenu === "") {
    //   alert("Please Select Menu")
    //   return
    // }
  
    // const newAddonList=addonList.map((item)=>{
    //   return({[item.data]:item.price})
    // })
    // console.log(newAddonList)

    var newAddonList = [];
    for (var i = 0; i < addonList.length; i++) {
      newAddonList.push({ [addonList[i].data]: addonList[i].price });
    }
    var newFoodList = [];
    for (var i1 = 0; i1 < foodTypeList.length; i1++) {
      newFoodList.push({ [foodTypeList[i1].data]: foodTypeList[i1].data });
    }

    var firebaseref = app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(window.foodId);
    firebaseref.child("PushId").set(firebaseref.getKey());
    firebaseref.child("Name").set(itemName)
    firebaseref.child("Details").set(detail)
    firebaseref.child("CuisinePushId").set(cuisine)
    firebaseref.child("CuisineName").set(cuisineName)
    firebaseref.child("ComplimentaryPushId").set(complimentory)
    firebaseref.child("ComplimentaryName").set(complimentoryName)
    firebaseref.child("Menu").set(selectMenu)

    // firebaseref.child("FOODTYPE").set({ [foodCategory]: foodCategory })
    firebaseref.child("Category").set(veg)
    firebaseref.child("FoodType").set(foodCategory)
    //firebaseref.child("ADDONS").set(newAddonList)
    firebaseref.child("Addons").set(addon)
    firebaseref.child("ETime").set(closeTime)
    firebaseref.child("STime").set(startTime)
    firebaseref.child("Grams").set(quantity)
    firebaseref.child("Image").set(imageAsUrl)
    firebaseref.child("Mrp").set(itemPrice)
    firebaseref.child("Price").set(settlementPrice)
    var bprice = +settlementPrice;
    var total = +bprice;
    var rcommision = chefCommision[statecid.indexOf(search)];
    var rcommisionrate = (rcommision * total) / 100;
    var gst = (rcommisionrate * 0.18);
    var ftotal = ((+total - +rcommisionrate - +gst) * 100) / 100;
    firebaseref.child("RCommision").set("022")
    // if(window.ftotal===undefined)
    firebaseref.child("Settlement").set(String(ftotal))
    // else
    // firebaseref.child("Settlement").set(window.ftotal)

    if (signatureDish === false) {
      firebaseref.child("Signature").set("No")
    } else {
      firebaseref.child("Signature").set("Yes")
    }
    firebaseref.child("Status").set("Active")
    firebaseref.child("AStatus").set("InActive")

    //    firebaseref.child("Name").set(String(name));
    // firebaseref.child("PushId").set(firebaseref.getKey());
    for (var index = 0; index < addonList.length; index++) {


      firebaseref.child("ADDONS").child(addonList[index].data).set(addonList[index].price)
    }
    for (let index1 = 0; index1 < foodTypeList.length; index1++) {
      firebaseref.child("FOODTYPE").child(foodTypeList[index1].data).set(foodTypeList[index1].data)
    }
    for (let index2 = 0; index2 < portionList.length; index2++) {
  
      firebaseref.child("Portions").child(portionList[index2].data).set(portionList[index2].price)
    }
    Swal.fire({
      title: "Successfully Updated!",
      icon: "success",
      confirmButtonText: "Ok"
    });
    document.getElementById("price").innerHTML = "0.00"
    setItemName("")
    setPrice("")
    setFoodTypeList([])
    setAddonList([])
    setDetail("")
    setCuisine("")
    setComplimentory("")
    setVeg("")
    setQuantity("")
    setItemPrice("")
    setAddon("")
    setFoodCategory("")
    setSettlementPrice("")
    setStartTime("")
    setCloseTime("")
    setImageAsUrl("")
    setComplimentoryName("")
    setCuisineName("")
    setSearch("")
    setFoodName([])
    setPortionList([])
    setShow(false)
    setShowTable(false)
    setShowPortionTable(false)
    setSelectMenu("")
  }

  const onClickDeleteHandler = (event) => {
    setShow(false)
    setShowTable(false)
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
          app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(window.foodId).remove();
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
      document.getElementById("price").innerHTML = "0.00"
      setItemName("")
      setDetail("")
      setCuisine("")
      setComplimentory("")
      setVeg("")
      setQuantity("")
      setItemPrice("")
      setAddon("")
      setFoodCategory("")
      setSettlementPrice("")
      setStartTime("")
      setCloseTime("")
      setImageAsUrl("")
      setComplimentoryName("")
      setCuisineName("")
  }

  const onClickAddonDelete = (event,index) => {

    addonList.map(item=>{
      if(event.target.id===item.data && event.target.id!==undefined){
        app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(foodNameId).child("ADDONS").child(event.target.id).remove();
      }else{
        const newData = addonList.filter((_, item) => {
          return (
            item !== index
          )
      
        })
        setAddonList(newData)
      }
    })
  
  }
  const onDeleteFoodType = (event,index) => {
    foodTypeList.map(item=>{
      if(event.target.id===item.data && event.target.id!==undefined){
        app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(foodNameId).child("FOODTYPE").child(event.target.id).remove();

      }else{
        const newData = foodTypeList.filter((_, item) => {
          return (
            item !== index
          )
      
        })
        setFoodTypeList(newData)
      }
    })

     }
  const onClickPortionDelete = (event,index) => {
    console.log(event.target.id)
    console.log(foodNameId)
    portionList.map(item=>{
      if(event.target.id===item.data && item.data!==undefined){
        console.log("i m here")
       app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(foodNameId).child("Portions").child(event.target.id).remove()

      }else{
        console.log("i m not here")

        const newData = portionList.filter((_, item) => {
          return (
            item !== index
          )
      
        })
        setPortionList(newData)
      }
    })
  
    

    // for (let index2 = 0; index2 < newData.length; index2++) {
    // app.database().ref().child("CloudKitchen").child(search).child("FoodItems").child(foodName).child("Portions").child(newData[index2].data).set(newData[index2].price)
    // }
  }

  const onAddMenuItem=(event)=>{
    setMenu(event.target.value)
    
  }
  const onClickMenuList = (event) => {
   if(search===""){
     alert("Enter Chef Id")
     return;
   }

   if(menu===""){
     alert("plese enter menu option")
     return;
   }

   
    // addonItem.add(locker)
    setMenuContent([...menuContent, menu])
    app.database().ref().child('CloudKitchen').child(search).child('ItemMenu').set([...menuContent, menu].join())
      setMenu("")
    // setPrice("")
  }

  const onDeleteMenu = (index) => {
    const newData = menuContent.filter((_, item) => {
      return (
        item !== index
      )

    })
    setMenuContent(newData)
    app.database().ref().child('CloudKitchen').child(search).child('ItemMenu').set(newData.join())

  }
  const onBackHandler=(event)=>{
    setMenuShow(false)
  }

  const selectMenuHandler = (event)=>{
    setSelectMenu(event.target.value)

  }
  // const onClickMenu=()=>{
  //   setMenuShow(true)

  // }


  
  return (
    <Fragment>
      <BreadCrumb parent={<Home />} subparent="Food Management" title=" Add Food Items " />
      <Container fluid={true}>
        {menuShow===false?
        <>
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
              <h5>Add Food Items </h5>
              {/* <span> Use a className <code> table </code> to any table.</span> */}
            </CardHeader>
          </Col>

        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Select Item</label>
            <input
          type="text"
          className="form-control"
          onChange={onChangeFoodName}
          onKeyDown={onKeyDown}
          value={foodName}
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
            <label className="form-label">Item Name <span style={{ color: "red" }}>*</span></label>
            <Input type="text" value={itemName} onChange={onChangeItemName} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">Item Details </label>
            <Input type="text" value={detail} onChange={onChangeDetail} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Cuisines</label>
            <select value={cuisine} onChange={onChangeCusinie} className="form-control">
              <option value="Select">Select</option>
              {searchCuisines.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}

            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Menu</label>
            <select value={selectMenu} onChange={selectMenuHandler} className="form-control">
            <option value="Select"> Select</option>
              {menuContent.map((item, id) => {
                return( <option key={id} value={item}>{item}</option>
                )})}
            </select>
            <div className="clearfix"></div>
          </Col>
          
          {/* <Col className="form-group col-md-3 " style={{position:"relative",marginTop:"30px"}}>
            <label className="form-label"></label>
            <PlusCircle size={25} style={{color:"blue"}} onClick={onClickMenu} />
            {/* <span onClick={onClickAddon}  ><img src="https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_960_720.png" alt="search engine" /></span> */}
            {/* <div className="clearfix"></div>

          </Col> */}
          </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Addon</label>
            <select value={addon} onChange={onChangeAddon} className="form-control">
              <option value="Select">Select</option>
              {addonName.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}
            </select>
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3" style={{position:"relative",marginTop:"7px"}}>
            <label className="form-label"></label>
            <Input type="number" value={price} onChange={onChangeAddonPrice} className="form-control" placeholder="Price" />
            <div className="clearfix"></div>

          </Col>
          <Col className="form-group col-md-3 " style={{position:"relative",marginTop:"30px"}}>
            <label className="form-label"></label>
            <PlusCircle size={25} style={{color:"blue"}} onClick={onClickAddon} />
            {/* <span onClick={onClickAddon}  ><img src="https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_960_720.png" alt="search engine" /></span> */}
            <div className="clearfix"></div>

          </Col>
          {showTable===true?
          <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
          <Table>
            <thead>
              <tr>
                <th>Addons Name</th>
                <th>Price </th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {addonList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{selectAddonName[selectAddonId.indexOf(item.data)]}</td>
                    <td>{item.price}</td>
                    <td><Trash style={{ color: "orange" }} id={item.data} onClick={(event)=>onClickAddonDelete(event,index)} size={15} /></td>

                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>:
        <></>
          }
          
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Portions</label>
            <input value={portion} onChange={onChangePortion} className="form-control"/>           
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3" style={{position:"relative",marginTop:"7px"}}>
            <label className="form-label"></label>
            <Input type="number" value={portionPrice} onChange={onChangePortionPrice} className="form-control" onKeyPress={onClickPortion} placeholder="Price" />
            <div className="clearfix"></div>

          </Col>
         
          {showPortionTable===true?
          <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
          <Table>
            <thead>
              <tr>
                <th>Portion </th>
                <th>Price </th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {portionList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.data}</td>
                    <td>{item.price}</td>
                    <td><Trash style={{ color: "orange" }} id={item.data}  onClick={(event)=>onClickPortionDelete(event,index)} size={15} /></td>

                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>:
        <></>
          }
          
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Complimentory</label>
            <select value={complimentory} onChange={onChangeComplimentory} className="form-control">
              <option value="Select">Select</option>
              {searchComplimentory.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}

            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Food Category</label>
            <select value={foodCategory} onChange={onChangeFoodCategory} className="form-control">
              <option value="Select">Select</option>
              {foodType.map((item, id) => <option key={id} value={item.PushId}>{item.Name}</option>)}

            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>
        <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
          <Table>
            <thead>
              <tr>
                <th>Food Category</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {foodTypeList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{selectFoodTypeName[selectFoodTypeId.indexOf(item.data)]}</td>
                    <td><Trash id={item.data} onClick={(event)=>onDeleteFoodType(event,index)} size={15} /></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>


        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Veg/NonVeg/Eggeterian</label>
            <select value={veg} onChange={onChangeVeg} className="form-control">
            <option value="Select">Select</option>
              <option value="Veg">Veg</option>
              <option value="NonVeg">NonVeg</option>
              <option value="Egg">Egg</option>
            </select>
            <div className="clearfix"></div>
          </Col>
        </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Total Gram/Quantity </label>
            <Input type="text" value={quantity} onChange={onChangeQuantity} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Price </label>
            <Input type="number" value={itemPrice} onChange={onChangeItemPrice} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>


        <h5 style={{ color: "red" }}>Settlement Amount after deduction :Rs <span style={{ color: "red" }} id="price"></span> </h5>
        <Input type="number" value={settlementPrice} onChange={onChangeSettlemetPrice} className="form-control" />

        <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Start Time <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={startTime} onChange={onChangeStartTime} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <Col className="form-group col-md-3">
            <label className="form-label">End Time <span style={{ color: "red" }}>*</span></label>
            <Input type="time" value={closeTime} onChange={onChangeCloseTime} className="form-control" />
            <div className="clearfix"></div>
          </Col>
        </Row>
        <Row className="form-row">
          <Col className="form-group col-md-6">
            <label className="form-label">Upload Image <span style={{ color: "red" }}>*</span></label>
            <Input type="file" onChange={onChangeImage} className="form-control" />
            <div className="clearfix"></div>
          </Col>
          <div className="col-sm-1">
            {imageAsUrl === "" ?
              <></> :
              <a href={imageAsUrl} target="_blank" rel="noopener noreferrer">View</a>}
          </div>
        </Row>

        <Row className="form-row">
          <Col className="form-group col-md-7">
            <Input type="checkbox" id="checkbox_id" checked={signatureDish} onChange={onChangeSignatureDish} className="form-control" />
            <label htmlFor="checkbox_id"  >Add The Signature Dish</label>

            <div className="clearfix"></div>
          </Col>
        </Row>
        <p>Only one item can be added as Signature Dish</p>
        {show === false ?
          <Button type="submit" onClick={onSubmitHandler} className="warning">Submit</Button> :
          <>
            <Button type="submit" onClick={onUpdateHandler} className="warning">Update</Button>

            <Button type="submit" onClick={onClickDeleteHandler} className="warning">Delete</Button>
          </>

        }
        </>

    :
    <>
    <h6>Add Item Menu</h6>
    <Row className="form-row">
          <Col className="form-group col-md-3">
            <label className="form-label">Add Menu</label>
            <input type="text" value={menu} onChange={onAddMenuItem} className="form-control"/>           
            <div className="clearfix"></div>
          </Col>
          
          <Col className="form-group col-md-3 " style={{position:"relative",marginTop:"30px"}}>
            <label className="form-label"></label>
            <PlusCircle size={25} style={{color:"blue"}} onClick={onClickMenuList} />
            {/* <span onClick={onClickAddon}  ><img src="https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_960_720.png" alt="search engine" /></span> */}
            <div className="clearfix"></div>

          </Col>
          <div className="table-responsive text-nowrap datatables-demo table table-striped table-bordered">
          <Table>
            <thead>
              <tr>
              <th>Item Menu Name</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
            {menuContent.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                    <td><Trash id={index} onClick={() => {
                      onDeleteMenu(index);
                    }} size={15} /></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
        <Button className="danger" onClick={onBackHandler}>Back</Button>

</Row>


</>
}



      </Container>
    </Fragment>
  );
};

export default AddFoodItems;