import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom"
import './App.css'
import  { useField } from './hooks'

const Notification = ({ message, className }) => {
  if (!message) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  // const id = useParams().id
  // const anecdote = anecdotes.find(n => n.id.toString() === id.toString()) 
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div><p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p></div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
        )}
      </ul>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const inputContent = useField('text')
  const inputAuthor = useField('text')
  const inputInfo = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      'content': inputContent.value,
      'author': inputAuthor.value,
      'info': inputInfo.value,
      votes: 0
    })
    props.setNotification(`a new anecdote ${inputContent.value} created!`)
    setTimeout( () => {
      props.setNotification('')
    }, 10000)
  }

  const onClickReset = (event) => {
    event.preventDefault()
    inputContent.reset()
    inputAuthor.reset()
    inputInfo.reset()
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...inputContent} reset='' />
        </div>
        <div>
          author
          <input name='author' {...inputAuthor} reset='' />
        </div>
        <div>
          url for more info
          <input name='info' {...inputInfo} reset='' />
        </div>
        <button type='submit'>create</button>
        <button type='cancel' onClick={ onClickReset }>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(n => n.id.toString() === match.params.id.toString())
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu></Menu>
      <Notification message={notification} className="info"/>
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/anecdotes">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          {notification ? <Redirect to="/anecdotes" /> : <CreateNew addNew={addNew} setNotification={setNotification}/>}
          
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App;
