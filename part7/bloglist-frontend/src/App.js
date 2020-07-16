import React, { useState, useEffect, useRef  } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlog'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import './App.css'
import { Nav, Navbar, NavLink } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom"
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import BlogDetail from './components/BlogDetail'
import User from './components/User'
import { login, logout } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs()) 
    dispatch(initializeUsers()) 
  },[dispatch]) 

  const newBlogFormRef = useRef()

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(logout)
    blogService.setToken(null)
  }

  const user = useSelector(state => {
    return state.login
  })
  console.log('user', user)

  const padding = {
    paddingRight: 5
  }

  const blogs = useSelector(state => state.blogs )
  const match1 = useRouteMatch('/blogs/:id')
  const selectBlog = match1 
    ? blogs.find(n => n.id.toString() === match1.params.id.toString())
    : null

  const users = useSelector(state => state.users )
  const match2 = useRouteMatch('/users/:id')
  const selectUser = match2 
    ? users.find(n => n.id.toString() === match2.params.id.toString())
    : null

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm blogService={blogService}></LoginForm>
      </div>
    )
  }

  return (
    <div id='main' className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <div><em>{user.name} logged in</em><button id="logout-button" onClick={handleLogout}>logout</button></div>
                : <Link to="/login">login</Link>
              }
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <h2>blogs</h2>
      <Notification />

      <Switch>
        <Route path="/blogs/:id">
          <BlogDetail blog={selectBlog} />
        </Route>
        <Route path="/blogs">
          <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
            <h2>create new</h2>
            <NewBlogForm></NewBlogForm>
          </Togglable>

          <BlogList></BlogList>
        </Route>
        <Route path="/users/:id">
          <User user={selectUser} />
        </Route>
        <Route path="/users">
          <UserList></UserList>
        </Route>
        <Route path="/">
          <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
            <h2>create new</h2>
            <NewBlogForm></NewBlogForm>
          </Togglable>

          <BlogList></BlogList>
        </Route>
      </Switch> 

      <br></br>
      
      
    </div>
  )
}

export default App