const express = require("express")



const app = express()


const access_token = "6c7a3da2449cbe2b5682d1ab2047132e"

app.get("/weather", async(request,response)=> {
    
    

   let  city = request.query.name 
        
   console.log(city)
   
   if (!city) {
        return response.status(400).send({error:"City name is required"})
   }
  
   


   

  try {

    const url = `https://api.weatherstack.com/current?access_key=${access_token}&query=${city}`
    console.log(url)
    const getResponse = await fetch(url)
    const data = await getResponse.json()
    console.log(data)

      //* we can destrcuture  object and use  
      
      const {location: {name,country,lat,lon,region,localtime,timezone_id,utc_offset}, 
        current : {temperature,wind_speed,wind_dir,pressure,humidity,cloudcover,feelslike,visibility,is_day,weather_icons,weather_descriptions}
    } = data 
     response.json({
        location: {
            cityName:name,
            country, 
            latitude:lat,
            longitude:lon, 
            region,
            localTime: localtime,
            timeZoneId:timezone_id,
            utcOffset:utc_offset
        },
        current: {
            temperature, 
            windSpeed:wind_speed,
            windDirection:wind_dir,
            pressure,humidity,
            cloudCover:cloudcover,
            feelsLike:feelslike,
            visibility,
            isDay:is_day,
            weatherIcons:weather_icons, 
            weatherDescriptions:weather_descriptions

        }
     });

    

    

/*
    response.json({
        location: {
      
            country : data.location.country, 
            latitude : data.location.lat, 
            longitude: data.location.lon,
            region : data.location.region,
            localTime:data.location.localtime, 
            timeZoneId : data.location.timezone_id,
            utcOffset : data.location.utc_offset


        },
         current : {

            temperature : data.current.temperature,
            windSpeed : data.current.wind_speed,
            windDirection: data.current.wind_dir,
            pressure:data.current.pressure,
            humidity: data.current.humidity, 
            cloudCover:data.current.cloudcover, 
            feelsLike : data.current.feelslike, 
            visibility: data.current.visibility, 
            isDay : data.current.is_day,
            weatherIcons : data.current.weather_icons,
            weatherDescriptions: data.current.weather_descriptions



         }
        


    }) */
} 
catch(error) {
    response.status(500).send({error:"Failed to fetched weather Data, Please check the name of city"})
}

})



app.listen(5001, ()=> {
    console.log("server is ruunning on 5001")
} )





module.exports = app