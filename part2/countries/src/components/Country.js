import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>{
        country.languages.map(lng => <li key={lng.name}>{lng.name}</li>)
        }</ul>
        <img src={country.flag} alt={country.name} width="100" height="100"></img>
        <Weather query={country.capital} />
    </div>
  )
}

export default Country