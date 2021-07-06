export const STORE = {

    configOptions : {
        coffee: ['single origin', 'outdoor seating', 'roaster'],
        beer: ['outdoor seating', 'non-alcohalic']
    },

    configPlaces : [
        { 
            type: 'coffee',
            options: {
                'single origin': true,
                roaster: true,
                'outdoor seating': true
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
                'outdoor seating': true
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
                'outdoor seating': true,
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
                'outdoor seating': true
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
                'non-alcohalic': true,
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
                'outdoor seating': true,
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
                'outdoor seating': true,
            },
            location: {
                lat: 39.170139,
                lng: -86.533951
            }
        },
        { 
            type: 'beer',
            name: 'Function Brewing',
            options: {},
            location: {
                lat: 39.167370,
                lng: -86.533060
            }
        },
        { 
            type: 'beer',
            name: 'The Tap',
            options: {
                'non-alcohalic': true,
                'outdoor seating': true,
            },
            location: {
                lat: 39.166771,
                lng: -86.535233
            }
        },
    ]

}