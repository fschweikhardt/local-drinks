import React,  { useState } from 'react'
import { uniq } from 'lodash';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import config from './config';
import { STORE } from './Store'

export default function DrinksMap() {

    const [ drinkType, setDrinkType ] = useState('')
    const [ placesDisplay, setPlacesDisplay ] = useState([])
    const [ filterPlaces, setFilterPlaces ] = useState({})
    const [ selectedMarker, setSelectedMarker ] = useState({})

    const changeDrink = e => {
        console.log(drinkType)

        setPlacesDisplay([])
        setFilterPlaces({}) 
        
        if (drinkType === e || !e) {
            // setDrinkType(drinkType)
            console.log(`preset drinkType - ${e}`)
            } else {
                setDrinkType(e)
                console.log(`drinkType from event - ${e}`)
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

        if (!checked) {
            delete filterPlaces[value]
            setFilterPlaces(filterPlaces)
            
            if (!Object.values(filterPlaces).includes(true)) {
                console.log('cleared')
                return changeDrink(drinkType)
            }
            // eslint-disable-next-line
            STORE.configPlaces.map( (place, i) => {
                for (let filter in filterPlaces) {
                    console.log(place.options[filter])
                    if (place.options[filter]) {
                        return withFilters.push(place)
                    }
                } 
            })    
        }

        if (checked) {
            filterPlaces[value] = checked
            setFilterPlaces(filterPlaces)
            // eslint-disable-next-line
            placesDisplay.map( (place, i) => {
                for (let filter in filterPlaces) {
                    console.log(place.options[filter])
                    if (place.options[filter]) {
                        return withFilters.push(place)
                    }
                }
            }) 
        }

        removeDuplicates = uniq(withFilters)
            // eslint-disable-next-line
            removeDuplicates.map( (place, i)=> {
                for (const filter in filterPlaces) {
                    console.log(filter, place.name, place.options[filter], i)
                    if (!place.options[filter]) {
                        removeDuplicates.splice(i, 1)
                    }
                }
            })

        setPlacesDisplay(removeDuplicates)
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

    //markers for selected locations on the map
    const domplacesDisplay = placesDisplay.map( place => {
        return (
            <Marker 
                key={place.name} 
                position={place.location}
                onClick={()=>onSelectMarker(place)}
            />
    )})

    console.log(drinkType)

    const domFilters =  
                <form onChange={setFilter}>
                    <h3>{drinkType} filter</h3>
                        { drinkType ? STORE.configOptions[drinkType].map( (option,i) => {
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
                        }) : null}
                    <br />
                    <br />
                    {/* <button
                        type='reset'
                        onClick={()=>changeDrink(drinkType)}>
                        RESET
                    </button> */}
                </form>

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

            { drinkType ? domFilters : null }
            
            <br />
            
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