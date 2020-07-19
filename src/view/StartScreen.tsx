import React from "react";

import { AppState, ViewState, IAppState } from "../App.model";

import "./styles.css"

export const StartScreen = () => {

  if (true) {
    //appState.viewState ===  ViewState.SettingOrientation) {
    return <div className="ready">
      <h1>Ready?</h1>
    </div>;
  } else {
    return null;
  }
};
