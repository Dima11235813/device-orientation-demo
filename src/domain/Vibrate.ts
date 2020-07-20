import { OrientationHelper } from "./Orientation";
import { ViewState } from "../App.model";

export class VibrationHandler {
    public static vibrateDuration = 1000
    public static changeThreshold = .1
    public static debounceTime = 3000
    public displayText = ""
    vibrateDurationInterval: NodeJS.Timeout | undefined;
    lastEventFire: number | undefined
    currentEventFire: number | undefined
    setViewCb?: Function;
    constructor(
        public orientationHelper: OrientationHelper) {
        this.lastEventFire = Date.now()
        this.currentEventFire = undefined
    }
    handleChange = (setView: Function) => {
        this.setViewCb = setView
        let diff = Math.abs(this.lastEventFire ?? 0 - (this.currentEventFire ?? 0))
        if (diff > VibrationHandler.debounceTime) {
            this.handleOrientationChange()
            this.lastEventFire = Date.now()
            this.currentEventFire = Date.now()
        } else {
            this.setTime()
        }

    }
    setTime = () => {
        if (this.currentEventFire) {
            this.lastEventFire = this.currentEventFire
            this.currentEventFire = Date.now()
        } else {
            this.currentEventFire = Date.now()
        }

    }
    getDisplayText = () => `ERROR ${this.orientationHelper.calcDiff() * 100}%`
    handleOrientationChange = () => {
        if (this.orientationHelper.percentChange > VibrationHandler.changeThreshold) {
            this.vibrateOnce()
        }
    }


    // Assumes a number value is given
    vibrateOnce(duration: number = 250, interval: number = 1000) {
        setTimeout(() => {
            navigator.vibrate(duration);
            setTimeout(() => {
                if(this.setViewCb){
                    this.setViewCb(ViewState.Balancing)
                }
            }, 1000)
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