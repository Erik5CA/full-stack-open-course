const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const sum = parts.reduce((acc, val) => (acc = acc + val.exercises), 0);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total sum={sum} />
    </>
  );
};

export const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
