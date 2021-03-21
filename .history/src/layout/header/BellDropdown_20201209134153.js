import React, {useState,useEffect} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { Bell, MessageCircle,ThumbsUp } from 'react-feather';
import app from '../../data/base'
import { Table} from "reactstrap";
import {NavLink} from 'react-router-dom'

const BellDropdown = () => {
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen(prevState => !prevState);
const [notification,setNotification] = useState([])
// const colours = [blue[800], green[500], orange[500], purple[800], red[800]];

useEffect(() => {
 app.database().ref().child("Notifications").limitToLast(10)
 .on('value',function(snapshot){
   if(snapshot.exists()){
   const content=[]
   snapshot.forEach(snap=>{
     let val = snap.val()
     content.push(val)
   })
   content.reverse()
   setNotification(content)
  }
 })
}, [])
var colors = ["#D7C49EFF","#FA351FF","#5B84B1FF","#FC766AFF","#42EADDFF","#000000FF","#FFFFFFFF","#97BC62FF"];
const getColour = () => colors[Math.floor(Math.random() * colors.length)];

var randomColor = colors[Math.floor(Math.random()*colors.length)];
return(
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
    <DropdownToggle>
    <Bell/><span className="notification badge badge-pill badge-danger f-10"></span>
     </DropdownToggle>
     <DropdownMenu className="p-0">
     <ul className="notification-dropdown">
            <li className="gradient-primary-1">
              <h6>Notifications</h6>
            </li>
            <li>
              <div className="media">
                {/* // <div className="notification-icons bg-success mr-3"><ThumbsUp className="mt-0" /></div> */}
                <div className="media-body">
                {/* <div className="table-responsive text-nowrap">
                <Table className="datatables-demo table table-striped table-bordered" id="datatable">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Name</th>
                      </tr>
                  </thead>
                  <tbody>
                  {
                    notification.map((item,id)=>{
                      return(
                        <tr>
                          <td>{id+1}</td>
                          <td>{item.Name}</td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                  </Table>
                  </div> */}
                  {notification.map((item,id)=>{
                    // var colors = ["red","blue","green","yellow"];
                    // var randomColor = colors[Math.floor(Math.random()*colors.length)];
                    return(
                    <p key={id} style={{color: "#D7C49EFF"}}>{item.Name}</p>
                    )
                  })
                  }
                   {/* <h6>Someone Likes Your Posts</h6>
                  <p className="mb-0"> 2 Hours Ago</p> */}
               </div>
              </div>
            </li> 
            {/* <li className="pt-0">
              <div className="media">
                <div className="notification-icons bg-info mr-3"><MessageCircle className="mt-0" /></div>
                <div className="media-body">
                  {/* <h6>3 New Comments</h6>
                  <p className="mb-0"> 1 Hours Ago</p> */}
                {/* </div>
              </div>
            </li> */} 
            <li className="bg-light txt-dark"><NavLink to={(`${process.env.PUBLIC_URL}/notifications/all-notifications`)} style={{color:"black"}}>
All  notification</NavLink></li>
          </ul>
     </DropdownMenu>
 </Dropdown>
)
}

export default BellDropdown