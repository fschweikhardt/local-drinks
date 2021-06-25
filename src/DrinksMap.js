import React from 'react'
import { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import config from './config';
import { PLACES } from './Places'

export default function DrinksMap() {

    const [ selectedMarker, setSelectedMarker ] = useState({})
    const [ drinkTypeSelected, setdrinkTypeSelected ] = useState([])
    const [ drinkType, setDrinkType ] = useState('')

    const changeDrink = e => {
        setDrinkType(e)
        let updatedPlaces = PLACES.filter( place => {
            return place.type === e ? place : null
        })
        setdrinkTypeSelected(updatedPlaces)
    }

    const setFilter = e => {
        console.log(e.target.value, e.target.checked)
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
    
    const coffeeForm = 
            <div>
                <form onChange={setFilter}>
                    <h3>coffee filters lol</h3>
                    <label htmlFor='coffee-filter'>
                        single origin espresso
                        <input type='checkbox' name='single-origin' value='singleOrigin' />
                    </label>
                    <br />
                    <label htmlFor='coffee-filter'>
                        outdoor seating
                        <input type='checkbox' name='outdoor-seating' value='outdoorSeating' />
                    </label>
                </form>
                <br />
            </div>


    const domDrinkTypeSelected = drinkTypeSelected.map( place => {
        return (
            <Marker 
                key={place.name} 
                position={place.location}
                onClick={()=>onSelectMarker(place)}
            />
    )})

    // console.log(drinkTypeSelected)
    // console.log(selectedMarker.location)
    // console.log(drinkType)
    
    return (
        <div style={{
            padding:'50px',
            textAlign:'center',
            position: 'absolute'
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

            {drinkType === 'coffee' ? coffeeForm : null}

            <LoadScript
                googleMapsApiKey={config.MAPS_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                > 
                {drinkTypeSelected ? domDrinkTypeSelected : null}
                {selectedMarker.location && 
                    <InfoWindow
                        position={selectedMarker.location}
                        clickable={true}
                        onCloseClick={() => setSelectedMarker({})}
                        >
                        <p>{selectedMarker.name}</p>
                    </InfoWindow>
                }
                </GoogleMap>
            </LoadScript>
        </div>
    )
  }