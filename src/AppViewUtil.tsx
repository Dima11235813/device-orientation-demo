import { AppState, ViewState } from "./App.model";
import React, { ReactComponentElement } from "react";
import { HoldStill } from "./view/OrientationDisplay";
import { StartScreen } from "./view/StartScreen";

export const getDisplayBasedOnState = (
  appState: AppState
): ReactComponentElement<any> => {
  switch (appState.viewState) {
    case ViewState.Balancing:
      return <HoldStill />;
    case ViewState.StartScreen:
      return <StartScreen />;
    default:
      return <HoldStill />;
  }
};
