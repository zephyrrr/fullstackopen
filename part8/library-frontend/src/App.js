
import React, { useState, useEffect } from 'react'
import {
  useQuery, useMutation, useSubscription, useApolloClient
} from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('phonenumbers-user-token')
    if (loggedUserJSON) {
      const token = loggedUserJSON
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const toApplyGenres = [null, '', ...addedBook.genres]
    
    toApplyGenres.forEach(element => {
      if (element === null) {
        const dataInStore = client.readQuery({ query: ALL_BOOKS })
        if (!includedIn(dataInStore.allBooks, addedBook)) {
          client.writeQuery({
            query: ALL_BOOKS,
            data: { allBooks : dataInStore.allBooks.concat(addedBook) }
          })
        }
      } else {
        const dataInStore = client.readQuery({ 
          query: ALL_BOOKS,
          variables: {
            genre: element,
          }
        })
        if (!includedIn(dataInStore.allBooks, addedBook)) {
          client.writeQuery({
            query: ALL_BOOKS,
            variables: {
              genre: element,
            },
            data: { allBooks : dataInStore.allBooks.concat(addedBook) }
          })
        }
      }
    })
    
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      //window.alert(`${addedBook.title} added`)
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const [errorMessage, setErrorMessage] = useState(null)
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  
  const login = () => {
    setPage('login')
  }

  const logout = () => {
    setToken(null)
    window.localStorage.removeItem("phonenumbers-user-token");
    window.localStorage.clear()
    client.resetStore()
  }

  const [page, setPage] = useState('authors')

  // if (!token) {
  //   return (
  //     <div>
  //       <Notify errorMessage={errorMessage} />
  //       <h2>Login</h2>
  //       <LoginForm
  //         setToken={setToken}
  //         setError={notify}
  //       />
  //     </div>
  //   )
  // }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : ''}
        {token ? <button onClick={() => setPage('recommend')}>recommend</button> : ''}
        {token ? <button onClick={logout}>logout</button> : <button onClick={login}>login</button>}
      </div>

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
      />

      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      {token ? 
      <NewBook
        show={page === 'add'}
        setError={notify}
        updateCacheWith = { updateCacheWith }
      /> : ''}

      {token ? 
      <Recommend
        show={page === 'recommend'}
        setError={notify}
      /> : ''}
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App