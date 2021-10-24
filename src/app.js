// importing modules
const path = require('path')
const express = require('express')
const geoCode = require('./geocode')
const forecast = require('./forecast')
const hbs = require('hbs')
const { BADHINTS } = require('dns')

const app = express()

//Path Cofiguration
const abpath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partPath = path.join(__dirname, '../templates/partials')


//Set up 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partPath)

//setup Statics Directory
app.use(express.static(abpath))

app.get('', (req, resp) => {
    resp.render('index', {
        title: 'Weather App',
        name : 'Sasi King'
    })
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        name : "Sasi King",
        title: "Help Page",
        age : 24
    })
})

app.get('/about', (req, resp) => {
    resp.render('about', {
        name : "Sasi King",
        title: "About",
        age : 24
    })
})

app.get('/weather', (req, resp) => {
    if(!req.query.address) {
        return resp.send({
            error : "Enter the Address to see the Forecast "
        })
    }
    geoCode(req.query.address, (error, data) => {
        if(error)
        return resp.send({ error })
        //console.log(data.lat,data.lon)
            forecast(data.lat, data.lon, (error, forecastData)=>{
            if(error)
            return resp.send({ error })
            
            resp.send({
                Weather_Forcast : forecastData.summary +  " Temperature is " + forecastData.temperature + 
                ". There is " + forecastData.precipProbability + "% chance of rain" ,
                location : data.loc
            })
        })

    })


})

app.get('/help/*', (req, resp) => {
    resp.send("<h1>Error 404 Find Help Documents</h1>")
})

app.get('*', (req, resp) => {
    resp.send("<h1>Error 404, Can't Find the Page</h1>")
})

app.listen(3000, () =>{
    console.log("Server Running in the port 3000")
})