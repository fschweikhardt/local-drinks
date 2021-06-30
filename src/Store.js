export const STORE = {

    configOptions : {
        coffee: ['singleOrigin', 'outdoorSeating', 'roaster'],
        beer: ['outdoorSeating', 'nonAlcohalic']
    },

    configPlaces : [
        { 
            type: 'coffee',
            options: {
                singleOrigin: true,
                roaster: true,
                outdoorSeating: true
            },
            name: 'Hopscotch - Southside',
            location: {
                lat: 39.157400,
                lng: -86.536230
            }
        },
        { 
            type: 'coffee',
            options: {
                outdoorSeating: true
            },
            name: 'Soma - Downtown',
            location: {
                lat: 39.166260,
                lng: -86.530083
            }
        },
        { 
            type: 'coffee',
            options: {
                outdoorSeating: true,
                roaster: true
            },
            name: 'Needmore Coffee Roasters',
            location: {
                lat: 39.167210,
                lng: -86.494560
            }
        },
        { 
            type: 'coffee',
            options: {},
            name: 'Crumble Coffee and Bakery - Downtown',
            location: {
                lat: 39.171440,
                lng: -86.534592
            }
        },
        { 
            type: 'coffee',
            options: {},
            name: 'Brilliant Coffee Company',
            location: {
                lat: 39.167300,
                lng: -86.535750
            }
        },
        { 
            type: 'coffee',
            options: {
                outdoorSeating: true
            },
            name: 'Inkwell Bakery and Cafe',
            location: {
                lat: 39.166850,
                lng: -86.535250
            }
        },
        { 
            type: 'beer',
            name: 'Upland Brewery',
            options: {
                nonAlcohalic: false,
                outdoorSeating: true,
            },
            location: {
                lat: 39.173531,
                lng: -86.537422
            }
        },
        { 
            type: 'beer',
            name: 'Bloomington Brewing Company',
            options: {
                nonAlcohalic: false,
                outdoorSeating: true,
            },
            location: {
                lat: 39.166270,
                lng: -86.527590
            }
        },
        { 
            type: 'beer',
            name: 'Switchyard Brewing Company',
            options: {
                nonAlcohalic: false,
                outdoorSeating: true,
            },
            location: {
                lat: 39.170139,
                lng: -86.533951
            }
        },
        { 
            type: 'beer',
            name: 'Function Brewing',
            options: {
                nonAlcohalic: false,
                outdoorSeating: true,
            },
            location: {
                lat: 39.167370,
                lng: -86.533060
            }
        },
        { 
            type: 'beer',
            name: 'The Tap',
            options: {
                nonAlcohalic: true,
                outdoorSeating: true,
            },
            location: {
                lat: 39.166771,
                lng: -86.535233
            }
        },
    ]

}