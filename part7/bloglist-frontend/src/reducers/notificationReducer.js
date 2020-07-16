const initialState = ''

let already_timeout
export const showNotification = ( content, timeout ) => {
  return async dispatch => {
    if (already_timeout) {
      clearTimeout(already_timeout)
    }
    already_timeout = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      })
    }, timeout * 1000)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: content,
    })
  }
}

// export const hideNotification = () => {
//   return {
//     'type': 'HIDE_NOTIFICATION',
//   }
// }
const reducer = (state = initialState, action) => {
  switch (action.type) { 
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return ''
    default: 
      return state 
  }
}

export default reducer