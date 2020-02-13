import produce from "immer";
import _ from "lodash";
import {IAction} from "../actions";

export interface IGame {
    revealedCards: number[];
    cards: number[];
    currentTurn: number[];
}

const initialState = {
    revealedCards: [],
    cards: _.shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]),
    currentTurn: [],
};

type GameReducer = (_: IGame, __: IAction) => IGame;

const gameReducer: GameReducer = produce((state: IGame, action: IAction) => {
    switch(action.type) {
        case '@@click':
            click(state, action.payload);
            break;

        case '@@newturn':
            newTurn(state);
            break;
    }
}, initialState);

export default gameReducer;

function click(state: IGame, index: number) {
    if (state.currentTurn.length === 2) {
        newTurn(state);
    }
    state.currentTurn.push(index);
}

function newTurn(state: IGame) {
    if (state.currentTurn.length < 2) {
        return;
    }

    const idx1 = state.currentTurn[0];
    const idx2 = state.currentTurn[1];
    if (state.cards[idx1] === state.cards[idx2]) {
        state.revealedCards.push(idx1);
        state.revealedCards.push(idx2);
    }
    state.currentTurn = [];
}

