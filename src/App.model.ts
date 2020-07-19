export enum ViewState {
    StartScreen, Balancing, Fail
}

export interface IAppState {
    viewState: ViewState;
}
export class AppState implements IAppState {
    constructor(public viewState = ViewState.StartScreen) { }
}