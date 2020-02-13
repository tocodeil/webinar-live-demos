import { createStore, combineReducers, applyMiddleware } from "redux";
import game, { IGame } from "./reducers/game";
import {IAction, TDispatch} from "./actions";

export interface IStore {
    dispatch: TDispatch;
    getState: () => IState;
}

type TNext = (act: IAction) => void;

export interface IState {
    game: IGame,
}

const reducer = combineReducers({ game });
const store = createStore(reducer);

export default store;
(window as any).store = store;













