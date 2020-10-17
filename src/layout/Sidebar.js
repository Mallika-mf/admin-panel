import logo from '../assets/images/banner/logo.png'
import logo_light from '../assets/images/banner/logo.png'
import React, { Fragment, useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import logo_compact from '../assets/images/logo/compact-logo.jpg';
import { MENUITEMS } from './sidebar/menu';
import { MENUITEMS3 } from './sidebar/menu';
import { MENUITEMS2 } from './sidebar/menu';
import {Link} from 'react-router-dom'
import configDB from '../data/customizer/config';

const Sidebar = () => {
  
    const [mainmenu, setMainMenu] = useState(MENUITEMS);
    const [mainmenu2, setMainMenu2] = useState(MENUITEMS2);
    const [mainmenu3, setMainMenu3] = useState(MENUITEMS3);
    const switchToggle = useSelector(state => state.Common.switchToggle)
    const [margin, setMargin] = useState(0);
    const [width, setWidth] = useState(0);
    const [hideLeftArrowRTL, setHideLeftArrowRTL] = useState(true);
    const [hideRightArrowRTL, setHideRightArrowRTL] = useState(true);
    const [hideRightArrow, setHideRightArrow] = useState(true);
    const [hideLeftArrow, setHideLeftArrow] = useState(true);
    const wrapper = useSelector(content => content.Customizer.sidebar_types.type) || configDB.data.settings.sidebar.type;
    const layout = useSelector(content => content.Customizer.layout)
    const sidebar_background_color = configDB.data.settings.sidebar_background_setting;
       let name="WorkingPartner";
       let isSuperAdmin ="Yes"

    useEffect(() => {        
        window.addEventListener('resize', handleResize)
        handleResize();
      
        const currentUrl = window.location.pathname;
        mainmenu.filter(items => {
            if (items.path === currentUrl)
                setNavActive(items)
            if (!items.children) return false
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    setNavActive(subItems)
                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl){
                        setNavActive(subSubItems)
                        return true
                    }
                    else{
                        return false
                    }
                })
                return subItems
            })
            return items
        })

        setTimeout(() => {
            const elmnt = document.getElementById("myDIV");
            const menuWidth = elmnt.offsetWidth;
            if (menuWidth > window.innerWidth || menuWidth < window.innerWidth ) {
                setHideRightArrow(false);
                setHideLeftArrowRTL(false);
            } else {
                setHideRightArrow(true);
                setHideLeftArrowRTL(true);
            }
        }, 500)

        return () => {
            // eslint-disable-next-line
            window.removeEventListener('resize', handleResize);
        }

        // eslint-disable-next-line
    }, []);
    useEffect(() => {        
        window.addEventListener('resize', handleResize)
        handleResize();
      
        const currentUrl = window.location.pathname;
        mainmenu2.filter(items => {
            if (items.path === currentUrl)
                setNavActive2(items)
            if (!items.children) return false
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    setNavActive2(subItems)
                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl){
                        setNavActive2(subSubItems)
                        return true
                    }
                    else{
                        return false
                    }
                })
                return subItems
            })
            return items
        })

        setTimeout(() => {
            const elmnt = document.getElementById("myDIV");
            const menuWidth = elmnt.offsetWidth;
            if (menuWidth > window.innerWidth || menuWidth < window.innerWidth ) {
                setHideRightArrow(false);
                setHideLeftArrowRTL(false);
            } else {
                setHideRightArrow(true);
                setHideLeftArrowRTL(true);
            }
        }, 500)

        return () => {
            // eslint-disable-next-line
            window.removeEventListener('resize', handleResize);
        }

        // eslint-disable-next-line
    }, []);
     useEffect(() => {        
        window.addEventListener('resize', handleResize)
        handleResize();
      
        const currentUrl = window.location.pathname;
        mainmenu3.filter(items => {
            if (items.path === currentUrl)
                setNavActive3(items)
            if (!items.children) return false
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    setNavActive3(subItems)
                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl){
                        setNavActive3(subSubItems)
                        return true
                    }
                    else{
                        return false
                    }
                })
                return subItems
            })
            return items
        })

        setTimeout(() => {
            const elmnt = document.getElementById("myDIV");
            const menuWidth = elmnt.offsetWidth;
            if (menuWidth > window.innerWidth || menuWidth < window.innerWidth ) {
                setHideRightArrow(false);
                setHideLeftArrowRTL(false);
            } else {
                setHideRightArrow(true);
                setHideLeftArrowRTL(true);
            }
        }, 500)

        return () => {
            // eslint-disable-next-line
            window.removeEventListener('resize', handleResize);
        }

        // eslint-disable-next-line
    }, []);

    const handleResize = () => {
        
        setWidth(window.innerWidth - 500);
        
    }

    const setNavActive = (item) => {
        MENUITEMS.filter(menuItem => {
            if (menuItem !== item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                        return true
                    }
                    else{
                        return false
                    }
                })
            }
            return menuItem
        })
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }
     const setNavActive2 = (item) => {
        MENUITEMS2.filter(menuItem => {
            if (menuItem !== item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                        return true
                    }
                    else{
                        return false
                    }
                })
            }
            return menuItem
        })
        item.active = !item.active
        setMainMenu2({ mainmenu2: MENUITEMS2 })
    }
    const setNavActive3 = (item) => {
        MENUITEMS3.filter(menuItem => {
            if (menuItem !== item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                        return true
                    }
                    else{
                        return false
                    }
                })
            }
            return menuItem
        })
        item.active = !item.active
        setMainMenu3({ mainmenu3: MENUITEMS3 })
    }

    const toggletNavActive = (item) => {        
        if (!item.active) {
            MENUITEMS.forEach(a => {
                if (MENUITEMS.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS})
    }
    const toggletNavActive2 = (item) => {        
        if (!item.active) {
            MENUITEMS2.forEach(a => {
                if (MENUITEMS2.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu2({ mainmenu2: MENUITEMS2})
    }
    const toggletNavActive3 = (item) => {        
        if (!item.active) {
            MENUITEMS3.forEach(a => {
                if (MENUITEMS3.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu3({ mainmenu3: MENUITEMS3})
    }

    const scrollToRight = () => {
        const elmnt = document.getElementById("myDIV");
        const menuWidth = elmnt.offsetWidth;
        const temp = menuWidth + margin;
        if (temp < menuWidth) {
            setMargin(-temp);
            setHideRightArrow(true);
        }
        else {
            setMargin(margin => margin += (-width));
            setHideLeftArrow(false);
        }
    }

    const scrollToLeft = () => {
        if (margin >= -width) {
            setMargin(0)
            setHideLeftArrow(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrow(false);
        }
    }


    const scrollToLeftRTL = () => {
        
        if (margin < -width) {
            setMargin(margin => margin += -width);
            setHideLeftArrowRTL(true);
        }
        else {
            setMargin(margin => margin += -width);
            setHideRightArrowRTL(false);
        }
    }

    const scrollToRightRTL = () => {
        const temp = width + margin
        
        if (temp === 0) {
            setMargin(temp);
            setHideRightArrowRTL(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrowRTL(false);
            setHideLeftArrowRTL(false);
        }
    }
  
    return (
        <Fragment>
        
        {name===window.sessionStorage.getItem('role')? 
  
         <div className={`page-sidebar ${switchToggle? 'open': sidebar_background_color}`}>
                
                <div className="main-header-left d-none d-lg-block">
                    <div className="logo-wrapper compactLogo">
                        <Link to={`${process.env.PUBLIC_URL}/partner-ordermanagment`}>
                            <img className="blur-up lazyloaded light" src={logo_light} width="170px" height="auto" alt="" />
                            <img className="blur-up lazyloaded compactlogo" src={logo_compact} alt="" />
                            <img className="blur-up lazyloaded logo" src={logo} alt="" width="170px" height="auto"/>
                        </Link>
                    </div>
                </div>
                <div className="sidebar custom-scrollbar">
                    <ul
                        className="sidebar-menu"
                        id="myDIV"
                        style={wrapper === 'horizontal_sidebar' ? layout === 'rtl' ?
                        { 'marginRight': margin + 'px' } : { 'marginLeft': margin + 'px' } : { margin: '0px' }}
                    >
                         <li className={`left-arrow ${layout === 'rtl' ? hideLeftArrowRTL ? 'd-none' : '' : hideLeftArrow ? 'd-none' : ''}`}
                            onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToLeftRTL : scrollToLeft}><i className="fa fa-angle-left"></i></li>
                         {
                            MENUITEMS2.map((menuItem, i) => 
                               
                                <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
                                    {(menuItem.sidebartitle) ? <div className="sidebar-title">{menuItem.sidebartitle}</div>
                                        : ''}
                                    {(menuItem.type === 'sub') ?
                                        <a className="sidebar-header" href="#javascript" onClick={() => toggletNavActive2(menuItem)}>
                                            <menuItem.icon />
                                    <span>{menuItem.title}</span>
                                            <i className="fa fa-angle-right pull-right"></i>
                                        </a>
                                        : ''}
                                    {(menuItem.type === 'link') ?
                                        <Link className={`sidebar-header ${menuItem.active ? 'active' :''}`}  onClick={() => toggletNavActive2(menuItem)} to={menuItem.path}>
                                            <menuItem.icon /><span>{menuItem.title}</span>
                                            {menuItem.children ?
                                                <i className="fa fa-angle-right pull-right"></i> : ''}
                                        </Link>
                                        : ''}
                                    {menuItem.children ?
                                        <ul
                                            className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}
                                            style={menuItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
                                        >
                                            {menuItem.children.map((childrenItem, index) =>
                                                <li key={index} className={childrenItem.children ? childrenItem.active ? 'active' : '' : ''}>
                                                    {(childrenItem.type === 'sub') ?
                                                        <a href={childrenItem.path} onClick={() => toggletNavActive2(childrenItem)} >
                                                            <i className="fa fa-circle"></i>{childrenItem.title} <i className="fa fa-angle-down pull-right"></i></a>
                                                        : ''}

                                                    {(childrenItem.type === 'link') ?
                                                        <Link className={childrenItem.active ? 'active' : ''} onClick={() => toggletNavActive2(childrenItem)} to={childrenItem.path}>
                                                            <i className="fa fa-circle"></i>{childrenItem.title}
                                                        </Link>
                                                        : ''}
                                                    {childrenItem.children ?
                                                        <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : 'active'}`}>
                                                            {childrenItem.children.map((childrenSubItem, key) =>
                                                                <li className={childrenSubItem.active ? 'active' : ''} key={key}>
                                                                    {(childrenSubItem.type === 'link') ?
                                                                        <Link  className={childrenSubItem.active ? 'active' : ''}
                                                                            onClick={() => toggletNavActive2(childrenSubItem)} to={childrenSubItem.path} >
                                                                            <i className="fa fa-circle"></i>{childrenSubItem.title}
                                                                        </Link>
                                                                        : ''}
                                                                </li>
                                                            )}
                                                        </ul>
                                                        : ''}
                                                </li>
                                            )}
                                            
                                        </ul>
                                        : ''}   
                                </li>

                            )
                        }
                         <li className={`right-arrow ${layout === 'rtl' ? hideRightArrowRTL ? 'd-none' : '' : hideRightArrow ? 'd-none' : ''}`}
                            onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToRightRTL : scrollToRight}><i className="fa fa-angle-right"></i></li>
                   </ul>
                </div>
            </div>:
               isSuperAdmin===window.sessionStorage.getItem('superadmin')?
                      
            <div className={`page-sidebar ${switchToggle? 'open': sidebar_background_color}`}>
             
                <div className="main-header-left d-none d-lg-block">
                    <div className="logo-wrapper compactLogo">
                        <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                            <img className="blur-up lazyloaded light" src={logo_light} width="170px" height="auto" alt="" />
                            <img className="blur-up lazyloaded compactlogo" src={logo_compact} alt="" />
                            <img className="blur-up lazyloaded logo" src={logo} alt="" width="170px" height="auto"/>
                        </Link>
                    </div>
                </div>
                <div className="sidebar custom-scrollbar">
                    <ul
                        className="sidebar-menu"
                        id="myDIV"
                        style={wrapper === 'horizontal_sidebar' ? layout === 'rtl' ?
                        { 'marginRight': margin + 'px' } : { 'marginLeft': margin + 'px' } : { margin: '0px' }}
                    >
                         <li className={`left-arrow ${layout === 'rtl' ? hideLeftArrowRTL ? 'd-none' : '' : hideLeftArrow ? 'd-none' : ''}`}
                            onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToLeftRTL : scrollToLeft}><i className="fa fa-angle-left"></i></li>
                         {
                            MENUITEMS.map((menuItem, i) => 
                               
                                <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
                                    {(menuItem.sidebartitle) ? <div className="sidebar-title">{menuItem.sidebartitle}</div>
                                        : ''}
                                    {(menuItem.type === 'sub') ?
                                        <a className="sidebar-header" href="#javascript" onClick={() => toggletNavActive(menuItem)}>
                                            <menuItem.icon />
                                    <span>{menuItem.title}</span>
                                            <i className="fa fa-angle-right pull-right"></i>
                                        </a>
                                        : ''}
                                    {(menuItem.type === 'link') ?
                                        <Link className={`sidebar-header ${menuItem.active ? 'active' :''}`}  onClick={() => toggletNavActive(menuItem)} to={menuItem.path}>
                                            <menuItem.icon /><span>{menuItem.title}</span>
                                            {menuItem.children ?
                                                <i className="fa fa-angle-right pull-right"></i> : ''}
                                        </Link>
                                        : ''}
                                    {menuItem.children ?
                                        <ul
                                            className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}
                                            style={menuItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
                                        >
                                            {menuItem.children.map((childrenItem, index) =>
                                                <li key={index} className={childrenItem.children ? childrenItem.active ? 'active' : '' : ''}>
                                                    {(childrenItem.type === 'sub') ?
                                                        <a href={childrenItem.path} onClick={() => toggletNavActive(childrenItem)} >
                                                            <i className="fa fa-circle"></i>{childrenItem.title} <i className="fa fa-angle-down pull-right"></i></a>
                                                        : ''}

                                                    {(childrenItem.type === 'link') ?
                                                        <Link className={childrenItem.active ? 'active' : ''} onClick={() => toggletNavActive(childrenItem)} to={childrenItem.path}>
                                                            <i className="fa fa-circle"></i>{childrenItem.title}
                                                        </Link>
                                                        : ''}
                                                    {childrenItem.children ?
                                                        <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : 'active'}`}>
                                                            {childrenItem.children.map((childrenSubItem, key) =>
                                                                <li className={childrenSubItem.active ? 'active' : ''} key={key}>
                                                                    {(childrenSubItem.type === 'link') ?
                                                                        <Link  className={childrenSubItem.active ? 'active' : ''}
                                                                            onClick={() => toggletNavActive(childrenSubItem)} to={childrenSubItem.path} >
                                                                            <i className="fa fa-circle"></i>{childrenSubItem.title}
                                                                        </Link>
                                                                        : ''}
                                                                </li>
                                                            )}
                                                        </ul>
                                                        : ''}
                                                </li>
                                            )}
                                            
                                        </ul>
                                        : ''}   
                                </li>

                            )
                        }
                         <li className={`right-arrow ${layout === 'rtl' ? hideRightArrowRTL ? 'd-none' : '' : hideRightArrow ? 'd-none' : ''}`}
                            onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToRightRTL : scrollToRight}><i className="fa fa-angle-right"></i></li>
                   </ul>
                </div>
            </div>:
            
             <div className={`page-sidebar ${switchToggle? 'open': sidebar_background_color}`}>
                <div className="main-header-left d-none d-lg-block">
                     
                    <div className="logo-wrapper compactLogo">
                        <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
                            <img className="blur-up lazyloaded light" src={logo_light} width="170px" height="auto" alt="" />
                            <img className="blur-up lazyloaded compactlogo" src={logo_compact} alt="" />
                            <img className="blur-up lazyloaded logo" src={logo} alt="" width="170px" height="auto"/>
                        </Link>
                    </div>
                </div>
                <div className="sidebar custom-scrollbar">
                    <ul
                        className="sidebar-menu"
                        id="myDIV"
                        style={wrapper === 'horizontal_sidebar' ? layout === 'rtl' ?
                        { 'marginRight': margin + 'px' } : { 'marginLeft': margin + 'px' } : { margin: '0px' }}
                    >
                         <li className={`left-arrow ${layout === 'rtl' ? hideLeftArrowRTL ? 'd-none' : '' : hideLeftArrow ? 'd-none' : ''}`}
                            onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToLeftRTL : scrollToLeft}><i className="fa fa-angle-left"></i></li>
                         {
                            MENUITEMS3.map((menuItem, i) => 
                               
                                <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
                                    {(menuItem.sidebartitle) ? <div className="sidebar-title">{menuItem.sidebartitle}</div>
                                        : ''}
                                    {(menuItem.type === 'sub') ?
                                        <a className="sidebar-header" href="#javascript" onClick={() => toggletNavActive3(menuItem)}>
                                            <menuItem.icon />
                                    <span>{menuItem.title}</span>
                                            <i className="fa fa-angle-right pull-right"></i>
                                        </a>
                                        : ''}
                                    {(menuItem.type === 'link') ?
                                        <Link className={`sidebar-header ${menuItem.active ? 'active' :''}`}  onClick={() => toggletNavActive3(menuItem)} to={menuItem.path}>
                                            <menuItem.icon /><span>{menuItem.title}</span>
                                            {menuItem.children ?
                                                <i className="fa fa-angle-right pull-right"></i> : ''}
                                        </Link>
                                        : ''}
                                    {menuItem.children ?
                                        <ul
                                            className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}
                                            style={menuItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
                                        >
                                            {menuItem.children.map((childrenItem, index) =>
                                                <li key={index} className={childrenItem.children ? childrenItem.active ? 'active' : '' : ''}>
                                                    {(childrenItem.type === 'sub') ?
                                                        <a href={childrenItem.path} onClick={() => toggletNavActive3(childrenItem)} >
                                                            <i className="fa fa-circle"></i>{childrenItem.title} <i className="fa fa-angle-down pull-right"></i></a>
                                                        : ''}

                                                    {(childrenItem.type === 'link') ?
                                                        <Link className={childrenItem.active ? 'active' : ''} onClick={() => toggletNavActive3(childrenItem)} to={childrenItem.path}>
                                                            <i className="fa fa-circle"></i>{childrenItem.title}
                                                        </Link>
                                                        : ''}
                                                    {childrenItem.children ?
                                                        <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : 'active'}`}>
                                                            {childrenItem.children.map((childrenSubItem, key) =>
                                                                <li className={childrenSubItem.active ? 'active' : ''} key={key}>
                                                                    {(childrenSubItem.type === 'link') ?
                                                                        <Link  className={childrenSubItem.active ? 'active' : ''}
                                                                            onClick={() => toggletNavActive3(childrenSubItem)} to={childrenSubItem.path} >
                                                                            <i className="fa fa-circle"></i>{childrenSubItem.title}
                                                                        </Link>
                                                                        : ''}
                                                                </li>
                                                            )}
                                                        </ul>
                                                        : ''}
                                                </li>
                                            )}
                                            
                                        </ul>
                                        : ''}   
                                </li>

                            )
                        }
                         <li className={`right-arrow ${layout === 'rtl' ? hideRightArrowRTL ? 'd-none' : '' : hideRightArrow ? 'd-none' : ''}`}
                            onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToRightRTL : scrollToRight}><i className="fa fa-angle-right"></i></li>
                   </ul>
                </div>
            </div> 
             
           
    }
        </Fragment>
    );
};

export default Sidebar;