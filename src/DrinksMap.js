import React from 'react'
import { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import config from './config';
import { PLACES } from './Places'

export default function DrinksMap() {

    const [ drinkType, setDrinkType ] = useState('')
    const [ placesDisplay, setPlacesDisplay ] = useState([])
    const [ selectedMarker, setSelectedMarker ] = useState({})

    const changeDrink = e => {  
        setDrinkType(e)
        let updatedPlaces = PLACES.filter( place => {
            return place.type === e ? place : null
        })
        setPlacesDisplay(updatedPlaces)
    }

    const setFilter = e => {
        const value = e.target.value
        const checked = e.target.checked

        let filterOptions = {
            singleOrigin: '',
            outdoorSeating: '', 
            nonAlcohalic: '',
        }

        const changeFilterOptions = Object.assign({}, filterOptions, { [value]: checked})
       
        console.log('filterOptions', changeFilterOptions)
        console.log('placesDisplay', placesDisplay)

        const withFilters = placesDisplay.filter( place => { 
            console.log(place.options, 'keys', Object.keys(place.options), 'values', Object.values(place.options))
            //if the index of Object.values(place.options) === true 
            //return the Object.keys of the same index
            return null
        })
        console.log('withFilters', withFilters)
        // setPlacesDisplay(withFilters)


        // changeDrink('coffee')
        // console.log(e.target.value, e.target.checked)
        // console.log('drinks selected', placesDisplay)
        // if (e.target.value === 'singleOrigin' && e.target.checked) {
        //     let filteredPlace = placesDisplay.filter( place => {
        //                 return place.singleOrigin === true ? place : null
        //         })
        //         // console.log(filteredPlace)
        //         setPlacesDisplay(filteredPlace)
        //     }  
        // if (e.target.value === 'outdoorSeating' && e.target.checked) {
        //     let filteredPlace = placesDisplay.filter( place => {
        //                 return place.outdoorSeating === true ? place : null
        //         })
        //         // console.log(filteredPlace)
        //         setPlacesDisplay(filteredPlace)
        //     } 
        // if (e.target.value === 'singleOrigin' && e.target.checked && e.target.value === 'outdoorSeating' && e.target.checked) {
        //     changeDrink('coffee')
        // }
        // console.log(filteredPlace)
        // setPlacesDisplay(filteredPlace)
        
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
                    {placesDisplay.map( (place, i) => {
                        return (
                            <>[...new Set(<label 
                                key={i+place} 
                                htmlFor={place.name}
                            >
                                {Object.keys(place.options).map( (option, j) => {
                                    return (
                                        <>
                                        <input 
                                            key={j+option}
                                            type='checkbox' 
                                            value={option}
                                        />
                                        {option}
                                        </>
                                    )
                                })}
                            </label>
                            )]
                            </>
                        )
                    })}
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