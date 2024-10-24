import React, { useEffect, useState } from 'react'
import "./css/style.css"
import axios from "axios"

import feellikeicon from "./feels-like.png"
import windicon from "./wind.png"
import humidityicon from "./humidity.png"
import pressureicon from "./png-transparent-water-circle-pressure.png"
import visibilityicon from "./Visibility_Weather_Forecast-512.webp"

const Tempapp = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    // const [icon, setIcon] = useState();


    useEffect(() => {
      
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=3ae14e2be12a88798b6e3e0c53723dcf`
        axios.get(url)
        .then((res)=>setCity(res.data))
        // .then(console.log(city),[search])
        .catch((err)=>{setCity()})
  
    });
    

    
    


  return (
    <div>
      <div className='box'>
      <div className='in-out'>
      <div className='inputData'>

    
      <button className='currLoc'
      onClick={
        () => {
      navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      })

      let finalAPI=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3ae14e2be12a88798b6e3e0c53723dcf`
      axios.get(finalAPI)
      .then((response)=>{
        
        setSearch(response.data.name);
      })
      .catch((err)=>{
        setCity()
      })

    }
      }
      >Use Current Location</button>
      <input 
      type='search'
      className='inputField'
      placeholder='Enter Place Name'
      value={search}
      onChange={(event)=>{setSearch(event.target.value)}}
      />
      </div>

      <div className='details'><h2 className='wd'>Weather Details</h2>
      {city ? (
       <div className='weather-det'>
       <h3>
         <img src={feellikeicon}  alt='feels-like' style={{ width: '20px', marginRight: '8px' }} />
         {`Feels like: ${(city.main.feels_like).toFixed(1)} °C`}
       </h3>
       <h3>
         <img src={windicon} alt='wind'  style={{ width: '20px', marginRight: '8px' }} />
         {`Wind Speed: ${(city.wind.speed).toFixed(1)} km/h`}
       </h3>
       <h3>
         <img src={humidityicon} alt='humidity' style={{ width: '20px', marginRight: '8px' }} />
         {`Humidity: ${(city.main.humidity)} %`}
       </h3>
       <h3>
         <img src={pressureicon} alt='pressure' style={{ width: '20px', marginRight: '8px' }} />
         {`Pressure: ${(city.main.pressure)} hPa`}
       </h3>
       <h3>
         <img src={visibilityicon} alt='visibility'  style={{ width: '20px', marginRight: '8px' }} />
         {`Visibility: ${((city.visibility) / 1000)} km`}
       </h3>
     </div>
     
      
      ):(<p className='err'>can't Fetch Details</p>)}
      </div>
      </div>

      {city ? (


        <div className='info'>
      <h2 className='location'><i className="fa-sharp fa-solid fa-location-dot fa-beat"></i>   {search}
      </h2>
      <h3 className='temp'> 
      <div className='temperature'>{(city.main.temp).toFixed(1)}</div>
      <div className='wc'>
      <div className='celsius'>°C</div>
      <div className='weather'>{city.weather[0].main}</div>
      </div>

      <div className='icons'>

      </div>
      </h3>
      </div>
      
      ):(<p className='err'>city not found</p>)}

    </div>
    </div>
      
  )
}

export default Tempapp

