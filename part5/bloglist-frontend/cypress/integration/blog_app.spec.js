describe('Blog app', function() {
  beforeEach(function() {
    Cypress.config('defaultCommandTimeout', 10000)
    Cypress.config('pageLoadTimeout', 30000)
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown',  function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('cy_title')
      cy.get('#author').type('cy_author')
      cy.get('#url').type('cy_url')
      cy.get('#create-button').click()

      cy.contains('a new blog \'cy_title\' is added')
      cy.get('.info').should('contain', 'a new blog \'cy_title\' is added')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'cy_title', author: 'cy_author', url: 'cy_url' })

      cy.get('#view-button').click()
      cy.contains('likes 0')
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.createBlog({ title: 'cy_title', author: 'cy_author', url: 'cy_url' })

      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.wait(2000)

      cy.get('#main').should('not.contain', 'cy_title')
      cy.get('#main').should('not.contain', 'cy_author')
    })

    it('A blog can not be deleted by others', function() {
      cy.createBlog({ title: 'cy_title', author: 'cy_author', url: 'cy_url' })

      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai2',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)

      cy.get('#logout-button').click()
      cy.login({ username: 'mluukkai2', password: 'salainen' })

      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.wait(2000)

      cy.get('#main').should('contain', 'cy_title')
      cy.get('#main').should('contain', 'cy_author')
    })

    it('A blog is sorted by likes', function() {
      cy.createBlog({ title: 'cy_title_1', author: 'cy_author_1', url: 'cy_url_1', likes: 1 })
      cy.createBlog({ title: 'cy_title_5', author: 'cy_author_5', url: 'cy_url_5', likes: 5 })

      cy.get('.blogItem').then( (blogItem) => {
        cy.wrap(blogItem[0]).should('contain', 'cy_title_5')
        cy.wrap(blogItem[1]).should('contain', 'cy_title_1')
      })
    })
  })

  // it('front page contains random text', function() {
  //   cy.contains('wtf is this app?')
  // })
})