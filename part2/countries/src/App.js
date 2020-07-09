import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import CountrySimple from './components/CountrySimple'
import Country from './components/Country'

import axios from 'axios'


const App = () => {
  const [ countries, setCountries ] = useState([ ]) 
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
    })
  }, [])
  
  const [ countryFilter, setCountryFilter ] = useState('')

  if (!countryFilter) {
    return (
      <div>
        <Filter countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
      </div>
    )
  }
  
  const countriesToShow = !countryFilter
    ? countries
    : countries.filter(country => country.name.toLowerCase().indexOf(countryFilter.toLowerCase()) >= 0)

  if (countriesToShow.length > 10) {
    return (
      <div>
        <Filter countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  else if (countriesToShow.length > 1) {
    return (
      <div>
        <Filter countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
  
        {countriesToShow.map(country => 
            <CountrySimple key={country.name} country={country} setCountryFilter={setCountryFilter} />
        )}
      </div>
    )
  }
  else {
    return (
      <div>
        <Filter countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
  
        {countriesToShow.map(country => 
            <Country key={country.name} country={country} />
        )}
      </div>
    )
  }
    
  
}

export default App