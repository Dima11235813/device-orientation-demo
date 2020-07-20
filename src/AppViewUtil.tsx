import { AppState, ViewState } from "./App.model";
import React, { ReactComponentElement } from "react";
import { HoldStill } from "./view/OrientationDisplay";
import { StartScreen } from "./view/StartScreen";
import { FailScreen } from "./view/FailScreen";

export const getDisplayBasedOnState = (
  viewState: ViewState
): ReactComponentElement<any> => {
  switch (viewState) {
    case ViewState.Balancing:
      return <HoldStill />;
    case ViewState.StartScreen:
      return <StartScreen />;
    case ViewState.Fail:
      return <FailScreen />;
    default:
      return <HoldStill />;
  }
};
