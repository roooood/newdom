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
    board: [],
    selected: null,
    index: -1,
    turn: '',
    picker: false,
    width: null,
    height: null
};

const reducer = (state, { type, data }) => {
    switch (type) {
        case 'all': {
            return { ...state, ...data };
        }
        case 'board': {
            state.selected = data;
            if (state.board.length == 0) {
                state.board.push(data)
            }
            return { ...state };
        }
        case 'xboard': {
            if (!state.board.find(e => e[0] == data[0] && e[1] == data[1])) {
                state.board.push(data)
            }
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