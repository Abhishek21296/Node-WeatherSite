const Request = require('postman-request')

const weather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d5dfb63dd75255508173f6170b2b0201&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=m'

    Request( {url, json : true}, (e, ro, r) =>{
        if(e){
            callback('Unable to connect to Weather service!', undefined);
        } else if(r.error) {
            callback('No such location found. Try other name.', undefined)
        } else {
            callback(undefined, r)   //lat is index 1, log is index 0
        }
    })
}

module.exports = weather