import React, { useReducer, useEffect } from "react";
import "./App.css";

const initialState = {
  count: 23,
  hPercent: 100,
  vPercent: 1
};

const reducer = (state, action) => {
  let { count, hPercent, vPercent } = action;
  switch (action.type) {
    case "count":
      return { ...state, count };
    case "hPercent":
      return { ...state, hPercent };
    case "vPercent":
      return { ...state, vPercent };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleCountChange = event => {
    dispatch({ type: "count", count: Number(event.target.value) });
  };
  const handleHchange = event => {
    dispatch({ type: "hPercent", hPercent: Number(event.target.value) });
  };
  const handleVchange = event => {
    dispatch({ type: "vPercent", vPercent: Number(event.target.value) });
  };

  const { count, hPercent, vPercent } = state;

  useEffect(() => {
    let match;
    const hash = window.location.hash;
    match = hash.match(/count=(\d+)/);
    if (match) dispatch({ type: "count", count: Number(match[1]) });
    match = hash.match(/hPercent=(\d+)/);
    if (match) dispatch({ type: "hPercent", hPercent: Number(match[1]) });
    match = hash.match(/vPercent=(\d+)/);
    if (match) dispatch({ type: "vPercent", vPercent: Number(match[1]) });
  }, []);

  useEffect(() => {
    window.location.hash = `#count=${count}&hPercent=${hPercent}&vPercent=${vPercent}`;
  }, [count, hPercent, vPercent]);

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
      max={360}
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
    min={1}
    max={100}
    step={1}
    onChange={handleVchange}
  />
);
