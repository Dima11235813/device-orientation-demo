import { OrientationHelper } from "./Orientation";

export class VibrationHandler {
    public static vibrateDuration = 1000
    public static changeThreshold = .03
    public displayText = ""
    vibrateDurationInterval: NodeJS.Timeout | undefined;
    constructor(
        public orientationHelper: OrientationHelper, public toggleFailScreen: Function, 
        public setDisplayTextCb: Function) {
    }
    checkFailStat = () => {
        this.setDisplayTextCb(`ERROR ${this.orientationHelper.calcDiff() * 100}%`)
        if (this.orientationHelper.percentChange > VibrationHandler.changeThreshold) {
            this.vibrateThreeTimes()
            this.toggleFailScreen(true)

        } else {
            this.toggleFailScreen(false)
        }
    }

    // Assumes a number value is given
    vibrateOnce(duration: number = 250, interval: number = 1000) {
        setTimeout(() => {
            navigator.vibrate(duration);
        }, interval);
    }
    vibrateSpacer = 200
    vibrateThreeTimes(duration: number = 250) {
        setTimeout(() => {
            navigator.vibrate(duration);
        }, duration + this.vibrateSpacer);
        setTimeout(() => {
            navigator.vibrate(duration);
        }, (duration + this.vibrateSpacer) * 2);
        setTimeout(() => {
            navigator.vibrate(duration);
        }, (duration + this.vibrateSpacer) * 3);
    }
}