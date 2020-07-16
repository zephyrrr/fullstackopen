import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const del = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${ baseUrl }/${id}`, config)
  return request.then(response => response.data)
}

const getComments = (id) => {
  const request = axios.get(`${ baseUrl }/${id}/comments`)
  return request.then(response => response.data)
}

const addComment = (id, newObject) => {
  const request = axios.post(`${ baseUrl }/${id}/comments`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, del, getComments, addComment, setToken }