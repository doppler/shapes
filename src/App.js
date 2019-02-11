import React, { useReducer, useEffect } from "react";
import "./App.css";

// Initial state of the variables that control the number of radials,
// the horizontal "squeeze" and the vertical cutoff.
const initialState = {
  count: 23,
  hPercent: 100,
  vPercent: 1
};

// The reducer changes the state based on named actions.
// An action looks like `{type: "count", count: 23}'
const reducer = (state, action) => {
  // pull the three possible variables out of `action' to decrease
  // verbosity in the rest of the function
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
  // Grab the app state and dispatcher from React.useReducer after we
  // pass it our reducer function and the app's initial state (defined above).
  const [state, dispatch] = useReducer(reducer, initialState);

  // We'll pass these three functions to our slider controls. When the
  // slider controls change their values, they'll call these functions,
  // which will dispatch change requests to our reducer function.
  const handleCountChange = event => {
    dispatch({ type: "count", count: Number(event.target.value) });
  };
  const handleHchange = event => {
    dispatch({ type: "hPercent", hPercent: Number(event.target.value) });
  };
  const handleVchange = event => {
    dispatch({ type: "vPercent", vPercent: Number(event.target.value) });
  };

  // Pull the discrete variables from our state to decrease verbosity in
  // the remainder of the App function.
  const { count, hPercent, vPercent } = state;

  // An Effect is a side effect, or something that changes a value outside of
  // the function or changes data in the function from the outside.
  // Here, we're looking at the part of the url after the #, if there is one,
  // and finding digits after "count=", "hPercent=" or "vPercent=", and
  // using those values to change the corresponding state variables.
  //
  // This effect only runs once, when the app is first rendered.
  useEffect(() => {
    let match;
    const hash = window.location.hash;
    match = hash.match(/count=(\d+)/);
    if (match) dispatch({ type: "count", count: Number(match[1]) });
    match = hash.match(/hPercent=(\d+)/);
    if (match) dispatch({ type: "hPercent", hPercent: Number(match[1]) });
    match = hash.match(/vPercent=(\d+)/);
    if (match) dispatch({ type: "vPercent", vPercent: Number(match[1]) });
    // get rid of stupid facebook tracking param -- thanks Karl Tiedt!
    window.location.search = "";
  }, []);

  // In this Effect, we're setting the URL hash (the part after the #) with
  // the values from the state variables.
  //
  // This effect is run anytime count, hPercent or vPercent change.
  useEffect(() => {
    window.location.hash = `#count=${count}&hPercent=${hPercent}&vPercent=${vPercent}`;
  }, [count, hPercent, vPercent]);

  // Finally, we render the app. The first three elements are defined below.
  // We're passing them their respective state variables and the handler
  // function (defined above) to manipulate that variable.
  //
  // For each value of 0...count, we render a Square, setting a variable
  // "angle" based on that value. We also pass it the hPercent and vPercent
  // values.
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
      <ViewSourceLink />
    </div>
  );
};

// App gets exported, and rendered by index.js
export default App;

const Square = ({ angle, vPercent, hPercent }) => {
  // Everything in HTML is rectangular, and this particular div's width and
  // height are set in App.css so that it's a square. However, we're using
  // CSS's clip-path property to "mask" the background, so to speak, using
  // the hPercent and vPercent values.
  //
  // We rotate the trimmed square and set its background color from the value
  // of "angle".
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

// These are the slider controls. They recieve their values and change
// handler functions and use them to set and change their respective
// app state values.
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
const ViewSourceLink = () => (
  <a
    href="https://github.com/doppler/shapes/blob/master/src/App.js"
    target="_blank"
  >
    View Source
  </a>
);
