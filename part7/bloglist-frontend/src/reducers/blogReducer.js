import noteService from '../services/blogs'

export const updateBlog = ( item ) => {
  return async dispatch => {
    const item_id = item.id
    const newNote = await noteService.update(item_id, item)
    dispatch({
      type: 'UPDATE_BLOG',
      data: newNote
    })
  }
}

export const createBlog = ( content ) => {
  return async dispatch => {
    const newNote = await noteService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newNote,
    })
  }
}

export const deleteBlog = ( item_id ) => {
  return async dispatch => {
    await noteService.del(item_id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { 'id': item_id }
    })
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: notes,
    })
  }
}

export const initializeComments = (blog_id) => {
  return async dispatch => {
    const notes = await noteService.getComments(blog_id)
    dispatch({
      type: 'INIT_COMMENTS',
      data: {
        'id': blog_id,
        'comments': notes
      }
    })
  }
}

export const addComment = (blog_id, new_comment) => {
  return async dispatch => {
    const notes = await noteService.addComment(blog_id, new_comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        'id': blog_id,
        'comments': notes
      }
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) { 
    case 'UPDATE_BLOG':
      {
        const id = action.data.id
        //const noteToChange = state.find(n => n.id === id)
        const changedNote = action.data
        const newState = state.map(note =>
          note.id !== id ? note : changedNote 
        )
        return newState.sort( (a, b) => b.likes - a.likes)
      }
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      {
        const id = action.data.id
        return state.filter(n => n.id !== id)
      }
    case 'INIT_BLOGS':
      {
        const newState = action.data
        return newState.sort( (a, b) => b.likes - a.likes)
      }
    case 'INIT_COMMENTS':
      {
        const id = action.data.id
        const noteToChange = state.find(n => n.id === id)
        const changedNote = {...noteToChange, comments: action.data.comments}
        return state.map(note =>
          note.id !== id ? note : changedNote 
        )
      }
    case 'ADD_COMMENT':
      {
        const id = action.data.id
        const noteToChange = state.find(n => n.id === id)
        const changedNote = {...noteToChange, comments: [...noteToChange.comments || [], action.data.comments]}
        return state.map(note =>
          note.id !== id ? note : changedNote 
        )
      }
    default: 
      return state 
  }
}

export default reducer