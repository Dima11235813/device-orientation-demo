import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { isAbsolute } from "path";

export interface ExtendedDeviceOrientationEvent extends DeviceOrientationEvent {

}

export class OrientationHelper {
    public percentChange: any;
    shouldVibrate() {

    }
    public deviceOrientation?: ExtendedDeviceOrientationEvent
    public lastDeviceOrientation?: ExtendedDeviceOrientationEvent
    constructor(
    ) {


        this.percentChange = 0
        window.addEventListener(
            "deviceorientation",
            (event: any) => {
                this.handleOrientation(event)
            },
            true
        );
    }
    calcDiff = () => {
        if (this.lastDeviceOrientation && this.deviceOrientation) {
            const {
                absolute,
                alpha,
                beta,
                gamma
                // isAbsolute,
                // alphaisAbsolute,
                // betaisAbsolute,
                // gammaisAbsolute
            } = this!.lastDeviceOrientation
            const {
                absolute: new_absolute,
                alpha: new_alpha,
                beta: new_beta,
                gamma: new_gamma
            } = this!.deviceOrientation
            let normalizedAlpha = alpha ? Math.abs(alpha) : 0
            let new_normalizedAlpha = new_alpha ? Math.abs(new_alpha) : 0
            let normalizedBeta = beta ? Math.abs(beta) : 0
            let new_normalizedBeta = new_beta ? Math.abs(new_beta) : 0
            let normalizedGamma = gamma ? Math.abs(gamma) : 0
            let new_normalizedGamma = new_gamma ? Math.abs(new_gamma) : 0
            this.percentChange = (
                (Math.abs(normalizedAlpha - new_normalizedAlpha)) +
                (Math.abs(normalizedBeta - new_normalizedBeta)) +
                (Math.abs(normalizedGamma - new_normalizedGamma))
            )
            console.log(`Percent change ${this.percentChange}`)
        }
    }
    public handleOrientation =
        (
            event: DeviceOrientationEvent
        ): any => {
            // arg0: string, handleOrientation: any, arg2: boolean
            this.lastDeviceOrientation = this.deviceOrientation
            this.deviceOrientation = event
            console.log(`Updating device orientation`)
            console.log(event)
            // console.log(`Orientation change event fired 
            //             {arg0}
            //             ${arg0}
            //             {arg2}
            //             ${arg2}
            //             {handleOrientation}
            //             ${handleOrientation}
            //             `)
        }
}