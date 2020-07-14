import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef((props, ref) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const blog = props.blog

  const likeIt = (event) => {
    event.preventDefault()

    const newObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }
    if (props.likeBlog) {
      props.likeBlog(newObject)
    }
  }

  const deleteItem = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      if (props.deleteBlog) {
        props.deleteBlog(blog.id)
      }
    }
  }

  return (
    <div className="blogItem" style={blogStyle}>
      <div style={hideWhenVisible} className='blog1'>
        {blog.title} {blog.author}
        <button id="view-button" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blog2'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes}<button id="like-button" onClick={likeIt}>like</button>
        <br></br>
        {blog.user ? blog.user.name : ''}
        <br></br>
        <button id="delete-button" onClick={deleteItem}>delete</button>
      </div>
    </div>
  )
})

Blog.displayName = 'Blog'
export default Blog
