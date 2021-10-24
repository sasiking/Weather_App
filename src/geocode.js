const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1Ijoic2FzaWtpbmciLCJhIjoiY2t1bXN2dG50MDI0ajJ1anQweWh0MDk0OSJ9.p_HuQd2mQ09_ALYL5DCYiQ'
    request({url:url, json:true}, (error,response ) => {

        if(error){
            callback("Unable to Connect to Services", undefined)
        }
        else if(Object.keys(response.body.features).length === 0){
            callback("Enter Correct Name", undefined)
        }
        else{       
            callback(undefined, {
            lat: response.body.features[0].center[1],
            lon : response.body.features[0].center[0],
            loc : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;

// geoCode('newyork', (error, data) => {
//     console.log("Error ",error);
//     console.log("Data ",data);
// })

//api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
