import React from 'react'
import { connect } from 'react-redux'
//import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  //const dispatch = useDispatch()

  // const anecdotes = useSelector(state => {
  //   if ( state.filter === 'ALL' ) {
  //     return state.anecdotes
  //   }
  //   return state.anecdotes.filter(n => n.content.toLowerCase().indexOf(state.filter.toLowerCase()) >= 0)
  // })

  const onClickVote = (anecdote) => {
    //console.log('vote', id)
    props.vote(anecdote)
    props.showNotification(`you voted '${anecdote.content}'`, 5)
    //dispatch(vote(anecdote))
    //dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
    //setTimeout( () => dispatch(hideNotification()), 5000)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onClickVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

//export default AnecdoteList

const mapStateToProps = (state) => {
  if ( state.filter === 'ALL' ) {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
  }
  return {
    anecdotes: state.anecdotes.filter(n => n.content.toLowerCase().indexOf(state.filter.toLowerCase()) >= 0),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  vote,
  showNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList