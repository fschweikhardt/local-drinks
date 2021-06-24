import React from 'react'
import { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import config from './config';
import { PLACES } from './Places'

export default function DrinksMap() {

    const [ selectedMarker, setSelectedMarker ] = useState({})
    const [ selectedPlaces, setSelectedPlaces ] = useState([])

    const changeDrink = e => {
        console.log(e)
        let updatedPlaces = PLACES.filter( place => {
            return place.type === e ? place : null
        })
        console.log(updatedPlaces)
        setSelectedPlaces(updatedPlaces)
    }

    const onSelectMarker = item => {
      setSelectedMarker(item);
    }

    const containerStyle = {
        width: '500px',
        height: '500px'
      };
      
    const center = {
        lat: 39.1636505,
        lng: -86.525757
    }
    
    console.log(selectedPlaces)
    console.log(selectedMarker)
    
    const filtered = selectedPlaces.map( place => {
        return (
        <Marker 
        key={place.name} 
        position={place.location}
        onClick={()=>onSelectMarker(place)}
        />
    )})

    const placeMarkers = PLACES.map( place => {
        return (
        <Marker 
        key={place.name} 
        position={place.location}
        onClick={()=>onSelectMarker(place)}
        />
    )})

    const markerInfoWindow = selectedMarker.location && 
    (
        <InfoWindow
        position={selectedMarker.location}
        clickable={true}
        onCloseClick={() => setSelectedMarker({})}
        >
        <p>{selectedMarker.name}</p>
        </InfoWindow>
    )

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
            <h3>pick your drink type</h3>
            <form onChange={(e)=>changeDrink(e.target.value)}>
                <label htmlFor='drinks'>
                    coffee
                    <input type='radio' name='drinks' value='coffee'/>
                </label>
                <label htmlFor='drinks'>
                    beer
                    <input type='radio' name='drinks' value='beer'/>
                </label>
            </form>
            <br />
            <LoadScript
                googleMapsApiKey={config.MAPS_KEY}
            >
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                > 
                {selectedPlaces === {} ? placeMarkers : filtered}
                {markerInfoWindow}
                </GoogleMap>
            </LoadScript>
        </div>
    )
  }