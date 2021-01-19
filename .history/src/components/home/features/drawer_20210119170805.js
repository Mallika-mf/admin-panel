
import React from 'react';
import MediaQuery from 'react-responsive'
export const openDrawer = () => {
    document.getElementById("changelocation").style.display = "block";
}

export const closeDrawer = () => {
    document.getElementById("changelocation").style.display = "none";
}


export const Drawer = ({ Component, ...rest }) => {

    return <>
         <MediaQuery minDeviceWidth={1224}>
        <div className="w3-sidebar w3-bar-block w3-card w3-animate-right" style={{ display: "none", right: "0", width: "40%", top: "0", zIndex: '3' }} id="changelocation">
        <button onClick={closeDrawer} className="w3-bar-item w3-button" style={{ background: "rgb(228, 28, 57)", color: "white", padding: "2%" }}>Close &times;</button>
            {<Component {...rest}  />}

        </div>

        </MediaQuery>
        <MediaQuery  maxDeviceWidth={1224}>
        <div className="w3-sidebar w3-bar-block w3-card w3-animate-right" style={{ display: "none", right: "0", width: "100%", top: "0", zIndex: '3' }} id="changelocation">
        <button onClick={closeDrawer} className="w3-bar-item w3-button" style={{ background: "rgb(228, 28, 57)", color: "white", padding: "2%" }}>Close &times;</button>
            {<Component {...rest}  />}

        </div>
        </MediaQuery>
          
    </>

}




