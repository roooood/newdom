import React, { useReducer, createContext } from "react";

export const storeContext = createContext();

const simi = Array.from({ length: 28 }, () => true);
const initialState = {
    simi,
    deck: {
        me: [],
        opponet: []
    },
    dices: [],
    board: [[3, 3], [4, 3], [5, 4], [6, 6], [6, 5]],
    index: -1,
    turn: '',
    picker: false
};

const reducer = (state, { type, data }) => {
    switch (type) {
        case 'all': {
            return { ...state, ...data };
        }
        case 'board': {
            state.board.push(data)
            return { ...state };
        }
        case 'anim': {
            let [index, turn, val] = data;
            state.index = index;
            state.turn = turn;
            state.simi[index] = turn == 'me' ? val : true;
            return { ...state };
        }
        case 'index': {
            let [index, turn] = data;
            if (state.dices[index] != null) {
                state.index = index;
                state.turn = turn;
                state.simi[index] = turn == 'me' ? state.dices[index] : true;
                state.dices[index] = null;
            }
            return { ...state };
        }
        case 'deck': {
            let tmp = state.simi[state.index];
            if (tmp) {
                state.deck[state.turn].push(tmp);
                state.simi[state.index] = false;
                state.index = -1;
            }
            return { ...state };
        }
    }
    return state
};

export const StoreContextProvider = props => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <storeContext.Provider value={[state, dispatch]}>
            {props.children}
        </storeContext.Provider>
    );
};