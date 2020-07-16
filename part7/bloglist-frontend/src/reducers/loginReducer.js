const initialState = ''

export const login = ( user ) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const logout = ( ) => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) { 
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return ''
    default: 
      return state 
  }
}

export default reducer