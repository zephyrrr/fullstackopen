import React  from 'react'


const Filter = ({ newPersonFilter, setNewPersonFilter }) => {
    return (
        <div>
            filter shown with <input 
                value={newPersonFilter}
                onChange={(event) => setNewPersonFilter(event.target.value)} />
        </div>
    )
}
  
export default Filter