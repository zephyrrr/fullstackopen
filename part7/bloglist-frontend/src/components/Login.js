import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import  { useField } from '../hooks'
import loginService from '../services/login'
import { login } from '../reducers/loginReducer'
import { showNotification } from '../reducers/notificationReducer'

const LoginForm = ({ blogService }) => {
  const dispatch = useDispatch()

  const inputUsername = useField('text') 
  const inputPassword = useField('text') 

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        'username': inputUsername.value, 
        'password': inputPassword.value,
      })

      dispatch(login(user))
      .catch(error => {
        dispatch(showNotification(error.response.data.error || 'Error', 5))
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      inputUsername.reset() 
      inputPassword.reset() 
    } catch (exception) {
      dispatch(showNotification('Wrong username or password', 5))
    }
  }

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            {...inputUsername}
            reset=''
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            {...inputPassword}
            reset=''
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>

        {/* <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id="login-button" variant="primary" type="submit">login</Button> */}
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  blogService: PropTypes.object.isRequired,
}

export default LoginForm