import React from 'react'
import { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import config from './config';
import { PLACES } from './Places'

export default function DrinksMap() {

    const [ drinkType, setDrinkType ] = useState('')
    const [ placesDisplay, setplacesDisplay ] = useState([])
    const [ filterObj, setFilterObj ] = useState({})
    const [ selectedMarker, setSelectedMarker ] = useState({})

    const changeDrink = e => {
        setDrinkType(e)
        let updatedPlaces = PLACES.filter( place => {
            return place.type === e ? place : null
        })
        setplacesDisplay(updatedPlaces)
    }

    const setFilter = e => {
        changeDrink('coffee')
        // console.log(e.target.value, e.target.checked)
        // console.log('drinks selected', placesDisplay)
        if (e.target.value === 'singleOrigin' && e.target.checked) {
            let filteredPlace = placesDisplay.filter( place => {
                        return place.singleOrigin === true ? place : null
                })
                // console.log(filteredPlace)
                setplacesDisplay(filteredPlace)
            }  
        if (e.target.value === 'outdoorSeating' && e.target.checked) {
            let filteredPlace = placesDisplay.filter( place => {
                        return place.outdoorSeating === true ? place : null
                })
                // console.log(filteredPlace)
                setplacesDisplay(filteredPlace)
            } 

        // if (e.target.value === 'singleOrigin' && e.target.checked && e.target.value === 'outdoorSeating' && e.target.checked) {
        //     changeDrink('coffee')
        // }
        // console.log(filteredPlace)
        // setplacesDisplay(filteredPlace)
        
    }

    //----> boring stuff
    const onSelectMarker = item => {
      setSelectedMarker(item);
    }
   
    const containerStyle = {
        width: '500px',
        height: '500px'
      };
    
      const center = {
        lat: 39.1666805,
        lng: -86.528757
    }
    //-----<
    
    const filterForm = 
        <div>
            <form onClick={setFilter}>
                <h3>{place.type} filter</h3>
                <label htmlFor={place.type}>
                    {place.filter.map()}
                    <input type='checkbox' value={`${Object.keys(place.filter)}`} />
                </label>
                <br />
            </form>
            <button
                    type='reset'
                    onClick={()=>changeDrink(`${drinkType}`)}>
                    RESET
            </button>
            <br />
        </div>

    //markers for selected locations on the map
    const domplacesDisplay = placesDisplay.map( place => {
        return (
            <Marker 
                key={place.name} 
                position={place.location}
                onClick={()=>onSelectMarker(place)}
            />
    )})

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

            {drinkType ? filterForm : null}

            <LoadScript
                googleMapsApiKey={config.MAPS_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                > 
                {placesDisplay ? domplacesDisplay : null}

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