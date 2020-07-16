import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlog from './NewBlog'

describe('<NewBlog />', () => {
  test('renders content', () => {
    const createBlog = jest.fn()

    const component = render(
      <NewBlog createBlog={createBlog}/>
    )
    const author = component.container.querySelector('#author')
    fireEvent.change(author, {
      target: { value: 'testing of forms: Author' }
    })
    const title = component.container.querySelector('#title')
    fireEvent.change(title, {
      target: { value: 'testing of forms: Title' }
    })
    const url = component.container.querySelector('#url')
    fireEvent.change(url, {
      target: { value: 'testing of forms: Url' }
    })
    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('testing of forms: Author' )
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms: Title' )
    expect(createBlog.mock.calls[0][0].url).toBe('testing of forms: Url' )
  })
})