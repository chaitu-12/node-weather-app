const request=require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d93b37c0a7823d8e83e04304735c5f39&query='+latitude +','+longitude
        request({url,json:true},(error,response)=>{
            
        if(error){
            callback('Unable to connect weather',undefined)
        }
        else if(response.body.error){
            callback('This is wrong location zone',undefined)
        }
        else{
            callback(undefined,'It is currently ' + response.body.current.temperature +' degrees here. It is '+ response.body.current.weather_descriptions[0])
        }
    })
    
}
module.exports= forecast