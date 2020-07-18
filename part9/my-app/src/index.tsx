import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartBaseOneThree extends CoursePartBase {
    description: string;
  }

  interface CoursePartOne extends CoursePartBaseOneThree {
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartBaseOneThree {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  interface CoursePartFour extends CoursePartBaseOneThree {
    name: "CoursePartFour";
    anotherProperty: string;
  }
  
  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
  const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
    <div>
      {
        courseParts.map( part => <Part key={part.name} part={part}></Part>)
      }
    </div>
  );
  
  const renderSwitch = (part: CoursePart) => {
    switch (part.name) {
      case 'Fundamentals':
        return (<p>
          {part.name} {part.exerciseCount} {part.description}
        </p>)
      case 'Using props to pass data':
        return (<p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>)
      case 'Deeper type usage':
        return (<p>
           {part.name} {part.exerciseCount} {part.description} { part.exerciseSubmissionLink }
        </p>)
      case 'CoursePartFour':
        return (<p>
          {part.name} {part.exerciseCount} {part.description} { part.anotherProperty }
        </p>)
      default:
        assertNever(part);
    }
  }
  const Part: React.FC<{ part: CoursePart }> = ({ part }) => (
    <div>
    {
      renderSwitch(part)
    }
    </div>
  );

  const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "CoursePartFour",
      exerciseCount: 16,
      description: "Confusing description fsdfsd",
      anotherProperty: "anotherProperty"
    }
  ];

  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total courseParts={courseParts}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

