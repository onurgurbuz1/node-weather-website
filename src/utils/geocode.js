const request = require("request")

const geocode = (address,callback) => {

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoib251cjAxIiwiYSI6ImNrbnp2eXptaDA1aHYyd2wwZnAxa213MHQifQ.Ozh2FgYDG-pdw3i-3_uVUQ&limit=1'

    request({url,json:true}, (error,{body}) => { 

        

        if(error) {
            callback('Unable to connect location services',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search',undefined)
        }else{
            const loc = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, loc)
        }
    })
}

module.exports = geocode