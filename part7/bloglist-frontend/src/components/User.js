import React from 'react'
//import { useDispatch } from 'react-redux'

const User = ( { user }) => {
  if (!user) {
    return (
      <div></div>
    )
  }
  return (
    <div>
      <h2>{ user.name }</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => 
          <li>{ blog.title }</li>
        )}
      </ul>
    </div>
  )
}

User.displayName = 'User'
export default User
