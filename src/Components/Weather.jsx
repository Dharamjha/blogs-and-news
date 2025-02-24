import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Weather.css'

const Weather = () => {
  const[data, setData] = useState({})
 const [location, setLocation] = useState('')

 useEffect(() => {
     const fetchdefaultlocation = async() => {
     const defaultlocation = "Kolkata"
           const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultlocation}&appid=c0b258afade130265b77bc86ec6f9bfa`
          const response = await axios.get(url)
     setData(response.data)
     }
     fetchdefaultlocation()
 },[])

  const search = async () => {
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c0b258afade130265b77bc86ec6f9bfa`

    try {
  const response = await axios.get(url);

  if (response.data.cod !== 200) { 
    setData({ notFound: true });
  } else {
    setData(response.data);
    setLocation("");
  }
} catch (error) {
  if (error.response && error.response.status === 404) {
    setData({ notFound: true });
  }
}

     
}

const handleinputchnage = (e) => {
  setLocation(e.target.value)

}

const handleykey = (e) => {
   if(e.key === 'Enter'){
    search()
   }
}

const getweathericon = (weathertype) => {
   switch(weathertype) {
    case "Clear":
      return <i className='bx bxs-sun'></i>
      case "Clouds":
      return <i className='bx bxs-cloud'></i>
      case "Rain":
      return <i class='bx bx-cloud-rain'></i>
      case "Thunderstorm":
      return <i class='bx bx-cloud-lightning' ></i>
      case 'Snow':
      return <i class='bx bx-cloud-snow'></i>
       case "Haze":
      case "Mist":
      return <i className='bx bxs-cloud'></i>
      default:
      return <i className='bx bxs-cloud'></i>

   }
}
  
  return (
    <div className='weather'>
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input value={location} onChange={handleinputchnage} type="text" placeholder='Enter Location' onKeyDown={handleykey} />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {data.notFound ? (<div>Not Found</div>):(<div className="weather-data">
    {data.weather && data.weather[0] && getweathericon(data.weather[0].main)}
      <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>    
      <div className="temp">
  {data.main ? `${Math.floor(data.main.temp - 273.15)}°C` : null}
</div>
      </div>)}
      
    </div>
  )
}

export default Weather