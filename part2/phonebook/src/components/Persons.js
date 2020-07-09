import React from 'react'
import Person from './Person'

const Persons = ({ persons, setPersons }) => {
    return (
        <div>
        {persons.map(person => 
            <Person key={person.name} person={person} persons={persons} setPersons={setPersons} />
        )}
        </div>
    )
}

export default Persons