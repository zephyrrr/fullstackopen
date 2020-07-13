const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

let loggedInToken = ''

beforeEach(async () => {
  jest.setTimeout(100000)
  //jest.useFakeTimers()

  await Blog.deleteMany({})
  await User.deleteMany({})
  const userObject = await new User(helper.initialUsers[0]).save()

  const blogObjects = helper.initialBlogs.slice(0, 2)
    .map(blog => new Blog(blog))
  blogObjects.forEach(blog => blog.user = userObject._id)

  const promiseArray = blogObjects.map(blog => blog.save())
  const blogObjectsSaved = await Promise.all(promiseArray)

  userObject.blogs = blogObjectsSaved.map(blog => blog._id)
  await userObject.save()

  // let noteObject = new Blog(helper.initialBlogs[0])
  // await noteObject.save()

  // noteObject = new Blog(helper.initialBlogs[1])
  // await noteObject.save()

  const response = await api
    .post('/api/login/')
    .send({
      username: 'root',
      password: 'salainen'
    })
  loggedInToken = 'Bearer ' + response.body.token
})

beforeAll(async () => {
})

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.url)
    expect(contents).toContain(
      'https://reactpatterns.com/'
    )
  })

  test('id attribute is defined', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('viewing a specific note', () => {
  test('a specific blog can be viewed', async () => {
    const notesAtStart = await helper.blogsInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/blogs/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    resultNote.body.user = resultNote.body.user.id.toString()
    noteToView.user = noteToView.user.toString()
    expect(resultNote.body).toEqual(noteToView)
  })
  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '123'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('a valid blog without token can not be added', async () => {
    const newItem = new Blog(helper.initialBlogs[5])

    await api
      .post('/api/blogs')
      .send(newItem)
      .expect(401)
  })

  test('a valid blog can be added', async () => {
    const newItem = new Blog(helper.initialBlogs[5])

    await api
      .post('/api/blogs')
      .set('Authorization', loggedInToken)
      .send(newItem)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)

    const contents = response.body.map(r => r.url)
    expect(contents).toContain(
      'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    )
  })

  test('blog without content is not added', async () => {
    const newNote = {
    }

    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helper.blogsInDb()

    expect(notesAtEnd).toHaveLength(2)
  })

  test('blog without like is default to 0', async () => {
    const newItem = new Blog(helper.initialBlogs[5])
    newItem.likes = undefined

    await api
      .post('/api/blogs')
      .set('Authorization', loggedInToken)
      .send(newItem)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
    expect(response.body[2].likes).toBe(0)
  })

  test('blog without url will get 400 error', async () => {
    const newItem = new Blog(helper.initialBlogs[5])
    newItem.url = undefined

    await api
      .post('/api/blogs')
      .send(newItem)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('blog without title will get 400 error', async () => {
    const newItem = new Blog(helper.initialBlogs[5])
    newItem.title = undefined

    await api
      .post('/api/blogs')
      .send(newItem)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const notesAtStart = await helper.blogsInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .set('Authorization', loggedInToken)
      .expect(204)

    const notesAtEnd = await helper.blogsInDb()

    expect(notesAtEnd).toHaveLength(
      2 - 1
    )

    const contents = notesAtEnd.map(r => r.url)

    expect(contents).not.toContain(noteToDelete.url)
  })
})

describe('update of a blog', () => {
  test('a blog likes can be updated', async () => {
    const notesAtStart = await helper.blogsInDb()
    const noteToDelete = notesAtStart[0]
    noteToDelete.likes = 1234

    await api
      .put(`/api/blogs/${noteToDelete.id}`)
      .set('Authorization', loggedInToken)
      .send(noteToDelete)
      .expect(200)

    const notesAtEnd = await helper.blogsInDb()

    expect(notesAtEnd).toHaveLength(2)

    const contents = notesAtEnd.map(r => r.likes)

    expect(contents).toContain(1234)
  })
})

describe('blog info is shown with user', () => {
  test('blogs are returned as json with users', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.user.username)
    expect(contents).toContain('root')
  })
})

describe('user info is shown with blog', () => {
  test('users are returned as json with blogs', async () => {
    const response = await api.get('/api/users')
    const contents = response.body.map(r => r.blogs[0].title)
    expect(contents).toContain('React patterns')
  })
})

afterAll(() => {
  mongoose.connection.close()
})