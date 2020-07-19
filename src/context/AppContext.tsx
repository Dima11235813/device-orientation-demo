// import React from 'react'
// import ThemeContext from './theme-context'



import React from "react";

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
}
export class AppContext {
  constructor(public deviceOrientation: DeviceOrientationEvent) {}
}

const appContext = React.createContext({});
