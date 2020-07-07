import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics  = ({statistics_names, statistics_values}) => {
  const good = statistics_values[0]
  const neutral = statistics_values[1]
  const bad = statistics_values[2]
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  
  const average = (good - bad) / all
  const positive = good / all * 100
  
  return (
    <table>
      <tbody>
        <Statistic text={statistics_names[0]} value={statistics_values[0]}/>
        <Statistic text={statistics_names[1]} value={statistics_values[1]}/>
        <Statistic text={statistics_names[2]} value={statistics_values[2]}/>
        <Statistic text={statistics_names[3]} value={all}/>
        <Statistic text={statistics_names[4]} value={average}/>
        <Statistic text={statistics_names[5]} value={positive + '%'}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const title = 'give feedback'
  const statistics_title = 'statistics'
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const statistics_names = ['good', 'neutral', 'bad', "all", "average", "positive"]
  return (
    <div>
      <Header title={title} /> 
      <Button handleClick={() => setGood(good + 1)} text={statistics_names[0]} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={statistics_names[1]} />
      <Button handleClick={() => setBad(bad + 1)} text={statistics_names[2]} />
      <Header title={statistics_title} /> 
      <Statistics statistics_names={statistics_names} statistics_values={[good, neutral, bad]}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)