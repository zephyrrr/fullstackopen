import React, { useState, useImperativeHandle } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const Blog = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()

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

    dispatch(updateBlog(newObject))
    .catch(error => {
      dispatch(showNotification(error.response.data.error || 'Error', 5))
    })
  }

  const deleteItem = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      .then(() => {
        dispatch(showNotification(`blog '${blog.title}' is deleted`, 5))
      })
      .catch(error => {
        dispatch(showNotification(error.response.data.error || 'Error', 5))
      })
    }
  }

  return (
    <div className="blogItem" style={blogStyle}>
      <div style={hideWhenVisible} className='blog1'>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <Button id="view-button" variant='link' onClick={toggleVisibility}>view</Button>
      </div>
      <div style={showWhenVisible} className='blog2'>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <Button id="hide-button" variant='link' onClick={toggleVisibility}>hide</Button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes}<button id="like-button" onClick={likeIt}>like</button>
        <br></br>
        {blog.user ? blog.user.name : ''}
        <br></br>
        <Button id="delete-button" variant='secondary' onClick={deleteItem}>delete</Button>
      </div>
    </div>
  )
})

Blog.displayName = 'Blog'
export default Blog
