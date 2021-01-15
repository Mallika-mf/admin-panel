import React, {Component, Fragment} from 'react';
// import { slide as Menu } from 'react-burger-menu'
// import NavItem from "./navFinal";
// import { Link } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import MediaQuery from 'react-responsive'
class NabbarColor extends Component {    


    constructor (props) {
        super(props)
        this.state = {
          menuOpen: false
        }
      }



        render() {  
          var pathArray = window.location.pathname.split('/');
          console.log(pathArray);
          var logopath = './assets/img/1logo.png';
          if(pathArray.length > 1 && pathArray[1] !== '') {
            logopath = './assets/img/logo.png';
          }
          return (
            <Fragment>                
                {/* <!-- start menu area --> */}
                <MediaQuery minDeviceWidth={1224}>
                <div className="menu_area menu1 menu--sticky">
                    <div className="container">            
                        <nav className="navbar navbar-expand-lg navbar-light px-0 ">
                            <NavLink className="navbar-brand order-sm-1 order-1" to="/">
                                <img src={logopath} width="260px" height="60px" alt="mothersfood" /></NavLink>
                        </nav>
                    </div>
                </div>
                </MediaQuery>

                <MediaQuery maxDeviceWidth={1224}>
                <div className="menu_area menu1 menu--sticky">
                    <div className="container">            
                        <nav className="navbar navbar-expand-lg navbar-light px-0 ">
                            <NavLink className="navbar-brand order-sm-1 order-1" to="/">
                                <img src={logopath} alt="" /></NavLink>
                        </nav>
                    </div>
                </div>
                </MediaQuery>
             
          

            </Fragment>
        );
    }
}
export default NabbarColor;