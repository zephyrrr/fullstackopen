import noteService from '../services/users'

export const initializeUsers = (notes) => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: notes,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) { 
    case 'INIT_USERS':
      {
        const newState = action.data
        return newState.sort( (a, b) => b.blog.length - a.blog.length)
      }
    default: 
      return state 
  }
}

export default reducer