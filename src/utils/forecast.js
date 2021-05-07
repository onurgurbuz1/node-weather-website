const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=50b70d7f19f54483699b4e81bbf2f715&query='+latitude+','+longitude+'&units=f'


    request({url,json:true},(error, {body}) => { //Instead of writing response and rapidly using response.body we destructured to {body}

        if (error){
            callback('Can not connect',undefined)
        }else if(body.error){
            callback('Can not find the address',undefined)

        }else{
            const forecast = {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feltTemp: body.current.feelslike

            }
            
            callback(undefined,forecast.description+'. It is currently '+ forecast.temperature+ ' degrees out. And it feels '+ forecast.feltTemp )
        }


    })
}

module.exports = forecast