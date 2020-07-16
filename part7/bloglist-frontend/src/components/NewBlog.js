import React, { useState }  from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = () => {
  const dispatch = useDispatch()

  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const newBlog = (event) => {
    event.preventDefault()

    const newObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    dispatch(createBlog(newObject))
    .then(() => {
      dispatch(showNotification(`a new blog '${newObject.title}' is added`, 5))
    })
    .catch(error => {
      dispatch(showNotification(error.response.data.error || 'Error', 5))
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <Form onSubmit={newBlog}>
      <div>
      title: <input
          id='title'
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)} />
      </div>
      <div>
      author: <input
          id='author'
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)} />
      </div>
      <div>
      url: <input
          id='url'
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)} />
      </div>
      <div>
        <Button id="create-button" variant="primary" type="submit">create</Button>
      </div>
    </Form>
  )
}

export default NewBlogForm