const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


const mongoose = require('mongoose')
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info(`connected to MongoDB: ${config.MONGODB_URI}`)
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// const morgan = require('morgan')
// morgan.token('postdata', function (req, ignoreres) { return JSON.stringify(req.body) })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app