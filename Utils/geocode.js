const Request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaXNoZWsyMTI5NiIsImEiOiJja2RpaXhqZXIwNWdmMnJvZjVncm1mZjV5In0.0WtwnsFRCWxRngska2qH_Q&limit=1'
    Request( {url, json : true}, (e, ro, {features}={}) =>{
        if(e){
            callback('Unable to connect to Location service!', undefined);
        } else if(features.length == 0) {
            callback('No such location found. Try other name.', undefined)
        } else {
            callback(undefined, {lat : features[0].center[1],
                                 long : features[0].center[0],
                                 place : features[0].place_name})   //lat is index 1, log is index 0
        }
    })
}

module.exports = geocode