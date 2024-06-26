import { useState } from "react";

export const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

export const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export const Statistics = ({ good, bad, neutral, average }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={good + neutral + bad} />
        <StatisticLine
          text={"average"}
          value={average / (good + neutral + bad)}
        />
        <StatisticLine
          text={"positive"}
          value={(good * 100) / (good + neutral + bad)}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);

  const onGood = () => {
    setGood(good + 1);
    setAverage(average + 1);
  };
  const onNeutral = () => {
    setNeutral(neutral + 1);
  };
  const onBad = () => {
    setBad(bad + 1);
    setAverage(average - 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={onGood} />
      <Button text="nuetral" handleClick={onNeutral} />
      <Button text="bad" handleClick={onBad} />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} />
    </div>
  );
};

export default App;
