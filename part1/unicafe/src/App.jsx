import { useState } from "react";

export const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGood = () => {
    setGood(good + 1);
  };
  const onNeutral = () => {
    setNeutral(neutral + 1);
  };
  const onBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={onGood} />
      <Button text="nuetral" handleClick={onNeutral} />
      <Button text="bad" handleClick={onBad} />

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;
