const hbs = require('hbs')
const express = require('express')
const path = require('path')

const geoCode = require('../Utils/geocode');
const foreCast = require('../Utils/weather')

const pages = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs') //helps in adding dynamic pages (hbs pages)
app.set('views', viewsPath) //path for hbs files folder

app.use(express.static(pages)) //picks up htmls automaticaly from directory when called
hbs.registerPartials(partialsPath)



app.get('', (req, res) => {
    res.render('index', {title : 'Weather',
                        name : 'Abhishek Verma'})
})

app.get('/about', (req, res) => {
    res.render('about', {title : 'About Me',
                        name : 'Abhishek Verma'})
})

app.get('/help', (req, res) => {
    res.render('help', {helpText: 'Helpful text',
                        title : 'Help',
                        name: 'Abhishek Verma'})
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a location.'
        })
    } 
    var address = req.query.search
    geoCode(address, (e,{lat, long, place} = {}) => {
        if(e){
            return res.send({e})
        }
        foreCast(lat, long, (e, data1) => {
            if(e){
                return res.send({e})
            }
            res.send({
                forecast : data1,
                place : place,
                address : req.query.search
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {title : 'Forbidden', name : 'Abhishek Verma', errorMsg : 'Page was never here'})
})

app.get('*', (req, res) => {
    res.render('404', {title : 'Forbidden', name : 'Abhishek Verma', errorMsg : 'Page was never here'})
})

app.listen(3000, () => {
    console.log('Server started')
})