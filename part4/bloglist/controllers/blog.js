const bloglistRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

bloglistRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))

  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

bloglistRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
  // Blog.findById(request.params.id)
  //   .then(blog => {
  //     if (blog) {
  //       response.json(blog)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

bloglistRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }
  //const user = await User.findById(request.body.userId)
  //const token = getTokenFrom(request)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  blog.user = user._id

  const savedNote = await blog.save()
  user.blogs = user.blogs.concat(savedNote._id)
  response.json(savedNote.toJSON())

  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})




bloglistRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if ( blog.user.toString() === user._id.toString() ) {
    blog.delete()
    response.status(204).end()
  } else {
    response.status(401).end()
  }

  // await Blog.findByIdAndRemove(request.params.id)
  // response.status(204).end()

  // Blog.findByIdAndRemove(request.params.id)
  //   .then(result => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
})

// personsRouter.post('/', (request, response, next) => {
//   const body = request.body

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: 'name or number missing'
//     })
//   }
//   // if (persons.map(person => person.name).indexOf(body.name) >= 0) {
//   //     return response.status(400).json({
//   //         error: 'name must be unique'
//   //     })
//   // }

//   const person = new Person({
//     name: body.name,
//     number: body.number,
//     //id: generateId(),
//   })

//   //persons = persons.concat(person)
//   person.save()
//     .then(savedPerson => savedPerson.toJSON())
//     .then(savedAndFormattedPerson => {
//       response.json(savedAndFormattedPerson)
//     })
//     .catch(error => next(error))
// })

bloglistRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
  response.json(updatedBlog.toJSON())

  // Blog.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
  //   .then(updatedPerson => {
  //     response.json(updatedPerson)
  //   })
  //   .catch(error => next(error))
})

module.exports = bloglistRouter