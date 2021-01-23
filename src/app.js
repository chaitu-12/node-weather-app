const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//Define paths for Express config
const app = express()
const host= '0.0.0.0'
const port = process.env.Port || 3000
const pathDirectory = path.join(__dirname,'../public')
const partialPath = path.join(__dirname,'../templates/partials')
const viewPath = path.join(__dirname, '../templates/views')

//Setup handlebars,register partial views and views location
app.set('views',viewPath );
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

//Define static directory to use
app.use(express.static(pathDirectory))

/*app.get('/help',(req,res)=>{
    res.send('<h1>Contact us</h1>')
})
app.get('/about',(req,res)=>{
    res.send('<h1>This is a weather application</h1>')
})*/

app.get('', (req,res)=>{
    res.render('index',{
        name: 'Chaitanya'
        
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Chaitanya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name: 'Chaitanya'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
        
    }
    console.log(req.query.address)
    geocode(req.query.address,(error,{latitude,longitude,placename}={})=>{
       
        if(error){
            return res.send({
                error: 'You entered wrong location'
            })
        }
        else{
            forecast(latitude,longitude,(error,forecastdata)=>{
                res.send({
                    Place: placename,
                    Weather: forecastdata
            
                })
            })
            
        }
        
    })
  
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        name: 'Chaitanya'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        name: 'Chaitanya'
    })
})
app.listen(port,host,()=>{
    console.log('Application has started succesfully')
})