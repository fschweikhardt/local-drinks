import React from 'react'
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
        console.log('at changeDrink', filterPlaces)
        console.log('placesDisplay', placesDisplay)
        
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
        console.log('button clicked', value, checked)

        if (!checked) {

            delete filterPlaces[value]  
            STORE.configPlaces.map( (place, i) => {
                //for of loop filterPlaces to get every true filter
                return null
            })
            if (!Object.values(filterPlaces).includes(true)) {
                return changeDrink(drinkType)
            }
        }
        
        filterPlaces[value] = checked
        setFilterPlaces(filterPlaces)
       
        if (checked) {
            // eslint-disable-next-line
            placesDisplay.map( (place, i) => {
                // console.log(place.name, i)
                for (let filter in filterPlaces) {
                    // console.log('filter', filter)
                    // console.log(place.options[filter])
                    if (place.options[filter]) {
                        // console.log('PUSHED', place.name)
                        withFilters.push(place)
                    }
                }
            }) 
        }
        console.log(withFilters)
        removeDuplicates = [...new Set(withFilters)]
        console.log(removeDuplicates)
        removeDuplicates.map( (place, i)=> {
            for (const filter in filterPlaces) {
                // console.log(i, place.name, place.options[filter])
                if (!place.options[filter]) {
                    removeDuplicates.splice(i, 1)
                }
             }
        })

        setPlacesDisplay(removeDuplicates)
        console.log(removeDuplicates)
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