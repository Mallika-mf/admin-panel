import React, {useState,useEffect} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { Bell, MessageCircle,ThumbsUp } from 'react-feather';
import app from '../../data/base'
import { Table} from "reactstrap";

const BellDropdown = () => {
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen(prevState => !prevState);
const [notification,setNotification] = useState([])

useEffect(() => {
 app.database().ref().child("Notifications").limitToLast(10)
 .on('value',function(snapshot){
   if(snapshot.exists()){
   const content=[]
   snapshot.forEach(snap=>{
     let val = snap.val()
     content.push(val)
   })
   setNotification(content)
  }
 })
}, [])

return(
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
    <DropdownToggle>
    <Bell/><span className="notification badge badge-pill badge-danger f-10">2</span>
     </DropdownToggle>
     <DropdownMenu className="p-0">
     <ul className="notification-dropdown">
            <li className="gradient-primary-1">
              <h6>Notifications</h6>
            </li>
            {/* <li>
              <div className="media">
                <div className="notification-icons bg-success mr-3"><ThumbsUp className="mt-0" /></div>
                <div className="media-body"> */}
                <div className="table-responsive text-nowrap">
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
                  </div>
                  {/* {/* <h6>Someone Likes Your Posts</h6>
                  <p className="mb-0"> 2 Hours Ago</p> */}
                </div>
              </div>
            </li> */}
            {/* <li className="pt-0">
              <div className="media">
                <div className="notification-icons bg-info mr-3"><MessageCircle className="mt-0" /></div>
                <div className="media-body">
                  {/* <h6>3 New Comments</h6>
                  <p className="mb-0"> 1 Hours Ago</p> */}
                </div>
              </div>
            </li> */}
            <li className="bg-light txt-dark"><a href="/#">All </a> notification</li>
          </ul>
     </DropdownMenu>
 </Dropdown>
)
}

export default BellDropdown