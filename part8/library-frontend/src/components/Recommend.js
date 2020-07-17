import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import { ALL_BOOKS, ME } from '../queries'


const Recommend = (props) => {
  const result = useQuery(ALL_BOOKS)
  const me_result = useQuery(ME)
  if (result.loading || me_result.loading)  {
    return <div>loading...</div>
  }
  
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const genre = me_result.data.me ? me_result.data.me.favoriteGenre : 'notexist'  //'database';
  console.log(genre)
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>patterns</b></p>

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
    </div>
  )
}

export default Recommend