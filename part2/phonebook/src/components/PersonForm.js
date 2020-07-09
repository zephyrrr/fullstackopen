import React, { useState }  from 'react'
import personService from '../services/persons'


const PersonForm = ({ persons, setPersons, setErrorMessage, setInfoMessage }) => {
    const [ newName, setNewName ] = useState('')
    const [ newPhone, setNewPhone ] = useState('')


    const addPerson = (event) => {
        event.preventDefault()

        const newObject = {
            name: newName,
            number: newPhone
        }

        const idx = persons.map(person => person.name).indexOf(newName)
        if (idx >= 0) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService.update(persons[idx].id, newObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== persons[idx].id ? person : returnedPerson))
                        setInfoMessage(`Updated '${returnedPerson.name}'`)
                        setTimeout(() => {
                            setInfoMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setErrorMessage(`Infomation of '${persons[idx].name}' has already been removed from server`)
                        setPersons(persons.filter(n => n.id !== persons[idx].id))
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
            return
        }
        
        personService.create(newObject)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewPhone('')
                setInfoMessage(`Added '${newPerson.name}'`)
                setTimeout(() => {
                    setInfoMessage(null)
                }, 5000)
            })
    }

    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input 
                value={newName}
                onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div>
            number: <input 
                value={newPhone}
                onChange={(event) => setNewPhone(event.target.value)} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}
  
export default PersonForm