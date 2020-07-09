import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([ ]) 
  const [ newPersonFilter, setNewPersonFilter ] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons  => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = !newPersonFilter
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(newPersonFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage} className="info"/>
      <Notification message={errorMessage} className="error"/>

      <Filter newPersonFilter={newPersonFilter} setNewPersonFilter={setNewPersonFilter} />
      
      <h3>add a new</h3>
      <PersonForm 
        persons={persons} setPersons={setPersons} setInfoMessage={setInfoMessage} setErrorMessage={setErrorMessage}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow}  setPersons={setPersons}/>
    </div>
  )
}

export default App