  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const setError = props.setError 
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    //refetchQueries: [ {query: ALL_AUTHORS } ],
    onError: (error) => {
      //console.log(error)
      setError(error.message)
    }
  })

  const result = useQuery(ALL_AUTHORS)
  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  const authors = result.data.allAuthors

  const options = authors.map(n => {
    return {
      value: n.name,
      label: n.name
    }
  })
  const handleChange = selectedOption => {
    console.log(`Option selected:`, selectedOption.value)
    setName(selectedOption.value)
  }

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({  variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            onChange={handleChange}
            options={options}
          />
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
