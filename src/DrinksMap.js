import React from 'react'
import { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import config from './config';
import { PLACES } from './Places'

export default function DrinksMap() {

    const [ selected, setSelected ] = useState({})
  
    const onSelect = item => {
      console.log(item)
      setSelected(item);
    }

    const containerStyle = {
        width: '500px',
        height: '500px'
      };
      
    const center = {
        lat: 39.1636505,
        lng: -86.525757
    }
  
    return (
        <div style={{
            padding:'50px',
            textAlign:'center',
            position: 'fixed',
            }}>
            <hr />
            <h1>LOCAL DRINKS</h1>
            <hr />
            <br />
            <LoadScript
                googleMapsApiKey={config.MAPS_KEY}
            >
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                > 
                { 
                PLACES.map( place => {
                    return (
                    <Marker 
                    key={place.name} 
                    position={place.location}
                    onClick={()=>onSelect(place)}
                    />
                )})
                }
                {
                selected.location && 
                (
                    <InfoWindow
                    position={selected.location}
                    clickable={true}
                    onCloseClick={() => setSelected({})}
                    >
                    <p>{selected.name}</p>
                    </InfoWindow>
                )
                }
                </GoogleMap>
            </LoadScript>
        </div>
    )
  }