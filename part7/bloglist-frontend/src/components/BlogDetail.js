import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import  { useField } from '../hooks'

const BlogDetail = ( { blog }) => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   if (blog) {
  //     dispatch(initializeComments(blog.id)) 
  //   }
  // },[dispatch])

  const nameInput = useField('text')

  const onClickLike = (event) => {
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

  const onClickAddComment = (event) => {
    event.preventDefault()

    const newObject = {
      content: nameInput.value
    }

    dispatch(addComment(blog.id, newObject))
    .catch(error => {
      dispatch(showNotification(error.response.data.error || 'Error', 5))
    })
  }

  if (!blog) {
    return (
      <div></div>
    )
  }
  return (
    <div>
      <h2>{ blog.title }</h2>
      <a href={blog.url}>{blog.url}</a>
      <br></br>
      {blog.likes} likes <button id="like-button" onClick={onClickLike}>like</button>
      <br></br>
      added by {blog.author}
      <h6>Comments</h6>
      <input {...nameInput} reset='' /> 
      <button id="add-comment-button" onClick={onClickAddComment}>add comment</button>
      <ul>
        {blog.comments ? blog.comments.map(comment => 
          <li>{ comment.content }</li>) : ''
        }
      </ul>
    </div>
  )
}

BlogDetail.displayName = 'BlogDetail'
export default BlogDetail
