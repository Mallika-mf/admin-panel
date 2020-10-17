import React from 'react'
import { MessageSquare} from 'react-feather';
import BellDropdown from './BellDropdown'
import UserActivity from './UserActivity'
import DropletHeader from './Droplet'
import Search from './Search'
import {RightSidebarToggle} from '../../redux/common/actions'
import { useSelector, useDispatch } from 'react-redux';
import {Dropdown,DropdownMenu,DropdownItem,Button} from 'reactstrap'
import {useHistory} from 'react-router-dom'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,LogOut} from 'react-feather';

const Rightbar = () => {
  const history = useHistory()
  const mobileRightTog = useSelector(state => state.Common.mobileRightToggle)
  const rightSidebarToggle = useSelector(state => state.Common.rightSidebarToggle)
  const dispatch = useDispatch();
  const userName=()=>{
    var username=window.localStorage.getItem('name');
    if(username===null){                      
        username=window.sessionStorage.getItem('name');
        if(username===null){
          return(<Redirect  to={`${process.env.PUBLIC_URL}/login`}  />)
        } 
    }
  return(<p>{username}</p>)
  }
  const logoutAuthHandler = ()=>{
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    return(<Redirect  to={`${process.env.PUBLIC_URL}/login`}  />)
    
  }
    return(
          <div className="nav-right col pull-right right-menu">
            <ul className={`nav-menus ${mobileRightTog ? 'open': ''}`}>
              <li>
               {/* <Search/> */}
              </li>
              <li> 
               {/* <UserActivity/> */}
              </li>
              <li>
                <BellDropdown/>
              </li>
              {/* <li>{userName()}</li> */}
              <li>
               <Button onClick={logoutAuthHandler}><LogOut style={{marginBottom:"-5%"}}/><span >&nbsp;&nbsp;Log Out</span></Button>
              </li>
            </ul>
          </div> 
    )
}


export default Rightbar