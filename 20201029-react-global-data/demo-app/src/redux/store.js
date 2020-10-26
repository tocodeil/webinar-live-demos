import { createStore } from 'redux';

const initialState = {
  totalScore: 0,
  gameIndex: 0,
};

export const actions = {
  addScore: (amount) => ({ type: "@@add_score", payload: amount }),
  reset: () => ({ type: "@@reset" }), 
};

export function actAddScore(amount) {
  return { type: "@@add_score", payload: amount };
}

export function actReset() {
  return { type: "@@reset" };
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case "@@reset":
      return reset();

    case "@@add_score":
      return addToTotalScore(state, action.payload);

    default:
      return state;
  }
}

function reset() {
  return { ...initialState, gameIndex: Math.random() };
}

function addToTotalScore(state, amount) {
  return { ...state, totalScore: state.totalScore + amount };
}

const store = createStore(reducer);
export default store;
