export type TDispatch = (action: IAction) => void;

// Action Creator
// dispatch(click(5))
// function click(index) {
//     return { type: '@@click', payload: index };
// }

export type IAction = (
    { type: '@@click', payload: number } |
    { type: '@@reset', payload: null } |
    { type: '@@newturn', payload: null } |
    { type: '@@win' }
);

const ActionTypes = {
  RESET_SCORE: '@@reset-score',
};

export function winGame(): IAction {
    return { type: '@@win'};
}


