import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const Weather = ({ query }) => {
  
  const [ weather, setWeather ] = useState('') 
  useEffect(() => {
    console.log('effect weather')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`)
      .then(response => {
        console.log('weather promise fulfilled')
        console.log(response.data)
        setWeather(response.data)
    })
  }, [query, ])

  if (!weather) {
    return (
      <div>
      </div>
    )
  }
  return (
    <div>
      <h2>Weather in {query}</h2>
      <p>temperture: {weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}></img>
      <p>wind: {weather.current.wind_speed} kilometers/hour direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default Weather