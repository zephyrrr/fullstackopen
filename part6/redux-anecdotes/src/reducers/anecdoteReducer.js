import noteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const vote = ( item ) => {
  return async dispatch => {
    const item_id = item.id
    const notes = await noteService.vote(item)
    dispatch({
      type: 'VOTE',
      data: { 'id': item_id }
    })
  }
}

export const createAnecdote = ( content ) => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newNote,
    })
  }
}

export const initializeAnecdotes = (notes) => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: notes,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) { 
    case 'VOTE':
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        votes: (noteToChange.votes || 0) + 1
      }
      const newState = state.map(note =>
        note.id !== id ? note : changedNote 
      )
      return newState.sort( (a, b) => b['votes'] - a['votes'])
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      {
        const newState = action.data
        return newState.sort( (a, b) => b['votes'] - a['votes'])
      }
    default: 
      return state 
  }
}

export default reducer