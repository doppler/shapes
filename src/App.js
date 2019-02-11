import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(5);
  const [hPercent, sethPercent] = useState(34);
  const [vPercent, setvPercent] = useState(50);
  const handleCountChange = event => setCount(Number(event.target.value));
  const handleHchange = event => sethPercent(Number(event.target.value));
  const handleVchange = event => setvPercent(Number(event.target.value));
  return (
    <div className="App">
      <CountControl {...{ count, handleCountChange }} />
      <Hcontrol {...{ hPercent, handleHchange }} />
      <Vcontrol {...{ vPercent, handleVchange }} />
      <div className="container">
        {Array.from(Array(count)).map((_, i) => (
          <Square
            key={i}
            angle={(360 / count) * i}
            {...{ hPercent, vPercent }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

const Square = ({ angle, vPercent, hPercent }) => {
  console.log(
    `polygon(50% 0, ${hPercent}% ${vPercent}%, ${100 - hPercent}% ${vPercent}%)`
  );
  return (
    <div
      className="Square"
      style={{
        transform: `rotate(${angle}deg)`,
        WebkitClipPath: `polygon(50% 0, ${hPercent}% ${vPercent}%, ${100 -
          hPercent}% ${vPercent}%)`,
        background: `hsla(${angle}, 100%, 50%, 0.5)`
      }}
    />
  );
};
const CountControl = ({ count, handleCountChange }) => {
  return (
    <input
      type="range"
      value={count}
      min={1}
      max={90}
      step={1}
      onChange={handleCountChange}
    />
  );
};
const Hcontrol = ({ hPercent, handleHchange }) => (
  <input
    type="range"
    value={hPercent}
    min={0}
    max={100}
    step={1}
    onChange={handleHchange}
  />
);
const Vcontrol = ({ vPercent, handleVchange }) => (
  <input
    type="range"
    value={vPercent}
    min={0}
    max={100}
    step={1}
    onChange={handleVchange}
  />
);
