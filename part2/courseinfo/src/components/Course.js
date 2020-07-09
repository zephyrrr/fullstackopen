import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
  
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}
const Content  = (props) => {
  return (
    <div>
      {props.parts.map((part) => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}


const Total  = (props) => {
  const total = 
    props.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
      <h2>total of {total} exercises</h2>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course