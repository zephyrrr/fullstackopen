import React from 'react'
import { useSelector} from 'react-redux'
import { Table } from 'react-bootstrap'
import Blog from './Blog'

const BlogList = (props) => {
  //const dispatch = useDispatch()

  const blogs = useSelector(state => {
    return state.blogs
  })

  // const onClickVote = (anecdote) => {
  //   //console.log('vote', id)
  //   props.vote(anecdote)
  //   props.showNotification(`you voted '${anecdote.content}'`, 5)
  //   //dispatch(vote(anecdote))
  //   //dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
  //   //setTimeout( () => dispatch(hideNotification()), 5000)
  // }

  return (
    <div>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                  <Blog key={blog.id} blog={blog}/>
              </td>
              <td>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
