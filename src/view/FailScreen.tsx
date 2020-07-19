import React from "react";

import { AppState, ViewState, IAppState } from "../App.model";

import "./styles.css"

export const FailScreen = () => {

  if (true) {
    //appState.viewState ===  ViewState.SettingOrientation) {
    return <div className="fail">
      <h1>Fail, try again.</h1>
    </div>;
  } else {
    return null;
  }
};
