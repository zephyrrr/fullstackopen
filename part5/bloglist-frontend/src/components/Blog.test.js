import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Edsger W. Dijkstra',
      likes: 4,
      url: 'url'
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'Edsger W. Dijkstra'
    )
    expect(component.getByText('Component testing is done with react-testing-library Edsger W. Dijkstra')).toBeVisible()
    expect(component.container.querySelector('.blog1')).not.toHaveStyle('display: none')
    expect(component.container.querySelector('.blog2')).toHaveStyle('display: none')
  })
})

describe('<Togglable />', () => {
  let component

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Edsger W. Dijkstra',
    likes: 4,
    url: 'url'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.blog1')
    ).toBeDefined()
    expect(
      component.container.querySelector('.blog2')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.blog2')
    expect(div).toHaveStyle('display: none')
    expect(div).not.toBeVisible()
    const div2 = component.container.querySelector('.blog1')
    expect(div2).toBeVisible()
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog1')
    expect(div).toHaveStyle('display: none')
    expect(div).not.toBeVisible()
    const div2 = component.container.querySelector('.blog2')
    expect(div2).toBeVisible()
  })
})

describe('like button in Blog', () => {
  test('clicking the button calls event handler once', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Edsger W. Dijkstra',
      likes: 4,
      url: 'url'
    }
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} likeBlog={mockHandler}/>
    )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})