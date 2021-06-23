// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
// import config from './config'

// // {
// //   lat: 39.1636505,
// //   lng: -86.525757
// // }

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

// export class MapContainer extends Component {

//   state = {
//     showingInfoWindow: false,  // Hides or shows the InfoWindow
//     activeMarker: {},          // Shows the active marker upon click
//     selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
//   };

//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//   });

//   onClose = props => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       });
//     }
//   };

//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={
//           {lat: -1.2884,
//             lng: 36.8233}
//         }
//         >

//         <Marker
//           onClick={this.onMarkerClick}
//           name={'Kenyatta International Convention Centre'}
//         />

        
//         <InfoWindow
//             marker={this.state.activeMarker}
//             visible={this.state.showingInfoWindow}
//             onClose={this.onClose}
//           >
//           <div>
//             <h4>{this.state.selectedPlace.name}</h4>
//           </div>
//         </InfoWindow>

//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: config.MAPS_KEY
// })(MapContainer);

// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import config from './config';

// export default function MapContainer() {
  
//   const mapStyles = {        
//     height: "100vh",
//     width: "100%"};
  
//   const defaultCenter = {
//     lat: 41.3851, lng: 2.1734
//   }

//   const locations = [
//     {
//       name: "LOCATION 1",
//       location: { 
//         lat: 41.3954,
//         lng: 2.162 
//       },
//     },
//     {
//       name: "Location 2",
//       location: { 
//         lat: 41.3917,
//         lng: 2.1649
//       },
//     },
//     {
//       name: "Location 3",
//       location: { 
//         lat: 41.3773,
//         lng: 2.1585
//       },
//     },
//     {
//       name: "Location 4",
//       location: { 
//         lat: 41.3797,
//         lng: 2.1682
//       },
//     },
//     {
//       name: "Location 5",
//       location: { 
//         lat: 41.4055,
//         lng: 2.1915
//       },
//     }
//   ];
  
//   return (
//      <LoadScript
//        googleMapsApiKey={config.MAPS_KEY}>
//         <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={13}
//           center={defaultCenter}
//             {
//               ...locations ? locations.map(item => {
//                 return (
//                 <Marker key={item.name} position={item.location}/>
//                 )
//               }) : null
//           }
//         />
//      </LoadScript>
//   )

// }

import React from 'react'
import './App.css'
import DrinksMap from './DrinksMap';


export default function App() {
  return (
    <div>
      <DrinksMap />
    </div>
  )
}