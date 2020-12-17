import React, { useReducer, createContext } from "react";
import { equal, include } from './helper';

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
    selected: [],
    index: -1,
    turn: '',
    picker: false,
    width: null,
    height: null,
    moveable: [],
};

const reducer = (state, { type, data }) => {
    switch (type) {
        case 'all': {
            return { ...state, ...data };
        }
        case 'temp-board': {
            state.selected = data;
            return { ...state };
        }
        case 'board': {
            if (!state.board.find(e => equal(data, e))) {
                state.board.push(data);
                state.selected = [];
                state.deck['me'] = state.deck['me'].filter(e => !equal(data, e));
                if (!state.moveable.length) {
                    state.moveable = data;
                }
                else {
                    // state.moveable
                }
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