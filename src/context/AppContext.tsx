// import React from 'react'
// import ThemeContext from './theme-context'

import React from "react";
import { OrientationHelper } from "../domain/Orientation";
import { VibrationHandler } from "../domain/Vibrate";

// const Person = (props: any) => {
//   return (
//     <ThemeContext.Consumer>
//       {(contexta: any) =>
//       <p className={context}>...</p>}
//     </ThemeContext.Consumer>
//   )
// }

export interface IAppContext {
  deviceOrientation?: DeviceOrientationEvent;
  vibrationHelper: VibrationHandler;
  orientationHelper: OrientationHelper;
}
export class AppContext {
  constructor(
    public orientationHelper = new OrientationHelper(),
    public vibrationHelper = new VibrationHandler(orientationHelper),
    public deviceOrientation?: DeviceOrientationEvent
  ) {}
}

export const appContext = React.createContext<IAppContext>(new AppContext());
