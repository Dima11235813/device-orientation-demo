import React, { useState, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";

import { ViewState } from "./App.model";
import { getDisplayBasedOnState } from "./AppViewUtil";
import {  appContext } from "./context/AppContext";

function App() {
  let context = useContext(appContext);
  let [view, setView] = useState(ViewState.StartScreen);

  //Toggle fail screen on fails
let handleOrientationChange = (event: DeviceOrientationEvent) => {
    context.vibrationHelper.handleChange(setView);
  };
  //button click handlersF
  const handleStartClick = () => {
    context.orientationHelper.setHandler(handleOrientationChange);
    setView(ViewState.Balancing);
  };
  const handleStopClick = () => {
    context.orientationHelper.removeHandler();
    setView(ViewState.StartScreen);
  };

  return (
    <div className="App">
      {getDisplayBasedOnState(view)}
      <div className="button-container">
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handleStopClick}>Stop</button>
      </div>
      <div className="display-text">
        {context.vibrationHelper.getDisplayText()}
      </div>
    </div>
  );
}

export default App;
