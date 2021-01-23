import React from "react"
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { get } from 'lodash';


export class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            selectedPlace: '',
            activeMarker: '',
            showingInfoWindow: false
        }
    }
    handleToggle = () => {
        this.setState({
            isOpen: !false
        });
    }

    render() {
        const { latitude, longitude } = this.props;
        return (
            
            <Map google={this.props.google} zoom={14}
                style={mapStyles}
                 initialCenter={{ lat: latitude,
                                  lng: longitude }}
            >
               <Marker 
                    position={{
                        lat: latitude,
                        lng: longitude
                    }}
                    //onClick={this.onMarkerClick} 
                    />

                
            </Map>
        );
    }
}

const mapStyles = {
    position: 'relative',
    width: '100%',
    height: '100%'
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyCPhxfpptoIc1yca5U8mXIigIajoERQCdE"
})(MapContainer)