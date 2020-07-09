import React  from 'react'


const Filter = ({ countryFilter, setCountryFilter }) => {
    return (
        <div>
            find countries <input 
                value={countryFilter}
                onChange={(event) => setCountryFilter(event.target.value)} />
        </div>
    )
}
  
export default Filter