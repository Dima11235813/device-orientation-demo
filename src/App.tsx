import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { VibrationHandler } from "./domain/Vibrate";
import { OrientationHelper } from "./domain/Orientation";
import { IAppState, AppState, ViewState } from "./App.model";
import { getDisplayBasedOnState } from "./AppViewUtil";

function App() {
  let orientationEventType = "deviceorientation";
  const handleStartClick = () => {
    vibrationHelper.startPersistentVibrate();
    setAppState({
      viewState: ViewState.Balancing,
    });
  };

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
  const handleStopClick = () => {
    vibrationHelper.stopVibrate();
    setAppState({
      viewState: ViewState.StartScreen,
    });
  };
  const handleClick = () => {
    let event = createEvent();

    event.initEvent(orientationEventType, true, true);
    // console.log(`Emitting event ${JSON.stringify(event)}`);
    window.dispatchEvent(event);
    setAppState({
      viewState: ViewState.Balancing,
    });
  };
  const createEvent = () => {
    return window.document.createEvent("HTMLEvents");
  };
  let [appState, setAppState] = useState<AppState>(new AppState());
  let [displayText, setDisplayText] = useState("")
  let display = getDisplayBasedOnState(appState);
  let orientationHelper = new OrientationHelper();
  let vibrationHelper = new VibrationHandler(
    orientationHelper,
    toggleFailScreen,
    setDisplayText
  );
  return (
    <div className="App">
      {display}
      <button onClick={handleClick}>Simulate Orientation Event</button>
      <div className="button-container">
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handleStopClick}>Stop</button>
      </div>
      <div>{displayText}</div>
    </div>
  );
}

export default App;
