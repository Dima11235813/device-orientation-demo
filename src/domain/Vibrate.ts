import { OrientationHelper } from "./Orientation";

export class VibrationHandler {
    public static vibrateDuration = 1000
    public static changeThreshold = .05
    vibrateDurationInterval: NodeJS.Timeout | undefined;
    constructor(public orientationHelper: OrientationHelper) {
    }
    changeTolerance = .50
    startVibrate = (duration: number | number[]) => {
        this.orientationHelper.calcDiff()
        if (this.orientationHelper.percentChange > VibrationHandler.changeThreshold) {
            navigator.vibrate(duration);
        }
    }

    // Stops vibration
    stopVibrate = () => {
        // Clear interval and stop persistent vibrating
        if (this.vibrateDurationInterval) clearInterval(this.vibrateDurationInterval);
        // navigator.vibrate(VibrationHandler.vibrateDuration);
    }

    // Start persistent vibration at given duration and interval
    // Assumes a number value is given
    startPersistentVibrate(duration: number = 250, interval: number = 1000) {
        this.vibrateDurationInterval = setInterval(() => {
            this.startVibrate(duration);
        }, interval);
    }
}