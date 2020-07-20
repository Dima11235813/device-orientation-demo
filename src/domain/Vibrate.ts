import { OrientationHelper } from "./Orientation";

export class VibrationHandler {
    public static vibrateDuration = 1000
    public static changeThreshold = .1
    public static debounceTime = 3000
    public displayText = ""
    vibrateDurationInterval: NodeJS.Timeout | undefined;
    lastEventFire: number | undefined
    currentEventFire: number | undefined
    constructor(
        public orientationHelper: OrientationHelper, public toggleFailScreen: Function,
        public setDisplayTextCb: Function) {
        this.lastEventFire = Date.now()
        this.currentEventFire = undefined
    }
    handleChange = () => {
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
    handleOrientationChange = () => {
        this.setDisplayTextCb(`ERROR ${this.orientationHelper.calcDiff() * 100}%`)
        if (this.orientationHelper.percentChange > VibrationHandler.changeThreshold) {
            this.vibrateOnce()
        }
    }


    // Assumes a number value is given
    vibrateOnce(duration: number = 250, interval: number = 1000) {
        setTimeout(() => {
            this.toggleFailScreen(false)
            navigator.vibrate(duration);
            setTimeout(() => {
                this.toggleFailScreen(true)
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
            this.toggleFailScreen(false)
        }, (duration + this.vibrateSpacer) * 3);
    }
}