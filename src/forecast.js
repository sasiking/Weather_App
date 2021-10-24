const request = require('request');

//api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={a8e71c9932b20c4ceb0aed183e6a83bb}

//https://api.darksky.net/forecast/fe4dab721a468ef026685a773839dafa/16.5167,80.6167
const forecast = (lat, lon,  callback) =>{
    const url = 'https://api.darksky.net/forecast/fe4dab721a468ef026685a773839dafa/'+ lat+','+lon

    request({url:url, json:true}, (error, response) =>{
        if(error){
            callback("Unable to Connect to Services", undefined)
        }
        else if(response.body.error){
            callback("Enter Co-ordinates", undefined)
        }
        else{       
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability
            })
        }
    })
}

// geoCode('newyork', (error, data) => {
//     console.log("Error ",error);
//     console.log("Data ",data);
// })


module.exports = forecast