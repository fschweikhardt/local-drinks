import React from 'react'
import { isEqual, has, hasIn } from 'lodash';
import { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import config from './config';
import { STORE } from './Store'

export default function DrinksMap() {

    const [ drinkType, setDrinkType ] = useState('')
    const [ placesDisplay, setPlacesDisplay ] = useState([])
    const [ filterPlaces, setFilterPlaces ] = useState({})
    const [ selectedMarker, setSelectedMarker ] = useState({})

    const changeDrink = e => {
        setDrinkType(e)
        let updatedPlaces = STORE.configPlaces.filter( place => {
            return place.type === e ? place : null
        })
        setPlacesDisplay(updatedPlaces)
    }

    const setFilter = e => {
        const { value } = e.target
        const { checked } = e.target
        
        // console.log(value, checked)

        if (!checked) {
            delete filterPlaces[value]
            if (!Object.values(filterPlaces).includes(true)) {
                return changeDrink(drinkType)
            }
        }

        filterPlaces[value] = checked
        setFilterPlaces(filterPlaces)
        // console.log(filterPlaces)

        let withFilters = []
        if (Object.values(filterPlaces).includes(true)) {
            placesDisplay.map( place => {
                return place.options.map( (option, i) => {
                    if (isEqual(filterPlaces, option)) {
                        return withFilters.push(place)
                    }
                    return null
                })
            }) 
            // console.log(filterPlaces[Object.keys(filterPlaces)])
        }         
        // console.log(withFilters)
        setPlacesDisplay(withFilters)
        withFilters = []
        // console.log(filterPlaces)
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
            <form onChange={setFilter}>
                <h3>{drinkType} filter</h3>
                {/* select Object.keys(STORE.configOptions) === drinktype) */}
                    {(Object.values(STORE.configOptions['coffee'])).map( (option,i) => {
                         return (
                             <label 
                                key={option+i} 
                                htmlFor={option}
                            >
                                {option}
                                <input
                                    type="checkbox"
                                    name={option}
                                    value={option}
                                />
                            </label>
                        )
                    })}
                <br />
                <br />
                <button
                    type='reset'
                    onClick={()=>changeDrink(`${drinkType}`)}>
                    RESET
                </button>
            </form>
            
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
            <form id='drinks' onChange={(e)=>changeDrink(e.target.value)}>
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