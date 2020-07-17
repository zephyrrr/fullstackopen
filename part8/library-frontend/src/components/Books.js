import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [allGenres, setAllGenres] = useState([])

  const [getBookByGenre, result] = useLazyQuery(ALL_BOOKS);

  useEffect(
    () => {
      console.log(genre)
      getBookByGenre({ variables: { genre: genre } })
    },
    [genre],
  )
  useEffect(() => {
    if (result.data) {
      console.log(result)
    }
  }, [result.data])

  //let result = useQuery(ALL_BOOKS)
  

  if (result.loading)  {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  if (allGenres.length === 0)
  {
    setAllGenres([...new Set([].concat.apply([], books.map(item => item.genres)))])
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {!genre ? 
          books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ) : 
          books.filter(a => a.genres.indexOf(genre) >= 0).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )
          }
        </tbody>
      </table>
      
      {allGenres.map(a =>
        <button key={a} onClick={ () => setGenre(a) }>{ a }</button>
      )}
    </div>
  )
}

export default Books