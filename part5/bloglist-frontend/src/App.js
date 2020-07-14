import React, { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlog'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        let v1 = parseInt(a.likes)
        let v2 = parseInt(b.likes)
        return v2 - v1
        // let keyA = a.likes
        // let keyB = b.lieks
        // if (keyA < keyB) return 1
        // if (keyA > keyB) return -1
        // return 0;
      })
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const createBlog = (newObject) => {
    blogService.create(newObject)
      .then(newPerson => {
        setBlogs(blogs.concat(newPerson))
        setInfoMessage(`a new blog '${newPerson.title}' is added`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
        newBlogFormRef.current.toggleVisibility()
      })
      .catch(error => {
        // this is the way to access the error message
        setErrorMessage(error.response.data.error || 'Error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const likeBlog = (newObject) => {
    blogService.update(newObject.id, newObject)
      .then(newPerson => {
        setBlogs(blogs.map(blog => blog.id === newPerson.id ? newPerson : blog))
      })
      .catch(error => {
        setErrorMessage(error.response.data.error || 'Error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = (blogId) => {
    blogService.del(blogId)
      .then( () => {
        setBlogs(blogs.filter(n => n.id !== blogId))
      })
      .catch(error => {
        setErrorMessage(error.response.data.error || 'Error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={infoMessage} className="info"/>
        <Notification message={errorMessage} className="error"/>
        <LoginForm blogService={blogService} setUser={setUser} setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage}></LoginForm>
      </div>
    )
  }

  const newBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
      <h2>create new</h2>
      <NewBlogForm createBlog={createBlog}></NewBlogForm>
    </Togglable>
  )
  return (
    <div id='main'>
      <h2>blogs</h2>
      <Notification message={infoMessage} className="info"/>
      <Notification message={errorMessage} className="error"/>

      <p>
        {user.name} logged in
        <button id="logout-button" onClick={handleLogout}>logout</button>
      </p>

      <br></br>
      {newBlogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App