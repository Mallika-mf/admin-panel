import React, {useState,useEffect} from 'react'
import man from '../../assets/images/dashboard/user.png'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import {Users,MessageSquare,FileText,Settings,LogOut} from 'react-feather'
import app from '../../data/base'

const UserActivity = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [profile, setProfile] = useState('');
    const [name, setName] = useState('')
    
    useEffect(() => {
        setProfile(localStorage.getItem('profileURL' || man));
        setName(localStorage.getItem('Name'))
    },[]);
    
    const logOut = () => {
        localStorage.removeItem('profileURL')
        app.auth().signOut()   
    }

    return(
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
    <DropdownToggle>
            <span className="media user-header"><img className="mr-2 rounded-circle img-35" src={profile} style={{width:"35px",height:"35px"}} alt=""/>
          <span className="media-body">
            <span className="f-12 f-w-600">{name}</span>
            <span className="d-block">Admin</span></span></span>
    </DropdownToggle>
    <DropdownMenu className="p-0">
    <ul className="profile-dropdown">
            <li className="gradient-primary-1">
              <h6 className="mb-0">{name}</h6><span>Web Designer</span>
            </li>
            <li><Users/>Profile</li>
            <li><MessageSquare/>Inbox</li>
            <li><FileText/>Taskboard</li>
            <li><Settings/>Settings</li>
            <li onClick={logOut}><LogOut/>Logout</li>
      </ul>
    </DropdownMenu>
    </Dropdown>
    )
}

export default UserActivity