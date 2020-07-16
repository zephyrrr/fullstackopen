import React from 'react'
import { useSelector} from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom"

const UserList = (props) => {
  //const dispatch = useDispatch()

  const users = useSelector(state => {
    return state.users
  })

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
          {users.map(u =>
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>
                  { u.name }
                </Link>
              </td>
              <td>
                  { u.blogs.length }
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
