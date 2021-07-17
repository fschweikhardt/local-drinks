import React,  { useState, useEffect } from 'react'
import { uniq } from 'lodash';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import config from './config';
import { STORE } from './Store'

export default function DrinksMap() {

    const [ drinkType, setDrinkType ] = useState('')
    const [ placesDisplay, setPlacesDisplay ] = useState([])
    const [ filterPlaces, setFilterPlaces ] = useState({})
    const [ selectedMarker, setSelectedMarker ] = useState({})
    const [ mapSize, setMapSize ] = useState(0)

    useEffect( ()=> {
        if (window.innerWidth < 600) {
            setMapSize(300)
        } else if (window.innerWidth < 1200) {
            setMapSize(500)
        } else {
            setMapSize(`${window.innerWidth}` - 700)
        }
    }, [])

    const changeDrink = e => {

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
                return changeDrink(drinkType)
            }
            // eslint-disable-next-line
            STORE.configPlaces.map( (place, i) => {
                for (let filter in filterPlaces) {
                    if (place.type === drinkType && place.options[filter]) {
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
                    if (place.type === drinkType && place.options[filter]) {
                        return withFilters.push(place)
                    }
                }
            }) 
        }

        removeDuplicates = uniq(withFilters)
            // eslint-disable-next-line
            removeDuplicates.map( (place, i)=> {
                for (const filter in filterPlaces) {
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
        width: mapSize,
        height: mapSize
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

    const domFilters =  
                <form onChange={setFilter}>
                    <fieldset style={{border: 'none'}}>
                        <legend style={{fontSize: '20px', fontWeight:'bold'}}>{drinkType} filter</legend>
                        { drinkType ? STORE.configOptions[drinkType].map( (option,i) => {
                            return (
                                <label key={option+i} htmlFor={option}>
                                    <input type="checkbox" name={option} id={option} value={option} />
                                    {option}
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
                    </fieldset>
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
            <form onChange={(e)=>changeDrink(e.target.value)}>
                <fieldset style={{border: 'none'}}>
                <legend>pick your drink type</legend>
                    <input type='radio' name='drink' id='coffee' value='coffee'/>
                    <label htmlFor='coffee'>
                        coffee
                    </label>
                    <input type='radio' name='drink' id='beer' value='beer'/>
                    <label htmlFor='beer'>
                        beer
                    </label>
                </fieldset>
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