import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { VibrationHandler } from "./domain/Vibrate";
import { OrientationHelper } from "./domain/Orientation";
import { IAppState, AppState, ViewState } from "./App.model";
import { getDisplayBasedOnState } from "./AppViewUtil";

function App() {
  let [displayText, setDisplayText] = useState("");
  let [appState, setAppState] = useState<AppState>(new AppState());
  let display = getDisplayBasedOnState(appState);
  let orientationHelper = new OrientationHelper();

  //Toggle fail screen on fails
  const toggleFailScreen = (showFailScreen: boolean) => {
    if (showFailScreen) {
      setAppState({
        viewState: ViewState.Fail,
      });
    } else {
      setAppState({
        viewState: ViewState.Balancing,
      });
    }
  };
  let handleOrientationChange = (event: DeviceOrientationEvent) => {
    vibrationHelper.checkFailStat()
  };
  let vibrationHelper = new VibrationHandler(
    orientationHelper,
    toggleFailScreen,
    setDisplayText
  );
  //button click handlers
  const handleStartClick = () => {
    orientationHelper.setHandler(handleOrientationChange);
    setAppState({
      viewState: ViewState.Balancing,
    });
  };
  const handleStopClick = () => {
    orientationHelper.removeHandler();
    setDisplayText("")
    setAppState({
      viewState: ViewState.StartScreen,
    });
  };

  return (
    <div className="App">
      {display}
      <div className="button-container">
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handleStopClick}>Stop</button>
      </div>
      <div className="display-text">{displayText}</div>
    </div>
  );
}

export default App;
