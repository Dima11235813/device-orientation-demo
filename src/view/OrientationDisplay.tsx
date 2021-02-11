// import React from "react";
// import { VibrationHandler } from "../domain/Vibrate";
// import { AppState, ViewState } from "../App.model";

// export const OrientationDisplay = (appState: AppState) => {
//   if (appState.viewState === ViewState.OrientationDisplay) {
//     return <div>Orientation Display</div>;
//   } else {
//     return null;
//   }
// };

import React from "react";

// import { AppState, ViewState, IAppState } from "../App.model";

import "./styles.css"

export const HoldStill = () => {

  if (true) {
    //appState.viewState ===  ViewState.SettingOrientation) {
    return <div className="hold-still">
      <h1>Hold Still</h1>
    </div>;
  } else {
    return null;
  }
};
