import React from 'react'
import { uniq, isEqual } from 'lodash';
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
        
        setPlacesDisplay([])
        setFilterPlaces({})
        console.log('filters at changeDrink', filterPlaces)
        console.log('places at changeDrink', placesDisplay)
        
        if (drinkType) {
            setDrinkType(drinkType)
            console.log('preset drinkType')
            } else {
                setDrinkType(e)
                console.log('drinkType from event')
        }

        let updatedPlaces = STORE.configPlaces.filter( place => {
            return place.type === e ? place : null
        })
        setPlacesDisplay(updatedPlaces)
    }

    const setFilter = e => {
        const { value } = e.target
        const { checked } = e.target
        let withFilters = []
        let removeDuplicates = []
        // console.log(filterPlaces)

        if (!checked) {
            // console.log(filterPlaces)
            delete filterPlaces[value] 
            // console.log(filterPlaces)

            STORE.configPlaces.map( (place, i) => {
                for (let filter in filterPlaces) {
                    if (place.options[filter]) {
                        return withFilters.push(place)
                    }
                } 
            })
            if (!Object.values(filterPlaces).includes(true)) {
                console.log('cleared')
                return changeDrink(drinkType)
            }
        }
        
        if (checked) {
            filterPlaces[value] = checked
            setFilterPlaces(filterPlaces)
            placesDisplay.map( (place, i) => {
                for (let filter in filterPlaces) {
                    if (place.options[filter]) {
                        return withFilters.push(place)
                    }
                }
            }) 
        }

        // console.log(filterPlaces)

        // console.log(withFilters)
        removeDuplicates = uniq(withFilters)
        // console.log(removeDuplicates)
        removeDuplicates.map( (place, i)=> {
            // console.log('mapping duplicates')
            for (const filter in filterPlaces) {
                // console.log(filter, place.name, place.options[filter], i)
                if (!place.options[filter]) {
                    removeDuplicates.splice(i, 1)
                }
             }
        })

        setPlacesDisplay(removeDuplicates)
        // console.log(removeDuplicates)
        withFilters = []
        removeDuplicates = []
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
                    onClick={()=>changeDrink(drinkType)}>
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
                    zoom={13}
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