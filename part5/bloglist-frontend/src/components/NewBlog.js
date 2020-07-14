import React, { useState }  from 'react'

const NewBlogForm = ({ createBlog }) => {
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

    createBlog(newObject)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={newBlog}>
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
        <button id="create-button" type="submit">create</button>
      </div>
    </form>
  )
}

export default NewBlogForm