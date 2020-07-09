import React from 'react'


const CountrySimple = ({ country, setCountryFilter}) => {
  return (
    <div>
      <p>
        {country.name}
        <button onClick={() => setCountryFilter(country.name)}>show</button> 
      </p>
      
    </div>
  )
}

export default CountrySimple