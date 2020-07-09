import React from 'react'
import personService from '../services/persons'

const Person = ({ person, persons, setPersons }) => {
  const deletePerson = (event) => {
    if (window.confirm(`Delete ${person.name}`)) { 
      personService.del(person.id)
        .then( () => {
          setPersons(persons.filter(n => n.id !== person.id))
        })
        .catch( () =>{})
    }
  }

  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={deletePerson}>delete</button> 
      </p>
    </div>
  )
}

export default Person